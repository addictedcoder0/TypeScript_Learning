import { IsNotEmpty , IsNumber , IsPositive} from "class-validator";

export class Invoice { // export will make it eligible for importing

    @IsNotEmpty() // These Decorators don't do valdiation automaatically instead we have to invoke "validate()" on the obj and look for errors
    client : string;// properties are public by default
    
    public age? : number ; // explicit public with default undefined state
    
    @IsNumber()
    @IsPositive()
    private amount : number; // if not optional then mandatory init in constructor
    
    @IsNotEmpty()
    protected details: string;
    
    readonly country : string = "USA";// readOnly means final

    constructor(client:string,amount:number,details:string){
        this.client = client;
        this.details = details;
        this.amount = amount;
        
    }

    toString() : string{ 
        return `${this.client} of age ${this.age} owes ${this.amount} for ${this.details}`;
    }

    getDetails() : string {
        return this.details+':'+this.client;
    }
}


