/**
 * Base Class for all Componet classes
 */
export abstract class Component<T extends HTMLElement,U extends HTMLElement> {
    protected whereToRenderTemplateElement: HTMLTemplateElement;
    protected whereToRenderElement: T;
    protected whatToRenderElement: U;

    constructor(templateID : string , targetElementID : string ,insertAtStart : boolean, newElementID?: string){
        this.whereToRenderTemplateElement = document.getElementById(templateID)! as HTMLTemplateElement;
        this.whereToRenderElement = document.getElementById(targetElementID)! as T;
       
        const deepClone: boolean = true;
        const importedNode = document.importNode(
          this.whereToRenderTemplateElement.content,
          deepClone
        );
         
        this.whatToRenderElement = importedNode.firstElementChild as U;
        if(newElementID){
            this.whatToRenderElement.id = newElementID;
        }

        this.attach(insertAtStart);
    }

    private attach(insertAtStart:boolean) {
        this.whereToRenderElement.insertAdjacentElement(insertAtStart ? "afterbegin":"beforeend", this.whatToRenderElement);
    }

    public abstract configure(): void;
    public abstract renderContent(): void;
}