<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInquiriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inquiries', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id')->nullable()->index('fk_inquiry_user_idx')->comment('ユーザーID');
            $table->foreign('user_id', 'fk_inquiry_user1')->references('id')->on('users')->onUpdate('NO ACTION')->onDelete('CASCADE');
            $table->string('title', 254)->comment('タイトル');
            $table->string('body', 3000)->comment('内容');
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
