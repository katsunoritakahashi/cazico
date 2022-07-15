#!/bin/bash
### managenment-console-document/sub_tools に置いて使う
CUR_DIR=$(cd $(dirname $0); pwd)
cd $CUR_DIR/..
java -jar $CUR_DIR/openapi-generator-cli.jar generate -g typescript-axios -i ./management/root.yaml -o ../management-console/resources/js/api/

