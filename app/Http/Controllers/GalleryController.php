<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function __invoke()
    {
        $galleries = Gallery::orderBy('created_at', 'asc')->paginate(6);

        return Inertia::render('gallery', [
            'galleries' => $galleries
        ]);
    }

    public function index()
    {
        $galleries = Gallery::orderBy('created_at', 'asc')->paginate(10);

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
        /*
        $request->validate([
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);
        */

        $path = $request->file('thumbnail')->store('gallery', 'public');

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
        $gallery->delete();

        return redirect()->route('admin.gallery')->with('success', 'Gallery deleted successfully.');
    }
}
