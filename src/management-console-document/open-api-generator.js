const path = require('path')
const shell = require('shelljs')
require('dotenv').config()

const workDir = path.resolve(__dirname)
const outDir = process.env.OUT_DIR_MANAGEMENT_TS
const genTsCommand = `docker run --rm -v "${workDir}:/local"  -v "${outDir}:/out" openapitools/openapi-generator-cli:v5.0.0-beta generate -i /local/${process.env.INPUT_MANAGEMENT} -g typescript-axios -o /out`
shell.exec(genTsCommand)
