<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\Gallery;
use App\Models\Quote;
use App\Models\Writing;

class HomeController extends Controller
{
    public function __invoke()
    {
        $abouts = About::where('is_active', true)
            ->orderBy('created_at', 'asc')
            ->paginate(1);
        $galleries = Gallery::orderBy('created_at', 'desc')->paginate(6);
        $writings = Writing::orderBy('created_at', 'desc')->paginate(3);
        $quotes = Quote::where('is_active', true)->orderBy('created_at', 'desc')->get();

        return inertia('home', [
            'abouts' => $abouts,
            'galleries' => $galleries,
            'writings' => $writings,
            'quotes' => $quotes,
        ]);
    }
}
