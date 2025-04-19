<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Rules\ValidThumbnail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function __invoke()
    {
        $galleries = Gallery::orderBy('created_at', 'desc')->paginate(6);

        return Inertia::render('gallery', [
            'galleries' => $galleries
        ]);
    }

    public function index()
    {
        $galleries = Gallery::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('admin/gallery', [
            'galleries' => $galleries
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/gallery/form');
    }

    public function store(Request $request)
    {
        // Validasi dapat diaktifkan jika dibutuhkan
        $request->validate([
            'thumbnail' => ['required', new ValidThumbnail],
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        if ($request->hasFile('thumbnail')) {
            // Simpan file thumbnail
            $path = $request->file('thumbnail')->store('gallery', 'public');
        } else {
            // Jika tidak ada file, set path ke null atau default
            $path = null;
        }

        Gallery::create([
            'thumbnail' => $path,
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        return redirect()->route('admin.gallery')->with('success', 'Gallery created successfully.');
    }

    public function edit($id)
    {
        $gallery = Gallery::findOrFail($id);

        return Inertia::render('admin/gallery/form', [
            'gallery' => $gallery
        ]);
    }

    public function update(Request $request, $id)
    {
        // Validasi dapat diaktifkan jika dibutuhkan
        /*
        $request->validate([
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);
        */

        $gallery = Gallery::findOrFail($id);

        if ($request->hasFile('thumbnail')) {
            // Hapus file lama jika ada
            if ($gallery->thumbnail && Storage::disk('public')->exists($gallery->thumbnail)) {
                Storage::disk('public')->delete($gallery->thumbnail);
            }

            // Simpan file baru
            $path = $request->file('thumbnail')->store('gallery', 'public');
            $gallery->thumbnail = $path;
        }

        // Update data lainnya
        $gallery->title = $request->input('title');
        $gallery->description = $request->input('description');
        $gallery->save();

        return redirect()->route('admin.gallery')->with('success', 'Gallery updated successfully.');
    }

    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);

        // Hapus thumbnail dari storage jika ada
        if ($gallery->thumbnail && Storage::disk('public')->exists($gallery->thumbnail)) {
            Storage::disk('public')->delete($gallery->thumbnail);
        }

        // Hapus data dari database
        $gallery->delete();

        return redirect()->route('admin.gallery')->with('success', 'Gallery deleted successfully.');
    }
}
