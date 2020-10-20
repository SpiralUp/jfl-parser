/* eslint-disable no-new, no-unused-expressions */

const expect = require('chai').expect;
const process = require('process');
const Exporter = require('../../lib/export/json_form_exporter');
const formCore = require('../../module');
const parseFromFiles = require('../../lib/reader/jfl_reader').parseFromFiles;

const fail = expect.fail;

describe('::exportToJSON', () => {
    describe('when passing invalid parameters', () => {
        describe('such as undefined', () => {
            it('throws an error', () => {
                try {
                    Exporter.exportFormToJSON();
                    fail();
                } catch (error) {
                    expect(error.name).to.eq('NullPointerException');
                }
            });
        });
    });
    describe('when passing valid arguments', () => {
        describe('when exporting JFL to form json for standard forms', () => {
            it('check if forms are changed', () => {
                const input = parseFromFiles(['./test/test_files/test_export/forms-combo.jfl']);
                const content = formCore.convertToJFL(input);
                const currentDir = process.cwd();
                process.chdir('./test/test_files/test_export/jhipster_app');

                const forms = Exporter.exportFormToJSON(content.forms);

                expect(Object.keys(forms).length).to.eq(0);
                process.chdir(currentDir);
            });
            it('check if field props are ok', () => {
                const input = parseFromFiles(['./test/test_files/test_export/forms-combo-props.jfl']);
                const content = formCore.convertToJFL(input);
                const currentDir = process.cwd();
                process.chdir('./test/test_files/test_export/jhipster_app2');

                const forms = Exporter.exportFormToJSON(content.forms);

                expect(Object.keys(forms).length).to.eq(0);
                process.chdir(currentDir);
            });
        });
    });
});
