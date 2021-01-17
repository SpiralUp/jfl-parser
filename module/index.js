const JFLReader = require('../lib/reader/jfl_reader');
const convertToJFL = require('../lib/parser/jfl_parser').parse;
const parseFromConfigurationObject = require('../lib/parser/jfl_parser').parseFromConfigurationObject;
const exportFormToJSON = require('../lib/export/json_form_exporter').exportFormToJSON;
const exportForms = require('../lib/export/json_form_exporter').exportForms;
const createJHipsterFormsFolder = require('../lib/export/json_form_exporter').createJHipsterFormsFolder;
const toFilePath = require('../lib/reader/json_file_reader').toFilePath;
const toFromFilePath = require('../lib/reader/json_file_reader').toFormFilePath;
const toMenuFilePath = require('../lib/reader/json_file_reader').toMenuFilePath;
const readFormJSON = require('../lib/reader/json_file_reader').readFormJSON;
const ObjectUtils = require('../lib/utils/object_utils');
const JFLObject = require('../lib/core/jfl_object');
const JFLForm = require('../lib/core/jfl_form');
const JFLMenu = require('../lib/core/jfl_object');

module.exports = {
    /* JFL reading */
    parse: JFLReader.parse,
    parseFromContent: JFLReader.parse,
    parseFromFiles: JFLReader.parseFromFiles,
    /* JFL Conversion */
    convertToJFL,
    parseFromConfigurationObject,
    /* JSON exporting */
    exportFormToJSON,
    exportForms,
    /* JSON utils */
    ObjectUtils,
    createJHipsterFormsFolder,
    readFormJSON,
    toFilePath,
    toFormFilePath: toFromFilePath,
    toMenuFilePath,
    JFLObject,
    JFLForm,
    JFLMenu
};
