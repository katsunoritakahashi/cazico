# モックサーバ起動

```shell script
$ docker-compose up -d
```
# Open API コードジェネレータ

open api のスキーマファイル(yaml ファイル)を直接もしくは stopLight で編集し クライアントコードを生成するスクリプト群

## editorダウンロード

https://stoplight.io/studio/

## コード生成

### management-console-document/root.yamlファイルに生成したいAPIを記述

### management-console-documentディレクトリで下記コマンド実行

```
$ cd src/management-console-document
$ bash sub_tools/gen.sh
```
