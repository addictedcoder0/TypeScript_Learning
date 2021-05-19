export class DataSanitizr { // export will make it eligible for importing

    private value : string | number;
    private required? : boolean;
    private minLength? : number;
    private maxLength? : number;
    private min? : number;
    private max? : number;

    private constructor(value : string|number){
        this.value = value;
    }

    public static createValidator(value:string|number) : DataSanitizr {
        return new DataSanitizr(value);
    } 

    public isRequired(required : boolean) : DataSanitizr {
        this.required = required;
        return this;
    }

    public withMinLength(minLength : number) : DataSanitizr {
        this.minLength = minLength;
        return this;
    }

    public withMaxLength(maxLength : number) : DataSanitizr {
        this.maxLength = maxLength;
        return this;
    }

    public withMinValue(min : number) : DataSanitizr {
        this.min = min;
        return this;
    }

    public withMaxValue(max : number) : DataSanitizr {
        this.max = max;
        return this;
    }

    public validate() : boolean { 
        
        let isValid = true;
        // String validation
        if(this.required){
            isValid = isValid && this.value.toString().trim().length !== 0;
        }
        if(this.minLength){
            isValid = isValid && this.value.toString().trim().length >= this.minLength;
        }
        if(this.maxLength){
            isValid = isValid && this.value.toString().trim().length <= this.maxLength;
        }

        // number validation
        if(typeof this.value ==='number'){
            if(this.min){
                isValid = isValid && (+this.value) >= this.min;
            }
            if(this.max){
                isValid = isValid && (+this.value) <= this.max;
            }
        }
        return isValid;
    }

}


