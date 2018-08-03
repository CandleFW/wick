import { ModelBase } from "./base.js";

import { ArrayModelContainer } from "./container_revised/array";

import { ModelContainerBase } from "./container_revised/base";

import { _SealedProperty_ } from "../common/short_names";

class Model extends ModelBase {

    constructor(data, root = null, address = []) {

        super(root, address);

        _SealedProperty_(this, "prop_array", []);
        _SealedProperty_(this, "prop_offset", 0);
        _SealedProperty_(this, "look_up", {});

        this.address = [];

        if (data)
            for (let name in data)
                this._createProp_(name, data[name]);

    }

    get proxy() { return new Proxy(this, { set: AnyModelProxySet }); }

    set(data, FROM_ROOT = false) {

        if (!FROM_ROOT)
            return this._deferUpdateToRoot_(data);

        if (!data)
            return this;

        for (let prop_name in data) {

            let index = this.look_up[prop_name];

            if (index !== undefined) {

                let prop = this.prop_array[index];

                if (typeof(prop) == "object") {

                    if (prop.MUTATION_ID !== this.MUTATION_ID) {
                        prop = prop.clone();
                        prop.MUTATION_ID = this.MUTATION_ID;
                        this.prop_array[index] = prop;
                    }

                    prop.set(data[prop_name], true);

                    this.scheduleUpdate(prop_name);

                } else if (prop !== data[prop_name])
                    this.prop_array[index] = data[prop_name];
            } else
                this._createProp_(prop_name, data[prop_name]);
        }

        return this;
    }

    _createProp_(name, value) {

        let index = this.prop_offset++;

        this.look_up[name] = index;

        if (typeof(value) == "object") {

            let address = this.address.slice();
            address.push(index);

            if (Array.isArray(value)) {
                let child_model = new ArrayModelContainer(value, this.root, address);
                this.prop_array.push(child_model);

            } else {
                value.address = address;
                this.prop_array.push(value);
            }

            Object.defineProperty(this, name, {

                configurable: false,

                enumerable: true,

                get: function() { return this.getHook(name, this.prop_array[index]); },

                set: (v) => {}
            });

        } else {

            this.prop_array.push(value);

            Object.defineProperty(this, name, {

                configurable: false,

                enumerable: true,

                get: function() { return this.getHook(name, this.prop_array[index]); },

                set: function(value) {

                    let val = this.prop_array[index];

                    if (val !== value) {
                        this.prop_array[index] = this.setHook(name, value);
                        this.scheduleUpdate(name);
                    }
                }
            });
        }

        this.scheduleUpdate(name);
    }
}

ModelContainerBase.prototype.model = Model;

export { Model };