<?php

namespace Database\Seeders;

use App\Models\Inquiry;
use App\Models\InquiryReply;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InquirySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        foreach ($users as $user) {
            $inquiry = Inquiry::factory()->create([
                'user_id' => $user->id,
            ]);
            InquiryReply::factory()->create([
                'inquiry_id' => $inquiry->id,
            ]);
        }
    }
}
