"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const validation_exception_1 = require("./validation.exception");
class Validator {
    static validateAsync(object, AsType) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.validate(object, AsType));
            }
            catch (e) {
                reject(e.errors);
            }
        });
    }
    static validate(object, AsType) {
        let typeInstance;
        if (AsType) {
            typeInstance = new AsType();
        }
        const errors = [];
        const typeToValidate = typeInstance || object;
        const properties = Reflect.getMetadata('rufus-validation:properties', typeToValidate);
        for (const prop of properties) {
            console.log('Prop', prop);
            const value = object[prop];
            const type = Reflect.getMetadata('design:type', typeToValidate, prop);
            const options = Reflect.getMetadata('rufus-validation:options', typeToValidate, prop);
            if (options.required) {
                const error = this.validateRequired(value, prop);
                if (error) {
                    errors.push(error);
                    continue;
                }
            }
            const error = this.validateType(value, prop, type.name);
            if (error) {
                errors.push(error);
            }
            if (options.customValidator) {
                const message = options.customValidator(value);
                if (message) {
                    errors.push({
                        field: prop,
                        message,
                        value
                    });
                    continue;
                }
            }
        }
        if (errors.length > 0) {
            throw new validation_exception_1.ValidationException(errors);
        }
        return object;
    }
    static validateRequired(value, prop) {
        if (value === null || value === undefined) {
            return {
                field: prop,
                message: 'is a required field'
            };
        }
    }
    static validateType(value, prop, typeName) {
        if (value !== null && value !== undefined && typeName.toLowerCase() !== (typeof value).toLowerCase()) {
            return {
                field: prop,
                message: 'is not of type ' + typeName,
                value
            };
        }
    }
}
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map