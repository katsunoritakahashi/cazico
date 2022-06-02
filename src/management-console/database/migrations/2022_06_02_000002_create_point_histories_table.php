<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePointHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('point_histories', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id')->nullable()->index('fk_point_history_user1_idx')->comment('ユーザーID');
            $table->foreign('user_id', 'fk_point_history_user1')->references('id')->on('users')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->enum('type', array('house_work','reward'))->comment('タイプ');
            $table->string('name')->comment('名称');
            $table->integer('point')->comment('ポイント');
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
        Schema::dropIfExists('point_histories');
    }
};
