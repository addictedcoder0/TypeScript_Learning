// testing a TS library
import "reflect-metadata";
import { plainToClass } from "class-transformer"; // very useful library for a big projects
import { Invoice } from "./Invoice";

import { Component } from "./Component";
import { DataSanitizr } from "./DataSanitizr";
import { ProjectList } from "./ProjectList";
import { ProjectState } from "./ProjectState";
import { autobind } from "./AutoBinder";
import _ from "lodash"; // using vanilla JS library in the TS project using @types 

import { validate } from "class-validator"; // very useful library for a big projects

/**
 *  Goal :::: 
 *  1. Access Div with "project-input" id and then get input from it
 *  2. display the template data in the Dic with "app" id 
 */ 
class ProjectInput extends Component<HTMLDivElement,HTMLFormElement> {
  private titleInputEle: HTMLInputElement;
  private descriptionInputEle: HTMLInputElement;
  private peopleInputEle: HTMLInputElement;
  private projectState : ProjectState;

  constructor() {
    super("project-input","app",true,"user-input")
   
    // populate user Data
    this.titleInputEle = this.whatToRenderElement.querySelector('#title')! as HTMLInputElement;
    this.descriptionInputEle = this.whatToRenderElement.querySelector('#description')! as HTMLInputElement;
    this.peopleInputEle = this.whatToRenderElement.querySelector('#people')! as HTMLInputElement;
    
    this.projectState = ProjectState.getInstance();
    this.configure();
  }

  @autobind
  // returning a tuple
  private gatheruserInput() : [string,string,number] | void {
    const enteredTitle : string = this.titleInputEle.value;
    const enteredDesc : string = this.descriptionInputEle.value;
    const enteredPeopleCount : number = this.peopleInputEle.valueAsNumber;

     
    const isValidTitle : boolean = DataSanitizr.createValidator(enteredTitle).isRequired(true).validate();
    const isValidDesc : boolean = DataSanitizr.createValidator(enteredDesc).isRequired(true).withMinLength(5).validate();
    const isValidPeopleCount : boolean = DataSanitizr.createValidator(enteredPeopleCount).isRequired(true).withMinValue(1).withMaxValue(5).validate();

    // validate
    if(isValidTitle && isValidDesc && isValidPeopleCount){
        return [enteredTitle,enteredDesc,enteredPeopleCount];
    }else{
        // we an throw an error , but then we have to implement error Handling  
        // throw new Error("Invalid Input being submitted , Please Try Again");
        console.log("Invalid Input being submitted , Please Try Again");
        alert("Invalid Input being submitted , Please Try Again");
        return ;
    }
  
  }

  private clearInput() {
      this.titleInputEle.value = '';
      this.descriptionInputEle.value = '';
      this.peopleInputEle.value = '';
  }

  @autobind
  private submitHandler(event : Event) {
    event.preventDefault(); // means stopping the http request trigger (default beahavior)
    const userInput =  this.gatheruserInput();
    if(Array.isArray(userInput)){ // tuple is a type of specialized Array
        const [title,desc,people] = userInput;
        this.projectState.addProject(title,desc,people);
    }

    // clear the form after every submission
    this.clearInput();
    console.log(this.titleInputEle.value);
  }
 
  // setting up an Event Listener
  public configure() {

    // important : if 'this' is not passed as an argument then the 'this' keyword inside
    // submitHandler will not be pointing at the class but it points to the event with which it has been bound

    // in order to reduce that ambiguity we are binding the actual 'this' reference with the submitHandler call
    // this.formElement.addEventListener('submit',this.submitHandler.bind(this));
    
    // Or , we can use Decorators for binding work which will make our work easier
    this.whatToRenderElement.addEventListener('submit',this.submitHandler);
  }
 
  public renderContent() : void {

  }

}


const prjInput = new ProjectInput();
const activePrjList =  new ProjectList('active');
const finishedPrjList =  new ProjectList('finished');

// testing a JS lib 
console.log(_.shuffle([1,2,3]));


// testing a TS lib 
// we are testing a functionality for object to POJO conversion :::: similar to Jacksonlib in java

//client:string,amount:number,details:string
const listOfObject = [  // valid objects which can be converted to Invoices
  {client:"A",amount:1232,details:"for shopping A"},
  {client:"B",amount:1223,details:"for shopping B"},
  {client:"C",amount:1233,details:"for shopping C"},
  {client:"D",amount:1234,details:"for shopping D"},
  {client:"E",amount:-1254,details:"for shopping E"}
];

const listOfInvoices = plainToClass(Invoice,listOfObject);
listOfInvoices.forEach(inv => {
      validate(inv).then(errors => {
          if(errors.length>0){
            console.log(errors); 
          }else{
            console.log(inv.toString());
          }
      });
});


// testing the Decorators of "class-validators"


