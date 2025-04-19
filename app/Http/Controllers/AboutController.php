<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Rules\ValidThumbnail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function __invoke()
    {
        $abouts = About::where('is_active', true)
            ->orderBy('created_at', 'asc')
            ->paginate(1);

        return Inertia::render('about', [
            'abouts' => $abouts
        ]);
    }

    public function index()
    {
        $abouts = About::orderBy('created_at', 'asc')->paginate(10);

        return Inertia::render('admin/about', [
            'abouts' => $abouts
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/about/form');
    }

    public function store(Request $request)
    {
        // Validasi dapat diaktifkan jika dibutuhkan
        $request->validate([
            'fullname' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255|regex:/^62[0-9]{8,13}$/',
            'instagram' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255|regex:/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/',
            'description' => 'required|string',
            'photo' => ['required', new ValidThumbnail],
            'work' => 'required|string|max:255',
            'is_active' => 'nullable|boolean',
        ]);

        $path = $request->file('photo')->store('about', 'public');

        About::create([
            'fullname' => $request->input('fullname'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'instagram' => $request->input('instagram'),
            'linkedin' => $request->input('linkedin'),
            'description' => $request->input('description'),
            'photo' => $path,
            'work' => $request->input('work'),
            'is_active' => $request->input('is_active') ? 1 : 0,
        ]);

        return redirect()->route('admin.about')->with('success', 'About created successfully.');
    }

    public function edit($id)
    {
        $about = About::findOrFail($id);

        return Inertia::render('admin/about/form', [
            'about' => $about
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'fullname' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255|regex:/^62[0-9]{8,13}$/',
            'instagram' => 'nullable|string|max:255|regex:/^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._%+-]+\/?$/',
            'linkedin' => 'nullable|string|max:255|regex:/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/',
            'description' => 'required|string',
            'photo' => ['required', new ValidThumbnail],
            'work' => 'required|string|max:255',
            'is_active' => 'nullable|boolean',
        ]);

        $about = About::findOrFail($id);

        if ($request->hasFile('photo')) {
            if ($about->photo && Storage::disk('public')->exists($about->photo)) {
                Storage::disk('public')->delete($about->photo);
            }

            $path = $request->file('photo')->store('about', 'public');
            $about->photo = $path;
        }

        // Update data lainnya
        $about->fullname = $request->input('fullname');
        $about->email = $request->input('email');
        $about->phone = $request->input('phone');
        $about->instagram = $request->input('instagram');
        $about->linkedin = $request->input('linkedin');
        $about->description = $request->input('description');
        $about->work = $request->input('work');

        // Tangani status is_active
        if ($request->input('is_active')) {
            // Jika diaktifkan, nonaktifkan yang lain
            About::where('id', '!=', $id)->update(['is_active' => 0]);
            $about->is_active = 1;
        } else {
            // Jika dinonaktifkan
            $about->is_active = 0;
        }

        $about->save();

        // Setelah update, cek apakah semua data nonaktif
        if (!About::where('is_active', 1)->exists()) {
            // Aktifkan entri pertama (id paling kecil)
            $first = About::orderBy('id')->first();
            if ($first) {
                $first->is_active = 1;
                $first->save();
            }
        }

        return redirect()->route('admin.about')->with('success', 'About updated successfully.');
    }

    public function destroy($id)
    {
        $about = About::findOrFail($id);

        // Hapus foto dari storage jika ada
        if ($about->photo && Storage::disk('public')->exists($about->photo)) {
            Storage::disk('public')->delete($about->photo);
        }

        // Hapus data dari database
        $about->delete();

        // Setelah hapus, cek apakah masih ada yang aktif
        if (!About::where('is_active', 1)->exists()) {
            $first = About::orderBy('id')->first();
            if ($first) {
                $first->is_active = 1;
                $first->save();
            }
        }

        return redirect()->route('admin.about')->with('success', 'About deleted successfully.');
    }
}
