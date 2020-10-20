const fs = require('fs');
const readFormJSON = require('../reader/json_file_reader').readFormJSON;
const toFormFilePath = require('../reader/json_file_reader').toFormFilePath;
const doesfileExist = require('../reader/json_file_reader').doesfileExist;
const areFormsEqual = require('../utils/object_utils').areFormsEqual;
const BuildException = require('../exceptions/exception_factory').buildException;
const exceptions = require('../exceptions/exception_factory').exceptions;

module.exports = {
    exportFormToJSON,
    createJHipsterFormsFolder
};

function exportFormToJSON(forms, forceNoFiltering) {
    if (!forms) {
        throw new BuildException(exceptions.NullPointer, 'Forms have to be passed to be exported.');
    }
    createJHipsterFormsFolder();
    if (!forceNoFiltering) {
        forms = filterOutUnchangedForms(forms);
    }
    for (let i = 0, formNames = Object.keys(forms); i < formNames.length; i++) {
        // console.log('Processing form:' +formNames[i] );
        const filePath = toFormFilePath(formNames[i]);
        const form = updateChangelogDate(filePath, forms[formNames[i]]);
        fs.writeFileSync(filePath, JSON.stringify(form, null, 4));
    }
    return forms;
}

function createJHipsterFormsFolder() {
    try {
        if (!fs.statSync('./.jhipster').isDirectory()) {
            fs.mkdirSync('.jhipster');
        }
        if (!fs.statSync('./.jhipster/forms').isDirectory()) {
            fs.mkdirSync('.jhipster/forms');
        }
    } catch (error) {
        fs.mkdirSync('.jhipster/forms');
    }
}

function updateChangelogDate(filePath, entity) {
    if (doesfileExist(filePath)) {
        const fileOnDisk = readFormJSON(filePath);
        if (fileOnDisk && fileOnDisk.changelogDate) {
            entity.changelogDate = fileOnDisk.changelogDate;
        }
    }
    return entity;
}

function filterOutUnchangedForms(forms) {
    const filtered = {};
    for (let i = 0, formNames = Object.keys(forms); i < formNames.length; i++) {
        const formName = formNames[i];
        const filePath = toFormFilePath(formName);
        if (!(doesfileExist(filePath) && areFormsEqual(readFormJSON(filePath), forms[formName]))) {
            filtered[formName] = forms[formName];
        }
    }
    return filtered;
}
