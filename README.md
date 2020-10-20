# JFL Parser

A parser for JHipster Form Language.

The JFL language enables definition of a form as a set of composable subforms.
Each form could be based on an **entity** and could have one or more **subforms**.  Of course, subforms could also have a list of subforms.

The form presentation is defined by a **template** used to generate a form.

To define a master - details kind of forms a **parent** and **linked** fields could be defined on subforms.

One form could also have several views, for example a list view, edit view and show view.

The JFL grammar also enables definition of nested menus.

Definition of the JFL grammar is [here](https://htmlpreview.github.io/?https://github.com/SpiralUp/jfl-parser/blob/master/lib/dsl/grammar.html).
The parser is generated with *peg.js*.


## Examples

### Simple form    

    form formName title "Form Title" {
        entity Person
        template "default"
        fields {
            id title "ID",
            name title "Name" required
            status title "Status" default "ACTIVE"
            validFrom title "Valid from" default "today"
            validUntil title "Valid until"
        }
        views {
            list {
                fields id, name
            }
            edit {
                fields all except status
            }
            show {
                fields all
            }
        }
    }   

### Master - detail form

    /**
    * Master form
    */
    form masterFormName title "Master Form Title" {
        entity Person
        template "default"
        fields {
            id title "ID" required,
            name title "Name" required
        }
        
        /**
        * Detail form
        */
        form subformName title "Subform" {
            entity PersonContact
            template "subform"
            parent fields id
            linked fields person
            fields {
                id title "ID",
                contact title "Contact",
                person title "Person"
            }
        }
        views {
            editableList {
                fields id, contact
            }
        }
    }   

### Menu definiton 1

    menu mnuName01 title "MenuTitle01" {
        menu mnuName02 title "MenuTitle02" form formName2
        menu mnuName03 title "MenuTitle03" form formName3
    }

### Menu definition 2

    menu mnuName01 title "MenuTitle01"
    menu mnuName02 title "MenuTitle02" form formName2 parent mnuName01
    menu mnuName03 title "MenuTitle03" form formName3 parent mnuName01

## Usage

1. Include *jfl-parser* in your code

```
    const formParser = require('jfl-parser');
```
    
2. Create function that calls a parser with a list of JFL files

```    
    parseJFL() {
        try {
            const jflObject = formParser.convertToJFL(formParser.parseFromFiles(this.jflFiles));
            this.changedForms = formParser.exportFormToJSON(jflObject.forms, this.options.force);

            this.updatedKeys = Object.keys(this.changedForms);
            if (this.updatedKeys.length > 0) {
                this.log(`Updated forms are: ${chalk.yellow(this.updatedKeys)}`);
            } else {
                this.log(chalk.yellow('No change in form configurations. No forms were updated'));
            }
        } catch (e) {
            this.debug('Error:', e);
            if (e && e.message) {
                this.log(chalk.red(`${e.name || ''}: ${e.message}`));
            }
            this.error('\nError while parsing entities from JFL\n');
        }
    }
```
