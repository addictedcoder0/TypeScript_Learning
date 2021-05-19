import { Component } from "./Component";
import { Draggable } from "./Draggable";
import { Project } from "./Project";
import { autobind } from "./AutoBinder";

export class ProjectItem extends Component<HTMLUListElement,HTMLLIElement> implements Draggable {
    private project : Project;
    constructor(targetEleID : string,project : Project){
        super("single-project",targetEleID,false,project.getProjectId().toString());
        this.project = project;

        this.configure();
        this.renderContent();
    }

    public configure() : void {
        this.whatToRenderElement.addEventListener('dragstart',this.dragStartHandler);
        this.whatToRenderElement.addEventListener('dragend',this.dragEndHandler);
    }

    public renderContent() : void {
        this.whatToRenderElement.querySelector('h2')!.textContent = this.project.getProjectTitle();
        this.whatToRenderElement.querySelector('h3')!.textContent = this.project.getNumberOfPeople().toString()+" developer(s)";
        this.whatToRenderElement.querySelector('p')!.textContent = this.project.getProjectDescription();
    }

    @autobind
    dragStartHandler(event : DragEvent) : void {
        console.log(event);    
        event.dataTransfer!.setData("text/plain",this.project.getProjectId().toString());
        event.dataTransfer!.effectAllowed = "move"; // tells the browser how cursor should look like
    }

    @autobind
    dragEndHandler(event : DragEvent) : void {
        console.log(event);
    }
}