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
        Schema::create('workout_set', function (Blueprint $table) {
            $table->id('set_id');
            $table->integer('session_id');
            $table->integer('exercise_id');
            $table->integer('weight');
            $table->integer('repetitions');

            $table->foreign('session_id')->references('session_id')->on('workout_session')->onDelete('cascade');
            $table->foreign('exercise_id')->references('exercise_id')->on('exercise')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_set');
    }
};
