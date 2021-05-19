// Goal :::: Bind the class level 'this' keyword with the eventListener methods 
export function autobind(target:any , methodName:string,descriptorOfMethod : PropertyDescriptor){
    const originalMethod = descriptorOfMethod.value;
    const adjustedDescriptor : PropertyDescriptor = {
        configurable:true,
        get(){
            const bound = originalMethod.bind(this);
            return bound;
        }
    };
    return adjustedDescriptor;
}