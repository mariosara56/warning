<?php

namespace App\Http\Controllers;

use App\Models\Expertise;
use App\Models\Skill;
use App\Models\About;
use Illuminate\Http\Request;

class ExpertiseController extends Controller
{
    // Tampilkan daftar semua expertise milik about tertentu
    public function index($aboutId)
    {
        $about = About::with('expertise.skill')->findOrFail($aboutId);
        return response()->json($about->expertise);
    }

    // Simpan data expertise baru
    public function store(Request $request, $aboutId)
    {
        $request->validate([
            'skill_id' => 'required|exists:skills,id',
            'level' => 'required|in:Beginner,Intermediate,Advanced,Expert',
            'years_of_experience' => 'nullable|integer',
            'certified' => 'boolean',
            'notes' => 'nullable|string'
        ]);

        $expertise = Expertise::create([
            'user_id' => $aboutId,
            'skill_id' => $request->skill_id,
            'level' => $request->level,
            'years_of_experience' => $request->years_of_experience,
            'certified' => $request->certified ?? false,
            'notes' => $request->notes,
        ]);

        return response()->json($expertise, 201);
    }

    // Update data expertise
    public function update(Request $request, $id)
    {
        $expertise = Expertise::findOrFail($id);

        $request->validate([
            'skill_id' => 'exists:skills,id',
            'level' => 'in:Beginner,Intermediate,Advanced,Expert',
            'years_of_experience' => 'nullable|integer',
            'certified' => 'boolean',
            'notes' => 'nullable|string'
        ]);

        $expertise->update($request->all());

        return response()->json($expertise);
    }

    // Hapus data expertise
    public function destroy($id)
    {
        $expertise = Expertise::findOrFail($id);
        $expertise->delete();

        return response()->json(['message' => 'Expertise deleted']);
    }
}

