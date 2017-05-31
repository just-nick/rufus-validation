export interface CustomValidation {
    (value: any): string | undefined;
}