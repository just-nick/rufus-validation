"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class Validator {
    static validate(object) {
        const errors = [];
        for (const prop of Object.keys(object)) {
            const value = object[prop];
            const type = Reflect.getMetadata('design:type', object, prop);
            const options = Reflect.getMetadata('best-validator-ever:options', object, prop);
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
        }
        return errors;
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