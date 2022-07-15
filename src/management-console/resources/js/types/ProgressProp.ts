type ProgressOptions = {
    enableSkeleton?: false
}

type ProgressState = {
    // データ取得 api リクエスト中
    fetch?: boolean
    // データ取得 api 成功
    fetched?: boolean
    // データ送信 api リクエスト中
    post?: boolean
    // 処理対象 識別子
    targetId?: null | number | string | undefined
}
