<?php

namespace App\Http\Controllers;

use App\Http\Requests\OperatorIndexRequest;
use App\Http\Requests\OperatorRequest;
use App\Http\Resources\OperatorIndexResource;
use App\Http\Resources\OperatorResource;
use App\Models\Operator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class OperatorController extends Controller
{
    public function index(OperatorIndexRequest $request)
    {
        $operators = Operator::where($request->getSearchQuery())
            ->orderBy('id', 'asc')
            ->paginate(($request->getPerPage()));

        return OperatorIndexResource::collection($operators);
    }

    public function store(OperatorRequest $request)
    {
        $validated = $request->preProcess();
        $operator = Operator::create($validated);
        return new OperatorResource($operator);
    }

    public function show($id)
    {
        $operator = Operator::find($id);
        return new OperatorResource($operator);
    }

    public function update(OperatorRequest $request, $id)
    {
        $validated = $request->validated();
        Operator::find($id)->update($validated);
        $operator = Operator::find($id);
        return (new OperatorResource($operator))->response()->setStatusCode(202);
    }

    public function destroy($id)
    {
        Operator::destroy($id);
    }

    public function resetPassword($id)
    {
        $newPassword = Str::random(10);
        $hashedNewPassword = Hash::make($newPassword);
        Operator::find($id)->update([
            'password' => $hashedNewPassword,
        ]);
        return response()->json([
            'id' => $id,
            'newPassword' => $newPassword,
        ]);
    }
}
