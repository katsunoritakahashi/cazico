<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_attachments', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id')->index('fk_user_attachment_user_id_idx')->comment('ユーザーID');
            $table->foreign('user_id', 'fk_user_attachment_user1')->references('id')->on('users')->onUpdate('NO ACTION')->onDelete('CASCADE');
            $table->string('name', 100)->comment('ファイル名');
            $table->string('uri', 200)->nullable()->comment('ファイルURL');
            $table->string('path', 200)->nullable()->comment('ファイルパス');
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
        Schema::dropIfExists('user_attachments');
    }
};
