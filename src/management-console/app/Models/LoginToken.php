<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class LoginToken
{
    use HasFactory;

    public $token;

    public function __construct(string $token) {
        $this->token = $token;
    }
}
