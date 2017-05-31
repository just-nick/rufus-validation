import 'reflect-metadata';
import { ValidationError } from "./validation-error";
export declare class Validator {
    static validate<Type>(object: Type): ValidationError[];
    private static validateRequired(value, prop);
    private static validateType(value, prop, typeName);
}
