import { SchemeConstructor } from "../constructor";

class StringSchemeConstructor extends SchemeConstructor {
    
    constructor() {

        super();

        this.start_value = "";
    }
    parse(value) {

        return value + "";
    }

    verify(value, result) {
        result.valid = true;

        if (value === undefined) {
            result.valid = false;
            result.reason = " value is undefined"
        } else if (!value instanceof String) {
            result.valid = false;
            result.reason = " value is not a string."
        }
    }

    filter(identifier, filters) {

        for (let i = 0, l = filters.length; i < l; i++)
            if (identifier.match(filters[i] + ""))
                return true;

        return false;
    }
}

let string = new StringSchemeConstructor()

export { string, StringSchemeConstructor };