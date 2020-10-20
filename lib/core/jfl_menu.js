const isNilOrEmpty = require('../utils/string_utils').isNilOrEmpty;
const BuildException = require('../exceptions/exception_factory').buildException;
const exceptions = require('../exceptions/exception_factory').exceptions;

class JFLMenu {
    constructor(args) {
        // var merged = merge(defaults(), args);
        this.m = args;
        if (isNilOrEmpty(this.m.name)) {
            throw new BuildException(exceptions.NullPointer, 'The name is mandatory to create a menu.');
        }
    }

    static isValid(menu) {
        return !(menu == null || isNilOrEmpty(menu.name) || isNilOrEmpty(menu.form) || !('body' in menu));
    }

    toString() {
        let string = '';
        if (this.m.comment) {
            string += `/**\n${this.m.comment
                .split('\n')
                .map(line => ` * ${line}\n`)
                .join('')} */\n`;
        }
        string += `menu ${this.m.name} title "${this.m.title}" form ${this.m.form} parent ${this.m.parent} {`;
        string += `\n}`;
        return string;
    }
}

module.exports = JFLMenu;
