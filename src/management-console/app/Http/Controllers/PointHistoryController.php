<?php

namespace App\Http\Controllers;

use App\Http\Requests\PointHistoryIndexRequest;
use App\Http\Resources\PointHistoryIndexResource;
use App\Models\PointHistory;
use Illuminate\Http\Request;

class PointHistoryController extends Controller
{
    public function index(PointHistoryIndexRequest $request)
    {
        $query = PointHistory::where($request->getSearchQuery());
        $families = $request->searchCondition($query)
            ->orderBy('created_at', 'desc')
            ->paginate(($request->getPerPage()));

        return PointHistoryIndexResource::collection($families);
    }

    public function destroy($id)
    {
        PointHistory::destroy($id);
    }
}
