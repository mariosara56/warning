<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Illuminate\Http\Request;

class QuoteController extends Controller
{
    public function index()
    {
        $quotes = Quote::orderBy('created_at', 'desc')->paginate(10);

        return inertia('admin/quote', [
            'quotes' => $quotes
        ]);
    }

    public function create()
    {
        return inertia('admin/quote/form');
    }

    public function store(Request $request)
    {
        $request->validate([
            'author' => 'required|string|max:255',
            'quote' => 'required|string',
            'is_active' => 'boolean',
        ]);

        Quote::create($request->all());

        return redirect()->route('admin.quote')->with('success', 'Quote created successfully.');
    }

    public function edit($id)
    {
        $quote = Quote::findOrFail($id);

        return inertia('admin/quote/form', [
            'quote' => $quote
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'author' => 'required|string|max:255',
            'quote' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $quote = Quote::findOrFail($id);
        $quote->author = $request->input('author');
        $quote->quote = $request->input('quote');
        $quote->is_active = $request->input('is_active') ? 1 : 0;
        $quote->save();

        return redirect()->route('admin.quote')->with('success', 'Quote updated successfully.');
    }

    public function destroy($id)
    {
        $quote = Quote::findOrFail($id);
        $quote->delete();

        return redirect()->route('admin.quote')->with('success', 'Quote deleted successfully.');
    }
}
