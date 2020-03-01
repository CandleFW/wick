import ScriptIO from "./script_io.js.js.js.js";
import spark from "source/old/stamp/stamp/lite/node_modules/@candlefw/spark";

/******************** Expressions **********************/

export default class ContainerIO extends ScriptIO {

    get type () { return "ContainerIO"}

    constructor(container, scope, node, tap, binding, lex, pinned) {
        super(scope, node, tap, binding, lex, pinned);

        this.container = container;

        //Reference to function that is called to modify the host container. 
        this.action = null;

        this.ARRAY_ACTION = false;
    }

    bindToContainer(type, container) {
        this.container = container;
        this.filter_type = type;

        const STATIC = this.IO_ACTIVATIONS == 0;

        switch (type) {
            case "sort":
                this.ARRAY_ACTION = true;
                container.filters.push(this);
                this.action = this.sort;
                return;
            case "filter":
                this.ARRAY_ACTION = true;
                container.filters.push(this);
                this.action = this.filter;
                return;
            case "scrub":
                this.action = this.scrub;
                break;
            case "offset":
                this.action = this.offset;
                break;
            case "limit":
                this.action = this.limit;
                break;
            case "shift_amount":
                this.action = this.shift_amount;
                break;
        }

        
        if (STATIC)
            this.down();
    }

    destroy() {
        this.container = null;
        super.destroy();
    }

    updateProp(io, val) {
        super.updateProp(io, val);
        this.down();
    }

    setValue(value) {
        if (Array.isArray(value)) {
            value.forEach((v, i) => this.arg_props[i] = v);
            this.ACTIVE_IOS = this.IO_ACTIVATIONS;
        } else if (typeof(value) == "object") {
            //Distribute iterable named properties amongst the IO_Script's own props.
            for (const a in value) {
                if (this.arg_ios[a])
                    this.arg_ios[a].down(value[a]);
            }
        } else {
            if (this.TAP_BINDING !== -1)
                this.arg_props[this.TAP_BINDING] = value;
        }
    }

    scheduledUpdate() {


        this.val = super.scheduledUpdate();

        if(this.action == this.scrub){
            this.container.scrub(this.val);
        }else if (this.ARRAY_ACTION) {
            this.container.filterExpressionUpdate();
        } else if (this.val !== undefined) {
            this.action();
            this.container.limitExpressionUpdate();
        }
    }

    filter(array) {
        return array.filter((a) => (this.setValue([a.model]), super.scheduledUpdate()));
    }

    sort(array) {
        return array.sort((a, b) => (this.setValue([a.model, b.model]), super.scheduledUpdate()));
    }

    scrub() {
        //this.container.scrub = this.val;
    }

    offset() {
        this.container.offset_diff = this.val - this.container.offset;
        this.container.offset = this.val;
    }

    limit() {
        this.container.limit = this.val;
    }

    shift_amount() {
        this.container.shift_amount = this.val;
    }
}
