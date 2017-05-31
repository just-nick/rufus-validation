import 'reflect-metadata';
import { ValidatableType } from "./validatable-type";
export declare class Validator {
    static validateAsync<Type>(object: Type, AsType?: ValidatableType<Type>): Promise<Type>;
    static validate<Type>(object: Type, AsType?: ValidatableType<Type>): Type;
    private static validateRequired(value, prop);
    private static validateType(value, prop, typeName);
}
