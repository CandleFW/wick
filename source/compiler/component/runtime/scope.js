import { Model } from "../../../model/model.js";
import { Tap, UpdateTap } from "../tap/tap.js";
import { IOBase } from "../io/io.js";
import Observer from "../../../observer/observer.js";


export default class Scope extends Observer {

    /**
     *   In the Wick dynamic template system, Scopes serve as the primary access to Model data. They, along with {@link ScopeContainer}s, are the only types of objects the directly _bind_ to a Model. When a Model is updated, the Scope will transmit the updated data to their descendants, which are comprised of {@link Tap}s and {@link ScopeContainer}s.
     *   A Scope will also _bind_ to an HTML element. It has no methodes to update the element, but it's descendants, primarily instances of the {@link IO} class, can update attributes and values of then element and its sub-elements.
     *   @param {Scope} parent - The parent {@link Scope}, used internally to build a hierarchy of Scopes.
     *   @param {Object} data - An object containing HTMLELement attribute values and any other values produced by the template parser.
     *   @param {Presets} presets - An instance of the {@link Presets} object.
     *   @param {HTMLElement} element - The HTMLElement the Scope will _bind_ to.
     *   @memberof module:wick~internals.scope
     *   @alias Scope
     *   @extends ScopeBase
     */
    constructor(parent, presets, element, ast) {

        super();

        this.ast = ast;
        this.ele = element;

        if (element)
            element.wick_scope = this;

        this.parent = null;
        this.model = null;
        this.update_tap = null;

        this.ios = [];
        this.taps = new Map;
        this.scopes = [];
        this.containers = [];
        this.css = [];

        this.DESTROYED = false;
        this.LOADED = false;
        this.CONNECTED = false;
        this.TRANSITIONED_IN = false;
        this.PENDING_LOADS = 1; //set to one for self
        this.temp_data_cache = null;

        this.addToParent(parent);
    }

    discardElement(ele, ios) {
        if (!ios) {
            ios = [];

            for (const tap of this.taps.values())
                for (let io of tap.ios) {
                    while (io.ele instanceof IOBase)
                        io = io.ele;
                    ios.push(io);
                }

        }

        for (let i = 0; i < ios.length; i++) {
            const io = ios[i];
            if (io.ele == ele) {
                io.destroy();
                ios.splice(i--, 1);
            }
        }

        const children = ele.children;

        if (children)
            for (let i = 0; i < children.length; i++)
                this.discardElement(children[i], ios);

        if (ele.wick_scope)
            ele.wick_scope.destroy();
    }

    purge() {
        if (this.parent && this.parent.removeScope)
            this.parent.removeScope(this);

        if (this.ele && this.ele.parentNode) {
            this.ele.parentNode.removeChild(this.ele);
        }

        for (const tap of this.taps.values())
            tap.destroy();

        while (this.scopes[0])
            this.scopes[0].destroy();

        //while (this.containers[0])
        //    this.containers[0].destroy();

        this.taps = new Map;
        this.scopes.length = 0;
        this.containers.length = 0;
        this.temp_data_cache = null;
        this.css.length = 0;
    }

    destroy() {
        if (this.DESTROYED)
            return;

        try {
            this.update({ destroying: true }, null, false, { IMMEDIATE: true }); //Lifecycle Events: Destroying <======================================================================
        } catch (e) {
            console.throw(e);
        }

        if (this.model && this.model.removeObserver)
            this.model.removeObserver(this);

        this.DESTROYED = true;
        this.LOADED = false;

        this.purge();

        this.data = null;
        this.taps = null;
        this.ios = null;
        this.ele = null;

        super.destroy();
    }

    addToParent(parent) {
        if (parent)
            parent.addScope(this);
    }

    addTemplate(template) {
        template.parent = this;
        this.PENDING_LOADS++;
        this.containers.push(template);
    }

    addScope(scope) {
        if (scope.parent == this)
            return;
        scope.parent = this;
        this.scopes.push(scope);
        this.PENDING_LOADS++;
        scope.linkImportTaps(this);
    }

    removeScope(scope) {
        if (scope.parent !== this)
            return;

        for (let i = 0; i < this.scopes.length; i++)
            if (this.scopes[i] == scope)
                return (this.scopes.splice(i, 1), scope.parent = null);
    }

    linkImportTaps(parent_scope) {
        for (const tap of this.taps.values()) {
            tap.linkImport(parent_scope);
        }
    }

    getTap(name) {
        if (!name) return null;

        let tap = this.taps.get(name);

        if (!tap) {
            if (name == "update")
                tap = this.update_tap = new UpdateTap(this, name);
            else {
                tap = new Tap(this, name);
                this.taps.set(name, tap);
            }

            if (this.temp_data_cache)
                tap.downS(this.temp_data_cache);
        }
        return tap;
    }

