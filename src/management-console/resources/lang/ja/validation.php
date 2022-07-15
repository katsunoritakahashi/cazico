<?php

return [

    /*
    |--------------------------------------------------------------------------
    | バリデーション言語行
    |--------------------------------------------------------------------------
    |
    | 以下の言語行はバリデタークラスにより使用されるデフォルトのエラー
    | メッセージです。サイズルールのようにいくつかのバリデーションを
    | 持っているものもあります。メッセージはご自由に調整してください。
    |
    */

    'accepted'             => '承認してください。',
    'active_url'           => '有効なURLではありません。',
    'after'                => ':dateより後の日付を指定してください。',
    'after_or_equal'       => ':date以降の日付を指定してください。',
    'alpha'                => 'アルファベットのみがご利用できます。',
    'alpha_dash'           => 'アルファベットとダッシュ(-)及び下線(_)がご利用できます。',
    'alpha_num'            => 'アルファベット数字がご利用できます。',
    'array'                => '配列でなくてはなりません。',
    'before'               => ':dateより前の日付をご利用ください。',
    'before_or_equal'      => ':date以前の日付をご利用ください。',
    'between'              => [
        'numeric' => ':minから:maxの間で指定してください。',
        'file'    => ':min kBから、:max kBの間で指定してください。',
        'string'  => ':min文字から、:max文字の間で指定してください。',
        'array'   => ':min個から:max個の間で指定してください。',
    ],
    'boolean'              => 'trueかfalseを指定してください。',
    'confirmed'            => '確認フィールドと一致していません。',
    'date'                 => '有効な日付を指定してください。',
    'date_equals'          => ':dateと同じ日付けを指定してください。',
    'date_format'          => ':format形式で指定してください。',
    'different'            => ':otherと異なった内容を指定してください。',
    'digits'               => ':digits桁で指定してください。',
    'digits_between'       => ':min桁から:max桁の間で指定してください。',
    'dimensions'           => '図形サイズが正しくありません。',
    'distinct'             => '異なった値を指定してください。',
    'email'                => '有効なメールアドレスを指定してください。',
    'ends_with'            => '::valuesのどれかで終わる値を指定してください。',
    'exists'               => '選択された値は正しくありません。',
    'file'                 => 'ファイルを指定してください。',
    'filled'               => '値を指定してください。',
    'gt'                   => [
        'numeric' => '::valueより大きな値を指定してください。',
        'file'    => '::value kBより大きなファイルを指定してください。',
        'string'  => '::value文字より長く指定してください。',
        'array'   => '::value個より多くのアイテムを指定してください。',
    ],
    'gte'                  => [
        'numeric' => ':value以上の値を指定してください。',
        'file'    => ':value kB以上のファイルを指定してください。',
        'string'  => ':value文字以上で指定してください。',
        'array'   => ':value個以上のアイテムを指定してください。',
    ],
    'image'                => '画像ファイルを指定してください。',
    'in'                   => '選択された値は正しくありません。',
    'in_array'             => 'otherの値を指定してください。',
    'integer'              => '整数で指定してください。',
    'ip'                   => '有効なIPアドレスを指定してください。',
    'ipv4'                 => '有効なIPv4アドレスを指定してください。',
    'ipv6'                 => '有効なIPv6アドレスを指定してください。',
    'json'                 => '有効なJSON文字列を指定してください。',
    'lt'                   => [
        'numeric' => ':valueより小さな値を指定してください。',
        'file'    => ':value kBより小さなファイルを指定してください。',
        'string'  => ':value文字より短く指定してください。',
        'array'   => ':value個より少ないアイテムを指定してください。',
    ],
    'lte'                  => [
        'numeric' => ':value以下の値を指定してください。',
        'file'    => ':value kB以下のファイルを指定してください。',
        'string'  => ':value文字以下で指定してください。',
        'array'   => ':value個以下のアイテムを指定してください。',
    ],
    'max'                  => [
        'numeric' => ':max以下の数字を指定してください。',
        'file'    => ':max kB以下のファイルを指定してください。',
        'string'  => ':max文字以下で指定してください。',
        'array'   => ':max個以下指定してください。',
    ],
    'mimes'                => ':valuesタイプのファイルを指定してください。',
    'mimetypes'            => ':valuesタイプのファイルを指定してください。',
    'min'                  => [
        'numeric' => ':min以上の数字を指定してください。',
        'file'    => ':min kB以上のファイルを指定してください。',
        'string'  => ':min文字以上で指定してください。',
        'array'   => ':min個以上指定してください。',
    ],
    'not_in'               => '選択された値は正しくありません。',
    'not_regex'            => '形式が正しくありません。',
    'numeric'              => '数字を指定してください。',
    'present'              => '存在していません。',
    'regex'                => '正しい形式を指定してください。',
    'required'             => '必ず指定してください。',
    'required_if'          => ':otherが:valueの場合、:attributeも指定してください。',
    'required_unless'      => ':otherが:valuesでない場合、:attributeを指定してください。',
    'required_with'        => ':valuesを指定する場合は、:attributeも指定してください。',
    'required_with_all'    => ':valuesを指定する場合は、:attributeも指定してください。',
    'required_without'     => ':valuesを指定しない場合は、:attributeを指定してください。',
    'required_without_all' => ':valuesのどれも指定しない場合は、:attributeを指定してください。',
    'same'                 => ':otherと同じ値を指定してください。',
    'size'                 => [
        'numeric' => ':sizeを指定してください。',
        'file'    => ':sizeキロバイトでなくてはなりません。',
        'string'  => ':size文字で指定してください。',
        'array'   => ':size個指定してください。',
    ],
    'starts_with'          => ':valuesのどれかで始まる値を指定してください。',
    'string'               => '文字列を指定してください。',
    'timezone'             => '有効なゾーンを指定してください。',
    'unique'               => '値は既に存在しています。',
    'uploaded'             => 'アップロードに失敗しました。',
    'url'                  => '正しい形式を指定してください。',
    'uuid'                 => '有効なUUIDを指定してください。',
    'katakana'             => 'カタカナで入力してください。',
    'gender'               => '有効な性別を指定してください。',
    'latitude'             => '有効な緯度を指定してください。',
    'longitude'               => '有効な経度を指定してください。',
    'max_mb'               => ':max_mbメガバイトより大きいファイルは登録できません。',
    'password'             => '現在のパスワードが違います。',

    /*
    |--------------------------------------------------------------------------
    | Custom バリデーション言語行
    |--------------------------------------------------------------------------
    |
    | "属性.ルール"の規約でキーを指定することでカスタムバリデーション
    | メッセージを定義できます。指定した属性ルールに対する特定の
    | カスタム言語行を手早く指定できます。
    |
    */

    'custom' => [
        '属性名' => [
            'ルール名' => 'カスタムメッセージ',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | カスタムバリデーション属性名
    |--------------------------------------------------------------------------
    |
    | 以下の言語行は、例えば"email"の代わりに「メールアドレス」のように、
    | 読み手にフレンドリーな表現でプレースホルダーを置き換えるために指定する
    | 言語行です。これはメッセージをよりきれいに表示するために役に立ちます。
    |
    */

    'attributes' => [],

];