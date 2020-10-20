const fs = require('fs');
const _ = require('lodash');
const isNilOrEmpty = require('../utils/string_utils').isNilOrEmpty;
const BuildException = require('../exceptions/exception_factory').buildException;
const exceptions = require('../exceptions/exception_factory').exceptions;

module.exports = {
    readFormJSON,
    toFilePath,
    toFormFilePath,
    toMenuFilePath,
    doesfileExist
};

function readFormJSON(filePath) {
    if (isNilOrEmpty(filePath)) {
        throw new BuildException(exceptions.NullPointer, 'The passed file path must not be nil.');
    }
    try {
        if (!doesfileExist(filePath)) {
            throw new BuildException(exceptions.FileNotFound, `The passed file '${filePath}' is a folder.`);
        }
    } catch (error) {
        if (error.name === 'FileNotFoundException') {
            throw error;
        }
        throw new BuildException(exceptions.FileNotFound, `The passed file '${filePath}' couldn't be found.`);
    }
    return JSON.parse(fs.readFileSync(filePath));
}

function toFilePath(formName) {
    if (isNilOrEmpty(formName)) {
        throw new BuildException(exceptions.NullPointer, 'The passed form name must not be nil.');
    }
    return `.jhipster/${_.upperFirst(formName)}.json`;
}

function toFormFilePath(formName) {
    if (isNilOrEmpty(formName)) {
        throw new BuildException(exceptions.NullPointer, 'The passed form name must not be nil.');
    }
    return `.jhipster/forms/${_.upperFirst(formName)}.json`;
}

function toMenuFilePath(menuName) {
    if (isNilOrEmpty(menuName)) {
        throw new BuildException(exceptions.NullPointer, 'The passed menu name must not be nil.');
    }
    return `.jhipster/menus/${_.upperFirst(menuName)}.json`;
}
function doesfileExist(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (error) {
        return false;
    }
}
