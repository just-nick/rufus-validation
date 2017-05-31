import { ValidationOptions } from "./validation-options";
import { CustomValidation } from "./custom-validation";

const defaultValidationOptions: ValidationOptions = { required: false };

export function Validate(options?: ValidationOptions) {
    return (target: any, propertyKey: string) => {
        let currentOptions = Reflect.getMetadata('rufus-validation:options', target, propertyKey) || defaultValidationOptions;

        if (options) {
            for (const key of Object.keys(options)) {
                currentOptions[key] = options[key];
            }
        }

        let properties: string[] = Reflect.getMetadata('rufus-validation:properties', target);

        if (!properties) {
            properties = [propertyKey];
        }
        else if(properties.indexOf(propertyKey) === -1) {
            properties.push(propertyKey);
        }

        Reflect.defineMetadata('rufus-validation:properties', properties, target);
        Reflect.defineMetadata('rufus-validation:options', currentOptions, target, propertyKey);
    };
}

export function Required(required = true) {
    return Validate({ required });
}

export function CustomValidation(customValidator: CustomValidation) {
    return Validate({ customValidator });
}