import { autobind } from "./AutoBinder";
import { Component } from "./Component";
import { DragTarget } from "./DragTarget";
import { Project } from "./Project";
import { ProjectItem } from "./ProjectItem";
import { ProjectState } from "./ProjectState";

/**
 * 
 * Goal ::::
 *     
 */
export class ProjectList extends Component<HTMLDivElement,HTMLElement> implements DragTarget {
    private typeOfProject : 'active'|'finished';// literal type bound
    private projectState : ProjectState;
    private assignedProjects : Project[] ;

    constructor(typeOfProject : 'active'|'finished') { 
        super("project-list","app",false,`${typeOfProject}-projects`);
        
        this.typeOfProject = typeOfProject;
        this.assignedProjects = [];
        this.projectState = ProjectState.getInstance();

        this.configure();
        this.renderContent();
    }

    private renderProjects() : void {
        // grab the project list by ID
        const listEle = document.getElementById(`${this.typeOfProject}-projects-list`)! as HTMLUListElement;
        
        //clean the listEle innerHTML before rendering
        listEle.innerHTML = ''; 
        for(const prjItem of this.assignedProjects) {
            new ProjectItem(this.whatToRenderElement.querySelector('ul')!.id,prjItem);

            // const listItem = document.createElement('li');
            // listItem.textContent = prjItem.getProjectTitle();
            // listEle.appendChild(listItem);
        }
    }

    public configure() : void {

        this.whatToRenderElement.addEventListener("dragover",this.dragOverHandler);
        this.whatToRenderElement.addEventListener("drop",this.dropHandler);
        this.whatToRenderElement.addEventListener("dragleave",this.dragLeaveHandler);

        this.projectState.addListener((projects : Project[]) => {
            this.assignedProjects = projects.filter(
                (project) => {
                    if(this.typeOfProject === 'active'){
                        return !project.hasProjectFinished();
                    }
                    return project.hasProjectFinished();
                }
            );
            this.renderProjects();
        });
    }

    public renderContent() : void {
        const listId = `${this.typeOfProject}-projects-list`;
        this.whatToRenderElement.querySelector('ul')!.id = listId;
        this.whatToRenderElement.querySelector('h2')!.textContent = this.typeOfProject.toUpperCase() + ' PROJECTS';
    }

    @autobind
    public dropHandler(event : DragEvent): void { 
        event.preventDefault();
        const prjID = event.dataTransfer!.getData("text/plain");
        console.log();
        this.projectState.moveProject(prjID,this.typeOfProject === "active" ? false : true);
    }

    @autobind
    public dragOverHandler(event : DragEvent): void {
        // allow only taxt/plain content to be droppable
        if(event.dataTransfer && event.dataTransfer.types[0] === "text/plain"){
            event.preventDefault(); // by default JS don't allow dropping of elements
            this.whatToRenderElement.querySelector('ul')!.classList.add("droppable");
        }
    }

    @autobind
    public dragLeaveHandler(event : DragEvent): void {
        this.whatToRenderElement.querySelector('ul')!.classList.remove("droppable");
    }

}