import 'reflect-metadata';
import { ValidationError } from "./validation-error";
import { ValidatableType } from "./validatable-type";
export declare class Validator {
    static validate<Type>(object: Type, AsType?: ValidatableType<Type>): ValidationError[];
    private static validateRequired(value, prop);
    private static validateType(value, prop, typeName);
}
