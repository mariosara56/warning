<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use App\Models\About;
use App\Models\ExperienceEducation;
use Illuminate\Http\Request;

class ExperienceEducationController extends Controller
{
    public function index($aboutId)
    {
        $experienceEducations = ExperienceEducation::where('user_id', $aboutId)->with(['skill'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        $about = About::findOrFail($aboutId);

        return inertia('admin/experience-education', [
            'experienceEducations' => $experienceEducations,
            'about' => $about,
        ]);
    }

    public function create($aboutId)
    {
        $skills = Skill::all();
        $about = About::findOrFail($aboutId);

        return inertia('admin/experience-education/form', [
            'skills' => $skills,
            'about' => $about,
        ]);
    }

    // public function store(Request $request, $aboutId)
    // {
    //     $request->validate([
    //         'skill_id' => 'required|exists:skills,id',
    //         'level' => 'required|in:Beginner,Intermediate,Advanced,Expert',
    //         'years_of_experience' => 'nullable|integer',
    //         'certified' => 'boolean',
    //         'notes' => 'nullable|string'
    //     ]);

    //     Expertise::create([
    //         'user_id' => $aboutId,
    //         'skill_id' => $request->skill_id,
    //         'level' => $request->level,
    //         'years_of_experience' => $request->years_of_experience,
    //         'certified' => $request->certified ?? false,
    //         'notes' => $request->notes,
    //     ]);

    //     return redirect()->route('admin.expertise', $aboutId)
    //         ->with('success', 'Expertise created successfully.');
    // }

    public function edit($aboutId, $id)
    {
        $experienceEducation = ExperienceEducation::findOrFail($id);
        $skills = Skill::all();
        $about = About::findOrFail($aboutId);

        return inertia('admin/experience-education/form', [
            'experienceEducation' => $experienceEducation,
            'skills' => $skills,
            'about' => $about,
        ]);
    }

    // public function update(Request $request, $id)
    // {
    //     $expertise = Expertise::findOrFail($id);

    //     $request->validate([
    //         'skill_id' => 'exists:skills,id',
    //         'level' => 'in:Beginner,Intermediate,Advanced,Expert',
    //         'years_of_experience' => 'nullable|integer',
    //         'certified' => 'boolean',
    //         'notes' => 'nullable|string'
    //     ]);

    //     $expertise->update($request->all());

    //     return redirect()->route('admin.expertise', $expertise->user_id)
    //         ->with('success', 'Expertise updated successfully.');
    // }

    public function destroy($id)
    {
        $experienceEducation = ExperienceEducation::findOrFail($id);
        $experienceEducation->delete();

        return redirect()->route('admin.experience-education', $experienceEducation->user_id)
            ->with('success', 'Experience Education deleted successfully.');
    }
}

