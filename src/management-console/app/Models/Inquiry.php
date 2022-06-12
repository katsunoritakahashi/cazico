<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'status',
        'note',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }

    public function inquiryReplies()
    {
        return $this->hasMany('App\Models\InquiryReply', 'inquiry_id');
    }
}
