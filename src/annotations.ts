import { ValidationOptions } from "./validation-options";

export function Validate(options?: ValidationOptions) {
    const defaultValidationOptions: ValidationOptions = { required: false };

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

    return (target: any, propertyKey: string) => {
        let properties: string[] = Reflect.getMetadata('rufus-validation:properties', target);

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

export function Required(required = true) {
    return Validate({ required });
}