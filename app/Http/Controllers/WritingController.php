<?php

namespace App\Http\Controllers;

use App\Models\Writing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class WritingController extends Controller
{
    public function __invoke()
    {
        $writings = Writing::orderBy('created_at', 'desc')->paginate(3);

        return Inertia::render('writing', [
            'writings' => $writings
        ]);
    }

    public function index()
    {
        $writings = Writing::orderBy('created_at', 'desc')->paginate(10);

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
        // Validasi jika dibutuhkan
        /*
        $request->validate([
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title' => 'required|string|max:255',
            'teaser' => 'required|string|max:255',
            'body' => 'required|string',
            'author' => 'nullable|string|max:255',
        ]);
        */

        $title = $request->input('title');
        $author = $request->input('author');
        $teaser = $request->input('teaser');

        // Generate slug dari title
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $counter = 1;

        // Pastikan slug unik
        while (Writing::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }

        // Generate meta_title dan meta_description
        $metaTitle = $title . ($author ? " - $author" : '');
        $metaDescription = $teaser . ($author ? " - ditulis oleh $author" : '');

        // Upload thumbnail
        $path = $request->file('thumbnail')->store('writing', 'public');

        // Simpan ke database
        Writing::create([
            'thumbnail' => $path,
            'title' => $title,
            'slug' => $slug,
            'teaser' => $teaser,
            'body' => $request->input('body'),
            'meta_title' => $metaTitle,
            'meta_description' => $metaDescription,
            'author' => $author,
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

        $title = $request->input('title');
        $author = $request->input('author');
        $teaser = $request->input('teaser');

        // Cek apakah title berubah → regenerate slug
        if ($title !== $writing->title) {
            $baseSlug = Str::slug($title);
            $slug = $baseSlug;
            $counter = 1;

            // Pastikan slug unik (kecuali milik record ini sendiri)
            while (Writing::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                $slug = $baseSlug . '-' . $counter++;
            }

            $writing->slug = $slug;
        }

        // Update field lainnya
        $writing->title = $title;
        $writing->teaser = $teaser;
        $writing->body = $request->input('body');
        $writing->meta_title = $title . ($author ? " - $author" : '');
        $writing->meta_description = $teaser . ($author ? " - ditulis oleh $author" : '');
        $writing->author = $author;

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
