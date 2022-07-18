<?php

namespace App\Http\Resources;


use App\Models\PointHistory;
use App\Models\Position;
use Carbon\Carbon;

class FamilyIndexResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $userIds = $this->users()->pluck('users.id')->toArray();
        $positionIds = $this->users()->pluck('users.position_id')->toArray();

        // ポジション
        $positionArray = array();
        foreach ($positionIds as $positionId) {
            $positionName = Position::where('id',$positionId)->first()->name;
            array_push($positionArray, $positionName);
        }

        // 保有ポイント
        $ownedPointArray = array();
        foreach ($userIds as $userId) {
            $ownedPoints = PointHistory::where('user_id',$userId)->sum('point');
            array_push($ownedPointArray, $ownedPoints);
        }

        // 当日獲得ポイント
        $dailyGetPointArray = array();
        foreach ($userIds as $userId) {
            $dailyGetPoints = PointHistory::where('user_id',$userId)
                                            ->where('type','house_work')
                                            ->whereDate('created_at', '=', Carbon::today())
                                            ->sum('point');
            array_push($dailyGetPointArray, $dailyGetPoints);
        }

        // 週間獲得ポイント
        $weeklyGetPointArray = array();
        foreach ($userIds as $userId) {
            $weeklyGetPoints = PointHistory::where('user_id',$userId)
                ->where('type','house_work')
                ->whereDate('created_at', '>=', Carbon::today()->subDay(6))
                ->sum('point');
            array_push($weeklyGetPointArray, $weeklyGetPoints);
        }

        // 月間獲得ポイント
        $monthlyGetPointArray = array();
        foreach ($userIds as $userId) {
            $monthlyGetPoints = PointHistory::where('user_id',$userId)
                ->where('type','house_work')
                ->whereDate('created_at', '>=', Carbon::today()->subMonth())
                ->sum('point');
            array_push($monthlyGetPointArray, $monthlyGetPoints);
        }

        // 累計獲得ポイント
        $totalGetPointArray = array();
        foreach ($userIds as $userId) {
            $totalGetPoints = PointHistory::where('user_id',$userId)
                ->where('type','house_work')
                ->sum('point');
            array_push($totalGetPointArray, $totalGetPoints);
        }

        // 累計消費ポイント
        $totalUsePointArray = array();
        foreach ($userIds as $userId) {
            $totalUsePoints = PointHistory::where('user_id',$userId)
                ->where('type','reward')
                ->sum('point');
            array_push($totalUsePointArray, $totalUsePoints);
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'userName' => $this->users()->pluck('users.name'),
            'userPosition' => $positionArray,
            'userBirthday' => $this->users()->pluck('users.birthday'),
            'userEmail' => $this->users()->pluck('users.email'),
            'ownedPoints' => $ownedPointArray,
            'dailyGetPoints' => $dailyGetPointArray,
            'weeklyGetPoints' => $weeklyGetPointArray,
            'monthlyGetPoints' => $monthlyGetPointArray,
            'totalGetPoints' => $totalGetPointArray,
            'totalUsePoints' => $totalUsePointArray,
            'createdAt' => $this->createdAtToString()
        ];
    }
}
