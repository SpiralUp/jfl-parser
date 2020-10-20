const expect = require('chai').expect;
const formCore = require('../../module');
const parseFromFiles = require('../../lib/reader/jfl_reader').parseFromFiles;

describe('::JFLToJSON', () => {
    describe('when passing invalid arguments', () => {
        it('exception if folder does not exist', () => {
            let exception = '';

            try {
                parseFromFiles(['./test/test_files/test_jfl_to_json2/test01.jfl']);
            } catch (e) {
                exception = e.name;
            }
            expect(exception).to.eq('WrongFileException');
        });
        it('exception if file does not exist', () => {
            let exception = '';

            try {
                parseFromFiles(['./test/test_files/test_jfl_to_json/test01_unexisting.jfl']);
            } catch (e) {
                exception = e.name;
            }
            expect(exception).to.eq('WrongFileException');
        });
        it("syntax error if form doesn't have a name ", () => {
            let exception = '';

            try {
                parseFromFiles(['./test/test_files/test_jfl_to_json/forms01.jfl']);
            } catch (e) {
                exception = e.name;
            }
            expect(exception).to.eq('SyntaxError');
        });
        it("exception if form JSON doesn't have a name ", () => {
            const input = {
                forms: [
                    {
                        title: 'Persons',
                        body: {
                            fields: []
                        }
                    }
                ]
            };
            let exception = '';

            try {
                formCore.convertToJFL(input);
            } catch (e) {
                exception = e.name;
            }
            expect(exception).to.eq('InvalidObjectException');
        });

        it("exception if form JSON doesn't have a body ", () => {
            const input = {
                forms: [
                    {
                        name: 'personForm',
                        title: 'Persons'
                    }
                ]
            };
            let exception = '';

            try {
                formCore.convertToJFL(input);
            } catch (e) {
                exception = e.name;
            }
            expect(exception).to.eq('InvalidObjectException');
        });
        it('exception if wrong file exception', () => {
            let exception = '';

            try {
                parseFromFiles(['./test/test_files/test_jfl_to_json/forms02.jdl']);
            } catch (e) {
                exception = e.name;
            }
            expect(exception).to.eq('WrongFileException');
        });
        it('exception when empty list of files', () => {
            let exception = '';

            try {
                parseFromFiles(null);
            } catch (e) {
                exception = e.name;
            }
            expect(exception).to.eq('IllegalArgumentException');
        });
    });

    describe('when passing valid arguments', () => {
        it('list of valid files', () => {
            const input = parseFromFiles([
                './test/test_files/test_jfl_to_json/forms02.jfl',
                './test/test_files/test_jfl_to_json/forms03.jfl'
            ]);
            expect(input.forms.length).to.eq(2);
        });
        it('menu definition 01', () => {
            const input = parseFromFiles(['./test/test_files/test_jfl_to_json/menu01.jfl']);
            expect(input.menus.length).to.eq(1);
        });
        it('menu definition 02', () => {
            const input = parseFromFiles(['./test/test_files/test_jfl_to_json/menu02.jfl']);
            expect(input.menus.length).to.eq(2);
        });
        it('menu definition 03', () => {
            const input = parseFromFiles(['./test/test_files/test_jfl_to_json/menu03.jfl']);
            expect(input.menus.length).to.eq(1);
            expect(input.menus[0].body.length).to.eq(2);
        });
        it('menu definition 03 to string', () => {
            const input = parseFromFiles(['./test/test_files/test_jfl_to_json/menu03.jfl']);

            expect(input.menus.length).to.eq(1);
            expect(input.menus[0].body.length).to.eq(2);
        });
    });
});