    /**
        Makes the scope a observer of the given Model. If no model passed, then the scope will bind to another model depending on its `scheme` or `model` attributes. 
    */
    load(model) {
        //Called before model is loaded
        this.update({ loading: true }); //Lifecycle Events: Loading <====================================================================== 

        let
            m = null,
            SchemedConstructor = null,
            presets = this.ast.presets,
            model_name = this.ast.model_name,
            scheme_name = this.ast.scheme_name;

        if (model_name && presets.models)
            m = presets.models[model_name];
        if (scheme_name && presets.schemas) {
            SchemedConstructor = presets.schemas[scheme_name];
        }

        if (m)
            model = m;
        else if (SchemedConstructor) {
            model = new SchemedConstructor();
        } else if (!model)
            model = new Model(model);

        if (this.css.length > 0)
            this.loadCSS();

        for (const scope of this.scopes) {
            scope.load(model);
            // /scope.getBadges(this);
        }

        if (model.addObserver)
            model.addObserver(this);

        this.model = model;

        //Called before model properties are disseminated
        this.update({ model_loaded: true }); //Lifecycle Events: Model Loaded <====================================================================== 

        for (const tap of this.taps.values())
            tap.load(this.model, false);

        //Allow one tick to happen before acknowledging load
        setTimeout(this.loadAcknowledged.bind(this), 1);
    }

    loadCSS(element = this.ele) {

        for (const css of this.css) {

            const rules = css.getApplicableRules(element);

            element.style = ("" + rules).slice(1, -1) + "";
        }

        Array.prototype.slice.apply(element.children).forEach(child => this.loadCSS(child));
    }

    loadAcknowledged() {
        //This is called when all elements of responded with a loaded signal.

        if (!this.LOADED && --this.PENDING_LOADS <= 0) {
            this.LOADED = true;
            this.update({ loaded: true }); //Lifecycle Events: Loaded <======================================================================
            if (this.parent && this.parent.loadAcknowledged)
                this.parent.loadAcknowledged();
        }
    }

    /*************** DATA HANDLING CODE **************************************/

    down(data, changed_values) {
        this.update(data, changed_values, true);
    }

    up(tap, data, meta) {
        if (this.parent)
            this.parent.upImport(tap.prop, data, meta, this);
    }

    upImport(prop_name, data, meta) {


        if (this.taps.has(prop_name)) {
            this.taps.get(prop_name).up(data, meta);
        }

        for (const scope of this.scopes) {
            scope.update({
                [prop_name]: data }, null, true);
            // /scope.getBadges(this);
        }
    }

    update(data, changed_values, IMPORTED = false, meta = null) {

        if (this.DESTROYED) return;
        
        this.temp_data_cache = data;

        (this.update_tap && this.update_tap.downS(data, IMPORTED));

        if (changed_values) {
            for (let name in changed_values)
                if (this.taps.has(name))
                    this.taps.get(name).downS(data, IMPORTED, meta);
        } else
            for (const tap of this.taps.values())
                tap.downS(data, IMPORTED, meta);

        for (const container of this.containers)
            container.down(data, changed_values);
    }

    bubbleLink(child) {
        if (this.parent)
            this.parent.bubbleLink(this);
    }

    /*************** DOM CODE ****************************/

    appendToDOM(element, before_element) {

        //Lifecycle Events: Connecting <======================================================================
        this.update({ connecting: true });

        this.CONNECTED = true;

        if (before_element)
            element.insertBefore(this.ele, before_element);
        else
            element.appendChild(this.ele);

        //Lifecycle Events: Connected <======================================================================
        this.update({ connected: true });
    }

    removeFromDOM() {
        //Prevent erroneous removal of scope.
        if (this.CONNECTED == true) return;

        //Lifecycle Events: Disconnecting <======================================================================
        this.update({ disconnecting: true });

        if (this.ele && this.ele.parentElement)
            this.ele.parentElement.removeChild(this.ele);

        //Lifecycle Events: Disconnected <======================================================================
        this.update({ disconnectied: true });
    }

    transitionIn(transition, transition_name = "trs_in") {
        if (transition)
            this.update({
                [transition_name]: transition }, null, false, { IMMEDIATE: true });

        this.TRANSITIONED_IN = true;
    }

    transitionOut(transition, transition_name = "trs_out", DESTROY_AFTER_TRANSITION = false) {

        this.CONNECTED = false;

        if (this.TRANSITIONED_IN === false) {
            this.removeFromDOM();
            if (DESTROY_AFTER_TRANSITION) this.destroy();
            return;
        }

        let transition_time = 0;

        if (transition) {

            this.update({
                [transition_name]: transition }, null, false, { IMMEDIATE: true });

            if (transition.trs)
                transition_time = transition.trs.out_duration;
            else
                transition_time = transition.out_duration;
        }

        this.TRANSITIONED_IN = false;

        transition_time = Math.max(transition_time, 0);

        setTimeout(() => {
            this.removeFromDOM();
            if (DESTROY_AFTER_TRANSITION) this.destroy();
        }, transition_time + 2);

        return transition_time;
    }
}

Scope.prototype.removeIO = Tap.prototype.removeIO;
Scope.prototype.addIO = Tap.prototype.addIO;
