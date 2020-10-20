const JFLReader = require('../lib/reader/jfl_reader');
const convertToJFL = require('../lib/parser/jfl_parser').parse;
const exportFormToJSON = require('../lib/export/json_form_exporter').exportFormToJSON;
const createJHipsterFormsFolder = require('../lib/export/json_form_exporter').createJHipsterFormsFolder;
const toFilePath = require('../lib/reader/json_file_reader').toFilePath;
const toFromFilePath = require('../lib/reader/json_file_reader').toFormFilePath;
const toMenuFilePath = require('../lib/reader/json_file_reader').toMenuFilePath;
const readEntityJSON = require('../lib/reader/json_file_reader').readFormJSON;
const ObjectUtils = require('../lib/utils/object_utils');

module.exports = {
    /* JFL reading */
    parse: JFLReader.parse,
    parseFromFiles: JFLReader.parseFromFiles,
    /* JFL Conversion */
    convertToJFL,
    /* JSON exporting */
    exportFormToJSON,
    /* JSON utils */
    ObjectUtils,
    createJHipsterFormsFolder,
    readFormJSON: readEntityJSON,
    toFilePath,
    toFormFilePath: toFromFilePath,
    toMenuFilePath
};
