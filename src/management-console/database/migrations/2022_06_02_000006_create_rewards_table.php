<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRewardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rewards', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id')->nullable()->index('fk_reward_user_idx')->comment('ユーザーID');
            $table->foreign('user_id', 'fk_reward_user1')->references('id')->on('users')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->unsignedInteger('reward_category_id')->nullable()->index('fk_reward_reward_category_idx')->comment('ねぎらいカテゴリーID');
            $table->foreign('reward_category_id', 'fk_reward_category1')->references('id')->on('rewards')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->string('name')->comment('ねぎらい名');
            $table->integer('point')->comment('必要ポイント');
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
        Schema::dropIfExists('rewards');
    }
};
