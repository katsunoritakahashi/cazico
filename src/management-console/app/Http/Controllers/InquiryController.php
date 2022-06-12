<?php

namespace App\Http\Controllers;

use App\Http\Requests\InquiryIndexRequest;
use App\Http\Requests\InquiryReplyRequest;
use App\Http\Requests\InquiryUpdateRequest;
use App\Http\Resources\InquiryIndexResource;
use App\Http\Resources\InquiryReplyResource;
use App\Http\Resources\InquiryResource;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InquiryController extends Controller
{
    public function index(InquiryIndexRequest $request)
    {
        $query = Inquiry::where($request->getSearchQuery());
        $inquiries = $request->searchCondition($query)
            ->orderBy('created_at', 'desc')
            ->paginate(($request->getPerPage()));

        return InquiryIndexResource::collection($inquiries);
    }

    public function show($id)
    {
        $inquiry = Inquiry::find($id);
        return new InquiryResource($inquiry);
    }

    public function update(InquiryUpdateRequest $request, $id)
    {
        Inquiry::find($id)->update($request->validated());
        $inquiry = Inquiry::find($id);
        return (new InquiryResource($inquiry))->response()->setStatusCode(202);
    }

    public function destroy($id)
    {
        Inquiry::destroy($id);
    }

    public function reply(InquiryReplyRequest $request, $id)
    {
        $reply = DB::transaction(function () use ($request, $id) {
            $inquiry = Inquiry::find($id);
            // 返信作成
            $reply = $inquiry->InquiryReplies()->create([
                'body' => $request->input('body')
            ]);
            // メール送信
            $reply->sendMail();
            return $reply;
        });
        return (new InquiryReplyResource($reply))->response()->setStatusCode(201);
    }
}
