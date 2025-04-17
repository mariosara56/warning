<?php

namespace App\Http\Controllers;

use App\Models\About;
use App\Models\Gallery;
use App\Models\Writing;

class HomeController extends Controller
{
    public function __invoke()
    {
        $abouts = About::where('is_active', true)
            ->orderBy('created_at', 'asc')
            ->paginate(1);

        $galleries = Gallery::orderBy('created_at', 'asc')->paginate(6);

        $writings = Writing::orderBy('created_at', 'asc')->paginate(3);

        return inertia('home', [
            'abouts' => $abouts,
            'galleries' => $galleries,
            'writings' => $writings,
        ]);
    }
}
