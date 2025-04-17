<?php

namespace App\Http\Controllers;

use App\Models\Writing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WritingController extends Controller
{
    public function __invoke()
    {
        $writings = Writing::orderBy('created_at', 'asc')->paginate(3);

        return Inertia::render('writing', [
            'writings' => $writings
        ]);
    }

    public function index()
    {
        $writings = Writing::orderBy('created_at', 'asc')->paginate(10);

        return Inertia::render('admin/writing', [
            'writings' => $writings
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/writing/form');
    }

    public function store(Request $request)
    {
        // Validasi dapat diaktifkan jika dibutuhkan
        /*
        $request->validate([
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:writings,slug',
            'teaser' => 'required|string|max:255',
            'body' => 'required|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:255',
            'author' => 'nullable|string|max:255',
        ]);
        */

        $path = $request->file('thumbnail')->store('writing', 'public');

        Writing::create([
            'thumbnail' => $path,
            'title' => $request->input('title'),
            'slug' => $request->input('slug'),
            'teaser' => $request->input('teaser'),
            'body' => $request->input('body'),
            'meta_title' => $request->input('meta_title'),
            'meta_description' => $request->input('meta_description'),
            'author' => $request->input('author'),
        ]);

        return redirect()
            ->route('admin.writing')
            ->with('success', 'Writing created successfully.');
    }

    public function edit(int $id)
    {
        $writing = Writing::findOrFail($id);

        return Inertia::render('admin/writing/form', [
            'writing' => $writing
        ]);
    }

    public function update(Request $request, int $id)
    {
        $writing = Writing::findOrFail($id);

        if ($request->hasFile('thumbnail')) {
            // Hapus file lama jika ada
            if ($writing->thumbnail && Storage::disk('public')->exists($writing->thumbnail)) {
                Storage::disk('public')->delete($writing->thumbnail);
            }

            // Simpan file baru
            $path = $request->file('thumbnail')->store('writing', 'public');
            $writing->thumbnail = $path;
        }

        // Update field lainnya
        $writing->title = $request->input('title');
        $writing->slug = $request->input('slug');
        $writing->teaser = $request->input('teaser');
        $writing->body = $request->input('body');
        $writing->meta_title = $request->input('meta_title');
        $writing->meta_description = $request->input('meta_description');
        $writing->author = $request->input('author');

        $writing->save();

        return redirect()
            ->route('admin.writing')
            ->with('success', 'Writing updated successfully.');
    }

    public function destroy(int $id)
    {
        Writing::findOrFail($id)->delete();

        return redirect()
            ->route('admin.writing')
            ->with('success', 'Writing deleted successfully.');
    }

    public function show($slug)
    {
        $writing = Writing::where('slug', $slug)->firstOrFail();

        return Inertia::render('writing/show', [
            'writing' => $writing
        ]);
    }
}
