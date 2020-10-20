// const merge = require('../utils/object_utils').merge,
const isNilOrEmpty = require('../utils/string_utils').isNilOrEmpty;
// const BuildException = require('../exceptions/exception_factory').buildException;
// const exceptions = require('../exceptions/exception_factory').exceptions;

class JFLForm {
    constructor(args) {
        this.f = args;
    }

    static isValid(form) {
        if (form == null || isNilOrEmpty(form.name) || isNilOrEmpty(form.title) || !('body' in form)) {
            return false;
        }

        return true;
    }

    toString() {
        let formAsString = '';
        if (this.f.comment) {
            formAsString += `/**\n${this.f.comment
                .split('\n')
                .map(line => ` * ${line}\n`)
                .join('')} */\n`;
        }
        formAsString += `form ${this.f.name} title "${this.f.title}" {`;
        if (this.f.body.entity) {
            formAsString += `\n  entity ${this.f.body.entity}`;
        }
        if (this.f.body.template) {
            formAsString += `\n  template "${this.f.body.template}"`;
        }
        formAsString += `\n}`;
        return formAsString;
    }
}

module.exports = JFLForm;
