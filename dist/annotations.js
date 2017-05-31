"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultValidationOptions = { required: false };
function Validate(options) {
    return (target, propertyKey) => {
        let currentOptions = Reflect.getMetadata('rufus-validation:options', target, propertyKey) || defaultValidationOptions;
        if (options) {
            for (const key of Object.keys(options)) {
                currentOptions[key] = options[key];
            }
        }
        let properties = Reflect.getMetadata('rufus-validation:properties', target);
        if (!properties) {
            properties = [propertyKey];
        }
        else if (properties.indexOf(propertyKey) === -1) {
            properties.push(propertyKey);
        }
        Reflect.defineMetadata('rufus-validation:properties', properties, target);
        Reflect.defineMetadata('rufus-validation:options', currentOptions, target, propertyKey);
    };
}
exports.Validate = Validate;
function Required(required = true) {
    return Validate({ required });
}
exports.Required = Required;
function CustomValidation(customValidator) {
    return Validate({ customValidator });
}
exports.CustomValidation = CustomValidation;
//# sourceMappingURL=annotations.js.map