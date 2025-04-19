<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::orderBy('created_at', 'desc')->paginate(10);

        return inertia('admin/skill', [
            'skills' => $skills
        ]);
    }

    public function create()
    {
        return inertia('admin/skill/form');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'type' => 'nullable|in:Hard Skill,Soft Skill',
        ]);

        Skill::create($request->all());

        return redirect()->route('admin.skill')->with('success', 'Skill created successfully.');
    }

    public function edit($id)
    {
        $skill = Skill::findOrFail($id);

        return inertia('admin/skill/form', [
            'skill' => $skill
        ]);
    }

    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);

        $request->validate([
            'name' => 'string|max:255',
            'category' => 'nullable|string|max:255',
            'type' => 'nullable|in:Hard Skill,Soft Skill',
        ]);

        $skill->update($request->all());

        return redirect()->route('admin.skill')->with('success', 'Skill updated successfully.');
    }

    // Hapus skill
    public function destroy($id)
    {
        $skill = Skill::findOrFail($id);
        $skill->delete();

        return redirect()->route('admin.skill')->with('success', 'Skill deleted successfully.');
    }
}
