import { SourceBase } from "./base"

import { ModelBase } from "../model/base"

import { Getter } from "../network/getter"

import { Cassette } from "./cassette/cassette"

export class Source extends SourceBase {

    /**
        Source constructor. Builds a Source object.
        @params [DOMElement] element - A DOM <template> element that contains a <case> element.
        @params [RouterPresets] presets
        @params [Source] parent - The parent Source object, used internally to build Source's in a hierarchy
        @params [Model] model - A model that can be passed to the case instead of having one created or pulled from presets. 
        @params [DOM]  WORKING_DOM - The DOM object that contains templates to be used to build the case objects. 
    */
    constructor(parent = null, data, presets, element) {

        super(parent, data, presets, element)

        if(data.model){
            this.model = presets.models[data.model];
        }

        this.USE_SECURE = presets.USE_HTTPS;
        this.named_elements = {};
        this.template = null;
        this.prop = null;
        this.url = null;
        this.presets = presets;
        this.receiver = null;
        this.query = {};
        this.REQUESTING = false;
        this.exports = null;


        this.filter_list = [];
        this.templates = [];
        this.filters = [];
        this.is = 0;
    }

    destroy() {

        this.parent = null;

        if (this.receiver)
            this.receiver.destroy();

        for (let i = 0, l = this.templates.length; i < l; i++)
            this.templates[i].destroy();

        super.destroy();
    }

    /**
        Sets up Model connection or creates a new Model from a schema.
    */
    load(model) {

        this.ACTIVE = true;

        if (this.data.url) {
            //import query info from the wurl
            let str = this.data.url;
            let cassettes = str.split(";");
            this.data.url = cassettes[0];

            for (var i = 1; i < cassettes.length; i++) {
                let cassette = cassettes[i];

                switch (cassette[0]) {
                    case "p":
                        //TODO
                        this.url_parent_import = cassette.slice(1)
                        break;
                    case "q":
                        this.url_query = cassette.slice(1);
                        break;
                    case "<":
                        this.url_return = cassette.slice(1);
                }
            }
        }

        this.prop = this.data.prop;

        if (this.data.export) this.exports = this.data.export;

        if (this.model) {
            model = this.model;
            this.model = null;
        }

        if (model && model instanceof ModelBase) {

            if (this.schema) {
                /* Opinionated Source - Only accepts Models that are of the same type as its schema.*/
                if (model.constructor != this.schema) {
                    //throw new Error(`Model Schema ${this.model.schema} does not match Source Schema ${presets.schemas[this.data.schema].schema}`)
                } else
                    this.schema = null;

            }
            this.model = null;
        }

        if (this.schema)
            model = new this.schema();

        model.addView(this);

        if (this.model) {
            if (this.data.url) {
                this.receiver = new Getter(this.data.url, this.url_return);
                this.receiver.setModel(model);
                this.____request____();
            }
        } else
            throw new Error(`No Model could be found for Source constructor! Source schema "${this.data.schema}", "${this.presets.schemas[this.data.schema]}"; Source model "${this.data.model}", "${this.presets.models[this.data.model]}";`);

        for (var i = 0; i < this.children.length; i++)
            this.children[i].load(this.model);


    }

    ____request____(query) {

        this.receiver.get(query, null, this.USE_SECURE).then(() => {
            this.REQUESTING = false;
        });
        this.REQUESTING = true;
    }

    export (exports) {

        this.updateSubs(this.children, exports, true);

        super.export(exports);
    }

    updateSubs(cassettes, data, IMPORT = false) {

        for (var i = 0, l = cassettes.length; i < l; i++) {

            let cassette = cassettes[i];

            if (cassette instanceof Source)
                cassette.update(data, true);
            else {
                let r_val;

                if (IMPORT) {

                    if (cassette.data.import && data[cassette.data.import]) {
                        r_val = cassette.update(data, true);

                        if (r_val) {
                            this.updateSubs(cassette.children, r_val);
                            continue;
                        }
                    }
                } else {
                    /** 
                        Overriding the model data happens when a cassette returns an object instead of undefined. This is assigned to the "r_val" variable
                        Any child cassette of the returning cassette will be fed "r_val" instead of "data".
                    */

                    r_val = cassette.update(data, true);
                }


                this.updateSubs(cassette.children, r_val || data, IMPORT);
            }
        }
    }

    up(data) {
        this.model.add(data);
    }

    update(data, changed_values) {
        if(this.ACTIVE)
            this.__down__(data, changed_values);
    }

    transitionIn(index = 0) {

        super.transitionIn(index)
        return

        let transition_time = 0;

        for (let i = 0, l = this.templates.length; i < l; i++)
            transition_time = Math.max(transition_time, this.templates[i].transitionIn(index));

        transition_time = Math.max(transition_time, super.transitionIn(index));

        this.updateDimensions();

        return transition_time;
    }

    /**
        Takes as an input a list of transition objects that can be used
    */
    transitionOut(index = 0, DESTROY = false) {

        let transition_time = 0;

        for (let i = 0, l = this.templates.length; i < l; i++)
            transition_time = Math.max(transition_time, this.templates[i].transitionOut(index));

        transition_time = Math.max(transition_time, super.transitionOut(index, DESTROY));

        return transition_time;
    }

    finalizeTransitionOut() {

        for (let i = 0, l = this.templates.length; i < l; i++)
            this.templates[i].finalizeTransitionOut();

        super.finalizeTransitionOut();
    }

    setActivating() {
        if (this.parent)
            this.parent.setActivating();
    }

    getNamedElements(named_elements) {
        for (let comp_name in this.named_elements)
            named_elements[comp_name] = this.named_elements[comp_name];
    }
}

export class CustomSource extends Source {
    constructor(element, data = {}, presets = {}) {
        super(null, element, data, presets)
    }
}