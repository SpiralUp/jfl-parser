const JFLObject = require('../core/jfl_object');
const BuildException = require('../exceptions/exception_factory').buildException;
const exceptions = require('../exceptions/exception_factory').exceptions;

module.exports = {
    parse,
    parseFromConfigurationObject
};

let document;
let jflObject;

/**
 * Convert the given intermediate object to JDLObject
 */
function parse(passedDocument) {
    if (!passedDocument) {
        throw new BuildException(exceptions.NullPointer, 'The parsed JFL content must be passed.');
    }
    init(passedDocument);
    fillForms();
    fillMenus();
    return jflObject;
}

function init(passedDocument) {
    document = passedDocument;
    jflObject = new JFLObject();
}

function parseFromConfigurationObject(configurationObject) {
    const passedDocument = configurationObject.parsedContent || configurationObject.document;
    if (!passedDocument) {
        throw new Error('The parsed JDL content must be passed.');
    }
    return parse(passedDocument);
}

function fillForms() {
    for (let i = 0; i < document.forms.length; i++) {
        jflObject.addForm(document.forms[i]);
    }
}

function fillMenus() {
    for (let i = 0; i < document.menus.length; i++) {
        jflObject.addMenu(document.menus[i]);
    }
}
