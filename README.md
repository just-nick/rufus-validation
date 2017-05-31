# rufus-validation
Woof Woof Woof. (Translation: Decorator based validation)

Rufus can validate an object, making sure that all fields are correctly typed at runtime and also validating on user options such as making a field required ~~or matching a certain pattern~~.

## Usage
Make sure you have ``expecimentalDecorators`` and ``emitDecoratorMetadata`` enabled in your ``tsconfig.json``.

Install the library from npm...
```
npm install npm-module-tbc --save
```

Add a validation decorator to any property you want to be validated.

e.g.
```
class ExampleRequest {
    @Validate()
    public standard: string;

    @Validate({
        required: true
    })
    public standardWithOptions: string;

    @Required()
    public mandatoryValue: number;

    @Required(false)
    public optionalProperty: string;
}
```

Then you can test that the object contains valid data by using a validate method.

e.g.
```
let data = new ExampleRequest();
data.standard = 'value';
data.standardWithOptions = true;

let errors = Validator.validate(data);
```

In this example, errors would contain...
```
[
    {
        field: 'standardWithOptions',
        message: 'is not of type string',
        value: true
    },
    {
        field: 'mandatoryValue',
        message: 'is a required field'
    }
]
```