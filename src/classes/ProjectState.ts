
/**
 * 
 */

import { Project } from "./Project";

//Singleton Util
export class ProjectState {
    
    private projects : Project[] = [];
    private static projectState : ProjectState ;

    // we will store listeners and push notification
    // to the listeners for model state change
    private listeners: any[] = [];

    private constructor(){  }

    public static getInstance() : ProjectState{
        if(!this.projectState){
            this.projectState = new ProjectState();
        }
        return this.projectState;
    }

    public addListener(Listenerfn : Function) {
        this.listeners.push(Listenerfn);
    }

    public addProject(title:string , description : string , numOfPeople : number ){
        const newProj = new Project(
            Math.random(),
            title,
            description,
            numOfPeople,
            false   // by default every added project is "Active" means notCompleted
        );
        this.projects?.push(newProj);
        this.updateListeners();
    }

    public moveProject(projectID : string , hasFinished : boolean) : void {
        const project = this.projects.find(prj => prj.getProjectId().toString() === projectID);
        if(project && project.hasProjectFinished() !== hasFinished){
            // if such project exist and it is really being dragged to another list
            project.setFinishedState(hasFinished);
        }
        this.updateListeners();
    }

    private updateListeners() : void {
        for(const listenerfn of this.listeners) {
            listenerfn(this.projects.slice());// pass an copy of projects (immutability)
        }
    }
} 




