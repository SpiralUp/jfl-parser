/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = {
    areFormsEqual
};

function areFormsEqual(firstEntity, secondEntity) {
    if (
        firstEntity.body.length !== secondEntity.body.length ||
        firstEntity.body.properties.length !== secondEntity.body.properties.length ||
        firstEntity.body.parent.length !== secondEntity.body.parent.length ||
        firstEntity.body.linked.length !== secondEntity.body.linked.length ||
        firstEntity.body.fields.length !== secondEntity.body.fields.length ||
        firstEntity.body.views.length !== secondEntity.body.views.length ||
        firstEntity.body.subforms.length !== secondEntity.body.subforms.length ||
        firstEntity.name !== secondEntity.name ||
        firstEntity.title !== secondEntity.title ||
        firstEntity.body.entity !== secondEntity.body.entity ||
        firstEntity.body.template !== secondEntity.body.template
    ) {
        return false;
    }
    return (
        areFieldsEqual(firstEntity.body.fields, secondEntity.body.fields) &&
        arePropertiesEqual(firstEntity.body.properties, secondEntity.body.properties) &&
        areParentEqual(firstEntity.body.parent, secondEntity.body.parent) &&
        areLinkedEqual(firstEntity.body.linked, secondEntity.body.linked) &&
        areViewsEqual(firstEntity.body.views, secondEntity.body.views) &&
        areSubformsEqual(firstEntity.body.subforms, secondEntity.body.subforms)
    );
}

function areFieldsEqual(firstFields, secondFields) {
    return firstFields.every(function(field, index) {
        // if (Object.keys(field).length !== Object.keys(secondFields[index]).length) {
        //  return false;
        // }
        const secondEntityField = secondFields[index];
        return Object.keys(field).every(function(key) {
            if (field[key] && field[key].constructor === Array) {
                return field[key].toString() === secondEntityField[key].toString();
            }
            return field[key] === secondEntityField[key];
        });
    });
}

function areRolesEqual(firstRoles, secondRoles) {
    return firstRoles.every(function(role, index) {
        // if (Object.keys(field).length !== Object.keys(secondFields[index]).length) {
        //  return false;
        // }
        const secondRole = secondRoles[index];
        return Object.keys(role).every(function(key) {
            if (role[key] && role[key].constructor === Array) {
                return role[key].toString() === secondRole[key].toString();
            }
            return role[key] === secondRole[key];
        });
    });
}

function arePropertiesEqual(firstProperties, secondProperties) {
    return firstProperties.every(function(property, index) {
        // if (Object.keys(property).length !== Object.keys(secondProperties[index]).length) {
        //   return false;
        // }
        const secondProperty = secondProperties[index];
        return Object.keys(property).every(function(key) {
            if (property[key].constructor === Array) {
                return property[key].toString() === secondProperty[key].toString();
            }
            return property[key] === secondProperty[key];
        });
    });
}

function areParentEqual(firstParents, secondParents) {
    return firstParents.every(function(parent, index) {
        if (Object.keys(parent).length !== Object.keys(secondParents[index]).length) {
            return false;
        }
        const secondParent = secondParents[index];
        return Object.keys(parent).every(function(key) {
            if (parent[key].constructor === Array) {
                return parent[key].toString() === secondParent[key].toString();
            }
            return parent[key] === secondParent[key];
        });
    });
}

function areLinkedEqual(firstLinkeds, secondLinkeds) {
    return firstLinkeds.every(function(linked, index) {
        if (Object.keys(linked).length !== Object.keys(secondLinkeds[index]).length) {
            return false;
        }
        const secondLinked = secondLinkeds[index];
        return Object.keys(linked).every(function(key) {
            if (linked[key].constructor === Array) {
                return linked[key].toString() === secondLinked[key].toString();
            }
            return linked[key] === secondLinked[key];
        });
    });
}

function areViewsEqual(firstViews, secondViews) {
    return firstViews.every(function(view, index) {
        if (Object.keys(view).length !== Object.keys(secondViews[index]).length) {
            return false;
        }
        const secondView = secondViews[index];
        let f1incLen = 0;
        let f2incLen = 0;
        let f1excLen = 0;
        let f2excLen = 0;

        let r1incLen = 0;
        let r2incLen = 0;
        let r1excLen = 0;
        let r2excLen = 0;

        if (view.fields) {
            f1incLen = view.fields.included ? view.fields.included.length : 0;
            f1excLen = view.fields.excluded ? view.fields.excluded.length : 0;
        }
        if (secondView.fields) {
            f2incLen = secondView.fields.included ? secondView.fields.included.length : 0;
            f2excLen = secondView.fields.excluded ? secondView.fields.excluded.length : 0;
        }
        if (view.roles) {
            r1incLen = view.roles.included ? view.roles.included.length : 0;
            r1excLen = view.roles.excluded ? view.roles.excluded.length : 0;
        }
        if (secondView.roles) {
            r2incLen = secondView.roles.included ? secondView.roles.included.length : 0;
            r2excLen = secondView.roles.excluded ? secondView.roles.excluded.length : 0;
        }
        if (
            f1incLen !== f2incLen ||
            f1excLen !== f2excLen ||
            r1incLen !== r2incLen ||
            r1excLen !== r2excLen ||
            view.view !== secondView.view
        ) {
            return false;
        }
        return (
            areFieldsEqual(view.fields.included, secondView.fields.included) ||
            areFieldsEqual(view.fields.excluded, secondView.fields.excluded) ||
            areRolesEqual(view.roles.included, secondView.roles.included) ||
            areRolesEqual(view.roles.excluded, secondView.roles.excluded)
        );
    });
}

function areSubformsEqual(firstSubforms, secondSubforms) {
    return firstSubforms.every(function(form, index) {
        // if (Object.keys(form).length !== Object.keys(secondSubforms[index]).length) {
        //   return false;
        // }
        const secondForm = secondSubforms[index];
        return areFormsEqual(form, secondForm);
    });
}
