
export class Project {
    private projectId : number;
    private projectTitle : string;
    private projectDesc : string;
    private numOfPeople : number;
    private hasFinished : boolean;

    constructor(
        projectId : number ,
        projectTitle : string ,
        projectDesc : string ,
        numOfPeople : number ,
        hasFinished : boolean
        ) {
        this.projectId = projectId;
        this.projectTitle = projectTitle;
        this.projectDesc = projectDesc;
        this.numOfPeople = numOfPeople;
        this.hasFinished = hasFinished;
    }

    public getProjectId() : number {
        return this.projectId;
    }

    public getProjectTitle() : string {
        return this.projectTitle;
    }

    public getProjectDescription() : string {
        return this.projectDesc;
    }

    public getNumberOfPeople() : number {
        return this.numOfPeople;
    }

    public hasProjectFinished() : boolean {
        return this.hasFinished;
    }

    public setFinishedState(finishedState : boolean) : void {
        this.hasFinished = finishedState;
    }
}