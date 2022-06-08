<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class IndexRequest extends BaseRequest
{
    protected $conditions = [
    ];

    protected $rules = [
    ];

    /**
     * オーダー定義データ構造
     * IndexRequest.$orders にホワイトリストで定義（変なクエリが発行された際に500エラーになるのを防ぐため）
     * リクエストパラメータ名(カラム名のcamelCase) => 実行関数情報（※）の連想配列で定義
     *
     * ※実行関数情報
     *
     * [default]
     * デフォルト動作として検索対象のテーブルに存在するカラムに対してソートする orderBy メソッドを利用
     *
     * [関数名]
     * 個別処理として複雑な条件（検索対象のリレーションテーブルに存在する場合など）
     * IndexRequest 内に個別処理関数名を定義し、関数名を文字列で指定して実行
     *
     * ex)
     * protected $orders = [
     *   [requestParameter] => 'default',
     *   [requestParameter] => 'getRelationTableCount',
     * ]
     */
    protected $orders = [
    ];

    private $common_rules =  [
        'perPage' => 'integer',
        'order' => 'string',
    ];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return array_merge($this->common_rules, $this->rules);
    }

    public function getSearchQuery($specificConditions = null)
    {
        $conditions = [];
        foreach ( $specificConditions ?? $this->conditions as $name => $condition ) {
            $value = $this->input($name);
            if ( $value || $value === "0" ) {
                if ( $condition == 'in' ) continue;
                if ( $condition == 'like') {
                    $value = "%$value%";
                    // 濁点・半濁点を区別するため binary option を付与
                    $condition = 'like binary';
                }
                if ( $value === 'true') $value = true;
                if ( $value === 'false') $value = false;
                $conditions[] = [ Str::snake($name), $condition, $value ];
            }
        }
        return $conditions;
    }

    public function getSearchInQuery($specificConditions = null)
    {
        $conditions = [];
        foreach ( $specificConditions ?? $this->conditions as $name => $condition ) {
            $value = $this->input($name);
            if ( $value ) {
                if ( $condition == 'in' ) $conditions[] = [ Str::snake($name), $value ];
            }
        }
        return $conditions;
    }

    public function getOrder($query)
    {
        $orderRequests = explode(',', $this->input('order'));
        $orderQueries = collect($orderRequests)
            ->reduce(fn($carry, $name) => array_merge($carry + $this->getOrderRequestByName($name))
                , []);
        foreach ($orderQueries as $orderQuery => $direction) {
            if (array_key_exists($orderQuery, $this->orders)) {
                if ($this->orders[$orderQuery] === 'default') {
                    $query->orderBy(Str::snake($orderQuery), $direction);
                } else {
                    $orderFunc = $this->orders[$orderQuery];
                    $this->$orderFunc($query, $direction);
                }
            }
        }
        return $query;
    }

    public function getPerPage()
    {
        return $this->input('perPage');
    }

    private function getOrderRequestByName($name)
    {
        if (Str::startsWith($name, '-')) {
            return [ltrim($name, '-') => 'desc'];
        } else {
            return [$name => 'asc'];
        }
    }

}
