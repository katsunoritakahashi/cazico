<?php

namespace App\Http\Controllers;

use App\Http\Requests\FamilyIndexRequest;
use App\Http\Requests\FamilyRequest;
use App\Http\Resources\FamilyIndexResource;
use App\Http\Resources\FamilyResource;
use App\Models\Family;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FamilyController extends Controller
{
    public function index(FamilyIndexRequest $request)
    {
        $query = Family::where($request->getSearchQuery());
        $families = $request->searchCondition($query)
            ->orderBy('id', 'desc')
            ->paginate(($request->getPerPage()));

        return FamilyIndexResource::collection($families);
    }

    public function show($id)
    {
        $inquiry = Family::find($id);
        return new FamilyResource($inquiry);
    }

    public function update(FamilyRequest $request, $id)
    {
        $inquiry = Family::find($id);
        try {
            DB::transaction(function () use ($request, $inquiry) {
                $inquiry->update($request->validated());
                $inquiry->refresh();
            });
            return (new FamilyResource($inquiry))->response()->setStatusCode(202);
        } catch (\Exception $e) {
            return (new FamilyResource($inquiry))->response()->setStatusCode(500);
        }
    }

    public function destroy($id)
    {
        $family = Family::find($id);
        $family->destroy($id);
    }
}
