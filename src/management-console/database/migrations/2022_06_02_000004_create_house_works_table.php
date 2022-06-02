<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHouseWorksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('house_works', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('house_work_category_id')->nullable()->index('fk_house_work_house_work_category_idx')->comment('家事カテゴリーID');
            $table->foreign('house_work_category_id', 'fk_house_work_house_work_category1')->references('id')->on('house_work_categories')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->unsignedInteger('family_id')->nullable()->index('fk_house_work_family_idx')->comment('ファミリーID');
            $table->foreign('family_id', 'fk_house_work_family1')->references('id')->on('families')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->string('name')->comment('家事名');
            $table->integer('point')->comment('獲得ポイント');
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
        Schema::dropIfExists('house_works');
    }
};
