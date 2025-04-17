<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\WritingController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\HomeController;

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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
