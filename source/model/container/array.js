import {
    ModelContainerBase,
    MCArray
} from "./base"


const ArrayContainerProxySettings = {

    set: function(obj, prop, val) {

        if (prop in obj && obj[prop] == val)
            return true

        let property = obj[prop];

        if (property && typeof(property) == "object")
            property.set(val);
        else
            obj[prop] = val;

        obj.scheduleUpdate(prop);

        return true;
    },

    get: function(obj, prop, val) {

        if (prop in obj)
            return obj[prop];

        if (!isNaN(prop))
            return obj.data[prop];

        let term = {};
        term[obj.schema.identifier] = prop;

        return obj.get(prop)[0];
    }
};

/**
    Stores models in random order inside an internal array object. 
 */

export class ArrayModelContainer extends ModelContainerBase {

    constructor(data = [], schema = {}, prop_name = "", root = null, address = []) {

        if (data[0] && data[0].id) {
            schema.identifier = data[0].id;
            data = data.slice(1);
        }

        super(schema, root);

        this.prop_name = prop_name;

        this.data = [];

        this.address = address;

        if (Array.isArray(data) && data.length > 0)
            this.insert(data);


        //return new Proxy(this, ArrayContainerProxySettings);
    }

    _destroy_() {

        this.data = null;

        super._destroy_();
    }

    get proxy() { return new Proxy(this, ArrayContainerProxySettings); }

    set proxy(v) {}

    get length() { return this.data.length; }

    __defaultReturn__() {
        if (1 || this.source) return new MCArray();

        let n = new ArrayModelContainer([], this.schema);

        this.__link__(n);

        return n;
    }

    __insert__(model, add_list, identifier) {

        for (var i = 0, l = this.data.length; i < l; i++) {

            var obj = this.data[i];

            if (this._gI_(obj) == identifier) {

                if (obj.MUTATION_ID !== this.MUTATION_ID) {
                    obj = obj.clone();
                    obj.MUTATION_ID = this.MUTATION_ID;
                }

                obj.set(model, true)

                this.data[i] = obj;

                return false; //Model not added to Container. Model just updated.
            }
        }

        this.data.push(model);

        model.address = this.address.slice();
        model.address.push(this.data.length - 1);

        console.log(this.address, model.address)
        model.root = this.root;

        if (add_list) add_list.push(model);

        return true; // Model added to Container.
    }

    getByIndex(i) {
        return this.data[i];
    }

    setByIndex(i, m) {
        this.data[i] = m;
    }

    __get__(term, return_data) {

        let terms = null;

        if (term)
            if (term instanceof Array)
                terms = term;
            else
                terms = [term];

        for (let i = 0, l = this.data.length; i < l; i++) {
            let obj = this.data[i];
            if (this._gI_(obj, terms)) {
                return_data.push(obj);
            }
        }

        return return_data;
    }

    __getAll__(return_data) {

        this.data.forEach((m) => {
            return_data.push(m);
        });

        return return_data;
    }

    __removeAll__() {
        let items = this.data.map(d => d) || [];

        this.data.length = 0;

        return items;
    }

    _setThroughRoot_(data, address, index, len, m_id) {

        if (index >= len)
            return this.set(data, true);

        let i = address[index++];

        let model_prop = this.data[i];

        if (model_prop.MUTATION_ID !== this.MUTATION_ID) {
            model_prop = model_prop.clone();
            model_prop.MUTATION_ID = this.MUTATION_ID;
        }

        this.data[i] = model_prop;

        return model_prop._setThroughRoot_(data, address, index, len,  model_prop.MUTATION_ID);
    }

    __remove__(term, out_container) {
        let result = false;
        for (var i = 0, l = this.data.length; i < l; i++) {
            var obj = this.data[i];

            if (this._gI_(obj, term)) {

                result = true;

                this.data.splice(i, 1);

                l--;
                i--;

                out_container.push(obj);
            }
        }

        return result;
    }

    toJSON() {

        return this.data;
    }

    clone() {
        let clone = new this.constructor();
        clone.data = this.data.slice();
        clone.schema = this.schema;
        clone.prop_name = this.prop_name;
        clone.MUTATION_ID = this.MUTATION_ID;
        clone.address = this.address;
        return clone;
    }
}

Object.freeze(ArrayModelContainer);