<?php

namespace App\Http\Controllers;

use App\Http\Requests\RewardIndexRequest;
use App\Http\Resources\RewardIndexResource;
use App\Models\Reward;
use Illuminate\Http\Request;

class RewardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(RewardIndexRequest $request, $userId)
    {
        $rewards = Reward::where('user_id', $userId)
            ->where($request->getSearchQuery())
            ->orderBy('updated_at', 'desc')
            ->paginate(($request->getPerPage()));

        return RewardIndexResource::collection($rewards);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reward  $reward
     * @return \Illuminate\Http\Response
     */
    public function destroy($userId, $id)
    {
        Reward::destroy($id);
    }
}
