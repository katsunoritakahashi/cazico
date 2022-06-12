<?php

namespace App\Mail;

use App\Models\InquiryReply;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InquiryReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    public $title;
    public $reply;
    public $inquiry;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(InquiryReply $inquiryReply)
    {
        $inquiryTitle = "お問い合わせ【{$inquiryReply->inquiry->title}】について";
        $this->title = $inquiryTitle;
        $this->reply = $inquiryReply->body;
        $this->inquiry = $inquiryReply->inquiry->body;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $mail = $this->from(config('mail.from.address'), 'CAZICO運営事務局')
            ->view('emails.inquiry_mail')
            ->text('emails.inquiry_mail_plain')
            ->subject($this->title)
            ->with([
                'reply' => $this->reply,
                'inquiry' => $this->inquiry,
            ]);
        return $mail;
    }
}
