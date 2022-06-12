<?php

namespace App\Http\Controllers;

use App\Http\Requests\RewardIndexRequest;
use App\Http\Resources\RewardIndexResource;
use App\Models\Reward;
use Illuminate\Http\Request;

class RewardController extends Controller
{
    public function index(RewardIndexRequest $request, $userId)
    {
        $rewards = Reward::where('user_id', $userId)
            ->where($request->getSearchQuery())
            ->orderBy('updated_at', 'desc')
            ->paginate(($request->getPerPage()));

        return RewardIndexResource::collection($rewards);
    }

    public function destroy($userId, $id)
    {
        Reward::destroy($id);
    }
}
