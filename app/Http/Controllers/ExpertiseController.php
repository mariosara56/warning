<?php

namespace App\Http\Controllers;

use App\Models\Expertise;
use App\Models\Skill;
use App\Models\About;
use Illuminate\Http\Request;

class ExpertiseController extends Controller
{
    public function index($aboutId)
    {
        $expertises = Expertise::where('user_id', $aboutId)->with(['skill'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        $about = About::findOrFail($aboutId);

        return inertia('admin/expertise', [
            'expertises' => $expertises,
            'about' => $about,
        ]);
    }

    public function create($aboutId)
    {
        $skills = Skill::all();
        $about = About::findOrFail($aboutId);

        return inertia('admin/expertise/form', [
            'skills' => $skills,
            'about' => $about,
        ]);
    }

    public function store(Request $request, $aboutId)
    {
        $request->validate([
            'skill_id' => 'required|exists:skills,id',
            'level' => 'required|in:Beginner,Intermediate,Advanced,Expert',
            'years_of_experience' => 'nullable|integer',
            'certified' => 'boolean',
            'notes' => 'nullable|string'
        ]);

        Expertise::create([
            'user_id' => $aboutId,
            'skill_id' => $request->skill_id,
            'level' => $request->level,
            'years_of_experience' => $request->years_of_experience,
            'certified' => $request->certified ?? false,
            'notes' => $request->notes,
        ]);

        return redirect()->route('admin.expertise', $aboutId)
            ->with('success', 'Expertise created successfully.');
    }

    public function edit($aboutId, $id)
    {
        $expertise = Expertise::findOrFail($id);
        $skills = Skill::all();
        $about = About::findOrFail($aboutId);

        return inertia('admin/expertise/form', [
            'expertise' => $expertise,
            'skills' => $skills,
            'about' => $about,
        ]);
    }

    // Update data expertise
    public function update(Request $request, $aboutId, $id)
    {
        $request->validate([
            'skill_id' => 'required|exists:skills,id',
            'level' => 'required|in:Beginner,Intermediate,Advanced,Expert',
            'years_of_experience' => 'nullable|integer',
            'certified' => 'boolean',
            'notes' => 'nullable|string'
        ]);

        $expertise = Expertise::findOrFail($id);
        $expertise->update([
            'user_id' => $aboutId,
            'skill_id' => $request->skill_id,
            'level' => $request->level,
            'years_of_experience' => $request->years_of_experience,
            'certified' => $request->certified ?? false,
            'notes' => $request->notes,
        ]);

        return redirect()->route('admin.expertise', $aboutId)
            ->with('success', 'Expertise updated successfully.');
    }

    // Hapus data expertise
    public function destroy($aboutId, $id)
    {
        $expertise = Expertise::findOrFail($id);
        $expertise->delete();

        return redirect()->route('admin.expertise', $aboutId)
            ->with('success', 'Expertise deleted successfully.');
    }
}

