<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHouseWorkCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('house_work_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->comment('家事カテゴリー名');
            $table->string('image_name', 100)->comment('画像名');
            $table->string('uri', 200)->nullable()->comment('画像URL');
            $table->string('path', 200)->nullable()->comment('画像パス');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('house_work_categories');
    }
};
