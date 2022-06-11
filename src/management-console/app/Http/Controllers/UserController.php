<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HouseWork  $houseWork
     * @return \Illuminate\Http\Response
     */
    public function show($familyId, $id)
    {
        $user = User::find($id);
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\HouseWork  $houseWork
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, $familyId, $id)
    {
        $inquiry = User::find($id);
        try {
            DB::transaction(function () use ($request, $inquiry) {
                $inquiry->update($request->validated());
                $inquiry->refresh();
            });
            return (new UserResource($inquiry))->response()->setStatusCode(202);
        } catch (\Exception $e) {
            return (new UserResource($inquiry))->response()->setStatusCode(500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HouseWork  $houseWork
     * @return \Illuminate\Http\Response
     */
    public function destroy($familyId, $id)
    {
        User::destroy($id);
    }
}
