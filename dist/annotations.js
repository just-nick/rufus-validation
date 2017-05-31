"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Validate(options) {
    const defaultValidationOptions = { required: false };
    if (options) {
        for (const key of Object.keys(defaultValidationOptions)) {
            if (options[key] === undefined) {
                options[key] = defaultValidationOptions[key];
            }
        }
    }
    else {
        options = defaultValidationOptions;
    }
    return (target, propertyKey) => {
        let properties = Reflect.getMetadata('rufus-validation:properties', target);
        if (properties) {
            properties.push(propertyKey);
        }
        else {
            properties = [propertyKey];
        }
        Reflect.defineMetadata('rufus-validation:properties', properties, target);
        Reflect.defineMetadata('rufus-validation:options', options, target, propertyKey);
    };
}
exports.Validate = Validate;
function Required(required = true) {
    return Validate({ required });
}
exports.Required = Required;
//# sourceMappingURL=annotations.js.map