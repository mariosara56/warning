<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('experience_educations', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['Experience', 'Education']); // Menentukan apakah ini pengalaman kerja atau pendidikan
            $table->string('title'); // Judul pekerjaan atau gelar pendidikan
            $table->string('company_institution'); // Nama perusahaan atau institusi pendidikan
            $table->string('location'); // Lokasi pekerjaan atau institusi pendidikan
            $table->date('start_date'); // Tanggal mulai
            $table->date('end_date')->nullable(); // Tanggal selesai (nullable karena bisa kosong)
            $table->longText('description')->nullable(); // Deskripsi tugas atau studi
            $table->longText('achievements_or_grade')->nullable(); // Pencapaian atau IPK
            $table->foreignId('skill_id')->constrained('skills')->onDelete('cascade')->nullable(); // ID skill yang terkait (nullable)
            $table->foreignId('user_id')->constrained('abouts')->onDelete('cascade'); // ID pengguna yang terkait
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experience_educations');
    }
};
