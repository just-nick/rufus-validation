import { ValidationOptions } from "./validation-options";

export function Validate(options?: ValidationOptions) {
    const defaultValidationOptions: ValidationOptions = { required: false };

    for (const key of Object.keys(defaultValidationOptions)) {
        if (options[key] === undefined) {
            options[key] = defaultValidationOptions[key];
        }
    }

    return (target: any, propertyKey: string) => {
        Reflect.defineMetadata('best-validator-ever:options', options, target, propertyKey);
    };
}

export function Required(required = true) {
    return Validate({ required });
}