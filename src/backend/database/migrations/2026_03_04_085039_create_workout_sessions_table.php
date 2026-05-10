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
        Schema::create('workout_session', function (Blueprint $table) {
            $table->id('session_id');
            $table->integer('user_id');
            $table->integer('workout_id');
            $table->date('date');
            $table->time('duration', precision: 2);
            $table->string('comments')->nullable(true);
            $table->string('caption');

            $table->foreign('user_id')->references('user_id')->on('user')->onDelete('cascade');
            $table->foreign('workout_id')->references('workout_id')->on('workout')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_session');
    }
};
