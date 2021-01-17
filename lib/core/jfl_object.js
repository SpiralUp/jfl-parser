/**
 * Created by vrba on 20.3.2017..
 */

const JFLForm = require('./jfl_form');
const JFLMenu = require('./jfl_menu');
const BuildException = require('../exceptions/exception_factory').buildException;
const exceptions = require('../exceptions/exception_factory').exceptions;

class JFLObject {
    constructor() {
        this.forms = {};
        this.menus = {};
    }

    /**
     * Adds or replaces a form
     * @param form
     */
    addForm(form) {
        if (!JFLForm.isValid(form)) {
            throw new BuildException(exceptions.InvalidObject, 'The form must be valid in order to be added.');
        }
        this.forms[form.name] = form;
    }

    /**
     * Adds or replaces a menu
     * @param menu
     */
    addMenu(menu) {
        if (!JFLMenu.isValid(menu)) {
            throw new BuildException(exceptions.InvalidObject, 'The menu must be valid in order to be added.');
        }
        this.menus[menu.name] = menu;
    }

    toString() {
        let string = '';
        string += `${formsToString(this.forms)}\n`;
        string += `${menusToString(this.menus)}\n`;
        return string;
    }

    getApplicationQuantity() {
        return 0;
    }

    getForms() {
        return Object.values(this.forms);
    }

    getFormQuantity() {
        return this.getFormNames().length;
    }

    getFormNames() {
        return Object.keys(this.forms);
    }

    forEachForm(passedFunction) {
        if (!passedFunction) {
            return;
        }
        Object.keys(this.forms).forEach((formName, index, array) => {
            const form = this.entities[formName];
            passedFunction(form, index, array);
        });
    }

    getMenus() {
        return Object.values(this.menus);
    }

    getMenuQuantity() {
        return this.getFormNames().length;
    }

    getMenuNames() {
        return Object.keys(this.menus);
    }

    forEachMenu(passedFunction) {
        if (!passedFunction) {
            return;
        }
        Object.keys(this.menus).forEach((menuName, index, array) => {
            const menu = this.entities[menuName];
            passedFunction(menu, index, array);
        });
    }
}

function formsToString(forms) {
    let string = '';
    /*
    for (const formName in forms) {
        if (forms.hasOwnProperty(formName)) {
            string += `${forms[formName].toString()}\n`;
        }
    }
*/
    Object.keys(forms).forEach(key => {
        string += `${forms[key].toString()}\n`;
    });

    return string.slice(0, string.length - 1);
}

function menusToString(menus) {
    let string = '';
    /*
    for (const menuName in menus) {
        if (menus.hasOwnProperty(menuName)) {
            string += `${menus[menuName].toString()}\n`;
        }
    }
*/
    Object.keys(menus).forEach(key => {
        string += `${menus[key].toString()}\n`;
    });

    return string.slice(0, string.length - 1);
}

module.exports = JFLObject;
