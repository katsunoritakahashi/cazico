<?php

namespace App\Http\Controllers;

use App\Http\Requests\HouseWorkIndexRequest;
use App\Http\Resources\FamilyIndexResource;
use App\Http\Resources\HouseWorkIndexResource;
use App\Models\HouseWork;
use Illuminate\Http\Request;

class HouseWorkController extends Controller
{
    public function index(HouseWorkIndexRequest $request, $familyId)
    {
        $houseWorks = HouseWork::where('family_id', $familyId)
            ->where($request->getSearchQuery())
            ->orderBy('updated_at', 'desc')
            ->paginate(($request->getPerPage()));

        return HouseWorkIndexResource::collection($houseWorks);
    }

    public function destroy($familyId, $id)
    {
        $houseWork = HouseWork::find($id);
        $houseWork->destroy($id);
    }
}
