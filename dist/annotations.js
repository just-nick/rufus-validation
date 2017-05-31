"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Validate(options) {
    const defaultValidationOptions = { required: false };
    for (const key of Object.keys(defaultValidationOptions)) {
        if (options[key] === undefined) {
            options[key] = defaultValidationOptions[key];
        }
    }
    return (target, propertyKey) => {
        Reflect.defineMetadata('best-validator-ever:options', options, target, propertyKey);
    };
}
exports.Validate = Validate;
function Required(required = true) {
    return Validate({ required });
}
exports.Required = Required;
//# sourceMappingURL=annotations.js.map