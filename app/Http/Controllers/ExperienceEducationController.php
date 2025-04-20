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

    public function store(Request $request, $aboutId)
    {
        $request->validate([
            'type' => 'required|in:Experience,Education',
            'title' => 'required|string|max:255',
            'company_institution' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
            'achievements_or_grade' => 'nullable|string',
            'skill_id' => 'exists:skills,id',
        ]);

        ExperienceEducation::create(array_merge($request->all(), ['user_id' => $aboutId]));

        return redirect()->route('admin.experience-education', $aboutId)
            ->with('success', 'Experience Education created successfully.');
    }

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

    public function update(Request $request, $aboutId, $id)
    {
        $request->validate([
            'type' => 'required|in:Experience,Education',
            'title' => 'required|string|max:255',
            'company_institution' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
            'achievements_or_grade' => 'nullable|string',
            'skill_id' => 'exists:skills,id',
        ]);

        $experienceEducation = ExperienceEducation::findOrFail($id);
        $experienceEducation->update($request->all());

        return redirect()->route('admin.experience-education', $aboutId)
            ->with('success', 'Experience Education updated successfully.');
    }

    public function destroy($aboutId, $id)
    {
        $experienceEducation = ExperienceEducation::findOrFail($id);
        $experienceEducation->delete();

        return redirect()->route('admin.experience-education', $aboutId)
            ->with('success', 'Experience Education deleted successfully.');
    }
}

