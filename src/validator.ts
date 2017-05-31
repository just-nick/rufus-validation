import 'reflect-metadata';
import { ValidationError } from "./validation-error";

export class Validator {
    public static validate<Type>(object: Type) {
        const errors: ValidationError[] = [];

        for (const prop of Object.keys(object)) {
            const value: any = (object as any)[prop];
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

    private static validateRequired(value: any, prop: string): ValidationError | undefined {
        if (value === null || value === undefined) {
            return {
                field: prop,
                message: 'is a required field'
            };
        }
    }

    private static validateType(value: any, prop: string, typeName: string): ValidationError | undefined {
        if (value !== null && value !== undefined && typeName.toLowerCase() !== (typeof value).toLowerCase()) {
            return {
                field: prop,
                message: 'is not of type ' + typeName,
                value
            };
        }
    }
}