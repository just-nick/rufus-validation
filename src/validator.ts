import 'reflect-metadata';
import { ValidationException } from "./validation.exception";
import { ValidationError } from "./validation-error";
import { ValidatableType } from "./validatable-type";
import { CustomValidation } from "./custom-validation";

export class Validator {
    public static validateAsync<Type>(object: Type, AsType?: ValidatableType<Type>): Promise<Type> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.validate(object, AsType));
            }
            catch (e) {
                reject(e);
            }
        })
    }

    public static validate<Type>(object: Type, AsType?: ValidatableType<Type>): Type {
        let typeInstance: Type;
        if (AsType) {
            typeInstance = new AsType();
        }
        const errors: ValidationError[] = [];
        const typeToValidate = typeInstance || object;
        const properties: string[] = Reflect.getMetadata('rufus-validation:properties', typeToValidate);

        for (const prop of properties) {
            const value: any = (object as any)[prop];
            const type = Reflect.getMetadata('design:type', typeToValidate, prop);
            const options = Reflect.getMetadata('rufus-validation:options', typeToValidate, prop);

            if (options.required === true) {
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
            throw new ValidationException(errors);
        }

        return object;
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