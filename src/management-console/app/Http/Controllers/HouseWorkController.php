<?php

namespace App\Http\Controllers;

use App\Http\Requests\HouseWorkIndexRequest;
use App\Http\Resources\FamilyIndexResource;
use App\Http\Resources\HouseWorkIndexResource;
use App\Models\HouseWork;
use Illuminate\Http\Request;

class HouseWorkController extends Controller
{
    /**
     * @param HouseWorkIndexRequest $request
     * @param $familyId
     * @return \Illuminate\Http\Response
     */
    public function index(HouseWorkIndexRequest $request, $familyId)
    {
        $houseWorks = HouseWork::where('family_id', $familyId)
            ->where($request->getSearchQuery())
            ->orderBy('updated_at', 'desc')
            ->paginate(($request->getPerPage()));

        return HouseWorkIndexResource::collection($houseWorks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HouseWork  $houseWork
     * @return \Illuminate\Http\Response
     */
    public function show(HouseWork $houseWork)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HouseWork  $houseWork
     * @return \Illuminate\Http\Response
     */
    public function edit(HouseWork $houseWork)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\HouseWork  $houseWork
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HouseWork $houseWork)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HouseWork  $houseWork
     * @return \Illuminate\Http\Response
     */
    public function destroy(HouseWork $houseWork)
    {
        //
    }
}
