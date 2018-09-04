import { Lexer } from "../../string_parsing/lexer"

import { NR, AND, OR, ONE_OF } from "./productions"

import { property_definitions, virtual_property_definitions, types } from "./property_and_type_definitions"

class ValueTerm {

    constructor(value, getPropertyParser, definitions) {

        this._value_ = null;

        const IS_VIRTUAL = { is: false };

        if (!(this._value_ = types[value]))
            this._value_ = getPropertyParser(value, IS_VIRTUAL, definitions);

        this._prop_ = "";

        if (!this._value_)
            return new LiteralTerm(value);

        if (this._value_ instanceof NR && IS_VIRTUAL.is)
            this._virtual_ = true;
    }

    _parse_(l, rule, r) {
        if (typeof(l) == "string")
            l = new Lexer(l);

        let rn = { v: null };

        let v = this._value_._parse_(l, rule, rn)

        if (rn.v) {
            if (r)
                if (r.v) {
                    if (Array.isArray(r.v)) {
                        if (Array.isArray(rn.v) && !this._virtual_)
                            r.v = r.v.concat(rn.v);
                        else
                            r.v.push(rn.v);
                    } else {
                        if (Array.isArray(rn.v) && !this._virtual_)
                            r.v = ([r.v]).concat(rn.v);
                        else
                            r.v = [r.v, rn.v];
                    }
                } else
                    r.v = (this._virtual_) ? [rn.v] : rn.v;

            if (this._prop_)
                rule[this._prop_] = rn.v;

            return true;

        } else if (v) {
            if (r)
                if (r.v) {
                    if (Array.isArray(r.v))
                        r.v.push(v);
                    else
                        r.v = [r.v, v];
                } else
                    r.v = v;

            if (this._prop_)
                rule[this._prop_] = v;

            return true;
        } else
            return false;
    }
}

class LiteralTerm {

    constructor(value) {
        this._value_ = value;
        this._prop_ = null;
    }

    _parse_(l, rule, r) {

        if (typeof(l) == "string")
            l = new Lexer(l);

        let v = l.tx;
        if (v == this._value_) {
            l.n();

            if (r)
                if (r.v) {
                    if (Array.isArray(r.v))
                        r.v.push(v);
                    else {
                        let t = r.v;
                        r.v = [t, v];
                    }
                } else
                    r.v = v;

            if (this._prop_)
                rule[this._prop_] = v;

            return true;
        }
        return false;
    }
}

class SymbolTerm extends LiteralTerm {
    _parse_(l, rule, r) {
        if (typeof(l) == "string")
            l = new Lexer(l);

        if (l.tx == this._value_) {
            l.n();
            return true;
        }

        return false;
    }
};

export { LiteralTerm, ValueTerm, SymbolTerm }