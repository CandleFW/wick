import {
    CBezier
} from "../common/math/cubic_bezier";
import {
    CSS_Length
} from "../common/css/types/length";
import {
    CSS_Percentage
} from "../common/css/types/percentage";
import {
    CSS_Color
} from "../common/css/types/color";
import {
    Scheduler
} from "../common/scheduler";
import {
    Lexer
} from "../common/string_parsing/lexer";

const Animation = (function anim() {

    const CSS_STYLE = 0,
        JS_OBJECT = 1,
        SVG = 4,
        PATH = 3;

    function setType(obj) {
        if (obj instanceof HTMLElement) {
            if (obj.tagName == "path") return SVG;
            return CSS_STYLE;
        }
        return JS_OBJECT;
    }
    const Linear = {
        getYatX: x => x
    };
    /**
     * Class to linearly interpolate number.
     */
    class lerpNumber extends Number {
        lerp(to, t) {
            return this + (to - this) * t;
        }
    }
    /**
     * Class to linearly interpolate Array of numbers.
     */
    class AnimArray extends Array {
        constructor(data) {
            super();

            if(typeof(data) == "string")
            	data = AnimArray.pathDataToArray(data)
            
            data.forEach(c => this.push(c));
        }

        lerp(to, t) {
            for (let i = 0, l = this.length; i < l; i++) transfer_array[i] = to[i] + (to[i] - this[i]) * t
            transfer_array.length = this.length;
            return transfer_array;
        }

        toString(){
        	return toSVGBezierPath(this);
        }

        static toSVGBezierPath(array) {
            let i = 0,
                l = array.length - 6,
                temp = [];
            //first two values should always be moveto xy
            if (l >= 2) {
                temp.push("M", array[i], " ", array[i + 1])
                for (; i < l; i += 6) temp.push(" C ", array[i], " ", array[i + 1], ",", array[i + 2], " ", array[i + 3], ",", array[i + 4], " ", array[i + 5]);
                return temp.join("");
            }
            return "";
        }
        static pathDataToArray(data) {
            let temp_array = [];
            let lex = new Lexer(data);
            while (!lex.END) {
                switch (lex.ty) {
                    case lex.types.id:
                        switch (lex.ch) {
                            case "M":
                            	lex.tl = 1;
                                temp_array.push(0);
                                break;
                            case 'C':
                            	lex.tl = 1;
                                temp_array.push(1);
                        }
                        break;
                    case lex.types.num:
                        temp_array.push(parseFloat(lex.tx));
                }
                lex.n();
            }
            return temp_array;
        }
    }
    const transfer_array = new AnimArray;
    /**
     * Store animation data for a single property on a single object. 
     * @class      AnimProp (name)
     */
    class AnimProp {
        constructor(keys, obj, prop_name, type) {
            this.duration = 0;
            this.end = false;
            this.keys = [];
            this.current_val = null;
            this.type = null;
            if (Array.isArray(keys)) {
                this.type = this.getType(keys[0].value, type);
                keys.forEach(k => this.addKey(k));
            } else {
                this.type = this.getType(keys.value);
                this.addKey(keys);
            }
            this.getValue(obj, prop_name, type);
        }

        _destroy_() {
            this.keys = null;
            this.type = null;
            this.current_val = null;
        }

        getValue(obj, prop_name, type) {
            if (type == CSS_STYLE) {
                let cs = window.getComputedStyle(obj);
                this.current_val = new this.type(cs.getPropertyValue(prop_name.replace(/[A-Z]/g, (match) => "-" + match.toLowerCase())));
            } else {
                this.current_val = new this.type(obj[prop_name]);
            }
        }

        getType(value, type) {
            if (typeof(value) === "number") return lerpNumber;
            if (CSS_Length._verify_(value)) return CSS_Length;
            if (CSS_Percentage._verify_(value)) return CSS_Percentage;
            if (CSS_Color._verify_(value)) return CSS_Color;
            if(type == PATH && (typeof(value) == string || Array.isArray(value)))
            	return AnimArray;
            return lerpNumber;
        }

        addKey(key) {
            let own_key = {
                val: new this.type(key.value) || 0,
                dur: key.duration || 0,
                del: key.delay || 0,
                ease: key.easing || Linear,
                len: 0
            };
            own_key.len = own_key.dur + own_key.del;
            this.keys.push(own_key);
            this.duration += own_key.len;
        }

        run(obj, prop_name, time, type) {
            let val_start = this.current_val,
                val_end = this.current_val,
                key, val_out = val_start,
                in_range = time < this.duration;
            for (let i = 0; i < this.keys.length; i++) {
                key = this.keys[i];
                val_end = key.val;
                if (time < key.len) {
                    break;
                } else time -= key.len;
                val_start = key.val;
            }
            if (key) {
                if (time < key.len) {
                    if (time < key.del) {
                        val_out = val_start;
                    } else {
                        let x = (time - key.del) / key.dur;
                        let s = key.ease.getYatX(x);
                        val_out = val_start.lerp(val_end, s);
                    }
                } else {
                    val_out = val_end;
                }
            }
            this.setProp(obj, prop_name, val_out, type);
            return in_range;
        }

        setProp(obj, prop_name, value, type) {
        	switch(type){
        		case PATH:
        			if(prop_name == "d")
        				return 
        		case CSS_STYLE:
        			return obj.style[prop_name] = value;
        	}
        	obj[prop_name] = value;
        }
    }
    /**
     * Stores animation data for a group of properties. Defines delay and repeat.
     * @class      AnimSequence (name)
     */
    class AnimSequence {
        constructor(obj, props) {
            this.duration = 0;
            this.time = 0;
            this.type = setType(obj);
            this.obj = null;
            this.DESTROYED = false;
            this.events = {};
            switch (this.type) {
                case CSS_STYLE:
                    this.obj = obj;
                    break;
                case SVG:
                case JS_OBJECT:
                    this.obj = obj;
                    break;
            }
            this.props = {};
            this.setProps(props);
        }
        _destroy_() {
            for (let name in this.props)
                if (this.props[name]) this.props[name]._destroy_();
            this.DESTROYED = true;
            this.duration = 0;
            this.obj = null;
            this.props = null;
            this.time = 0;
        }
        /**
         * Removes AnimProps based on object of keys that should be removed from this sequence.
         */
        removeProps(props) {
            if (props instanceof AnimSequence) props = props.props;
            for (let name in props) {
                if (this.props[name]) this.props[name] = null;
            }
        }
        /**
         * Sets the properties.
         *
         * @param      {<type>}  props   The properties
         */
        setProps(props) {
            for (let name in this.props) this.props[name]._destroy_();
            this.props = {};
            for (let name in props) this.configureProp(name, props[name]);
        }
        configureProp(name, keys) {
            let prop;
            if (prop = this.props[name]) {
                this.duration = Math.max(prop.duration, this.duration);
            } else {
                prop = new AnimProp(keys, this.obj, name, this.type);
                this.props[name] = prop;
                this.duration = Math.max(prop.duration, this.duration);
            }
        }
        run(i) {
            for (let n in this.props) {
                let prop = this.props[n];
                if (prop) prop.run(this.obj, n, i, this.type);
            }
            if (i >= this.duration) return false;
            return true;
        }
        _scheduledUpdate_(a, t) {
            if (this.run(this.time += t)) Scheduler.queueUpdate(this);
            else this.issueEvent("stopped");
        }
        play(from = 0) {
            this.time = from;
            Scheduler.queueUpdate(this);
            this.issueEvent("started");
        }
        addEventListener(event, listener) {
            if (typeof(listener) === "function") {
                if (!this.events[event]) this.events[event] = [];
                this.events[event].push(listener);
            }
        }
        removeEventListener(event, listener) {
            if (typeof(listener) === "function") {
                let events = this.events[event];
                if (events) {
                    for (let i = 0; i < events.length; i++)
                        if (events[i] === listener) return e(vents.splice(i, 1), true);
                }
            }
            return false;
        }
        issueEvent(event) {
            let events = this.events[event];
            if (events) events.forEach(e => e(this));
        }
    }
    class AnimGroup {
        constructor() {
            this.seq = [];
            this.time = 0;
            this.duration = 0;
        }
        _destroy_() {
            this.seq.forEach(seq => seq._destroy_());
            this.seq = null;
        }
        add(seq) {
            this.seq.push(seq);
            this.duration = Math.max(this.duration, seq.duration);
        }
        run(i) {
            for (let i = 0, l = this.seq.lenght; i < l; i++) {
                let seq = this.seq[i];
                seq.run(i);
            }
            if (i >= this.duration) return false;
            return true;
        }
        _scheduledUpdate_(a, t) {
            if (this.run(this.time += t)) Scheduler.queueUpdate(this);
        }
        play(from = 0) {
            this.time = 0;
            Scheduler.queueUpdate(this);
        }
    }
    return {
        createSequence: function(data) {
            let obj = data.obj;
            let props = {};
            Object.keys(data).forEach(k => {
                if (!(({
                        obj: true,
                        match: true
                    })[k])) props[k] = data[k];
            });
            let seq = new AnimSequence(obj, props);
            return seq;
        },
        createGroup: function(...rest) {
            let group = new AnimGroup;
            rest.forEach(seq => group.add(seq));
            return group;
        },
        array: AnimArray,
        easing: {
            linear: Linear,
            ease: new CBezier(0.25, 0.1, 0.25, 1),
            ease_in: new CBezier(0.42, 0, 1, 1),
            ease_out: new CBezier(0, 0, 0.58, 1),
            ease_in_out: new CBezier(0.42, 0, 0.58, 1)
        }
    };
>>>>>>> cd4d2259fe317e0ae066f6b3ae91633af75d1c49
})();
export {
    Animation
};