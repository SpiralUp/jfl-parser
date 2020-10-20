const fs = require('fs');
const pegjsParser = require('../dsl/pegjs_parser');
const BuildException = require('../exceptions/exception_factory').buildException;
const exceptions = require('../exceptions/exception_factory').exceptions;

module.exports = {
    parse,
    parseFromFiles,
    checkFileIsJFLFile
};

/* Parse the given content and return an intermediate object */
function parse(content) {
    if (!content || content.length === 0) {
        throw new BuildException(exceptions.IllegalArgument, 'The content must be passed.');
    }
    return pegjsParser.parse(filterJFLDirectives(removeInternalJFLComments(content)));
}

function removeInternalJFLComments(content) {
    return content.replace(/\/\/[^\n\r]*/gm, '');
}

function filterJFLDirectives(content) {
    return content.replace(/^\u0023.*\n?/gm, '');
}

/* Parse the given files and return an intermediate object */
function parseFromFiles(files) {
    if (!files || files.length === 0) {
        throw new BuildException(exceptions.IllegalArgument, 'The file/s must be passed.');
    }
    checkAllTheFilesAreJFLFiles(files);
    return parse(files.length === 1 ? readFileContent(files[0]) : aggregateFiles(files));
}

/* private methods */

function checkAllTheFilesAreJFLFiles(files) {
    for (let i = 0; i < files.length; i++) {
        checkFileIsJFLFile(files[i]);
    }
}

function checkFileIsJFLFile(file) {
    if (file.slice(file.length - 3, file.length) !== '.jf' && file.slice(file.length - 4, file.length) !== '.jfl') {
        throw new BuildException(
            exceptions.WrongFile,
            `The passed file '${file}' must end with '.jf' or '.jfl' to be valid.`
        );
    }
}

function aggregateFiles(files) {
    let content = '';
    for (let i = 0; i < files.length; i++) {
        content = `${content}\n${readFileContent(files[i])}`;
    }
    return content;
}

function readFileContent(file) {
    let isDirOrInvalid;
    try {
        isDirOrInvalid = fs.statSync(file).isDirectory();
    } catch (error) {
        // doesn't exist
        isDirOrInvalid = true;
    }
    if (isDirOrInvalid) {
        throw new BuildException(
            exceptions.WrongFile,
            `The passed file '${file}' must exist and must not be a directory.`
        );
    }
    return fs.readFileSync(file, 'utf-8').toString();
}
