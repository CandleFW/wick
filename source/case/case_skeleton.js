/*
    Case skeleton
        Model pointer OR schema pointer
            IF schema, then the skeleton will create a new Model when it is copied, UNLESS a model is given to the skeleton copy Constructor. 
            Other wise, the skeleton will automatically assign the Model to the case object. 

        The model will automatically copy it's element data into the copy, zipping the data down as the Constructor builds the Case's children.

*/
class CaseSkeleton {
    
    constructor(element, constructor, dom_index, named = false, presets){
        this.element = element;
        this.Constructor = constructor;
        this.children  = [];
        this.templates = [];
        this.dom_index = dom_index;
        this.IS_NAMED_ELEMENT = named;
        this.data = {};
        this.presets = presets;
    }

    /**
    
    */
    flesh(Model){
        let named_elements = {};

        let Case = this.____copy____(null, null, named_elements);
        
        Case.load(Model);

        Case.named_elements = named_elements;

        return Case;
    }

    /**
        Constructs a new object, attaching to elements hosted by a case. If the component to construct is a Case, then the 
        parent_element gets swapped out by a cloned element that is hosted by the newly constructed Case.
    */
    ____copy____(parent_element, parent, named_elements){
        
        let element;

        if(this.element){
            let ele = this.element.cloneNode(true);
            if(parent_element){
                element = this.dom_index.getElement(parent_element);
                element.parentElement.replaceChild(ele, element);
            }
            parent_element = ele;
            element = ele;
        }
        else
            element = this.dom_index.getElement(parent_element);

        
        if(this.IS_NAMED_ELEMENT)
            named_elements[this.data.transition] = element;

        let out_object = new this.Constructor(parent, element, this.presets, this.data);
        
        out_object.data = this.data;

        if(this.children.length > 0){
            out_object.children = new Array(this.children.length);
        
            for(var i = 0, l = this.children.length; i < l; i++){
                let child = this.children[i];
                out_object.children[i] = child.____copy____(parent_element, out_object, named_elements);
            }
        }

        if(this.templates.length > 0){
            out_object.templates = new Array(this.templates.length);
        
            for(var i = 0, l = this.templates.length; i < l; i++){
                let child = this.templates[i];
                out_object.templates[i] = child.____copy____(parent_element, out_object, named_elements);
            }
        }
        
        return out_object;
    }
}

export {CaseSkeleton}