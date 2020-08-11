import { rt } from "./runtime_global.js";
import { DOMLiteral, ContainerDomLiteral } from "../types/dom_literal.js";
import { WickContainer } from "./runtime_container.js";
import { takeParentAddChild } from "./runtime_common.js";
import { Presets } from "../wick.js";

//
// https://www.w3.org/TR/2011/WD-html5-20110525/namespaces.html
//
const namespaces = [
    "www.w3.org/1999/xhtml",            // Default HTML - 0
    "www.w3.org/1998/Math/MathML",      // MATHML - 1
    "www.w3.org/2000/svg",              // SVG - 2
    "www.w3.org/1999/xlink",            // XLINK - 3
    "www.w3.org/XML/1998/namespace",    // XML - 4
    "www.w3.org/2000/xmlns/",           // XMLNS - 5
];

function createText(data) {
    return document.createTextNode(data);
}

function getNameSpace(name_space_lookup) {
    return namespaces[name_space_lookup] || "";
}

/**
 * Used for SVG, MATHML.
 * @param tag_name 
 * @param name_space 
 * 
 */
function createElementNameSpaced(tag_name, name_space, data = ""): HTMLElement | Text {

    if (!tag_name) /*TextNode*/ return createText(data);

    if (!name_space) return createElement(tag_name);

    return document.createElementNS(tag_name, name_space);
}

function createElement(tag_name) {
    return document.createElement(tag_name);
}

export function integrateElement(ele: HTMLElement | Text) {


    if (ele instanceof Text) {
        this.elu.push(ele);
        return ele;
    }

    else {

        if (this.ele) {

            if (ele.tagName == "W-B") {
                const text = document.createTextNode(ele.innerHTML);
                ele.replaceWith(text);
                ele = text;
                this.elu.push(ele);
            } else {

                if (ele.getAttribute("w-container")) {

                    const comp_constructors = ele.getAttribute("w-container").split(",").map(name => this.presets.component_class.get(name));

                    if (comp_constructors.length < 1)
                        throw new Error(`Could not find component class for ${name} in component ${this.name}`);

                    const ctr = new WickContainer(comp_constructors, [], ele, this);

                    this.ct.push(ctr);
                } else if (ele.hasAttribute("w-s")) {

                    const
                        name = ele.classList[0],
                        comp_constructor = this.presets.component_class.get(name);

                    this.elu.push(ele);

                    if (!comp_constructor)
                        throw new Error(`Could not find component class for ${name} in component ${this.name}`);

                    const comp = new comp_constructor(null, ele, null, this);

                    takeParentAddChild(this, comp);

                    return;
                }

                if (ele.hasAttribute("w-o")) {
                    this.par.elu[+ele.hasAttribute("w-o")] = ele;

                    //@ts-ignore
                    for (const child of (<HTMLElement>ele).childNodes)
                        this.par.ie(child);

                    return ele;
                } else if (ele.hasAttribute("w-r")) {

                    this.par.elu[+ele.hasAttribute("w-r")] = ele;

                    this.elu.push(ele);

                    //@ts-ignore
                    for (const child of (<HTMLElement>ele).childNodes)
                        this.par.ie(child);

                    return ele;
                } else this.elu.push(ele);

                if ((<HTMLElement>ele).tagName == "A")
                    rt.presets.processLink(ele);
            }
        } else {
            ele.classList.add(this.name);
            this.ele = ele;
            this.elu.push(ele);
        }

        //@ts-ignore
        for (const child of (<HTMLElement>ele).childNodes)
            this.ie(child);

        return ele;
    }
}

/**
* Make DOM Element tree from JS object
* literals. Return list of object ID's and the
* root element tree.
*/
export function makeElement(ele_obj: DOMLiteral, name_space = ""): HTMLElement {

    const {
        namespace_id: name_space_index,
        tag_name: tag_name,
        lookup_index: i,
        attributes: attributes,
        children: children,
        data: data,
        is_container: ct,
        component_name: component_name
    } = ele_obj;

    if (name_space_index) name_space = getNameSpace(name_space_index);

    let ele = null;

    if (ct) {

        const
            { component_attribs, component_names } = <ContainerDomLiteral>ele_obj,
            comp_constructors = component_names.map(name => (<Presets>this.presets).component_class.get(name));

        if (comp_constructors.length < 1)
            throw new Error(`Could not find component class for ${component_name} in component ${this.name}`);

        ele = <HTMLElement>createElementNameSpaced(tag_name, name_space, data);

        console.log(component_attribs);

        const ctr = new WickContainer(comp_constructors, component_attribs, ele, this);

        this.ct.push(ctr);

    } else if (component_name && rt.presets.component_class.has(component_name)) {

        const comp_constructor = this.presets.component_class.get(component_name);

        if (!comp_constructor)
            throw new Error(`Could not find component class for ${component_name} in component ${this.name}`);

        //Do fancy component linking

        const comp = new comp_constructor();

        //Perform linking, what not then set element to the components element. 
        takeParentAddChild(this, comp);

        ele = comp.ele;
    } else
        ele = <HTMLElement>createElementNameSpaced(tag_name, name_space, data);


    if (attributes)
        for (const [name, value] of attributes)
            ele.setAttributeNS(name_space, name, value);

    this.elu.push(ele);

    if (children)
        outer: for (const child of children) {
            if (child.slot_name) {
                for (const c of ele.children) {
                    if (c.getAttribute("slot") == child.slot_name) {
                        ele.replaceElement(this.me(child, name_space));
                        continue outer;
                    }
                }
            }

            ele.appendChild(this.me(child, name_space));
        }

    return ele;
}