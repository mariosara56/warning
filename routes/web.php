<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\WritingController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ExperienceEducationController;
use App\Http\Controllers\ExpertiseController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\SkillController;

Route::get('/', [HomeController::class, '__invoke'])->name('home');

Route::get('/gallery', [GalleryController::class, '__invoke'])->name('gallery');

Route::get('/about', [AboutController::class, '__invoke'])->name('about');

Route::get('/writings', [WritingController::class, '__invoke'])->name('writings');

Route::get('/writings/{id}', [WritingController::class, 'show'])->name('writings.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    // About
    Route::get('admin-about', [AboutController::class, 'index'])->name('admin.about');
    Route::get('admin-about/create', [AboutController::class, 'create'])->name('admin.about.create');
    Route::post('admin-about/store', [AboutController::class, 'store'])->name('admin.about.store');

    Route::get('admin-about/edit/{id}', [AboutController::class, 'edit'])->name('admin.about.edit');
    Route::post('admin-about/update/{id}', [AboutController::class, 'update'])->name('admin.about.update');

    Route::delete('admin-about/delete/{id}', [AboutController::class, 'destroy'])->name('admin.about.delete');

    // Gallery
    Route::get('admin-gallery', [GalleryController::class, 'index'])->name('admin.gallery');
    Route::get('admin-gallery/create', [GalleryController::class, 'create'])->name('admin.gallery.create');
    Route::post('admin-gallery/store', [GalleryController::class, 'store'])->name('admin.gallery.store');

    Route::get('admin-gallery/edit/{id}', [GalleryController::class, 'edit'])->name('admin.gallery.edit');
    Route::post('admin-gallery/update/{id}', [GalleryController::class, 'update'])->name('admin.gallery.update');

    Route::delete('admin-gallery/delete/{id}', [GalleryController::class, 'destroy'])->name('admin.gallery.delete');

    // Writing
    Route::get('admin-writing', [WritingController::class, 'index'])->name('admin.writing');
    Route::get('admin-writing/create', [WritingController::class, 'create'])->name('admin.writing.create');
    Route::post('admin-writing/store', [WritingController::class, 'store'])->name('admin.writing.store');

    Route::get('admin-writing/edit/{id}', [WritingController::class, 'edit'])->name('admin.writing.edit');
    Route::post('admin-writing/update/{id}', [WritingController::class, 'update'])->name('admin.writing.update');

    Route::delete('admin-writing/delete/{id}', [WritingController::class, 'destroy'])->name('admin.writing.delete');

    // Quote
    Route::get('admin-quote', [QuoteController::class, 'index'])->name('admin.quote');
    Route::get('admin-quote/create', [QuoteController::class, 'create'])->name('admin.quote.create');
    Route::post('admin-quote/store', [QuoteController::class, 'store'])->name('admin.quote.store');

    Route::get('admin-quote/edit/{id}', [QuoteController::class, 'edit'])->name('admin.quote.edit');
    Route::post('admin-quote/update/{id}', [QuoteController::class, 'update'])->name('admin.quote.update');

    Route::delete('admin-quote/delete/{id}', [QuoteController::class, 'destroy'])->name('admin.quote.delete');

    // Expertise
    Route::prefix('admin-about/{aboutId}')->group(function () {
        Route::get('/expertise', [ExpertiseController::class, 'index'])->name('admin.expertise');
        Route::get('/expertise/create', [ExpertiseController::class, 'create'])->name('admin.expertise.create');
        Route::post('/expertise/store', [ExpertiseController::class, 'store'])->name('admin.expertise.store');

        Route::get('/expertise/edit/{id}', [ExpertiseController::class, 'edit'])->name('admin.expertise.edit');
        Route::post('/expertise/update/{id}', [ExpertiseController::class, 'update'])->name('admin.expertise.update');

        Route::delete('/expertise/delete/{id}', [ExpertiseController::class, 'destroy'])->name('admin.expertise.delete');
    });

    // Experience Education
    Route::prefix('admin-about/{aboutId}')->group(function () {
        Route::get('/experience-education', [ExperienceEducationController::class, 'index'])->name('admin.experience-education');
        Route::get('/experience-education/create', [ExperienceEducationController::class, 'create'])->name('admin.experience-education.create');
        Route::post('/experience-education/store', [ExperienceEducationController::class, 'store'])->name('admin.experience-education.store');

        Route::get('/experience-education/edit/{id}', [ExperienceEducationController::class, 'edit'])->name('admin.experience-education.edit');
        Route::post('/experience-education/update/{id}', [ExperienceEducationController::class, 'update'])->name('admin.experience-education.update');

        Route::delete('/experience-education/delete/{id}', [ExperienceEducationController::class, 'destroy'])->name('admin.experience-education.delete');
    });

    // Skill
    Route::get('admin-skill', [SkillController::class, 'index'])->name('admin.skill');

    Route::get('admin-skill/create', [SkillController::class, 'create'])->name('admin.skill.create');
    Route::post('admin-skill/store', [SkillController::class, 'store'])->name('admin.skill.store');

    Route::get('admin-skill/edit/{id}', [SkillController::class, 'edit'])->name('admin.skill.edit');
    Route::post('admin-skill/update/{id}', [SkillController::class, 'update'])->name('admin.skill.update');

    Route::delete('admin-skill/delete/{id}', [SkillController::class, 'destroy'])->name('admin.skill.delete');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
