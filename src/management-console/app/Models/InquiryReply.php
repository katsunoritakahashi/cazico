<?php

namespace App\Models;

use App\Mail\InquiryReplyMail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class InquiryReply extends Model
{
    use HasFactory;

    protected $fillable = [
        'body'
    ];

    public function inquiry()
    {
        return $this->belongsTo('App\Models\Inquiry');
    }

    public function sendMail() {
        Mail::to($this->inquiry->user->email)->send(new InquiryReplyMail($this));
    }
}
