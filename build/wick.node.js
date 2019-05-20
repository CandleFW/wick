'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const A = 65;
const a = 97;
const ACKNOWLEDGE = 6;
const AMPERSAND = 38;
const ASTERISK = 42;
const AT = 64;
const B = 66;
const b = 98;
const BACKSLASH = 92;
const BACKSPACE = 8;
const BELL = 7;
const C = 67;
const c = 99;
const CANCEL = 24;
const CARET = 94;
const CARRIAGE_RETURN = 13;
const CLOSE_CURLY = 125;
const CLOSE_PARENTH = 41;
const CLOSE_SQUARE = 93;
const COLON = 58;
const COMMA = 44;
const d = 100;
const D = 68;
const DATA_LINK_ESCAPE = 16;
const DELETE = 127;
const DEVICE_CTRL_1 = 17;
const DEVICE_CTRL_2 = 18;
const DEVICE_CTRL_3 = 19;
const DEVICE_CTRL_4 = 20;
const DOLLAR = 36;
const DOUBLE_QUOTE = 34;
const e$1 = 101;
const E = 69;
const EIGHT = 56;
const END_OF_MEDIUM = 25;
const END_OF_TRANSMISSION = 4;
const END_OF_TRANSMISSION_BLOCK = 23;
const END_OF_TXT = 3;
const ENQUIRY = 5;
const EQUAL = 61;
const ESCAPE = 27;
const EXCLAMATION = 33;
const f = 102;
const F = 70;
const FILE_SEPERATOR = 28;
const FIVE = 53;
const FORM_FEED = 12;
const FORWARD_SLASH = 47;
const FOUR = 52;
const g = 103;
const G = 71;
const GRAVE = 96;
const GREATER_THAN = 62;
const GROUP_SEPERATOR = 29;
const h = 104;
const H = 72;
const HASH = 35;
const HORIZONTAL_TAB = 9;
const HYPHEN = 45;
const i$1 = 105;
const I = 73;
const j = 106;
const J = 74;
const k = 107;
const K = 75;
const l = 108;
const L = 76;
const LESS_THAN = 60;
const LINE_FEED = 10;
const m = 109;
const M = 77;
const n = 110;
const N = 78;
const NEGATIVE_ACKNOWLEDGE = 21;
const NINE = 57;
const NULL = 0;
const o = 111;
const O = 79;
const ONE = 49;
const OPEN_CURLY = 123;
const OPEN_PARENTH = 40;
const OPEN_SQUARE = 91;
const p = 112;
const P = 80;
const PERCENT = 37;
const PERIOD = 46;
const PLUS = 43;
const q = 113;
const Q = 81;
const QMARK = 63;
const QUOTE = 39;
const r = 114;
const R = 82;
const RECORD_SEPERATOR = 30;
const s = 115;
const S = 83;
const SEMICOLON = 59;
const SEVEN = 55;
const SHIFT_IN = 15;
const SHIFT_OUT = 14;
const SIX = 54;
const SPACE = 32;
const START_OF_HEADER = 1;
const START_OF_TEXT = 2;
const SUBSTITUTE = 26;
const SYNCH_IDLE = 22;
const t = 116;
const T = 84;
const THREE = 51;
const TILDE = 126;
const TWO = 50;
const u = 117;
const U = 85;
const UNDER_SCORE = 95;
const UNIT_SEPERATOR = 31;
const v = 118;
const V = 86;
const VERTICAL_BAR = 124;
const VERTICAL_TAB = 11;
const w = 119;
const W = 87;
const x = 120;
const X = 88;
const y = 121;
const Y = 89;
const z = 122;
const Z = 90;
const ZERO = 48;

/**
 * Lexer Jump table reference 
 * 0. NUMBER
 * 1. IDENTIFIER
 * 2. QUOTE STRING
 * 3. SPACE SET
 * 4. TAB SET
 * 5. CARIAGE RETURN
 * 6. LINEFEED
 * 7. SYMBOL
 * 8. OPERATOR
 * 9. OPEN BRACKET
 * 10. CLOSE BRACKET 
 * 11. DATA_LINK
 */ 
const jump_table = [
7, 	 	/* NULL */
7, 	 	/* START_OF_HEADER */
7, 	 	/* START_OF_TEXT */
7, 	 	/* END_OF_TXT */
7, 	 	/* END_OF_TRANSMISSION */
7, 	 	/* ENQUIRY */
7, 	 	/* ACKNOWLEDGE */
7, 	 	/* BELL */
7, 	 	/* BACKSPACE */
4, 	 	/* HORIZONTAL_TAB */
6, 	 	/* LINEFEED */
7, 	 	/* VERTICAL_TAB */
7, 	 	/* FORM_FEED */
5, 	 	/* CARRIAGE_RETURN */
7, 	 	/* SHIFT_OUT */
7, 		/* SHIFT_IN */
11,	 	/* DATA_LINK_ESCAPE */
7, 	 	/* DEVICE_CTRL_1 */
7, 	 	/* DEVICE_CTRL_2 */
7, 	 	/* DEVICE_CTRL_3 */
7, 	 	/* DEVICE_CTRL_4 */
7, 	 	/* NEGATIVE_ACKNOWLEDGE */
7, 	 	/* SYNCH_IDLE */
7, 	 	/* END_OF_TRANSMISSION_BLOCK */
7, 	 	/* CANCEL */
7, 	 	/* END_OF_MEDIUM */
7, 	 	/* SUBSTITUTE */
7, 	 	/* ESCAPE */
7, 	 	/* FILE_SEPERATOR */
7, 	 	/* GROUP_SEPERATOR */
7, 	 	/* RECORD_SEPERATOR */
7, 	 	/* UNIT_SEPERATOR */
3, 	 	/* SPACE */
8, 	 	/* EXCLAMATION */
2, 	 	/* DOUBLE_QUOTE */
7, 	 	/* HASH */
7, 	 	/* DOLLAR */
8, 	 	/* PERCENT */
8, 	 	/* AMPERSAND */
2, 	 	/* QUOTE */
9, 	 	/* OPEN_PARENTH */
10, 	 /* CLOSE_PARENTH */
8, 	 	/* ASTERISK */
8, 	 	/* PLUS */
7, 	 	/* COMMA */
7, 	 	/* HYPHEN */
7, 	 	/* PERIOD */
7, 	 	/* FORWARD_SLASH */
0, 	 	/* ZERO */
0, 	 	/* ONE */
0, 	 	/* TWO */
0, 	 	/* THREE */
0, 	 	/* FOUR */
0, 	 	/* FIVE */
0, 	 	/* SIX */
0, 	 	/* SEVEN */
0, 	 	/* EIGHT */
0, 	 	/* NINE */
8, 	 	/* COLON */
7, 	 	/* SEMICOLON */
8, 	 	/* LESS_THAN */
8, 	 	/* EQUAL */
8, 	 	/* GREATER_THAN */
7, 	 	/* QMARK */
7, 	 	/* AT */
1, 	 	/* A*/
1, 	 	/* B */
1, 	 	/* C */
1, 	 	/* D */
1, 	 	/* E */
1, 	 	/* F */
1, 	 	/* G */
1, 	 	/* H */
1, 	 	/* I */
1, 	 	/* J */
1, 	 	/* K */
1, 	 	/* L */
1, 	 	/* M */
1, 	 	/* N */
1, 	 	/* O */
1, 	 	/* P */
1, 	 	/* Q */
1, 	 	/* R */
1, 	 	/* S */
1, 	 	/* T */
1, 	 	/* U */
1, 	 	/* V */
1, 	 	/* W */
1, 	 	/* X */
1, 	 	/* Y */
1, 	 	/* Z */
9, 	 	/* OPEN_SQUARE */
7, 	 	/* TILDE */
10, 	/* CLOSE_SQUARE */
7, 	 	/* CARET */
7, 	 	/* UNDER_SCORE */
2, 	 	/* GRAVE */
1, 	 	/* a */
1, 	 	/* b */
1, 	 	/* c */
1, 	 	/* d */
1, 	 	/* e */
1, 	 	/* f */
1, 	 	/* g */
1, 	 	/* h */
1, 	 	/* i */
1, 	 	/* j */
1, 	 	/* k */
1, 	 	/* l */
1, 	 	/* m */
1, 	 	/* n */
1, 	 	/* o */
1, 	 	/* p */
1, 	 	/* q */
1, 	 	/* r */
1, 	 	/* s */
1, 	 	/* t */
1, 	 	/* u */
1, 	 	/* v */
1, 	 	/* w */
1, 	 	/* x */
1, 	 	/* y */
1, 	 	/* z */
9, 	 	/* OPEN_CURLY */
7, 	 	/* VERTICAL_BAR */
10,  	/* CLOSE_CURLY */
7,  	/* TILDE */
7 		/* DELETE */
];	

/**
 * LExer Number and Identifier jump table reference
 * Number are masked by 12(4|8) and Identifiers are masked by 10(2|8)
 * entries marked as `0` are not evaluated as either being in the number set or the identifier set.
 * entries marked as `2` are in the identifier set but not the number set
 * entries marked as `4` are in the number set but not the identifier set
 * entries marked as `8` are in both number and identifier sets
 */
const number_and_identifier_table = [
0, 		/* NULL */
0, 		/* START_OF_HEADER */
0, 		/* START_OF_TEXT */
0, 		/* END_OF_TXT */
0, 		/* END_OF_TRANSMISSION */
0, 		/* ENQUIRY */
0,		/* ACKNOWLEDGE */
0,		/* BELL */
0,		/* BACKSPACE */
0,		/* HORIZONTAL_TAB */
0,		/* LINEFEED */
0,		/* VERTICAL_TAB */
0,		/* FORM_FEED */
0,		/* CARRIAGE_RETURN */
0,		/* SHIFT_OUT */
0,		/* SHIFT_IN */
0,		/* DATA_LINK_ESCAPE */
0,		/* DEVICE_CTRL_1 */
0,		/* DEVICE_CTRL_2 */
0,		/* DEVICE_CTRL_3 */
0,		/* DEVICE_CTRL_4 */
0,		/* NEGATIVE_ACKNOWLEDGE */
0,		/* SYNCH_IDLE */
0,		/* END_OF_TRANSMISSION_BLOCK */
0,		/* CANCEL */
0,		/* END_OF_MEDIUM */
0,		/* SUBSTITUTE */
0,		/* ESCAPE */
0,		/* FILE_SEPERATOR */
0,		/* GROUP_SEPERATOR */
0,		/* RECORD_SEPERATOR */
0,		/* UNIT_SEPERATOR */
0,		/* SPACE */
0,		/* EXCLAMATION */
0,		/* DOUBLE_QUOTE */
0,		/* HASH */
8,		/* DOLLAR */
0,		/* PERCENT */
0,		/* AMPERSAND */
2,		/* QUOTE */
0,		/* OPEN_PARENTH */
0,		 /* CLOSE_PARENTH */
0,		/* ASTERISK */
0,		/* PLUS */
0,		/* COMMA */
2,		/* HYPHEN */
4,		/* PERIOD */
0,		/* FORWARD_SLASH */
8,		/* ZERO */
8,		/* ONE */
8,		/* TWO */
8,		/* THREE */
8,		/* FOUR */
8,		/* FIVE */
8,		/* SIX */
8,		/* SEVEN */
8,		/* EIGHT */
8,		/* NINE */
0,		/* COLON */
0,		/* SEMICOLON */
0,		/* LESS_THAN */
0,		/* EQUAL */
0,		/* GREATER_THAN */
0,		/* QMARK */
0,		/* AT */
2,		/* A*/
8,		/* B */
2,		/* C */
2,		/* D */
8,		/* E */
2,		/* F */
2,		/* G */
2,		/* H */
2,		/* I */
2,		/* J */
2,		/* K */
2,		/* L */
2,		/* M */
2,		/* N */
8,		/* O */
2,		/* P */
2,		/* Q */
2,		/* R */
2,		/* S */
2,		/* T */
2,		/* U */
2,		/* V */
2,		/* W */
8,		/* X */
2,		/* Y */
2,		/* Z */
0,		/* OPEN_SQUARE */
0,		/* TILDE */
0,		/* CLOSE_SQUARE */
0,		/* CARET */
2,		/* UNDER_SCORE */
0,		/* GRAVE */
2,		/* a */
8,		/* b */
2,		/* c */
2,		/* d */
2,		/* e */
2,		/* f */
2,		/* g */
2,		/* h */
2,		/* i */
2,		/* j */
2,		/* k */
2,		/* l */
2,		/* m */
2,		/* n */
8,		/* o */
2,		/* p */
2,		/* q */
2,		/* r */
2,		/* s */
2,		/* t */
2,		/* u */
2,		/* v */
2,		/* w */
8,		/* x */
2,		/* y */
2,		/* z */
0,		/* OPEN_CURLY */
0,		/* VERTICAL_BAR */
0,		/* CLOSE_CURLY */
0,		/* TILDE */
0		/* DELETE */
];

const 
    number = 1,
    identifier = 2,
    string = 4,
    white_space = 8,
    open_bracket = 16,
    close_bracket = 32,
    operator = 64,
    symbol = 128,
    new_line = 256,
    data_link = 512,
    alpha_numeric = (identifier | number),
    white_space_new_line = (white_space | new_line),
    Types = {
        num: number,
        number,
        id: identifier,
        identifier,
        str: string,
        string,
        ws: white_space,
        white_space,
        ob: open_bracket,
        open_bracket,
        cb: close_bracket,
        close_bracket,
        op: operator,
        operator,
        sym: symbol,
        symbol,
        nl: new_line,
        new_line,
        dl: data_link,
        data_link,
        alpha_numeric,
        white_space_new_line,
    },

    /*** MASKS ***/

    TYPE_MASK = 0xF,
    PARSE_STRING_MASK = 0x10,
    IGNORE_WHITESPACE_MASK = 0x20,
    CHARACTERS_ONLY_MASK = 0x40,
    TOKEN_LENGTH_MASK = 0xFFFFFF80,

    //De Bruijn Sequence for finding index of right most bit set.
    //http://supertech.csail.mit.edu/papers/debruijn.pdf
    debruijnLUT = [
        0, 1, 28, 2, 29, 14, 24, 3, 30, 22, 20, 15, 25, 17, 4, 8,
        31, 27, 13, 23, 21, 19, 16, 7, 26, 12, 18, 6, 11, 5, 10, 9
    ];

const  getNumbrOfTrailingZeroBitsFromPowerOf2 = (value) => debruijnLUT[(value * 0x077CB531) >>> 27];

class Lexer {

    constructor(string = "", INCLUDE_WHITE_SPACE_TOKENS = false, PEEKING = false) {

        if (typeof(string) !== "string") throw new Error(`String value must be passed to Lexer. A ${typeof(string)} was passed as the \`string\` argument.`);

        /**
         * The string that the Lexer tokenizes.
         */
        this.str = string;

        /**
         * Reference to the peeking Lexer.
         */
        this.p = null;

        /**
         * The type id of the current token.
         */
        this.type = 32768; //Default "non-value" for types is 1<<15;

        /**
         * The offset in the string of the start of the current token.
         */
        this.off = 0;

        this.masked_values = 0;

        /**
         * The character offset of the current token within a line.
         */
        this.char = 0;
        /**
         * The line position of the current token.
         */
        this.line = 0;
        /**
         * The length of the string being parsed
         */
        this.sl = string.length;
        /**
         * The length of the current token.
         */
        this.tl = 0;

        /**
         * Flag to ignore white spaced.
         */
        this.IWS = !INCLUDE_WHITE_SPACE_TOKENS;

        /**
         * Flag to force the lexer to parse string contents
         */
        this.PARSE_STRING = false;

        if (!PEEKING) this.next();
    }

    /**
     * Restricts max parse distance to the other Lexer's current position.
     * @param      {Lexer}  Lexer   The Lexer to limit parse distance by.
     */
    fence(marker = this) {
        if (marker.str !== this.str)
            return;
        this.sl = marker.off;
        return this;
    }

    /**
     * Copies the Lexer.
     * @return     {Lexer}  Returns a new Lexer instance with the same property values.
     */
    copy(destination = new Lexer(this.str, false, true)) {
        destination.off = this.off;
        destination.char = this.char;
        destination.line = this.line;
        destination.sl = this.sl;
        destination.masked_values = this.masked_values;
        return destination;
    }

    /**
     * Given another Lexer with the same `str` property value, it will copy the state of that Lexer.
     * @param      {Lexer}  [marker=this.peek]  The Lexer to clone the state from. 
     * @throws     {Error} Throws an error if the Lexers reference different strings.
     * @public
     */
    sync(marker = this.p) {

        if (marker instanceof Lexer) {
            if (marker.str !== this.str) throw new Error("Cannot sync Lexers with different strings!");
            this.off = marker.off;
            this.char = marker.char;
            this.line = marker.line;
            this.masked_values = marker.masked_values;
        }

        return this;
    }

    /**
    Creates and error message with a diagrame illustrating the location of the error. 
    */
    errorMessage(message = "") {
        const arrow = String.fromCharCode(0x2b89),
            trs = String.fromCharCode(0x2500),
            line = String.fromCharCode(0x2500),
            thick_line = String.fromCharCode(0x2501),
            line_number = "    " + this.line + ": ",
            line_fill = line_number.length,
            t$$1 = thick_line.repeat(line_fill + 48),
            is_iws = (!this.IWS) ? "\n The Lexer produced whitespace tokens" : "";
        const pk = this.copy();
        pk.IWS = false;
        while (!pk.END && pk.ty !== Types.nl) { pk.next(); }
        const end = (pk.END) ? this.str.length : pk.off ;

    //console.log(`"${this.str.slice(this.off-this.char+((this.line > 0) ? 2 :2), end).split("").map((e,i,s)=>e.charCodeAt(0))}"`)
    let v$$1 = "", length = 0;
    v$$1 = this.str.slice(this.off-this.char+((this.line > 0) ? 2 :1), end);
    length = this.char;
    return `${message} at ${this.line}:${this.char}
${t$$1}
${line_number+v$$1}
${line.repeat(length+line_fill-((this.line > 0) ? 2 :1))+arrow}
${t$$1}
${is_iws}`;
    }

    /**
     * Will throw a new Error, appending the parsed string line and position information to the the error message passed into the function.
     * @instance
     * @public
     * @param {String} message - The error message.
     * @param {Bool} DEFER - if true, returns an Error object instead of throwing.
     */
    throw (message, DEFER = false) {
        const error = new Error(this.errorMessage(message));
        if (DEFER)
            return error;
        throw error;
    }

    /**
     * Proxy for Lexer.prototype.reset
     * @public
     */
    r() { return this.reset() }

    /**
     * Restore the Lexer back to it's initial state.
     * @public
     */
    reset() {
        this.p = null;
        this.type = 32768;
        this.off = 0;
        this.tl = 0;
        this.char = 0;
        this.line = 0;
        this.n;
        return this;
    }

    resetHead() {
        this.off = 0;
        this.tl = 0;
        this.char = 0;
        this.line = 0;
        this.p = null;
        this.type = 32768;
    }

    /**
     * Sets the internal state to point to the next token. Sets Lexer.prototype.END to `true` if the end of the string is hit.
     * @public
     * @param {Lexer} [marker=this] - If another Lexer is passed into this method, it will advance the token state of that Lexer.
     */
    next(marker = this) {

        if (marker.sl < 1) {
            marker.off = 0;
            marker.type = 32768;
            marker.tl = 0;
            marker.line = 0;
            marker.char = 0;
            return marker;
        }

        //Token builder
        const l$$1 = marker.sl,
            str = marker.str,
            IWS = marker.IWS;

        let length = marker.tl,
            off = marker.off + length,
            type = symbol,
            line = marker.line,
            base = off,
            char = marker.char,
            root = marker.off;

        if (off >= l$$1) {
            length = 0;
            base = l$$1;
            //char -= base - off;
            marker.char = char + (base - marker.off);
            marker.type = type;
            marker.off = base;
            marker.tl = 0;
            marker.line = line;
            return marker;
        }

        const USE_CUSTOM_SYMBOLS = !!this.symbol_map;
        let NORMAL_PARSE = true;

        if (USE_CUSTOM_SYMBOLS) {

            let code = str.charCodeAt(off);
            let off2 = off;
            let map = this.symbol_map,
                m$$1;
            let i = 0;

            while (code == 32 && IWS)
                (code = str.charCodeAt(++off2), off++);

            while ((m$$1 = map.get(code))) {
                map = m$$1;
                off2 += 1;
                code = str.charCodeAt(off2);
            }

            if (map.IS_SYM) {
                NORMAL_PARSE = false;
                base = off;
                length = off2 - off;
                //char += length;
            }
        }

        if (NORMAL_PARSE) {

            for (;;) {

                base = off;

                length = 1;

                const code = str.charCodeAt(off);

                if (code < 128) {

                    switch (jump_table[code]) {
                        case 0: //NUMBER
                            while (++off < l$$1 && (12 & number_and_identifier_table[str.charCodeAt(off)]));

                            if ((str[off] == "e" || str[off] == "E") && (12 & number_and_identifier_table[str.charCodeAt(off + 1)])) {
                                off++;
                                if (str[off] == "-") off++;
                                marker.off = off;
                                marker.tl = 0;
                                marker.next();
                                off = marker.off + marker.tl;
                                //Add e to the number string
                            }

                            type = number;
                            length = off - base;

                            break;
                        case 1: //IDENTIFIER
                            while (++off < l$$1 && ((10 & number_and_identifier_table[str.charCodeAt(off)])));
                            type = identifier;
                            length = off - base;
                            break;
                        case 2: //QUOTED STRING
                            if (this.PARSE_STRING) {
                                type = symbol;
                            } else {
                                while (++off < l$$1 && str.charCodeAt(off) !== code);
                                type = string;
                                length = off - base + 1;
                            }
                            break;
                        case 3: //SPACE SET
                            while (++off < l$$1 && str.charCodeAt(off) === SPACE);
                            type = white_space;
                            length = off - base;
                            break;
                        case 4: //TAB SET
                            while (++off < l$$1 && str[off] === HORIZONTAL_TAB);
                            type = white_space;
                            length = off - base;
                            break;
                        case 5: //CARIAGE RETURN
                            length = 2;
                        case 6: //LINEFEED
                            //Intentional
                            type = new_line;
                            line++;
                            base = off;
                            root = off;
                            off += length;
                            char = 0;
                            break;
                        case 7: //SYMBOL
                            type = symbol;
                            break;
                        case 8: //OPERATOR
                            type = operator;
                            break;
                        case 9: //OPEN BRACKET
                            type = open_bracket;
                            break;
                        case 10: //CLOSE BRACKET
                            type = close_bracket;
                            break;
                        case 11: //Data Link Escape
                            type = data_link;
                            length = 4; //Stores two UTF16 values and a data link sentinel
                            break;
                    }
                }else{
                    break;
                }

                if (IWS && (type & white_space_new_line)) {
                    if (off < l$$1) {
                        type = symbol;
                        //off += length;
                        continue;
                    } else {
                        //Trim white space from end of string
                        //base = l - off;
                        //marker.sl -= off;
                        //length = 0;
                    }
                }
                break;
            }
        }

        marker.type = type;
        marker.off = base;
        marker.tl = (this.masked_values & CHARACTERS_ONLY_MASK) ? Math.min(1, length) : length;
        marker.char = char + base - root;
        marker.line = line;
        return marker;
    }


    /**
     * Proxy for Lexer.prototype.assert
     * @public
     */
    a(text) {
        return this.assert(text);
    }

    /**
     * Compares the string value of the current token to the value passed in. Advances to next token if the two are equal.
     * @public
     * @throws {Error} - `Expecting "${text}" got "${this.text}"`
     * @param {String} text - The string to compare.
     */
    assert(text) {

        if (this.off < 0) this.throw(`Expecting ${text} got null`);

        if (this.text == text)
            this.next();
        else
            this.throw(`Expecting "${text}" got "${this.text}"`);

        return this;
    }

    /**
     * Proxy for Lexer.prototype.assertCharacter
     * @public
     */
    aC(char) { return this.assertCharacter(char) }
    /**
     * Compares the character value of the current token to the value passed in. Advances to next token if the two are equal.
     * @public
     * @throws {Error} - `Expecting "${text}" got "${this.text}"`
     * @param {String} text - The string to compare.
     */
    assertCharacter(char) {

        if (this.off < 0) this.throw(`Expecting ${char[0]} got null`);

        if (this.ch == char[0])
            this.next();
        else
            this.throw(`Expecting "${char[0]}" got "${this.tx[this.off]}"`);

        return this;
    }

    /**
     * Returns the Lexer bound to Lexer.prototype.p, or creates and binds a new Lexer to Lexer.prototype.p. Advences the other Lexer to the token ahead of the calling Lexer.
     * @public
     * @type {Lexer}
     * @param {Lexer} [marker=this] - The marker to originate the peek from. 
     * @param {Lexer} [peek_marker=this.p] - The Lexer to set to the next token state.
     * @return {Lexer} - The Lexer that contains the peeked at token.
     */
    peek(marker = this, peek_marker = this.p) {

        if (!peek_marker) {
            if (!marker) return null;
            if (!this.p) {
                this.p = new Lexer(this.str, false, true);
                peek_marker = this.p;
            }
        }
        peek_marker.masked_values = marker.masked_values;
        peek_marker.type = marker.type;
        peek_marker.off = marker.off;
        peek_marker.tl = marker.tl;
        peek_marker.char = marker.char;
        peek_marker.line = marker.line;
        this.next(peek_marker);
        return peek_marker;
    }


    /**
     * Proxy for Lexer.prototype.slice
     * @public
     */
    s(start) { return this.slice(start) }

    /**
     * Returns a slice of the parsed string beginning at `start` and ending at the current token.
     * @param {Number | LexerBeta} start - The offset in this.str to begin the slice. If this value is a LexerBeta, sets the start point to the value of start.off.
     * @return {String} A substring of the parsed string.
     * @public
     */
    slice(start = this.off) {

        if (start instanceof Lexer) start = start.off;

        return this.str.slice(start, (this.off <= start) ? this.sl : this.off);
    }

    /**
     * Skips to the end of a comment section.
     * @param {boolean} ASSERT - If set to true, will through an error if there is not a comment line or block to skip.
     * @param {Lexer} [marker=this] - If another Lexer is passed into this method, it will advance the token state of that Lexer.
     */
    comment(ASSERT = false, marker = this) {

        if (!(marker instanceof Lexer)) return marker;

        if (marker.ch == "/") {
            if (marker.pk.ch == "*") {
                marker.sync();
                while (!marker.END && (marker.next().ch != "*" || marker.pk.ch != "/")) { /* NO OP */ }
                marker.sync().assert("/");
            } else if (marker.pk.ch == "/") {
                const IWS = marker.IWS;
                while (marker.next().ty != Types.new_line && !marker.END) { /* NO OP */ }
                marker.IWS = IWS;
                marker.next();
            } else
            if (ASSERT) marker.throw("Expecting the start of a comment");
        }

        return marker;
    }

    setString(string, RESET = true) {
        this.str = string;
        this.sl = string.length;
        if (RESET) this.resetHead();
    }

    toString() {
        return this.slice();
    }

    /**
     * Returns new Whind Lexer that has leading and trailing whitespace characters removed from input. 
     * leave_leading_amount - Maximum amount of leading space caracters to leave behind. Default is zero
     * leave_trailing_amount - Maximum amount of trailing space caracters to leave behind. Default is zero
     */
    trim(leave_leading_amount = 0, leave_trailing_amount = leave_leading_amount) {
        const lex = this.copy();

        let space_count = 0,
            off = lex.off;

        for (; lex.off < lex.sl; lex.off++) {
            const c$$1 = jump_table[lex.string.charCodeAt(lex.off)];

            if (c$$1 > 2 && c$$1 < 7) {

                if (space_count >= leave_leading_amount) {
                    off++;
                } else {
                    space_count++;
                }
                continue;
            }

            break;
        }

        lex.off = off;
        space_count = 0;
        off = lex.sl;

        for (; lex.sl > lex.off; lex.sl--) {
            const c$$1 = jump_table[lex.string.charCodeAt(lex.sl - 1)];

            if (c$$1 > 2 && c$$1 < 7) {
                if (space_count >= leave_trailing_amount) {
                    off--;
                } else {
                    space_count++;
                }
                continue;
            }

            break;
        }

        lex.sl = off;

        if (leave_leading_amount > 0)
            lex.IWS = false;

        lex.token_length = 0;

        lex.next();

        return lex;
    }

    /** Adds symbol to symbol_map. This allows custom symbols to be defined and tokenized by parser. **/
    addSymbol(sym) {
        if (!this.symbol_map)
            this.symbol_map = new Map;


        let map = this.symbol_map;

        for (let i = 0; i < sym.length; i++) {
            let code = sym.charCodeAt(i);
            let m$$1 = map.get(code);
            if (!m$$1) {
                m$$1 = map.set(code, new Map).get(code);
            }
            map = m$$1;
        }
        map.IS_SYM = true;
    }

    /*** Getters and Setters ***/
    get string() {
        return this.str;
    }

    get string_length() {
        return this.sl - this.off;
    }

    set string_length(s$$1) {}

    /**
     * The current token in the form of a new Lexer with the current state.
     * Proxy property for Lexer.prototype.copy
     * @type {Lexer}
     * @public
     * @readonly
     */
    get token() {
        return this.copy();
    }


    get ch() {
        return this.str[this.off];
    }

    /**
     * Proxy for Lexer.prototype.text
     * @public
     * @type {String}
     * @readonly
     */
    get tx() { return this.text }

    /**
     * The string value of the current token.
     * @type {String}
     * @public
     * @readonly
     */
    get text() {
        return (this.off < 0) ? "" : this.str.slice(this.off, this.off + this.tl);
    }

    /**
     * The type id of the current token.
     * @type {Number}
     * @public
     * @readonly
     */
    get ty() { return this.type }

    /**
     * The current token's offset position from the start of the string.
     * @type {Number}
     * @public
     * @readonly
     */
    get pos() {
        return this.off;
    }

    /**
     * Proxy for Lexer.prototype.peek
     * @public
     * @readonly
     * @type {Lexer}
     */
    get pk() { return this.peek() }

    /**
     * Proxy for Lexer.prototype.next
     * @public
     */
    get n() { return this.next() }

    get END() { return this.off >= this.sl }
    set END(v$$1) {}

    get type() {
        return 1 << (this.masked_values & TYPE_MASK);
    }

    set type(value) {
        //assuming power of 2 value.
        this.masked_values = (this.masked_values & ~TYPE_MASK) | ((getNumbrOfTrailingZeroBitsFromPowerOf2(value)) & TYPE_MASK);
    }

    get tl() {
        return this.token_length;
    }

    set tl(value) {
        this.token_length = value;
    }

    get token_length() {
        return ((this.masked_values & TOKEN_LENGTH_MASK) >> 7);
    }

    set token_length(value) {
        this.masked_values = (this.masked_values & ~TOKEN_LENGTH_MASK) | (((value << 7) | 0) & TOKEN_LENGTH_MASK);
    }

    get IGNORE_WHITE_SPACE() {
        return this.IWS;
    }

    set IGNORE_WHITE_SPACE(bool) {
        this.iws = !!bool;
    }

    get CHARACTERS_ONLY() {
        return !!(this.masked_values & CHARACTERS_ONLY_MASK);
    }

    set CHARACTERS_ONLY(boolean) {
        this.masked_values = (this.masked_values & ~CHARACTERS_ONLY_MASK) | ((boolean | 0) << 6);
    }

    get IWS() {
        return !!(this.masked_values & IGNORE_WHITESPACE_MASK);
    }

    set IWS(boolean) {
        this.masked_values = (this.masked_values & ~IGNORE_WHITESPACE_MASK) | ((boolean | 0) << 5);
    }

    get PARSE_STRING() {
        return !!(this.masked_values & PARSE_STRING_MASK);
    }

    set PARSE_STRING(boolean) {
        this.masked_values = (this.masked_values & ~PARSE_STRING_MASK) | ((boolean | 0) << 4);
    }

    /**
     * Reference to token id types.
     */
    get types() {
        return Types;
    }
}

Lexer.prototype.addCharacter = Lexer.prototype.addSymbol;

function whind$1(string, INCLUDE_WHITE_SPACE_TOKENS = false) { return new Lexer(string, INCLUDE_WHITE_SPACE_TOKENS) }

whind$1.constructor = Lexer;

Lexer.types = Types;
whind$1.types = Types;

const uri_reg_ex = /(?:([^\:\?\[\]\@\/\#\b\s][^\:\?\[\]\@\/\#\b\s]*)(?:\:\/\/))?(?:([^\:\?\[\]\@\/\#\b\s][^\:\?\[\]\@\/\#\b\s]*)(?:\:([^\:\?\[\]\@\/\#\b\s]*)?)?\@)?(?:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|((?:\[[0-9a-f]{1,4})+(?:\:[0-9a-f]{0,4}){2,7}\])|([^\:\?\[\]\@\/\#\b\s\.]{2,}(?:\.[^\:\?\[\]\@\/\#\b\s]*)*))?(?:\:(\d+))?((?:[^\?\[\]\#\s\b]*)+)?(?:\?([^\[\]\#\s\b]*))?(?:\#([^\#\s\b]*))?/i;

const STOCK_LOCATION = {
    protocol: "",
    host: "",
    port: "",
    path: "",
    hash: "",
    query: "",
    search: ""
};

function fetchLocalText(URL, m = "same-origin") {
    return new Promise((res, rej) => {
        fetch(URL, {
            mode: m, // CORs not allowed
            credentials: m,
            method: "GET"
        }).then(r => {

            if (r.status < 200 || r.status > 299)
                r.text().then(rej);
            else
                r.text().then(res);
        }).catch(e => rej(e));
    });
}

function fetchLocalJSON(URL, m = "same-origin") {
    return new Promise((res, rej) => {
        fetch(URL, {
            mode: m, // CORs not allowed
            credentials: m,
            method: "GET"
        }).then(r => {
            if (r.status < 200 || r.status > 299)
                r.json().then(rej);
            else
                r.json().then(res).catch(rej);
        }).catch(e => rej(e));
    });
}

function submitForm(URL, form_data, m = "same-origin") {
    return new Promise((res, rej) => {
        var form;

        if (form_data instanceof FormData)
            form = form_data;
        else {
            form = new FormData();
            for (let name in form_data)
                form.append(name, form_data[name] + "");
        }

        fetch(URL, {
            mode: m, // CORs not allowed
            credentials: m,
            method: "POST",
            body: form,
        }).then(r => {
            if (r.status < 200 || r.status > 299)
                r.text().then(rej);
            else
                r.json().then(res);
        }).catch(e => e.text().then(rej));
    });
}

function submitJSON(URL, json_data, m = "same-origin") {
    return new Promise((res, rej) => {
        fetch(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: m, // CORs not allowed
            credentials: m,
            method: "POST",
            body: JSON.stringify(json_data),
        }).then(r => {
            if (r.status < 200 || r.status > 299)
                r.json().then(rej);
            else
                r.json().then(res);
        }).catch(e => e.text().then(rej));
    });
}



/**
 * Used for processing URLs, handling `document.location`, and fetching data.
 * @param      {string}   url           The URL string to wrap.
 * @param      {boolean}  USE_LOCATION  If `true` missing URL parts are filled in with data from `document.location`. 
 * @return     {URL}   If a falsy value is passed to `url`, and `USE_LOCATION` is `true` a Global URL is returned. This is directly linked to the page and will _update_ the actual page URL when its values are change. Use with caution. 
 * @alias URL
 * @memberof module:wick.core.network
 */
class URL {

    static resolveRelative(URL_or_url_new, URL_or_url_original = document.location.toString(), ) {

        let URL_old = (URL_or_url_original instanceof URL) ? URL_or_url_original : new URL(URL_or_url_original);
        let URL_new = (URL_or_url_new instanceof URL) ? URL_or_url_new : new URL(URL_or_url_new);

        if (!(URL_old + "") || !(URL_new + "")) return null;

        let new_path = "";
        if (URL_new.path[0] != "/") {

            let a = URL_old.path.split("/");
            let b = URL_new.path.split("/");


            if (b[0] == "..") a.splice(a.length - 1, 1);
            for (let i = 0; i < b.length; i++) {
                switch (b[i]) {
                    case "..":
                    case ".":
                        a.splice(a.length - 1, 1);
                        break;
                    default:
                        a.push(b[i]);
                }
            }
            URL_new.path = a.join("/");
        }

        return URL_new;
    }

    constructor(url = "", USE_LOCATION = false) {

        let IS_STRING = true,
            IS_LOCATION = false;


        let location = (typeof(document) !== "undefined") ? document.location : STOCK_LOCATION;

        if (typeof(Location) !== "undefined" && url instanceof Location) {
            location = url;
            url = "";
            IS_LOCATION = true;
        }
        if (!url || typeof(url) != "string") {
            IS_STRING = false;
            IS_LOCATION = true;
            if (URL.GLOBAL && USE_LOCATION)
                return URL.GLOBAL;
        }

        /**
         * URL protocol
         */
        this.protocol = "";

        /**
         * Username string
         */
        this.user = "";

        /**
         * Password string
         */
        this.pwd = "";

        /**
         * URL hostname
         */
        this.host = "";

        /**
         * URL network port number.
         */
        this.port = 0;

        /**
         * URL resource path
         */
        this.path = "";

        /**
         * URL query string.
         */
        this.query = "";

        /**
         * Hashtag string
         */
        this.hash = "";

        /**
         * Map of the query data
         */
        this.map = null;

        if (IS_STRING) {
            if (url instanceof URL) {
                this.protocol = url.protocol;
                this.user = url.user;
                this.pwd = url.pwd;
                this.host = url.host;
                this.port = url.port;
                this.path = url.path;
                this.query = url.query;
                this.hash = url.hash;
            } else {
                let part = url.match(uri_reg_ex);

                //If the complete string is not matched than we are dealing with something other 
                //than a pure URL. Thus, no object is returned. 
                if (part[0] !== url) return null;

                this.protocol = part[1] || ((USE_LOCATION) ? location.protocol : "");
                this.user = part[2] || "";
                this.pwd = part[3] || "";
                this.host = part[4] || part[5] || part[6] || ((USE_LOCATION) ? location.hostname : "");
                this.port = parseInt(part[7] || ((USE_LOCATION) ? location.port : 0));
                this.path = part[8] || ((USE_LOCATION) ? location.pathname : "");
                this.query = part[9] || ((USE_LOCATION) ? location.search.slice(1) : "");
                this.hash = part[10] || ((USE_LOCATION) ? location.hash.slice(1) : "");

            }
        } else if (IS_LOCATION) {
            this.protocol = location.protocol.replace(/\:/g, "");
            this.host = location.hostname;
            this.port = location.port;
            this.path = location.pathname;
            this.hash = location.hash.slice(1);
            this.query = location.search.slice(1);
            this._getQuery_(this.query);

            if (USE_LOCATION) {
                URL.G = this;
                return URL.R;
            }
        }
        this._getQuery_(this.query);
    }


    /**
    URL Query Syntax

    root => [root_class] [& [class_list]]
         => [class_list]

    root_class = key_list

    class_list [class [& key_list] [& class_list]]

    class => name & key_list

    key_list => [key_val [& key_list]]

    key_val => name = val

    name => ALPHANUMERIC_ID

    val => NUMBER
        => ALPHANUMERIC_ID
    */

    /**
     * Pulls query string info into this.map
     * @private
     */
    _getQuery_() {
        let map = (this.map) ? this.map : (this.map = new Map());

        let lex = whind$1(this.query);


        const get_map = (k, m) => (m.has(k)) ? m.get(k) : m.set(k, new Map).get(k);

        let key = 0,
            key_val = "",
            class_map = get_map(key_val, map),
            lfv = 0;

        while (!lex.END) {
            switch (lex.tx) {
                case "&": //At new class or value
                    if (lfv > 0)
                        key = (class_map.set(key_val, lex.s(lfv)), lfv = 0, lex.n.pos);
                    else {
                        key_val = lex.s(key);
                        key = (class_map = get_map(key_val, map), lex.n.pos);
                    }
                    continue;
                case "=":
                    //looking for a value now
                    key_val = lex.s(key);
                    lfv = lex.n.pos;
                    continue;
            }
            lex.n;
        }

        if (lfv > 0) class_map.set(key_val, lex.s(lfv));
    }

    setPath(path) {

        this.path = path;

        return new URL(this);
    }

    setLocation() {
        history.replaceState({}, "replaced state", `${this}`);
        window.onpopstate();
    }

    toString() {
        let str = [];

        if (this.host) {

            if (this.protocol)
                str.push(`${this.protocol}://`);

            str.push(`${this.host}`);
        }

        if (this.port)
            str.push(`:${this.port}`);

        if (this.path)
            str.push(`${this.path[0] == "/" ? "" : "/"}${this.path}`);

        if (this.query)
            str.push(((this.query[0] == "?" ? "" : "?") + this.query));

        if (this.hash)
            str.push("#" + this.hash);


        return str.join("");
    }

    /**
     * Pulls data stored in query string into an object an returns that.
     * @param      {string}  class_name  The class name
     * @return     {object}  The data.
     */
    getData(class_name = "") {
        if (this.map) {
            let out = {};
            let _c = this.map.get(class_name);
            if (_c) {
                for (let [key, val] of _c.entries())
                    out[key] = val;
                return out;
            }
        }
        return null;
    }

    /**
     * Sets the data in the query string. Wick data is added after a second `?` character in the query field, and appended to the end of any existing data.
     * @param      {string}  class_name  Class name to use in query string. Defaults to root, no class 
     * @param      {object | Model | AnyModel}  data        The data
     */
    setData(data = null, class_name = "") {

        if (data) {

            let map = this.map = new Map();

            let store = (map.has(class_name)) ? map.get(class_name) : (map.set(class_name, new Map()).get(class_name));

            //If the data is a falsy value, delete the association.

            for (let n in data) {
                if (data[n] !== undefined && typeof data[n] !== "object")
                    store.set(n, data[n]);
                else
                    store.delete(n);
            }

            //set query
            let class_, null_class, str = "";

            if ((null_class = map.get(""))) {
                if (null_class.size > 0) {
                    for (let [key, val] of null_class.entries())
                        str += `&${key}=${val}`;

                }
            }

            for (let [key, class_] of map.entries()) {
                if (key === "")
                    continue;
                if (class_.size > 0) {
                    str += `&${key}`;
                    for (let [key, val] of class_.entries())
                        str += `&${key}=${val}`;
                }
            }

            str = str.slice(1);

            this.query = this.query.split("?")[0] + "?" + str;

            if (URL.G == this)
                this.goto();
        } else {
            this.query = "";
        }

        return this;

    }

    /**
     * Fetch a string value of the remote resource. 
     * Just uses path component of URL. Must be from the same origin.
     * @param      {boolean}  [ALLOW_CACHE=true]  If `true`, the return string will be cached. If it is already cached, that will be returned instead. If `false`, a network fetch will always occur , and the result will not be cached.
     * @return     {Promise}  A promise object that resolves to a string of the fetched value.
     */
    fetchText(ALLOW_CACHE = true) {

        if (ALLOW_CACHE) {

            let resource = URL.RC.get(this.path);

            if (resource)
                return new Promise((res) => {
                    res(resource);
                });
        }

        return fetchLocalText(this.path).then(res => (URL.RC.set(this.path, res), res));
    }

    /**
     * Fetch a JSON value of the remote resource. 
     * Just uses path component of URL. Must be from the same origin.
     * @param      {boolean}  [ALLOW_CACHE=true]  If `true`, the return string will be cached. If it is already cached, that will be returned instead. If `false`, a network fetch will always occur , and the result will not be cached.
     * @return     {Promise}  A promise object that resolves to a string of the fetched value.
     */
    fetchJSON(ALLOW_CACHE = true) {

        let string_url = this.toString();

        if (ALLOW_CACHE) {

            let resource = URL.RC.get(string_url);

            if (resource)
                return new Promise((res) => {
                    res(resource);
                });
        }

        return fetchLocalJSON(string_url).then(res => (URL.RC.set(this.path, res), res));
    }

    /**
     * Cache a local resource at the value 
     * @param    {object}  resource  The resource to store at this URL path value.
     * @returns {boolean} `true` if a resource was already cached for this URL, false otherwise.
     */
    cacheResource(resource) {

        let occupied = URL.RC.has(this.path);

        URL.RC.set(this.path, resource);

        return occupied;
    }

    submitForm(form_data) {
        return submitForm(this.toString(), form_data);
    }

    submitJSON(json_data, mode) {
        return submitJSON(this.toString(), json_data, mode);
    }
    /**
     * Goes to the current URL.
     */
    goto() {
        return;
        let url = this.toString();
        history.pushState({}, "ignored title", url);
        window.onpopstate();
        URL.G = this;
    }
    //Returns the last segment of the path
    get file() {
        return this.path.split("/").pop();
    }


    //Returns the all but the last segment of the path
    get dir() {
        return this.path.split("/").slice(0, -1).join("/") || "/";
    }

    get pathname() {
        return this.path;
    }

    get href() {
        return this.toString();
    }

    get ext() {
        const m = this.path.match(/\.([^\.]*)$/);
        return m ? m[1] : "";
    }

    get search() {
        return this.query;
    }
}

/**
 * The fetched resource cache.
 */
URL.RC = new Map();

/**
 * The Default Global URL object. 
 */
URL.G = null;

/**
 * The Global object Proxy.
 */
URL.R = {
    get protocol() {
        return URL.G.protocol;
    },
    set protocol(v) {
        return;
        URL.G.protocol = v;
    },
    get user() {
        return URL.G.user;
    },
    set user(v) {
        return;
        URL.G.user = v;
    },
    get pwd() {
        return URL.G.pwd;
    },
    set pwd(v) {
        return;
        URL.G.pwd = v;
    },
    get host() {
        return URL.G.host;
    },
    set host(v) {
        return;
        URL.G.host = v;
    },
    get port() {
        return URL.G.port;
    },
    set port(v) {
        return;
        URL.G.port = v;
    },
    get path() {
        return URL.G.path;
    },
    set path(v) {
        return;
        URL.G.path = v;
    },
    get query() {
        return URL.G.query;
    },
    set query(v) {
        return;
        URL.G.query = v;
    },
    get hash() {
        return URL.G.hash;
    },
    set hash(v) {
        return;
        URL.G.hash = v;
    },
    get map() {
        return URL.G.map;
    },
    set map(v) {
        return;
        URL.G.map = v;
    },
    setPath(path) {
        return URL.G.setPath(path);
    },
    setLocation() {
        return URL.G.setLocation();
    },
    toString() {
        return URL.G.toString();
    },
    getData(class_name = "") {
        return URL.G.getData(class_name = "");
    },
    setData(class_name = "", data = null) {
        return URL.G.setData(class_name, data);
    },
    fetchText(ALLOW_CACHE = true) {
        return URL.G.fetchText(ALLOW_CACHE);
    },
    cacheResource(resource) {
        return URL.G.cacheResource(resource);
    }
};





let SIMDATA = null;

/* Replaces the fetch actions with functions that simulate network fetches. Resources are added by the user to a Map object. */
URL.simulate = function() {
    SIMDATA = new Map;
    URL.prototype.fetchText = async d => ((d = this.toString()), SIMDATA.get(d)) ? SIMDATA.get(d) : "";
    URL.prototype.fetchJSON = async d => ((d = this.toString()), SIMDATA.get(d)) ? JSON.parse(SIMDATA.get(d).toString()) : {};
};

//Allows simulated resources to be added as a key value pair, were the key is a URI string and the value is string data.
URL.addResource = (n, v) => (n && v && (SIMDATA || (SIMDATA = new Map())) && SIMDATA.set(n.toString(), v.toString));

URL.polyfill = async function() {
    if (typeof(global) !== "undefined") {

        const 
            fs = (await Promise.resolve(require("fs"))).promises,
            path = (await Promise.resolve(require("path")));


        global.Location = (class extends URL {});

        global.document = global.document || {};

        global.document.location = new URL(process.env.PWD);
        /**
         * Global `fetch` polyfill - basic support
         */
        global.fetch = async (url, data) => {
            let
                p = path.join(process.cwd(), (url[0] == ".") ? url + "" : "." + url),
                d = await fs.readFile(p, "utf8");

            try {
                return {
                    status: 200,
                    text: () => {
                        return {
                            then: (f) => f(d)
                        }
                    }
                };
            } catch (err) {
                throw err;
            }
        };
    }
};

Object.freeze(URL.R);
Object.freeze(URL.RC);
Object.seal(URL);

/**
 * Global Document instance short name
 * @property DOC
 * @package
 * @memberof module:wick~internals
 * @type 	{Document}
 */
const DOC = (typeof(document) !== "undefined") ? document : ()=>{};

/**
 * Global Window Instance short name
 * @property WIN
 * @package
 * @memberof module:wick~internals
 * @type 	{Window}
 */
const WIN = (typeof(window) !== "undefined") ? window : ()=>{};

/**
 * Global HTMLElement class short name
 * @property EL
 * @package
 * @memberof module:wick~internals
 * @type 	{HTMLElement}
 */
const EL = (typeof(HTMLElement) !== "undefined") ? HTMLElement : ()=>{};

/**
 * Global Object class short name
 * @property OB
 * @package
 * @memberof module:wick~internals
 * @type Object
 */
const OB = Object;

/**
 * Global String class short name
 * @property STR
 * @package
 * @memberof module:wick~internals
 * @type String
 */
const STR = String;

/**
 * Global Array class short name
 * @property AR
 * @package
 * @memberof module:wick~internals
 * @type 	{Array}
 */
const AR = Array;

/**
 * Global Number class short name
 * @property NUM
 * @package
 * @memberof module:wick~internals
 * @type 	{Number}
 */
const NUM = Number;

/**
 * Global Date class short name
 * @property DT
 * @package
 * @memberof module:wick~internals
 * @type 	{Date}
 */
const DT = Date;

/**
 * Global Boolean class short name
 * @property BO
 * @package
 * @memberof module:wick~internals
 * @type 	{Boolean}
 */
const BO = Boolean;

/***************** Functions ********************/

/**
 *  Global document.createElement short name function.
 * @method DOC
 * @package
 * @memberof module:wick~internals
 * @param 	{String}  		e   - tagname of element to create. 
 * @return  {HTMLElement}  		- HTMLElement instance generated by the document. 
 */
const createElement = (e) => document.createElement(e);

/**
 *  Element.prototype.appendChild short name wrapper.
 * @method appendChild
 * @package
 * @memberof module:wick~internals
 * @param 	{HTMLElement}  		el  	- parent HTMLElement.
 * @return  {HTMLElement | HTMLNode}  		ch_el 	- child HTMLElement or HTMLNode. 
 */
const appendChild = (el, ch_el) => el.appendChild(ch_el);

/**
 *  Element.prototype.cloneNode short name wrapper.
 * @method cloneNode
 * @package
 * @memberof module:wick~internals
 * @param 	{HTMLElement}  		el   - HTMLElement to clone.
 * @return  {Boolean}  			bool - Switch for deep clone
 */
const cloneNode = (el, bool) => el.cloneNode(bool);

/**
 *  Element.prototype.getElementsByTagName short name wrapper.
 * @method _getElementByTag_
 * @package
 * @memberof module:wick~internals
 * @param 	{HTMLElement}  		el   - HTMLElement to find tags on.
 * @return  {String}  			tag - tagnames of elements to find.
 */
const _getElementByTag_ = (el, tag) => el.getElementsByTagName(tag);

/**
 *  Shortname for `instanceof` expression
 * @method _instanceOf_
 * @package
 * @param      {object}  inst    The instance
 * @param      {object}  constr  The constructor
 * @return     {boolean}  the result of `inst instanceof constr`
 */
const _instanceOf_ = (inst, constr) => inst instanceof constr;

const _SealedProperty_ = (object, name, value) => OB.defineProperty(object, name, {value, configurable: false, enumerable: false, writable: true});
const _FrozenProperty_ = (object, name, value) => OB.defineProperty(object, name, {value, configurable: false, enumerable: false, writable: false});

/**
 * Used to call the Scheduler after a JavaScript runtime tick.
 *
 * Depending on the platform, caller will either map to requestAnimationFrame or it will be a setTimout.
 */
 
const caller = (typeof(window) == "object" && window.requestAnimationFrame) ? window.requestAnimationFrame : (f) => {
    setTimeout(f, 1);
};

const perf = (typeof(performance) == "undefined") ? { now: () => Date.now() } : performance;


/**
 * Handles updating objects. It does this by splitting up update cycles, to respect the browser event model. 
 *    
 * If any object is scheduled to be updated, it will be blocked from scheduling more updates until the next ES VM tick.
 */
class Spark {
    /**
     * Constructs the object.
     */
    constructor() {

        this.update_queue_a = [];
        this.update_queue_b = [];

        this.update_queue = this.update_queue_a;

        this.queue_switch = 0;

        this.callback = () => this.update();

        this.frame_time = perf.now();

        this.SCHEDULE_PENDING = false;
    }

    /**
     * Given an object that has a _SCHD_ Boolean property, the Scheduler will queue the object and call its .update function 
     * the following tick. If the object does not have a _SCHD_ property, the Scheduler will persuade the object to have such a property.
     * 
     * If there are currently no queued objects when this is called, then the Scheduler will user caller to schedule an update.
     */
    queueUpdate(object, timestart = 1, timeend = 0) {

        if (object._SCHD_ || object._SCHD_ > 0) {
            if (this.SCHEDULE_PENDING)
                return;
            else
                return caller(this.callback);
        }

        object._SCHD_ = ((timestart & 0xFFFF) | ((timeend) << 16));

        this.update_queue.push(object);

        if (this._SCHD_)
            return;

        this.frame_time = perf.now() | 0;

        this.SCHEDULE_PENDING = true;

        caller(this.callback);
    }

    removeFromQueue(object){

        if(object._SCHD_)
            for(let i = 0, l = this.update_queue.length; i < l; i++)
                if(this.update_queue[i] === object){
                    this.update_queue.splice(i,1);
                    object._SCHD_ = 0;

                    if(l == 1)
                        this.SCHEDULE_PENDING = false;

                    return;
                }
    }

    /**
     * Called by the caller function every tick. Calls .update on any object queued for an update. 
     */
    update() {

        this.SCHEDULE_PENDING = false;

        const uq = this.update_queue;
        const time = perf.now() | 0;
        const diff = Math.ceil(time - this.frame_time) | 1;
        const step_ratio = (diff * 0.06); //  step_ratio of 1 = 16.66666666 or 1000 / 60 for 60 FPS

        this.frame_time = time;
        
        if (this.queue_switch == 0)
            (this.update_queue = this.update_queue_b, this.queue_switch = 1);
        else
            (this.update_queue = this.update_queue_a, this.queue_switch = 0);

        for (let i = 0, l = uq.length, o = uq[0]; i < l; o = uq[++i]) {
            let timestart = ((o._SCHD_ & 0xFFFF)) - diff;
            let timeend = ((o._SCHD_ >> 16) & 0xFFFF);

            o._SCHD_ = 0;
            
            if (timestart > 0) {
                this.queueUpdate(o, timestart, timeend);
                continue;
            }

            timestart = 0;

            if (timeend > 0) 
                this.queueUpdate(o, timestart, timeend - diff);

            /** 
                To ensure on code path doesn't block any others, 
                scheduledUpdate methods are called within a try catch block. 
                Errors by default are printed to console. 
            **/
            try {
                o.scheduledUpdate(step_ratio, diff);
            } catch (e) {
                console.error(e);
            }
        }

        uq.length = 0;
    }
}

const spark = new Spark();

/**
 * The base class which all Model classes extend.
 * @memberof module:wick~internal .model
 * @alias ModelBase
 */
class ModelBase {
    constructor(root = null, address = []) {
        _SealedProperty_(this, "_cv_", []);
        _SealedProperty_(this, "fv", null);
        _SealedProperty_(this, "par", null);
        _SealedProperty_(this, "MUTATION_ID", 0);
        _SealedProperty_(this, "address", address);
        _SealedProperty_(this, "root", root || this);
        _SealedProperty_(this, "prop_name", "");
    }


    /**
     *   Remove all references to any objects still held by this object.
     *   @protected
     *   @instance
     */
    destroy() {

        //inform observers of the models demise
        var observer = this.fv;

        while (observer) {
            let nx = observer.nx;
            observer.unsetModel();
            observer = nx;
        }

        this._cv_ = null;
    }

    setHook(prop_name, data) { return data; }

    getHook(prop_name, data) { return data; }


    /**
     * Called by a class that extends ModelBase when on of its property values changes.
     * @param      {string}  changed_value  The changed value
     * @private
     */
    scheduleUpdate(changed_value) {
        if (!this.fv)
            return;


        this._cv_.push(changed_value);

        spark.queueUpdate(this);
    }


    getChanged(prop_name) {


        for (let i = 0, l = this._cv_.length; i < l; i++)
            if (this._cv_[i] == prop_name)
                return this[prop_name];

        return null;
    }

    addListener(listener) {
        return this.addObserver(listener);
    }


    /**
     * Adds a observer to the linked list of observers on the model. argument observer MUST be an instance of View. 
     * @param {View} observer - The observer to _bind_ to the ModelBase
     * @throws {Error} throws an error if the value of `observer` is not an instance of {@link View}.
     */
    addObserver(observer) {
        if (observer.model)
            if (observer.model !== this) {
                observer.model.removeView(observer);
            } else return;

        if (this.fv) this.fv.pv = observer;
        observer.nx = this.fv;
        this.fv = observer;

        observer.pv = null;
        observer.model = this;
        observer.update(this);
    }

    /**
     * Removes observer from set of observers if the passed in observer is a member of model. 
     * @param {View} observer - The observer to unbind from ModelBase
     */
    removeView(observer) {
        

        if (observer.model == this) {
            if (observer == this.fv)
                this.fv = observer.nx;

            if (observer.nx)
                observer.nx.pv = observer.pv;
            if (observer.pv)
                observer.pv.nx = observer.nx;

            observer.nx = null;
            observer.pv = null;
        }
    }


    /**
        Should return the value of the property if it is in the model and has been updated since the last cycle. Null otherwise.
        This should be overridden by a more efficient version by inheriting objects
    */
    isUpdated(prop_name) {

        let changed_properties = this._cv_;

        for (var i = 0, l = changed_properties.length; i < l; i++)
            if (changed_properties[i] == prop_name)
                if (this[prop_name] !== undefined)
                    return this[prop_name];

        return null;
    }



    /**
     * Called by the {@link spark} when if the ModelBase is scheduled for an update
     * @param      {number}  step    The step
     */
    scheduledUpdate(step) { this.updateViews(); }



    /**
     * Calls View#update on every bound View, passing the current state of the ModelBase.
     */
    updateViews() {

        let o = {};

        for (let p = null, i = 0, l = this._cv_.length; i < l; i++)
            (p = this._cv_[i], o[p] = this[p]);

        this._cv_.length = 0;

        var observer = this.fv;

        while (observer) {

            observer.update(this, o);
            observer = observer.nx;
        }

        return;
    }



    /**
     * Updates observers with a list of models that have been removed. 
     * Primarily used in conjunction with container based observers, such as Templates.
     * @private
     */
    updateViewsRemoved(data) {

        var observer = this.fv;

        while (observer) {

            observer.removed(data);

            observer = observer.nx;
        }
    }



    /** MUTATION FUNCTIONS **************************************************************************************/



    _deferUpdateToRoot_(data, MUTATION_ID = this.MUTATION_ID) {
        
        if(!this.root)
            return this;

        return this.root._setThroughRoot_(data, this.address, 0, this.address.length, MUTATION_ID);
    }



    _setThroughRoot_(data, address, index, len, m_id) {

        if (index >= len) {

            if (m_id !== this.MUTATION_ID) {
                let clone = this.clone();
                clone.set(data, true);
                clone.MUTATION_ID = (this.par) ? this.par.MUTATION_ID : this.MUTATION_ID + 1;
                return clone;
            }

            this.set(data, true);
            return this;
        }

        let i = address[index++];

        let model_prop = this.prop_array[i];

        if (model_prop.MUTATION_ID !== this.MUTATION_ID) {

            model_prop = model_prop.clone();

            model_prop.MUTATION_ID = this.MUTATION_ID;
        }

        this.prop_array[i] = model_prop;

        return model_prop._setThroughRoot_(data, address, index, len, model_prop.MUTATION_ID);
    }

    seal() {

        let clone = this._deferUpdateToRoot_(null, this.MUTATION_ID + 1);

        return clone;
    }

    clone() {

        let clone = new this.constructor(this);

        clone.prop_name = this.prop_name;
        clone._cv_ = this._cv_;
        clone.fv = this.fv;
        clone.par = this.par;
        clone.MUTATION_ID = this.MUTATION_ID;
        clone.address = this.address;
        clone.prop_name = this.prop_name;

        clone.root = (this.root == this) ? clone : this.root;

        return clone;
    }

    /**
     * Updates observers with a list of models that have been added. 
     * Primarily used in conjunction with container based observers, such as Templates.
     * @private
     */
    updateViewsAdded(data) {

        var observer = this.fv;

        while (observer) {

            observer.added(data);

            observer = observer.nx;
        }
    }

    toJSON() { return JSON.stringify(this, null, '\t'); }


    /**
     * This will update the branch state of the data tree with a new branch if the MUTATION_ID is higher or lower than the current branch's parent level.
     * In this case, the new branch will stem from the root node, and all ancestor nodes from the originating child will be cloned.
     *
     * @param      {Object}         child_obj    The child object
     * @param      {(Object|number)}  MUTATION_ID  The mutation id
     * @return     {Object}         { description_of_the_return_value }
     */
    setMutation(child_obj, MUTATION_ID = child_obj.MUTATION_ID) {
        let clone = child_obj,
            result = this;

        if (MUTATION_ID == this.MUTATION_ID) return child_obj;

        if (this.par)
            result = this.par.setMutation(this, MUTATION_ID);

        if (MUTATION_ID > this.MUTATION_ID) {
            result = this.clone();
            result.MUTATION_ID = this.MUTATION_ID + 1;
        }

        clone = child_obj.clone();
        clone.MUTATION_ID = result.MUTATION_ID;
        result[clone.prop_name] = clone;

        return clone;
    }
}

/**
    Schema type. Handles the parsing, validation, and filtering of Model data properties. 
*/
class SchemeConstructor {

    constructor() {

        this.start_value = undefined;
    }

    /**
        Parses value returns an appropriate transformed value
    */
    parse(value) {

        return value;
    }

    /**

    */
    verify(value, result) {

        result.valid = true;
    }

    filter(id, filters) {
        for (let i = 0, l = filters.length; i < l; i++)
            if (id === filters[i]) return true;
        return false;
    }

    string(value) {

        return value + "";
    }
}

class MCArray extends Array {

    constructor() {
        super();
    }

    push(...item) {
        item.forEach(item => {
            if (item instanceof Array)
                item.forEach((i) => {
                    super.push(i);
                });
            else
                super.push(item);
        });
    }

    //For compatibility
    __setFilters__() {

    }

    getChanged() {

    }

    toJSON() { return this; }

    toJson() { return JSON.stringify(this, null, '\t'); }
}

// A no op function
let EmptyFunction = () => {};
let EmptyArray = [];

class ModelContainerBase extends ModelBase {

    constructor(root = null, address = []) {

        super(root, address);

        _SealedProperty_(this, "scope", null);
        _SealedProperty_(this, "first_link", null);

        //For keeping the container from garbage collection.
        _SealedProperty_(this, "pin", EmptyFunction);

        //For Linking to original 
        _SealedProperty_(this, "next", null);
        _SealedProperty_(this, "prev", null);

        //Filters are a series of strings or number selectors used to determine if a model should be inserted into or retrieved from the container.
        _SealedProperty_(this, "_filters_", null);

        this.validator = new SchemeConstructor();

        return this;
    }

    setByIndex(index) { /* NO OP **/ }

    getByIndex(index, value) { /* NO OP **/ }

    destroy() {


        this._filters_ = null;

        if (this.scope) {
            this.scope.__unlink__(this);
        }

        super.destroy();
    }

    /**
        Get the number of Models held in this._mContainerBase

        @returns {Number}
    */
    get length() { return 0; }

    set length(e) { /* NO OP */ }

    /** 
        Returns a ModelContainerBase type to store the results of a get().
    */
    __defaultReturn__(USE_ARRAY) {
        if (USE_ARRAY) return new MCArray;

        let n = new this.constructor();

        n.key = this.key;
        n.validator = this.validator;
        n.model = this.model;

        this.__link__(n);

        return n;
    }

    /**
        Array emulating kludge

        @returns The result of calling this.insert
    */
    push(...item) {
        item.forEach(item => {
            if (this.scope) {
                if (item instanceof Array)
                    item.forEach((i) => {
                        this.insert(i, true, true);
                    });
                else
                    this.insert(item, true, true);

            } else {
                if (item instanceof Array)
                    item.forEach((i) => {
                        this.insert(i);
                    });
                else
                    this.insert(item);

            }
        });
    }

    /**
        Retrieves a list of items that match the term/terms. 

        @param {(Array|SearchTerm)} term - A single term or a set of terms to look for in the ModelContainerBase. 
        @param {Array} __return_data__ - Set to true by a scope Container if it is calling a SubContainer insert function. 

        @returns {(ModelContainerBase|Array)} Returns a Model container or an Array of Models matching the search terms. 
    */
    get(term, __return_data__) {

        let out = null;

        term = this.getHook("term", term);

        let USE_ARRAY = (__return_data__ === null) ? false : true;

        if (term) {

            if (__return_data__) {
                out = __return_data__;
            } else {

                if (!this.scope)
                    USE_ARRAY = false;

                out = this.__defaultReturn__(USE_ARRAY);
                out.__setFilters__(term);
            }
        } else
            out = (__return_data__) ? __return_data__ : this.__defaultReturn__(USE_ARRAY);

        if (!term)
            this.__getAll__(out);
        else {

            let terms = term;

            if (!Array.isArray(term))
                terms = [term];

            //Need to convert terms into a form that will work for the identifier type
            terms = terms.map(t => this.validator.parse(t));

            this.__get__(terms, out);
        }

        return out;
    }

    set(item, from_root = false) {
        if (!from_root)
            return this._deferUpdateToRoot_(item).insert(item, true);
        else
            this.insert(item, true);
    }

    /**
        Inserts an item into the container. If the item is not a {Model}, an attempt will be made to convert the data in the Object into a Model.
        If the item is an array of objects, each object in the array will be considered separately. 

        @param {Object} item - An Object to insert into the container. On of the properties of the object MUST have the same name as the ModelContainerBase's 
        @param {Array} item - An array of Objects to insert into the container.
        @param {Boolean} __FROM_SCOPE__ - Set to true by a scope Container if it is calling a SubContainer insert function. 

        @returns {Boolean} Returns true if an insertion into the ModelContainerBase occurred, false otherwise.
    */
    insert(item, from_root = false, __FROM_SCOPE__ = false) {


        item = this.setHook("", item);

        if (!from_root)
            return this._deferUpdateToRoot_(item).insert(item, true);

        let add_list = (this.fv) ? [] : null;

        let out_data = false;

        if (!__FROM_SCOPE__ && this.scope)
            return this.scope.insert(item);


        if (item instanceof Array) {
            for (var i = 0; i < item.length; i++)
                if (this.__insertSub__(item[i], out_data, add_list))
                    out_data = true;
        } else if (item)
            out_data = this.__insertSub__(item, out_data, add_list);


        if (out_data) {
            if (this.par)
                this.par.scheduleUpdate(this.prop_name);


            if (add_list && add_list.length > 0) {
                this.updateViewsAdded(add_list);
                this.scheduleUpdate();
            }
        }

        return out_data;
    }

    /**
        A subset of the insert function. Handles the testing of presence of an identifier value, the conversion of an Object into a Model, and the calling of the implementation specific __insert__ function.
    */
    __insertSub__(item, out, add_list) {

        let model = item;

        var identifier = this._gI_(item);

        if (identifier !== undefined) {

            if (!(model instanceof ModelBase)) {
                model = new this.model(item);
                model.MUTATION_ID = this.MUTATION_ID;
            }

            identifier = this._gI_(model, this._filters_);

            if (identifier !== undefined) {
                out = this.__insert__(model, add_list, identifier);
                this.__linksInsert__(model);
            }
        }

        return out;
    }

    delete(term, from_root = false) {
        if (!from_root)
            return this._deferUpdateToRoot_(term).remove(term);
        else
            this.remove(term);
    }

    /**
        Removes an item from the container. 
    */
    remove(term, from_root = false, __FROM_SCOPE__ = false) {

        if (!from_root)
            return this._deferUpdateToRoot_(term).remove(term, true);

        //term = this.getHook("term", term);

        if (!__FROM_SCOPE__ && this.scope) {

            if (!term)
                return this.scope.remove(this._filters_);
            else
                return this.scope.remove(term);
        }

        let out_container = [];

        if (!term)
            this.__removeAll__();

        else {

            let terms = (Array.isArray(term)) ? term : [term];

            //Need to convert terms into a form that will work for the identifier type
            terms = terms.map(t => (t instanceof ModelBase) ? t : this.validator.parse(t));

            this.__remove__(terms, out_container);
        }

        if (out_container.length > 0) {
            if (this.par)
                this.par.scheduleUpdate(this.prop_name);


            if (out_container && out_container.length > 0) {
                this.updateViewsRemoved(out_container);
                this.scheduleUpdate();
            }
        }

        return out_container;
    }

    /**
        Removes a ModelContainerBase from list of linked containers. 

        @param {ModelContainerBase} container - The ModelContainerBase instance to remove from the set of linked containers. Must be a member of the linked containers. 
    */
    __unlink__(container) {

        if (container instanceof ModelContainerBase && container.scope == this) {

            if (container == this.first_link)
                this.first_link = container.next;

            if (container.next)
                container.next.prev = container.prev;

            if (container.prev)
                container.prev.next = container.next;

            container.scope = null;
        }
    }

    /**
        Adds a container to the list of tracked containers. 

        @param {ModelContainerBase} container - The ModelContainerBase instance to add the set of linked containers.
    */
    __link__(container) {
        if (container instanceof ModelContainerBase && !container.scope) {

            container.scope = this;

            container.next = this.first_link;

            if (this.first_link)
                this.first_link.prev = container;

            this.first_link = container;

            container.pin = ((container) => {
                let id = setTimeout(() => {
                    container.__unlink__();
                }, 50);

                return () => {
                    clearTimeout(id);
                    if (!container.scope)
                        console.warn("failed to clear the destruction of container in time!");
                };
            })(container);
        }
    }

    /**
     * Remove items from linked ModelContainers according to the terms provided.
     * @param      {Array}  terms   Array of terms.
     * @private
     */
    __linksRemove__(item) {
        let a = this.first_link;
        while (a) {
            for (let i = 0; i < item.length; i++)
                if (a._gI_(item[i], a._filters_)) {
                    a.scheduleUpdate();
                    a.__linksRemove__(item);
                    break;
                }

            a = a.next;
        }
    }

    /**
     * Add items to linked ModelContainers.
     * @param      {Model}  item   Item to add.
     * @private
     */
    __linksInsert__(item) {
        let a = this.first_link;
        while (a) {
            if (a._gI_(item, a._filters_))
                a.scheduleUpdate();
            a = a.next;
        }
    }

    /**
        Removes any items in the ModelConatiner not included in the array "items", and adds any item in `items` not already in the ModelContainerBase.
        @param {Array} items - An array of identifiable Models or objects. 
    */
    cull(items) {

        let hash_table = {};
        let existing_items = __getAll__([], true);

        let loadHash = (item) => {
            if (item instanceof Array)
                return item.forEach((e) => loadHash(e));

            let identifier = this._gI_(item);

            if (identifier !== undefined)
                hash_table[identifier] = item;

        };

        loadHash(items);

        for (let i = 0; i < existing_items.lenth; i++) {
            let e_item = existing_items[i];
            if (!existing_items[this._gI_(e_item)])
                this.__remove__(e_item);
        }

        this.insert(items);
    }

    __setFilters__(term) {

        if (!this._filters_) this._filters_ = [];

        if (Array.isArray(term))
            this._filters_ = this._filters_.concat(term.map(t => this.validator.parse(t)));
        else
            this._filters_.push(this.validator.parse(term));

    }

    /**
        Returns true if the identifier matches a predefined filter pattern, which is evaluated by this.parser. If a 
        parser was not present the ModelContainers schema, then the function will return true upon every evaluation.
    */
    __filterIdentifier__(identifier, filters) {
        if (filters.length > 0) {
            return this.validator.filter(identifier, filters);
        }
        return true;
    }

    _gIf_(item, term) {
        let t = this._gI_(item, this.filters);
    }

    /**
        Returns the Identifier property value if it exists in the item. If an array value for filters is passed, then undefined is returned if the identifier value does not pass filtering criteria.
        @param {(Object|Model)} item
        @param {Array} filters - An array of filter terms to test whether the identifier meets the criteria to be handled by the ModelContainerBase.
    */
    _gI_(item, filters = null) {

        let identifier;

        if (typeof(item) == "object" && this.key)
            identifier = item[this.key];
        else
            identifier = item;

        if (identifier && this.validator)
            identifier = this.validator.parse(identifier);

        if (filters && identifier)
            return (this.__filterIdentifier__(identifier, filters)) ? identifier : undefined;

        return identifier;
    }

    /** 
        OVERRIDE SECTION ********************************************************************
        
        All of these functions should be overridden by inheriting classes
    */

    __insert__() { return this; }

    __get__(item, __return_data__) { return __return_data__; }

    __getAll__(__return_data__) { return __return_data__; }

    __removeAll__() { return []; }

    __remove__() { return []; }

    clone() {
        let clone = super.clone();
        clone.key = this.key;
        clone.model = this.model;
        clone.validator = this.validator;
        clone.first_link = this.first_link;
        return clone;
    }

    // END OVERRIDE *************************************************************************
}

const proto = ModelContainerBase.prototype;
_SealedProperty_(proto, "model", null);
_SealedProperty_(proto, "key", "");
_SealedProperty_(proto, "validator", null);

class MultiIndexedContainer extends ModelContainerBase {

    constructor(data = [], root = null, address = []) {

        super(root, address);

        this.secondary_indexes = {};
        this.primary_index = null;
        this.primary_key = "";

        if (data[0] && data[0].key) {

            let key = data[0].key;

            if (data[0].model)
                this.model = data[0].model;

            if (Array.isArray(key))
                key.forEach((k) => (this.addKey(k)));

            data = data.slice(1);
        }

        if (Array.isArray(data) && data.length > 0)
            this.insert(data);
    }

    /**
        Returns the length of the first index in this container. 
    */
    get length() { return this.primary_index.length; }

    /**
        Insert a new ModelContainerBase into the index through the key.  
    */
    addKey(key) {
        let name = key.name;

        let container = new MultiIndexedContainer.array([{ key, model: this.model }]);

        if (this.primary_index) {
            this.secondary_indexes[name] = container;
            this.secondary_indexes[name].insert(this.primary_index.__getAll__());
        } else {
            this.primary_key = name;
            this.primary_index = container;
        }
    }

    get(item, __return_data__) {
        
        item = this.getHook("query", item);

        if (item) {
            for (let name in item) {
                if (name == this.primary_key)
                    return this.primary_index.get(item[name], __return_data__);

                else if (this.secondary_indexes[name])
                    return this.secondary_indexes[name].get(item[name], __return_data__);

            }
        } else
            return this.primary_index.get(null, __return_data__);
    }

    __insert__(model, add_list, identifier) {

        let out = false;

        model.par = this;

        if ((out = this.primary_index.insert(model))) {
            for (let name in this.secondary_indexes) {

                let index = this.secondary_indexes[name];

                index.insert(model);
            }
        }

        if (out)
            this.updateViews(this.primary_index.get());

        return out;
    }
    /**
        @private 
    */
    __remove__(term, out_container) {

        let out = false;

        if ((out = this.primary_index.__remove__(term, out_container))) {

            for (let name in this.secondary_indexes) {

                let index = this.secondary_indexes[name];

                index.__remove__(out_container);
            }
        }

        return out;
    }

    __removeAll__() {

        let out = false;

        out = this.primary_index.__removeAll__();

        for (let name in this.secondary_indexes) {

            let index = this.secondary_indexes[name];

            if (index.__removeAll__())
                out = true;
        }

        return out;
    }


    /**
        Overrides Model container default _gI_ to force item to pass.
        @private 
    */
    _gI_(item, filters = null) {
        return true;
    }

    toJSON() {
        return this.primary_index.toJSON();
    }

    clone() {
        let clone = super.clone();
        clone.secondary_indexes = this.secondary_indexes;
        clone.primary_index = this.primary_index;
        return clone;
    }
}

class NumberSchemeConstructor extends SchemeConstructor {

    constructor() {

        super();

        this.start_value = 0;
    }

    parse(value) {

        return parseFloat(value);
    }

    verify(value, result) {

        result.valid = true;

        if (value == NaN || value == undefined) {
            result.valid = false;
            result.reason = "Invalid number type.";
        }
    }

    filter(identifier, filters) {

        for (let i = 0, l = filters.length; i < l; i++)
            if (identifier == filters[i])
                return true;

        return false;
    }
}

let number$1 = new NumberSchemeConstructor();

let scape_date = new Date();
scape_date.setHours(0);
scape_date.setMilliseconds(0);
scape_date.setSeconds(0);
scape_date.setTime(0);

class DateSchemeConstructor extends NumberSchemeConstructor {

    parse(value) {

        if(!value)
            return undefined;

        if(value instanceof Date)
            return value.valueOf();

        if (!isNaN(value))
            return parseInt(value);

        let date = (new Date(value)).valueOf();

        if(date) return date;

        let lex = whind$1(value);

        let year = parseInt(lex.text);

        if (year) {

            scape_date.setHours(0);
            scape_date.setMilliseconds(0);
            scape_date.setSeconds(0);
            scape_date.setTime(0);

            lex.next();
            lex.next();
            let month = parseInt(lex.text) - 1;
            lex.next();
            lex.next();
            let day = parseInt(lex.text);
            scape_date.setFullYear(year);
            scape_date.setDate(day);
            scape_date.setMonth(month);

            lex.next();

            if (lex.pos > -1) {

                let hours = parseInt(lex.text);
                lex.next();
                lex.next();
                let minutes = parseInt(lex.text);

                scape_date.setHours(hours);
                scape_date.setMinutes(minutes);
            }



            return scape_date.valueOf();
        } 
    }

    /**
     
     */
    verify(value, result) {

        value = this.parse(value);

        super.verify(value, result);
    }

    filter(identifier, filters) {

        if (filters.length > 1) {

            for (let i = 0, l = filters.length - 1; i < l; i += 2) {
                let start = filters[i];
                let end = filters[i + 1];

                if (start <= identifier && identifier <= end) {
                    return true;
                }
            }
        }

        return false;
    }

    string(value) {
        
        return (new Date(value)) + "";
    }
}

let date = new DateSchemeConstructor();

class TimeSchemeConstructor extends NumberSchemeConstructor {

    parse(value) {
        if (!isNaN(value))
            return parseFloat(value);
        try {
            var hour = parseInt(value.split(":")[0]);
            var min = parseInt(value.split(":")[1].split(" ")[0]);
            if (value.split(":")[1].split(" ")[1])
                half = (value.split(":")[1].split(" ")[1].toLowerCase() == "pm");
            else
                half = 0;
        } catch (e) {
            var hour = 0;
            var min = 0;
            var half = 0;
        }
        
        return parseFloat((hour + ((half) ? 12 : 0) + (min / 60)));
    }

    verify(value, result) {
        this.parse(value);
        super.verify(value, result);
    }

    filter(identifier, filters) {
        return true
    }

    string(value) {
        return (new Date(value)) + "";
    }
}

let time = new TimeSchemeConstructor();

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
            result.reason = " value is undefined";
        } else if (!value instanceof String) {
            result.valid = false;
            result.reason = " value is not a string.";
        }
    }

    filter(identifier, filters) {

        for (let i = 0, l = filters.length; i < l; i++)
            if (identifier.match(filters[i] + ""))
                return true;

        return false;
    }
}

let string$1 = new StringSchemeConstructor();

class BoolSchemeConstructor extends SchemeConstructor {

    constructor() {

        super();

        this.start_value = false;
    }

    parse(value) {

        return (value) ? true : false;
    }

    verify(value, result) {

        result.valid = true;

        if (value === undefined) {
            result.valid = false;
            result.reason = " value is undefined";
        } else if (!value instanceof Boolean) {
            result.valid = false;
            result.reason = " value is not a Boolean.";
        }
    }

    filter(identifier, filters) {

        if (value instanceof Boolean)
            return true;

        return false;
    }
}

let bool = new BoolSchemeConstructor();

let schemes = { date, string: string$1, number: number$1, bool, time };


/**
 * Used by Models to ensure conformance to a predefined data structure. Becomes immutable once created.
 * @param {Object} data - An Object of `key`:`value` pairs used to define the Scheme. `value`s must be instances of or SchemeConstructor or classes that extend SchemeConstructor.
 * @readonly
 */
class Schema {}

class BTreeModelContainer extends ModelContainerBase {

    constructor(data = [], root = null, address = []) {

        super(root, address);

        this.validator = schemes.number;

        if (data[0] && data[0].key) {

            let key = data[0].key;

            if (typeof key == "object") {

                if (key.type)
                    this.validator = (key.type instanceof NumberSchemeConstructor) ? key.type : this.validator;

                if (key.name)
                    this.key = key.name;

                if (key.unique_key)
                    this.unique_key = key.unique_key;
            } else
                this.key = key;

            if (data[0].model)
                this.model = data[0].model;

            data = data.slice(1);
        }

        this.min = 10;
        this.max = 20;
        this.size = 0;
        this.btree = null;

        if (Array.isArray(data) && data.length > 0)
            this.insert(data);
    }

    destroy() {
        if (this.btree)
            this.btree.destroy();

        super.destroy();
    }

    get length() {
        return this.size;
    }

    __insert__(model, add_list, identifier) {

        let result = {
            added: false
        };

        if (!this.btree)
            this.btree = new BtreeNode(true);

        this.btree = this.btree.insert(identifier, model, this.unique_key, this.max, true, result).newnode;

        if (add_list) add_list.push(model);

        if (result.added) {
            this.size++;
            this.__updateLinks__();
        }

        return result.added;
    }

    __get__(terms, __return_data__) {

        if(!this.btree) return __return_data__;

        if (__return_data__ instanceof BTreeModelContainer){
            __return_data__.btree = this.btree;
            return __return_data__;
        }

        let out = [];

        for (let i = 0, l = terms.length; i < l; i++) {
            let b, a = terms[i];

            if (a instanceof ModelBase)
                continue;

            if (i < l-1 && !(terms[i + 1] instanceof ModelBase)) {
                b = terms[++i];
            } else
                b = a;

            this.btree.get(a, b, out);
        }

        if (this._filters_) {
            for (let i = 0, l = out.length; i < l; i++) {
                let model = out[i];

                if (this._gI_(model, this._filters_))
                    __return_data__.push(model);
            }
        } else
            for (let i = 0, l = out.length; i < l; i++)
                __return_data__.push(out[i]);



        return __return_data__;
    }

    __remove__(terms, out_container = []) {

        if(!this.btree) return false;

        let result = 0;

        for (let i = 0, l = terms.length; i < l; i++) {
            let b, a = terms[i];

            if ((a instanceof ModelBase)) {
                let v = this._gI_(a);
                let o = this.btree.remove(v, v, this.unique_key, this.unique_key ? a[this.unique_key] : "", true, this.min, out_container);
                result += o.out;
                this.btree = o.out_node;
                continue;
            }

            if (i < l-1 && !(terms[i + 1] instanceof ModelBase)) {
                b = terms[++i];
            } else
                b = a;

            let o = this.btree.remove(a, b, "", "", true, this.min, out_container);
            result += o.out;
            this.btree = o.out_node;
        }

        if (result > 0) {
            this.size -= result;
            this.__updateLinks__();
            this.__linksRemove__(out_container);
        }


        return result !== 0;
    }

    __updateLinks__() {
        let a = this.first_link;
        while (a) {
            a.btree = this.btree;
            a = a.next;
        }
    }

    __getAll__(__return_data__) {

        if (this._filters_) {
            this.__get__(this._filters_, __return_data__);
        } else if (this.btree)
            this.btree.get(-Infinity, Infinity, __return_data__);

        return __return_data__;
    }

    __removeAll__() {
        if (this.btree)
            this.btree.destroy();
        this.btree = null;
    }

    toJSON() {
        let out_data = [];

        if (this.btree) {

            this.btree.get(this.min, this.max, out_data);
        }

        return out_data;
    }

    clone() {
        let clone = super.clone();
        clone.btree = this.btree;
        return clone;
    }
}

class BtreeNode {
    constructor(IS_LEAF = false) {
        this.LEAF = IS_LEAF;
        this.nodes = [];
        this.keys = [];
        this.items = 0;
    }

    destroy() {

        this.nodes = null;
        this.keys = null;

        if (!this.LEAF) {
            for (let i = 0, l = this.nodes.length; i < l; i++)
                this.nodes[i].destroy();
        }

    }

    balanceInsert(max_size, IS_ROOT = false) {
        if (this.keys.length >= max_size) {
            //need to split this up!

            let newnode = new BtreeNode(this.LEAF);

            let split = (max_size >> 1) | 0;

            let key = this.keys[split];

            let left_keys = this.keys.slice(0, split);
            let left_nodes = this.nodes.slice(0, (this.LEAF) ? split : split + 1);

            let right_keys = this.keys.slice((this.LEAF) ? split : split + 1);
            let right_nodes = this.nodes.slice((this.LEAF) ? split : split + 1);

            newnode.keys = right_keys;
            newnode.nodes = right_nodes;

            this.keys = left_keys;
            this.nodes = left_nodes;

            if (IS_ROOT) {

                let root = new BtreeNode();

                root.keys.push(key);
                root.nodes.push(this, newnode);

                return {
                    newnode: root,
                    key: key
                };
            }

            return {
                newnode: newnode,
                key: key
            };
        }

        return {
            newnode: this,
            key: 0
        };
    }

    /**
        Inserts model into the tree, sorted by identifier. 
    */
    insert(identifier, model, unique_key, max_size, IS_ROOT = false, result) {

        let l = this.keys.length;

        if (!this.LEAF) {

            for (var i = 0; i < l; i++) {

                let key = this.keys[i];

                if (identifier < key) {
                    let node = this.nodes[i];

                    let o = node.insert(identifier, model, unique_key, max_size, false, result);
                    let keyr = o.key;
                    let newnode = o.newnode;

                    if (keyr == undefined) debugger

                    if (newnode != node) {
                        this.keys.splice(i, 0, keyr);
                        this.nodes.splice(i + 1, 0, newnode);
                    }

                    return this.balanceInsert(max_size, IS_ROOT);
                }
            }

            let node = this.nodes[i];

            let {
                newnode,
                key
            } = node.insert(identifier, model, unique_key, max_size, false, result);

            if (key == undefined) debugger

            if (newnode != node) {
                this.keys.push(key);
                this.nodes.push(newnode);
            }

            return this.balanceInsert(max_size, IS_ROOT);

        } else {

            for (let i = 0, l = this.keys.length; i < l; i++) {
                let key = this.keys[i];

                if (identifier == key) {

                    if (unique_key) {
                        if (this.nodes[i][unique_key] !== model[unique_key]) { continue; }
                    } else
                        this.nodes[i].set(model);
                    

                    result.added = false;

                    return {
                        newnode: this,
                        key: identifier
                    };
                } else if (identifier < key) {

                    this.keys.splice(i, 0, identifier);
                    this.nodes.splice(i, 0, model);

                    result.added = true;

                    return this.balanceInsert(max_size, IS_ROOT);
                }
            }

            this.keys.push(identifier);
            this.nodes.push(model);

            result.added = true;

            return this.balanceInsert(max_size, IS_ROOT);
        }

        return {
            newnode: this,
            key: identifier,
        };
    }

    balanceRemove(index, min_size) {
        let left = this.nodes[index - 1];
        let right = this.nodes[index + 1];
        let node = this.nodes[index];

        //Left rotate
        if (left && left.keys.length > min_size) {

            let lk = left.keys.length;
            let ln = left.nodes.length;

            node.keys.unshift((node.LEAF) ? left.keys[lk - 1] : this.keys[index - 1]);
            node.nodes.unshift(left.nodes[ln - 1]);

            this.keys[index - 1] = left.keys[lk - 1];

            left.keys.length = lk - 1;
            left.nodes.length = ln - 1;

            return false;
        } else
            //Right rotate
            if (right && right.keys.length > min_size) {

                node.keys.push((node.LEAF) ? right.keys[0] : this.keys[index]);
                node.nodes.push(right.nodes[0]);

                right.keys.splice(0, 1);
                right.nodes.splice(0, 1);

                this.keys[index] = (node.LEAF) ? right.keys[1] : right.keys[0];

                return false;

            } else {

                //Left or Right Merge
                if (!left) {
                    index++;
                    left = node;
                    node = right;
                }

                let key = this.keys[index - 1];
                this.keys.splice(index - 1, 1);
                this.nodes.splice(index, 1);

                left.nodes = left.nodes.concat(node.nodes);
                if (!left.LEAF) left.keys.push(key);
                left.keys = left.keys.concat(node.keys);


                if (left.LEAF)
                    for (let i = 0; i < left.keys.length; i++)
                        if (left.keys[i] != left.nodes[i].id)
                            {/*debugger*/}

                return true;
            }

    }

    remove(start, end, unique_key, unique_id, IS_ROOT = false, min_size, out_container) {
        let l = this.keys.length,
            out = 0,
            out_node = this;

        if (!this.LEAF) {

            for (var i = 0; i < l; i++) {

                let key = this.keys[i];

                if (start <= key)
                    out += this.nodes[i].remove(start, end, unique_key, unique_id, false, min_size, out_container).out;
            }

            out += this.nodes[i].remove(start, end, unique_key, unique_id, false, min_size, out_container).out;

            for (var i = 0; i < this.nodes.length; i++) {
                if (this.nodes[i].keys.length < min_size) {
                    if (this.balanceRemove(i, min_size)) {
                        l--;
                        i--;
                    }
                }
            }

            if (this.nodes.length == 1)
                out_node = this.nodes[0];

        } else {

            for (let i = 0, l = this.keys.length; i < l; i++) {
                let key = this.keys[i];

                if (key <= end && key >= start) {
                    if (unique_key, unique_id && this.nodes[i][unique_key] !== unique_id) continue;
                    out_container.push(this.nodes[i]);
                    out++;
                    this.keys.splice(i, 1);
                    this.nodes.splice(i, 1);
                    l--;
                    i--;
                }
            }
        }

        return {
            out_node,
            out
        };
    }

    get(start, end, out_container) {

        if (!start || !end)
            return false;

        if (!this.LEAF) {

            for (var i = 0, l = this.keys.length; i < l; i++) {

                let key = this.keys[i];

                if (start <= key)
                    this.nodes[i].get(start, end, out_container);
            }

            this.nodes[i].get(start, end, out_container);

        } else {

            let out = false;

            for (let i = 0, l = this.keys.length; i < l; i++) {
                let key = this.keys[i];

                if (key <= end && key >= start)
                    out_container.push(this.nodes[i]);
            }
        }
    }
}

MultiIndexedContainer.btree = BTreeModelContainer;

const ArrayContainerProxySettings = {

    set: function(obj, prop, val) {

        if (prop in obj && obj[prop] == val)
            return true;

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

        term[obj.key] = prop;

        return obj.get(prop, [])[0];
    }
};

/**
    Stores models in random order inside an internal array object. 
 */

class ArrayModelContainer extends ModelContainerBase {

    constructor(data = [], root = null, address = []) {

        super(root, address);

        if (data[0] && data[0].key) {

            let key = data[0].key;

            /* Custom selection of container types happens here. 
             * If there are multiple keys present, then a MultiIndexedContainer is used.
             * If the value of the key is a Numerical type, then a BtreeModelContainer is used.
             **/
            if (typeof(key) == "object") {

                if (Array.isArray(key))
                    return new MultiIndexedContainer(data, root, address);

                if (key.type) {
                    if (key.type instanceof NumberSchemeConstructor)
                        return new BTreeModelContainer(data, root, address);
                    this.validator = (key.type instanceof SchemeConstructor) ? key.type : this.validator;
                }

                if (key.name)
                    this.key = key.name;
            } else
                this.key = key;

            if (data[0].model)
                this.model = data[0].model;

            data = data.slice(1);
        }

        this.data = [];

        if (Array.isArray(data) && data.length > 0)
            this.insert(data, true);
    }

    destroy() {

        this.data = null;

        super.destroy();
    }

    get proxy() { return new Proxy(this, ArrayContainerProxySettings); }

    set proxy(v) {}

    get length() { return this.data.length; }

    __defaultReturn__(USE_ARRAY) {

        if (USE_ARRAY) return new MCArray();

        let n = this.clone();

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

                obj.set(model, true);

                this.data[i] = obj;

                return false; //Model not added to Container. Model just updated.
            }
        }

        this.data.push(model);

        model.address = this.address.slice();
        model.address.push(this.data.length - 1);

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
            return this;

        let i = address[index++];

        let model_prop = this.data[i];

        if (model_prop.MUTATION_ID !== this.MUTATION_ID) {
            model_prop = model_prop.clone();
            model_prop.MUTATION_ID = this.MUTATION_ID;
        }

        this.data[i] = model_prop;

        return model_prop._setThroughRoot_(data, address, index, len, model_prop.MUTATION_ID);
    }

    __remove__(term, out_container) {

        let result = false;

        term = term.map(t => (t instanceof ModelBase) ? this._gI_(t) : t);
        
        for (var i = 0, l = this.data.length; i < l; i++) {
            var obj = this.data[i];

            if (this._gI_(obj, term)) {

                result = true;

                this.data.splice(i, 1);

                l--;
                i--;

                out_container.push(obj);

                break;
            }
        }

        return result;
    }

    toJSON() { return this.data; }

    clone() {
        let clone = super.clone();
        clone.data = this.data.slice();
        return clone;
    }
}

MultiIndexedContainer.array = ArrayModelContainer;

Object.freeze(ArrayModelContainer);

class Model extends ModelBase {

    constructor(data, root = null, address = []) {

        super(root, address);

        _SealedProperty_(this, "prop_array", []);
        _SealedProperty_(this, "prop_offset", 0);
        _SealedProperty_(this, "look_up", {});

        if (data)
            for (let name in data)
                this.createProp(name, data[name]);

    }

    get proxy() { return this;}

    set(data, FROM_ROOT = false) {

        if (!FROM_ROOT)
            return this._deferUpdateToRoot_(data).set(data, true);

        if (!data)
            return false;

        let out = false;

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

                    if (prop.set(data[prop_name], true)){
                        this.scheduleUpdate(prop_name);
                        out = true;
                    }

                } else if (prop !== data[prop_name]) {
                    this.prop_array[index] = data[prop_name];
                     this.scheduleUpdate(prop_name);
                     out = true;
                }
            } else{
                this.createProp(prop_name, data[prop_name]);
                out = true;
            }
        }

        return out;
    }
    createProp(name, value) {

        let index = this.prop_offset++;

        this.look_up[name] = index;
        var address = this.address.slice();
        address.push(index);

        switch (typeof(value)) {

            case "object":
                if (Array.isArray(value))
                    this.prop_array.push(new ArrayModelContainer(value, this.root, address));
                else {
                    if (value instanceof ModelBase) {
                        value.address = address;
                        this.prop_array.push(value);
                    } else
                        this.prop_array.push(new Model(value, this.root, address));
                }

                this.prop_array[index].prop_name = name;
                this.prop_array[index].par = this;

                Object.defineProperty(this, name, {

                    configurable: false,

                    enumerable: true,

                    get: function() { return this.getHook(name, this.prop_array[index]); },

                    set: (v) => {}
                });

                break;

            case "function":

                let object = new value(null, this.root, address);

                object.par = this;
                object.prop_name = name;

                this.prop_array.push(object);

                Object.defineProperty(this, name, {

                    configurable: false,

                    enumerable: true,

                    get: function() { return this.getHook(name, this.prop_array[index]); },

                    set: (v) => {}
                });

                break;

            default:
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

    toJSON(HOST = true){
        let data = {};

        for(let name in this.look_up){
            let index = this.look_up[name];
            let prop = this.prop_array[index];

            if(prop){
                if(prop instanceof ModelBase)
                    data[name] = prop.toJSON(false);
                else
                    data[name] = prop;
            }
        }

        return HOST ? JSON.stringify(data) : data;    
    }
}

ModelContainerBase.prototype.model = Model;

class Store {
    constructor(data) {

        this.history = [{ model: new Model(data, this), actions: [{ d: data, a: null }] }];
        this.MUTATION_ID = 0;
    }

    seal() { this.MUTATION_ID++; }

    getHistory(index) { return (this.history[index]) ? this.history[index].model : null; }

    get current() { return this.history[this.history.length - 1].model; }

    set current(v) {}

    get(data){
        return this.current.get(data);
    }

    set(data){
        return this.current.set(data);
    }

    _getParentMutationID_() { return this.MUTATION_ID; }

    _setThroughRoot_(data, address, index, len_minus_1, m_id) {

        let model_prop = this.current;

        if (m_id !== this.MUTATION_ID) {

            if (m_id > this.MUTATION_ID)
                this.MUTATION_ID = this.MUTATION_ID + 1;
            else
                this.MUTATION_ID = this.MUTATION_ID;

            model_prop = model_prop.clone();

            model_prop.MUTATION_ID = this.MUTATION_ID;

            this.history.push({ model: model_prop, actions: [] });
        }

        if (data)
            this.history[this.history.length - 1].actions.push({ d: data, a: address });

        return model_prop._setThroughRoot_(data, address, index, len_minus_1, this.MUTATION_ID);
    }
}

//import { CustomComponent } from "../page/component"

let CachedPresets = null;
/**
 // There are a number of configurable options and global objects that can be passed to wick to be used throughout the PWA. The instances of the Presets class are objects that hosts all these global properties. 
 * 
 // Presets are designed to be created once, upfront, and not changed once defined. This reinforces a holistic design for a PWA should have in terms of the types of Schemas, global Models, and overall form the PWA takes, e.g whether to use the ShadowDOM or not.
 * 
 // Note: *This object is made immutable once created. There may only be one instance of Presets*
 * 
 */
class Presets {
    constructor(preset_options = {}) {

        if(Presets.global.v)
            return Presets.global.v;

        this.store = (preset_options.store instanceof Store) ? preset_options.store : null;

        /**
         * {Object} Store for optional parameters used in the app
         */
        this.options = {
            USE_SECURE: true,
            USE_SHADOW: false,
        };

        //Declaring the properties upfront to give the VM a chance to build an appropriate virtual class.
        this.components = {};

        this.custom_components = {};

        /** 
         * Store of user defined CustomScopePackage factories that can be used in place of the components built by the Wick templating system. Accepts any class extending the CustomComponent class. Adds these classes from preset_options.custom_scopes or preset_options.components. 
         * 
         * In routing mode, a HTML `<component>` tag whose first classname matches a property name of a member of presets.custom_scopes will be assigned to an instance of that member.
         * 
         * ### Example
         * In HTML:
         * ```html
         * <component class="my_scope class_style">
         * 
         * ```
         * In JavaScript:
         * ```javascript
         * let MyScope = CustomScopePackage( ele =>{
         *      ele.append
         * }, {});
         * 
         * preset_options.custom_componets = {
         *      my_scope : MyScope
         * }
         * ```
         * @instance
         * @readonly
         */
        this.custom_scopes = {};

        /**
         * { Object } Store of user defined classes that extend the Model or Model classes. `<w-scope>` tags in templates that have a value set for the  `schema` attribute, e.g. `<w-s schema="my_favorite_model_type">...</w-s>`, will be bound to a new instance of the class in presets.schema whose property name matches the "schema" attribute.
         * 
         * Assign classes that extend Model or SchemedModel to preset_options.schemas to have them available to Wick.
         * 
         * In JavaScript:
         * ```javascript
         * class MyFavoriteModelType extends Model {};
         * preset_options.custom_componets = {
         *      my_favorite_model_type : MyFavoriteModelType
         * }
         * ```
         * note: presets.schema.any is always assigned to the Model class.
         * @instance
         * @readonly
         */
        this.schemas = { any: Model };

        /**
         * { Object } Store of user defined Model instances that serve as global models, which are available to the whole application. Multiple Scopes will be able to _bind_ to the Models. `<w-scope>` tags in templates that have a value set for the  `model` attribute, e.g. `<w-s model="my_global_model">...</w-s>`, will be bound to the model in presets .model whose property name matches the "model" attribute.
         * 
         * Assign instances of Model or Model or any class that extends these to preset_options.models to have them used by Wick.
         * 
         * In JavaScript:
         * ```javascript
         * const MyGlobalModel = new Model({global_data: "This is global!"});
         * preset_options.custom_componets = {
         *      my_global_model : MyGlobalModel
         * }
         * ```
         * @instance
         * @readonly
         */
        this.models = {};

        /**
         * Configured by `preset_options.USE_SHADOW`. If set to true, and if the browser supports it, compiled and rendered template elements will be bound to a `<component>` shadow DOM, instead being appended as a child node.
         * @instance
         * @readonly
         */
        this.USE_SHADOW = false;

        /**
         * { Object } Contains all user defined HTMLElement templates 
         */
        this.templates = {};

        /**
         * Custom objects that can be used throughout component scripts. User defined. 
         */
        this.custom = preset_options.custom || {};

        let c = preset_options.options;
        if (c)
            for (let cn in c)
                this.options[cn] = c[cn];


        c = preset_options.components;
        if (c)
            for (let cn in c)
                this.components[cn] = c[cn];

        c = preset_options.custom_scopes;
        if (c)
            for (let cn in c)
                if (cn instanceof CustomComponent)
                    this.custom_scopes[cn] = c[cn];

        c = preset_options.custom_components;
        if (c)
            for (let cn in c)
                this.custom_components[cn] = c[cn];

        c = preset_options.models;

        if (c)
            for (let cn in c)
                if (c[cn] instanceof ModelBase)
                    this.models[cn] = c[cn];

        c = preset_options.schemas;
        if (c)
            for (let cn in c)
                if (ModelBase.isPrototypeOf(c[cn]))
                    this.schemas[cn] = c[cn];

        this.options.USE_SHADOW = (this.options.USE_SHADOW) ? (DOC.head.createShadowRoot || DOC.head.attachShadow) : false;

        this.url = URL;

        Object.freeze(this.options);
        Object.freeze(this.custom_scopes);
        Object.freeze(this.schemas);
        Object.freeze(this.models);

        CachedPresets = this;
    }

    processLink(link) {}

    /**
        Copies values of the Presets object into a generic object. The new object is not frozen.
    */
    copy() {
        let obj = {};

        for (let a in this) {
            if (a == "components")
                obj.components = this.components;
            else if (typeof(this[a]) == "object")
                obj[a] = Object.assign({}, this[a]);
            else if (typeof(this[a]) == "array")
                obj[a] = this[a].slice();
            else
                obj[a] = this[a];
        }

        obj.processLink = this.processLink.bind(this);

        return obj;
    }
}

Presets.global = {get v(){return CachedPresets}, set v(e){}};

let fn = {}; const 
/************** Maps **************/

    /* Symbols To Inject into the Lexer */
    symbols = ["</","((","))",")(","\"","'","{","}","(",")","[","]",".","...",";",",","<",">","<=",">=","==","!=","===","!==","+","-","*","%","/","**","++","--","<<",">>",">>>","&","|","^","!","~","&&","||","?",":","+=","-=","*=","%=","/=","**=","<<=",">>=",">>>=","&=","|=","^=","=>"],

    /* Goto lookup maps */
    gt0 = [0,-1,1,3,109,108,-31,2,4,5,6,7,23,8,112,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-2,113,117,-2,65,115,-7,29,89,-4,87,66,111,-7,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt1 = [0,-2,122,109,108,-34,121,7,23,8,112,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-2,113,117,-2,65,115,-7,29,89,-4,87,66,111,-7,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt2 = [0,-2,122,109,108,-33,123,6,7,23,8,112,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-2,113,117,-2,65,115,-7,29,89,-4,87,66,111,-7,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt3 = [0,-130,127],
gt4 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-17,167,168,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt5 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-17,176,168,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt6 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-17,177,168,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt7 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-17,178,168,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt8 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-17,179,168,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt9 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-17,180,168,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt10 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-17,181,168,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt11 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-17,182,168,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt12 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-17,183,168,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt13 = [0,-112,185],
gt14 = [0,-112,190],
gt15 = [0,-78,65,174,-14,66,175,-9,191,192,59,60,85,-4,58,170,-9,64,-20,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt16 = [0,-169,195,196],
gt17 = [0,-169,200,196],
gt18 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,203,202,206,205,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt19 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,210,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt20 = [0,-112,214],
gt21 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-17,215,168,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt22 = [0,-64,217],
gt23 = [0,-72,219,220,-73,222,224,225,-15,221,223,69],
gt24 = [0,-2,122,109,108,-35,229,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt25 = [0,-163,235,-2,236,69],
gt26 = [0,-163,238,-2,236,69],
gt27 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,240,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt28 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,242,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt29 = [0,-46,243],
gt30 = [0,-5,246,-5,245],
gt31 = [0,-96,269,270,-67,268,223,69],
gt32 = [0,-165,274,223,69],
gt33 = [0,-76,275,276,-69,278,224,225,-15,277,223,69],
gt34 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,280,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt35 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,281,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt36 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,282,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt37 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,283,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt38 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-7,284,33,34,35,36,37,38,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt39 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-8,285,34,35,36,37,38,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt40 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-9,286,35,36,37,38,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt41 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-10,287,36,37,38,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt42 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-11,288,37,38,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt43 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-12,289,38,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt44 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-12,290,38,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt45 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-12,291,38,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt46 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-12,292,38,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt47 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-13,293,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt48 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-13,294,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt49 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-13,295,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt50 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-13,296,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt51 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-13,297,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt52 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-13,298,39,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt53 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-14,299,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt54 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-14,300,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt55 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-14,301,40,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt56 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-15,302,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt57 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-15,303,41,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt58 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-16,304,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt59 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-16,305,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt60 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-16,306,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt61 = [0,-78,65,174,-13,87,66,175,-8,169,54,56,59,60,85,55,86,-2,58,170,-9,64,-16,307,42,43,51,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt62 = [0,-101,314,-14,309,310,311,-1,316,317,318,312,-35,320,321,-3,313,-1,172,319,78],
gt63 = [0,-167,325],
gt64 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,326,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt65 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-1,328,58,170,-9,64,-3,329,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt66 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,331,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt67 = [0,-167,332],
gt68 = [0,-112,333],
gt69 = [0,-170,336],
gt70 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-2,341,340,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt71 = [0,-127,343],
gt72 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,345,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt73 = [0,-147,349,224,225,-15,348,223,69],
gt74 = [0,-167,350],
gt75 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,351,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt76 = [0,-78,65,174,-7,29,89,352,-3,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,353,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt77 = [0,-2,122,109,108,-35,356,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-1,355,21,-3,22,12,-6,65,357,-7,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt78 = [0,-124,360],
gt79 = [0,-124,362],
gt80 = [0,-120,369,317,318,-27,364,365,-2,367,-1,368,-2,320,321,-4,370,223,319,78],
gt81 = [0,-127,372,-19,379,224,225,-2,374,376,-1,377,378,373,-7,370,223,69],
gt82 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,380,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt83 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,382,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt84 = [0,-51,388,-22,386,389,-2,65,174,-7,29,89,-4,87,66,175,-7,383,387,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt85 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,391,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt86 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,395,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt87 = [0,-67,397,398],
gt88 = [0,-7,401,402,403],
gt89 = [0,-7,407,402,403],
gt90 = [0,-7,408,402,403],
gt91 = [0,-96,410,270],
gt92 = [0,-98,412,414,415,416,-18,419,317,318,-36,320,321,-6,420,78],
gt93 = [0,-78,65,174,-13,87,66,175,-8,421,54,56,59,60,85,55,86,-2,58,170,-9,64,-20,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt94 = [0,-81,422,424,423,426,-62,379,224,225,-5,427,378,425,-7,370,223,69],
gt95 = [0,-124,431],
gt96 = [0,-124,432],
gt97 = [0,-124,436],
gt98 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,437,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt99 = [0,-119,438],
gt100 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,441,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt101 = [0,-120,442,317,318,-36,320,321,-6,420,78],
gt102 = [0,-120,443,317,318,-36,320,321,-6,420,78],
gt103 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,447,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt104 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-1,452,451,450,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt105 = [0,-2,122,109,108,-33,459,6,7,23,8,112,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-2,113,117,-2,65,115,-6,458,29,89,-4,87,66,111,-7,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt106 = [0,-73,460,-73,222,224,225,-15,221,223,69],
gt107 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,461,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt108 = [0,-165,465,223,69],
gt109 = [0,-124,467],
gt110 = [0,-147,379,224,225,-5,470,378,468,-7,370,223,69],
gt111 = [0,-147,475,224,225,-15,474,223,69],
gt112 = [0,-124,476],
gt113 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,481,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt114 = [0,-52,484,-19,483,220,-73,486,224,225,-15,485,223,69],
gt115 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,487,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt116 = [0,-52,493,-23,275,276,-69,495,224,225,-15,494,223,69],
gt117 = [0,-51,498,-23,499,-2,65,174,-13,87,66,175,-8,496,54,56,59,60,85,55,86,-2,58,170,-9,64,-20,171,-11,63,73,74,72,71,-1,62,-1,172,69,78],
gt118 = [0,-68,502],
gt119 = [0,-46,504],
gt120 = [0,-8,507,403],
gt121 = [0,-13,513,514],
gt122 = [0,-98,519,414,415,416,-18,419,317,318,-36,320,321,-6,420,78],
gt123 = [0,-100,522,416,-18,419,317,318,-36,320,321,-6,420,78],
gt124 = [0,-101,523,-18,419,317,318,-36,320,321,-6,420,78],
gt125 = [0,-81,526,424,423,426,-62,379,224,225,-5,427,378,425,-7,370,223,69],
gt126 = [0,-77,527,-69,278,224,225,-15,277,223,69],
gt127 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,528,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt128 = [0,-101,314,-15,530,311,-1,316,317,318,312,-35,320,321,-3,313,-1,172,319,78],
gt129 = [0,-80,531,532,424,423,426,-62,379,224,225,-5,427,378,425,-7,370,223,69],
gt130 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,533,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt131 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,538,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt132 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,540,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt133 = [0,-147,542,224,225,-15,541,223,69],
gt134 = [0,-120,369,317,318,-27,544,-3,546,-1,368,-2,320,321,-4,370,223,319,78],
gt135 = [0,-147,379,224,225,-5,547,378,-8,370,223,69],
gt136 = [0,-127,550,-19,379,224,225,-3,552,-1,377,378,551,-7,370,223,69],
gt137 = [0,-2,122,109,108,-35,553,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt138 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,554,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt139 = [0,-2,122,109,108,-35,555,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt140 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,556,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt141 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,559,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt142 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,565,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt143 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,567,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt144 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,568,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt145 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,569,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt146 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,570,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt147 = [0,-52,572,-94,574,224,225,-15,573,223,69],
gt148 = [0,-52,493,-94,574,224,225,-15,573,223,69],
gt149 = [0,-59,576],
gt150 = [0,-2,122,109,108,-35,578,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt151 = [0,-69,579,-77,581,224,225,-15,580,223,69],
gt152 = [0,-4,583,-1,582,-5,584,586,514,587,589,588],
gt153 = [0,-10,592,-4,595,589,588,-150,593],
gt154 = [0,-2,122,109,108,-31,600,4,5,6,7,23,8,112,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-2,113,117,-2,65,115,-7,29,89,-4,87,66,111,-7,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt155 = [0,-14,602],
gt156 = [0,-83,605,606,-62,379,224,225,-5,427,378,425,-7,370,223,69],
gt157 = [0,-84,611,-17,610,-44,379,224,225,-5,427,378,-8,370,223,69],
gt158 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,612,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt159 = [0,-147,379,224,225,-5,470,378,617,-7,370,223,69],
gt160 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,622,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt161 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,624,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt162 = [0,-2,122,109,108,-35,626,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt163 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,627,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt164 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,629,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt165 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,630,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt166 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,631,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt167 = [0,-2,122,109,108,-35,634,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt168 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,639,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt169 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,641,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt170 = [0,-60,643,645,644],
gt171 = [0,-4,651,-7,650,586,514,587,589,588],
gt172 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,652,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt173 = [0,-15,653,589,588,-151,195,196],
gt174 = [0,-2,122,109,108,-33,459,6,7,23,8,112,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-2,113,117,-2,65,115,-5,656,657,29,89,-4,87,66,111,-7,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt175 = [0,-2,122,109,108,-35,663,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt176 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,665,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt177 = [0,-2,122,109,108,-35,668,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt178 = [0,-2,122,109,108,-35,670,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt179 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,672,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt180 = [0,-2,122,109,108,-35,677,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt181 = [0,-2,122,109,108,-35,678,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt182 = [0,-2,122,109,108,-35,679,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt183 = [0,-2,122,109,108,-35,680,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt184 = [0,-2,122,109,108,-35,681,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt185 = [0,-2,122,109,108,-35,682,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt186 = [0,-78,65,174,-7,29,89,-4,87,66,175,-8,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,684,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt187 = [0,-61,688,686],
gt188 = [0,-60,689,645],
gt189 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,691,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt190 = [0,-46,693],
gt191 = [0,-11,694],
gt192 = [0,-2,122,109,108,-33,459,6,7,23,8,112,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-2,113,117,-2,65,115,-5,700,657,29,89,-4,87,66,111,-7,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt193 = [0,-2,122,109,108,-33,459,6,7,23,8,112,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-2,113,117,-2,65,115,-5,701,657,29,89,-4,87,66,111,-7,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt194 = [0,-2,122,109,108,-33,459,6,7,23,8,112,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-2,113,117,-2,65,115,-5,702,657,29,89,-4,87,66,111,-7,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt195 = [0,-2,122,109,108,-35,705,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt196 = [0,-2,122,109,108,-35,706,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt197 = [0,-2,122,109,108,-35,707,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt198 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,708,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt199 = [0,-2,122,109,108,-35,711,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt200 = [0,-2,122,109,108,-35,712,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt201 = [0,-2,122,109,108,-35,713,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt202 = [0,-2,122,109,108,-35,714,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt203 = [0,-2,122,109,108,-35,715,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt204 = [0,-2,122,109,108,-35,717,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt205 = [0,-61,718],
gt206 = [0,-61,688],
gt207 = [0,-2,122,109,108,-33,722,6,7,23,8,112,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-2,113,117,-2,65,115,-7,29,89,-4,87,66,111,-7,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt208 = [0,-78,65,174,-7,29,89,-4,87,66,175,-7,724,30,54,56,59,60,85,55,86,-2,58,170,-9,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,-1,62,90,207,69,78],
gt209 = [0,-2,122,109,108,-33,459,6,7,23,8,112,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-2,113,117,-2,65,115,-5,729,657,29,89,-4,87,66,111,-7,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt210 = [0,-2,122,109,108,-35,730,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt211 = [0,-2,122,109,108,-35,732,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt212 = [0,-2,122,109,108,-35,733,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt213 = [0,-2,122,109,108,-35,734,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt214 = [0,-2,122,109,108,-33,736,6,7,23,8,112,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-2,113,117,-2,65,115,-7,29,89,-4,87,66,111,-7,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],
gt215 = [0,-2,122,109,108,-35,739,23,-2,15,9,24,13,10,14,95,-2,16,17,18,20,19,96,-4,11,-2,21,-3,22,12,-6,65,-8,29,89,-4,87,66,-8,26,30,54,56,59,60,85,55,86,-2,58,-10,64,-3,27,-1,28,31,32,33,34,35,36,37,38,39,40,41,42,43,51,67,-11,63,73,74,72,71,91,62,90,68,69,78],

    // State action lookup maps
    sm0=[0,1,2,3,-1,0,-4,0,-4,4,5,6,-23,7,-1,8,-10,9,-3,10,-2,11,12,-2,13,14,15,16,-2,17,18,19,20,21,22,23,-2,24,-2,25,26,27,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm1=[0,44,-3,0,-4,0],
sm2=[0,45,-3,0,-4,0],
sm3=[0,45,-3,0,-4,0,-47,46],
sm4=[0,47,-3,0,-4,0,-8,47],
sm5=[0,48,2,3,-1,0,-4,0,-4,4,5,6,-1,48,-21,7,-1,8,-10,9,-3,10,-2,11,12,-2,13,14,15,16,-2,17,18,19,20,21,22,23,-2,24,-2,25,26,27,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm6=[0,49,49,49,-1,0,-4,0,-4,49,49,49,-1,49,-21,49,-1,49,-10,49,49,-2,49,49,-1,49,49,-2,49,49,49,49,-2,49,49,49,49,49,49,49,49,-1,49,-2,49,49,49,49,-2,49,-4,49,49,-2,49,-2,49,-28,49,49,-2,49,49,49,49,49,-1,49,49,49],
sm7=[0,50,50,50,-1,0,-4,0,-4,50,50,50,-1,50,-21,50,-1,50,-10,50,50,-2,50,50,-1,50,50,-2,50,50,50,50,-2,50,50,50,50,50,50,50,50,-1,50,-2,50,50,50,50,-2,50,-4,50,50,-2,50,-2,50,-28,50,50,-2,50,50,50,50,50,-1,50,50,50],
sm8=[0,51,51,51,-1,0,-4,0,-4,51,51,51,-1,51,-21,51,-1,51,-10,51,51,-2,51,51,-1,51,51,-1,51,51,51,51,51,-2,51,51,51,51,51,51,51,51,-1,51,-2,51,51,51,51,-2,51,-4,51,51,-2,51,-2,51,-28,51,51,-2,51,51,51,51,51,-1,51,51,51],
sm9=[0,52,52,52,-1,0,-4,0,-4,52,52,52,-1,52,-21,52,-1,52,-10,52,52,-2,52,52,-1,52,52,-1,52,52,52,52,52,-2,52,52,52,52,52,52,52,52,-1,52,-2,52,52,52,52,-2,52,-4,52,52,-2,52,-2,52,-28,52,52,-2,52,52,52,52,52,-1,52,52,52],
sm10=[0,-1,2,3,-1,0,-4,0,-4,4,5,6,-23,7,-1,8,-10,9,-3,10,-2,11,12,-2,13,14,15,16,-2,17,18,19,20,21,22,23,-2,24,-2,25,26,27,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm11=[0,-4,0,-4,0,-40,53,-6,54],
sm12=[0,-4,0,-4,0,-37,55,55,-1,55,-6,55,-4,55,-15,55,-16,55],
sm13=[0,-4,0,-4,0,-37,56,56,-1,56,-3,56,-2,56,-4,56,-15,56,-16,56],
sm14=[0,-4,0,-4,0,-4,57,-1,58,57,-1,57,-19,59,-7,57,57,-1,57,57,-2,57,-2,57,-4,57,-5,57,-9,57,-16,57,-5,60,61,62,63,64,65,66,67,68,69,70,71,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,-4,72],
sm15=[0,-4,0,-4,0,-37,73,73,-1,73,-3,73,-2,73,-4,73,-15,73,-16,73,-17,74,75],
sm16=[0,-4,0,-4,0,-37,76,76,-1,76,-3,76,-2,76,-4,76,-15,76,-16,76,-17,76,76,77],
sm17=[0,-4,0,-4,0,-37,78,78,-1,78,-3,78,-2,78,-4,78,-15,78,-16,78,-17,78,78,78,79],
sm18=[0,-4,0,-4,0,-37,80,80,-1,80,-3,80,-2,80,-4,80,-15,80,-16,80,-17,80,80,80,80,81],
sm19=[0,-4,0,-4,0,-37,82,82,-1,82,-3,82,-2,82,-4,82,-15,82,-16,82,-17,82,82,82,82,82,83],
sm20=[0,-4,0,-4,0,-37,84,84,-1,84,-3,84,-2,84,-4,84,-15,84,-16,84,-17,84,84,84,84,84,84,85,86,87,88],
sm21=[0,-4,0,-4,0,-4,89,-2,90,-29,91,91,-1,91,-3,91,-2,91,-4,91,-5,92,-9,91,-16,91,-17,91,91,91,91,91,91,91,91,91,91,93,94,95],
sm22=[0,-4,0,-4,0,-4,96,-2,96,-29,96,96,-1,96,-3,96,-2,96,-4,96,-5,96,-9,96,-16,96,-17,96,96,96,96,96,96,96,96,96,96,96,96,96,97,98,99],
sm23=[0,-4,0,-4,0,-4,100,-2,100,-29,100,100,-1,100,-3,100,-2,100,-4,100,-5,100,-9,100,-16,100,-17,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,101,102],
sm24=[0,-4,0,-4,0,-4,103,-2,103,-1,104,-27,103,103,-1,103,105,-2,103,-2,103,-4,103,-5,103,-9,103,-16,103,-17,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,103,106],
sm25=[0,-4,0,-4,0,-4,107,-2,107,-1,107,-27,107,107,-1,107,107,-2,107,-2,107,-4,107,-5,107,-9,107,-16,107,-17,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107,107],
sm26=[0,-4,0,-4,0,-4,108,-2,108,-1,108,-27,108,108,-1,108,108,-2,108,-2,108,-4,108,-5,108,-9,108,-16,108,-17,108,108,108,108,108,108,108,108,108,108,108,108,108,108,108,108,108,108,108],
sm27=[0,-4,0,-4,0,-4,109,-2,109,-1,109,-27,109,109,-1,109,109,-2,109,-2,109,-4,109,-5,109,-9,109,-16,109,-17,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,110],
sm28=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-7,12,-8,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm29=[0,-4,0,-4,0,-4,109,-2,109,-1,109,-27,109,109,-1,109,109,-2,109,-2,109,-4,109,-5,109,-9,109,-16,109,-17,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109],
sm30=[0,-4,0,-4,0,-4,112,-1,112,112,-1,112,-19,112,-7,112,112,-1,112,112,-1,112,112,-2,112,-4,112,-5,112,112,-8,112,-16,112,-5,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,-4,112],
sm31=[0,-4,0,-4,0,-4,112,-1,112,112,-1,112,-19,112,-7,112,112,-1,112,112,-1,112,112,-2,112,-3,113,112,-5,112,112,-8,112,-15,114,112,115,-4,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,-4,112],
sm32=[0,-4,0,-4,0,-4,116,-1,116,116,-1,116,-19,116,-7,116,116,-1,116,116,-1,116,116,-2,116,-3,113,116,-5,116,116,-8,116,-15,117,116,118,-4,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,-4,116],
sm33=[0,-1,2,3,-1,0,-4,0,-30,7,-1,8,-10,111,-7,12,-23,28,-2,29,-4,30,31,-1,119,120,-2,33,-38,41,42,43],
sm34=[0,-4,0,-4,0,-4,121,-1,121,121,-1,121,-19,121,-7,121,121,-1,121,121,-1,121,121,-2,121,-3,121,121,-5,121,121,-8,121,-15,121,121,121,-4,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,-4,121],
sm35=[0,-4,0,-4,0,-4,122,-1,122,122,-1,122,-19,122,-7,122,122,-1,122,122,-1,122,122,-2,122,-3,122,122,-5,122,122,-8,122,-15,122,122,122,-4,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,122,-4,122],
sm36=[0,-4,0,-4,0,-4,123,-1,123,123,-1,123,-19,123,-7,123,123,-1,123,123,-1,123,123,-2,123,-3,123,123,-5,123,123,-8,123,-15,123,123,123,-4,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,-4,123],
sm37=[0,-4,0,-4,0,-4,124,-1,124,124,-1,124,-19,124,-7,124,124,-1,124,124,-1,124,124,-2,124,-3,124,124,-5,124,124,-8,124,-15,124,124,124,-4,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,-4,124],
sm38=[0,-4,0,-4,0,-4,123,-1,123,123,-1,123,-19,123,-7,123,123,-1,123,123,-2,123,-2,123,-3,123,123,-5,123,123,-8,123,-7,125,-7,123,123,123,-4,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,-4,123],
sm39=[0,-4,0,-4,0,-4,126,-1,126,126,-1,126,-19,126,-10,126,126,-5,126,-3,126,-6,126,-9,127,-7,128,-7,126,-1,126,-4,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,-4,126],
sm40=[0,-4,0,-4,0,-4,129,-1,129,129,-1,129,-19,129,-7,129,129,-1,129,129,-1,129,129,-2,129,-3,129,129,-5,129,129,-8,129,-7,129,-2,129,-4,129,129,129,-4,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,129,-4,129],
sm41=[0,-4,0,-4,0,-4,130,-1,130,130,-1,130,-19,130,-7,130,130,-1,130,130,-1,130,130,-2,130,-3,130,130,-5,130,130,-8,130,-7,130,-2,130,-4,130,130,130,-4,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,-4,130],
sm42=[0,-4,0,-4,0,-4,131,-1,131,131,-1,131,-19,131,-7,131,131,-1,131,131,-1,131,131,-2,131,-3,131,131,-5,131,131,-8,131,-15,131,131,131,-4,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,-4,131],
sm43=[0,-4,0,-4,0,-4,132,-1,132,132,-1,132,-19,132,-7,132,132,-1,132,132,-1,132,132,-2,132,-3,132,132,-5,132,132,-8,132,-15,132,132,132,-4,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,-4,132],
sm44=[0,-4,0,-4,0,-4,133,-1,133,133,-1,133,-19,133,-7,133,133,-1,133,133,-1,133,133,-2,133,-3,133,133,-5,133,133,-8,133,-15,133,133,133,-4,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,-4,133],
sm45=[0,-4,0,-4,0,-4,134,-1,134,134,-1,134,-19,134,-7,134,134,-1,134,134,-1,134,134,-2,134,-3,134,134,-5,134,134,-8,134,-15,134,134,134,-4,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,-4,134],
sm46=[0,-2,135,-1,136,-4,0,-3,137],
sm47=[0,-4,0,-4,0,-4,138,-1,138,138,-1,138,-19,138,-7,138,138,-1,138,138,-1,138,138,-2,138,-3,138,138,-5,138,138,-8,138,-15,138,138,138,-4,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,-4,138],
sm48=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-7,139,-2,111,-7,12,-8,17,-14,28,-2,29,-4,30,31,140,-1,32,-1,141,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm49=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-7,12,142,-7,17,-14,28,-2,29,-4,30,31,-2,32,-1,143,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm50=[0,-4,0,-4,0,-51,113,-32,144,-1,145],
sm51=[0,-4,0,-4,0,-4,146,-1,146,146,-1,146,-19,146,-7,146,146,-1,146,146,-1,146,146,-2,146,-3,146,146,-5,146,146,-8,146,-15,146,146,146,-4,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,-4,146],
sm52=[0,-4,0,-4,0,-4,147,-1,147,147,-1,147,-19,147,-7,147,147,-1,147,147,-1,147,147,-2,147,-3,147,147,-5,147,147,-8,147,-15,147,147,147,-4,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,-4,147],
sm53=[0,-4,0,-4,0,-76,148],
sm54=[0,-4,0,-4,0,-76,125],
sm55=[0,-4,0,-4,0,-68,149],
sm56=[0,-2,3,-1,0,-4,0,-43,150,-40,151],
sm57=[0,152,152,152,-1,0,-4,0,-4,152,152,152,-1,152,-21,152,-1,152,-10,152,152,-2,152,152,-1,152,152,-1,152,152,152,152,152,-2,152,152,152,152,152,152,152,152,-1,152,-2,152,152,152,152,-2,152,-4,152,152,-2,152,-2,152,-28,152,152,-2,152,152,152,152,152,-1,152,152,152],
sm58=[0,-4,0,-4,0,-51,153],
sm59=[0,154,154,154,-1,0,-4,0,-4,154,154,154,-1,154,-21,154,-1,154,-10,154,154,-2,154,154,-1,154,154,-1,154,154,154,154,154,-2,154,154,154,154,154,154,154,154,-1,154,-2,154,154,154,154,-2,154,-4,154,154,-2,154,-2,154,-28,154,154,-2,154,154,154,154,154,-1,154,154,154],
sm60=[0,-1,2,3,-1,0,-4,0,-4,4,5,6,-23,7,-1,8,-10,9,-3,10,-2,11,12,-2,13,14,15,16,-2,17,18,19,20,21,22,23,-2,24,-2,25,-10,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm61=[0,-4,0,-4,0,-51,155],
sm62=[0,-4,0,-4,0,-51,156,-8,157],
sm63=[0,-4,0,-4,0,-51,158],
sm64=[0,-2,3,-1,0,-4,0,-47,159],
sm65=[0,-2,3,-1,0,-4,0,-47,160],
sm66=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-3,161,-3,12,-8,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm67=[0,-4,0,-4,0,-51,162],
sm68=[0,-4,0,-4,0,-43,9],
sm69=[0,-4,0,-4,0,-47,163],
sm70=[0,164,-3,0,-4,0,-47,164],
sm71=[0,-2,165,-1,0,-4,0,-5,166,-4,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185],
sm72=[0,186,186,186,-1,0,-4,0,-4,186,186,186,-1,186,-21,186,-1,186,-10,186,186,-2,186,186,-1,186,186,-2,186,186,186,186,-2,186,186,186,186,186,186,186,186,-1,186,-2,186,186,186,186,-2,186,-4,186,186,-2,186,-2,186,-28,186,186,-2,186,186,186,186,186,-1,186,186,186],
sm73=[0,-2,3,-1,0,-4,0,-43,187,-35,188],
sm74=[0,189,189,189,-1,0,-4,0,-4,189,189,189,-1,189,-21,189,-1,189,-10,189,189,-2,189,189,-1,189,189,-2,189,189,189,189,-2,189,189,189,189,189,189,189,189,-1,189,-2,189,189,189,189,-2,189,-4,189,189,-2,189,-2,189,-28,189,189,-2,189,189,189,189,189,-1,189,189,189],
sm75=[0,-2,3,-1,0,-4,0,-51,190],
sm76=[0,-2,191,-1,0,-4,0,-43,191,-40,191],
sm77=[0,-2,192,-1,0,-4,0,-43,192,-40,192],
sm78=[0,193,193,193,-1,0,-4,0,-4,193,193,193,-1,193,-21,193,-1,193,-10,193,193,-2,193,193,-1,193,193,-1,193,193,193,193,193,-2,193,193,193,193,193,193,193,193,-1,193,-2,193,193,193,193,-2,193,-4,193,193,-2,193,-2,193,-28,193,193,-2,193,193,193,193,193,-1,193,193,193],
sm79=[0,194,194,194,-1,0,-4,0,-4,194,194,194,-1,194,-21,194,-1,194,-10,194,194,-2,194,194,-1,194,194,-2,194,194,194,194,-2,194,194,194,194,194,194,194,194,-1,194,-2,194,194,194,194,-2,194,-4,194,194,-2,194,-2,194,-28,194,194,-2,194,194,194,194,194,-1,194,194,194],
sm80=[0,-4,0,-4,0,-47,46],
sm81=[0,-1,2,3,-1,0,-4,0,-4,4,5,6,-23,7,-1,8,-10,9,195,-2,10,-2,11,12,-2,13,14,15,16,-2,17,18,19,20,21,22,23,-2,24,-2,25,26,27,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm82=[0,196,196,196,-1,0,-4,0,-4,196,196,196,-1,196,-21,196,-1,196,-10,196,196,-2,196,196,-1,196,196,-1,196,196,196,196,196,-2,196,196,196,196,196,196,196,196,-1,196,-2,196,196,196,196,-2,196,-4,196,196,-2,196,-2,196,-28,196,196,-2,196,196,196,196,196,-1,196,196,196],
sm83=[0,-4,0,-4,0,-4,197,-2,197,-1,197,-27,197,197,-1,197,197,-2,197,-2,197,-4,197,-5,197,-9,197,-16,197,-17,197,197,197,197,197,197,197,197,197,197,197,197,197,197,197,197,197,197,197,197],
sm84=[0,-4,0,-4,0,-4,198,-2,198,-1,198,-27,198,198,-1,198,198,-2,198,-2,198,-4,198,-5,198,-9,198,-16,198,-17,198,198,198,198,198,198,198,198,198,198,198,198,198,198,198,198,198,198,198,198],
sm85=[0,-1,199,199,-1,0,-4,0,-5,199,199,-23,199,-1,199,-10,199,-7,199,-8,199,-14,199,-2,199,-4,199,199,-2,199,-2,199,-28,199,199,-2,199,199,199,199,199,-1,199,199,199],
sm86=[0,-4,0,-4,0,-4,200,-2,200,-1,200,-27,200,200,-1,200,200,-2,200,-2,200,-4,200,-5,200,-9,200,-16,200,-17,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200],
sm87=[0,-4,0,-4,0,-4,57,-1,58,57,-1,57,-27,57,57,-1,57,57,-2,57,-2,57,-4,57,-5,57,-9,57,-16,57,-17,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,-4,72],
sm88=[0,-4,0,-4,0,-4,201,-1,201,201,-1,201,-19,201,-7,201,201,-1,201,201,-1,201,201,-2,201,-3,201,201,-5,201,201,-8,201,-15,201,201,201,-4,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,-4,201],
sm89=[0,-4,0,-4,0,-4,126,-1,126,126,-1,126,-19,126,-7,126,126,-1,126,126,-1,126,126,-2,126,-3,126,126,-5,126,126,-8,126,-15,126,126,126,-4,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,-4,126],
sm90=[0,-1,2,3,-1,0,-4,0,-30,7,-1,8,-11,202,-36,203,204,-1,205,-4,206],
sm91=[0,-4,0,-4,0,-4,207,-1,207,207,-1,207,-19,207,-7,207,207,-1,207,207,-1,207,207,-2,207,-3,207,207,-5,207,207,-8,207,-15,207,207,207,-4,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,-4,207],
sm92=[0,-4,0,-4,0,-4,208,-1,208,208,-1,208,-19,208,-7,208,208,-1,208,208,-1,208,208,-2,208,-3,208,208,-5,208,208,-8,208,-15,208,208,208,-4,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,-4,208],
sm93=[0,-4,0,-4,0,-4,209,-2,209,-1,209,-27,209,209,-1,209,209,-2,209,-2,209,-4,209,-5,209,-9,209,-16,209,-17,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209],
sm94=[0,-4,0,-4,0,-4,210,-2,210,-1,210,-27,210,210,-1,210,210,-2,210,-2,210,-4,210,-5,210,-9,210,-16,210,-17,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210],
sm95=[0,-4,0,-4,0,-4,211,-2,211,-1,211,-27,211,211,-1,211,211,-2,211,-2,211,-4,211,-5,211,-9,211,-16,211,-17,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211],
sm96=[0,-4,0,-4,0,-4,212,-2,212,-1,212,-27,212,212,-1,212,212,-2,212,-2,212,-4,212,-5,212,-9,212,-16,212,-17,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212,212],
sm97=[0,-4,0,-4,0,-4,213,-2,213,-1,213,-27,213,213,-1,213,213,-2,213,-2,213,-4,213,-5,213,-9,213,-16,213,-17,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213,213],
sm98=[0,-4,0,-4,0,-4,214,-2,214,-1,214,-27,214,214,-1,214,214,-2,214,-2,214,-4,214,-5,214,-9,214,-16,214,-17,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214],
sm99=[0,-4,0,-4,0,-4,215,-2,215,-1,215,-27,215,215,-1,215,215,-2,215,-2,215,-4,215,-5,215,-9,215,-16,215,-17,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215],
sm100=[0,-4,0,-4,0,-4,216,-2,216,-1,216,-27,216,216,-1,216,216,-2,216,-2,216,-4,216,-5,216,-9,216,-16,216,-17,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216,216],
sm101=[0,-2,3,-1,0,-4,0],
sm102=[0,-4,0,-4,0,-4,217,-1,217,217,-1,217,-19,217,-7,217,217,-1,217,217,-1,217,217,-2,217,-3,217,217,-5,217,217,-8,217,-15,217,217,217,-4,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,-4,217],
sm103=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-7,12,218,-7,17,-14,28,-2,29,-4,30,31,-2,32,-1,219,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm104=[0,-4,0,-4,0,-4,220,-1,220,220,-1,220,-19,220,-7,220,220,-1,220,220,-1,220,220,-2,220,-3,220,220,-5,220,220,-8,220,-15,220,220,220,-4,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,220,-4,220],
sm105=[0,-4,0,-4,0,-4,221,-1,221,221,-1,221,-19,221,-7,221,221,-1,221,221,-1,221,221,-2,221,-4,221,-5,221,221,-8,221,-16,221,-5,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,221,-4,221],
sm106=[0,-4,0,-4,0,-88,222],
sm107=[0,-4,0,-4,0,-84,144,-1,145],
sm108=[0,-2,135,-1,136,-4,0,-3,137,-28,223],
sm109=[0,-2,224,-1,224,-4,0,-3,224,-26,224,-1,224],
sm110=[0,-2,225,-1,225,-4,0,-3,225,-26,225,-1,225],
sm111=[0,-2,135,-1,136,-4,0,-3,137,-26,226],
sm112=[0,-4,0,-4,0,-4,227,-1,227,227,-1,227,-19,227,-7,227,227,-1,227,227,-1,227,227,-2,227,-3,227,227,-5,227,227,-8,227,-15,227,227,227,-4,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227,-4,227],
sm113=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-7,228,-2,111,-7,12,-8,17,-14,28,-2,29,-4,30,31,229,-1,32,-1,141,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm114=[0,-4,0,-4,0,-40,230,-44,231],
sm115=[0,-1,232,232,-1,0,-4,0,-5,232,232,-23,232,-1,232,-7,232,-2,232,-7,232,-8,232,-14,232,-2,232,-4,232,232,232,-1,232,-1,232,232,-28,232,232,-2,232,232,232,232,232,-1,232,232,232],
sm116=[0,-4,0,-4,0,-40,233,-44,233],
sm117=[0,-4,0,-4,0,-4,126,-1,126,126,-1,126,-19,126,-7,126,126,-1,126,126,-2,126,-2,126,-3,126,126,-5,126,126,-8,126,-7,128,-7,126,126,126,-4,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,-4,126],
sm118=[0,-4,0,-4,0,-4,234,-1,234,234,-1,234,-19,234,-7,234,234,-1,234,234,-1,234,234,-2,234,-3,234,234,-5,234,234,-8,234,-7,234,-7,234,234,234,-4,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,234,-4,234],
sm119=[0,-4,0,-4,0,-40,235,-11,236],
sm120=[0,-4,0,-4,0,-4,237,-1,237,237,-1,237,-19,237,-7,237,237,-1,237,237,-1,237,237,-2,237,-3,237,237,-5,237,237,-8,237,-15,237,237,237,-4,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,237,-4,237],
sm121=[0,-4,0,-4,0,-4,238,-2,238,-1,238,-27,238,238,-1,238,238,-2,238,-2,238,-4,238,-5,238,-9,238,-16,238,-17,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238],
sm122=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,239,-7,12,-8,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm123=[0,240,240,240,-1,0,-4,0,-4,240,240,240,-1,240,-21,240,-1,240,-10,240,240,-2,240,240,-1,240,240,-1,240,240,240,240,240,-2,240,240,240,240,240,240,240,240,-1,240,-2,240,240,240,240,-2,240,-4,240,240,-2,240,-2,240,-28,240,240,-2,240,240,240,240,240,-1,240,240,240],
sm124=[0,-1,2,3,-1,0,-4,0,-4,4,5,6,-23,7,-1,8,-10,9,-3,10,-2,11,12,-2,13,14,15,16,-2,17,18,19,20,21,22,23,-2,24,-2,25,-2,28,-7,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm125=[0,-4,0,-4,0,-40,241,-6,242],
sm126=[0,-4,0,-4,0,-40,243,-6,243],
sm127=[0,-4,0,-4,0,-29,244,-10,245,-6,245],
sm128=[0,-4,0,-4,0,-29,244],
sm129=[0,-4,0,-4,0,-29,128,-10,128,-2,128,128,-2,128,-3,128,128,-5,128,128,-19,128,-5,128],
sm130=[0,-4,0,-4,0,-29,246,-10,246,-3,246,-7,246,-5,246,246,-25,246],
sm131=[0,-1,2,3,-1,0,-4,0,-30,7,-1,8,-11,247,-39,205,-4,248],
sm132=[0,-2,3,-1,0,-4,0,-40,139,-2,150,-40,151,249,-3,250],
sm133=[0,-4,0,-4,0,-55,251],
sm134=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-3,252,-3,12,-5,253,-2,17,-12,26,27,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm135=[0,-4,0,-4,0,-51,254],
sm136=[0,255,255,255,-1,0,-4,0,-4,255,255,255,-1,255,-21,255,-1,255,-10,255,255,-2,255,255,-1,255,255,-1,255,255,255,255,255,-2,255,255,255,255,255,255,255,255,-1,255,-2,255,255,255,255,-2,255,-4,255,255,-2,255,-2,255,-28,255,255,-2,255,255,255,255,255,-1,255,255,255],
sm137=[0,-4,0,-4,0,-47,256],
sm138=[0,-4,0,-4,0,-47,127],
sm139=[0,257,257,257,-1,0,-4,0,-4,257,257,257,-1,257,-21,257,-1,257,-10,257,257,-2,257,257,-1,257,257,-1,257,257,257,257,257,-2,257,257,257,257,257,257,257,257,-1,257,-2,257,257,257,257,-2,257,-4,257,257,-2,257,-2,257,-28,257,257,-2,257,257,257,257,257,-1,257,257,257],
sm140=[0,-4,0,-4,0,-47,258],
sm141=[0,259,259,259,-1,0,-4,0,-4,259,259,259,-1,259,-21,259,-1,259,-10,259,259,-2,259,259,-1,259,259,-1,259,259,259,259,259,-2,259,259,259,259,259,259,259,259,-1,259,-2,259,259,259,259,-2,259,-4,259,259,-2,259,-2,259,-28,259,259,-2,259,259,259,259,259,-1,259,259,259],
sm142=[0,-4,0,-4,0,-40,53,-6,260],
sm143=[0,-4,0,-4,0,-40,53,-6,261],
sm144=[0,-4,0,-4,0,-70,262,263],
sm145=[0,264,264,264,-1,0,-4,0,-4,264,264,264,-1,264,-21,264,-1,264,-10,264,264,-2,264,264,-1,264,264,-1,264,264,264,264,264,-2,264,264,264,264,264,264,264,264,-1,264,-2,264,264,264,264,-2,264,-4,264,264,-2,264,-2,264,-28,264,264,-2,264,264,264,264,264,-1,264,264,264],
sm146=[0,-2,265,-1,0,-4,0,-7,266,-1,266,-20,267,-1,268],
sm147=[0,-2,265,-1,0,-4,0,-9,266,-20,267,-1,268],
sm148=[0,-2,265,-1,0,-4,0,-7,266,-22,267,-1,268],
sm149=[0,-4,0,-4,0,-6,269],
sm150=[0,-2,270,-1,0,-4,0,-7,270,-1,270,-20,270,-1,270],
sm151=[0,-2,271,-1,0,-4,0,-9,271,-20,271,-1,271],
sm152=[0,-4,0,-4,0,-43,187,-35,188],
sm153=[0,272,272,272,-1,0,-4,0,-4,272,272,272,272,272,272,-19,272,272,-1,272,-4,272,272,-1,272,272,-1,272,272,-2,272,272,-1,272,272,272,-1,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,-2,272,272,272,272,-2,272,-4,272,272,272,272,272,-2,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,272,-1,272,272,272],
sm154=[0,-4,0,-4,0,-43,273],
sm155=[0,-1,2,3,-1,0,-4,0,-30,7,-1,8,-11,274,-2,275,-32,276,203,204,-1,205],
sm156=[0,-1,2,3,-1,0,-4,0,-30,7,-1,8,-10,111,-7,12,-23,28,-2,29,-4,30,31,-2,32,-2,33,-38,41,42,43],
sm157=[0,-2,3,-1,0,-4,0,-43,150,-8,277,-31,151,-4,250],
sm158=[0,-4,0,-4,0,-51,278],
sm159=[0,-4,0,-4,0,-40,279,-6,280],
sm160=[0,-4,0,-4,0,-40,281,-6,281],
sm161=[0,282,282,282,-1,0,-4,0,-4,282,282,282,-1,282,-21,282,-1,282,-10,282,282,-2,282,282,-1,282,282,-1,282,282,282,282,282,-2,282,282,282,282,282,282,282,282,-1,282,282,282,282,282,282,282,-2,282,-4,282,282,-2,282,-2,282,-28,282,282,-2,282,282,282,282,282,-1,282,282,282],
sm162=[0,-4,0,-4,0,-37,283,283,-1,283,-6,283,-4,283,-15,283,-16,283],
sm163=[0,-4,0,-4,0,-37,284,284,-1,284,-3,284,-2,284,-4,284,-15,284,-16,284],
sm164=[0,-4,0,-4,0,-68,285],
sm165=[0,-4,0,-4,0,-37,286,286,-1,286,-3,286,-2,286,-4,286,-15,286,-16,286,-17,286,286,77],
sm166=[0,-4,0,-4,0,-37,287,287,-1,287,-3,287,-2,287,-4,287,-15,287,-16,287,-17,287,287,287,79],
sm167=[0,-4,0,-4,0,-37,288,288,-1,288,-3,288,-2,288,-4,288,-15,288,-16,288,-17,288,288,288,288,81],
sm168=[0,-4,0,-4,0,-37,289,289,-1,289,-3,289,-2,289,-4,289,-15,289,-16,289,-17,289,289,289,289,289,83],
sm169=[0,-4,0,-4,0,-37,290,290,-1,290,-3,290,-2,290,-4,290,-15,290,-16,290,-17,290,290,290,290,290,290,85,86,87,88],
sm170=[0,-4,0,-4,0,-4,89,-2,90,-29,291,291,-1,291,-3,291,-2,291,-4,291,-5,92,-9,291,-16,291,-17,291,291,291,291,291,291,291,291,291,291,93,94,95],
sm171=[0,-4,0,-4,0,-4,89,-2,90,-29,292,292,-1,292,-3,292,-2,292,-4,292,-5,92,-9,292,-16,292,-17,292,292,292,292,292,292,292,292,292,292,93,94,95],
sm172=[0,-4,0,-4,0,-4,89,-2,90,-29,293,293,-1,293,-3,293,-2,293,-4,293,-5,92,-9,293,-16,293,-17,293,293,293,293,293,293,293,293,293,293,93,94,95],
sm173=[0,-4,0,-4,0,-4,89,-2,90,-29,294,294,-1,294,-3,294,-2,294,-4,294,-5,92,-9,294,-16,294,-17,294,294,294,294,294,294,294,294,294,294,93,94,95],
sm174=[0,-4,0,-4,0,-4,295,-2,295,-29,295,295,-1,295,-3,295,-2,295,-4,295,-5,295,-9,295,-16,295,-17,295,295,295,295,295,295,295,295,295,295,295,295,295,97,98,99],
sm175=[0,-4,0,-4,0,-4,296,-2,296,-29,296,296,-1,296,-3,296,-2,296,-4,296,-5,296,-9,296,-16,296,-17,296,296,296,296,296,296,296,296,296,296,296,296,296,97,98,99],
sm176=[0,-4,0,-4,0,-4,297,-2,297,-29,297,297,-1,297,-3,297,-2,297,-4,297,-5,297,-9,297,-16,297,-17,297,297,297,297,297,297,297,297,297,297,297,297,297,97,98,99],
sm177=[0,-4,0,-4,0,-4,298,-2,298,-29,298,298,-1,298,-3,298,-2,298,-4,298,-5,298,-9,298,-16,298,-17,298,298,298,298,298,298,298,298,298,298,298,298,298,97,98,99],
sm178=[0,-4,0,-4,0,-4,299,-2,299,-29,299,299,-1,299,-3,299,-2,299,-4,299,-5,299,-9,299,-16,299,-17,299,299,299,299,299,299,299,299,299,299,299,299,299,97,98,99],
sm179=[0,-4,0,-4,0,-4,300,-2,300,-29,300,300,-1,300,-3,300,-2,300,-4,300,-5,300,-9,300,-16,300,-17,300,300,300,300,300,300,300,300,300,300,300,300,300,97,98,99],
sm180=[0,-4,0,-4,0,-4,301,-2,301,-29,301,301,-1,301,-3,301,-2,301,-4,301,-5,301,-9,301,-16,301,-17,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,101,102],
sm181=[0,-4,0,-4,0,-4,302,-2,302,-29,302,302,-1,302,-3,302,-2,302,-4,302,-5,302,-9,302,-16,302,-17,302,302,302,302,302,302,302,302,302,302,302,302,302,302,302,302,101,102],
sm182=[0,-4,0,-4,0,-4,303,-2,303,-29,303,303,-1,303,-3,303,-2,303,-4,303,-5,303,-9,303,-16,303,-17,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,303,101,102],
sm183=[0,-4,0,-4,0,-4,304,-2,304,-1,104,-27,304,304,-1,304,105,-2,304,-2,304,-4,304,-5,304,-9,304,-16,304,-17,304,304,304,304,304,304,304,304,304,304,304,304,304,304,304,304,304,304,106],
sm184=[0,-4,0,-4,0,-4,305,-2,305,-1,104,-27,305,305,-1,305,105,-2,305,-2,305,-4,305,-5,305,-9,305,-16,305,-17,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,305,106],
sm185=[0,-4,0,-4,0,-4,306,-2,306,-1,306,-27,306,306,-1,306,306,-2,306,-2,306,-4,306,-5,306,-9,306,-16,306,-17,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306],
sm186=[0,-4,0,-4,0,-4,307,-2,307,-1,307,-27,307,307,-1,307,307,-2,307,-2,307,-4,307,-5,307,-9,307,-16,307,-17,307,307,307,307,307,307,307,307,307,307,307,307,307,307,307,307,307,307,307],
sm187=[0,-4,0,-4,0,-4,308,-2,308,-1,308,-27,308,308,-1,308,308,-2,308,-2,308,-4,308,-5,308,-9,308,-16,308,-17,308,308,308,308,308,308,308,308,308,308,308,308,308,308,308,308,308,308,308],
sm188=[0,-4,0,-4,0,-4,309,-2,309,-1,309,-27,309,309,-1,309,309,-2,309,-2,309,-4,309,-5,309,-9,309,-16,309,-17,309,309,309,309,309,309,309,309,309,309,309,309,309,309,309,309,309,309,309],
sm189=[0,-4,0,-4,0,-4,310,-1,310,310,-1,310,-19,310,-7,310,310,-1,310,310,-1,310,310,-2,310,-3,310,310,-5,310,310,-8,310,-15,310,310,310,-4,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,-4,310],
sm190=[0,-4,0,-4,0,-40,311,-3,312],
sm191=[0,-4,0,-4,0,-40,313,-3,313],
sm192=[0,-4,0,-4,0,-40,314,-3,314],
sm193=[0,-4,0,-4,0,-40,315,-3,315],
sm194=[0,-4,0,-4,0,-29,244,-10,314,-3,314],
sm195=[0,-4,0,-4,0,-51,316,-16,317],
sm196=[0,-4,0,-4,0,-51,318,-16,318],
sm197=[0,-4,0,-4,0,-29,129,-10,129,-3,129,-6,319,-16,319],
sm198=[0,-4,0,-4,0,-51,319,-16,319],
sm199=[0,-1,2,3,-1,0,-4,0,-30,7,-1,8,-51,205],
sm200=[0,-4,0,-4,0,-4,320,-1,320,320,-1,320,-19,320,-7,320,320,-1,320,320,-1,320,320,-2,320,-3,320,320,-5,320,320,-8,320,-15,320,320,320,-4,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,-4,320],
sm201=[0,-4,0,-4,0,-40,53,-44,321],
sm202=[0,-4,0,-4,0,-4,322,-1,322,322,-1,322,-19,322,-7,322,322,-1,322,322,-1,322,322,-2,322,-3,322,322,-5,322,322,-8,322,-15,322,322,322,-4,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,322,-4,322],
sm203=[0,-4,0,-4,0,-40,323,-11,324],
sm204=[0,-4,0,-4,0,-40,325,-11,325],
sm205=[0,-4,0,-4,0,-40,53,-44,326],
sm206=[0,-4,0,-4,0,-4,327,-1,327,327,-1,327,-19,327,-7,327,327,-1,327,327,-1,327,327,-2,327,-3,327,327,-5,327,327,-8,327,-15,327,327,327,-4,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,327,-4,327],
sm207=[0,-4,0,-4,0,-4,328,-1,328,328,-1,328,-19,328,-7,328,328,-1,328,328,-1,328,328,-2,328,-3,328,328,-5,328,328,-8,328,-15,328,328,328,-4,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,-4,328],
sm208=[0,-4,0,-4,0,-4,329,-1,329,329,-1,329,-19,329,-7,329,329,-1,329,329,-1,329,329,-2,329,-3,329,329,-5,329,329,-8,329,-15,329,329,329,-4,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,329,-4,329],
sm209=[0,-2,330,-1,0,-4,0,-4,330,-1,330,330,-1,330,-19,330,330,-1,330,-4,330,330,-1,330,330,-1,330,330,-2,330,-3,330,330,-5,330,330,-8,330,-15,330,330,330,-4,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,-4,330],
sm210=[0,-2,331,-1,331,-4,0,-3,331,-26,331,-1,331],
sm211=[0,-4,0,-4,0,-4,332,-1,332,332,-1,332,-19,332,-7,332,332,-1,332,332,-1,332,332,-2,332,-3,332,332,-5,332,332,-8,332,-15,332,332,332,-4,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,332,-4,332],
sm212=[0,-1,333,333,-1,0,-4,0,-5,333,333,-23,333,-1,333,-7,333,-2,333,-7,333,-8,333,-14,333,-2,333,-4,333,333,333,-1,333,-1,333,333,-28,333,333,-2,333,333,333,333,333,-1,333,333,333],
sm213=[0,-4,0,-4,0,-40,334,-44,334],
sm214=[0,-4,0,-4,0,-4,335,-1,335,335,-1,335,-19,335,-7,335,335,-1,335,335,-1,335,335,-2,335,-3,335,335,-5,335,335,-8,335,-15,335,335,335,-4,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,335,-4,335],
sm215=[0,-4,0,-4,0,-40,228,-44,336],
sm216=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-7,139,-2,111,-7,12,-8,17,-14,28,-2,29,-4,30,31,232,-1,32,-1,141,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm217=[0,-4,0,-4,0,-40,337,-44,337],
sm218=[0,-4,0,-4,0,-4,338,-1,338,338,-1,338,-19,338,-7,338,338,-1,338,338,-1,338,338,-2,338,-3,338,338,-5,338,338,-8,338,-7,338,-7,338,338,338,-4,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,338,-4,338],
sm219=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-7,12,339,-7,17,-14,28,-2,29,-4,30,31,-2,32,-1,340,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm220=[0,-4,0,-4,0,-52,341],
sm221=[0,-4,0,-4,0,-52,342],
sm222=[0,-4,0,-4,0,-4,343,-1,343,343,-1,343,-19,343,-7,343,343,-1,343,343,-1,343,343,-2,343,-3,343,343,-5,343,343,-8,343,-15,343,343,343,-4,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,343,-4,343],
sm223=[0,-4,0,-4,0,-40,53,-44,344],
sm224=[0,-4,0,-4,0,-37,345,345,-1,345,-3,345,-2,345,-4,345,-15,345,-16,345],
sm225=[0,-4,0,-4,0,-37,346,346,-1,346,-3,346,-2,346,-4,346,-15,346,-16,346],
sm226=[0,347,347,347,-1,0,-4,0,-4,347,347,347,-1,347,-21,347,-1,347,-10,347,347,-2,347,347,-1,347,347,-1,347,347,347,347,347,-2,347,347,347,347,347,347,347,347,-1,347,-2,347,347,347,347,-2,347,-4,347,347,-2,347,-2,347,-28,347,347,-2,347,347,347,347,347,-1,347,347,347],
sm227=[0,348,348,348,-1,0,-4,0,-4,348,348,348,-1,348,-21,348,-1,348,-10,348,348,-2,348,348,-1,348,348,-1,348,348,348,348,348,-2,348,348,348,348,348,348,348,348,-1,348,-2,348,348,348,348,-2,348,-4,348,348,-2,348,-2,348,-28,348,348,-2,348,348,348,348,348,-1,348,348,348],
sm228=[0,349,349,349,-1,0,-4,0,-4,349,349,349,-1,349,-21,349,-1,349,-10,349,349,-2,349,349,-1,349,349,-1,349,349,349,349,349,-2,349,349,349,349,349,349,349,349,-1,349,-2,349,349,349,349,-2,349,-4,349,349,-2,349,-2,349,-28,349,349,-2,349,349,349,349,349,-1,349,349,349],
sm229=[0,-4,0,-4,0,-40,350,-6,350],
sm230=[0,-4,0,-4,0,-29,351,-10,351,-3,351,-7,351,-5,351,351,-25,351],
sm231=[0,-4,0,-4,0,-44,352],
sm232=[0,-4,0,-4,0,-40,353,-3,354],
sm233=[0,-4,0,-4,0,-40,355,-3,355],
sm234=[0,-4,0,-4,0,-40,356,-3,356],
sm235=[0,-4,0,-4,0,-68,357],
sm236=[0,-4,0,-4,0,-29,244,-10,358,-3,358,-7,358,-32,358],
sm237=[0,-4,0,-4,0,-29,359,-10,359,-3,359,-7,359,-5,359,359,-25,359],
sm238=[0,-2,3,-1,0,-4,0,-40,228,-2,150,-40,151,360,-3,250],
sm239=[0,-4,0,-4,0,-85,361],
sm240=[0,-4,0,-4,0,-40,362,-44,363],
sm241=[0,-4,0,-4,0,-40,364,-44,364],
sm242=[0,-4,0,-4,0,-40,365,-44,365],
sm243=[0,-4,0,-4,0,-40,366,-3,366,-7,366,-32,366],
sm244=[0,-4,0,-4,0,-29,244,-10,366,-3,366,-7,366,-32,366],
sm245=[0,-4,0,-4,0,-40,53,-11,367],
sm246=[0,-4,0,-4,0,-51,368],
sm247=[0,-4,0,-4,0,-40,53,-11,369],
sm248=[0,-4,0,-4,0,-40,53,-6,370],
sm249=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-3,371,-3,12,-8,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm250=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-3,372,-3,12,-8,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm251=[0,-4,0,-4,0,-4,57,-1,58,57,-1,57,-19,59,-10,57,57,-5,57,-10,373,374,-31,60,61,62,63,64,65,66,67,68,69,70,71,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,-4,72],
sm252=[0,-4,0,-4,0,-58,375,376],
sm253=[0,-1,2,3,-1,0,-4,0,-30,7,-1,8,-10,111,-7,12,-5,377,-15,26,27,28,-2,29,-4,30,31,-2,32,-2,33,-38,41,42,43],
sm254=[0,-4,0,-4,0,-40,53,-11,378],
sm255=[0,379,379,379,-1,0,-4,0,-4,379,379,379,-1,379,-21,379,-1,379,-10,379,379,-2,379,379,-1,379,379,-1,379,379,379,379,379,-2,379,379,379,379,379,379,379,379,-1,379,-2,379,379,379,379,-2,379,-4,379,379,-2,379,-2,379,-28,379,379,-2,379,379,379,379,379,-1,379,379,379],
sm256=[0,380,380,380,-1,0,-4,0,-4,380,380,380,-1,380,-21,380,-1,380,-10,380,380,-2,380,380,-1,380,380,-1,380,380,380,380,380,-2,380,380,380,380,380,380,380,380,-1,380,-2,380,380,380,380,-2,380,-4,380,380,-2,380,-2,380,-28,380,380,-2,380,380,380,380,380,-1,380,380,380],
sm257=[0,381,381,381,-1,0,-4,0,-4,381,381,381,-1,381,-21,381,-1,381,-10,381,381,-2,381,381,-1,381,381,-1,381,381,381,381,381,-2,381,381,381,381,381,381,381,381,-1,381,-2,381,381,381,381,-2,381,-4,381,381,-2,381,-2,381,-28,381,381,-2,381,381,381,381,381,-1,381,381,381],
sm258=[0,-4,0,-4,0,-40,53,-11,382],
sm259=[0,383,383,383,-1,0,-4,0,-4,383,383,383,-1,383,-21,383,-1,383,-10,383,383,-2,383,383,-1,383,383,-1,383,383,383,383,383,-2,383,383,383,383,383,383,383,383,-1,383,-2,383,383,383,383,-2,383,-4,383,383,-2,383,-2,383,-28,383,383,-2,383,383,383,383,383,-1,383,383,383],
sm260=[0,384,384,384,-1,0,-4,0,-4,384,384,384,-1,384,-21,384,-1,384,-10,384,384,-2,384,384,-1,384,384,-1,384,384,384,384,384,-2,384,384,384,384,384,384,384,384,-1,384,-1,263,384,384,384,384,-2,384,-4,384,384,-2,384,-2,384,-28,384,384,-2,384,384,384,384,384,-1,384,384,384],
sm261=[0,385,385,385,-1,0,-4,0,-4,385,385,385,-1,385,-21,385,-1,385,-10,385,385,-2,385,385,-1,385,385,-1,385,385,385,385,385,-2,385,385,385,385,385,385,385,385,-1,385,-2,385,385,385,385,-2,385,-4,385,385,-2,385,-2,385,-28,385,385,-2,385,385,385,385,385,-1,385,385,385],
sm262=[0,-4,0,-4,0,-51,386],
sm263=[0,-2,265,-1,0,-4,0,-7,387,-1,388,-20,267,-1,268],
sm264=[0,-2,389,-1,0,-4,0,-7,389,-1,389,-20,389,-1,389],
sm265=[0,-2,390,-1,0,-4,0,-7,390,-1,390,-19,391,390,-1,390],
sm266=[0,-2,392,-1,0,-4,0],
sm267=[0,-2,393,-1,0,-4,0],
sm268=[0,-2,394,-1,0,-4,0,-7,394,-1,394,-19,394,394,-1,394],
sm269=[0,-2,265,-1,0,-4,0,-9,395,-20,267,-1,268],
sm270=[0,-2,265,-1,0,-4,0,-7,396,-22,267,-1,268],
sm271=[0,-2,397,-1,398,-4,399,-3,400],
sm272=[0,401,401,401,-1,0,-4,0,-4,401,401,401,401,401,401,-19,401,401,-1,401,-4,401,401,-1,401,401,-1,401,401,-2,401,401,-1,401,401,401,-1,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,-2,401,401,401,401,-2,401,-4,401,401,401,401,401,-2,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,-1,401,401,401],
sm273=[0,-1,2,3,-1,0,-4,0,-30,7,-1,8,-11,402,-2,275,-32,276,203,204,-1,205],
sm274=[0,-4,0,-4,0,-44,403],
sm275=[0,404,404,404,-1,0,-4,0,-4,404,404,404,404,404,404,-19,404,404,-1,404,-4,404,404,-1,404,404,-1,404,404,-2,404,404,-1,404,404,404,-1,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,-2,404,404,404,404,-2,404,-4,404,404,404,404,404,-2,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,404,-1,404,404,404],
sm276=[0,-1,2,3,-1,0,-4,0,-30,7,-1,8,-11,405,-2,275,-32,276,203,204,-1,205],
sm277=[0,-1,406,406,-1,0,-4,0,-30,406,-1,406,-11,406,-2,406,-32,406,406,406,-1,406],
sm278=[0,-1,407,407,-1,0,-4,0,-30,407,-1,407,-11,407,-2,407,-32,407,407,407,-1,407],
sm279=[0,-1,2,3,-1,0,-4,0,-30,7,-1,8,-48,203,204,-1,205],
sm280=[0,-4,0,-4,0,-51,316],
sm281=[0,-4,0,-4,0,-51,319],
sm282=[0,-4,0,-4,0,-43,408],
sm283=[0,-4,0,-4,0,-52,409],
sm284=[0,-4,0,-4,0,-52,410],
sm285=[0,-4,0,-4,0,-40,411,-11,410],
sm286=[0,-4,0,-4,0,-52,412],
sm287=[0,-4,0,-4,0,-40,413,-11,413],
sm288=[0,-4,0,-4,0,-40,414,-11,414],
sm289=[0,415,415,415,-1,0,-4,0,-4,415,415,415,-1,415,-21,415,-1,415,-10,415,415,-2,415,415,-1,415,415,-2,415,415,415,415,-2,415,415,415,415,415,415,415,415,-1,415,-2,415,415,415,415,-2,415,-4,415,415,-2,415,-2,415,-28,415,415,-2,415,415,415,415,415,-1,415,415,415],
sm290=[0,-4,0,-4,0,-40,416,-6,416],
sm291=[0,-4,0,-4,0,-4,417,-1,417,417,-1,417,-19,417,-7,417,417,-1,417,417,-1,417,417,-2,417,-3,417,417,-5,417,417,-8,417,-15,417,417,417,-4,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,417,-4,417],
sm292=[0,-1,2,3,-1,0,-4,0,-30,7,-1,8,-11,418,-36,203,204,-1,205,-4,206],
sm293=[0,-4,0,-4,0,-40,419,-3,419],
sm294=[0,-4,0,-4,0,-40,420,-3,420],
sm295=[0,-4,0,-4,0,-40,421,-3,421],
sm296=[0,-4,0,-4,0,-85,422],
sm297=[0,-4,0,-4,0,-51,423],
sm298=[0,-4,0,-4,0,-51,424],
sm299=[0,-4,0,-4,0,-4,425,-1,425,425,-1,425,-19,425,-7,425,425,-1,425,425,-1,425,425,-2,425,-3,425,425,-5,425,425,-8,425,-15,425,425,425,-4,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,425,-4,425],
sm300=[0,-4,0,-4,0,-4,426,-1,426,426,-1,426,-19,426,-7,426,426,-1,426,426,-1,426,426,-2,426,-3,426,426,-5,426,426,-8,426,-15,426,426,426,-4,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,426,-4,426],
sm301=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-7,12,427,-7,17,-14,28,-2,29,-4,30,31,-2,32,-1,428,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm302=[0,-4,0,-4,0,-40,429,-11,429],
sm303=[0,-4,0,-4,0,-4,430,-1,430,430,-1,430,-19,430,-7,430,430,-1,430,430,-1,430,430,-2,430,-3,430,430,-5,430,430,-8,430,-15,430,430,430,-4,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,430,-4,430],
sm304=[0,-4,0,-4,0,-4,431,-1,431,431,-1,431,-19,431,-7,431,431,-1,431,431,-1,431,431,-2,431,-3,431,431,-5,431,431,-8,431,-15,431,431,431,-4,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,431,-4,431],
sm305=[0,-4,0,-4,0,-40,432,-44,432],
sm306=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-7,228,-2,111,-7,12,-8,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm307=[0,-4,0,-4,0,-4,433,-1,433,433,-1,433,-19,433,-7,433,433,-1,433,433,-1,433,433,-2,433,-3,433,433,-5,433,433,-8,433,-7,433,-7,433,433,433,-4,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,433,-4,433],
sm308=[0,-4,0,-4,0,-4,434,-1,434,434,-1,434,-19,434,-7,434,434,-1,434,434,-1,434,434,-2,434,-3,434,434,-5,434,434,-8,434,-7,434,-7,434,434,434,-4,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,434,-4,434],
sm309=[0,-4,0,-4,0,-4,435,-1,435,435,-1,435,-19,435,-7,435,435,-1,435,435,-1,435,435,-2,435,-3,435,435,-5,435,435,-8,435,-15,435,435,435,-4,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,435,-4,435],
sm310=[0,-4,0,-4,0,-44,436],
sm311=[0,-1,2,3,-1,0,-4,0,-4,4,5,6,-23,7,-1,8,-10,9,437,-2,10,-2,11,12,-2,13,14,15,16,-2,17,18,19,20,21,22,23,-2,24,-2,25,26,27,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm312=[0,-4,0,-4,0,-40,438,-6,438],
sm313=[0,-4,0,-4,0,-40,439,-3,439,-2,439,-4,439,-32,439],
sm314=[0,-4,0,-4,0,-29,440,-10,440,-3,440,-7,440,-5,440,440,-25,440],
sm315=[0,-1,2,3,-1,0,-4,0,-30,7,-1,8,-11,441,-39,205,-4,248],
sm316=[0,-4,0,-4,0,-44,442],
sm317=[0,-4,0,-4,0,-40,443,-3,443,-7,443,-32,443],
sm318=[0,-4,0,-4,0,-85,444],
sm319=[0,-4,0,-4,0,-29,445,-10,445,-3,445,-7,445,-5,445,445,-25,445],
sm320=[0,-4,0,-4,0,-40,446,-44,446],
sm321=[0,-2,3,-1,0,-4,0,-40,139,-2,150,-40,151,447,-3,250],
sm322=[0,-4,0,-4,0,-52,448,-32,448],
sm323=[0,-4,0,-4,0,-40,449,-3,449,-7,449,-32,449],
sm324=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-3,450,-3,12,-8,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm325=[0,-4,0,-4,0,-40,53,-6,451],
sm326=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-7,12,452,-7,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm327=[0,-4,0,-4,0,-40,241,-6,453],
sm328=[0,-4,0,-4,0,-58,454,455],
sm329=[0,-4,0,-4,0,-29,244,-10,245,-6,245,-10,456,456],
sm330=[0,-4,0,-4,0,-29,244,-28,456,456],
sm331=[0,-4,0,-4,0,-40,53,-6,457],
sm332=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-7,12,458,-7,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm333=[0,-4,0,-4,0,-58,459,459],
sm334=[0,-4,0,-4,0,-59,460],
sm335=[0,-4,0,-4,0,-59,461],
sm336=[0,-4,0,-4,0,-43,462],
sm337=[0,463,463,463,-1,0,-4,0,-4,463,463,463,-1,463,-21,463,-1,463,-10,463,463,-2,463,463,-1,463,463,-1,463,463,463,463,463,-2,463,463,463,463,463,463,463,463,-1,463,-2,463,463,463,463,-2,463,-4,463,463,-2,463,-2,463,-28,463,463,-2,463,463,463,463,463,-1,463,463,463],
sm338=[0,464,464,464,-1,0,-4,0,-4,464,464,464,-1,464,-21,464,-1,464,-10,464,464,-2,464,464,-1,464,464,-1,464,464,464,464,464,-2,464,464,464,464,464,464,464,464,-1,464,-2,464,464,464,464,-2,464,-4,464,464,-2,464,-2,464,-28,464,464,-2,464,464,464,464,464,-1,464,464,464],
sm339=[0,-2,397,-1,398,-4,399,-3,400,465,-3,466,-27,467],
sm340=[0,-4,0,-4,0,-7,468],
sm341=[0,-2,469,-1,0,-4,0,-7,469,-1,469,-20,469,-1,469],
sm342=[0,-2,470,-1,0,-4,0,-30,7,-1,471,-3,467],
sm343=[0,-4,0,-4,0,-30,472],
sm344=[0,-4,0,-4,0,-32,473],
sm345=[0,-4,0,-4,0,-7,474],
sm346=[0,-1,2,3,-1,0,-4,0,-4,4,5,6,-1,1,-21,7,-1,8,-10,9,-3,10,-2,11,12,-2,13,14,15,16,-2,17,18,19,20,21,22,23,-2,24,-2,25,26,27,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm347=[0,-2,397,-1,398,-4,399,-3,400,-2,475],
sm348=[0,-2,476,-1,476,-4,476,-3,476,476,-1,476,-1,476,-27,476],
sm349=[0,-2,477,-1,477,-4,477,-3,477,477,-1,477,-1,477,-27,477],
sm350=[0,-4,0,-4,0,-44,478],
sm351=[0,479,479,479,-1,0,-4,0,-4,479,479,479,479,479,479,-19,479,479,-1,479,-4,479,479,-1,479,479,-1,479,479,-2,479,479,-1,479,479,479,-1,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,-2,479,479,479,479,-2,479,-4,479,479,479,479,479,-2,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,479,-1,479,479,479],
sm352=[0,480,480,480,-1,0,-4,0,-4,480,480,480,480,480,480,-19,480,480,-1,480,-4,480,480,-1,480,480,-1,480,480,-2,480,480,-1,480,480,480,-1,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,-2,480,480,480,480,-2,480,-4,480,480,480,480,480,-2,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,-1,480,480,480],
sm353=[0,-1,481,481,-1,0,-4,0,-30,481,-1,481,-11,481,-2,481,-32,481,481,481,-1,481],
sm354=[0,-1,482,482,-1,0,-4,0,-30,482,-1,482,-11,482,-2,482,-32,482,482,482,-1,482],
sm355=[0,-4,0,-4,0,-43,483],
sm356=[0,-2,3,-1,0,-4,0,-43,150,-8,484,-31,151,-4,250],
sm357=[0,-4,0,-4,0,-52,485],
sm358=[0,-4,0,-4,0,-40,486,-6,486],
sm359=[0,-4,0,-4,0,-37,487,487,-1,487,-3,487,-2,487,-4,487,-15,487,-16,487],
sm360=[0,-4,0,-4,0,-4,488,-1,488,488,-1,488,-19,488,-7,488,488,-1,488,488,-1,488,488,-2,488,-3,488,488,-5,488,488,-8,488,-15,488,488,488,-4,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,488,-4,488],
sm361=[0,-4,0,-4,0,-40,489,-3,489],
sm362=[0,-4,0,-4,0,-52,490],
sm363=[0,-4,0,-4,0,-52,491],
sm364=[0,-4,0,-4,0,-40,492,-3,492],
sm365=[0,-4,0,-4,0,-51,493,-16,493],
sm366=[0,-4,0,-4,0,-52,494],
sm367=[0,-4,0,-4,0,-4,495,-1,495,495,-1,495,-19,495,-7,495,495,-1,495,495,-1,495,495,-2,495,-3,495,495,-5,495,495,-8,495,-15,495,495,495,-4,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,495,-4,495],
sm368=[0,-4,0,-4,0,-40,496,-11,496],
sm369=[0,-4,0,-4,0,-40,497,-44,497],
sm370=[0,-4,0,-4,0,-52,498],
sm371=[0,-4,0,-4,0,-52,499],
sm372=[0,-4,0,-4,0,-37,500,500,-1,500,-3,500,-2,500,-4,500,-15,500,-16,500],
sm373=[0,-4,0,-4,0,-44,501],
sm374=[0,-4,0,-4,0,-29,502,-10,502,-3,502,-7,502,-5,502,502,-25,502],
sm375=[0,-4,0,-4,0,-40,503,-3,503],
sm376=[0,-4,0,-4,0,-40,504,-3,504],
sm377=[0,-4,0,-4,0,-29,505,-10,505,-3,505,-7,505,-5,505,505,-25,505],
sm378=[0,-2,3,-1,0,-4,0,-40,228,-2,150,-40,151,506,-3,250],
sm379=[0,-4,0,-4,0,-85,507],
sm380=[0,-4,0,-4,0,-40,508,-44,508],
sm381=[0,509,509,509,-1,0,-4,0,-4,509,509,509,-1,509,-21,509,-1,509,-10,509,509,-2,509,509,-1,509,509,-1,510,509,509,509,509,-2,509,509,509,509,509,509,509,509,-1,509,-2,509,509,509,509,-2,509,-4,509,509,-2,509,-2,509,-28,509,509,-2,509,509,509,509,509,-1,509,509,509],
sm382=[0,-4,0,-4,0,-40,53,-11,511],
sm383=[0,512,512,512,-1,0,-4,0,-4,512,512,512,-1,512,-21,512,-1,512,-10,512,512,-2,512,512,-1,512,512,-1,512,512,512,512,512,-2,512,512,512,512,512,512,512,512,-1,512,-2,512,512,512,512,-2,512,-4,512,512,-2,512,-2,512,-28,512,512,-2,512,512,512,512,512,-1,512,512,512],
sm384=[0,-4,0,-4,0,-40,53,-6,513],
sm385=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-7,12,514,-7,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm386=[0,-4,0,-4,0,-40,53,-11,515],
sm387=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-3,516,-3,12,-8,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm388=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-7,12,517,-7,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm389=[0,-4,0,-4,0,-40,53,-11,518],
sm390=[0,-4,0,-4,0,-40,53,-11,519],
sm391=[0,-4,0,-4,0,-52,520],
sm392=[0,-4,0,-4,0,-40,53,-11,521],
sm393=[0,-4,0,-4,0,-52,522],
sm394=[0,-4,0,-4,0,-59,523],
sm395=[0,-4,0,-4,0,-59,456],
sm396=[0,524,524,524,-1,0,-4,0,-4,524,524,524,-1,524,-21,524,-1,524,-10,524,524,-2,524,524,-1,524,524,-1,524,524,524,524,524,-2,524,524,524,524,524,524,524,524,-1,524,-2,524,524,524,524,-2,524,-4,524,524,-2,524,-2,524,-28,524,524,-2,524,524,524,524,524,-1,524,524,524],
sm397=[0,-4,0,-4,0,-44,525,-3,526,-18,527],
sm398=[0,528,528,528,-1,0,-4,0,-4,528,528,528,-1,528,-21,528,-1,528,-10,528,528,-2,528,528,-1,528,528,-1,528,528,528,528,528,-2,528,528,528,528,528,528,528,528,-1,528,-2,528,528,528,528,-2,528,-4,528,528,-2,528,-2,528,-28,528,528,-2,528,528,528,528,528,-1,528,528,528],
sm399=[0,-4,0,-4,0,-52,529],
sm400=[0,-4,0,-4,0,-52,530],
sm401=[0,-2,397,-1,398,-4,399,-3,400,465,-3,531,-27,467],
sm402=[0,-2,532,-1,532,-4,532,-3,532,532,-3,532,-27,532],
sm403=[0,-2,165,-1,0,-4,0,-10,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185],
sm404=[0,-2,397,-1,398,-4,399,-3,400,533,-3,533,-27,533],
sm405=[0,-2,533,-1,533,-4,533,-3,533,533,-3,533,-27,533],
sm406=[0,-2,534,-1,534,-4,534,-3,534,534,-2,534,534,534,-20,534,-1,534,-3,534],
sm407=[0,535,-1,535,-1,535,-4,535,-3,535,535,-3,535,-27,535,-10,535],
sm408=[0,-2,536,-1,0,-4,0,-7,536,-1,536,-20,536,-1,536],
sm409=[0,-2,537,-1,0,-4,0,-7,537,-1,537,-20,537,-1,537],
sm410=[0,-2,135,-1,136,-4,0,-3,137,-32,467],
sm411=[0,-2,538,-1,0,-4,0,-7,538,-1,538,-19,538,538,-1,538],
sm412=[0,-4,0,-4,0,-8,539],
sm413=[0,-4,0,-4,0,-7,540],
sm414=[0,-2,541,-1,541,-4,541,-3,541,541,-1,541,-1,541,-27,541],
sm415=[0,542,542,542,-1,0,-4,0,-4,542,542,542,542,542,542,-19,542,542,-1,542,-4,542,542,-1,542,542,-1,542,542,-2,542,542,-1,542,542,542,-1,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,-2,542,542,542,542,-2,542,-4,542,542,542,542,542,-2,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,542,-1,542,542,542],
sm416=[0,-1,2,3,-1,0,-4,0,-4,4,5,6,-23,7,-1,8,-10,9,543,-2,10,-2,11,12,-2,13,14,15,16,-2,17,18,19,20,21,22,23,-2,24,-2,25,26,27,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm417=[0,-4,0,-4,0,-52,544],
sm418=[0,-4,0,-4,0,-40,545,-11,545],
sm419=[0,-4,0,-4,0,-43,546],
sm420=[0,-4,0,-4,0,-43,547],
sm421=[0,-4,0,-4,0,-43,548],
sm422=[0,-4,0,-4,0,-52,549],
sm423=[0,-4,0,-4,0,-52,550],
sm424=[0,-4,0,-4,0,-40,551,-11,551],
sm425=[0,-4,0,-4,0,-4,552,-1,552,552,-1,552,-19,552,-7,552,552,-1,552,552,-1,552,552,-2,552,-3,552,552,-5,552,552,-8,552,-7,552,-7,552,552,552,-4,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,552,-4,552],
sm426=[0,-4,0,-4,0,-29,553,-10,553,-3,553,-7,553,-5,553,553,-25,553],
sm427=[0,-4,0,-4,0,-29,554,-10,554,-3,554,-7,554,-5,554,554,-25,554],
sm428=[0,-4,0,-4,0,-85,555],
sm429=[0,-4,0,-4,0,-47,556],
sm430=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-7,12,557,-7,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm431=[0,-4,0,-4,0,-40,53,-11,558],
sm432=[0,-4,0,-4,0,-40,53,-11,559],
sm433=[0,560,560,560,-1,0,-4,0,-4,560,560,560,-1,560,-21,560,-1,560,-10,560,560,-2,560,560,-1,560,560,-1,560,560,560,560,560,-2,560,560,560,560,560,560,560,560,-1,560,-2,560,560,560,560,-2,560,-4,560,560,-2,560,-2,560,-28,560,560,-2,560,560,560,560,560,-1,560,560,560],
sm434=[0,-4,0,-4,0,-40,53,-6,561],
sm435=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-7,12,562,-7,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm436=[0,-4,0,-4,0,-40,53,-11,563],
sm437=[0,-4,0,-4,0,-52,564],
sm438=[0,-4,0,-4,0,-40,53,-11,565],
sm439=[0,566,566,566,-1,0,-4,0,-4,566,566,566,-1,566,-21,566,-1,566,-10,566,566,-2,566,566,-1,566,566,-1,566,566,566,566,566,-2,566,566,566,566,566,566,566,566,-1,566,-2,566,566,566,566,-2,566,-4,566,566,-2,566,-2,566,-28,566,566,-2,566,566,566,566,566,-1,566,566,566],
sm440=[0,-4,0,-4,0,-52,567],
sm441=[0,-4,0,-4,0,-52,568],
sm442=[0,569,569,569,-1,0,-4,0,-4,569,569,569,-1,569,-21,569,-1,569,-10,569,569,-2,569,569,-1,569,569,-1,569,569,569,569,569,-2,569,569,569,569,569,569,569,569,-1,569,-2,569,569,569,569,-2,569,-4,569,569,-2,569,-2,569,-28,569,569,-2,569,569,569,569,569,-1,569,569,569],
sm443=[0,-4,0,-4,0,-44,570,-3,526,-18,527],
sm444=[0,-4,0,-4,0,-44,571,-22,527],
sm445=[0,-4,0,-4,0,-44,572,-3,572,-18,572],
sm446=[0,-4,0,-4,0,-44,573,-22,573,574],
sm447=[0,-2,165,-1,0,-4,0],
sm448=[0,-2,575,-1,575,-4,575,-3,575,575,-3,575,-27,575],
sm449=[0,-4,0,-4,0,-37,576,577,-1,53],
sm450=[0,-4,0,-4,0,-32,578],
sm451=[0,-4,0,-4,0,-10,579],
sm452=[0,580,-3,0,-4,0,-47,580],
sm453=[0,-4,0,-4,0,-44,581],
sm454=[0,-4,0,-4,0,-44,582],
sm455=[0,-4,0,-4,0,-43,583],
sm456=[0,-4,0,-4,0,-29,584,-10,584,-3,584,-7,584,-5,584,584,-25,584],
sm457=[0,585,585,585,-1,0,-4,0,-4,585,585,585,-1,585,-21,585,-1,585,-10,585,585,-2,585,585,-1,585,585,-1,585,585,585,585,585,-2,585,585,585,585,585,585,585,585,-1,585,-2,585,585,585,585,-2,585,-4,585,585,-2,585,-2,585,-28,585,585,-2,585,585,585,585,585,-1,585,585,585],
sm458=[0,586,586,586,-1,0,-4,0,-4,586,586,586,-1,586,-21,586,-1,586,-10,586,586,-2,586,586,-1,586,586,-1,586,586,586,586,586,-2,586,586,586,586,586,586,586,586,-1,586,-2,586,586,586,586,-2,586,-4,586,586,-2,586,-2,586,-28,586,586,-2,586,586,586,586,586,-1,586,586,586],
sm459=[0,-4,0,-4,0,-40,53,-11,587],
sm460=[0,588,588,588,-1,0,-4,0,-4,588,588,588,-1,588,-21,588,-1,588,-10,588,588,-2,588,588,-1,588,588,-1,588,588,588,588,588,-2,588,588,588,588,588,588,588,588,-1,588,-2,588,588,588,588,-2,588,-4,588,588,-2,588,-2,588,-28,588,588,-2,588,588,588,588,588,-1,588,588,588],
sm461=[0,589,589,589,-1,0,-4,0,-4,589,589,589,-1,589,-21,589,-1,589,-10,589,589,-2,589,589,-1,589,589,-1,589,589,589,589,589,-2,589,589,589,589,589,589,589,589,-1,589,-2,589,589,589,589,-2,589,-4,589,589,-2,589,-2,589,-28,589,589,-2,589,589,589,589,589,-1,589,589,589],
sm462=[0,-1,2,3,-1,0,-4,0,-5,5,6,-23,7,-1,8,-10,111,-7,12,590,-7,17,-14,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm463=[0,-4,0,-4,0,-40,53,-11,591],
sm464=[0,592,592,592,-1,0,-4,0,-4,592,592,592,-1,592,-21,592,-1,592,-10,592,592,-2,592,592,-1,592,592,-1,592,592,592,592,592,-2,592,592,592,592,592,592,592,592,-1,592,-2,592,592,592,592,-2,592,-4,592,592,-2,592,-2,592,-28,592,592,-2,592,592,592,592,592,-1,592,592,592],
sm465=[0,593,593,593,-1,0,-4,0,-4,593,593,593,-1,593,-21,593,-1,593,-10,593,593,-2,593,593,-1,593,593,-1,593,593,593,593,593,-2,593,593,593,593,593,593,593,593,-1,593,-2,593,593,593,593,-2,593,-4,593,593,-2,593,-2,593,-28,593,593,-2,593,593,593,593,593,-1,593,593,593],
sm466=[0,594,594,594,-1,0,-4,0,-4,594,594,594,-1,594,-21,594,-1,594,-10,594,594,-2,594,594,-1,594,594,-1,594,594,594,594,594,-2,594,594,594,594,594,594,594,594,-1,594,-2,594,594,594,594,-2,594,-4,594,594,-2,594,-2,594,-28,594,594,-2,594,594,594,594,594,-1,594,594,594],
sm467=[0,595,595,595,-1,0,-4,0,-4,595,595,595,-1,595,-21,595,-1,595,-10,595,595,-2,595,595,-1,595,595,-1,595,595,595,595,595,-2,595,595,595,595,595,595,595,595,-1,595,-2,595,595,595,595,-2,595,-4,595,595,-2,595,-2,595,-28,595,595,-2,595,595,595,595,595,-1,595,595,595],
sm468=[0,-4,0,-4,0,-52,596],
sm469=[0,-4,0,-4,0,-44,597,-22,527],
sm470=[0,598,598,598,-1,0,-4,0,-4,598,598,598,-1,598,-21,598,-1,598,-10,598,598,-2,598,598,-1,598,598,-1,598,598,598,598,598,-2,598,598,598,598,598,598,598,598,-1,598,-2,598,598,598,598,-2,598,-4,598,598,-2,598,-2,598,-28,598,598,-2,598,598,598,598,598,-1,598,598,598],
sm471=[0,-4,0,-4,0,-44,599,-3,599,-18,599],
sm472=[0,-4,0,-4,0,-44,600,-22,527],
sm473=[0,-4,0,-4,0,-40,53,-27,601],
sm474=[0,602,602,602,-1,0,-4,0,-4,602,602,602,-1,602,-21,602,-1,602,-10,602,602,-2,602,602,-1,602,602,-1,602,602,602,602,602,-2,602,602,602,602,602,602,602,602,-1,602,-1,602,602,602,602,602,-2,602,-4,602,602,-2,602,-2,602,-28,602,602,-2,602,602,602,602,602,-1,602,602,602],
sm475=[0,-4,0,-4,0,-7,603],
sm476=[0,-2,604,-1,604,-4,604,-3,604,604,-2,604,604,604,-20,604,-1,604,-3,604],
sm477=[0,-2,605,-1,0,-4,0,-7,605,-1,605,-20,605,-1,605],
sm478=[0,-4,0,-4,0,-7,606],
sm479=[0,607,607,607,-1,0,-4,0,-4,607,607,607,607,607,607,-19,607,607,-1,607,-4,607,607,-1,607,607,-1,607,607,-2,607,607,-1,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,-2,607,607,607,607,-2,607,-4,607,607,607,607,607,-2,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,607,-1,607,607,607],
sm480=[0,-4,0,-4,0,-44,608],
sm481=[0,-4,0,-4,0,-44,609],
sm482=[0,-4,0,-4,0,-44,610],
sm483=[0,611,611,611,-1,0,-4,0,-4,611,611,611,-1,611,-21,611,-1,611,-10,611,611,-2,611,611,-1,611,611,-1,611,611,611,611,611,-2,611,611,611,611,611,611,611,611,-1,611,-2,611,611,611,611,-2,611,-4,611,611,-2,611,-2,611,-28,611,611,-2,611,611,611,611,611,-1,611,611,611],
sm484=[0,612,612,612,-1,0,-4,0,-4,612,612,612,-1,612,-21,612,-1,612,-10,612,612,-2,612,612,-1,612,612,-1,612,612,612,612,612,-2,612,612,612,612,612,612,612,612,-1,612,-2,612,612,612,612,-2,612,-4,612,612,-2,612,-2,612,-28,612,612,-2,612,612,612,612,612,-1,612,612,612],
sm485=[0,613,613,613,-1,0,-4,0,-4,613,613,613,-1,613,-21,613,-1,613,-10,613,613,-2,613,613,-1,613,613,-1,613,613,613,613,613,-2,613,613,613,613,613,613,613,613,-1,613,-2,613,613,613,613,-2,613,-4,613,613,-2,613,-2,613,-28,613,613,-2,613,613,613,613,613,-1,613,613,613],
sm486=[0,-4,0,-4,0,-40,53,-11,614],
sm487=[0,615,615,615,-1,0,-4,0,-4,615,615,615,-1,615,-21,615,-1,615,-10,615,615,-2,615,615,-1,615,615,-1,615,615,615,615,615,-2,615,615,615,615,615,615,615,615,-1,615,-2,615,615,615,615,-2,615,-4,615,615,-2,615,-2,615,-28,615,615,-2,615,615,615,615,615,-1,615,615,615],
sm488=[0,616,616,616,-1,0,-4,0,-4,616,616,616,-1,616,-21,616,-1,616,-10,616,616,-2,616,616,-1,616,616,-1,616,616,616,616,616,-2,616,616,616,616,616,616,616,616,-1,616,-2,616,616,616,616,-2,616,-4,616,616,-2,616,-2,616,-28,616,616,-2,616,616,616,616,616,-1,616,616,616],
sm489=[0,617,617,617,-1,0,-4,0,-4,617,617,617,-1,617,-21,617,-1,617,-10,617,617,-2,617,617,-1,617,617,-1,617,617,617,617,617,-2,617,617,617,617,617,617,617,617,-1,617,-2,617,617,617,617,-2,617,-4,617,617,-2,617,-2,617,-28,617,617,-2,617,617,617,617,617,-1,617,617,617],
sm490=[0,618,618,618,-1,0,-4,0,-4,618,618,618,-1,618,-21,618,-1,618,-10,618,618,-2,618,618,-1,618,618,-1,618,618,618,618,618,-2,618,618,618,618,618,618,618,618,-1,618,-2,618,618,618,618,-2,618,-4,618,618,-2,618,-2,618,-28,618,618,-2,618,618,618,618,618,-1,618,618,618],
sm491=[0,619,619,619,-1,0,-4,0,-4,619,619,619,-1,619,-21,619,-1,619,-10,619,619,-2,619,619,-1,619,619,-1,619,619,619,619,619,-2,619,619,619,619,619,619,619,619,-1,619,-2,619,619,619,619,-2,619,-4,619,619,-2,619,-2,619,-28,619,619,-2,619,619,619,619,619,-1,619,619,619],
sm492=[0,-4,0,-4,0,-44,620],
sm493=[0,621,621,621,-1,0,-4,0,-4,621,621,621,-1,621,-21,621,-1,621,-10,621,621,-2,621,621,-1,621,621,-1,621,621,621,621,621,-2,621,621,621,621,621,621,621,621,-1,621,-2,621,621,621,621,-2,621,-4,621,621,-2,621,-2,621,-28,621,621,-2,621,621,621,621,621,-1,621,621,621],
sm494=[0,-1,2,3,-1,0,-4,0,-4,4,5,6,-23,7,-1,8,-10,9,622,-2,10,622,-1,11,12,-2,13,14,15,16,-2,17,18,19,20,21,22,23,622,-1,24,-2,25,26,27,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm495=[0,-1,2,3,-1,0,-4,0,-4,4,5,6,-23,7,-1,8,-10,9,623,-2,10,-2,11,12,-2,13,14,15,16,-2,17,18,19,20,21,22,23,623,-1,24,-2,25,26,27,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm496=[0,624,-1,624,-1,624,-4,624,-3,624,624,-3,624,-27,624,-10,624],
sm497=[0,-4,0,-4,0,-37,625,-2,53],
sm498=[0,626,626,626,-1,0,-4,0,-4,626,626,626,626,626,626,-19,626,626,-1,626,-4,626,626,-1,626,626,-1,626,626,-2,626,626,-1,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,-2,626,626,626,626,-2,626,-4,626,626,626,626,626,-2,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,626,-1,626,626,626],
sm499=[0,-1,627,627,-1,0,-4,0,-30,627,-1,627,-7,627,-3,627,-2,627,-32,627,627,627,-1,627],
sm500=[0,-1,628,628,-1,0,-4,0,-30,628,-1,628,-7,628,-3,628,-2,628,-32,628,628,628,-1,628],
sm501=[0,-4,0,-4,0,-44,629],
sm502=[0,630,630,630,-1,0,-4,0,-4,630,630,630,-1,630,-21,630,-1,630,-10,630,630,-2,630,630,-1,630,630,-1,630,630,630,630,630,-2,630,630,630,630,630,630,630,630,-1,630,-2,630,630,630,630,-2,630,-4,630,630,-2,630,-2,630,-28,630,630,-2,630,630,630,630,630,-1,630,630,630],
sm503=[0,631,631,631,-1,0,-4,0,-4,631,631,631,-1,631,-21,631,-1,631,-10,631,631,-2,631,631,-1,631,631,-1,631,631,631,631,631,-2,631,631,631,631,631,631,631,631,-1,631,-2,631,631,631,631,-2,631,-4,631,631,-2,631,-2,631,-28,631,631,-2,631,631,631,631,631,-1,631,631,631],
sm504=[0,632,632,632,-1,0,-4,0,-4,632,632,632,-1,632,-21,632,-1,632,-10,632,632,-2,632,632,-1,632,632,-1,632,632,632,632,632,-2,632,632,632,632,632,632,632,632,-1,632,-2,632,632,632,632,-2,632,-4,632,632,-2,632,-2,632,-28,632,632,-2,632,632,632,632,632,-1,632,632,632],
sm505=[0,633,633,633,-1,0,-4,0,-4,633,633,633,-1,633,-21,633,-1,633,-10,633,633,-2,633,633,-1,633,633,-1,633,633,633,633,633,-2,633,633,633,633,633,633,633,633,-1,633,-2,633,633,633,633,-2,633,-4,633,633,-2,633,-2,633,-28,633,633,-2,633,633,633,633,633,-1,633,633,633],
sm506=[0,634,634,634,-1,0,-4,0,-4,634,634,634,-1,634,-21,634,-1,634,-10,634,634,-2,634,634,-1,634,634,-1,634,634,634,634,634,-2,634,634,634,634,634,634,634,634,-1,634,-2,634,634,634,634,-2,634,-4,634,634,-2,634,-2,634,-28,634,634,-2,634,634,634,634,634,-1,634,634,634],
sm507=[0,-1,2,3,-1,0,-4,0,-4,4,5,6,-23,7,-1,8,-10,9,635,-2,10,635,-1,11,12,-2,13,14,15,16,-2,17,18,19,20,21,22,23,635,-1,24,-2,25,26,27,28,-2,29,-4,30,31,-2,32,-2,33,-28,34,35,-2,36,37,38,39,40,-1,41,42,43],
sm508=[0,-2,636,-1,636,-4,636,-3,636,636,-2,636,636,636,-20,636,-1,636,-3,636],
sm509=[0,-1,637,637,-1,0,-4,0,-30,637,-1,637,-7,637,-3,637,-2,637,-32,637,637,637,-1,637],
sm510=[0,638,638,638,-1,0,-4,0,-4,638,638,638,-1,638,-21,638,-1,638,-10,638,638,-2,638,638,-1,638,638,-1,638,638,638,638,638,-2,638,638,638,638,638,638,638,638,-1,638,-2,638,638,638,638,-2,638,-4,638,638,-2,638,-2,638,-28,638,638,-2,638,638,638,638,638,-1,638,638,638],

    // Symbol Lookup map
    lu = new Map([[1,1],[2,2],[4,3],[8,4],[16,5],[32,6],[64,7],[128,8],[256,9],[512,10],[3,11],[264,11],["any",13],["<",14],["!",15],["--",16],[">",17],["</",18],["/",19],["script",20],["input",21],["area",22],["base",23],["br",24],["col",25],["command",26],["embed",27],["hr",28],["img",29],["keygen",30],["link",31],["meta",32],["param",33],["source",34],["track",35],["wbr",36],["f",37],["filter",38],["=",39],["'",40],[null,1],["\"",42],["((",46],["))",47],[")(",48],["import",49],[",",50],["*",51],["as",52],["{",53],["}",54],["from",55],["export",56],[";",57],["default",58],["if",60],["(",61],[")",62],["else",63],["do",64],["while",65],["for",66],["var",67],["in",68],["of",69],["await",70],["continue",71],["break",72],["return",73],["throw",74],["with",75],["switch",76],["case",77],[":",78],["try",79],["catch",80],["finally",81],["debugger",82],["let",83],["const",84],["function",85],["=>",86],["async",87],["class",88],["extends",89],["static",90],["get",91],["set",92],["new",93],["[",94],["]",95],[".",96],["super",97],["target",98],["...",99],["this",100],["*=",101],["/=",102],["%=",103],["+=",104],["-=",105],["<<=",106],[">>=",107],[">>>=",108],["&=",109],["^=",110],["|=",111],["**=",112],["?",113],["||",114],["&&",115],["|",116],["^",117],["&",118],["==",119],["!=",120],["===",121],["!==",122],["<=",123],[">=",124],["instanceof",125],["<<",126],[">>",127],[">>>",128],["+",129],["-",130],["%",131],["**",132],["delete",133],["void",134],["typeof",135],["~",136],["++",137],["null",139],["true",140],["false",141]]),

    //Reverse Symbol Lookup map
    rlu = new Map([[1,1],[2,2],[3,4],[4,8],[5,16],[6,32],[7,64],[8,128],[9,256],[10,512],[11,3],[11,264],[13,"any"],[14,"<"],[15,"!"],[16,"--"],[17,">"],[18,"</"],[19,"/"],[20,"script"],[21,"input"],[22,"area"],[23,"base"],[24,"br"],[25,"col"],[26,"command"],[27,"embed"],[28,"hr"],[29,"img"],[30,"keygen"],[31,"link"],[32,"meta"],[33,"param"],[34,"source"],[35,"track"],[36,"wbr"],[37,"f"],[38,"filter"],[39,"="],[40,"'"],[1,null],[42,"\""],[46,"(("],[47,"))"],[48,")("],[49,"import"],[50,","],[51,"*"],[52,"as"],[53,"{"],[54,"}"],[55,"from"],[56,"export"],[57,";"],[58,"default"],[60,"if"],[61,"("],[62,")"],[63,"else"],[64,"do"],[65,"while"],[66,"for"],[67,"var"],[68,"in"],[69,"of"],[70,"await"],[71,"continue"],[72,"break"],[73,"return"],[74,"throw"],[75,"with"],[76,"switch"],[77,"case"],[78,":"],[79,"try"],[80,"catch"],[81,"finally"],[82,"debugger"],[83,"let"],[84,"const"],[85,"function"],[86,"=>"],[87,"async"],[88,"class"],[89,"extends"],[90,"static"],[91,"get"],[92,"set"],[93,"new"],[94,"["],[95,"]"],[96,"."],[97,"super"],[98,"target"],[99,"..."],[100,"this"],[101,"*="],[102,"/="],[103,"%="],[104,"+="],[105,"-="],[106,"<<="],[107,">>="],[108,">>>="],[109,"&="],[110,"^="],[111,"|="],[112,"**="],[113,"?"],[114,"||"],[115,"&&"],[116,"|"],[117,"^"],[118,"&"],[119,"=="],[120,"!="],[121,"==="],[122,"!=="],[123,"<="],[124,">="],[125,"instanceof"],[126,"<<"],[127,">>"],[128,">>>"],[129,"+"],[130,"-"],[131,"%"],[132,"**"],[133,"delete"],[134,"void"],[135,"typeof"],[136,"~"],[137,"++"],[139,"null"],[140,"true"],[141,"false"]]),

    // States 
    state = [sm0,
sm1,
sm2,
sm3,
sm4,
sm5,
sm6,
sm7,
sm7,
sm8,
sm8,
sm8,
sm8,
sm8,
sm8,
sm8,
sm8,
sm8,
sm8,
sm8,
sm8,
sm8,
sm8,
sm8,
sm9,
sm10,
sm11,
sm12,
sm13,
sm13,
sm14,
sm15,
sm16,
sm17,
sm18,
sm19,
sm20,
sm21,
sm22,
sm23,
sm24,
sm25,
sm26,
sm27,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm29,
sm28,
sm28,
sm30,
sm31,
sm32,
sm33,
sm34,
sm34,
sm34,
sm35,
sm36,
sm36,
sm37,
sm36,
sm36,
sm38,
sm39,
sm40,
sm41,
sm42,
sm42,
sm42,
sm42,
sm43,
sm43,
sm44,
sm45,
sm46,
sm46,
sm47,
sm48,
sm49,
sm50,
sm51,
sm52,
sm52,
sm28,
sm53,
sm54,
sm55,
sm56,
sm57,
sm58,
sm59,
sm59,
sm60,
sm61,
sm62,
sm63,
sm64,
sm65,
sm66,
sm67,
sm28,
sm68,
sm69,
sm70,
sm70,
sm71,
sm72,
sm72,
sm72,
sm73,
sm74,
sm75,
sm56,
sm76,
sm77,
sm78,
sm79,
sm80,
sm81,
sm82,
sm28,
sm28,
sm28,
sm83,
sm84,
sm85,
sm85,
sm85,
sm85,
sm85,
sm85,
sm85,
sm85,
sm85,
sm85,
sm85,
sm85,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm28,
sm86,
sm29,
sm87,
sm88,
sm36,
sm89,
sm90,
sm91,
sm92,
sm93,
sm94,
sm95,
sm96,
sm97,
sm98,
sm99,
sm100,
sm101,
sm102,
sm28,
sm103,
sm28,
sm101,
sm104,
sm105,
sm32,
sm106,
sm107,
sm108,
sm109,
sm110,
sm110,
sm110,
sm111,
sm112,
sm113,
sm114,
sm115,
sm116,
sm116,
sm117,
sm28,
sm118,
sm119,
sm56,
sm101,
sm28,
sm120,
sm121,
sm122,
sm123,
sm124,
sm125,
sm126,
sm127,
sm128,
sm129,
sm130,
sm130,
sm131,
sm132,
sm28,
sm133,
sm28,
sm134,
sm135,
sm28,
sm136,
sm137,
sm138,
sm139,
sm140,
sm141,
sm142,
sm28,
sm143,
sm144,
sm145,
sm146,
sm147,
sm148,
sm149,
sm150,
sm151,
sm151,
sm151,
sm151,
sm151,
sm151,
sm151,
sm151,
sm151,
sm151,
sm151,
sm151,
sm151,
sm151,
sm151,
sm151,
sm151,
sm151,
sm152,
sm153,
sm154,
sm155,
sm156,
sm157,
sm158,
sm159,
sm160,
sm128,
sm128,
sm161,
sm162,
sm163,
sm163,
sm164,
sm165,
sm166,
sm167,
sm168,
sm169,
sm170,
sm171,
sm172,
sm173,
sm174,
sm175,
sm176,
sm177,
sm178,
sm179,
sm180,
sm181,
sm182,
sm183,
sm184,
sm185,
sm186,
sm187,
sm188,
sm189,
sm190,
sm191,
sm192,
sm193,
sm194,
sm193,
sm28,
sm195,
sm196,
sm196,
sm197,
sm198,
sm198,
sm28,
sm199,
sm199,
sm200,
sm201,
sm202,
sm203,
sm204,
sm28,
sm205,
sm206,
sm207,
sm208,
sm209,
sm210,
sm209,
sm211,
sm212,
sm213,
sm213,
sm214,
sm215,
sm216,
sm217,
sm218,
sm219,
sm220,
sm221,
sm222,
sm223,
sm224,
sm225,
sm10,
sm226,
sm227,
sm227,
sm228,
sm56,
sm229,
sm28,
sm229,
sm230,
sm231,
sm232,
sm101,
sm233,
sm234,
sm235,
sm236,
sm237,
sm238,
sm239,
sm240,
sm56,
sm241,
sm242,
sm243,
sm244,
sm245,
sm246,
sm247,
sm248,
sm249,
sm56,
sm250,
sm251,
sm252,
sm56,
sm253,
sm254,
sm255,
sm256,
sm257,
sm258,
sm259,
sm260,
sm261,
sm262,
sm68,
sm263,
sm264,
sm265,
sm266,
sm267,
sm268,
sm269,
sm270,
sm271,
sm272,
sm273,
sm274,
sm275,
sm276,
sm277,
sm278,
sm279,
sm278,
sm280,
sm281,
sm282,
sm283,
sm284,
sm285,
sm286,
sm287,
sm288,
sm157,
sm289,
sm56,
sm290,
sm290,
sm28,
sm291,
sm292,
sm293,
sm294,
sm295,
sm157,
sm28,
sm296,
sm297,
sm298,
sm299,
sm300,
sm301,
sm302,
sm303,
sm304,
sm305,
sm305,
sm306,
sm307,
sm56,
sm308,
sm308,
sm309,
sm310,
sm311,
sm312,
sm313,
sm314,
sm314,
sm315,
sm316,
sm56,
sm317,
sm318,
sm319,
sm320,
sm319,
sm319,
sm321,
sm322,
sm322,
sm323,
sm60,
sm28,
sm60,
sm324,
sm325,
sm326,
sm327,
sm328,
sm329,
sm330,
sm331,
sm332,
sm28,
sm28,
sm28,
sm28,
sm333,
sm330,
sm330,
sm334,
sm56,
sm335,
sm56,
sm336,
sm60,
sm337,
sm56,
sm338,
sm339,
sm340,
sm341,
sm342,
sm343,
sm344,
sm345,
sm346,
sm347,
sm348,
sm349,
sm349,
sm349,
sm349,
sm350,
sm351,
sm352,
sm353,
sm354,
sm355,
sm356,
sm357,
sm358,
sm359,
sm360,
sm361,
sm362,
sm363,
sm364,
sm365,
sm366,
sm56,
sm367,
sm368,
sm28,
sm369,
sm370,
sm371,
sm372,
sm373,
sm374,
sm375,
sm376,
sm377,
sm377,
sm378,
sm379,
sm380,
sm381,
sm382,
sm383,
sm384,
sm385,
sm28,
sm386,
sm60,
sm387,
sm28,
sm28,
sm388,
sm389,
sm60,
sm390,
sm391,
sm392,
sm393,
sm28,
sm394,
sm395,
sm395,
sm28,
sm396,
sm397,
sm398,
sm399,
sm400,
sm400,
sm401,
sm402,
sm402,
sm403,
sm404,
sm405,
sm406,
sm406,
sm28,
sm407,
sm408,
sm409,
sm409,
sm409,
sm410,
sm411,
sm411,
sm407,
sm412,
sm413,
sm414,
sm415,
sm416,
sm417,
sm418,
sm419,
sm420,
sm421,
sm422,
sm423,
sm424,
sm425,
sm425,
sm426,
sm427,
sm428,
sm427,
sm60,
sm429,
sm430,
sm431,
sm60,
sm432,
sm60,
sm433,
sm434,
sm435,
sm436,
sm437,
sm438,
sm60,
sm60,
sm439,
sm60,
sm60,
sm60,
sm60,
sm440,
sm28,
sm441,
sm442,
sm443,
sm444,
sm445,
sm28,
sm446,
sm68,
sm447,
sm448,
sm448,
sm449,
sm450,
sm451,
sm452,
sm453,
sm454,
sm416,
sm416,
sm416,
sm455,
sm456,
sm457,
sm458,
sm459,
sm60,
sm60,
sm460,
sm60,
sm461,
sm462,
sm463,
sm60,
sm60,
sm60,
sm60,
sm464,
sm465,
sm466,
sm467,
sm466,
sm467,
sm60,
sm468,
sm60,
sm469,
sm470,
sm471,
sm472,
sm470,
sm473,
sm10,
sm474,
sm475,
sm28,
sm476,
sm477,
sm478,
sm479,
sm480,
sm481,
sm482,
sm416,
sm60,
sm483,
sm484,
sm485,
sm486,
sm60,
sm60,
sm487,
sm488,
sm489,
sm490,
sm491,
sm60,
sm491,
sm492,
sm493,
sm493,
sm494,
sm495,
sm496,
sm497,
sm496,
sm498,
sm499,
sm500,
sm501,
sm502,
sm60,
sm503,
sm504,
sm505,
sm506,
sm507,
sm508,
sm509,
sm510],

/************ Functions *************/

    max = Math.max,

    //Error Functions
    e$2 = (...d)=>fn.defaultError(...d), 
    eh = [e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2,
e$2],

    //Empty Function
    nf = ()=>-1, 

    //Environment Functions
    
redv = (ret, fn, plen, ln, t, e, o, l, s) => {        ln = max(o.length - plen, 0);        o[ln] = fn(o.slice(-plen), e, l, s);        o.length = ln + 1;        return ret;    },
rednv = (ret, Fn, plen, ln, t, e, o, l, s) => {        ln = max(o.length - plen, 0);        o[ln] = new Fn(o.slice(-plen), e, l, s);        o.length = ln + 1;        return ret;    },
redn = (ret, t, e, o) => (o.push(null), ret),
shftf = (ret, fn, t, e, o, l, s) => (fn(o, e, l, s), ret),
R0_S=function (sym,env,lex,state) {return sym[0]},
R0_TAG_BODY=function (sym,env,lex,state) {return sym[0].push(sym[1]), sym[0]},
R1_TAG_BODY=function (sym,env,lex,state) {return [sym[0]]},
R0_ATTRIBUTE_HEAD=function (sym,env,lex,state) {return sym[1]},
R0_BODY_STRING=function (sym,env,lex,state) {return sym[0] + sym[1]},
R1_BODY_STRING=function (sym,env,lex,state) {return sym[0] + ""},
I0_BASIC_BINDING=function (sym,env,lex,state) {env.start = lex.off+2;},
R0_statement_list=function (sym,env,lex,state) {return (sym[0].push(sym[1]), sym[0]);},
C0_empty_statement=function (sym,env,lex,state) {this.type = "empty";},
R0_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_stmt(sym[2], sym[4], sym[6], sym[8]))},
I1_iteration_statement=function (sym,env,lex,state) {env.ASI = false;},
I2_iteration_statement=function (sym,env,lex,state) {env.ASI = true;},
R3_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_stmt(null, sym[4], sym[6], sym[8]))},
R4_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_stmt(sym[2], null, sym[6], sym[8]))},
R5_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_stmt(sym[2], sym[4], null, sym[8]))},
R6_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_stmt(null, null, sym[4], sym[6]))},
R7_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_stmt(sym[2], null, null, sym[8]))},
R8_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_stmt(null, null, null, sym[5]))},
R9_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_stmt(sym[3], sym[5], sym[7], sym[9]))},
R10_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_stmt(sym[3], sym[5], null, sym[9]))},
R11_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_stmt(sym[3], null, sym[7], sym[9]))},
R12_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_stmt(sym[3], null , null, sym[9]))},
R13_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_stmt(sym[2], sym[3], null, sym[6]))},
R14_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_stmt(sym[2], null, sym[5], sym[6]))},
R15_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_stmt(sym[2], null, null, sym[5]))},
R16_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_in_stmt(sym[2], sym[4], sym[6]))},
R17_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_in_stmt(sym[3], sym[5], sym[7]))},
R18_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_of_stmt(sym[2], sym[4], sym[6]))},
R19_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_of_stmt(sym[3], sym[5], sym[7], true))},
R20_iteration_statement=function (sym,env,lex,state) {return (new env.functions.for_of_stmt(sym[4], sym[6], sym[8], true))},
R0_continue_statement=function (sym,env,lex,state) {return (new env.functions.continue_stmt(sym[1]))},
R0_break_statement=function (sym,env,lex,state) {return (new env.functions.break_stmt(sym[1]))},
R0_case_block=function (sym,env,lex,state) {return []},
R1_case_block=function (sym,env,lex,state) {return sym[1].concat(sym[2].concat(sym[3]))},
R2_case_block=function (sym,env,lex,state) {return sym[1].concat(sym[2])},
R0_case_clauses=function (sym,env,lex,state) {return sym[0].concat(sym[1])},
R0_case_clause=function (sym,env,lex,state) {return (new env.functions.case_stmt(sym[1], sym[3]))},
R1_case_clause=function (sym,env,lex,state) {return (new env.functions.case_stmt(sym[1]))},
R0_default_clause=function (sym,env,lex,state) {return (new env.functions.default_case_stmt(sym[2]))},
R1_default_clause=function (sym,env,lex,state) {return (new env.functions.default_case_stmt())},
R0_try_statement=function (sym,env,lex,state) {return (new env.functions.try_stmt(sym[1],sym[2]))},
R1_try_statement=function (sym,env,lex,state) {return (new env.functions.try_stmt(sym[1],null ,sym[2]))},
R2_try_statement=function (sym,env,lex,state) {return (new env.functions.try_stmt(sym[1], sym[2], sym[3]))},
R0_variable_declaration_list=function (sym,env,lex,state) {return sym[0].push(sym[2])},
R0_let_or_const=function (sym,env,lex,state) {return "let"},
R1_let_or_const=function (sym,env,lex,state) {return "const"},
R0_function_declaration=function (sym,env,lex,state) {return new env.functions.funct_decl(null, sym[2], sym[5])},
R1_function_declaration=function (sym,env,lex,state) {return new env.functions.funct_decl(sym[1], sym[3], sym[6])},
R0_formal_parameters=function (sym,env,lex,state) {return (sym[0].push(sym[2]), sym[0])},
R0_arrow_function=function (sym,env,lex,state) {return new env.functions.funct_decl(null, sym[0], sym[2])},
R0_class_tail=function (sym,env,lex,state) {return new env.functions.class_tail(sym)},
R1_class_tail=function (sym,env,lex,state) {return new env.functions.class_tail([null, ... sym[0]])},
R2_class_tail=function (sym,env,lex,state) {return new env.functions.class_tail([sym[0], null, null])},
R3_class_tail=function (sym,env,lex,state) {return null},
R0_class_element_list=function (sym,env,lex,state) {return (sym[0].push(sym[1]))},
R0_class_element=function (sym,env,lex,state) {return (sym[1].static = true, sym[1])},
R0_expression=function (sym,env,lex,state) {return Array.isArray(sym[0]) ? (sym[0].push(sym[2]) , sym[0]) : [sym[0], sym[2]];},
R0_arguments=function (sym,env,lex,state) {return [];},
R0_argument_list=function (sym,env,lex,state) {return (sym[0].push(new env.functions.spread_expr(env, sym.slice(2,4))), env[0])},
C0_property_definition=function (sym,env,lex,state) {this.id = sym[0];},
C0_colon_assignment=function (sym,env,lex,state) {this.id = sym[0]; this.expr = sym[1];},
R0_array_literal=function (sym,env,lex,state) {return [ ]},
R0_element_list=function (sym,env,lex,state) {return [sym[1]]},
R1_element_list=function (sym,env,lex,state) {return (sym[0].push(sym[2]),sym[0])},
R0_cover_parenthesized_expression_and_arrow_parameter_list=function (sym,env,lex,state) {return null;},
R1_cover_parenthesized_expression_and_arrow_parameter_list=function (sym,env,lex,state) {return new env.functions.spread_expr(env, sym.slice(1,3))},
R2_cover_parenthesized_expression_and_arrow_parameter_list=function (sym,env,lex,state) {return Array.isArray(sym[0]) ? (sym[1].push(new env.functions.spread_expr(env, sym.slice(3,5))) , sym[1]) : [sym[0], new env.functions.spread_expr(env, sym.slice(3,5))];},

    //Sparse Map Lookup
    lsm = (index, map) => {    if (map[0] == 0xFFFFFFFF) return map[index+1];    for (let i = 1, ind = 0, l = map.length, n = 0; i < l && ind <= index; i++) {        if (ind !== index) {            if ((n = map[i]) > -1) ind++;            else ind += -n;        } else return map[i];    }    return -1;},

    //State Action Functions
    state_funct = [(...v)=>((redn(36867,...v))),
()=>(326),
()=>(282),
()=>(442),
()=>(202),
()=>(214),
()=>(322),
()=>(318),
()=>(102),
()=>(374),
()=>(378),
()=>(334),
()=>(390),
()=>(394),
()=>(398),
()=>(370),
()=>(354),
()=>(406),
()=>(410),
()=>(414),
()=>(422),
()=>(418),
()=>(402),
()=>(426),
()=>(430),
()=>(474),
()=>(478),
()=>(466),
()=>(458),
()=>(230),
()=>(330),
()=>(338),
()=>(246),
()=>(190),
()=>(194),
()=>(178),
()=>(182),
()=>(186),
()=>(198),
()=>(210),
()=>(310),
()=>(302),
()=>(306),
(...v)=>(redv(5,R0_S,1,0,...v)),
()=>(1031),
()=>(482),
(...v)=>(redv(36871,R0_S,1,0,...v)),
(...v)=>(rednv(37895,fn.stmts,1,0,...v)),
(...v)=>(redv(38919,R1_TAG_BODY,1,0,...v)),
()=>(39943),
()=>(40967),
()=>(46087),
()=>(502),
()=>(498),
(...v)=>(redv(105479,R0_S,1,0,...v)),
()=>(132103),
()=>(147463),
()=>(518),
()=>(506),
()=>(522),
()=>(526),
()=>(530),
()=>(534),
()=>(538),
()=>(542),
()=>(546),
()=>(550),
()=>(554),
()=>(558),
()=>(562),
()=>(566),
()=>(514),
()=>(134151),
()=>(570),
()=>(574),
()=>(135175),
()=>(578),
()=>(136199),
()=>(582),
()=>(137223),
()=>(586),
()=>(138247),
()=>(590),
()=>(139271),
()=>(594),
()=>(598),
()=>(602),
()=>(606),
()=>(610),
()=>(614),
()=>(140295),
()=>(630),
()=>(618),
()=>(622),
()=>(626),
()=>(141319),
()=>(634),
()=>(638),
()=>(642),
()=>(142343),
()=>(646),
()=>(650),
()=>(143367),
()=>(658),
()=>(654),
()=>(662),
()=>(144391),
()=>(145415),
()=>(146439),
()=>(666),
()=>(694),
()=>(106503),
()=>(750),
()=>(746),
()=>(738),
()=>(107527),
()=>(754),
()=>(758),
()=>(774),
()=>(778),
()=>(108551),
(...v)=>(rednv(116743,fn.this_expr,1,0,...v)),
()=>(116743),
(...v)=>(rednv(116743,fn.array_literal,1,0,...v)),
()=>(90119),
()=>(167943),
()=>(166919),
()=>(168967),
()=>(169991),
(...v)=>(rednv(171015,fn.identifier,1,0,...v)),
()=>(161799),
(...v)=>(rednv(165895,fn.bool_literal,1,0,...v)),
(...v)=>(rednv(164871,fn.null_literal,1,0,...v)),
(...v)=>(rednv(162823,fn.string_literal,1,0,...v)),
()=>(790),
()=>(794),
()=>(798),
(...v)=>(rednv(163847,fn.numeric_literal,1,0,...v)),
()=>(818),
()=>(806),
()=>(834),
()=>(838),
()=>(846),
()=>(854),
()=>(850),
()=>(110599),
()=>(112647),
()=>(866),
()=>(874),
()=>(906),
()=>(910),
(...v)=>(rednv(48135,C0_empty_statement,1,0,...v)),
()=>(914),
()=>(45063),
()=>(922),
(...v)=>(shftf(926,I1_iteration_statement,...v)),
()=>(930),
()=>(934),
()=>(938),
()=>(950),
()=>(958),
()=>(966),
()=>(978),
()=>(2055),
()=>(998),
()=>(994),
()=>(990),
()=>(1002),
()=>(1006),
()=>(1010),
()=>(1014),
()=>(1018),
()=>(1022),
()=>(1026),
()=>(1030),
()=>(1034),
()=>(1038),
()=>(1042),
()=>(1046),
()=>(1050),
()=>(1054),
()=>(1058),
()=>(1062),
()=>(1066),
()=>(1070),
()=>(43015),
()=>(1086),
()=>(1090),
()=>(44039),
()=>(1094),
(...v)=>(redv(76807,R0_let_or_const,1,0,...v)),
(...v)=>(redv(76807,R1_let_or_const,1,0,...v)),
(...v)=>(redv(41995,R0_S,2,0,...v)),
(...v)=>(redv(38923,R0_statement_list,2,0,...v)),
()=>(1118),
(...v)=>(redv(49163,R0_S,2,0,...v)),
(...v)=>(rednv(147467,fn.post_inc_expr,2,0,...v)),
(...v)=>(rednv(147467,fn.post_dec_expr,2,0,...v)),
()=>(133127),
(...v)=>(rednv(146443,fn.delete_expr,2,0,...v)),
(...v)=>(rednv(116743,fn.object,1,0,...v)),
()=>(1234),
()=>(1294),
()=>(1298),
()=>(1290),
()=>(1262),
()=>(79879),
()=>(96263),
(...v)=>(rednv(146443,fn.void_expr,2,0,...v)),
(...v)=>(rednv(146443,fn.typeof_expr,2,0,...v)),
(...v)=>(rednv(146443,fn.plus_expr,2,0,...v)),
(...v)=>(rednv(146443,fn.negate_expr,2,0,...v)),
(...v)=>(rednv(146443,fn.unary_or_expr,2,0,...v)),
(...v)=>(rednv(146443,fn.unary_not_expr,2,0,...v)),
(...v)=>(rednv(147467,fn.pre_inc_expr,2,0,...v)),
(...v)=>(rednv(147467,fn.pre_dec_expr,2,0,...v)),
(...v)=>(rednv(112651,fn.call_expr,2,0,...v)),
()=>(1310),
()=>(1322),
(...v)=>(rednv(95243,fn.call_expr,2,0,...v)),
(...v)=>(rednv(107531,fn.new_expr,2,0,...v)),
()=>(1338),
()=>(1342),
(...v)=>(redv(173063,R1_BODY_STRING,1,0,...v)),
()=>(174087),
()=>(1350),
(...v)=>(redv(128011,R0_array_literal,2,0,...v)),
()=>(1358),
()=>(1354),
()=>(1378),
()=>(1370),
()=>(130055),
(...v)=>(redv(129031,R1_TAG_BODY,1,0,...v)),
(...v)=>(redv(149515,R0_cover_parenthesized_expression_and_arrow_parameter_list,2,0,...v)),
()=>(1390),
()=>(1386),
()=>(113675),
(...v)=>(rednv(148491,fn.await_expr,2,0,...v)),
()=>(1418),
(...v)=>(rednv(64523,fn.label_stmt,2,0,...v)),
()=>(1438),
()=>(1434),
(...v)=>(redv(73735,R1_TAG_BODY,1,0,...v)),
()=>(1446),
(...v)=>(rednv(74759,fn.binding,1,0,...v)),
()=>(150535),
()=>(1454),
()=>(1466),
()=>(1486),
()=>(1502),
()=>(1526),
()=>(1538),
()=>(1542),
()=>(1562),
(...v)=>(rednv(54283,fn.continue_stmt,2,0,...v)),
()=>(1570),
(...v)=>(rednv(55307,fn.break_stmt,2,0,...v)),
()=>(1574),
(...v)=>(rednv(56331,fn.return_stmt,2,0,...v)),
()=>(1578),
()=>(1586),
()=>(1598),
()=>(1602),
(...v)=>(rednv(71691,fn.debugger_stmt,2,0,...v)),
()=>(1626),
(...v)=>((redn(7171,...v))),
()=>(1618),
()=>(1622),
()=>(1638),
()=>(11271),
()=>(5127),
(...v)=>(rednv(97291,fn.class_stmt,2,0,...v)),
()=>(1646),
()=>(1654),
()=>(1674),
()=>(1670),
(...v)=>((redn(82947,...v))),
()=>(1714),
()=>(1722),
()=>(1718),
(...v)=>(redv(77831,R1_TAG_BODY,1,0,...v)),
(...v)=>(rednv(47119,fn.block,3,0,...v)),
(...v)=>(redv(105487,R0_expression,3,0,...v)),
(...v)=>(rednv(132111,fn.assign,3,0,...v)),
()=>(1734),
(...v)=>(rednv(135183,fn.or,3,0,...v)),
(...v)=>(rednv(136207,fn.and,3,0,...v)),
(...v)=>(rednv(137231,fn.bit_or,3,0,...v)),
(...v)=>(rednv(138255,fn.bit_xor,3,0,...v)),
(...v)=>(rednv(139279,fn.bit_and,3,0,...v)),
(...v)=>(rednv(140303,fn.eq,3,0,...v)),
(...v)=>(rednv(140303,fn.neq,3,0,...v)),
(...v)=>(rednv(140303,fn.strict_eq,3,0,...v)),
(...v)=>(rednv(140303,fn.strict_neq,3,0,...v)),
(...v)=>(rednv(141327,fn.lt,3,0,...v)),
(...v)=>(rednv(141327,fn.gt,3,0,...v)),
(...v)=>(rednv(141327,fn.lteq,3,0,...v)),
(...v)=>(rednv(141327,fn.gteq,3,0,...v)),
(...v)=>(rednv(141327,fn.instanceof_expr,3,0,...v)),
(...v)=>(rednv(141327,fn.in,3,0,...v)),
(...v)=>(rednv(142351,fn.l_shift,3,0,...v)),
(...v)=>(rednv(142351,fn.r_shift,3,0,...v)),
(...v)=>(rednv(142351,fn.r_shift_fill,3,0,...v)),
(...v)=>(rednv(143375,fn.add,3,0,...v)),
(...v)=>(rednv(143375,fn.sub,3,0,...v)),
(...v)=>(rednv(144399,fn.mult,3,0,...v)),
(...v)=>(rednv(144399,fn.div,3,0,...v)),
(...v)=>(rednv(144399,fn.mod,3,0,...v)),
(...v)=>(rednv(145423,fn.exp,3,0,...v)),
(...v)=>(redv(117771,R3_class_tail,2,0,...v)),
()=>(1742),
()=>(1738),
(...v)=>(redv(118791,R1_TAG_BODY,1,0,...v)),
()=>(119815),
(...v)=>(rednv(119815,C0_property_definition,1,0,...v)),
()=>(1758),
()=>(1762),
()=>(122887),
()=>(123911),
(...v)=>(rednv(112655,fn.call_expr,3,0,...v)),
()=>(1778),
(...v)=>(redv(114699,R0_arguments,2,0,...v)),
()=>(1786),
()=>(1782),
(...v)=>(redv(115719,R1_TAG_BODY,1,0,...v)),
()=>(1794),
(...v)=>(rednv(108559,fn.member,3,0,...v)),
(...v)=>(rednv(108559,fn.new_member_stmt,3,0,...v)),
(...v)=>(rednv(111631,fn.new_target_expr,3,0,...v)),
(...v)=>(redv(172047,R0_ATTRIBUTE_HEAD,3,0,...v)),
(...v)=>(redv(173067,R0_BODY_STRING,2,0,...v)),
(...v)=>(redv(128015,R0_array_literal,3,0,...v)),
()=>(130059),
(...v)=>(redv(129035,R0_element_list,2,0,...v)),
(...v)=>(redv(128015,R0_ATTRIBUTE_HEAD,3,0,...v)),
()=>(1798),
(...v)=>(rednv(131083,fn.spread_expr,2,0,...v)),
(...v)=>(redv(149519,R0_ATTRIBUTE_HEAD,3,0,...v)),
()=>(1814),
()=>(1818),
()=>(1822),
()=>(1826),
(...v)=>(rednv(109583,fn.supper_expr,3,0,...v)),
()=>(1830),
(...v)=>(redv(89103,R0_arrow_function,3,0,...v)),
()=>(91143),
(...v)=>(redv(65547,R0_ATTRIBUTE_HEAD,2,0,...v)),
()=>(66567),
(...v)=>(rednv(72719,fn.var_stmt,3,0,...v)),
(...v)=>(rednv(74763,fn.binding,2,0,...v)),
()=>(151563),
()=>(1850),
()=>(1858),
()=>(1854),
()=>(154631),
()=>(157703),
()=>(1866),
()=>(159751),
()=>(152587),
()=>(1878),
()=>(1886),
()=>(1894),
()=>(1890),
()=>(155655),
()=>(156679),
()=>(158727),
()=>(1910),
()=>(1914),
()=>(1918),
()=>(1922),
()=>(1930),
()=>(1954),
()=>(1958),
()=>(1962),
()=>(1966),
()=>(1970),
()=>(1990),
()=>(2002),
(...v)=>(redv(54287,R0_continue_statement,3,0,...v)),
(...v)=>(redv(55311,R0_break_statement,3,0,...v)),
(...v)=>(rednv(56335,fn.return_stmt,3,0,...v)),
()=>(2006),
(...v)=>(rednv(57359,fn.throw_stmt,3,0,...v)),
(...v)=>(redv(67599,R0_try_statement,3,0,...v)),
(...v)=>(redv(67599,R1_try_statement,3,0,...v)),
()=>(2014),
()=>(2022),
()=>(2026),
(...v)=>(redv(7175,R1_TAG_BODY,1,0,...v)),
(...v)=>(rednv(8199,fn.attribute,1,0,...v)),
()=>(2034),
()=>(2038),
()=>(2042),
()=>(9223),
()=>(2046),
()=>(2050),
()=>(2062),
()=>(2070),
()=>(2074),
()=>(2066),
(...v)=>(rednv(97295,fn.class_stmt,3,0,...v)),
()=>(2082),
()=>(2086),
(...v)=>(redv(98315,R3_class_tail,2,0,...v)),
()=>(100359),
(...v)=>(redv(101383,R1_TAG_BODY,1,0,...v)),
()=>(102407),
(...v)=>(redv(99339,R0_ATTRIBUTE_HEAD,2,0,...v)),
()=>(2098),
()=>(82951),
()=>(2102),
()=>(84999),
(...v)=>(redv(83975,R1_TAG_BODY,1,0,...v)),
()=>(86023),
(...v)=>(rednv(75791,fn.lexical,3,0,...v)),
(...v)=>(rednv(78859,fn.binding,2,0,...v)),
(...v)=>(redv(117775,R0_ATTRIBUTE_HEAD,3,0,...v)),
()=>(2118),
()=>(125963),
(...v)=>(rednv(119819,fn.spread_expr,2,0,...v)),
(...v)=>(rednv(120843,C0_colon_assignment,2,0,...v)),
()=>(2138),
()=>(2142),
()=>(2146),
(...v)=>(rednv(112659,fn.call_expr,4,0,...v)),
(...v)=>(redv(114703,R0_ATTRIBUTE_HEAD,3,0,...v)),
()=>(2150),
()=>(2158),
(...v)=>(rednv(115723,fn.spread_expr,2,0,...v)),
(...v)=>(rednv(108563,fn.member,4,0,...v)),
(...v)=>(redv(128019,R0_ATTRIBUTE_HEAD,4,0,...v)),
(...v)=>(redv(129039,R1_element_list,3,0,...v)),
(...v)=>(redv(149523,R0_ATTRIBUTE_HEAD,4,0,...v)),
(...v)=>(redv(149523,R1_cover_parenthesized_expression_and_arrow_parameter_list,4,0,...v)),
(...v)=>(rednv(109587,fn.supper_expr,4,0,...v)),
()=>(2174),
()=>(88071),
(...v)=>(redv(73743,R0_variable_declaration_list,3,0,...v)),
(...v)=>(redv(126987,R0_ATTRIBUTE_HEAD,2,0,...v)),
()=>(151567),
()=>(2182),
()=>(153611),
()=>(159755),
()=>(2194),
()=>(152591),
()=>(156683),
()=>(2198),
()=>(160779),
()=>(158731),
()=>(2230),
()=>(2234),
()=>(2242),
()=>(2246),
()=>(2250),
()=>(2254),
()=>(53255),
()=>(2258),
()=>(2266),
()=>(52235),
()=>(2286),
()=>(2302),
()=>(2310),
(...v)=>(redv(67603,R2_try_statement,4,0,...v)),
(...v)=>(rednv(69643,fn.finally_stmt,2,0,...v)),
()=>(2342),
(...v)=>((redn(6147,...v))),
(...v)=>(shftf(2362,I0_BASIC_BINDING,...v)),
()=>(2366),
(...v)=>(redv(7179,R0_TAG_BODY,2,0,...v)),
()=>(2378),
()=>(2386),
()=>(2390),
()=>(2394),
()=>(2398),
()=>(2406),
(...v)=>(redv(13319,R1_BODY_STRING,1,0,...v)),
()=>(14343),
()=>(2414),
(...v)=>(redv(98319,R2_class_tail,3,0,...v)),
(...v)=>(redv(98319,R1_class_tail,3,0,...v)),
(...v)=>(redv(101387,R0_class_element_list,2,0,...v)),
(...v)=>(redv(102411,R0_class_element,2,0,...v)),
()=>(2418),
(...v)=>(redv(82955,R0_S,2,0,...v)),
()=>(2430),
(...v)=>(redv(77839,R0_variable_declaration_list,3,0,...v)),
(...v)=>(rednv(134167,fn.condition_expr,5,0,...v)),
(...v)=>(redv(117779,R0_ATTRIBUTE_HEAD,4,0,...v)),
(...v)=>(redv(118799,R0_formal_parameters,3,0,...v)),
()=>(2434),
()=>(81927),
(...v)=>(redv(121867,R0_ATTRIBUTE_HEAD,2,0,...v)),
()=>(124943),
()=>(2438),
(...v)=>(redv(114707,R0_ATTRIBUTE_HEAD,4,0,...v)),
(...v)=>(redv(115727,R0_formal_parameters,3,0,...v)),
(...v)=>(redv(129043,R1_element_list,4,0,...v)),
()=>(2454),
()=>(2458),
(...v)=>(redv(91151,R0_ATTRIBUTE_HEAD,3,0,...v)),
()=>(2462),
()=>(151571),
()=>(154639),
()=>(157711),
()=>(152595),
()=>(2466),
()=>(2474),
()=>(155663),
(...v)=>(rednv(50199,fn.if_stmt,5,0,...v)),
()=>(2478),
()=>(2482),
(...v)=>(rednv(51223,fn.while_stmt,5,0,...v)),
()=>(2486),
()=>(2494),
()=>(2502),
()=>(2514),
()=>(2530),
()=>(2534),
()=>(2542),
()=>(2546),
()=>(2550),
()=>(2554),
()=>(2562),
(...v)=>(rednv(59415,fn.switch_stmt,5,0,...v)),
()=>(2570),
()=>(2590),
()=>(2586),
(...v)=>(rednv(58391,fn.with_stmt,5,0,...v)),
()=>(2594),
()=>(70663),
()=>(2598),
(...v)=>(redv(6151,R1_TAG_BODY,1,0,...v)),
(...v)=>(rednv(12295,fn.text,1,0,...v)),
()=>(15367),
(...v)=>(rednv(4119,fn.element_selector,5,0,...v)),
(...v)=>(rednv(8207,fn.attribute,3,0,...v)),
()=>(10247),
(...v)=>(redv(9231,R0_ATTRIBUTE_HEAD,3,0,...v)),
()=>(2618),
()=>(2622),
(...v)=>(redv(13323,R0_BODY_STRING,2,0,...v)),
(...v)=>(redv(98323,R0_class_tail,4,0,...v)),
(...v)=>((redn(87043,...v))),
(...v)=>(redv(82959,R0_formal_parameters,3,0,...v)),
(...v)=>(redv(83983,R0_formal_parameters,3,0,...v)),
()=>(2634),
()=>(2638),
()=>(2642),
()=>(2646),
()=>(104455),
(...v)=>(redv(115731,R0_argument_list,4,0,...v)),
(...v)=>(redv(149531,R2_cover_parenthesized_expression_and_arrow_parameter_list,6,0,...v)),
()=>(151575),
()=>(152599),
()=>(2650),
()=>(2658),
()=>(2666),
()=>(2670),
()=>(2678),
(...v)=>(redv(51227,R8_iteration_statement,6,0,...v)),
()=>(2686),
()=>(2694),
()=>(2698),
()=>(2702),
()=>(2706),
(...v)=>(redv(51227,R15_iteration_statement,6,0,...v)),
()=>(2734),
()=>(2742),
(...v)=>(redv(60427,R0_case_block,2,0,...v)),
()=>(2750),
()=>(2762),
(...v)=>(redv(61447,R1_TAG_BODY,1,0,...v)),
(...v)=>(redv(63495,R1_default_clause,1,0,...v)),
()=>(2770),
(...v)=>(redv(6155,R0_TAG_BODY,2,0,...v)),
()=>(2786),
()=>(2782),
()=>(2790),
()=>(2794),
()=>(3099),
()=>(2798),
()=>(87047),
()=>(2814),
()=>(152603),
(...v)=>(rednv(50207,fn.if_stmt,7,0,...v)),
(...v)=>(rednv(51231,fn.do_while_stmt,7,0,...v)),
(...v)=>(shftf(2818,I2_iteration_statement,...v)),
(...v)=>(redv(51231,R7_iteration_statement,7,0,...v)),
(...v)=>(redv(51231,R6_iteration_statement,7,0,...v)),
()=>(2838),
()=>(2842),
(...v)=>(redv(51231,R13_iteration_statement,7,0,...v)),
(...v)=>(redv(51231,R14_iteration_statement,7,0,...v)),
(...v)=>(redv(51231,R16_iteration_statement,7,0,...v)),
(...v)=>(redv(51231,R18_iteration_statement,7,0,...v)),
()=>(2866),
()=>(2878),
(...v)=>(redv(60431,R0_ATTRIBUTE_HEAD,3,0,...v)),
(...v)=>(redv(61451,R0_case_clauses,2,0,...v)),
()=>(2882),
()=>(2886),
(...v)=>(rednv(68631,fn.catch_stmt,5,0,...v)),
()=>(2894),
(...v)=>(rednv(16399,fn.wick_binding,3,0,...v)),
(...v)=>(redv(10255,R0_ATTRIBUTE_HEAD,3,0,...v)),
()=>(2902),
(...v)=>(redv(80927,R0_function_declaration,7,0,...v)),
()=>(2906),
()=>(2910),
()=>(2914),
(...v)=>(redv(51235,R5_iteration_statement,8,0,...v)),
(...v)=>(redv(51235,R4_iteration_statement,8,0,...v)),
(...v)=>(redv(51235,R3_iteration_statement,8,0,...v)),
()=>(2926),
(...v)=>(redv(51235,R12_iteration_statement,8,0,...v)),
(...v)=>(redv(51235,R17_iteration_statement,8,0,...v)),
(...v)=>(redv(51235,R18_iteration_statement,8,0,...v)),
(...v)=>(redv(51235,R0_iteration_statement,8,0,...v)),
(...v)=>(redv(51235,R19_iteration_statement,8,0,...v)),
()=>(2942),
(...v)=>(redv(60435,R2_case_block,4,0,...v)),
(...v)=>(redv(62479,R1_case_clause,3,0,...v)),
(...v)=>(redv(63503,R0_default_clause,3,0,...v)),
(...v)=>(rednv(4131,fn.element_selector,8,0,...v)),
()=>(2950),
(...v)=>(redv(80931,R1_function_declaration,8,0,...v)),
(...v)=>(rednv(103455,fn.class_method,7,0,...v)),
(...v)=>(rednv(103455,fn.class_get_method,7,0,...v)),
()=>(2954),
(...v)=>(redv(51239,R0_iteration_statement,9,0,...v)),
(...v)=>(redv(51239,R10_iteration_statement,9,0,...v)),
(...v)=>(redv(51239,R11_iteration_statement,9,0,...v)),
(...v)=>(redv(51239,R20_iteration_statement,9,0,...v)),
(...v)=>(redv(60439,R1_case_block,5,0,...v)),
(...v)=>(redv(62483,R0_case_clause,4,0,...v)),
(...v)=>(rednv(17431,fn.wick_binding,5,0,...v)),
(...v)=>(rednv(103459,fn.class_set_method,8,0,...v)),
(...v)=>(redv(51243,R9_iteration_statement,10,0,...v))],

    //Goto Lookup Functions
    goto = [v=>lsm(v,gt0),
nf,
nf,
nf,
nf,
v=>lsm(v,gt1),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt2),
nf,
nf,
nf,
nf,
v=>lsm(v,gt3),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt4),
v=>lsm(v,gt5),
v=>lsm(v,gt6),
v=>lsm(v,gt7),
v=>lsm(v,gt8),
v=>lsm(v,gt9),
v=>lsm(v,gt10),
nf,
v=>lsm(v,gt11),
v=>lsm(v,gt12),
nf,
v=>lsm(v,gt13),
v=>lsm(v,gt14),
v=>lsm(v,gt15),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt16),
v=>lsm(v,gt17),
nf,
v=>lsm(v,gt18),
v=>lsm(v,gt19),
v=>lsm(v,gt20),
nf,
nf,
nf,
v=>lsm(v,gt21),
nf,
nf,
v=>lsm(v,gt22),
v=>lsm(v,gt23),
nf,
nf,
nf,
nf,
v=>lsm(v,gt24),
nf,
nf,
nf,
v=>lsm(v,gt25),
v=>lsm(v,gt26),
v=>lsm(v,gt27),
nf,
v=>lsm(v,gt28),
v=>lsm(v,gt29),
nf,
nf,
nf,
v=>lsm(v,gt30),
nf,
nf,
nf,
v=>lsm(v,gt31),
nf,
v=>lsm(v,gt32),
v=>lsm(v,gt33),
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt1),
nf,
v=>lsm(v,gt34),
v=>lsm(v,gt35),
v=>lsm(v,gt36),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt37),
v=>lsm(v,gt38),
v=>lsm(v,gt39),
v=>lsm(v,gt40),
v=>lsm(v,gt41),
v=>lsm(v,gt42),
v=>lsm(v,gt43),
v=>lsm(v,gt44),
v=>lsm(v,gt45),
v=>lsm(v,gt46),
v=>lsm(v,gt47),
v=>lsm(v,gt48),
v=>lsm(v,gt49),
v=>lsm(v,gt50),
v=>lsm(v,gt51),
v=>lsm(v,gt52),
v=>lsm(v,gt53),
v=>lsm(v,gt54),
v=>lsm(v,gt55),
v=>lsm(v,gt56),
v=>lsm(v,gt57),
v=>lsm(v,gt58),
v=>lsm(v,gt59),
v=>lsm(v,gt60),
v=>lsm(v,gt61),
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt62),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt63),
nf,
v=>lsm(v,gt64),
v=>lsm(v,gt65),
v=>lsm(v,gt66),
v=>lsm(v,gt67),
nf,
nf,
v=>lsm(v,gt68),
nf,
nf,
v=>lsm(v,gt69),
nf,
nf,
nf,
nf,
v=>lsm(v,gt69),
nf,
v=>lsm(v,gt70),
v=>lsm(v,gt71),
nf,
nf,
nf,
nf,
v=>lsm(v,gt72),
nf,
nf,
v=>lsm(v,gt73),
v=>lsm(v,gt74),
v=>lsm(v,gt75),
nf,
nf,
v=>lsm(v,gt76),
nf,
v=>lsm(v,gt77),
nf,
nf,
v=>lsm(v,gt78),
v=>lsm(v,gt79),
nf,
nf,
nf,
v=>lsm(v,gt80),
v=>lsm(v,gt81),
v=>lsm(v,gt82),
nf,
v=>lsm(v,gt83),
v=>lsm(v,gt84),
nf,
v=>lsm(v,gt85),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt86),
nf,
v=>lsm(v,gt87),
nf,
v=>lsm(v,gt88),
v=>lsm(v,gt89),
v=>lsm(v,gt90),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt91),
nf,
nf,
v=>lsm(v,gt92),
v=>lsm(v,gt93),
v=>lsm(v,gt94),
nf,
nf,
nf,
v=>lsm(v,gt95),
v=>lsm(v,gt96),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt97),
nf,
v=>lsm(v,gt98),
v=>lsm(v,gt99),
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt100),
v=>lsm(v,gt101),
v=>lsm(v,gt102),
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt103),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt104),
nf,
nf,
v=>lsm(v,gt34),
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt105),
nf,
nf,
nf,
nf,
v=>lsm(v,gt106),
nf,
v=>lsm(v,gt107),
nf,
nf,
nf,
nf,
v=>lsm(v,gt108),
nf,
nf,
nf,
v=>lsm(v,gt109),
nf,
v=>lsm(v,gt110),
nf,
nf,
v=>lsm(v,gt111),
nf,
nf,
nf,
v=>lsm(v,gt112),
nf,
nf,
nf,
nf,
v=>lsm(v,gt113),
v=>lsm(v,gt114),
v=>lsm(v,gt115),
v=>lsm(v,gt3),
nf,
v=>lsm(v,gt116),
v=>lsm(v,gt117),
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt118),
nf,
nf,
v=>lsm(v,gt119),
v=>lsm(v,gt120),
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt120),
v=>lsm(v,gt120),
v=>lsm(v,gt121),
nf,
v=>lsm(v,gt122),
nf,
nf,
v=>lsm(v,gt123),
nf,
nf,
v=>lsm(v,gt124),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt125),
nf,
v=>lsm(v,gt126),
nf,
nf,
v=>lsm(v,gt127),
nf,
v=>lsm(v,gt128),
nf,
nf,
nf,
v=>lsm(v,gt129),
v=>lsm(v,gt130),
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt131),
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt132),
nf,
v=>lsm(v,gt133),
nf,
nf,
nf,
nf,
v=>lsm(v,gt1),
nf,
nf,
nf,
nf,
v=>lsm(v,gt134),
nf,
v=>lsm(v,gt135),
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt136),
nf,
nf,
nf,
v=>lsm(v,gt137),
v=>lsm(v,gt138),
v=>lsm(v,gt139),
v=>lsm(v,gt140),
nf,
v=>lsm(v,gt141),
nf,
nf,
v=>lsm(v,gt78),
v=>lsm(v,gt79),
nf,
v=>lsm(v,gt142),
v=>lsm(v,gt143),
v=>lsm(v,gt144),
v=>lsm(v,gt145),
v=>lsm(v,gt146),
nf,
v=>lsm(v,gt95),
v=>lsm(v,gt96),
nf,
v=>lsm(v,gt147),
nf,
v=>lsm(v,gt148),
v=>lsm(v,gt149),
v=>lsm(v,gt150),
nf,
v=>lsm(v,gt151),
nf,
v=>lsm(v,gt152),
nf,
nf,
v=>lsm(v,gt153),
nf,
nf,
nf,
v=>lsm(v,gt154),
v=>lsm(v,gt155),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt156),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt157),
nf,
nf,
v=>lsm(v,gt158),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt159),
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt160),
v=>lsm(v,gt161),
nf,
v=>lsm(v,gt162),
v=>lsm(v,gt163),
v=>lsm(v,gt164),
v=>lsm(v,gt165),
v=>lsm(v,gt166),
nf,
v=>lsm(v,gt167),
nf,
nf,
nf,
nf,
v=>lsm(v,gt168),
nf,
nf,
nf,
v=>lsm(v,gt169),
nf,
v=>lsm(v,gt170),
nf,
nf,
nf,
nf,
v=>lsm(v,gt171),
nf,
nf,
v=>lsm(v,gt30),
v=>lsm(v,gt155),
nf,
nf,
nf,
v=>lsm(v,gt172),
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt173),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt174),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt175),
nf,
v=>lsm(v,gt176),
nf,
v=>lsm(v,gt177),
nf,
v=>lsm(v,gt178),
nf,
nf,
v=>lsm(v,gt179),
nf,
nf,
nf,
v=>lsm(v,gt180),
v=>lsm(v,gt181),
nf,
v=>lsm(v,gt182),
v=>lsm(v,gt183),
v=>lsm(v,gt184),
v=>lsm(v,gt185),
nf,
v=>lsm(v,gt186),
nf,
nf,
v=>lsm(v,gt187),
v=>lsm(v,gt188),
nf,
v=>lsm(v,gt189),
nf,
v=>lsm(v,gt190),
v=>lsm(v,gt191),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt192),
v=>lsm(v,gt193),
v=>lsm(v,gt194),
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt195),
v=>lsm(v,gt196),
nf,
v=>lsm(v,gt197),
nf,
v=>lsm(v,gt198),
nf,
v=>lsm(v,gt199),
v=>lsm(v,gt200),
v=>lsm(v,gt201),
v=>lsm(v,gt202),
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt203),
nf,
v=>lsm(v,gt204),
v=>lsm(v,gt205),
nf,
nf,
v=>lsm(v,gt206),
nf,
nf,
v=>lsm(v,gt207),
nf,
nf,
v=>lsm(v,gt208),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt209),
v=>lsm(v,gt210),
nf,
nf,
nf,
nf,
v=>lsm(v,gt211),
v=>lsm(v,gt212),
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt213),
nf,
nf,
nf,
nf,
v=>lsm(v,gt214),
v=>lsm(v,gt1),
nf,
nf,
nf,
nf,
nf,
nf,
nf,
nf,
v=>lsm(v,gt215),
nf,
nf,
nf,
nf,
v=>lsm(v,gt1),
nf,
nf,
nf];

function getToken(l, SYM_LU) {
    if (l.END) return 0; /*1*/

    switch (l.ty) {
        case 2:
            if (SYM_LU.has(l.tx)) return SYM_LU.get(l.tx);
            return 2;
        case 1:
            return 1;
        case 4:
            return 3;
        case 256:
            return 9;
        case 8:
            return 4;
        case 512:
            return 10;
        default:
            return SYM_LU.get(l.tx) || SYM_LU.get(l.ty);
    }
}

/************ Parser *************/

function parser(l, e = {}) {
    
    fn = e.functions;

    l.IWS = false;
    l.PARSE_STRING = true;

    if (symbols.length > 0) {
        symbols.forEach(s => { l.addSymbol(s); });
        l.tl = 0;
        l.next();
    }

    const o = [],
        ss = [0, 0];

    let time = 1000000,
        RECOVERING = 100,
        tk = getToken(l, lu),
        p = l.copy(),
        sp = 1,
        len = 0,
        off = 0;

    outer:

        while (time-- > 0) {

            const fn = lsm(tk, state[ss[sp]]) || 0;

            /*@*/// console.log({end:l.END, state:ss[sp], tx:l.tx, ty:l.ty, tk:tk, rev:rlu.get(tk), s_map:state[ss[sp]], res:lsm(tk, state[ss[sp]])});

            let r,
                gt = -1;

            if (fn == 0) {
                /*Ignore the token*/
                l.next();
                tk = getToken(l, lu);
                continue;
            }

            if (fn > 0) {
                r = state_funct[fn - 1](tk, e, o, l, ss[sp - 1]);
            } else {

                if (RECOVERING > 1 && !l.END) {
                    if (tk !== lu.get(l.ty)) {
                        //console.log("ABLE", rlu.get(tk), l.tx, tk )
                        tk = lu.get(l.ty);
                        continue;
                    }

                    if (tk !== 13) {
                        //console.log("MABLE")
                        tk = 13;
                        RECOVERING = 1;
                        continue;
                    }
                }

                tk = getToken(l, lu);

                const recovery_token = eh[ss[sp]](tk, e, o, l, p, ss[sp], lu);

                if (RECOVERING > 0 && recovery_token) {
                    RECOVERING = -1; /* To prevent infinite recursion */
                    tk = recovery_token;
                    l.tl = 0; /*reset current token */
                    continue;
                }
            }

            switch (r & 3) {
                case 0:
                    /* ERROR */

                    if (tk == "$")
                        l.throw("Unexpected end of input");
                    l.throw(`Unexpected token [${RECOVERING ? l.next().tx : l.tx}]`);
                    return [null];

                case 1:
                    /* ACCEPT */
                    break outer;

                case 2:
                    /*SHIFT */
                    o.push(l.tx);
                    ss.push(off, r >> 2);
                    sp += 2;
                    p.sync(l);
                    l.next();
                    off = l.off;
                    tk = getToken(l, lu);
                    RECOVERING++;
                    break;

                case 3:
                    /* REDUCE */

                    len = (r & 0x3FC) >> 1;

                    ss.length -= len;
                    sp -= len;
                    gt = goto[ss[sp]](r >> 10);

                    if (gt < 0)
                        l.throw("Invalid state reached!");

                    ss.push(off, gt);
                    sp += 2;
                    break;
            }
        }
    console.log(time);
    return o[0];
}

var types = {
		object:1,
		null:2,
		stmts:3,
		object:4,
		number:5,
		string:6,
		for:7,
		lex:8,
		var:9,
		const:10,
		try:11,
		catch:12,
		finally:13,
		while:14,
		do:15,
		add:16,
		sub:17,
		mult:18,
		div:19,
		mod:20,
		strict_eq:21,
		exp:22,
		shift_r:23,
		shift_l:24,
		shift_l_fill:25,
		array:26,
		function:27,
		bool:28,
		label:29,
		new:30,
		lt:31,
		gt:32,
		lte:33,
		gte:34,
		assign:35,
		equal:36,
		or:37,
		and:38,
		bit_or:39,
		bit_and:40,
		id:41,
		member:42,
		call:43,
		return:44,
		if:45,
		post_inc:46,
		post_dec:47,
		pre_inc:48,
		pre_dec:49,
		condition:50,
		class:51,
		negate:52,
		exp:53
	};

class base{
	constructor(){
	}
	getRootIds(ids) {}
	*traverseDepthFirst (){ yield this; }
	skip (trvs) {

		for(let val = trvs.next().value; val && val !== this ;val = trvs.next().value);

		return trvs;
	}
	spin(trvs){
        let val = trvs.next().value;
        while(val !== undefined && val !== this ){val = trvs.next().value;}
     }
     toString(){return this.render()}
     render(){return ""}
}

/** FOR **/
class for_stmt extends base{
	constructor(init,bool,iter, body){super();this.init = init; this.bool = bool, this.iter=iter, this.body = body;}
	
	getRootIds(ids, closure){
		
		closure = new Set([...closure.values()]);

		if(this.bool) this.bool.getRootIds(ids,closure);
		if(this.iter) this.iter.getRootIds(ids,closure);
		if(this.body) this.body.getRootIds(ids,closure);
	}

	*traverseDepthFirst (){ 
	 	yield this;
	 	if(this.init) yield * this.init.traverseDepthFirst();
	 	if(this.bool) yield * this.bool.traverseDepthFirst();
	 	if(this.iter) yield * this.iter.traverseDepthFirst();
	 	if(this.body) yield * this.body.traverseDepthFirst();
	 	yield this;
	 }

	 get type () { return types.for }

	 render(){
	 	let init, bool, iter, body;
	 	
	 	if(this.init) init = this.init.render();
	 	if(this.bool) bool = this.bool.render();
	 	if(this.iter) iter = this.iter.render();
	 	if(this.body) body = this.body.render();

	 	return `for(${init};${bool};${iter})${body}`}
}

/** IDENTIFIER **/
class identifier$1 extends base{
	 constructor (sym){super(); this.val = sym[0]; this.root = true;}
	 getRootIds(ids, closuere){if(!closuere.has(this.val))ids.add(this.val);}
	 *traverseDepthFirst (){ 
	 	yield this;
	 }

	 get name () {return this.val}

	 get type () { return types.id }

	 render  () { return this.val}
}

class call_expr extends base {
    constructor(sym) {
        super();
        this.id = sym[0];
        this.args = sym[1];
    }

    getRootIds(ids, closure) {
        this.id.getRootIds(ids,closure);
        this.args.forEach(e => e.getRootIds(ids,closure));
    }

    *traverseDepthFirst (){ 
	 	yield this;
	 	yield * this.id.traverseDepthFirst();
        for(let arg of this.args)
            yield * arg.traverseDepthFirst();
	 	yield this;
	 }
     get name () {return this.id.name}
     get type () { return types.call }
     render(){        return `${this.id.render()}(${this.args.map(a=>a.render()).join(",")})`}
}

/** CATCH **/
class catch_stmt extends base {
    constructor(sym) {
        super();
        this.param = sym[2];
        this.body = sym[4];
    }

    getRootIds(ids,closure) {
        if (this.body) this.body.getRootIds(ids,closure);
    }

    *traverseDepthFirst (){ 
	 	yield this;
	 	yield * this.param.traverseDepthFirst();
	 	yield * this.body.traverseDepthFirst();
	 	yield this;
	 }

     get type () { return types.catch }
}

/** TRY **/
class try_stmt extends base {
    constructor(body, _catch, _finally) {
        super();
        this.catch = _catch;
        this.body = body;
        this.finally = _finally;
    }

    getRootIds(ids,clsr) {
        this.body.getRootIds(ids,clsr);
        if (this.catch) this.catch.getRootIds(ids,clsr);
        if (this.finally) this.finally.getRootIds(ids,clsr);
    }

    *traverseDepthFirst (){ 
        yield this;
        if(this.body) yield * this.body.traverseDepthFirst();
        if(this.catch) yield * this.catch.traverseDepthFirst();
        if(this.finally) yield * this.finally.traverseDepthFirst();
        yield this;
     }

     get type () { return types.try }
}

/** STATEMENTS **/
class stmts extends base {
    constructor(sym) {
        super();
        this.stmts = sym[0];
    }

    getRootIds(ids, closure) {
        this.stmts.forEach(s=>s.getRootIds(ids, closure));
    }

    *traverseDepthFirst (){ 
	 	yield this;
	 	for(let stmt of this.stmts)
	 		yield * stmt.traverseDepthFirst();
	 	yield this;
	 }

     get type () { return types.stmts }

     render(){return `${this.stmts.map(s=>s.render()).join(";")}`};
}

/** BLOCK **/
class block extends stmts {

    constructor(sym,clsr) {
        super([sym[1]]);
    }

    getRootIds(ids, closure) {
    	super.getRootIds(ids, new Set([...closure.values()]));
    }

    get type () { return types.block }
}

/** LEXICAL DECLARATION **/
class lexical extends base {
    constructor(sym) {

    	super();
    	this.mode = sym[0];
        this.bindings = sym[1];
    }

    getRootIds(ids, closure) {
    	this.bindings.forEach(b=>b.getRootIds(ids, closure));
    }

    get type () { return types.lex }

    render(){return `${this.mode} ${this.bindings.map(b=>b.render()).join(",")};`}
}

/** BINDING DECLARATION **/
class binding extends base {
    constructor(sym) {
    	super();
    	this.id = sym[0];
        this.id.root = false;
        this.init = sym[1] ? sym[1] : null;
    }

    getRootIds(ids, closure) {
    	this.id.getRootIds(closure, closure);
    	if(this.init) this.init.getRootIds(ids, closure);
    }

    *traverseDepthFirst (){ 
	 	yield this;
	 	yield * this.id.traverseDepthFirst();
	 	yield * this.init.traverseDepthFirst();
	 	yield this;
	 }

     render(){return `${this.id}${this.init ? ` = ${this.init.render()}` : ""}`}
}

/** MEMBER **/

class mem extends base {
    constructor(sym) { super();
        this.id = sym[0];
        this.mem = sym[2];
        this.root = true;
        this.mem.root = false; 
    }

    getRootIds(ids, closuere) {
        this.id.getRootIds(ids, closuere);
    }

    * traverseDepthFirst() {
        yield this;
        yield* this.id.traverseDepthFirst();
        yield* this.mem.traverseDepthFirst();
        //yield this;
    }

    get name() { return this.id.name }
    get type() { return types.member }

    render() { return `${this.id.render()}.${this.mem.render()}` }
}

/** ASSIGNEMENT EXPRESSION **/

class assign extends base {
    constructor(sym) {
        super();
        this.id = sym[0];
        this.op = sym[1];
        this.expr = sym[2];
    }

    getRootIds(ids, closure) {
    	this.id.getRootIds(ids, closure);
    	this.expr.getRootIds(ids, closure);
    }

    *traverseDepthFirst (){ 
        yield this;
        yield * this.id.traverseDepthFirst();
        yield * this.expr.traverseDepthFirst();
        //yield this;
     }

     get type () { return types.assign }

    render(){return `${this.id.render()} ${this.op} ${this.expr.render()}`}
}

/** OPERATOR **/
class operator$1 extends base {

    constructor(sym) {
        super();
        this.left = sym[0];
        this.right = sym[2];
        this.op = "";
    }

    *traverseDepthFirst (){ 
	 	yield this;
	 	yield * this.left.traverseDepthFirst();
	 	yield * this.right.traverseDepthFirst();
	 	yield this;
	 }

     render(){return `${this.left.render()} ${this.op} ${this.right.render()}` }
}

/** MULTIPLY **/
class add extends operator$1 {

    constructor(sym) {
        super(sym);
       	this.op = "+";
    }

    get type () { return types.add }
}

/** EXPONENT **/
class exp extends operator$1 {

    constructor(sym) {
        super(sym);
       	this.op = "**";
    }

    get type () { return types.exp }
}

/** SUBTRACT **/
class sub extends operator$1 {

    constructor(sym) {
        super(sym);
        this.op = "-";
    }

    get type () { return types.sub }
}

/** MULTIPLY **/
class div extends operator$1 {

    constructor(sym) {
        super(sym);
        this.op = "/";
    }

    get type () { return types.div }
}

/** MULTIPLY **/
class mult extends operator$1 {

    constructor(sym) {
        super(sym);
        this.op = "*";
    }

    get type () { return types.mult }

    
}

/** OBJECT **/

class object extends base {
    constructor(sym) {
        super();
    this.props = sym[0] || [];
    }

    * traverseDepthFirst (){ 
	 	yield this;
	 	for(let prop of this.props)
	 		yield * prop.traverseDepthFirst();
	 	yield this;
	 }

	 get type () { return types.object }

	 render(){return `{${this.props.map(p=>p.render()).join(",")}}`}
}

/** STRING **/

class string$2 extends base{
	 constructor (sym){super(); this.val = sym[0];}
	 getRootIds(ids, closuere){if(!closuere.has(this.val))ids.add(this.val);}

     get type () { return types.string }

     render(){return this.val}

}

/** NULL **/
class null_ extends base{
	 constructor (sym){super();}
	 get type () { return types.null }

	 render(){return "null"}
}

/** NUMBER **/
class number$2 extends base{
	 constructor (sym){super();this.val = parseFloat(sym); this.ty = "num";}
	 get type () { return types.number }
	 render(){return this.val}
}

/** BOOLEAN **/

class bool$1 extends base{
	 constructor (sym){super();this.val = sym[0].slice(1) == "true";}

     get type () { return types.bool }

}

/** OPERATOR **/
class unary_prefix_op extends base {

    constructor(sym) {
        super();
        this.expr = sym[1];
        this.op = "";
    }

    *traverseDepthFirst (){ 
	 	yield this;
	 	yield * this.expr.traverseDepthFirst();
	 	yield this;
	 }

     render(){return `${this.op}${this.expr.render()}` }
}

/** NEGATE **/

class negate extends unary_prefix_op{
	 constructor (sym){super(sym);this.val = parseFloat(sym); this.op = "-";}
	 get type () { return types.negate }
}

/** RETURN STATMENT  **/



class rtrn extends base {
    constructor(sym) {
        super();
        this.expr = (sym.length > 2) ? sym[1] : null;
    }

    getRootIds(ids,closure) {
        if (this.expr) this.expr.getRootIds(ids,closure);
    }

    *traverseDepthFirst (){ 
	 	yield this;
	 	yield * this.expr.traverseDepthFirst();
	 }

     get type () { return types.return }

     render  () { return `return ${(this.expr) ? this.expr.render() : ""};`}
}

/** LESS_THAN **/
class lt extends operator$1 {

    constructor(sym) {
        super(sym);
       	this.op = "<";
    }

    get type () { return types.lt }
}

const removeFromArray = (array, ...elems) => {
    const results = [];
    outer:
        for (let j = 0; j < elems.length; j++) {
            const ele = elems[i];
            for (let i = 0; i < array.length; i++) {
                if (array[i] === ele) {
                    array.splice(i, 1);
                    results.push(true);
                    continue outer;
                }
            }
            results.push(false);
        }

    return results;
};

// Mode Flag
const KEEP = 0;
const IMPORT = 1;
const EXPORT = 2;
const PUT = 4;

/**
 * Gateway for data flow. Represents a single "channel" of data flow. 
 * 
 * By using different modes, one can control how data enters and exits the scope context.
 * -`keep`: 
 *  This mode is the default and treats any data on the channel as coming from the model. The model itself is not changed, and any data flow from outside the scope context is ignored.
 * -`put`:
 *  This mode will update the model to reflect updates on the channel. This will also cause any bindings to update to reflect the change on the model.
 * -`import`:
 *  This mode will allow data from outside the scope context to enter the context as if it came from the model. The model itself is unchanged unless put is specified for the same property.
 *  -`export`:
 *  This mode will propagate data flow to the parent scope context, allowing other scopes to listen on the data flow of the originating scope context.
 *  
 *  if `import` is active, then `keep` is implicitly inactive and the model no longer has any bearing on the value of the bindings.
 */
class Tap {

    constructor(scope, prop, modes = 0) {
        this.scope = scope;
        this.prop = prop;
        this.modes = modes; // 0 implies keep
        this.ios = [];

        if (modes & IMPORT && scope.parent)
            scope.parent.getTap(prop).ios.push(this);

    }

    destroy() {

        for (let i = 0, l = this.ios.length; i < l; i++)
            this.ios[i].destroy();

        this.ios = null;
        this.scope = null;
        this.prop = null;
        this.modes = null;
    }

    load(data) {
        this.downS(data);

        //Make sure export occures as soon as data is ready. 
        const value = data[this.prop];

        if ((typeof(value) !== "undefined") && (this.modes & EXPORT))
            this.scope.up(this, data[this.prop]);
    }

    down(value, meta) {
        for (let i = 0, l = this.ios.length; i < l; i++) {
            this.ios[i].down(value, meta);
        }
    }

    downS(model, IMPORTED = false) {
        const value = model[this.prop];

        if (typeof(value) !== "undefined") {

            if (IMPORTED) {
                if (!(this.modes & IMPORT))
                    return;

                if ((this.modes & PUT) && typeof(value) !== "function") {
                    if (this.scope.model.set)
                        this.scope.model.set({
                            [this.prop]: value
                        });
                    else
                        this.scope.model[this.prop] = value;
                }

            }

            for (let i = 0, l = this.ios.length; i < l; i++) {
                if (this.ios[i] instanceof Tap) {
                    this.ios[i].downS(model, true);
                } else
                    this.ios[i].down(value);
            }
        }
    }

    up(value, meta) {

        if (!(this.modes & (EXPORT | PUT)))
            this.down(value, meta);
        
        if ((this.modes & PUT) && typeof(value) !== "undefined") {
            if (this.scope.model.set)
                this.scope.model.set({
                    [this.prop]: value
                });
            else
                this.scope.model[this.prop] = value;
        }

        if (this.modes & EXPORT)
            this.scope.up(this, value, meta);
    }

    addIO(io) {
        if (io.parent === this)
            return;

        if (io.parent)
            io.parent.removeIO(io);

        this.ios.push(io);

        io.parent = this;
    }

    removeIO(io) {
        if (removeFromArray(this.ios, io)[0])
            io.parent = null;
    }
}

class UpdateTap extends Tap {
    downS(model) {
        for (let i = 0, l = this.ios.length; i < l; i++)
            this.ios[i].down(model);
    }
    up() {}
}

// This serves as a NOOP for io methods that expect a Tap with addIO and RemoveIO operations
const noop = () => {};
const NOOPTap = { addIO: noop, removeIO: noop, up: noop };

/**
 * Base class for an object that binds to and observes a Model.
 *@alias module:wick.core.observer
 */
class View{

	constructor(){
		/**
		 * property
		 */
		this.nx = null;
		this.pv = null;
		this .model = null;
	}

	/**
     * Unbinds the View from its Model and sets all properties to undefined. Should be called by any class extending View
	 * ``` js
	 * class ExtendingView extends wick.core.observer.View{
	 * 		destroy(){
	 * 			//... do some stuff ...
	 * 			super.destroy();
	 * 		}
	 * }
	 * ```
     * @protected
     */
	destroy(){

		if(this.model && this.model.removeView)
			this.model.removeView(this);
	
		this .model = undefined;
		this.nx = undefined;
	}	
	/**
		Called by a Model when its data has changed.
	*/
	update(data){

	}
	/**
		Called by a ModelContainerBase when an item has been removed.
	*/
	removed(data){

	}

	/**
		Called by a ModelContainerBase when an item has been added.
	*/
	added(data){

	}
	setModel(model){
	}

	reset(){
		
	}
	unsetModel(){

		this.nx = null;
		this .model = null;
	}
}

class Scope extends View {

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
        //if(!presets)
        //    debugger;
        super();

        this.ast = ast;

        //ast.setScope(this);
        
        this.parent = parent;
        this.ele = element;
        this.presets = presets;
        this.model = null;
        this.statics = null;

        this.taps = {};
        this.children = [];
        this.scopes = [];
        this.badges = {};
        this.ios = [];
        this.containers = [];
        this.hooks = [];
        this.update_tap = null;

        this._model_name_ = "";
        this._schema_name_ = "";

        this.DESTROYED = false;
        this.LOADED = false;
        this.CONNECTED = false;
        this.TRANSITIONED_IN = false;

        this.addToParent();
    }

    destroy() {

        //Lifecycle Events: Destroying <======================================================================
        this.update({destroying:true});

        this.DESTROYED = true;
        this.LOADED = false;

        if (this.parent && this.parent.removeScope)
            this.parent.removeScope(this);

        this.children.forEach((c) => c.destroy());
        this.children.length = 0;
        this.data = null;

        if (this.ele && this.ele.parentElement)
            this.ele.parentElement.removeChild(this.ele);

        this.ele = null;

        while (this.scopes[0])
            this.scopes[0].destroy();

        super.destroy();
    }

    getBadges(par) {
        for (let a in this.badges) 
            if (!par.badges[a])
                par.badges[a] = this.badges[a];
    }

    addToParent() {
        if (this.parent)
            this.parent.scopes.push(this);
    }

    addTemplate(template) {
        template.parent = this;
        this.containers.push(template);
    }

    addScope(scope) {
        if (scope.parent == this)
            return;
        scope.parent = this;
        this.scopes.push(scope);
    }

    removeScope(scope) {
        if (scope.parent !== this)
            return;

        for (let i = 0; i < this.scopes.length; i++)
            if (this.scopes[i] == scope)
                return (this.scopes.splice(i, 1), scope.parent = null);
    }

    getTap(name) {
        let tap = this.taps[name];

        if (!tap) {
            if (name == "update")
                this.update_tap = new UpdateTap(this, name);
            else
                tap = this.taps[name] = new Tap(this, name);
        }
        return tap;
    }

    /**
     * Return an array of Tap objects that
     * match the input array.
     */

    linkTaps(tap_list) {
        let out_taps = [];
        for (let i = 0, l = tap_list.length; i < l; i++) {
            let tap = tap_list[i];
            let name = tap.name;
            if (this.taps[name])
                out_taps.push(this.taps[name]);
            else {
                let bool = name == "update";
                let t = bool ? new UpdateTap(this, name, tap.modes) : new Tap(this, name, tap.modes);

                if (bool)
                    this.update_tap = t;

                this.taps[name] = t;
                out_taps.push(this.taps[name]);
            }
        }

        return out_taps;
    }

    /**
        Makes the scope a observer of the given Model. If no model passed, then the scope will bind to another model depending on its `scheme` or `model` attributes. 
    */
    load(model) {
        let
            m = null,
            SchemedConstructor = null;

        if (this._model_name_ && this.presets.models)
            m = this.presets.models[this._model_name_];
        if (this._schema_name_ && this.presets.schemas)
            SchemedConstructor = this.presets.schemas[this._schema_name_];

        if (m)
            model = m;
        else if (SchemedConstructor) {
            model = new SchemedConstructor();
        } else if (!model)
            model = new Model(model);

        this.LOADED = true;

        for (let i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].load(model);
            this.scopes[i].getBadges(this);
        }


        if (model.addObserver)
            model.addObserver(this);

        this.model = model;

        for (let name in this.taps)
            this.taps[name].load(this.model, false);

        //Lifecycle Events: Loaded <======================================================================
        this.update({loaded:true}); 
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
        if (this.taps[prop_name])
            this.taps[prop_name].up(data, meta);
    }

    update(data, changed_values, IMPORTED = false) {

        if (this.update_tap)
            this.update_tap.downS(data, IMPORTED);

        if (changed_values) {

            for (let name in changed_values)
                if (this.taps[name])
                    this.taps[name].downS(data, IMPORTED);
        } else
            for (let name in this.taps)
                this.taps[name].downS(data, IMPORTED);

        for (let i = 0, l = this.containers.length; i < l; i++)
            this.containers[i].down(data, changed_values);
    }

    bubbleLink(child) {
        if (child)
            for (let a in child.badges)
                this.badges[a] = child.badges[a];
        if (this.parent)
            this.parent.bubbleLink(this);
    }

    /*************** DOM CODE ****************************/

    appendToDOM(element, before_element) {

        //Lifecycle Events: Connecting <======================================================================
        this.update({connecting:true});
        
        this.CONNECTED = true;

        if (before_element)
            element.insertBefore(this.ele, before_element);
        else
            element.appendChild(this.ele);

        //Lifecycle Events: Connected <======================================================================
        this.update({connected:true});
    }

    removeFromDOM() {
        //Lifecycle Events: Disconnecting <======================================================================
        this.update({disconnecting:true});

        if (this.CONNECTED == true) return;

        if (this.ele && this.ele.parentElement)
            this.ele.parentElement.removeChild(this.ele);

        //Lifecycle Events: Disconnected <======================================================================
        this.update({disconnectied:true});
    }

    transitionIn(transition, transition_name = "trs_in") {

        if (transition) 
            this.update({[transition_name]:transition});

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

            this.update({[transition_name]:transition});

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

class ElementNode{

    constructor(tag = "", children = [], attribs = [], presets){
        
        if(children)
            for(const child of children)
                child.parent = this;

        this.SINGLE = false;
        this.MERGED = false;

        this.presets =presets;
        this.tag = tag;
        this.attribs = attribs || [];
        this.children = children || [];

        this.component = this.getAttrib("component").value;

        this.url = this.getAttrib("url").value ? URL.resolveRelative(this.getAttrib("url").value) : null;
        this.id = this.getAttrib("id").value;
        this.class = this.getAttrib("id").value;
        this.name = this.getAttrib("name").value;

        if(this.url){
            this.url.fetchText().then(e=>{
                const lex = whind$1(e);
                //let nodes = env.compile(lex, env);
                //console.log(nodes)
                //this.children.push(nodes);
            });
        }

        //Prepare attributes with data from this element
        for(const attrib of this.attribs)
            attrib.link(this);


        if (presets.components) {
            const component = this.presets.components[this.tag];

            if (component) 
                return component.merge(this);
        }

        return this;
    }

    getAttribute(name){
        return this.getAttrib(name).value;
    }

    getAttrib(name){
        for(const attrib of this.attribs){
            if(attrib.name === name)
                return attrib;
        }

        return {name:"", value:""}
    }

    createElement() {
        return createElement(this.tag);
    }

    toString(off = 0) {

        let o = offset.repeat(off);

        let str = `${o}<${this.tag}`,
            atr = this.attribs,
            i = -1,
            l = atr.length;

        while (++i < l) {
            let attr = atr[i];

            if (attr.name)
                str += ` ${attr.name}="${attr.value}"`;
        }

        str += ">\n";

        if (this.SINGLE)
            return str;

        str += this.innerToString(off + 1);

        return str + `${o}</${this.tag}>\n`;
    }

    innerToString(off) {
        let str = "";
        for (let node = this.fch; node;
            (node = this.getNextChild(node))) {
            str += node.toString(off);
        }
        return str;
    }

    /****************************************** COMPONENTIZATION *****************************************/

    merge(node) {

        const merged_node = new this.constructor();
        merged_node.line = this.line;
        merged_node.char = this.char;
        merged_node.offset = this.offset;
        merged_node.single = this.single;
        merged_node.url = this.url;
        merged_node.tag = this.tag;
        merged_node.children  = (node.children || this.children) ? new MergerNode(this.children, node.children) : null;
        merged_node.css = this.css;
        merged_node.HAS_TAPS = this.HAS_TAPS;
        merged_node.MERGED = true;
        merged_node._badge_name_ = node._badge_name_;
        merged_node.presets = this.presets;
        merged_node.par = node.par;

        if (this.tap_list)
            merged_node.tap_list = this.tap_list.map(e => Object.assign({}, e));

        merged_node.attribs = merged_node.attributes.concat(this.attribs, node.attribs);

        merged_node.statics = node.statics;

        return merged_node;
    }

    /******************************************* BUILD ****************************************************/

    mount(element, scope, statics, presets = this.presets){
        const out_statics = statics;

        // /if (this.url || this.__statics__)
        // /    out_statics = Object.assign({}, statics, this.__statics__, { url: this.getURL(par_list.length - 1) });

        const own_element = this.createElement(scope);

        if (!scope)
            scope = new Scope(null, presets || this.__presets__ || this.presets, own_element, this);

        if (this.HAS_TAPS)
            taps = scope.linkTaps(this.tap_list);

        if (own_element) {      

            if (!scope.ele) scope.ele = own_element;

            if (this._badge_name_)
                scope.badges[this._badge_name_] = own_element;

            if (element) appendChild(element, own_element);

            for (let i = 0, l = this.attribs.length; i < l; i++) 
                this.attribs[i].bind(own_element, scope);
        }

        const ele = own_element ? own_element : element;

        //par_list.push(this);
        for(let i = 0; i < this.children.length; i++){
            //for (let node = this.fch; node; node = this.getNextChild(node))
            const node = this.children[i];
                node.mount(ele, scope, out_statics, presets);
        }

        //par_list.pop();

        return scope;
    }
}

//Node that allows the combination of two sets of children from separate nodes that are merged together
class MergerNode {
    constructor(...children_arrays) {
        this.c = [];

        for (let i=0,l = children_arrays.length; i<l; i++)
            if(Array.isArray(children_arrays))
                this.c = this.c.concat(children_arrays[i]);
    }

    mount(element, scope, statics, presets = this.presets) {
        for (let i=0,l = this.c.length; i<l; i++){
            if(this.c[i].SLOTED == true) continue;
            this.c[i].build(element, scope, statics, presets);
        }

        return scope;
    }

    linkCSS() {}

    toString(off = 0) {
        return `${("    ").repeat(off)}${this.binding}\n`;
    }
}

class IOBase {

    constructor(parent) {

        this.parent = null;
        this.ele = null;

        parent.addIO(this);
    }

    destroy() {

        this.parent.removeIO(this);

        this.parent = null;
    }

    down() {}
    up(value, meta) { this.parent.up(value, meta); }

    //For IO composition.
    set data(data){this.down(data);}

    addIO(child){
        this.ele = child;
    }

    removeIO(){
        this.ele = null;
    }
}

/**
 *   The IO is the last link in the Scope chain. It is responsible for putting date into the DOM through the element it binds to. Alternativly, in derived versions of `IO`, it is responsible for retriving values from user inputs from input elements and events.
 *   @param {Scope} tap - The tap {@link Scope}, used internally to build a hierarchy of Scopes.
 *   @param {Object} data - An object containing HTMLELement attribute values and any other values produced by the template parser.
 *   @param {Presets} presets - An instance of the {@link Presets} object.
 *   @param {HTMLElement} element - The HTMLElement that the IO will _bind_ to.
 *   @memberof module:wick.core.scope
 *   @alias IO
 *   @extends IOBase
 */
class IO extends IOBase {

    constructor(scope, errors, tap, element = null, default_val = null) {

        super(tap);
        //Appending the value to a text node prevents abuse from insertion of malicious DOM markup. 
        this.ele = element;
        this.argument = null;

        if (default_val) this.down(default_val);
    }

    destroy() {
        this.ele = null;
        super.destroy();
    }

    down(value) {
        this.ele.data = value;
    }
}

/**
    This IO object will update the attribute value of the watched element, using the "prop" property to select the attribute to update.
*/
class AttribIO extends IOBase {
    constructor(scope, errors, tap, attr, element, default_val) {
        super(tap);

        this.attrib = attr;
        this.ele = element;

        if (default_val) this.down(default_val);
    }

    destroy() {
        this.ele = null;
        this.attrib = null;
        super.destroy();
    }

    /**
        Puts data into the watched element's attribute. The default action is to simply update the attribute with data._value_.  
    */
    down(value) {
        this.ele.setAttribute(this.attrib, value);
    }

    set data(v){
        this.down();
    }

    get data(){

    }
}

/**
    This IO object will update the attribute value of the watched element, using the "prop" property to select the attribute to update.
*/
class DataNodeIO extends IOBase {
    constructor(scope, tap, element, default_val) {
        super(tap);
        this.ele = element;
        if (default_val) this.down(default_val);
    }

    destroy() {
        this.ele = null;
        this.attrib = null;
        super.destroy();
    }

    /**
        Puts data into the watched element's attribute. The default action is to simply update the attribute with data._value_.  
    */
    down(value) {
        this.ele.data = value;
    }
}

class InputIO extends IOBase {

    constructor(scope, errors, tap, attrib_name, element, default_val) {

        super(tap);

        this.ele = element;

        const up_tap = default_val ? scope.getTap(default_val) : tap;

        this.event = (e) => { up_tap.up(e.target.value, { event: e }); };

        this.ele.addEventListener("input", this.event);
    }

    destroy() {
        this.ele.removeEventListener("input", this.event);
        this.ele = null;
        this.event = null;
        this.attrib = null;
    }

    down(value) {
        this.ele.value = value;
    }
}

/**
 * To be extended by objects needing linked list methods.
 */
const LinkedList = {

    props: {
        /**
         * Properties for horizontal graph traversal
         * @property {object}
         */
        defaults: {
            /**
             * Next sibling node
             * @property {object | null}
             */
            nxt: null,

            /**
             * Previous sibling node
             * @property {object | null}
             */
            prv: null
        },

        /**
         * Properties for vertical graph traversal
         * @property {object}
         */
        children: {
            /**
             * Number of children nodes.
             * @property {number}
             */
            noc: 0,
            /**
             * First child node
             * @property {object | null}
             */
            fch: null,
        },
        parent: {
            /**
             * Parent node
             * @property {object | null}
             */
            par: null
        }
    },

    methods: {
        /**
         * Default methods for Horizontal traversal
         */
        defaults: {

            insertBefore: function(node) {

                if (!this.nxt && !this.prv) {
                    this.nxt = this;
                    this.prv = this;
                }

                if(node){
                    if (node.prv)
                       node.prv.nxt = node.nxt;
                    
                    if(node.nxt) 
                        node.nxt.prv = node.prv;
                
                    node.prv = this.prv;
                    node.nxt = this;
                    this.prv.nxt = node;
                    this.prv = node;
                }else{
                    if (this.prv)
                        this.prv.nxt = node;
                    this.prv = node;
                } 
            },

            insertAfter: function(node) {

                if (!this.nxt && !this.prv) {
                    this.nxt = this;
                    this.prv = this;
                }

                if(node){
                    if (node.prv)
                       node.prv.nxt = node.nxt;
                    
                    if(node.nxt) 
                        node.nxt.prv = node.prv;
                
                    node.nxt = this.nxt;
                    node.prv = this;
                    this.nxt.prv = node;
                    this.nxt = node;
                }else{
                    if (this.nxt)
                        this.nxt.prv = node;
                    this.nxt = node;
                } 
            }
        },
        /**
         * Methods for both horizontal and vertical traversal.
         */
        parent_child: {
            /**
             *  Returns eve. 
             * @return     {<type>}  { description_of_the_return_value }
             */
            root() {
                return this.eve();
            },
            /**
             * Returns the root node. 
             * @return     {Object}  return the very first node in the linked list graph.
             */
            eve() {
                if (this.par)
                    return this.par.eve();
                return this;
            },

            push(node) {
                this.addChild(node);
            },

            unshift(node) {
                this.addChild(node, (this.fch) ? this.fch.pre : null);
            },

            replace(old_node, new_node) {
                if (old_node.par == this && old_node !== new_node) {
                    if (new_node.par) new_node.par.remove(new_node);

                    if (this.fch == old_node) this.fch = new_node;
                    new_node.par = this;


                    if (old_node.nxt == old_node) {
                        new_node.nxt = new_node;
                        new_node.prv = new_node;
                    } else {
                        new_node.prv = old_node.prv;
                        new_node.nxt = old_node.nxt;
                        old_node.nxt.prv = new_node;
                        old_node.prv.nxt = new_node;
                    }

                    old_node.par = null;
                    old_node.prv = null;
                    old_node.nxt = null;
                }
            },

            insertBefore: function(node) {
                if (this.par)
                    this.par.addChild(node, this.pre);
                else
                    LinkedList.methods.defaults.insertBefore.call(this, node);
            },

            insertAfter: function(node) {
                if (this.par)
                    this.par.addChild(node, this);
                else
                    LinkedList.methods.defaults.insertAfter.call(this, node);
            },

            addChild: function(child = null, prev = null) {

                if (!child) return;

                if (child.par)
                    child.par.removeChild(child);

                if (prev && prev.par && prev.par == this) {
                    if (child == prev) return;
                    child.prv = prev;
                    prev.nxt.prv = child;
                    child.nxt = prev.nxt;
                    prev.nxt = child;
                } else if (this.fch) {
                    child.prv = this.fch.prv;
                    this.fch.prv.nxt = child;
                    child.nxt = this.fch;
                    this.fch.prv = child;
                } else {
                    this.fch = child;
                    child.nxt = child;
                    child.prv = child;
                }

                child.par = this;
                this.noc++;
            },

            /**
             * Analogue to HTMLElement.removeChild()
             *
             * @param      {HTMLNode}  child   The child
             */
            removeChild: function(child) {
                if (child.par && child.par == this) {
                    child.prv.nxt = child.nxt;
                    child.nxt.prv = child.prv;

                    if (child.prv == child || child.nxt == child) {
                        if (this.fch == child)
                            this.fch = null;
                    } else if (this.fch == child)
                        this.fch = child.nxt;

                    child.prv = null;
                    child.nxt = null;
                    child.par = null;
                    this.noc--;
                }
            },

            /**
             * Gets the next node. 
             *
             * @param      {HTMLNode}  node    The node to get the sibling of.
             * @return {HTMLNode | TextNode | undefined}
             */
            getNextChild: function(node = this.fch) {
                if (node && node.nxt != this.fch && this.fch)
                    return node.nxt;
                return null;
            },

            /**
             * Gets the child at index.
             *
             * @param      {number}  index   The index
             */
            getChildAtIndex: function(index, node = this.fch) {
                if(node.par !== this)
                    node = this.fch;

                let first = node;
                let i = 0;
                while (node && node != first) {
                    if (i++ == index)
                        return node;
                    node = node.nxt;
                }

                return null;
            },
        }
    },

    gettersAndSetters : {
        peer : {
            next: {
                enumerable: true,
                configurable: true,
                get: function() {
                    return this.nxt;
                },
                set: function(n) {
                    this.insertAfter(n);
                }
            },
            previous: {
                enumerable: true,
                configurable: true,
                get: function() {
                    return this.prv;
                },
                set: function(n) {
                    this.insertBefore(n);
                }   
            }
        },
        tree : {
            children: {
                enumerable: true,
                configurable: true,
                /**
                 * @return {array} Returns an array of all children.
                 */
                get: function() {
                    for (var z = [], i = 0, node = this.fch; i++ < this.noc;)(
                        z.push(node), node = node.nxt
                    );
                    return z;
                },
                set: function(e) {
                    /* No OP */
                }
            },
            parent: {
                enumerable: true,
                configurable: true,
                /**
                 * @return parent node
                 */
                get: function() {
                    return this.par;
                },
                set: function(p) {
                    if(p && p.addChild)
                        p.addChild(this);
                    else if(p === null && this.par)
                        this.par.removeChild(this);
                }
            }
        }
    },


    mixin : (constructor)=>{
        const proto = (typeof(constructor) == "function") ? constructor.prototype : (typeof(constructor) == "object") ? constructor : null;
        if(proto){
            Object.assign(proto, 
                LinkedList.props.defaults, 
                LinkedList.methods.defaults
            );
        }
        Object.defineProperties(proto, LinkedList.gettersAndSetters.peer);
    },

    mixinTree : (constructor)=>{
        const proto = (typeof(constructor) == "function") ? constructor.prototype : (typeof(constructor) == "object") ? constructor : null;
        if(proto){
            Object.assign(proto, 
                LinkedList.props.defaults, 
                LinkedList.props.children, 
                LinkedList.props.parent, 
                LinkedList.methods.defaults, 
                LinkedList.methods.parent_child
                );
            Object.defineProperties(proto, LinkedList.gettersAndSetters.tree);
            Object.defineProperties(proto, LinkedList.gettersAndSetters.peer);
        }
    }
};

/**
 * Holds a set of rendered CSS properties.
 * @memberof module:wick~internals.css
 * @alias CSSRule
 */
class CSSRule {
    constructor(root) {
        /**
         * Collection of properties held by this rule.
         * @public
         */
        this.props = {};
        this.LOADED = false;
        this.root = root;

        //Reference Counting
        this.refs = 0;

        //Versioning
        this.ver = 0;
    }

    incrementRef(){
        this.refs++;
    }

    decrementRef(){
        this.refs--;
        if(this.refs <= 0){
            //TODO: remove from rules entries.
            debugger
        }
    }

    addProperty(prop, rule) {
        if (prop)
            this.props[prop.name] = prop.value;
    }



    toString(off = 0, rule = "") {
        let str = [],
            offset = ("    ").repeat(off);

        if (rule) {
            if (this.props[rule]) {
                if (Array.isArray(this.props[rule]))
                    str.push(this.props[rule].join(" "));
                else
                    str.push(this.props[rule].toString());
            }else
                return "";
        } else {
            for (let a in this.props) {
                if (this.props[a] !== null) {
                    if (Array.isArray(this.props[a]))
                        str.push(offset, a.replace(/\_/g, "-"), ":", this.props[a].join(" "), ";\n");
                    else
                        str.push(offset, a.replace(/\_/g, "-"), ":", this.props[a].toString(), ";\n");
                }
            }
        }

        return str.join(""); //JSON.stringify(this.props).replace(/\"/g, "").replace(/\_/g, "-");
    }

    merge(rule) {
        if (rule.props) {
            for (let n in rule.props)
                this.props[n] = rule.props[n];
            this.LOADED = true;
            this.ver++;
        }
    }

    get _wick_type_() { return 0; }

    set _wick_type_(v) {}
}

class Color extends Float64Array {

    constructor(r, g, b, a = 0) {
        super(4);

        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = 1;

        if (typeof(r) === "number") {
            this.r = r; //Math.max(Math.min(Math.round(r),255),-255);
            this.g = g; //Math.max(Math.min(Math.round(g),255),-255);
            this.b = b; //Math.max(Math.min(Math.round(b),255),-255);
            this.a = a; //Math.max(Math.min(a,1),-1);
        }
    }

    get r() {
        return this[0];
    }

    set r(r) {
        this[0] = r;
    }

    get g() {
        return this[1];
    }

    set g(g) {
        this[1] = g;
    }

    get b() {
        return this[2];
    }

    set b(b) {
        this[2] = b;
    }

    get a() {
        return this[3];
    }

    set a(a) {
        this[3] = a;
    }

    set(color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = (color.a != undefined) ? color.a : this.a;
    }

    add(color) {
        return new Color(
            color.r + this.r,
            color.g + this.g,
            color.b + this.b,
            color.a + this.a
        );
    }

    mult(color) {
        if (typeof(color) == "number") {
            return new Color(
                this.r * color,
                this.g * color,
                this.b * color,
                this.a * color
            );
        } else {
            return new Color(
                this.r * color.r,
                this.g * color.g,
                this.b * color.b,
                this.a * color.a
            );
        }
    }

    sub(color) {
        return new Color(
            this.r - color.r,
            this.g - color.g,
            this.b - color.b,
            this.a - color.a
        );
    }

    lerp(to, t){
        return this.add(to.sub(this).mult(t));
    }

    toString() {
        return `rgba(${this.r|0},${this.g|0},${this.b|0},${this.a})`;
    }

    toJSON() {
        return `rgba(${this.r|0},${this.g|0},${this.b|0},${this.a})`;
    }

    copy(other){
        let out = new Color(other);
        return out;
    }
}

/*
    BODY {color: black; background: white }
    H1 { color: maroon }
    H2 { color: olive }
    EM { color: #f00 }              // #rgb //
    EM { color: #ff0000 }           // #rrggbb //
    EM { color: rgb(255,0,0) }      // integer range 0 - 255 //
    EM { color: rgb(100%, 0%, 0%) } // float range 0.0% - 100.0% //
*/
class CSS_Color extends Color {

    /** UI FUNCTIONS **/

    static list(){}

    static valueHandler(existing_value){
        let ele = document.createElement("input");
        ele.type = "color";
        ele.value = (existing_value) ? existing_value+ "" : "#000000";
        ele.addEventListener("change", (e)=>{
            ele.css_value = ele.value;
        });
        return ele;
    }

    static setInput(input, value){
        input.type = "color";
        input.value = value;
    }

    static buildInput(){
        let ele = document.createElement("input");
        ele.type = "color";
        return ele;
    }

    static parse(l, rule, r) {

        let c = CSS_Color._fs_(l);

        if (c) {

            let color = new CSS_Color();

            color.set(c);

            return color;
        }

        return null;
    }
    static _verify_(l) {
        let c = CSS_Color._fs_(l, true);
        if (c)
            return true;
        return false;
    }
    /**
        Creates a new Color from a string or a Lexer.
    */
    static _fs_(l, v = false) {
        let c;

        if (typeof(l) == "string")
            l = whind$1(l);

        let out = { r: 0, g: 0, b: 0, a: 1 };

        switch (l.ch) {
            case "#":
                l.next();
                let pk = l.copy();

                let type = l.types;
                pk.IWS = false;


                while(!(pk.ty & (type.newline | type.ws)) && !pk.END && pk.ch !== ";"){
                    pk.next();
                }

                var value = pk.slice(l);
                l.sync(pk);
                l.tl = 0;
                l.next();
                
                let num = parseInt(value,16);

                if(value.length == 3 || value.length == 4){
                    
                    if(value.length == 4){
                        const a = (num >> 8) & 0xF;
                        out.a = a | a << 4;
                        num >>= 4;
                    }

                    const r = (num >> 8) & 0xF;
                    out.r = r | r << 4;
                    
                    const g = (num >> 4) & 0xF;
                    out.g = g | g << 4;
                    
                    const b = (num) & 0xF;
                    out.b = b | b << 4;

                }else{

                    if(value.length == 8){
                        out.a = num & 0xFF;
                        num >>= 8;
                    }

                    out.r = (num >> 16) & 0xFF;       
                    out.g = (num >> 8) & 0xFF;
                    out.b = (num) & 0xFF;
                }
                l.next();
                break;
            case "r":
                let tx = l.tx;

                const RGB_TYPE = tx === "rgba"  ? 1 : tx === "rgb" ? 2 : 0;
                
                if(RGB_TYPE > 0){

                    l.next(); // (
                    
                    out.r = parseInt(l.next().tx);
                    
                    l.next(); // , or  %

                    if(l.ch == "%"){
                        l.next(); out.r = out.r * 255 / 100;
                    }
                    
                    
                    out.g = parseInt(l.next().tx);
                    
                    l.next(); // , or  %
                   
                    if(l.ch == "%"){
                        l.next(); out.g = out.g * 255 / 100;
                    }
                    
                    
                    out.b = parseInt(l.next().tx);
                    
                    l.next(); // , or ) or %
                    
                    if(l.ch == "%")
                        l.next(), out.b = out.b * 255 / 100;

                    if(RGB_TYPE < 2){
                        out.a = parseFloat(l.next().tx);

                        l.next();
                        
                        if(l.ch == "%")
                            l.next(), out.a = out.a * 255 / 100;
                    }

                    l.a(")");
                    c = new CSS_Color();
                    c.set(out);
                    return c;
                }  // intentional
            default:

                let string = l.tx;

                if (l.ty == l.types.str){
                    string = string.slice(1, -1);
                }

                out = CSS_Color.colors[string.toLowerCase()];

                if(out)
                    l.next();
        }

        return out;
    }

    constructor(r, g, b, a) {
        super(r, g, b, a);

        if (typeof(r) == "string")
            this.set(CSS_Color._fs_(r) || {r:255,g:255,b:255,a:0});

    }

    toString(){
        return `#${("0"+this.r.toString(16)).slice(-2)}${("0"+this.g.toString(16)).slice(-2)}${("0"+this.b.toString(16)).slice(-2)}`
    }
    toRGBString(){
        return `rgba(${this.r.toString()},${this.g.toString()},${this.b.toString()},${this.a.toString()})`   
    }
} {

    let _$ = (r = 0, g = 0, b = 0, a = 1) => ({ r, g, b, a });
    let c = _$(0, 255, 25);
    CSS_Color.colors = {
        "alice blue": _$(240, 248, 255),
        "antique white": _$(250, 235, 215),
        "aqua marine": _$(127, 255, 212),
        "aqua": c,
        "azure": _$(240, 255, 255),
        "beige": _$(245, 245, 220),
        "bisque": _$(255, 228, 196),
        "black": _$(),
        "blanched almond": _$(255, 235, 205),
        "blue violet": _$(138, 43, 226),
        "blue": _$(0, 0, 255),
        "brown": _$(165, 42, 42),
        "burly wood": _$(222, 184, 135),
        "cadet blue": _$(95, 158, 160),
        "chart reuse": _$(127, 255),
        "chocolate": _$(210, 105, 30),
        "clear": _$(255, 255, 255),
        "coral": _$(255, 127, 80),
        "corn flower blue": _$(100, 149, 237),
        "corn silk": _$(255, 248, 220),
        "crimson": _$(220, 20, 60),
        "cyan": c,
        "dark blue": _$(0, 0, 139),
        "dark cyan": _$(0, 139, 139),
        "dark golden rod": _$(184, 134, 11),
        "dark gray": _$(169, 169, 169),
        "dark green": _$(0, 100),
        "dark khaki": _$(189, 183, 107),
        "dark magenta": _$(139, 0, 139),
        "dark olive green": _$(85, 107, 47),
        "dark orange": _$(255, 140),
        "dark orchid": _$(153, 50, 204),
        "dark red": _$(139),
        "dark salmon": _$(233, 150, 122),
        "dark sea green": _$(143, 188, 143),
        "dark slate blue": _$(72, 61, 139),
        "dark slate gray": _$(47, 79, 79),
        "dark turquoise": _$(0, 206, 209),
        "dark violet": _$(148, 0, 211),
        "deep pink": _$(255, 20, 147),
        "deep sky blue": _$(0, 191, 255),
        "dim gray": _$(105, 105, 105),
        "dodger blue": _$(30, 144, 255),
        "firebrick": _$(178, 34, 34),
        "floral white": _$(255, 250, 240),
        "forest green": _$(34, 139, 34),
        "fuchsia": _$(255, 0, 255),
        "gainsboro": _$(220, 220, 220),
        "ghost white": _$(248, 248, 255),
        "gold": _$(255, 215),
        "golden rod": _$(218, 165, 32),
        "gray": _$(128, 128, 128),
        "green yellow": _$(173, 255, 47),
        "green": _$(0, 128),
        "honeydew": _$(240, 255, 240),
        "hot pink": _$(255, 105, 180),
        "indian red": _$(205, 92, 92),
        "indigo": _$(75, 0, 130),
        "ivory": _$(255, 255, 240),
        "khaki": _$(240, 230, 140),
        "lavender blush": _$(255, 240, 245),
        "lavender": _$(230, 230, 250),
        "lawn green": _$(124, 252),
        "lemon chiffon": _$(255, 250, 205),
        "light blue": _$(173, 216, 230),
        "light coral": _$(240, 128, 128),
        "light cyan": _$(224, 255, 255),
        "light golden rod yellow": _$(250, 250, 210),
        "light gray": _$(211, 211, 211),
        "light green": _$(144, 238, 144),
        "light pink": _$(255, 182, 193),
        "light salmon": _$(255, 160, 122),
        "light sea green": _$(32, 178, 170),
        "light sky blue": _$(135, 206, 250),
        "light slate gray": _$(119, 136, 153),
        "light steel blue": _$(176, 196, 222),
        "light yellow": _$(255, 255, 224),
        "lime green": _$(50, 205, 50),
        "lime": _$(0, 255),
        "lime": _$(0, 255),
        "linen": _$(250, 240, 230),
        "magenta": _$(255, 0, 255),
        "maroon": _$(128),
        "medium aqua marine": _$(102, 205, 170),
        "medium blue": _$(0, 0, 205),
        "medium orchid": _$(186, 85, 211),
        "medium purple": _$(147, 112, 219),
        "medium sea green": _$(60, 179, 113),
        "medium slate blue": _$(123, 104, 238),
        "medium spring green": _$(0, 250, 154),
        "medium turquoise": _$(72, 209, 204),
        "medium violet red": _$(199, 21, 133),
        "midnight blue": _$(25, 25, 112),
        "mint cream": _$(245, 255, 250),
        "misty rose": _$(255, 228, 225),
        "moccasin": _$(255, 228, 181),
        "navajo white": _$(255, 222, 173),
        "navy": _$(0, 0, 128),
        "old lace": _$(253, 245, 230),
        "olive drab": _$(107, 142, 35),
        "olive": _$(128, 128),
        "orange red": _$(255, 69),
        "orange": _$(255, 165),
        "orchid": _$(218, 112, 214),
        "pale golden rod": _$(238, 232, 170),
        "pale green": _$(152, 251, 152),
        "pale turquoise": _$(175, 238, 238),
        "pale violet red": _$(219, 112, 147),
        "papaya whip": _$(255, 239, 213),
        "peach puff": _$(255, 218, 185),
        "peru": _$(205, 133, 63),
        "pink": _$(255, 192, 203),
        "plum": _$(221, 160, 221),
        "powder blue": _$(176, 224, 230),
        "purple": _$(128, 0, 128),
        "red": _$(255),
        "rosy brown": _$(188, 143, 143),
        "royal blue": _$(65, 105, 225),
        "saddle brown": _$(139, 69, 19),
        "salmon": _$(250, 128, 114),
        "sandy brown": _$(244, 164, 96),
        "sea green": _$(46, 139, 87),
        "sea shell": _$(255, 245, 238),
        "sienna": _$(160, 82, 45),
        "silver": _$(192, 192, 192),
        "sky blue": _$(135, 206, 235),
        "slate blue": _$(106, 90, 205),
        "slate gray": _$(112, 128, 144),
        "snow": _$(255, 250, 250),
        "spring green": _$(0, 255, 127),
        "steel blue": _$(70, 130, 180),
        "tan": _$(210, 180, 140),
        "teal": _$(0, 128, 128),
        "thistle": _$(216, 191, 216),
        "tomato": _$(255, 99, 71),
        "transparent": _$(0, 0, 0, 0),
        "turquoise": _$(64, 224, 208),
        "violet": _$(238, 130, 238),
        "wheat": _$(245, 222, 179),
        "white smoke": _$(245, 245, 245),
        "white": _$(255, 255, 255),
        "yellow green": _$(154, 205, 50),
        "yellow": _$(255, 255)
    };
}

class CSS_Percentage extends Number {
    static setInput(input, value){
        input.type = "number";
        input.value = parseFloat(value);
    }

    static buildInput(value){
        let ele = document.createElement("input");
        ele.type = "number";
        ele.value = parseFloat(value) || 0;
        ele.addEventListener("change", (e)=>{
            ele.css_value = ele.value + "%";
        });
        return ele;
    }
    
    static parse(l, rule, r) {
        let tx = l.tx,
            pky = l.pk.ty;

        if (l.ty == l.types.num || tx == "-" && pky == l.types.num) {
            let mult = 1;

            if (l.ch == "-") {
                mult = -1;
                tx = l.p.tx;
                l.p.next();
            }

            if (l.p.ch == "%") {
                l.sync().next();
                return new CSS_Percentage(parseFloat(tx) * mult);
            }
        }
        return null;
    }

    static _verify_(l) {
        if(typeof(l) == "string" &&  !isNaN(parseInt(l)) && l.includes("%"))
            return true;
        return false;
    }

    static valueHandler(){
        let ele = document.createElement("input");
        ele.type = "number";
        ele.value = 100;
        return ele;
    }

    constructor(v) {

        if (typeof(v) == "string") {
            let lex = whind(v);
            let val = CSS_Percentage.parse(lex);
            if (val) 
                return val;
        }
        
        super(v);
    }

    toJSON() {
        return super.toString() + "%";
    }

    toString(radix) {
        return super.toString(radix) + "%";
    }

    get str() {
        return this.toString();
    }

    lerp(to, t) {
        return new CSS_Percentage(this + (to - this) * t);
    }

    copy(other){
        return new CSS_Percentage(other);
    }

    get type(){
        return "%";
    }
}

CSS_Percentage.label_name = "Percentage";

class CSS_Length extends Number {

    static valueHandler(value, ui_seg){
        let ele = document.createElement("input");


        ele.type = "number";
        ele.value = (value) ? value + 0 : 0;
        
        ui_seg.css_value = ele.value + "%";
        
        ele.addEventListener("change", (e)=>{
            ele.css_value = ele.value + "px";
        });
        return ele;
    }

    static setInput(input, value){
        input.type = "number";
        input.value = value;
    }

    static buildInput(){
        let ele = document.createElement("input");
        ele.type = "number";
        return ele;
    }

    static parse(l, rule, r) {
        let tx = l.tx,
            pky = l.pk.ty;
        if (l.ty == l.types.num || tx == "-" && pky == l.types.num) {
            let sign = 1;
            if (l.ch == "-") {
                sign = -1;
                tx = l.p.tx;
                l.p.next();
            }
            if (l.p.ty == l.types.id) {
                let id = l.sync().tx;
                l.next();
                return new CSS_Length(parseFloat(tx) * sign, id);
            }
        }
        return null;
    }

    static _verify_(l) {
        if (typeof(l) == "string" && !isNaN(parseInt(l)) && !l.includes("%")) return true;
        return false;
    }

    constructor(v, u = "") {
        
        if (typeof(v) == "string") {
            let lex = whind$1(v);
            let val = CSS_Length.parse(lex);
            if (val) return val;
        }

        if(u){
            switch(u){
                //Absolute
                case "px": return new PXLength(v);
                case "mm": return new MMLength(v);
                case "cm": return new CMLength(v);
                case "in": return new INLength(v);
                case "pc": return new PCLength(v);
                case "pt": return new PTLength(v);
                
                //Relative
                case "ch": return new CHLength(v);
                case "em": return new EMLength(v);
                case "ex": return new EXLength(v);
                case "rem": return new REMLength(v);

                //View Port
                case "vh": return new VHLength(v);
                case "vw": return new VWLength(v);
                case "vmin": return new VMINLength(v);
                case "vmax": return new VMAXLength(v);

                //Deg
                case "deg": return new DEGLength(v);

                case "%" : return new CSS_Percentage(v);
            }
        }

        super(v);
    }

    get milliseconds() {
        switch (this.unit) {
            case ("s"):
                return parseFloat(this) * 1000;
        }
        return parseFloat(this);
    }

    toString(radix) {
        return super.toString(radix) + "" + this.unit;
    }

    toJSON() {
        return super.toString() + "" + this.unit;
    }

    get str() {
        return this.toString();
    }

    lerp(to, t) {
        return new CSS_Length(this + (to - this) * t, this.unit);
    }

    copy(other) {
        return new CSS_Length(other, this.unit);
    }

    set unit(t){}
    get unit(){return "";}
}

class PXLength extends CSS_Length {
    get unit(){return "px";}
}
class MMLength extends CSS_Length {
    get unit(){return "mm";}
}
class CMLength extends CSS_Length {
    get unit(){return "cm";}
}
class INLength extends CSS_Length {
    get unit(){return "in";}
}
class PTLength extends CSS_Length {
    get unit(){return "pt";}
}
class PCLength extends CSS_Length {
    get unit(){return "pc";}
}
class CHLength extends CSS_Length {
    get unit(){return "ch";}
}
class EMLength extends CSS_Length {
    get unit(){return "em";}
}
class EXLength extends CSS_Length {
    get unit(){return "ex";}
}
class REMLength extends CSS_Length {
    get unit(){return "rem";}
}
class VHLength extends CSS_Length {
    get unit(){return "vh";}
}
class VWLength extends CSS_Length {
    get unit(){return "vw";}
}
class VMINLength extends CSS_Length {
    get unit(){return "vmin";}
}
class VMAXLength extends CSS_Length {
    get unit(){return "vmax";}
}
class DEGLength extends CSS_Length {
    get unit(){return "deg";}
}

class CSS_URL extends URL {
    static parse(l, rule, r) {
        if (l.tx == "url" || l.tx == "uri") {
            l.next().a("(");
            let v = "";
            if (l.ty == l.types.str) {
                v = l.tx.slice(1,-1);
                l.next().a(")");
            } else {
                const p = l.peek();
                while (!p.END && p.next().tx !== ")") { /* NO OP */ }
                v = p.slice(l);
                l.sync().a(")");
            }
            return new CSS_URL(v);
        } if (l.ty == l.types.str){
            let v = l.tx.slice(1,-1);
            l.next();
            return new CSS_URL(v);
        }

        return null;
    }
}

class CSS_String extends String {
    
    static list(){}

    static valueHandler(existing_value){
        let ele = document.createElement("input");
        ele.type = "text";
        ele.value = existing_value || "";
        return ele;
    }

    static setInput(input, value){
        input.type = "text";
        input.value = value;
    }

    static buildInput(){
        let ele = document.createElement("input");
        ele.type = "text";
        return ele;
    }

    static parse(l, rule, r) {
        if (l.ty == l.types.str) {
            let tx = l.tx;
            l.next();
            return new CSS_String(tx);
        }
        return null;
    }

    constructor(string){
        if(string[0] == "\"" || string[0] == "\'" || string[0] == "\'")
            string = string.slice(1,-1);
        super(string);
    }
}

class CSS_Id extends String {
    static parse(l, rule, r) {
        if (l.ty == l.types.id) {
            let tx = l.tx;
            l.next();
            return new CSS_Id(tx);
        }
        return null;
    }
}

/* https://www.w3.org/TR/css-shapes-1/#typedef-basic-shape */
class CSS_Shape extends Array {
    static parse(l, rule, r) {
        if (l.tx == "inset" || l.tx == "circle" || l.tx == "ellipse" || l.tx == "polygon" || l.tx == "rect") {
            l.next().a("(");
            let v = "";
            if (l.ty == l.types.str) {
                v = l.tx.slice(1,-1);
                l.next().a(")");
            } else {
                let p = l.pk;
                while (!p.END && p.next().tx !== ")") { /* NO OP */ }
                v = p.slice(l);
                l.sync().a(")");
            }
            return new CSS_Shape(v);
        }
        return null;
    }
}

class CSS_Number extends Number {

    static valueHandler(value){
        let ele = document.createElement("input");
        ele.type = "number";
        ele.value = (value) ? value + 0 : 0;
        ele.addEventListener("change", (e)=>{
            ele.css_value = ele.value;
        });
        return ele;
    }

    static setInput(input, value){
        input.type = "number";
        input.value = value;
    }

    static buildInput(){
        let ele = document.createElement("input");
        ele.type = "number";
        return ele;
    }

    static parse(l, rule, r) {
        
        let sign = 1;

        if(l.ch == "-" && l.pk.ty == l.types.num){
        	l.sync();
        	sign = -1;
        }

        if(l.ty == l.types.num){
        	let tx = l.tx;
            l.next();
            return new CSS_Number(sign*(new Number(tx)));
        }
        return null;
    }
}

class Point2D extends Float64Array{
	
	constructor(x, y) {
		super(2);

		if (typeof(x) == "number") {
			this[0] = x;
			this[1] = y;
			return;
		}

		if (x instanceof Array) {
			this[0] = x[0];
			this[1] = x[1];
		}
	}

	draw(ctx, s = 1){
		ctx.beginPath();
		ctx.moveTo(this.x*s,this.y*s);
		ctx.arc(this.x*s, this.y*s, s*0.01, 0, 2*Math.PI);
		ctx.stroke();
	}

	get x (){ return this[0]}
	set x (v){if(typeof(v) !== "number") return; this[0] = v;}

	get y (){ return this[1]}
	set y (v){if(typeof(v) !== "number") return; this[1] = v;}
}

const sqrt = Math.sqrt;
const cos = Math.cos;
const acos = Math.acos;
const PI = Math.PI; 
const pow = Math.pow;

// A helper function to filter for values in the [0,1] interval:
function accept(t) {
  return 0<=t && t <=1;
}

// A real-cuberoots-only function:
function cuberoot(v) {
  if(v<0) return -pow(-v,1/3);
  return pow(v,1/3);
}

function point(t, p1, p2, p3, p4) {
	var ti = 1 - t;
	var ti2 = ti * ti;
	var t2 = t * t;
	return ti * ti2 * p1 + 3 * ti2 * t * p2 + t2 * 3 * ti * p3 + t2 * t * p4;
}


class CBezier extends Float64Array{
	constructor(x1, y1, x2, y2, x3, y3, x4, y4) {
		super(8);

		//Map P1 and P2 to {0,0,1,1} if only four arguments are provided; for use with animations
		if(arguments.length == 4){
			this[0] = 0;
			this[1] = 0;
			this[2] = x1;
			this[3] = y1;
			this[4] = x2;
			this[5] = y2;
			this[6] = 1;
			this[7] = 1;
			return;
		}
		
		if (typeof(x1) == "number") {
			this[0] = x1;
			this[1] = y1;
			this[2] = x2;
			this[3] = y2;
			this[4] = x3;
			this[5] = y3;
			this[6] = x4;
			this[7] = y4;
			return;
		}

		if (x1 instanceof Array) {
			this[0] = x1[0];
			this[1] = x1[1];
			this[2] = x1[2];
			this[3] = x1[3];
			this[4] = x1[4];
			this[5] = x1[5];
			this[6] = x1[6];
			this[7] = x1[4];
			return;
		}
	}

	get x1 (){ return this[0]}
	set x1 (v){this[0] = v;}
	get x2 (){ return this[2]}
	set x2 (v){this[2] = v;}
	get x3 (){ return this[4]}
	set x3 (v){this[4] = v;}
	get x4 (){ return this[6]}
	set x4 (v){this[6] = v;}
	get y1 (){ return this[1]}
	set y1 (v){this[1] = v;}
	get y2 (){ return this[3]}
	set y2 (v){this[3] = v;}
	get y3 (){ return this[5]}
	set y3 (v){this[5] = v;}
	get y4 (){ return this[7]}
	set y4 (v){this[7] = v;}

	add(x,y = 0){
		return new CCurve(
			this[0] + x,
			this[1] + y,
			this[2] + x,
			this[3] + y,
			this[4] + x,
			this[5] + y,
			this[6] + x,
			this[7] + y
		)
	}

	valY(t){
		return point(t, this[1], this[3], this[5], this[7]);
	}

	valX(t){
		return point(t, this[0], this[2], this[4], this[6]);
	}

	point(t) {
		return new Point2D(
			point(t, this[0], this[2], this[4], this[6]),
			point(t, this[1], this[3], this[5], this[7])
		)
	}
	
	/** 
		Acquired from : https://pomax.github.io/bezierinfo/
		Author:  Mike "Pomax" Kamermans
		GitHub: https://github.com/Pomax/
	*/

	roots(p1,p2,p3,p4) {
		var d = (-p1 + 3 * p2 - 3 * p3 + p4),
			a = (3 * p1 - 6 * p2 + 3 * p3) / d,
			b = (-3 * p1 + 3 * p2) / d,
			c = p1 / d;

		var p = (3 * b - a * a) / 3,
			p3 = p / 3,
			q = (2 * a * a * a - 9 * a * b + 27 * c) / 27,
			q2 = q / 2,
			discriminant = q2 * q2 + p3 * p3 * p3;

		// and some variables we're going to use later on:
		var u1, v1, root1, root2, root3;

		// three possible real roots:
		if (discriminant < 0) {
			var mp3 = -p / 3,
				mp33 = mp3 * mp3 * mp3,
				r = sqrt(mp33),
				t = -q / (2 * r),
				cosphi = t < -1 ? -1 : t > 1 ? 1 : t,
				phi = acos(cosphi),
				crtr = cuberoot(r),
				t1 = 2 * crtr;
			root1 = t1 * cos(phi / 3) - a / 3;
			root2 = t1 * cos((phi + 2 * PI) / 3) - a / 3;
			root3 = t1 * cos((phi + 4 * PI) / 3) - a / 3;
			return [root3, root1, root2]
		}

		// three real roots, but two of them are equal:
		if (discriminant === 0) {
			u1 = q2 < 0 ? cuberoot(-q2) : -cuberoot(q2);
			root1 = 2 * u1 - a / 3;
			root2 = -u1 - a / 3;
			return [root2, root1];
		}

		// one real root, two complex roots
		var sd = sqrt(discriminant);
		u1 = cuberoot(sd - q2);
		v1 = cuberoot(sd + q2);
		root1 = u1 - v1 - a / 3;
		return [root1];
	}

	rootsY() {
		return this.roots(this[1],this[3],this[5],this[7]);
	}

	rootsX() {
		return this.roots(this[0],this[2],this[4],this[6]);
	}
	
	getYatX(x){
		var x1 = this[0] - x, x2 = this[2] - x, x3 = this[4] - x, x4 = this[6] - x,
			x2_3 = x2 * 3, x1_3 = x1 *3, x3_3 = x3 * 3,
			d = (-x1 + x2_3 - x3_3 + x4), di = 1/d, i3 = 1/3,
			a = (x1_3 - 6 * x2 + x3_3) * di,
			b = (-x1_3 + x2_3) * di,
			c = x1 * di,
			p = (3 * b - a * a) * i3,
			p3 = p * i3,
			q = (2 * a * a * a - 9 * a * b + 27 * c) * (1/27),
			q2 = q * 0.5,
			discriminant = q2 * q2 + p3 * p3 * p3;

		// and some variables we're going to use later on:
		var u1, v1, root;

		//Three real roots can never happen if p1(0,0) and p4(1,1);

		// three real roots, but two of them are equal:
		if (discriminant < 0) {
			var mp3 = -p / 3,
				mp33 = mp3 * mp3 * mp3,
				r = sqrt(mp33),
				t = -q / (2 * r),
				cosphi = t < -1 ? -1 : t > 1 ? 1 : t,
				phi = acos(cosphi),
				crtr = cuberoot(r),
				t1 = 2 * crtr;
			root = t1 * cos((phi + 4 * PI) / 3) - a / 3;
		}else if (discriminant === 0) {
			u1 = q2 < 0 ? cuberoot(-q2) : -cuberoot(q2);
			root = -u1 - a * i3;
		}else{
			var sd = sqrt(discriminant);
			// one real root, two complex roots
			u1 = cuberoot(sd - q2);
			v1 = cuberoot(sd + q2);
			root = u1 - v1 - a * i3;	
		}

		return point(root, this[1], this[3], this[5], this[7]);
	}
	/**
		Given a Canvas 2D context object and scale value, strokes a cubic bezier curve.
	*/
	draw(ctx, s = 1){
		ctx.beginPath();
		ctx.moveTo(this[0]*s, this[1]*s);
		ctx.bezierCurveTo(
			this[2]*s, this[3]*s,
			this[4]*s, this[5]*s,
			this[6]*s, this[7]*s
			);
		ctx.stroke();
	}
}

function curvePoint(curve, t) {
    var point = {
        x: 0,
        y: 0
    };
    point.x = posOnCurve(t, curve[0], curve[2], curve[4]);
    point.y = posOnCurve(t, curve[1], curve[3], curve[5]);
    return point;
}

function posOnCurve(t, p1, p2, p3) {
    var ti = 1 - t;
    return ti * ti * p1 + 2 * ti * t * p2 + t * t * p3;
}

function splitCurve(bp, t) {
    var left = [];
    var right = [];

    function drawCurve(bp, t) {
        if (bp.length == 2) {
            left.push(bp[0], bp[1]);
            right.push(bp[0], bp[1]);
        } else {
            var new_bp = []; //bp.slice(0,-2);
            for (var i = 0; i < bp.length - 2; i += 2) {
                if (i == 0) {
                    left.push(bp[i], bp[i + 1]);
                }
                if (i == bp.length - 4) {
                    right.push(bp[i + 2], bp[i + 3]);
                }
                new_bp.push((1 - t) * bp[i] + t * bp[i + 2]);
                new_bp.push((1 - t) * bp[i + 1] + t * bp[i + 3]);
            }
            drawCurve(new_bp, t);
        }
    }

    drawCurve(bp, t);

    return {
        x: new QBezier(right),
        y: new QBezier(left)
    };
}

function curveIntersections(p1, p2, p3) {
    var intersections = {
        a: Infinity,
        b: Infinity
    };

    var a = p1 - 2 * p2 + p3;

    var b = 2 * (p2 - p1);

    var c = p1;

    if (b == 0) {} else if (Math.abs(a) < 0.00000000005) {
        intersections.a = (-c / b); //c / b;
    } else {

        intersections.a = ((-b - Math.sqrt((b * b) - 4 * a * c)) / (2 * a));
        intersections.b = ((-b + Math.sqrt((b * b) - 4 * a * c)) / (2 * a));
    }
    return intersections
}

class QBezier {
    constructor(x1, y1, x2, y2, x3, y3) {
        this.x1 = 0;
        this.x2 = 0;
        this.x3 = 0;
        this.y1 = 0;
        this.y2 = 0;
        this.y3 = 0;

        if (typeof(x1) == "number") {
            this.x1 = x1;
            this.x2 = x2;
            this.x3 = x3;
            this.y1 = y1;
            this.y2 = y2;
            this.y3 = y3;
            return;
        }

        if (x1 instanceof QBezier) {
            this.x1 = x1.x1;
            this.x2 = x1.x2;
            this.x3 = x1.x3;
            this.y1 = x1.y1;
            this.y2 = x1.y2;
            this.y3 = x1.y3;
            return;
        }

        if (x1 instanceof Array) {
            this.x1 = x1[0];
            this.y1 = x1[1];
            this.x2 = x1[2];
            this.y2 = x1[3];
            this.x3 = x1[4];
            this.y3 = x1[5];
            return;
        }
    }

    reverse() {
        return new QBezier(
            this.x3,
            this.y3,
            this.x2,
            this.y2,
            this.x1,
            this.y1
        )
    }

    point(t) {
        return new Point2D(
            posOnCurve(t, this.x1, this.x2, this.x3),
            posOnCurve(t, this.y1, this.y2, this.y3))

    }

    tangent(t) {
        var tan = {
            x: 0,
            y: 0
        };

        var px1 = this.x2 - this.x1;
        var py1 = this.y2 - this.y1;

        var px2 = this.x3 - this.x2;
        var py2 = this.y3 - this.y2;

        tan.x = (1 - t) * px1 + t * px2;
        tan.y = (1 - t) * py1 + t * py2;

        return tan;
    }

    toArray() {
        return [this.x1, this.y1, this.x2, this.y2, this.x3, this.y3];
    }

    split(t) {
        return splitCurve(this.toArray(), t);
    }

    rootsX() {
        return this.roots(
            this.x1,
            this.x2,
            this.x3
        )

    }

    roots(p1, p2, p3) {
        var curve = this.toArray();

        var c = p1 - (2 * p2) + p3;
        var b = 2 * (p2 - p1);
        var a = p1;
        var a2 = a * 2;
        var sqrt = Math.sqrt(b * b - (a * 4 * c));
        var t1 = (-b + sqrt) / a2;
        var t2 = (-b - sqrt) / a2;

        return [t1, t2];
    }

    rootsa() {
        var curve = this.toArray();

        var p1 = curve[1];
        var p2 = curve[3];
        var p3 = curve[5];
        var x1 = curve[0];
        var x2 = curve[2];
        var x3 = curve[4];

        var py1d = 2 * (p2 - p1);
        var py2d = 2 * (p3 - p2);
        var ad1 = -py1d + py2d;
        var bd1 = py1d;

        var px1d = 2 * (x2 - x1);
        var px2d = 2 * (x3 - x2);
        var ad2 = -px1d + px2d;
        var bd2 = px1d;

        var t1 = -bd1 / ad1;
        var t2 = -bd2 / ad2;

        return [t1, t2];
    }

    boundingBox() {
        var x1 = curve[0];
        var y1 = curve[1];
        var x2 = curve[2];
        var y2 = curve[3];
        var x3 = curve[4];
        var y3 = curve[5];
        var roots = getRootsClamped(curve);
        var min_x = Math.min(x1, x2, x3, roots.y[0] || Infinity, roots.x[0] || Infinity);
        var min_y = Math.min(y1, y2, y3, roots.y[1] || Infinity, roots.x[1] || Infinity);
        var max_x = Math.max(x1, x2, x3, roots.y[0] || -Infinity, roots.x[0] || -Infinity);
        var max_y = Math.max(y1, y2, y3, roots.y[1] || -Infinity, roots.x[1] || -Infinity);

        return {
            min: {
                x: min_x,
                y: min_y
            },
            max: {
                x: max_x,
                y: max_y
            }
        };
    }

    rotate(angle, offset) {
        angle = (angle / 180) * Math.PI;

        var new_curve = this.toArray();

        for (var i = 0; i < 6; i += 2) {
            var x = curve[i] - offset.x;
            var y = curve[i + 1] - offset.y;
            new_curve[i] = ((x * Math.cos(angle) - y * Math.sin(angle))) + offset.x;
            new_curve[i + 1] = ((x * Math.sin(angle) + y * Math.cos(angle))) + offset.y;
        }

        return new QBezier(new_curve);
    }

    intersects() {
        return {
            x: curveIntersections(this.x1, this.x2, this.x3),
            y: curveIntersections(this.y1, this.y2, this.y3)
        }
    }

    add(x, y) {
        if (typeof(x) == "number") {
            return new QBezier(
                this.x1 + x,
                this.y1 + y,
                this.x2 + x,
                this.y2 + y,
                this.x3 + x,
                this.y3 + y,
            )
        }
    }
}

class CSS_Bezier extends CBezier {
	static parse(l, rule, r) {

		let out = null;

		switch(l.tx){
			case "cubic":
				l.next().a("(");
				let v1 = parseFloat(l.tx);
				let v2 = parseFloat(l.next().a(",").tx);
				let v3 = parseFloat(l.next().a(",").tx);
				let v4 = parseFloat(l.next().a(",").tx);
				l.a(")");
				out = new CSS_Bezier(v1, v2, v3, v4);
				break;
			case "ease":
				l.next();
				out = new CSS_Bezier(0.25, 0.1, 0.25, 1);
				break;
			case "ease-in":
				l.next();
				out = new CSS_Bezier(0.42, 0, 1, 1);
				break;
			case "ease-out":
				l.next();
				out = new CSS_Bezier(0, 0, 0.58, 1);
				break;
			case "ease-in-out":
				l.next();
				out = new CSS_Bezier(0.42, 0, 0.58, 1);
				break;
		}

		return out;
	}

	toString(){
		 return `cubic-bezier(${this[2]},${this[3]},${this[4]},${this[5]})`;
	}
}

class Stop{
    constructor(color, percentage){
        this.color = color;
        this.percentage = percentage || null;
    }

    toString(){
        return `${this.color}${(this.percentage)?" "+this.percentage:""}`;
    }
}

class CSS_Gradient{

    static parse(l, rule, r) {
        let tx = l.tx,
            pky = l.pk.ty;
        if (l.ty == l.types.id) {
            switch(l.tx){
                case "linear-gradient":
                l.next().a("(");
                let dir,num,type ="deg";
                if(l.tx == "to"){

                }else if(l.ty == l.types.num){
                    num = parseFloat(l.ty);
                    type = l.next().tx;
                    l.next().a(',');
                }

                let stops = [];
                
                while(!l.END && l.ch != ")"){
                    let v = CSS_Color.parse(l, rule, r);
                    let len = null;

                    if(l.ch == ")") {
                        stops.push(new Stop(v, len));
                        break;
                    }
                    
                    if(l.ch != ","){
                        if(!(len = CSS_Length.parse(l, rule, r)))
                            len = CSS_Percentage.parse(l,rule,r);
                    }else
                        l.next();
                    

                    stops.push(new Stop(v, len));
                }
                l.a(")");
                let grad = new CSS_Gradient();
                grad.stops = stops;
                return grad;
            }
        }
        return null;
    }


    constructor(type = 0){
        this.type = type; //linear gradient
        this.direction = new CSS_Length(0, "deg");
        this.stops = [];
    }

    toString(){
        let str = [];
        switch(this.type){
            case 0:
            str.push("linear-gradient(");
            if(this.direction !== 0)
                str.push(this.direction.toString() + ",");
            break;
        }

        for(let i = 0; i < this.stops.length; i++)
            str.push(this.stops[i].toString()+((i<this.stops.length-1)?",":""));

        str.push(")");

        return str.join(" ");
    }
}

const $medh = (prefix) => ({
    parse: (l, r, a, n = 0) => (n = CSS_Length.parse(l, r, a), (prefix > 0) ? ((prefix > 1) ? (win) => win.innerHeight <= n : (win) => win.innerHeight >= n) : (win) => win.screen.height == n)
});


const $medw = (prefix) => ({
    parse: (l, r, a, n = 0) => 
        (n = CSS_Length.parse(l, r, a), (prefix > 0) ? ((prefix > 1) ? (win) => win.innerWidth >= n : (win) => win.innerWidth <= n) : (win) => win.screen.width == n)
});

function CSS_Media_handle(type, prefix) {
    switch (type) {
        case "h":
            return $medh(prefix);
        case "w":
            return $medw(prefix);
    }

    return {
        parse: function(a, b, c) {
            debugger;
        }
    };
}

function getValue(lex, attribute) {
    let v = lex.tx,
        mult = 1;

    if (v == "-")
        v = lex.n.tx, mult = -1;

    let n = parseFloat(v) * mult;

    lex.next();

    if (lex.ch !== ")" && lex.ch !== ",") {
        switch (lex.tx) {
            case "%":
                break;

            /* Rotational Values */
            case "grad":
                n *= Math.PI / 200;
                break;
            case "deg":
                n *= Math.PI / 180;
                break;
            case "turn":
                n *= Math.PI * 2;
                break;
            case "px":
                break;
            case "em":
                break;
        }
        lex.next();
    }
    return n;
}

function ParseString(string, transform) {
    let lex = null;
    lex = string;

    if(typeof(string) == "string")
        lex = whind$1(string);
    
    while (!lex.END) {
        let tx = lex.tx;
        lex.next();
        switch (tx) {
            case "matrix":

                let a = getValue(lex.a("(")),
                    b = getValue(lex.a(",")),
                    c = getValue(lex.a(",")),
                    d = getValue(lex.a(",")),
                    r = -Math.atan2(b, a),
                    sx1 = (a / Math.cos(r)) || 0,
                    sx2 = (b / -Math.sin(r)) || 0,
                    sy1 = (c / Math.sin(r)) || 0,
                    sy2 = (d / Math.cos(r)) || 0;
                
                if(sx2 !== 0)
                    transform.sx = (sx1 + sx2) * 0.5;
                else
                    transform.sx = sx1;

                if(sy1 !== 0)
                    transform.sy = (sy1 + sy2) * 0.5;
                else
                    transform.sy = sy2;

                transform.px = getValue(lex.a(","));
                transform.py = getValue(lex.a(","));
                transform.r = r;
                lex.a(")");
                break;
            case "matrix3d":
                break;
            case "translate":
                transform.px = getValue(lex.a("("), "left");
                lex.a(",");
                transform.py = getValue(lex, "left");
                lex.a(")");
                continue;
            case "translateX":
                transform.px = getValue(lex.a("("), "left");
                lex.a(")");
                continue;
            case "translateY":
                transform.py = getValue(lex.a("("), "left");
                lex.a(")");
                continue;
            case "scale":
                transform.sx = getValue(lex.a("("), "left");
                if(lex.ch ==","){
                    lex.a(",");
                    transform.sy = getValue(lex, "left");
                }
                else transform.sy = transform.sx;
                lex.a(")");
                continue;
            case "scaleX":
                transform.sx = getValue(lex.a("("), "left");
                lex.a(")");
                continue;
            case "scaleY":
                transform.sy = getValue(lex.a("("), "left");
                lex.a(")");
                continue;
            case "scaleZ":
                break;
            case "rotate":
                transform.r = getValue(lex.a("("));
                lex.a(")");
                continue;
            case "rotateX":
                break;
            case "rotateY":
                break;
            case "rotateZ":
                break;
            case "rotate3d":
                break;
            case "perspective":
                break;
        }
        lex.next();
    }
}
// A 2D transform composition of 2D position, 2D scale, and 1D rotation.

class CSS_Transform2D extends Float64Array {
    static ToString(pos = [0, 0], scl = [1, 1], rot = 0) {
        var px = 0,
            py = 0,
            sx = 1,
            sy = 1,
            r = 0, cos = 1, sin = 0;
        if (pos.length == 5) {
            px = pos[0];
            py = pos[1];
            sx = pos[2];
            sy = pos[3];
            r = pos[4];
        } else {
            px = pos[0];
            py = pos[1];
            sx = scl[0];
            sy = scl[1];
            r = rot;
        }
        
        if(r !== 0){
            cos = Math.cos(r);
            sin = Math.sin(r);
        }

        return `matrix(${cos * sx}, ${-sin * sx}, ${sy * sin}, ${sy * cos}, ${px}, ${py})`;
    }


    constructor(px, py, sx, sy, r) {
        super(5);
        this.sx = 1;
        this.sy = 1;
        if (px !== undefined) {
            if (px instanceof CSS_Transform2D) {
                this[0] = px[0];
                this[1] = px[1];
                this[2] = px[2];
                this[3] = px[3];
                this[4] = px[4];
            } else if (typeof(px) == "string") ParseString(px, this);
            else {
                this[0] = px;
                this[1] = py;
                this[2] = sx;
                this[3] = sy;
                this[4] = r;
            }
        }
    }
    get px() {
        return this[0];
    }
    set px(v) {
        this[0] = v;
    }
    get py() {
        return this[1];
    }
    set py(v) {
        this[1] = v;
    }
    get sx() {
        return this[2];
    }
    set sx(v) {
        this[2] = v;
    }
    get sy() {
        return this[3];
    }
    set sy(v) {
        this[3] = v;
    }
    get r() {
        return this[4];
    }
    set r(v) {
        this[4] = v;
    }

    set scale(s){
        this.sx = s;
        this.sy = s;
    }

    get scale(){
        return this.sx;
    }
    
    lerp(to, t) {
        let out = new CSS_Transform2D();
        for (let i = 0; i < 5; i++) out[i] = this[i] + (to[i] - this[i]) * t;
        return out;
    }
    toString() {
        return CSS_Transform2D.ToString(this);
    }

    copy(v) {
        let copy = new CSS_Transform2D(this);


        if (typeof(v) == "string")
            ParseString(v, copy);

        return copy;
    }

    /**
     * Sets the transform value of a canvas 2D context;
     */
    setCTX(ctx){       
        let cos = 1, sin = 0;
        if(this[4] != 0){
            cos = Math.cos(this[4]);
            sin = Math.sin(this[4]);
        }
        ctx.transform(cos * this[2], -sin * this[2], this[3] * sin, this[3] * cos, this[0], this[1]);
    }

    getLocalX(X){
        return (X - this.px) / this.sx;
    }

    getLocalY(Y){
        return (Y - this.py) / this.sy;
    }
}

/**
 * @brief Path Info
 * @details Path syntax information for reference
 * 
 * MoveTo: M, m
 * LineTo: L, l, H, h, V, v
 * Cubic Bézier Curve: C, c, S, s
 * Quadratic Bézier Curve: Q, q, T, t
 * Elliptical Arc Curve: A, a
 * ClosePath: Z, z
 * 
 * Capital symbols represent absolute positioning, lowercase is relative
 */
const PathSym = {
    M: 0,
    m: 1,
    L: 2,
    l: 3,
    h: 4,
    H: 5,
    V: 6,
    v: 7,
    C: 8,
    c: 9,
    S: 10,
    s: 11,
    Q: 12,
    q: 13,
    T: 14,
    t: 15,
    A: 16,
    a: 17,
    Z: 18,
    z: 19,
    pairs: 20
};

function getSignedNumber(lex) {
    let mult = 1,
        tx = lex.tx;
    if (tx == "-") {
        mult = -1;
        tx = lex.n.tx;
    }
    lex.next();
    return parseFloat(tx) * mult;
}

function getNumberPair(lex, array) {
    let x = getSignedNumber(lex);
    if (lex.ch == ',') lex.next();
    let y = getSignedNumber(lex);
    array.push(x, y);
}

function parseNumberPairs(lex, array) {
    while ((lex.ty == lex.types.num || lex.ch == "-") && !lex.END) {    	
    	array.push(PathSym.pairs);
        getNumberPair(lex, array);
    }
}
/**
 * @brief An array store of path data in numerical form
 */
class CSS_Path extends Array {
    static FromString(string, array) {
        let lex = whind(string);
        while (!lex.END) {
            let relative = false,
                x = 0,
                y = 0;
            switch (lex.ch) {
                //Move to
                case "m":
                    relative = true;
                case "M":
                    lex.next(); //
                    array.push((relative) ? PathSym.m : PathSym.M);
                    getNumberPair(lex, array);
                    parseNumberPairs(lex, array);
                    continue;
                    //Line to
                case "h":
                    relative = true;
                case "H":
                    lex.next();
                    x = getSignedNumber(lex);
                    array.push((relative) ? PathSym.h : PathSym.H, x);
                    continue;
                case "v":
                    relative = true;
                case "V":
                    lex.next();
                    y = getSignedNumber(lex);
                    array.push((relative) ? PathSym.v : PathSym.V, y);
                    continue;
                case "l":
                    relative = true;
                case "L":
                    lex.next();
                    array.push((relative) ? PathSym.l : PathSym.L);
                    getNumberPair(lex, array);
                    parseNumberPairs(lex, array);
                    continue;
                    //Cubic Curve
                case "c":
                    relative = true;
                case "C":
                    array.push((relative) ? PathSym.c : PathSym.C);
                    getNumberPair(lex, array);
                    getNumberPair(lex, array);
                    getNumberPair(lex, array);
                    parseNumberPairs(lex, array);
                    continue;
                case "s":
                    relative = true;
                case "S":
                    array.push((relative) ? PathSym.s : PathSym.S);
                    getNumberPair(lex, array);
                    getNumberPair(lex, array);
                    parseNumberPairs(lex, array);
                    continue;
                    //Quadratic Curve0
                case "q":
                    relative = true;
                case "Q":
                    array.push((relative) ? PathSym.q : PathSym.Q);
                    getNumberPair(lex, array);
                    getNumberPair(lex, array);
                    parseNumberPairs(lex, array);
                    continue;
                case "t":
                    relative = true;
                case "T":
                    array.push((relative) ? PathSym.t : PathSym.T);
                    getNumberPair(lex, array);
                    parseNumberPairs(lex, array);
                    continue;
                    //Elliptical Arc
                    //Close path:
                case "z":
                    relative = true;
                case "Z":
                    array.push((relative) ? PathSym.z : PathSym.Z);
            }
            lex.next();
        }
    }

    static ToString(array) {
    	let string = [], l = array.length, i = 0;
    	while(i < l){
    		switch(array[i++]){
    			case PathSym.M:
    				string.push("M", array[i++], array[i++]);
    				break;
			    case PathSym.m:
			    	string.push("m", array[i++], array[i++]);
			    	break;
			    case PathSym.L:
			    	string.push("L", array[i++], array[i++]);
			    	break;
			    case PathSym.l:
			    	string.push("l", array[i++], array[i++]);
			    	break;
			    case PathSym.h:
			    	string.push("h", array[i++]);
			    	break;
			    case PathSym.H:
			    	string.push("H", array[i++]);
			    	break;
			    case PathSym.V:
			    	string.push("V", array[i++]);
			    	break;
			    case PathSym.v:
			    	string.push("v", array[i++]);
			    	break;
			    case PathSym.C:
			    	string.push("C", array[i++], array[i++], array[i++], array[i++], array[i++], array[i++]);
			    	break;
			    case PathSym.c:
			    	string.push("c", array[i++], array[i++], array[i++], array[i++], array[i++], array[i++]);
			    	break;
			    case PathSym.S:
			    	string.push("S", array[i++], array[i++], array[i++], array[i++]);
			    	break;
			    case PathSym.s:
			    	string.push("s", array[i++], array[i++], array[i++], array[i++]);
			    	break;
			    case PathSym.Q:
			    	string.push("Q", array[i++], array[i++], array[i++], array[i++]);
			    	break;
			    case PathSym.q:
			    	string.push("q", array[i++], array[i++], array[i++], array[i++]);
			    	break;
			    case PathSym.T:
			    	string.push("T", array[i++], array[i++]);
			    	break;
			    case PathSym.t:
			    	string.push("t", array[i++], array[i++]);
			    	break;
			    case PathSym.Z:
			    	string.push("Z");
			    	break;
			    case PathSym.z:
			    	string.push("z");
			    	break;
			    case PathSym.pairs:
			    	string.push(array[i++], array[i++]);
			    	break;
			 	case PathSym.A:
			    case PathSym.a:
			    default:
			    	i++;
    		}
    	}

    	return string.join(" ");
    }

    
    constructor(data) {
        super();	

    	if(typeof(data) == "string"){
    		Path.FromString(data, this);
    	}else if(Array.isArray(data)){
    		for(let i = 0; i < data.length;i++){
    			this.push(parseFloat(data[i]));
    		}
    	}
    }

    toString(){
    	return Path.ToString(this);
    }

    lerp(to, t, array = new Path){
    	let l = Math.min(this.length, to.length);

    	for(let i = 0; i < l; i++)
    		array[i] = this[i] + (to[i] - this[i]) * t;

    	return array;
    }	
}

class CSS_FontName extends String {
	static parse(l, rule, r) {

		if(l.ty == l.types.str){
			let tx = l.tx;
            l.next();
			return new CSS_String(tx);
		}		

		if(l.ty == l.types.id){

			let pk = l.peek();

			while(pk.type == l.types.id && !pk.END){
				pk.next();
			}

			let str = pk.slice(l);
			
			l.sync();
			return new CSS_String(str);
		}

        return null;
    }
}

/**
 * CSS Type constructors
 * @alias module:wick~internals.css.types.
 * @enum {object}
 * https://www.w3.org/TR/CSS2/about.html#property-defs
 */
const types$1 = {
	color: CSS_Color,
	length: CSS_Length,
	time: CSS_Length,
	flex: CSS_Length,
	angle: CSS_Length,
	frequency: CSS_Length,
	resolution: CSS_Length,
	percentage: CSS_Percentage,
	url: CSS_URL,
	uri: CSS_URL,
	number: CSS_Number,
	id: CSS_Id,
	string: CSS_String,
	shape: CSS_Shape,
	cubic_bezier: CSS_Bezier,
	integer: CSS_Number,
	gradient: CSS_Gradient,
	transform2D : CSS_Transform2D,
	path: CSS_Path,
	fontname: CSS_FontName,

	/* Media parsers */
	m_width: CSS_Media_handle("w", 0),
	m_min_width: CSS_Media_handle("w", 1),
	m_max_width: CSS_Media_handle("w", 2),
	m_height: CSS_Media_handle("h", 0),
	m_min_height: CSS_Media_handle("h", 1),
	m_max_height: CSS_Media_handle("h", 2),
	m_device_width: CSS_Media_handle("dw", 0),
	m_min_device_width: CSS_Media_handle("dw", 1),
	m_max_device_width: CSS_Media_handle("dw", 2),
	m_device_height: CSS_Media_handle("dh", 0),
	m_min_device_height: CSS_Media_handle("dh", 1),
	m_max_device_height: CSS_Media_handle("dh", 2)
};

/**
 * CSS Property Definitions https://www.w3.org/TR/css3-values/#value-defs
 * @alias module:wick~internals.css.property_definitions.
 * @enum {string}
 */
const property_definitions = {

	/* https://drafts.csswg.org/css-writing-modes-3/ */
		direction:"ltr|rtl",
		unicode_bidi:"normal|embed|isolate|bidi-override|isolate-override|plaintext",
		writing_mode:"horizontal-tb|vertical-rl|vertical-lr",
		text_orientation:"mixed|upright|sideways",
		glyph_orientation_vertical:`auto|0deg|90deg|"0"|"90"`,
		text_combine_upright:"none|all",

	/* https://www.w3.org/TR/css-position-3 */ 
		position: "static|relative|absolute|sticky|fixed",
		top: `<length>|<percentage>|auto`,
		left: `<length>|<percentage>|auto`,
		bottom: `<length>|<percentage>|auto`,
		right: `<length>|<percentage>|auto`,
		offset_before: `<length>|<percentage>|auto`,
		offset_after: `<length>|<percentage>|auto`,
		offset_start: `<length>|<percentage>|auto`,
		offset_end: `<length>|<percentage>|auto`,
		z_index:"auto|<integer>",

	/* https://www.w3.org/TR/css-display-3/ */
		display: `[ <display_outside> || <display_inside> ] | <display_listitem> | <display_internal> | <display_box> | <display_legacy>`,

	/* https://www.w3.org/TR/css-box-3 */
		margin: `[<length>|<percentage>|0|auto]{1,4}`,
		margin_top: `<length>|<percentage>|0|auto`,
		margin_right: `<length>|<percentage>|0|auto`,
		margin_bottom: `<length>|<percentage>|0|auto`,
		margin_left: `<length>|<percentage>|0|auto`,

		margin_trim:"none|in-flow|all",

		padding: `[<length>|<percentage>|0|auto]{1,4}`,
		padding_top: `<length>|<percentage>|0|auto`,
		padding_right: `<length>|<percentage>|0|auto`,
		padding_bottom: `<length>|<percentage>|0|auto`,
		padding_left: `<length>|<percentage>|0|auto`,

	/* https://www.w3.org/TR/CSS2/visuren.html */
		float: `left|right|none`,
		clear: `left|right|both|none`,

	/* https://drafts.csswg.org/css-sizing-3 todo:implement fit-content(%) function */
		box_sizing: `content-box | border-box`,
		width: `<length>|<percentage>|min-content|max-content|fit-content|auto`,
		height: `<length>|<percentage>|min-content|max-content|fit-content|auto`,
		min_width: `<length>|<percentage>|min-content|max-content|fit-content|auto`,
		max_width: `<length>|<percentage>|min-content|max-content|fit-content|auto|none`,
		min_height: `<length>|<percentage>|min-content|max-content|fit-content|auto`,
		max_height: `<length>|<percentage>|min-content|max-content|fit-content|auto|none`,

	/* https://www.w3.org/TR/2018/REC-css-color-3-20180619 */
		color: `<color>`,
		opacity: `<alphavalue>`,

	/* https://www.w3.org/TR/css-backgrounds-3/ */
		background_color: `<color>`,
		background_image: `<bg_image>#`,
		background_repeat: `<repeat_style>#`,
		background_attachment: `scroll|fixed|local`,
		background_position: `[<percentage>|<length>]{1,2}|[top|center|bottom]||[left|center|right]`,
		background_clip: `<box>#`,
		background_origin: `<box>#`,
		background_size: `<bg_size>#`,
		background: `[<bg_layer>#,]?<final_bg_layer>`,
		border_color: `<color>{1,4}`,
		border_top_color: `<color>`,
		border_right_color: `<color>`,
		border_bottom_color: `<color>`,
		border_left_color: `<color>`,

		border_top_width: `<line_width>`,
		border_right_width: `<line_width>`,
		border_bottom_width: `<line_width>`,
		border_left_width: `<line_width>`,
		border_width: `<line_width>{1,4}`,

		border_style: `<line_style>{1,4}`,
		border_top_style: `<line_style>`,
		border_right_style: `<line_style>`,
		border_bottom_style: `<line_style>`,
		border_left_style: `<line_style>`,

		border_top: `<line_width>||<line_style>||<color>`,
		border_right: `<line_width>||<line_style>||<color>`,
		border_bottom: `<line_width>||<line_style>||<color>`,
		border_left: `<line_width>||<line_style>||<color>`,

		border_radius: `<length_percentage>{1,4}[ / <length_percentage>{1,4}]?`,
		border_top_left_radius: `<length_percentage>{1,2}`,
		border_top_right_radius: `<length_percentage>{1,2}`,
		border_bottom_right_radius: `<length_percentage>{1,2}`,
		border_bottom_left_radius: `<length_percentage>{1,2}`,

		border: `<line_width>||<line_style>||<color>`,

		border_image: `<border_image_source>||<border_image_slice>[/<border_image_width>|/<border_image_width>?/<border_image_outset>]?||<border_image_repeat>`,
		border_image_source: `none|<image>`,
		border_image_slice: `[<number>|<percentage>]{1,4}&&fill?`,
		border_image_width: `[<length_percentage>|<number>|auto]{1,4}`,
		border_image_outset: `[<length>|<number>]{1,4}`,
		border_image_repeat: `[stretch|repeat|round|space]{1,2}`,
		box_shadow: `none|<shadow>#`,
		line_height: `normal|<percentage>|<length>|<number>`,
		overflow: 'visible|hidden|scroll|auto',

	/* https://www.w3.org/TR/css-fonts-4 */
		font_display: "auto|block|swap|fallback|optional",
		font_family: `[[<generic_family>|<family_name>],]*[<generic_family>|<family_name>]`,
		font_language_override:"normal|<string>",
		font: `[[<font_style>||<font_variant>||<font_weight>]?<font_size>[/<line_height>]?<font_family>]|caption|icon|menu|message-box|small-caption|status-bar`,
		font_max_size: `<absolute_size>|<relative_size>|<length>|<percentage>|infinity`,
		font_min_size: `<absolute_size>|<relative_size>|<length>|<percentage>`,
		font_optical_sizing: `auto|none`,
		font_pallette: `normal|light|dark|<identifier>`,
		font_size: `<absolute_size>|<relative_size>|<length>|<percentage>`,
		font_stretch:"<percentage>|normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded",
		font_style: `normal|italic|oblique<angle>?`,
		font_synthesis:"none|[weight||style]",
		font_synthesis_small_caps:"auto|none",
		font_synthesis_style:"auto|none",
		font_synthesis_weight:"auto|none",
		font_variant_alternates:"normal|[stylistic(<feature-value-name>)||historical-forms||styleset(<feature-value-name>#)||character-variant(<feature-value-name>#)||swash(<feature-value-name>)||ornaments(<feature-value-name>)||annotation(<feature-value-name>)]",
		font_variant_emoji:"auto|text|emoji|unicode",
		font_variation_settings:" normal|[<string><number>]#",
		font_size_adjust: `<number>|none`,
		
		font_weight: `normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900`,

	/* https://www.w3.org/TR/css-fonts-3/ */
		font_kerning: ` auto | normal | none`,
		font_variant: `normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby||[sub|super]]`,
		font_variant_ligatures:`normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values> ]`,
		font_variant_position:`normal|sub|super`,
		font_variant_caps:`normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps`,
		font_variant_numeric: "normal | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero ]",
		font_variant_east_asian:" normal | [ <east-asian-variant-values> || <east-asian-width-values> || ruby ]",

	/* https://drafts.csswg.org/css-text-3 */
		hanging_punctuation : "none|[first||[force-end|allow-end]||last]",
		hyphens : "none|manual|auto",
		letter_spacing: `normal|<length>`,
		line_break : "auto|loose|normal|strict|anywhere",
		overflow_wrap : "normal|break-word|anywhere",
		tab_size : "<length>|<number>",
		text_align : "start|end|left|right|center|justify|match-parent|justify-all",
		text_align_all : "start|end|left|right|center|justify|match-parent",
		text_align_last : "auto|start|end|left|right|center|justify|match-parent",
		text_indent : "[[<length>|<percentage>]&&hanging?&&each-line?]",
		text_justify : "auto|none|inter-word|inter-character",
		text_transform : "none|[capitalize|uppercase|lowercase]||full-width||full-size-kana",
		white_space : "normal|pre|nowrap|pre-wrap|break-spaces|pre-line",
		word_break : " normal|keep-all|break-all|break-word",
		word_spacing : "normal|<length>",
		word_wrap : "  normal | break-word | anywhere",

	/* https://drafts.csswg.org/css-text-decor-3 */
		text_decoration: "<text-decoration-line>||<text-decoration-style>||<color>",
		text_decoration_color:"<color>",
		text_decoration_line:"none|[underline||overline||line-through||blink]",
		text_decoration_style:"solid|double|dotted|dashed|wavy",
		text_emphasis:"<text-emphasis-style>||<text-emphasis-color>",
		text_emphasis_color:"<color>",
		text_emphasis_position:"[over|under]&&[right|left]?",
		text_emphasis_style:"none|[[filled|open]||[dot|circle|double-circle|triangle|sesame]]|<string>",
		text_shadow:"none|[<color>?&&<length>{2,3}]#",
		text_underline_position:"auto|[under||[left|right]]",

	/* Flex Box https://www.w3.org/TR/css-flexbox-1/ */
		align_content: `flex-start | flex-end | center | space-between | space-around | stretch`,
		align_items: `flex-start | flex-end | center | baseline | stretch`,
		align_self: `auto | flex-start | flex-end | center | baseline | stretch`,
		flex:`none|[<flex-grow> <flex-shrink>?||<flex-basis>]`,
		flex_basis:`content|<width>`,
		flex_direction:`row | row-reverse | column | column-reverse`,
		flex_flow:`<flex-direction>||<flex-wrap>`,
		flex_grow:`<number>`,
		flex_shrink:`<number>`,
		flex_wrap:`nowrap|wrap|wrap-reverse`,
		justify_content :"flex-start | flex-end | center | space-between | space-around",
		order:`<integer>`,

	/* https://drafts.csswg.org/css-transitions-1/ */
		transition: `<single_transition>#`,
		transition_delay: `<time>#`,
		transition_duration: `<time>#`,
		transition_property: `none|<single_transition_property>#`,
		transition_timing_function: `<timing_function>#`,

	/* CSS3 Animation https://drafts.csswg.org/css-animations-1/ */
		animation: `<single_animation>#`,
		animation_name: `[none|<keyframes_name>]#`,
		animation_duration: `<time>#`,
		animation_timing_function: `<timing_function>#`,
		animation_iteration_count: `<single_animation_iteration_count>#`,
		animation_direction: `<single_animation_direction>#`,
		animation_play_state: `<single_animation_play_state>#`,
		animation_delayed: `<time>#`,
		animation_fill_mode: `<single_animation_fill_mode>#`,

	/* https://svgwg.org/svg2-draft/interact.html#PointerEventsProperty */
		pointer_events : `visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|none|auto`,

	/* https://drafts.csswg.org/css-ui-3 */
		caret_color :"auto|<color>",
		cursor:"[[<url> [<number><number>]?,]*[auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|grab|grabbing|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out]]",
		outline:"[<outline-color>||<outline-style>||<outline-width>]",
		outline_color:"<color>|invert",
		outline_offset:"<length>",
		outline_style:"auto|<border-style>",
		outline_width:"<line-width>",
		resize:"none|both|horizontal|vertical",
		text_overflow:"clip|ellipsis",

	/* https://drafts.csswg.org/css-content-3/ */
		bookmark_label:"<content-list>",
		bookmark_level:"none|<integer>",
		bookmark_state:"open|closed",
		content:"normal|none|[<content-replacement>|<content-list>][/<string>]?",
		quotes:"none|[<string><string>]+",
		string_set:"none|[<custom-ident><string>+]#",
	
	/*https://www.w3.org/TR/CSS22/tables.html*/
		caption_side:"top|bottom",
		table_layout:"auto|fixed",
		border_collapse:"collapse|separate",
		border_spacing:"<length><length>?",
		empty_cells:"show|hide",

	/* https://www.w3.org/TR/CSS2/page.html */
		page_break_before:"auto|always|avoid|left|right",
		page_break_after:"auto|always|avoid|left|right",
		page_break_inside:"auto|avoid|left|right",
		orphans:"<integer>",
		widows:"<integer>",

	/* https://drafts.csswg.org/css-lists-3 */
		counter_increment:"[<custom-ident> <integer>?]+ | none",
		counter_reset:"[<custom-ident> <integer>?]+|none",
		counter_set:"[<custom-ident> <integer>?]+|none",
		list_style:"<list-style-type>||<list-style-position>||<list-style-image>",
		list_style_image:"<url>|none",
		list_style_position:"inside|outside",
		list_style_type:"<counter-style>|<string>|none",
		marker_side:"list-item|list-container",


	vertical_align: `baseline|sub|super|top|text-top|middle|bottom|text-bottom|<percentage>|<length>`,

	/* Visual Effects */
	clip: '<shape>|auto',
	visibility: `visible|hidden|collapse`,
	content: `normal|none|[<string>|<uri>|<counter>|attr(<identifier>)|open-quote|close-quote|no-open-quote|no-close-quote]+`,
	quotas: `[<string><string>]+|none`,
	counter_reset: `[<identifier><integer>?]+|none`,
	counter_increment: `[<identifier><integer>?]+|none`,
};

/* Properties that are not directly accessible by CSS prop creator */

const virtual_property_definitions = {
    /* https://drafts.csswg.org/css-counter-styles-3 */
        /*system:`cyclic|numeric|alphabetic|symbolic|additive|[fixed<integer>?]|[extends<counter-style-name>]`,
        negative:`<symbol><symbol>?`,
        prefix:`<symbol>`,
        suffix:`<symbol>`,
        range:`[[<integer>|infinite]{2}]#|auto`,
        pad:`<integer>&&<symbol>`,
        fallback:`<counter-style-name>`
        symbols:`<symbol>+`,*/

        counter_style:`<numeric_counter_style>|<alphabetic_counter_style>|<symbolic_counter_style>|<japanese_counter_style>|<korean_counter_style>|<chinese_counter_style>|ethiopic-numeric`,
        numeric_counter_style:`decimal|decimal-leading-zero|arabic-indic|armenian|upper-armenian|lower-armenian|bengali|cambodian|khmer|cjk-decimal|devanagari|georgian|gujarati|gurmukhi|hebrew|kannada|lao|malayalam|mongolian|myanmar|oriya|persian|lower-roman|upper-roman|tamil|telugu|thai|tibetan`,
        symbolic_counter_style:`disc|circle|square|disclosure-open|disclosure-closed`,
        alphabetic_counter_style:`lower-alpha|lower-latin|upper-alpha|upper-latin|cjk-earthly-branch|cjk-heavenly-stem|lower-greek|hiragana|hiragana-iroha|katakana|katakana-iroha`,
        japanese_counter_style:`japanese-informal|japanese-formal`,
        korean_counter_style:`korean-hangul-formal|korean-hanja-informal|and korean-hanja-formal`,
        chinese_counter_style:`simp-chinese-informal|simp-chinese-formal|trad-chinese-informal|and trad-chinese-formal`,

	/* https://drafts.csswg.org/css-content-3/ */
		content_list:"[<string>|contents|<image>|<quote>|<target>|<leader()>]+",
		content_replacement:"<image>",

	/* https://drafts.csswg.org/css-values-4 */
		custom_ident:"<identifier>",
		position:"[[left|center|right]||[top|center|bottom]|[left|center|right|<length-percentage>][top|center|bottom|<length-percentage>]?|[[left|right]<length-percentage>]&&[[top|bottom]<length-percentage>]]",
	
	/* https://drafts.csswg.org/css-lists-3 */

	east_asian_variant_values:"[jis78|jis83|jis90|jis04|simplified|traditional]",

	alphavalue: '<number>',

	box: `border-box|padding-box|content-box`,

	/*Font-Size: www.w3.org/TR/CSS2/fonts.html#propdef-font-size */
	absolute_size: `xx-small|x-small|small|medium|large|x-large|xx-large`,
	relative_size: `larger|smaller`,

	/*https://www.w3.org/TR/css-backgrounds-3/*/

	bg_layer: `<bg_image>||<bg_position>[/<bg_size>]?||<repeat_style>||<attachment>||<box>||<box>`,
	final_bg_layer: `<background_color>||<bg_image>||<bg_position>[/<bg_size>]?||<repeat_style>||<attachment>||<box>||<box>`,
	bg_image: `<url>|<gradient>|none`,
	repeat_style: `repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}`,
	background_attachment: `<attachment>#`,
	bg_size: `<length_percentage>|auto]{1,2}|cover|contain`,
	bg_position: `[[left|center|right|top|bottom|<length_percentage>]|[left|center|right|<length_percentage>][top|center|bottom|<length_percentage>]|[center|[left|right]<length_percentage>?]&&[center|[top|bottom]<length_percentage>?]]`,
	attachment: `scroll|fixed|local`,
	line_style: `none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset`,
	line_width: `thin|medium|thick|<length>`,
	shadow: `inset?&&<length>{2,4}&&<color>?`,

	/* Font https://www.w3.org/TR/css-fonts-4/#family-name-value */
	
	family_name: `<fontname>`,
	generic_family: `serif|sans-serif|cursive|fantasy|monospace`,
	
	/* Identifier https://drafts.csswg.org/css-values-4/ */

	identifier: `<id>`,
	custom_ident: `<id>`,

	/* https://drafts.csswg.org/css-timing-1/#typedef-timing-function */

	timing_function: `linear|<cubic_bezier_timing_function>|<step_timing_function>|<frames_timing_function>`,
	cubic_bezier_timing_function: `<cubic_bezier>`,
	step_timing_function: `step-start|step-end|'steps()'`,
	frames_timing_function: `'frames()'`,

	/* https://drafts.csswg.org/css-transitions-1/ */

	single_animation_fill_mode: `none|forwards|backwards|both`,
	single_animation_play_state: `running|paused`,
	single_animation_direction: `normal|reverse|alternate|alternate-reverse`,
	single_animation_iteration_count: `infinite|<number>`,
	single_transition_property: `all|<custom_ident>`,
	single_transition: `[none|<single_transition_property>]||<time>||<timing_function>||<time>`,

	/* CSS3 Animation https://drafts.csswg.org/css-animations-1/ */

	single_animation: `<time>||<timing_function>||<time>||<single_animation_iteration_count>||<single_animation_direction>||<single_animation_fill_mode>||<single_animation_play_state>||[none|<keyframes_name>]`,
	keyframes_name: `<string>`,

	/* CSS3 Stuff */
	length_percentage: `<length>|<percentage>`,
	frequency_percentage: `<frequency>|<percentage>`,
	angle_percentage: `<angle>|<percentage>`,
	time_percentage: `<time>|<percentage>`,
	number_percentage: `<number>|<percentage>`,

	/*CSS Clipping https://www.w3.org/TR/css-masking-1/#clipping */
	clip_path: `<clip_source>|[<basic_shape>||<geometry_box>]|none`,
	clip_source: `<url>`,
	shape_box: `<box>|margin-box`,
	geometry_box: `<shape_box>|fill-box|stroke-box|view-box`,
	basic_shape: `<CSS_Shape>`,
	ratio: `<integer>/<integer>`,

	/* https://www.w3.org/TR/css-fonts-3/*/
	common_lig_values        : `[ common-ligatures | no-common-ligatures ]`,
	discretionary_lig_values : `[ discretionary-ligatures | no-discretionary-ligatures ]`,
	historical_lig_values    : `[ historical-ligatures | no-historical-ligatures ]`,
	contextual_alt_values    : `[ contextual | no-contextual ]`,

	//Display
	display_outside  : `block | inline | run-in`,
	display_inside   : `flow | flow-root | table | flex | grid | ruby`,
	display_listitem : `<display_outside>? && [ flow | flow-root ]? && list-item`,
	display_internal : `table-row-group | table-header-group | table-footer-group | table-row | table-cell | table-column-group | table-column | table-caption | ruby-base | ruby-text | ruby-base-container | ruby-text-container`,
	display_box      : `contents | none`,
	display_legacy   : `inline-block | inline-table | inline-flex | inline-grid`,
};

const media_feature_definitions = {
	width: "<m_width>",
	min_width: "<m_max_width>",
	max_width: "<m_min_width>",
	height: "<m_height>",
	min_height: "<m_min_height>",
	max_height: "<m_max_height>",
	orientation: "portrait  | landscape",
	aspect_ratio: "<ratio>",
	min_aspect_ratio: "<ratio>",
	max_aspect_ratio: "<ratio>",
	resolution: "<length>",
	min_resolution: "<length>",
	max_resolution: "<length>",
	scan: "progressive|interlace",
	grid: "",
	monochrome: "",
	min_monochrome: "<integer>",
	max_monochrome: "<integer>",
	color: "",
	min_color: "<integer>",
	max_color: "<integer>",
	color_index: "",
	min_color_index: "<integer>",
	max_color_index: "<integer>",

};

/**
 * Used to _bind_ a rule to a CSS selector.
 * @param      {string}  selector        The raw selector string value
 * @param      {array}  selector_array  An array of selector group identifiers.
 * @memberof module:wick~internals.css
 * @alias CSSSelector
 */
class CSSSelector {

    constructor(selectors /* string */ , selectors_arrays /* array */ ) {

        /**
         * The raw selector string value
         * @package
         */

        this.v = selectors;

        /**
         * Array of separated selector strings in reverse order.
         * @package
         */

        this.a = selectors_arrays;

        /**
         * The CSSRule.
         * @package
         */
        this.r = null;
    }

    get id() {
        return this.v.join("");
    }
    /**
     * Returns a string representation of the object.
     * @return     {string}  String representation of the object.
     */
    toString(off = 0) {
        let offset = ("    ").repeat(off);

        let str = `${offset}${this.v.join(", ")} {\n`;

        if (this.r)
            str += this.r.toString(off + 1);

        return str + `${offset}}\n`;
    }

    addProp(string) {
        let root = this.r.root;
        if (root) {
            let lex = whind$1(string);
            while (!lex.END)
                root.parseProperty(lex, this.r, property_definitions);
        }
    }

    removeRule(){
        if(this.r)
            this.r.decrementRef();

        this.r = null;
    }

    addRule(rule = null){
        
        this.removeRule();

        if(rule !== null)
            rule.incrementRef();

        this.r = rule;
    }

}

var step = 0;

function checkDefaults(lx) {
    const tx = lx.tx;
    /* https://drafts.csswg.org/css-cascade/#inherited-property */
    switch (lx.tx) {
        case "initial": //intentional
        case "inherit": //intentional
        case "unset": //intentional
        case "revert": //intentional
            if (!lx.pk.pk.END) // These values should be the only ones present. Failure otherwise.
                return 0; // Default value present among other values. Invalid
            return 1; // Default value present only. Valid
    }
    return 2; // Default value not present. Ignore
}

class JUX { /* Juxtaposition */

    constructor() {
        this.id = JUX.step++;
        this.r = [NaN, NaN];
        this.terms = [];
        this.prop = null;
        this.name = "";
        this.virtual = false;
        this.REQUIRE_COMMA = false;
    }
    mergeValues(existing_v, new_v) {
        if (existing_v)
            if (existing_v.v) {
                if (Array.isArray(existing_v.v))
                    existing_v.v.push(new_v.v);
                else {
                    existing_v.v = [existing_v.v, new_v.v];
                }
            } else
                existing_v.v = new_v.v;
    }

    seal() {

    }

    sp(value, rule) { /* Set Property */
        if (this.prop) {
            if (value)
                if (Array.isArray(value) && value.length === 1 && Array.isArray(value[0]))
                    rule[this.prop] = value[0];
                else
                    rule[this.prop] = value;
        }
    }

    isRepeating() {
        return !(isNaN(this.r[0]) && isNaN(this.r[1]));
    }

    parse(lx, rule, out_val, ROOT = true) {
            
        if (typeof(lx) == "string")
            lx = whind$1(lx);

        let r = out_val || { v: null },
            bool = false;

        if (ROOT) {
            switch (checkDefaults(lx)) {
                case 1:
                    this.sp(lx.tx, rule);
                    return true;
                case 0:
                    return false;
            }

            bool = this.innerParser(lx, rule, out_val, r, this.start, this.end);

            //if (!lx.END)
            //    return false;
            //else
                this.sp(r.v, rule);
        } else
            bool = this.innerParser(lx, rule, out_val, r, this.start, this.end);

        return bool;
    }

    checkForComma(lx) {
        if (this.REQUIRE_COMMA) {
            if (lx.ch == ",")
                lx.next();
            else return false;
        }
        return true;
    }

    innerParser(lx, rule, out_val, r, start, end) {

        let bool = false;

        repeat:
            for (let j = 0; j < end && !lx.END; j++) {
                let copy = lx.copy();
                let temp_r = { v: null };

                for (let i = 0, l = this.terms.length; i < l; i++) {

                    let term = this.terms[i];

                    if (!term.parse(copy, rule, temp_r, false)) {
                        if (!term.OPTIONAL) {
                            break repeat;
                        }
                    }
                }

                if (temp_r.v)
                    this.mergeValues(r, temp_r);

                lx.sync(copy);

                bool = true;

                if (!this.checkForComma(lx))
                    break;
            }

        if (bool)
            //console.log("JUX", s, bool)
            return bool;
    }

    get start() {
        return isNaN(this.r[0]) ? 1 : this.r[0];
    }
    set start(e) {}

    get end() {
        return isNaN(this.r[1]) ? 1 : this.r[1];
    }
    set end(e) {}

    get OPTIONAL() { return this.r[0] === 0 }
    set OPTIONAL(a) {}
}
JUX.step = 0;
class AND extends JUX {
    innerParser(lx, rule, out_val, r, start, end) {

        const
            PROTO = new Array(this.terms.length),
            l = this.terms.length;

        let bool = false;

        repeat:
            for (let j = 0; j < end && !lx.END; j++) {

                const
                    HIT = PROTO.fill(0),
                    copy = lx.copy(),
                    temp_r = { v: null };

                and:
                    while (true) {
                        let FAILED = false;



                        for (let i = 0; i < l; i++) {

                            if (HIT[i] === 2) continue;

                            let term = this.terms[i];

                            if (!term.parse(copy, rule, temp_r, false)) {
                                if (term.OPTIONAL)
                                    HIT[i] = 1;
                            } else {
                                HIT[i] = 2;
                                continue and;
                            }
                        }

                        if (HIT.reduce((a, v) => a * v, 1) === 0)
                            break repeat;

                        break
                    }



                lx.sync(copy);

                if (temp_r.v)
                    this.mergeValues(r, temp_r);

                bool = true;

                if (!this.checkForComma(lx))
                    break;
            }

        return bool;
    }
}

class OR extends JUX {
    innerParser(lx, rule, out_val, r, start, end) {

        const
            PROTO = new Array(this.terms.length),
            l = this.terms.length;

        let
            bool = false,
            NO_HIT = true;

        repeat:
            for (let j = 0; j < end && !lx.END; j++) {

                const HIT = PROTO.fill(0);
                let copy = lx.copy();
                let temp_r = { v: null };

                or:
                    while (true) {
                        let FAILED = false;
                        for (let i = 0; i < l; i++) {

                            if (HIT[i] === 2) continue;

                            let term = this.terms[i];

                            if (term.parse(copy, temp_r, r, false)) {
                                NO_HIT = false;
                                HIT[i] = 2;
                                continue or;
                            }
                        }

                        if (NO_HIT) break repeat;

                        break;
                    }

                lx.sync(copy);

                if (temp_r.v)
                    this.mergeValues(r, temp_r);

                bool = true;

                if (!this.checkForComma(lx))
                    break;
            }

        return bool;
    }
}

OR.step = 0;

class ONE_OF extends JUX {
    innerParser(lx, rule, out_val, r, start, end) {

        let BOOL = false;

        let j;
        for (j = 0; j < end && !lx.END; j++) {
            let bool = false;
            let copy = lx.copy();
            let temp_r = { v: null };

            for (let i = 0, l = this.terms.length; i < l; i++) {
                ////if (!this.terms[i]) console.log(this)
                if (this.terms[i].parse(copy, rule, temp_r, false)) {
                    bool = true;
                    break;
                }
            }

            if (!bool)
                break;

            lx.sync(copy);
            
            if (temp_r.v)
                this.mergeValues(r, temp_r);

            BOOL = true;

            if (!this.checkForComma(lx))
                break;
        }

        return BOOL;
    }
}

ONE_OF.step = 0;

class ValueTerm {

    constructor(value, getPropertyParser, definitions, productions) {

        if(value instanceof JUX)
            return value;
        

        this.value = null;

        const IS_VIRTUAL = { is: false };
        
        if(typeof(value) == "string")
            var u_value = value.replace(/\-/g,"_");

        if (!(this.value = types$1[u_value]))
            this.value = getPropertyParser(u_value, IS_VIRTUAL, definitions, productions);

        this.prop = "";

        if (!this.value)
            return new LiteralTerm(value);

        if(this.value instanceof JUX){
            if (IS_VIRTUAL.is)
                this.value.virtual = true;
            return this.value;
        }

    }

    seal(){}

    parse(l, rule, r, ROOT = true) {
        if (typeof(l) == "string")
            l = whind$1(l);

        if (ROOT) {

            switch(checkDefaults(l)){
                case 1:
                rule[this.prop] = l.tx;
                return true;
                case 0:
                return false;
            }
        }

        let rn = { v: null };

        let v = this.value.parse(l, rule, rn);

        if (rn.v) {
            if (r)
                if (r.v) {
                    if (Array.isArray(r.v)) {
                        if (Array.isArray(rn.v) && !this.virtual)
                            r.v = r.v.concat(rn.v);
                        else
                            r.v.push(rn.v);
                    } else {
                        if (Array.isArray(rn.v) && !this.virtual)
                            r.v = ([r.v]).concat(rn.v);
                        else
                            r.v = [r.v, rn.v];
                    }
                } else
                    r.v = (this.virtual) ? [rn.v] : rn.v;

            if (this.prop && !this.virtual)
                rule[this.prop] = rn.v;

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

            if (this.prop && !this.virtual && ROOT)
                rule[this.prop] = v;

            return true;
        } else
            return false;
    }

    get OPTIONAL (){ return false }
    set OPTIONAL (a){}
}

class LiteralTerm {

    constructor(value, type) {
        
        if(type == whind$1.types.string)
            value = value.slice(1,-1);

        this.value = value;
        this.prop = null;
    }

    seal(){}

    parse(l, rule, r, root = true) {

        if (typeof(l) == "string")
            l = whind$1(l);

        if (root) {
            switch(checkDefaults(l)){
                case 1:
                rule[this.prop] = l.tx;
                return true;
                case 0:
                return false;
            }
        }

        let v = l.tx;
        if (v == this.value) {
            l.next();

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

            if (this.prop  && !this.virtual && root)
                rule[this.prop] = v;

            return true;
        }
        return false;
    }

    get OPTIONAL (){ return false }
    set OPTIONAL (a){}
}

class SymbolTerm extends LiteralTerm {
    parse(l, rule, r) {
        if (typeof(l) == "string")
            l = whind$1(l);

        if (l.tx == this.value) {
            l.next();
            return true;
        }

        return false;
    }
}

//import util from "util"
const standard_productions = {
    JUX,
    AND,
    OR,
    ONE_OF,
    LiteralTerm,
    ValueTerm,
    SymbolTerm
};
function getPropertyParser(property_name, IS_VIRTUAL = { is: false }, definitions = null, productions = standard_productions) {

    let prop = definitions[property_name];

    if (prop) {

        if (typeof(prop) == "string") {
            prop = definitions[property_name] = CreatePropertyParser(prop, property_name, definitions, productions);
        }
        prop.name = property_name;
        return prop;
    }

    if (!definitions.__virtual)
        definitions.__virtual = Object.assign({}, virtual_property_definitions);

    prop = definitions.__virtual[property_name];

    if (prop) {

        IS_VIRTUAL.is = true;

        if (typeof(prop) == "string") {
            prop = definitions.__virtual[property_name] = CreatePropertyParser(prop, "", definitions, productions);
            prop.virtual = true;
            prop.name = property_name;
        }

        return prop;
    }

    return null;
}


function CreatePropertyParser(notation, name, definitions, productions) {

    const l = whind$1(notation);
    const important = { is: false };

    let n = d$1(l, definitions, productions);
    
    n.seal();

    //if (n instanceof productions.JUX && n.terms.length == 1 && n.r[1] < 2)
    //    n = n.terms[0];

    n.prop = name;
    n.IMP = important.is;

    /*//******** DEV 
    console.log("")
    console.log("")
    console.log(util.inspect(n, { showHidden: false, depth: null })) 
    //********** END Dev*/

    return n;
}

function d$1(l, definitions, productions, super_term = false, oneof_group = false, or_group = false, and_group = false, important = null) {
    let term, nt, v;
    const { JUX: JUX$$1, AND: AND$$1, OR: OR$$1, ONE_OF: ONE_OF$$1, LiteralTerm: LiteralTerm$$1, ValueTerm: ValueTerm$$1, SymbolTerm: SymbolTerm$$1 } = productions;

    let GROUP_BREAK = false;

    while (!l.END) {

        switch (l.ch) {
            case "]":
                return term;
                break;
            case "[":

                v = d$1(l.next(), definitions, productions, true);
                l.assert("]");
                v = checkExtensions(l, v, productions);

                if (term) {
                    if (term instanceof JUX$$1 && term.isRepeating()) term = foldIntoProduction(productions, new JUX$$1, term);
                    term = foldIntoProduction(productions, term, v);
                } else
                    term = v;
                break;

            case "<":

                v = new ValueTerm$$1(l.next().tx, getPropertyParser, definitions, productions);
                l.next().assert(">");

                v = checkExtensions(l, v, productions);

                if (term) {
                    if (term instanceof JUX$$1 /*&& term.isRepeating()*/) term = foldIntoProduction(productions, new JUX$$1, term);
                    term = foldIntoProduction(productions, term, v);
                } else {
                    term = v;
                }
                break;

            case "&":

                if (l.pk.ch == "&") {

                    if (and_group)
                        return term;

                    nt = new AND$$1();

                    if (!term) throw new Error("missing term!");

                    nt.terms.push(term);

                    l.sync().next();

                    while (!l.END) {
                        nt.terms.push(d$1(l, definitions, productions, super_term, oneof_group, or_group, true, important));
                        if (l.ch !== "&" || l.pk.ch !== "&") break;
                        l.a("&").a("&");
                    }

                    return nt;
                }
                break;
            case "|":

                {
                    if (l.pk.ch == "|") {

                        if (or_group || and_group)
                            return term;

                        nt = new OR$$1();

                        nt.terms.push(term);

                        l.sync().next();

                        while (!l.END) {
                            nt.terms.push(d$1(l, definitions, productions, super_term, oneof_group, true, and_group, important));
                            if (l.ch !== "|" || l.pk.ch !== "|") break;
                            l.a("|").a("|");
                        }

                        return nt;

                    } else {

                        if (oneof_group || or_group || and_group)
                            return term;

                        nt = new ONE_OF$$1();

                        nt.terms.push(term);

                        l.next();

                        while (!l.END) {
                            nt.terms.push(d$1(l, definitions, productions, super_term, true, or_group, and_group, important));
                            if (l.ch !== "|") break;
                            l.a("|");
                        }

                        return nt;
                    }
                }
                break;
            default:

                v = (l.ty == l.types.symbol) ? new SymbolTerm$$1(l.tx) : new LiteralTerm$$1(l.tx, l.ty);
                l.next();
                v = checkExtensions(l, v, productions);

                if (term) {
                    if (term instanceof JUX$$1 /*&& (term.isRepeating() || term instanceof ONE_OF)*/) term = foldIntoProduction(productions, new JUX$$1, term);
                    term = foldIntoProduction(productions, term, v);
                } else {
                    term = v;
                }
        }
    }

    return term;
}

function checkExtensions(l, term, productions) {
    outer:
    while (true) {

        switch (l.ch) {
            case "!":
                /* https://www.w3.org/TR/CSS21/cascade.html#important-rules */
                term.IMPORTANT = true;
                l.next();
                continue outer;
            case "{":
                term = foldIntoProduction(productions, term);
                term.r[0] = parseInt(l.next().tx);
                if (l.next().ch == ",") {
                    l.next();
                    if (l.pk.ch == "}") {

                        term.r[1] = parseInt(l.tx);
                        l.next();
                    } else {
                        term.r[1] = Infinity;
                    }
                } else
                    term.r[1] = term.r[0];
                l.a("}");
                break;
            case "*":
                term = foldIntoProduction(productions, term);
                term.r[0] = 0;
                term.r[1] = Infinity;
                l.next();
                break;
            case "+":
                term = foldIntoProduction(productions, term);
                term.r[0] = 1;
                term.r[1] = Infinity;
                l.next();
                break;
            case "?":
                term = foldIntoProduction(productions, term);
                term.r[0] = 0;
                term.r[1] = 1;
                l.next();
                break;
            case "#":
                term = foldIntoProduction(productions, term);
                term.terms.push(new SymbolTerm(","));
                term.r[0] = 1;
                term.r[1] = Infinity;
                term.REQUIRE_COMMA = true;
                l.next();
                if (l.ch == "{") {
                    term.r[0] = parseInt(l.next().tx);
                    term.r[1] = parseInt(l.next().a(",").tx);
                    l.next().a("}");
                }
                break;
        }
        break;
    }
    return term;
}

function foldIntoProduction(productions, term, new_term = null) {
    if (term) {
        if (!(term instanceof productions.JUX)) {
            let nr = new productions.JUX();
            nr.terms.push(term);
            term = nr;
        }
        if (new_term) {
            term.seal();
            term.terms.push(new_term);
        }
        return term;
    }
    return new_term;
}

/**
 * Checks to make sure token is an Identifier.
 * @param      {Lexer} - A Lexical tokenizing object supporting methods found in {@link Lexer}.
 * @alias module:wick~internals.css.elementIsIdentifier
 */
function _eID_(lexer) {
    if (lexer.ty != lexer.types.id) lexer.throw("Expecting Identifier");
}

/**
 * The empty CSSRule instance
 * @alias module:wick~internals.css.empty_rule
 */
const er = Object.freeze(new CSSRule());

class _selectorPart_ {
    constructor() {
        this.e = "";
        this.ss = [];
        this.c = "";
    }
}
class _mediaSelectorPart_ {
    constructor() {
        this.id = "";
        this.props = {};
        this.c = "";
    }
}

class CSSRuleBody {
    
    constructor() {

        // 
        this.media_selector = null;
        
        // All selectors indexed by their value
        this._selectors_ = {};

        //All selectors in order of appearance
        this._sel_a_ = [];

        //
        this.rules = []; 
    }

    _applyProperties_(lexer, rule) {
        while (!lexer.END && lexer.tx !== "}") this.parseProperty(lexer, rule, property_definitions);
        lexer.next();
    }

    /**
     * Gets the last rule matching the selector
     * @param      {string}  string  The string
     * @return     {CSSRule}  The combined set of rules that match the selector.
     */
    getRule(string, r) {
        let selector = this._selectors_[string];
        if (selector) return selector.r;
        return r;
    }


    /**
     * Hook method for hijacking the property parsing function. Return true if default property parsing should not take place
     * @param      {Lexer}   value_lexer    The value lexer
     * @param      {<type>}   property_name  The property name
     * @param      {<type>}   rule           The rule
     * @return     {boolean}  The property hook.
     */
    _getPropertyHook_(value_lexer, property_name, rule) {
        return false;
    }

    /**
     * Used to match selectors to elements
     * @param      {ele}   ele       The ele
     * @param      {string}   criteria  The criteria
     * @return     {boolean}  { description_of_the_return_value }
     * @private
     */
    matchCriteria(ele, criteria) {
        if (criteria.e && ele.tagName !== criteria.e.toUpperCase()) return false;
        outer: for (let i = 0, l = criteria.ss.length; i < l; i++) {
            let ss = criteria.ss[i];
            switch (ss.t) {
                case "attribute":
                    let lex = whind$1(ss.v);
                    if (lex.ch == "[" && lex.pk.ty == lex.types.id) {
                        let id = lex.sync().tx;
                        let attrib = ele.getAttribute(id);
                        if (!attrib) return;
                        if (lex.next().ch == "=") {
                            let value = lex.next().tx;
                            if (attrib !== value) return false;
                        }
                    }
                    break;
                case "pseudo":
                    debugger;
                    break;
                case "class":
                    let class_list = ele.classList;
                    for (let j = 0, jl = class_list.length; j < jl; j++) {
                        if (class_list[j] == ss.v) continue outer;
                    }
                    return false;
                case "id":
                    if (ele.id !== ss.v) return false;
            }
        }
        return true;
    }

    matchMedia(win = window) {

        if (this.media_selector) {
            for (let i = 0; i < this.media_selector.length; i++) {
                let m = this.media_selector[i];
                let props = m.props;
                for (let a in props) {
                    let prop = props[a];
                    if (!prop(win))
                        return false;
                }
            }
        }

        return true;
    }

    
    /* 
        Retrieves the set of rules from all matching selectors for an element.
            element HTMLElement - An DOM element that should be matched to applicable rules. 
    */
    getApplicableRules(element, rule = new CSSRule(), win = window) {

        if (!this.matchMedia(win)) return;

        let gen = this.getApplicableSelectors(element),
            sel = null;

        while (sel = gen.next().value) rule.merge(sel.r);
    }

    * getApplicableSelectors(element) {
        for (let j = 0, jl = this._sel_a_.length; j < jl; j++) {
            let ancestor = element;
            let selector = this._sel_a_[j];
            let sn = selector.a;
            let criteria = null;
            outer: for (let x = 0; x < sn.length; x++) {

                let sa = sn[x];

                inner: for (let i = 0, l = sa.length; i < l; i++) {
                    criteria = sa[i];
                    switch (criteria.c) {
                        case "child":
                            if (!(ancestor = ancestor.parentElement) || !this.matchCriteria(ancestor, criteria)) continue outer;
                            break;
                        case "preceded":
                            while ((ancestor = ancestor.previousElementSibling))
                                if (this.matchCriteria(ancestor, criteria)) continue inner;
                            continue outer;
                        case "immediately preceded":
                            if (!(ancestor = ancestor.previousElementSibling) || !this.matchCriteria(ancestor, criteria)) continue outer;
                            break;
                        case "descendant":
                            while ((ancestor = ancestor.parentElement))
                                if (this.matchCriteria(ancestor, criteria)) continue inner;
                            continue outer;
                        default:
                            if (!this.matchCriteria(ancestor, criteria)) continue outer;
                    }
                }
                yield selector;
            }
        }
    }

    /**
     * Parses properties
     * @param      {Lexer}  lexer        The lexer
     * @param      {<type>}  rule         The rule
     * @param      {<type>}  definitions  The definitions
     */
    parseProperty(lexer, rule, definitions) {
        const name = lexer.tx.replace(/\-/g, "_");

        //Catch any comments
        if (lexer.ch == "/") {
            lexer.comment(true);
            let bool = this.parseProperty(lexer, rule, definitions);
            return 
        }
        lexer.next().a(":");
        //allow for short circuit < | > | =
        const p = lexer.pk;
        while ((p.ch !== "}" && p.ch !== ";") && !p.END) {
            //look for end of property;
            p.next();
        }
        const out_lex = lexer.copy();
        lexer.sync();
        out_lex.fence(p);
        if (!this._getPropertyHook_(out_lex, name, rule)) {
            try {
                const IS_VIRTUAL = {
                    is: false
                };
                const parser = getPropertyParser(name, IS_VIRTUAL, definitions);
                if (parser && !IS_VIRTUAL.is) {
                    if (!rule.props) rule.props = {};
                    parser.parse(out_lex, rule.props);
                } else
                    //Need to know what properties have not been defined
                    console.warn(`Unable to get parser for css property ${name}`);
            } catch (e) {
                console.log(e);
            }
        }
        if (lexer.ch == ";") lexer.next();
    }

    /** 
    Parses a selector up to a token '{', creating or accessing necessary rules as it progresses. 

    Reference: https://www.w3.org/TR/selectors-3/ 
    https://www.w3.org/TR/css3-mediaqueries/
    https://www.w3.org/TR/selectors-3/

    @param {Lexer} - A Lexical tokenizing object supporting methods found in {@link Lexer}.

    @protected

    */
    parseSelector(lexer) {
        let rule = this,
            id = "",
            selector_array = [],
            selectors_array = [];
        let start = lexer.pos;
        let selectors = [];
        let sel = new _selectorPart_(),
            RETURN = false;
        while (!lexer.END) {
            if (!sel) sel = new _selectorPart_();
            switch (lexer.tx) {
                case "{":
                    RETURN = true;
                case ",":
                    selector_array.unshift(sel);
                    selectors_array.push(selector_array);
                    selector_array = [];
                    selectors.push(lexer.s(start).trim().slice(0));
                    sel = new _selectorPart_();
                    if (RETURN) return new CSSSelector(selectors, selectors_array, this);
                    lexer.next();
                    start = lexer.pos;
                    break;
                case "[":
                    let p = lexer.pk;
                    while (!p.END && p.next().tx !== "]") {};
                    p.a("]");
                    if (p.END) throw new _Error_("Unexpected end of input.");
                    sel.ss.push({
                        t: "attribute",
                        v: p.s(lexer)
                    });
                    lexer.sync();
                    break;
                case ":":
                    sel.ss.push({
                        t: "pseudo",
                        v: lexer.next().tx
                    });
                    _eID_(lexer);
                    lexer.next();
                    break;
                case ".":
                    sel.ss.push({
                        t: "class",
                        v: lexer.next().tx
                    });
                    _eID_(lexer);
                    lexer.next();
                    break;
                case "#":
                    sel.ss.push({
                        t: "id",
                        v: lexer.next().tx
                    });
                    _eID_(lexer);
                    lexer.next();
                    break;
                case "*":
                    lexer.next();
                    break;
                case ">":
                    sel.c = "child";
                    selector_array.unshift(sel);
                    sel = null;
                    lexer.next();
                    break;
                case "~":
                    sel.c = "preceded";
                    selector_array.unshift(sel);
                    sel = null;
                    lexer.next();
                    break;
                case "+":
                    sel.c = "immediately preceded";
                    selector_array.unshift(sel);
                    sel = null;
                    lexer.next();
                    break;
                default:
                    if (sel.e) {
                        sel.c = "descendant";
                        selector_array.unshift(sel);
                        sel = null;
                    } else {
                        sel.e = lexer.tx;

                        _eID_(lexer);
                        lexer.next();
                    }
                    break;
            }
        }

        selector_array.unshift(sel);
        selectors_array.push(selector_array);
        selectors.push(lexer.s(start).trim().slice(0));
        return new CSSSelector(selectors, selectors_array, this);
    }

    /**
     * Parses CSS string
     * @param      {Lexer} - A Lexical tokenizing object supporting methods found in {@link Lexer}
     * @param      {(Array|CSSRuleBody|Object|_mediaSelectorPart_)}  root    The root
     * @return     {Promise}  A promise which will resolve to a CSSRuleBody
     * @private
     */
    parse(lexer, root, res = null, rej = null) {

        if (root && !this.par) root.push(this);

        return new Promise((res, rej) => {
            
            let selectors = [], l = 0;
            
            while (!lexer.END) {
                switch (lexer.ch) {
                    case "@":
                        lexer.next();
                        switch (lexer.tx) {
                            case "media": //Ignored at this iteration /* https://drafts.csswg.org/mediaqueries/ */
                                //create media query selectors
                                let _med_ = [],
                                    sel = null;
                                while (!lexer.END && lexer.next().ch !== "{") {
                                    if (!sel) sel = new _mediaSelectorPart_();
                                    if (lexer.ch == ",") _med_.push(sel), sel = null;
                                    else if (lexer.ch == "(") {
                                        let start = lexer.next().off;
                                        while (!lexer.END && lexer.ch !== ")") lexer.next();
                                        let out_lex = lexer.copy();
                                        out_lex.off = start;
                                        out_lex.tl = 0;
                                        out_lex.next().fence(lexer);
                                        this.parseProperty(out_lex, sel, media_feature_definitions);
                                        if (lexer.pk.tx.toLowerCase() == "and") lexer.sync();
                                    } else {
                                        let id = lexer.tx.toLowerCase(),
                                            condition = "";
                                        if (id === "only" || id === "not")
                                            (condition = id, id = lexer.next().tx);
                                        sel.c = condition;
                                        sel.id = id;
                                        if (lexer.pk.tx.toLowerCase() == "and") lexer.sync();
                                    }
                                }
                                //debugger
                                lexer.a("{");
                                if (sel)
                                    _med_.push(sel);

                                if (_med_.length == 0)
                                    this.parse(lexer, null); // discard results
                                else {
                                    let media_root = new this.constructor();
                                    media_root.media_selector = _med_;
                                    res(media_root.parse(lexer, root).then(b => {
                                        let body = new this.constructor();
                                        return body.parse(lexer, root);
                                    }));
                                }
                                continue;
                            case "import":
                                /* https://drafts.csswg.org/css-cascade/#at-ruledef-import */
                                let type;
                                if (type = types$1.url.parse(lexer.next())) {
                                    lexer.a(";");
                                    /**
                                     * The {@link CSS_URL} incorporates a fetch mechanism that returns a Promise instance.
                                     * We use that promise to hook into the existing promise returned by CSSRoot#parse,
                                     * executing a new parse sequence on the fetched string data using the existing CSSRoot instance,
                                     * and then resume the current parse sequence.
                                     * @todo Conform to CSS spec and only parse if @import is at the head of the CSS string.
                                     */
                                    return type.fetchText().then((str) =>
                                        //Successfully fetched content, proceed to parse in the current root.
                                        //let import_lexer = ;
                                        res(this.parse(whind$1(str), this).then((r) => this.parse(lexer, r)))
                                        //parse returns Promise. 
                                        // return;
                                    ).catch((e) => res(this.parse(lexer)));
                                } else {
                                    //Failed to fetch resource, attempt to find the end to of the import clause.
                                    while (!lexer.END && lexer.next().tx !== ";") {}
                                    lexer.next();
                                }
                        }
                        break;
                    case "/":
                        lexer.comment(true);
                        break;
                    case "}":
                        lexer.next();
                        return res(this);
                    case "{":
                        //Check to see if a rule body for the selector exists already.
                        let MERGED = false;
                        let rule = new CSSRule(this);
                        this._applyProperties_(lexer.next(), rule);
                        for (let i = -1, sel = null; sel = selectors[++i];)
                            if (sel.r) {sel.r.merge(rule); MERGED = true;}
                            else sel.addRule(rule);

                        if(!MERGED){
                            this.rules.push(rule);
                        }
                            
                        selectors.length = l = 0;
                        continue;
                }

                let selector = this.parseSelector(lexer, this);

                if (selector) {
                    if (!this._selectors_[selector.id]) {
                        l = selectors.push(selector);
                        this._selectors_[selector.id] = selector;
                        this._sel_a_.push(selector);
                    } else l = selectors.push(this._selectors_[selector.id]);
                }
            }

            return res(this);
        });

    }

    isSame(inCSSRuleBody) {
        if (inCSSRuleBody instanceof CSSRuleBody) {
            if (this.media_selector) {
                if (inCSSRuleBody.media_selector) {
                    //TODO compare media selectors;
                }
            } else if (!inCSSRuleBody.media_selector)
                return true;
        }
        return false;
    }

    merge(inCSSRuleBody) {
        this.parse(whind$1(inCSSRuleBody + ""));
    }

    /**
     * Gets the media.
     * @return     {Object}  The media.
     * @public
     */
    getMedia(win = window) {
        let start = this;
        this._media_.forEach((m) => {
            if (m._med_) {
                let accept = true;
                for (let i = 0, l = m._med_.length; i < l; i++) {
                    let ms = m._med_[i];
                    if (ms.props) {
                        for (let n in ms.props) {
                            if (!ms.props[n](win)) accept = false;
                        }
                    }
                    //if(not)
                    //    accept = !accept;
                    if (accept)
                        (m._next_ = start, start = m);
                }
            }
        });
        return start;
    }

    updated() {
        this.par.updated();
    }

    toString(off = 0) {
        let str = "";
        for (let i = 0; i < this._sel_a_.length; i++) {
            str += this._sel_a_[i].toString(off);
        }
        return str;
    }

    createSelector(selector_value) {
        let selector = this.parseSelector(whind$1(selector_value));

        if (selector)
            if (!this._selectors_[selector.id]) {
                this._selectors_[selector.id] = selector;
                this._sel_a_.push(selector);
                const rule = new CSSRule(this);
                selector.addRule(rule);
                this.rules.push(rule);
            } else
                selector = this._selectors_[selector.id];

        return selector;
    }
}

LinkedList.mixinTree(CSSRuleBody);

class Segment {
    constructor(parent) {
        this.parent = null;

        this.css_val = "";

        this.val = document.createElement("span");
        this.val.classList.add("prop_value");

        this.list = document.createElement("div");
        this.list.classList.add("prop_list");
        //this.list.style.display = "none"

        this.ext = document.createElement("button");
        this.ext.classList.add("prop_extender");
        this.ext.style.display = "none";
        this.ext.setAttribute("action","ext");

        this.menu_icon = document.createElement("span");
        this.menu_icon.classList.add("prop_list_icon");
        //this.menu_icon.innerHTML = "+"
        this.menu_icon.style.display = "none";
        this.menu_icon.setAttribute("superset", false);
        this.menu_icon.appendChild(this.list);

        this.element = document.createElement("span");
        this.element.classList.add("prop_segment");

        this.element.appendChild(this.menu_icon);
        this.element.appendChild(this.val);
        this.element.appendChild(this.ext);

        this.value_list = [];
        this.subs = [];
        this.old_subs = [];
        this.sib = null;
        this.value_set;
        this.HAS_VALUE = false;
        this.DEMOTED = false;

        this.element.addEventListener("mouseover", e => {
            //this.setList();
        });
    }

    destroy() {
        this.parent = null;
        this.element = null;
        this.val = null;
        this.list = null;
        this.ext = null;
        this.menu_icon = null;
        this.subs.forEach(e => e.destroy());
        this.subs = null;
    }

    reset() {
        this.list.innerHTML = "";
        this.val.innerHTML = "";
        //this.subs.forEach(e => e.destroy);
        this.subs = [];
        this.setElement = null;
        this.changeEvent = null;
    }

    clearSegments(){
        if(this.subs.length > 0){
            this.val.innerHTML = "";
            for(let i = 0; i < this.subs.length; i++){
                let sub = this.subs[i];
                sub.destroy();
            }   
            this.subs.length = 0;
        }
    }

    replaceSub(old_sub, new_sub) {
        for (let i = 0; i < this.subs.length; i++) {
            if (this.subs[i] == old_sub) {
                this.sub[i] = new_sub;
                this.val.replaceChild(old_sub.element, new_sub.element);
                return;
            }
        }
    }

    mount(element) {
        element.appendChild(this.element);
    }


    addSub(seg) {
        this.menu_icon.setAttribute("superset", true);
        seg.parent = this;
        this.subs.push(seg);
        this.val.appendChild(seg.element);
    }

    removeSub(seg) {
        if (seg.parent == this) {
            for (let i = 0; i < this.subs.length; i++) {
                if (this.subs[i] == seg) {
                    this.val.removeChild(seg.element);
                    seg.parent = null;
                    break;
                }
            }
        }
        return seg;
    }

    setList() {
        if(this.DEMOTED) debugger
        if (this.prod && this.list.innerHTML == "") {
            if (this.DEMOTED || !this.prod.buildList(this.list, this))
                this.menu_icon.style.display = "none";
            else
                this.menu_icon.style.display = "inline-block";
        }
    }
    change(e) {
        if (this.changeEvent)
            this.changeEvent(this.setElement, this, e);
    }

    setValueHandler(element, change_event_function) {
        this.val.innerHTML = "";
        this.val.appendChild(element);

        if (change_event_function) {
            this.setElement = element;
            this.changeEvent = change_event_function;
            this.setElement.onchange = this.change.bind(this);
        }

        this.HAS_VALUE = true;
        //this.menu_icon.style.display = "none";
        this.setList();
    }

    set value(v) {
        this.val.innerHTML = v;
        this.css_val = v;
        this.HAS_VALUE = true;
        this.setList();
    }

    get value_count() {
        if (this.subs.length > 0)
            return this.subs.length
        return (this.HAS_VALUE) ? 1 : 0;
    }

    promote() {

    }

    demote() {
        let seg = new Segment;
        seg.prod = this.prod;
        seg.css_val = this.css_val;

        if (this.change_event_function) {
            seg.changeEvent = this.changeEvent;
            seg.setElement = this.setElement;
            seg.setElement.onchange = seg.change.bind(seg);
        }

        let subs = this.subs;

        if (subs.length > 0) {

            for (let i = 0; i < this.subs.length; i++) 
                seg.addSub(this.subs[i]);
            
        } else {


            let children = this.val.childNodes;

            if (children.length > 0) {
                for (let i = 0, l = children.length; i < l; i++) {
                    seg.val.appendChild(children[0]);
                }
            } else {
                seg.val.innerHTML = this.val.innerHTML;
            }
        }


        this.menu_icon.innerHTML = "";
        this.menu_icon.style.display = "none";
        this.menu_icon.setAttribute("superset", false);
        this.list.innerHTML = "";

        this.reset();

        this.addSub(seg);
        seg.setList();
        
        this.DEMOTED = true;
    }

    addRepeat(seg) {
        if (!this.DEMOTED)
            //Turn self into own sub seg
            this.demote();
        this.addSub(seg);
        seg.setList();
    }

    repeat(prod = this.prod) {
        
        if (this.value_count <= this.end && this.prod.end > 1) {
            this.ext.style.display = "inline-block";

            let root_x = 0;
            let width = 0;
            let diff_width = 0;

            const move = (e) => {

                let diff = e.clientX - root_x;
                let min_diff = diff + diff_width;   

                let EXTENDABLE = this.value_count < this.end;
                let RETRACTABLE = this.value_count > 1;

                if(EXTENDABLE && RETRACTABLE)
                    this.ext.setAttribute("action","both");
                else if(EXTENDABLE)
                    this.ext.setAttribute("action","ext");
                else
                    this.ext.setAttribute("action","ret");

                if (diff > 15 && EXTENDABLE) {
                    let bb = this.element;

                    if (!this.DEMOTED) {
                        //Turn self into own sub seg
                        this.demote();
                    }

                    if (this.old_subs.length > 1) {
                        this.addSub(this.old_subs.pop());
                    } else {
                        prod.default(this, true);
                    }

                    let w = this.element.clientWidth;
                    diff_width = w - width;
                    width = w;
                    root_x += diff_width;

                    return;
                }

                let last_sub = this.subs[this.subs.length - 1];

                if (diff < -5 - last_sub.width && RETRACTABLE) {
                    const sub = this.subs[this.subs.length - 1];
                    this.old_subs.push(sub);
                    this.removeSub(sub);
                    this.subs.length = this.subs.length - 1;

                    let w = this.element.clientWidth;
                    diff_width = w - width;
                    width = w;

                    root_x += diff_width;
                }
            };

            const up = (e) => {
                window.removeEventListener("pointermove", move);
                window.removeEventListener("pointerup", up);
            };

            this.ext.onpointerdown = e => {
                width = this.element.clientWidth;
                root_x = e.clientX;
                window.addEventListener("pointermove", move);
                window.addEventListener("pointerup", up);
            };


            /*
            this.ext.onclick = e => {
                if (this.subs.length == 0)
                    //Turn self into own sub seg
                    this.demote()

                prod.default(this, true);

                if (this.value_count >= this.end)
                    this.ext.style.display = "none";
            }
            */
        } else {
            this.ext.style.display = "none";
        }
        this.setList();
        this.update();
    }

    get width() {
        return this.element.clientWidth;
    }

    update() {
        if (this.parent)
            this.parent.update(this);
        else {
            let val = this.getValue();
        }
    }

    getValue() {
        let val = "";

        if (this.subs.length > 0)
            for (let i = 0; i < this.subs.length; i++)
                val += " " + this.subs[i].getValue();
        else
            val = this.css_val;
        return val;
    }

    toString() {
        return this.getValue();
    }
}

class ValueTerm$1 extends ValueTerm {

    default (seg, APPEND = false, value = null) {
        if (!APPEND) {
            let element = this.value.valueHandler(value, seg);

            if (value) {
                seg.css_val = value.toString();
            }
            seg.setValueHandler(element, (ele, seg, event) => {
                seg.css_val = element.css_value;
                seg.update();
            });
        } else {
            let sub = new Segment();
            let element = this.value.valueHandler(value, sub);
            if (value)
                sub.css_val = value.toString();

            sub.setValueHandler(element, (ele, seg, event) => {
                seg.css_val = element.css_value;
                seg.update();
            });
            //sub.prod = list;
            seg.addSub(sub);
        }
    }

    buildInput(rep = 1, value) {
        let seg = new Segment();
        this.default(seg, false, value);
        return seg;
    }

    parseInput(l, seg, APPEND = false) {
        let val = this.value.parse(l);

        if (val) {
            this.default(seg, APPEND, val);
            return true;
        }

        return val;
    }

    list(ele, slot) {
        let element = document.createElement("div");
        element.classList.add("option");
        element.innerHTML = this.value.label_name || this.value.name;
        ele.appendChild(element);

        element.addEventListener("click", e => {

            slot.innerHTML = this.value;
            if (slot) {
                let element = this.value.valueHandler();
                element.addEventListener("change", e => {

                    let value = element.value;
                    slot.css_val = value;
                    slot.update();
                });
                slot.setValueHandler(element);
            } else {
                let sub = new Segment();
                sub.setValueHandler(this.value);
                seg.addSub(sub);
            }
        });

        return 1;
    }

    setSegment(segment) {
        segment.element.innerHTML = this.value.name;
    }
}

class BlankTerm extends LiteralTerm {

    default (seg, APPEND = false) {

        if (!APPEND) {
            seg.value = "  ";
        } else {
            let sub = new Segment();
            sub.value = "";
            seg.addSub(sub);
        }
    }

    list(ele, slot) {
        let element = document.createElement("div");
        element.innerHTML = this.value;
        element.classList.add("option");
        //        ele.appendChild(element) 

        return 1;
    }

    parseInput(seg, APPEND = false) {
        this.default(seg, APPEND);
        return false;
    }
}

class LiteralTerm$1 extends LiteralTerm {

    default (seg, APPEND = false) {
        if (!APPEND) {
            seg.value = this.value;
        } else {
            let sub = new Segment();
            sub.value = this.value;
            seg.addSub(sub);
        }
    }

    list(ele, slot) {
        let element = document.createElement("div");
        element.innerHTML = this.value;
        element.classList.add("option");
        ele.appendChild(element);
        element.addEventListener("click", e => {
            slot.value = this.value + "";
            slot.update();
        });

        return 1;
    }

    parseInput(l, seg, APPEND = false) {
        if (typeof(l) == "string")
            l = whind(l);

        if (l.tx == this.value) {
            l.next();
            this.default(seg, APPEND);
            return true;
        }

        return false;
    }
}

class SymbolTerm$1 extends LiteralTerm$1 {
    list() { return 0 }

    parseInput(l, seg, r) {
        if (typeof(l) == "string")
            l = whind(l);

        if (l.tx == this.value) {
            l.next();
            let sub = new Segment();
            sub.value = this.value + "";
            seg.addSub(sub);
            return true;
        }

        return false;
    }
}

/**
 * wick internals.
 * @class      JUX (name)
 */
class JUX$1 extends JUX {
    //Adds an entry in options list. 


    createSegment() {
        let segment = new Segment();
        segment.start = this.start;
        segment.end = this.end;
        segment.prod = this;
        return segment
    }

    insertBlank(seg){
        let blank = new BlankTerm;
        blank.parseInput(seg);
    }

    buildList(list, slot) {

        if (!slot) {
            let element = document.createElement("div");
            element.classList.add("prop_slot");
            slot = element;
        }

        if (!list) {
            list = document.createElement("div");
            list.classList.add("prop_slot");
            slot.appendChild(list);
        }
        let count = 0;
        //Build List
        for (let i = 0, l = this.terms.length; i < l; i++) {
            count += this.terms[i].list(list, slot);
        }

        return count > 1;
    }

    seal() {}

    parseInput(lx, segment, list) {

        if (typeof(lx) == "string")
            lx = whind$1(lx);

        return this.pi(lx, segment, list);
    }

    default (segment, EXTENDED = true) {
        let seg = this.createSegment();

        segment.addSub(seg);

        for (let i = 0, l = this.terms.length; i < l; i++) {
            this.terms[i].default(seg, l > 1);
        }
        seg.setList();

        if (!EXTENDED) seg.repeat();
    }

    pi(lx, ele, lister = this, start = this.start, end = this.end) {
        
        let segment = this.createSegment();

        let bool = false,
            j = 0,
            last_segment = null,
            first;

        repeat:
            for (let j = 0; j < end && !lx.END; j++) {
                const REPEAT = j > 0;

                let copy = lx.copy();

                let seg = (REPEAT) ? new Segment : segment;

                seg.prod = this;

                for (let i = 0, l = this.terms.length; i < l; i++) {

                    let term = this.terms[i];

                    if (!term.parseInput(copy, seg, l > 1)) {
                        if (!term.OPTIONAL) {
                            break repeat;
                        }
                    }
                }

                lx.sync(copy);

                bool = true;

                if (!this.checkForComma(lx))
                    break;

                if (REPEAT)
                    segment.addRepeat(seg);
            }

            this.capParse(segment, ele, bool);
            
            return bool;
    }

    capParse(segment, ele, bool){
        if (bool) {
            segment.repeat();
            if (ele)
                ele.addSub(segment);
            this.last_segment = segment;
        }else {
            segment.destroy();
            if(this.OPTIONAL){
                if(ele){
                    let segment = this.createSegment();
                    let blank = new BlankTerm();
                    blank.parseInput(segment);
                    segment.prod = this;
                    
                    segment.repeat();
                    ele.addSub(segment);
                }
            }
        }
    }

    buildInput(repeat = 1, lex) {

        this.last_segment = null;
        let seg = new Segment;
        seg.start = this.start;
        seg.end = this.end;
        seg.prod = this;
        this.parseInput(lex, seg, this);
        return this.last_segment;
    }

    list(){
        
    }
}

class AND$1 extends JUX$1 {

    default (segment, EXTENDED = false) {
        //let seg = this.createSegment();
        //segment.addSub(seg);
        for (let i = 0, l = this.terms.length; i < l; i++) {
            this.terms[i].default(segment, i > 1);
        }
        //seg.repeat();
    }

    list(ele, slot) {

        let name = (this.name) ? this.name.replace("\_\g", " ") : this.terms.reduce((r, t) => r += " | " + t.name, "");
        let element = document.createElement("div");
        element.classList.add("option");
        element.innerHTML = name;
        ele.appendChild(element);

        element.addEventListener("click", e => {
            
            slot.innerHTML = this.value;
            if (slot) {
                slot.clearSegments();
                this.default(slot);
                slot.update();
            } else {
                let sub = new Segment();
                sub.setValueHandler(this.value);
                seg.addSub(sub);
            }
        });

        return 1;
    }

    pi(lx, ele, lister = this, start = 1, end = 1) {

        outer: for (let j = 0; j < end && !lx.END; j++) {
            for (let i = 0, l = this.terms.length; i < l; i++)
                if (!this.terms[i].parseInput(lx, ele)) return (start === 0) ? true : false
        }

        segment.repeat();

        return true;
    }
}
Object.assign(AND$1.prototype, AND.prototype);

class OR$1 extends JUX$1 {

    default (segment, EXTENDED = false) {
        //let seg = this.createSegment();
        //segment.addSub(seg);
        for (let i = 0, l = this.terms.length; i < l; i++) {
            this.terms[i].default(segment, l > 1);
        }
        //seg.repeat();
    }

    buildList(list, slot) {
        return false;
    }

    list(ele, slot) {

        let name = this.terms.reduce((r, t) => r += " | " + t.name, "");
        let element = document.createElement("div");
        element.classList.add("option");
        element.innerHTML = name;
        ele.appendChild(element);

        element.addEventListener("click", e => {
            
            slot.innerHTML = this.value;
            if (slot) {
                slot.clearSegments();
                this.default(slot);
                slot.update();
            } else {
                let sub = new Segment();
                sub.setValueHandler(this.value);
                seg.addSub(sub);
            }
        });

        return 1;
    }

    pi(lx, ele, lister = this, start = this.start, end = this.end) {
        
        let segment = ele; //this.createSegment()

        let bool = false;

        let j = 0;

        let OVERALL_BOOL = false;

        for (let j = 0; j < end && !lx.END; j++) {
            const REPEAT = j > 0;

            let seg = (REPEAT) ? new Segment : segment;


            bool = false;

            this.count = (this.count) ? this.count:this.count = 0;
            
            outer:
            //User "factorial" expression to isolate used results in a continous match. 
            while(true){
                for (let i = 0, l = this.terms.length; i < l; i++) {
                    //if(this.terms[i].count == this.count) continue

                    if (this.terms[i].parseInput(lx, seg, true)) {
                        this.terms[i].count = this.count;
                        OVERALL_BOOL = true;
                        bool = true;
                        continue outer;
                    }
                }
                break;
            }

            {
                //Go through unmatched and make placeholders.
            }

            {
                //Sort everything based on parse 
            }

            if (!bool && j < start) {
                bool = false;
            } else if (start === 0)
                bool = true;
                if (REPEAT)
            segment.addRepeat(seg);
        }

        if (OVERALL_BOOL) {
            segment.repeat();
            //if (ele)
            //    ele.addSub(segment);
            this.last_segment = segment;
        }


        return (!bool && start === 0) ? true : bool;
    }
}

Object.assign(OR$1.prototype, OR.prototype);

class ONE_OF$1 extends JUX$1 {

    default (segment, EXTENDED = false) {
        let seg = this.createSegment();
        this.terms[0].default(seg);
        segment.addSub(seg);
        seg.setList();
        if (!EXTENDED) seg.repeat();
    }

    list(ele, slot) {
        let name = (this.name) ? this.name.replace(/_/g, " ") : this.terms.reduce((r, t) => r += " | " + t.name, "");
        let element = document.createElement("div");
        element.classList.add("option");
        element.innerHTML = name;
        ele.appendChild(element);

        element.addEventListener("click", e => {
            //debugger
            slot.innerHTML = this.value;
            if (slot) {
                slot.clearSegments();
                this.default(slot);
                slot.update();
            } else {
                let sub = new Segment();
                sub.setValueHandler(this.value);
                seg.addSub(sub);
            }
        });

        return 1;
    }

    pi(lx, ele, lister = this, start = this.start, end = this.end) {
        //List
        let segment = this.createSegment();

        //Add new
        let bool = false;

        let j = 0;

        //Parse Input
        for (; j < end && !lx.END; j++) {
            const REPEAT = j > 0;

            let seg = segment;
            
            if(REPEAT){
                seg = new Segment;
                seg.prod = this;
            }

            bool = false;

            for (let i = 0, l = this.terms.length; i < l; i++) {
                bool = this.terms[i].parseInput(lx, seg);
                if (bool) break;
            }

            if (!bool) {
                if (j < start) {
                    bool = false;
                    break;
                }
            }
            if (REPEAT)
                segment.addRepeat(seg);

        }

        this.capParse(segment, ele, bool);

        return  bool;
    }
}

Object.assign(ONE_OF$1.prototype, ONE_OF.prototype);

var ui_productions = /*#__PURE__*/Object.freeze({
    JUX: JUX$1,
    AND: AND$1,
    OR: OR$1,
    ONE_OF: ONE_OF$1,
    LiteralTerm: LiteralTerm$1,
    ValueTerm: ValueTerm$1,
    SymbolTerm: SymbolTerm$1
});

function dragstart(e){
    event.dataTransfer.setData('text/plain',null);
    UISelectorPart.dragee = this;
}

function dragover(e){
    e.preventDefault();
}

class UISelectorPart{

    constructor(name, index){
        this.txt = name;
        this.index = index;
        this.element = document.createElement("span");
        this.element.classList.add("selector");
        this.element.innerHTML = this.txt;
        this.element.setAttribute("draggable", true);
        this.parent = null;
        this.element.addEventListener("dragstart",dragstart.bind(this));
    }

    mount(element, parent){
        this.parent = parent;
        if (element instanceof HTMLElement)
            element.appendChild(this.element);
    }

    unmount(){
        this.parent = null;
        if (this.element.parentElement)
            this.element.parentElement.removeChild(this.element);
    }

    compare(other_part){
        return other_part.txt === this.txt
    }

    toString(){
        return this.txt;
    }

}


function drop(e){
    if(UISelectorPart.dragee){
        const part = UISelectorPart.dragee;
        const parent = part.parent;

        loop:
        while(parent != this){

            //Ignore if part is already present in the selector area
            for(let i = 0; i < this.parts.length; i++)
                if(this.parts[i].compare(part)) break loop;

            part.unmount();
            let d = parent.remove(part);
            this.add(part, ...d);
            part.mount(this.element, this);
            break;
        }
    }
    UISelectorPart.dragee = null;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
}

class UISelector {
    constructor(selector) {
        this.selector = selector;
        this.parts = [];
        
        selector.v.forEach((e, i) => {
            this.parts.push(new UISelectorPart(e, i));
        });
        
        this.text = selector.v.join();
    }

    update() {
        this.parent.update();
    }

    mount(parent) {
        this.element = parent.selector_space;
        this.element.ondrop = drop.bind(this);
        this.element.ondragover = dragover;
        
        this.parent = parent;

        this.parts.forEach(e=>e.mount(this.element, this));
    }

    unmount() {
        if (this.element.parentElement)
            this.element.parentElement.removeChild(this.element);
    }

    remove(part){
        let index = part.index;
        this.parts.splice(index,1);
        this.parts.forEach((e,i)=>e.index = i);
        const a = this.selector.a.splice(index,1)[0];
        const v = this.selector.v.splice(index,1)[0];
        this.update();
        return [a,v]
    }

    add(part, a, v){
        this.parts.push(part);
        this.selector.a.push(a);
        this.selector.v.push(v);
        this.parts.forEach((e,i)=>e.index = i);
        this.update();
    }

    rebuild(selector){
        this.parts.forEach(e=>e.unmount(false));
        this.parts.length = 0;
        selector.v.forEach((e,i) => {
            this.parts.push(new UISelectorPart(e, i));
        });
        this.mount(this.parent);

    }
}

function createCache(cacher){
    let cache = null;
    const destroy = cacher.prototype.destroy;
    const init = cacher.prototype.init;

    cacher.prototype.destroy = function(...args){

        if(destroy)
            destroy.call(this, ...args);

        this.next_cached = cache;
        cache = this;
    };

    return function(...args){
            let r;
        if(cache){
            r = cache;
            cache = cache.next_cached;
            r.next_cached = null;
            init.call(r,...args);
        }else{
            r = new cacher(...args);
            r.next_cached = null;
            r.CACHED = true;
        }
        return r;
    };
}

const props = Object.assign({}, property_definitions);

var dragee = null;

function dragstart$1(e){
    event.dataTransfer.setData('text/plain',null);
    UIProp.dragee = this;
}

class UIProp {
    constructor(type,  parent) {
        // Predefine all members of this object.
        this.hash = 0;
        this.type = "";
        this.parent = null;
        this._value = null;
        this.setupElement(type);
        this.init(type, parent);
    }

    init(type,  parent){
        this.type = type;
        this.parent = parent;
    }

    destroy(){
        this.hash = 0;
        this.type = "";
        this.parent = null;
        this._value = null;
        this.type = null;
        this.parent = null;
        this.unmount();
    }

    build(type, value){
        this.element.innerHTML ="";
        this.element.appendChild(this.label);
        let pp = getPropertyParser(type, undefined, props, ui_productions);
        this._value = pp.buildInput(1, whind$1(value));
        this._value.parent = this;
        this._value.mount(this.element);
    }

    update(value) {
        this.parent.update(this.type, value.toString());
    }

    mount(element) {
        if (element instanceof HTMLElement)
            element.appendChild(this.element);
    }

    unmount() {
        if (this.element.parentElement)
            this.element.parentElement.removeChild(this.element);
    }

    setupElement(type) {
        this.element = document.createElement("div");
        this.element.setAttribute("draggable", "true");
        this.element.classList.add("prop");
        this.element.addEventListener("dragstart", dragstart$1.bind(this));
        this.label = document.createElement("span");
        this.label.classList.add("prop_label");
        this.label.innerHTML = `${type.replace(/[\-\_]/g, " ")}`;
    }

    get value(){
        return this._value.toString();
    }
}

UIProp = createCache(UIProp);

var UIProp$1 = UIProp;

const props$1 = Object.assign({}, property_definitions);
class UIRuleSet {
    constructor(rule_body, parent) {

        this.parent = parent;
        this.hash = 0;
        this.rules = [];
        this.selectors = null;

        this.element = document.createElement("div");
        this.element.classList.add("rule");
        this.selector_space = document.createElement("div");
        this.selector_space.classList.add("rule_selectors");
        this.rule_space = document.createElement("div");
        this.rule_space.classList.add("rule_body");

        this.element.addEventListener("dragover", dragover$1);
        this.element.addEventListener("drop", (e)=>{
            
            let prop = UIProp$1.dragee;
            let parent = prop.parent;
            let value = prop.value;
            let type = prop.type;

            if(parent === this)
                return;

            this.addProp(type, value);
            parent.removeProp(type);

            //move the dragee's data into this ruleset
        });

        this.element.appendChild(this.selector_space);
        this.element.appendChild(this.rule_space);

        this.build(rule_body);
        this.mount(this.parent.element);

        this.ver = rule_body;
    }

    addData(){

    }

    updateSelectors(obj){
        if(obj.parts.length < 1){
            //remove selector from the rule set.
        }
    }

    addSelector(selector){

        //Add to list of selectors and update UI
        if(!this.selectors){

            this.selectors = new UISelector(selector);

            this.selectors.mount(this);
        }else{
            this.selectors.rebuild(selector);
        }
    }

    mount(element) {
        if (element instanceof HTMLElement)
            element.appendChild(this.element);
    }

    unmount() {
        if (this.element.parentElement)
            this.element.parentElement.removeChild(this.element);
    }

    build(rule_body = this.rule_body) {


        this.rule_body = rule_body;

        let i = -1;

        for (let a in rule_body.props) {
            let rule;
            
            //Reuse Existing Rule Bodies
            if(++i < this.rules.length){
                rule = this.rules[i];
            }else{
                rule = new UIProp$1(a,  this);
                this.rules.push(rule);
            }
            rule.build(a, rule_body.toString(0, a));
            rule.mount(this.rule_space);
        }
    }

    rebuild(rule_body){
        if(true || this.ver !== rule_body.ver){
            this.rule_space.innerHTML = "";
            this.rules.length = 0;
            this.build(rule_body);
            this.ver = this.rule_body.ver;
        }
    }

    update(type, value) {

        if(type && value){

            console.log(type, value);

            let lexer = whind$1(value);
            
            const IS_VIRTUAL = {
                is: false
            };
            
            const parser = getPropertyParser(type, IS_VIRTUAL, property_definitions);
            const rule = this.rule_body;
            if (parser && !IS_VIRTUAL.is) {
                if (!rule.props) rule.props = {};
                parser.parse(lexer, rule.props);
            }
        }

        this.parent.update();
    }

    addProp(type, value){
        this.update(type, value);
        //Increment the version of the rule_body
        this.rule_body.ver++;
       
        this.rebuild(this.rule_body);
    }

    removeProp(type){
        const rule = this.rule_body;
        if(rule.props[type]){
            delete rule.props[type];


            //Increment the version of the rule_body
            this.rule_body.ver++;

            this.parent.update();
            this.rebuild(this.rule_body);
        }
    }

    generateHash() {}
}

function dragover$1(e){
    e.preventDefault();
}

//import { UIValue } from "./ui_value.mjs";

const props$2 = Object.assign({}, property_definitions);

class UIMaster {
    constructor(css) {
        css.addObserver(this);
        this.css = css;
        this.rule_sets = [];
        this.selectors = [];
        this.element = document.createElement("div");
        this.element.classList.add("cfw_css");


        this.rule_map = new Map();
    }

    // Builds out the UI elements from collection of rule bodies and associated selector groups. 
    // css - A CandleFW_CSS object. 
    // meta - internal 
    build(css = this.css) {

        //Extract rule bodies and set as keys for the rule_map. 
        //Any existing mapped body that does not have a matching rule should be removed. 
        
        const rule_sets = css.children;

        for(let i= 0; i < rule_sets.length; i++){
            let rule_set = rule_sets[i];

            for(let i = 0; i < rule_set.rules.length; i++){

                let rule = rule_set.rules[i];

                if(!this.rule_map.get(rule))
                    this.rule_map.set(rule, new UIRuleSet(rule, this));
                else {
                    this.rule_map.get(rule).rebuild(rule);
                }
            }

        
            const selector_array = rule_set._sel_a_;

            for(let i = 0; i < selector_array.length; i++){
                let selector = selector_array[i];
                let rule_ref = selector.r;

                let rule_ui = this.rule_map.get(rule_ref);

                rule_ui.addSelector(selector);
            }
        }


        this.css = css;

        let children = css.children;

        this.rule_sets = [];
        this.selectors = [];
    }

    updatedCSS(css) {
        if(this.UPDATE_MATCHED) return void (this.UPDATE_MATCHED = false);      
        //this.element.innerHTML = "";
        this.build(css);
        //this.render();
    }

    render() {
        for (let i = 0; i < this.rule_sets.length; i++)
            this.rule_sets.render(this.element);
    }

    mount(element) {
        if (element instanceof HTMLElement)
            element.appendChild(this.element);
    }

    unmount() {
        if (this.element.parentElement)
            this.element.parentElement.removeChild(this.element);
    }

    update(){
        this.UPDATE_MATCHED = true;
    	this.css.updated();
    }
}

/**
 * Container for all rules found in a CSS string or strings.
 *
 * @memberof module:wick~internals.css
 * @alias CSSRootNode
 */
class CSSRootNode {
    constructor() {
        this.promise = null;
        /**
         * Media query selector
         */
        this.pending_build = 0;
        this.resolves = [];
        this.res = null;
        this.observers = [];
        
        this.addChild(new CSSRuleBody());
    }

    _resolveReady_(res, rej) {
        if (this.pending_build > 0) this.resolves.push(res);
        res(this);
    }

    _setREADY_() {
        if (this.pending_build < 1) {
            for (let i = 0, l = this.resolves; i < l; i++) this.resolves[i](this);
            this.resolves.length = 0;
            this.res = null;
        }
    }

    READY() {
        if (!this.res) this.res = this._resolveReady_.bind(this);
        return new Promise(this.res);
    }
    /**
     * Creates a new instance of the object with same properties as the original.
     * @return     {CSSRootNode}  Copy of this object.
     * @public
     */
    clone() {
        let rn = new this.constructor();
        rn._selectors_ = this._selectors_;
        rn._sel_a_ = this._sel_a_;
        rn._media_ = this._media_;
        return rn;
    }

    * getApplicableSelectors(element, win = window) {

        for (let node = this.fch; node; node = this.getNextChild(node)) {

            if(node.matchMedia(win)){
                let gen = node.getApplicableSelectors(element, win);
                let v = null;
                while ((v = gen.next().value))
                    yield v;
            }
        }
    }

    /**
     * Retrieves the set of rules from all matching selectors for an element.
     * @param      {HTMLElement}  element - An element to retrieve CSS rules.
     * @public
     */
    getApplicableRules(element, rule = new CSSRule(), win = window) {
        for (let node = this.fch; node; node = this.getNextChild(node))
            node.getApplicableRules(element, rule, win);
        return rule;
    }

    /**
     * Gets the last rule matching the selector
     * @param      {string}  string  The string
     * @return     {CSSRule}  The combined set of rules that match the selector.
     */
    getRule(string) {
        let r = null;
        for (let node = this.fch; node; node = this.getNextChild(node))
            r = node.getRule(string, r);
        return r;
    }

    toString(off = 0) {
        let str = "";
        for (let node = this.fch; node; node = this.getNextChild(node))
            str += node.toString(off);
        return str;
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        for (let i = 0; i < this.observers.length; i++)
            if (this.observers[i] == observer) return this.observers.splice(i, 1);
    }

    updated() {
        if (this.observers.length > 0)
            for (let i = 0; i < this.observers.length; i++) this.observers[i].updatedCSS(this);
    }

    parse(lex, root) {
        if (typeof(lex) == "string")
            lex = whind$1(lex);

        if (lex.sl > 0) {

            if (!root && root !== null) {
                root = this;
                this.pending_build++;
            }

            return this.fch.parse(lex, this).then(e => {
                this._setREADY_();
                this.updated();
                return this;
            });
        }
    }

    merge(inCSSRootNode){
        if(inCSSRootNode instanceof CSSRootNode){
            
            let children = inCSSRootNode.children;
            outer:
            for(let i = 0; i < children.length; i++){
                //determine if this child matches any existing selectors
                let child = children[i];
                
                for(let i = 0; i < this.children.length; i++){
                    let own_child = this.children[i];

                    if(own_child.isSame(child)){
                        own_child.merge(child);
                        continue outer;
                    }
                }

                this.children.push(child);
            }
        }
    }
}

/**
 * CSSRootNode implements all of ll
 * @extends ll
 * @memberof  module:wick~internals.html.CSSRootNode
 * @private
 */
LinkedList.mixinTree(CSSRootNode);
/*
 * Expecting ID error check.
 */
const _err_ = "Expecting Identifier";

/**
 * Builds a CSS object graph that stores `selectors` and `rules` pulled from a CSS string. 
 * @function
 * @param {string} css_string - A string containing CSS data.
 * @param {string} css_string - An existing CSSRootNode to merge with new `selectors` and `rules`.
 * @return {Promise} A `Promise` that will return a new or existing CSSRootNode.
 * @memberof module:wick.core
 * @alias css
 */
const CSSParser = (css_string, root = null) => (root = (!root || !(root instanceof CSSRootNode)) ? new CSSRootNode() : root, root.parse(whind$1(css_string)));

CSSParser.types = types$1;

const
    CSS_Length$1 = CSSParser.types.length,
    CSS_Percentage$1 = CSSParser.types.percentage,
    CSS_Color$1 = CSSParser.types.color,
    CSS_Transform2D$1 = CSSParser.types.transform2D,
    CSS_Path$1 = CSSParser.types.path,
    CSS_Bezier$1 = CSSParser.types.cubic_bezier,

    Animation = (function anim() {

        var USE_TRANSFORM = false;

        const
            CSS_STYLE = 0,
            JS_OBJECT = 1,
            SVG = 3;

        function setType(obj) {
            if (obj instanceof HTMLElement) {
                if (obj.tagName == "SVG")
                    return SVG;
                return CSS_STYLE;
            }
            return JS_OBJECT;
        }

        const Linear = { getYatX: x => x, toString: () => "linear" };


        // Class to linearly interpolate number.
        class lerpNumber extends Number { lerp(to, t, from = 0) { return this + (to - this) * t; } copy(val) { return new lerpNumber(val); } }
        class lerpNonNumeric { constructor(v) { this.v = v; } lerp(to, t) { return to.v } copy(val) { return new lerpNonNumeric(val) } }


        // Store animation data for a single property on a single object. Hosts methods that can create CSS based interpolation and regular JS property animations. 
        class AnimProp {

            constructor(keys, obj, prop_name, type) {

                this.duration = 0;
                this.end = false;
                this.keys = [];
                this.current_val = null;

                const
                    IS_ARRAY = Array.isArray(keys),
                    k0 = IS_ARRAY ? keys[0] : keys,
                    k0_val = typeof(k0.value) !== "undefined" ? k0.value : k0.v;

                if (prop_name == "transform")
                    this.type = CSS_Transform2D$1;
                else {
                    this.type = this.getType(k0_val);
                }

                this.getValue(obj, prop_name, type);

                let p = this.current_val;

                if (IS_ARRAY)
                    keys.forEach(k => p = this.addKey(k, p));
                else
                    this.addKey(keys, p);
            }

            destroy() {
                this.keys = null;
                this.type = null;
                this.current_val = null;
            }

            getValue(obj, prop_name, type) {
                if (type == CSS_STYLE) {
                    let name = prop_name.replace(/[A-Z]/g, (match) => "-" + match.toLowerCase());
                    let cs = window.getComputedStyle(obj);

                    //Try to get computed value. If it does not exist, then get value from the style attribtute.
                    let value = cs.getPropertyValue(name);
                    
                    if(!value)
                        value = obj.style[prop_name];

                    if (this.type == CSS_Percentage$1) {
                        if (obj.parentElement) {
                            let pcs = window.getComputedStyle(obj.parentElement);
                            let pvalue = pcs.getPropertyValue(name);
                            let ratio = parseFloat(value) / parseFloat(pvalue);
                            value = (ratio * 100);
                        }
                    }

                    this.current_val = new this.type(value);

                } else {
                    this.current_val = new this.type(obj[prop_name]);
                }
            }

            getType(value) {

                switch (typeof(value)) {
                    case "number":
                        return lerpNumber;
                        break
                    case "string":
                        if (CSS_Length$1._verify_(value))
                            return CSS_Length$1;
                        if (CSS_Percentage$1._verify_(value))
                            return CSS_Percentage$1;
                        if (CSS_Color$1._verify_(value))
                            return CSS_Color$1;
                        //intentional
                    case "object":
                        return lerpNonNumeric;
                }
            }

            addKey(key, prev) {
                let
                    l = this.keys.length,
                    pkey = this.keys[l - 1],
                    v = (key.value !== undefined) ? key.value : key.v,
                    own_key = {
                        val: (prev) ? prev.copy(v) : new this.type(v) || 0,
                        dur: key.duration || key.dur || 0,
                        del: key.delay || key.del || 0,
                        ease: key.easing || key.e || ((pkey) ? pkey.ease : Linear),
                        len: 0
                    };

                own_key.len = own_key.dur + own_key.del;

                this.keys.push(own_key);

                this.duration += own_key.len;

                return own_key.val;
            }

            getValueAtTime(time = 0) {
                let val_start = this.current_val,
                    val_end = this.current_val,
                    key, val_out = val_start;


                for (let i = 0; i < this.keys.length; i++) {
                    key = this.keys[i];
                    val_end = key.val;
                    if (time < key.len) {
                        break;
                    } else
                        time -= key.len;
                    val_start = key.val;
                }


                if (key) {
                    if (time < key.len) {
                        if (time < key.del) {
                            val_out = val_start;
                        } else {
                            let x = (time - key.del) / key.dur;
                            let s = key.ease.getYatX(x);
                            val_out = val_start.lerp(val_end, s, val_start);
                        }
                    } else {
                        val_out = val_end;
                    }
                }

                return val_out;
            }

            run(obj, prop_name, time, type) {
                const val_out = this.getValueAtTime(time);
                this.setProp(obj, prop_name, val_out, type);
                return time < this.duration;
            }

            setProp(obj, prop_name, value, type) {

                if (type == CSS_STYLE) {
                    obj.style[prop_name] = value;
                } else
                    obj[prop_name] = value;
            }

            unsetProp(obj, prop_name) {
                this.setProp(obj, prop_name, "", CSS_STYLE);
            }

            toCSSString(time = 0, prop_name = "") {
                const value = this.getValueAtTime(time);
                return `${prop_name}:${value.toString()}`;
            }
        }

        // Stores animation data for a group of properties. Defines delay and repeat.
        class AnimSequence {
            constructor(obj, props) {
                this.duration = 0;
                this.time = 0;
                this.obj = null;
                this.type = setType(obj);
                this.DESTROYED = false;
                this.FINISHED = false;
                this.CSS_ANIMATING = false;
                this.events = {};
                this.SHUTTLE = false;
                this.REPEAT = 0;
                this.SCALE = 1;

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

            destroy() {
                for (let name in this.props)
                    if (this.props[name])
                        this.props[name].destroy();
                this.DESTROYED = true;
                this.duration = 0;
                this.obj = null;
                this.props = null;
                this.time = 0;
            }

            // Removes AnimProps based on object of keys that should be removed from this sequence.
            removeProps(props) {
                if (props instanceof AnimSequence)
                    props = props.props;

                for (let name in props) {
                    if (this.props[name])
                        this.props[name] = null;
                }
            }


            unsetProps(props) {
                for (let name in this.props)
                    this.props[name].unsetProp(this.obj, name);
            }

            setProps(props) {
                for (let name in this.props)
                    this.props[name].destroy();

                this.props = {};

                for (let name in props)
                    this.configureProp(name, props[name]);
            }

            configureProp(name, keys) {
                let prop;
                if (prop = this.props[name]) {
                    this.duration = Math.max(prop.duration || prop.dur, this.duration);
                } else {
                    prop = new AnimProp(keys, this.obj, name, this.type);
                    this.props[name] = prop;
                    this.duration = Math.max(prop.duration || prop.dur, this.duration);
                }
            }

            run(i) {

                for (let n in this.props) {
                    let prop = this.props[n];
                    if (prop)
                        prop.run(this.obj, n, i, this.type);
                }

                if (i >= this.duration || i <= 0)
                    return false;

                return true;
            }

            scheduledUpdate(a, t) {

                this.time += t * this.SCALE;
                if (this.run(this.time)){
                    spark.queueUpdate(this);
                }
                else if(this.REPEAT){
                    let scale = this.SCALE;
                    
                    this.REPEAT--;

                    if(this.SHUTTLE)
                        scale = -scale;
                    
                    let from = (scale > 0) ? 0 : this.duration;
                         
                    this.play(scale, from);
                }else
                    this.issueEvent("stopped");

            }

            //TODO: use repeat to continually play back numation 
            repeat(count = 1){
                this.REPEAT = Math.max(0,parseFloat(count));
                return this;
            } 
             //TODO: allow scale to control playback speed and direction
            play(scale = 1, from = 0) {
                this.SCALE = scale;
                this.time = from;
                spark.queueUpdate(this);
                this.issueEvent("started");
                return this;
            }

            set(i=0){
                if(i >= 0)
                    this.run(i*this.duration);
                else
                    this.run(this.duration - i*this.duration);
            }


            shuttle(SHUTTLE = true){
                this.SHUTTLE = !!SHUTTLE;
                return this;
            }

            addEventListener(event, listener) {
                if (typeof(listener) === "function") {
                    if (!this.events[event])
                        this.events[event] = [];
                    this.events[event].push(listener);
                }
            }

            removeEventListener(event, listener) {
                if (typeof(listener) === "function") {
                    let events = this.events[event];
                    if (events) {
                        for (let i = 0; i < events.length; i++)
                            if (events[i] === listener)
                                return e(vents.splice(i, 1), true);
                    }
                }
                return false;
            }

            issueEvent(event) {
                let events = this.events[event];

                if (events)
                    events.forEach(e => e(this));
            }

            toCSSString(keyfram_id) {

                const easing = "linear";

                const strings = [`.${keyfram_id}{animation:${keyfram_id} ${this.duration}ms ${Animation.ease_out.toString()}}`, `@keyframes ${keyfram_id}{`];

                // TODO: Use some function to determine the number of steps that should be taken
                // This should reflect the different keyframe variations that can occure between
                // properties.
                // For now, just us an arbitrary number

                const len = 2;
                const len_m_1 = len - 1;
                for (let i = 0; i < len; i++) {

                    strings.push(`${Math.round((i/len_m_1)*100)}%{`);

                    for (let name in this.props)
                        strings.push(this.props[name].toCSSString((i / len_m_1) * this.duration, name.replace(/([A-Z])/g, (match, p1) => "-" + match.toLowerCase())) + ";");

                    strings.push("}");
                }

                strings.push("}");

                return strings.join("\n");
            }

            beginCSSAnimation() {
                if (!this.CSS_ANIMATING) {

                    const anim_class = "class" + ((Math.random() * 10000) | 0);
                    this.CSS_ANIMATING = anim_class;

                    this.obj.classList.add(anim_class);
                    let style = document.createElement("style");
                    style.innerHTML = this.toCSSString(anim_class);
                    document.head.appendChild(style);
                    this.style = style;

                    setTimeout(this.endCSSAnimation.bind(this), this.duration);
                }
            }

            endCSSAnimation() {
                if (this.CSS_ANIMATING) {
                    this.obj.classList.remove(this.CSS_ANIMATING);
                    this.CSS_ANIMATING = "";
                    this.style.parentElement.removeChild(this.style);
                    this.style = null;
                }
            }
        }

        class AnimGroup {

            constructor() {
                this.seq = [];
                this.time = 0;
                this.duration = 0;
                this.SHUTTLE = false;
                this.REPEAT = 0;
                this.SCALE = 1;
            }

            destroy() {
                this.seq.forEach(seq => seq.destroy());
                this.seq = null;
            }

            add(seq) {
                this.seq.push(seq);
                this.duration = Math.max(this.duration, seq.duration);
            }

            run(t) {
                for (let i = 0, l = this.seq.length; i < l; i++) {
                    let seq = this.seq[i];
                    seq.run(t);
                }

                if (t >= this.duration)
                    return false;

                return true;
            }

            scheduledUpdate(a, t) {
                this.time += t * this.SCALE;
                if (this.run(this.time))
                    spark.queueUpdate(this);
                else if(repeat){
                    let scale = this.scale;
                    
                    repeat--;

                    if(this.SHUTTLE)
                        scale = -scale;
                    
                    let from = (scale > 0) ? 0 : this.duration;
                         
                    this.play(scale, from);
                }
            }

            shuttle(SHUTTLE = true){
                this.SHUTTLE = !!SHUTTLE;
                return this;
            }

            stop(){
                return this;
            }

            set(i=0){
                if(i >= 0)
                    this.run(i*this.duration);
                else
                    this.run(this.duration - i*this.duration);
            }

            //TODO: allow scale to control playback speed and direction
            play(scale = 1, from = 0) {
                this.SCALE = 0;
                this.time = from;
                spark.queueUpdate(this);
                return this;
            }
            //TODO: use repeat to continually play back numation 
            repeat(count = 0){
                this.REPEAT = Math.max(0,parseInt(count));
                return this;
            }    
        }

        const GlowFunction = function() {

            if (arguments.length > 1) {

                let group = new AnimGroup();

                for (let i = 0; i < arguments.length; i++) {
                    let data = arguments[i];

                    let obj = data.obj;
                    let props = {};

                    Object.keys(data).forEach(k => { if (!(({ obj: true, match: true })[k])) props[k] = data[k]; });

                    group.add(new AnimSequence(obj, props));
                }

                return group;

            } else {
                let data = arguments[0];

                let obj = data.obj;
                let props = {};

                Object.keys(data).forEach(k => { if (!(({ obj: true, match: true })[k])) props[k] = data[k]; });

                let seq = new AnimSequence(obj, props);

                return seq;
            }
        };

        Object.assign(GlowFunction, {

            createSequence: GlowFunction,

            createGroup: function(...rest) {
                let group = new AnimGroup;
                rest.forEach(seq => group.add(seq));
                return group;
            },

            set USE_TRANSFORM(v) { USE_TRANSFORM = !!v; },
            get USE_TRANSFORM() { return USE_TRANSFORM; },

            linear: Linear,
            ease: new CSS_Bezier$1(0.25, 0.1, 0.25, 1),
            ease_in: new CSS_Bezier$1(0.42, 0, 1, 1),
            ease_out: new CSS_Bezier$1(0.2, 0.8, 0.3, 0.99),
            ease_in_out: new CSS_Bezier$1(0.42, 0, 0.58, 1),
            overshoot: new CSS_Bezier$1(0.2, 1.5, 0.2, 0.8),
            custom: (x1, y1, x2, y2) => new CSS_Bezier$1(x1, y1, x2, y2)
        });

        return GlowFunction;
    })();

const CSS_Transform2D$2 = CSSParser.types.transform2D;

function setToWithTransform(box_a, box_b, seq){
    const start_width_as_percentage = box_a.width / box_b.width;
    const start_height_as_percentage = box_a.height / box_b.height;
    const pos_x_diff = -(box_b.x - box_a.x);
    const pos_y_diff = -(box_b.y - box_a.y);

    let ATransform = new CSS_Transform2D$2(pos_x_diff, pos_y_diff, start_width_as_percentage, start_height_as_percentage, 0);
    let BTransform = new CSS_Transform2D$2(0, 0, 1, 1, 0);

    seq.props.transform.keys[0].val = ATransform;
    seq.props.transform.keys[1].val = BTransform;
}

function setTo(to, seq, duration, easing, from){

    const cs = window.getComputedStyle(to, null);
    const rect = to.getBoundingClientRect();
    const from_rect = from.getBoundingClientRect();

    let to_width = cs.getPropertyValue("width");
    let to_height = cs.getPropertyValue("height");
    let margin_left = parseFloat(cs.getPropertyValue("margin-left"));
    let to_bgc = cs.getPropertyValue("background-color");
    let to_c = cs.getPropertyValue("color");
    const pos = cs.getPropertyValue("position");

    /* USING TRANSFORM */

    //Use width and height a per

    if(false){
        setToWithTransform(from_rect, rect, seq);
        //left.keys[0].val = new left.type(start_left, "px");
        //left.keys[1].val = new left.type(final_left,"px");
        seq.props.transform.keys[1].dur = duration;
        seq.props.transform.keys[1].len = duration;
        seq.props.transform.keys[1].ease = easing;
        seq.props.transform.duration = duration;
    }else{
        ////////////////////// LEFT ////////////////////// 

        const left = seq.props.left;
        let start_left = 0, final_left = 0, abs_diff = 0;

        abs_diff = (left.keys[0].val - rect.left);

        if(pos== "relative"){
            //get existing offset 
            const left = parseFloat(cs.getPropertyValue("left")) || 0;

            start_left = abs_diff +left;
            final_left = left;
        }else{
            start_left = to.offsetLeft + abs_diff;
            final_left = to.offsetLeft;
        }

        left.keys[0].val = new left.type(start_left, "px");
        left.keys[1].val = new left.type(final_left,"px");
        left.keys[1].dur = duration;
        left.keys[1].len = duration;
        left.keys[1].ease = easing;
        left.duration = duration;

        ////////////////////// TOP ////////////////////// 
        const top = seq.props.top;
        let start_top = 0, final_top = 0;

        abs_diff = (top.keys[0].val - rect.top);

        if(pos== "relative"){
             const top = parseFloat(cs.getPropertyValue("top")) || 0;
            start_top = abs_diff + top;
            final_top = top;
        }else{
            start_top = to.offsetTop + abs_diff;
            final_top = to.offsetTop;
        }

        top.keys[0].val = new top.type(start_top, "px");
        top.keys[1].val = new top.type(final_top,"px");
        top.keys[1].dur = duration;
        top.keys[1].len = duration;
        top.keys[1].ease = easing;
        top.duration = duration;

        ////////////////////// WIDTH ////////////////////// 

        seq.props.width.keys[0].val = new seq.props.width.type(to_width);
        seq.props.width.keys[0].dur = duration;
        seq.props.width.keys[0].len = duration;
        seq.props.width.keys[0].ease = easing;
        seq.props.width.duration = duration;

        ////////////////////// HEIGHT ////////////////////// 

        seq.props.height.keys[0].val = new seq.props.height.type(to_height);
        seq.props.height.keys[0].dur = duration;
        seq.props.height.keys[0].len = duration; 
        seq.props.height.keys[0].ease = easing; 
        seq.props.height.duration = duration;

    }
        to.style.transformOrigin = "top left";

    ////////////////////// BG COLOR ////////////////////// 

    seq.props.backgroundColor.keys[0].val = new seq.props.backgroundColor.type(to_bgc);
    seq.props.backgroundColor.keys[0].dur = duration; 
    seq.props.backgroundColor.keys[0].len = duration; 
    seq.props.backgroundColor.keys[0].ease = easing; 
    seq.props.backgroundColor.duration = duration;

    ////////////////////// COLOR ////////////////////// 

    seq.props.color.keys[0].val = new seq.props.color.type(to_c);
    seq.props.color.keys[0].dur = duration; 
    seq.props.color.keys[0].len = duration; 
    seq.props.color.keys[0].ease = easing; 
    seq.props.color.duration = duration;

    seq.obj = to;



    seq.addEventListener("stopped", ()=>{
        seq.unsetProps();
    });
}

/**
    Transform one element from another back to itself
    @alias module:wick~internals.TransformTo
*/
function TransformTo(element_from, element_to, duration = 500, easing = Animation.linear, HIDE_OTHER = false) {
    let rect = element_from.getBoundingClientRect();
    let cs = window.getComputedStyle(element_from, null);
    let margin_left = parseFloat(cs.getPropertyValue("margin"));

    let seq = Animation.createSequence({
        obj: element_from,
        // /transform: [{value:"translate(0,0)"},{value:"translate(0,0)"}],
        width: { value: "0px"},
        height: { value: "0px"},
        backgroundColor: { value: "rgb(1,1,1)"},
        color: { value: "rgb(1,1,1)"},
        left: [{value:rect.left+"px"},{ value: "0px"}],
        top: [{value:rect.top+"px"},{ value: "0px"}]
    });

    if (!element_to) {

        let a = (seq) => (element_to, duration = 500, easing = Animation.linear,  HIDE_OTHER = false) => {
            setTo(element_to, seq, duration, easing, element_from);
            seq.duration = duration;
        console.log(seq.toCSSString("MumboJumbo"));
            return seq;
        };

        return a(seq);
    }

    setTo(element_to, duration, easing, element_from);
    seq.duration = duration;
    return seq;
}

const Transitioneer = (function() {

    let obj_map = new Map();
    let ActiveTransition = null;

    function $in(anim_data_or_duration = 0, delay = 0) {

        let seq;

        if (typeof(anim_data_or_duration) == "object") {
            if (anim_data_or_duration.match && this.TT[anim_data_or_duration.match]) {
                let duration = anim_data_or_duration.duration;
                let easing = anim_data_or_duration.easing;
                seq = this.TT[anim_data_or_duration.match](anim_data_or_duration.obj, duration, easing);
            } else
                seq = Animation.createSequence(anim_data_or_duration);

            //Parse the object and convert into animation props. 
            if (seq) {
                this.in_seq.push(seq);
                this.in_duration = Math.max(this.in_duration, seq.duration);
                if (this.OVERRIDE) {

                    if (obj_map.get(seq.obj)) {
                        let other_seq = obj_map.get(seq.obj);
                        other_seq.removeProps(seq);
                    }

                    obj_map.set(seq.obj, seq);
                }
            }

        } else
            this.in_duration = Math.max(this.in_duration, parseInt(delay) + parseInt(anim_data_or_duration));

        return this.in;
    }


    function $out(anim_data_or_duration = 0, delay = 0, in_delay = 0) {
        //Every time an animating component is added to the Animation stack delay and duration need to be calculated.
        //The highest in_delay value will determine how much time is afforded before the animations for the in portion are started.

        if (typeof(anim_data_or_duration) == "object") {

            if (anim_data_or_duration.match) {
                this.TT[anim_data_or_duration.match] = TransformTo(anim_data_or_duration.obj);
            } else {
                let seq = Animation.createSequence(anim_data_or_duration);
                if (seq) {
                    this.out_seq.push(seq);
                    this.out_duration = Math.max(this.out_duration, seq.duration);
                    if (this.OVERRIDE) {

                        if (obj_map.get(seq.obj)) {
                            let other_seq = obj_map.get(seq.obj);
                            other_seq.removeProps(seq);
                        }

                        obj_map.set(seq.obj, seq);
                    }
                }
                this.in_delay = Math.max(this.in_delay, parseInt(delay));
            }
        } else {
            this.out_duration = Math.max(this.out_duration, parseInt(delay) + parseInt(anim_data_or_duration));
            this.in_delay = Math.max(this.in_delay, parseInt(in_delay));
        }
    }



    class Transition {
        constructor(override = true) {
            this.in_duration = 0;
            this.out_duration = 0;
            this.PLAY = true;

            this.reverse = false;

            this.time = 0;

            // If set to zero transitions for out and in will happen simultaneously.
            this.in_delay = 0;

            this.in_seq = [];
            this.out_seq = [];

            this.TT = {};
            //Final transition time is given by max(start_len+in_delay, end_len);\
            ActiveTransition = this;

            this.out = $out.bind(this);
            this.in = $in.bind(this);

            Object.defineProperty(this.out, "out_duration", {
                get: () => this.out_duration
            });

            this.OVERRIDE = override;
        }

        destroy() {
            let removeProps = function(seq) {

                if (!seq.DESTROYED) {
                    if (obj_map.get(seq.obj) == seq)
                        obj_map.delete(seq.obj);
                }

                seq.destroy();
            };
            this.in_seq.forEach(removeProps);
            this.out_seq.forEach(removeProps);
            this.in_seq.length = 0;
            this.out_seq.length = 0;
            this.res = null;
            this.out = null;
            this.in = null;
        }

        get duration() {
            return Math.max(this.in_duration + this.in_delay, this.out_duration);
        }


        start(time = 0, speed = 1, reverse = false) {

            for (let i = 0; i < this.in_seq.length; i++) {
                // let seq = this.in_seq[i];
                // seq.beginCSSAnimation()
            }

            this.time = time;
            this.speed = Math.abs(speed);
            this.reverse = reverse;

            if (this.reverse)
                this.speed = -this.speed;

            return new Promise((res, rej) => {
                if (this.duration > 0)
                    this.scheduledUpdate(0, 0);
                if (this.duration < 1)
                    return res();
                this.res = res;
            });
        }

        play(t) {


            this.PLAY = true;
            let time = this.duration * t;
            this.step(time);
            return time;
        }

        stop() {
            this.PLAY = false;
            //There may be a need to kill any existing CSS based animations
        }

        step(t) {
            
            for (let i = 0; i < this.out_seq.length; i++) {
                let seq = this.out_seq[i];
                if (!seq.run(t) && !seq.FINISHED) {
                    seq.issueEvent("stopped");
                    seq.FINISHED = true;
                }
            }

            t = Math.max(t - this.in_delay, 0);

            for (let i = 0; i < this.in_seq.length; i++) {
                let seq = this.in_seq[i];
                if (!seq.run(t) && !seq.FINISHED) {
                    seq.issueEvent("stopped");
                    seq.FINISHED = true;
                }
            }

        }

        scheduledUpdate(step, time) {
            if (!this.PLAY) return;

            this.time += time * this.speed;

            this.step(this.time);


            if (this.res && this.time >= this.in_delay) {
                this.res();
                this.res = null;
            }

            if (this.reverse) {
                if (this.time > 0)
                    return spark.queueUpdate(this);
            } else {
                if (this.time < this.duration)
                    return spark.queueUpdate(this);
            }

            if (this.res)
                this.res();

            this.destroy();
        }
    }

    return { createTransition: (OVERRIDE) => new Transition(OVERRIDE) };
})();

Object.assign(Animation, {
	createTransition:(...args) => Transitioneer.createTransition(...args),
	transformTo:(...args) => TransformTo(...args)
});

const Globals = new Set([
    "window",
    "document",
    "JSON",
    "HTMLElement",
]);

class argumentIO extends IO {
    constructor(scope, errors, tap, script, id){
        super(scope, errors, tap);
        this.ele = script;
        this.id = id;
        this.ACTIVE = false;
    }

    destroy(){
        this.id = null;
        super.destroy();
    }

    down(value){
        this.ele.updateProp(this, value);
    }
}


//Function.apply(Function, [binding.arg_key || binding.tap_name, "event", "model", "emit", "presets", "static", "src", binding.val]);
class ScriptIO extends IOBase {
    constructor(scope, errors, tap, binding, node, statics) {

        let presets = scope.presets;
        let ids = binding.ids;
        let func, HAVE_CLOSURE = false;
        tap = tap || {prop:""};

        //*********** PRE OBJECT FUNCTION INITIALIZATION *******************//

        const args = binding.args;
        
        const names = args.map(a=>a.name);

        names.push("emit"); // For the injected emit function
        //names.unshift(binding.tap_name);

        const arg_ios = {};
        let TAP_BINDING = -1;
        let ACTIVE_IOS = 0;

        const props = args.map((a,i)=>{
            
            if(a.IS_TAPPED){

                if(a.name == tap.prop)
                    TAP_BINDING = i;

                ACTIVE_IOS++;

                const arg_io = new argumentIO(scope, errors, scope.getTap(a.name), null, i);
                
                arg_ios[a.name] = arg_io;

                return null;
            }

            return a.val;
        });

        
        //props.unshift(null); // Place holder for value data
        try {
            if (binding._func_) {
                func = binding._func_;
                if(binding.HAVE_CLOSURE)
                    HAVE_CLOSURE = true;
            } else {
                func = Function.apply(Function, names.concat([binding.val]));
                binding._func_ = func;
            }
        } catch (e) {
            errors.push(e);
            console.error(`Script error encountered in ${statics.url || "virtual file"}:${node.line+1}:${node.char}`);
            console.warn(binding.val);
            console.error(e);
            func = () => {};
        }

        super(tap);

        this.IO_ACTIVATIONS = ACTIVE_IOS;
        this.active_IOS = 0;

        this.function = binding.val;

        this.HAVE_CLOSURE = HAVE_CLOSURE;

        if(this.HAVE_CLOSURE)
            this._func_ = func;
        else
            this._func_ = func.bind(scope);
        
        this.scope = scope;
        this.TAP_BINDING = TAP_BINDING;

        //Embedded emit functions
        const func_bound = this.emit.bind(this);
        func_bound.onTick = this.onTick.bind(this);
        
        //TODO: only needed if emit is called in function. Though highly probably. 
        props.push(new Proxy(func_bound, { set: (obj, name, value) => { obj(name, value); } }));

        this.arg_props = props;
        this.arg_ios = arg_ios;

        for(const a in arg_ios)
            arg_ios[a].ele = this;
        
        //this.meta = null;
        this.url = statics.url;

        this.offset = node.offset;
        this.char = node.char;
        this.line = node.line;
    }

    /*
        Removes all references to other objects.
        Calls destroy on any child objects.
     */
    destroy() {
        this._func_ = null;
        this.scope = null;
        this._bound_emit_function_ = null;
        this._meta = null;
        this.arg_props = null;
        this.props = null;

        for(const a of this.arg_ios)
            a.destroy();

        this.arg_ios = null;
    }

    updateProp(io, val){
        this.arg_props[io.id] = val;

        if(!io.ACTIVE){
            io.ACTIVE = true;
            this.active_IOS++;
        }
    }

    down(value, meta = { event: null }) {

        const src = this.scope;

        if(value){ 
            if(typeof(value) == "object"){
                //Distribute iterable properties amongst the IO_Script's own props.
                for(const a in value){
                    if(this.arg_ios[a])
                        this.arg_ios[a].down(value[a]);
                }
            }else{
                if(this.TAP_BINDING !== -1)
                    this.arg_props[this.TAP_BINDING] = value;
            }
        }

        if(this.active_IOS < this.IO_ACTIVATIONS) 
            return

        try {
            
            if(this.HAVE_CLOSURE)
                return this._func_.apply(this, this.arg_props);
            else
                return this._func_.apply(this, this.arg_props);
        } catch (e) {
            console.error(`Script error encountered in ${this.url || "virtual file"}:${this.line+1}:${this.char}`);
            console.warn(this.function);
            console.error(e);
        }
    }

    emit(name, value) {
        if (
            typeof(name) !== "undefined" &&
            typeof(value) !== "undefined"
        ) {
            this.scope.upImport(name, value, this.meta);
        }
    }

    /* 
        Same as emit, except the message is generated on the next global tick. 
        Useful for actions which require incremental updates to the UI.
    */
    onTick(name){
        spark.queueUpdate({
            _SCHD_:0, // Meta value for spark;
            scheduledUpdate:(s,d)=>this.emit(name, {step:s,diff:d})
        });
    }
}

const EXPRESSION = 5;
const IDENTIFIER = 6;
const EVENT = 7;
const BOOL = 8;

const defaults = { glow: Animation };


class scr extends ElementNode{
	constructor(ast, attribs, presets){
		
		super("script", [], attribs);

		this.processJSAST(ast, presets, true);

		this.on = this.getAttrib("on").value;
	}


	processJSAST(ast, presets = {custom:{}}, ALLOW_EMIT = false){

        let
            tvrs = ast.traverseDepthFirst(),
            node = tvrs.next().value,
            non_global = new Set(),
            globals = new Set(),
            assignments = new Map();

        //Retrieve undeclared variables to inject as function arguments.
        while (node) {

            if (
                node.type == types.id ||
                node.type == types.member
            ) {
                if (node.root)
                    globals.add(node.name);
            }

            if (node.type == types.assign) {

                node.id.root = false;

                if (!assignments.has(node.id.name))
                    assignments.set(node.id.name, []);

                const assignment_sites = assignments.get(node.id.name);

                assignment_sites.push(node);
            }

            if (
                node.type == types.lex ||
                node.type == types.var
            ) {
                node.bindings.forEach(b => (non_global.add(b.id.name), globals.delete(b.id.name)));
            }

            node = tvrs.next().value;
        }

        //Process any out globals and get argument wrappers
        const out_globals = [...globals.values()].reduce((red, out) => {
            let out_object = { name: out, val: null, IS_TAPPED: false };

            if (window[out]){
                return red;
                //out_object.val = window[out];
            }

            else if (presets.custom[out])
                out_object.val = presets.custom[out];

            else if (presets[out])
                out_object.val = presets[out];

            else if (defaults[out])
                out_object.val = defaults[out];

            else {
                out_object.IS_TAPPED = true;
            }

            red.push(out_object);

            return red;
        },[]);

        if(ALLOW_EMIT)
		    //Replace matching call sites with emit functions / emit member nodes
		    assignments.forEach((m,k)=>m.forEach(assign$$1 => {
		        if (window[k] || this.presets.custom[k]|| this.presets[k]|| defaults[k])
		            return;
		        assign$$1.id = new mem([new identifier$1(["emit"]), null, assign$$1.id]);
		    }));

        
        let r = new rtrn([]);
        r.expr = ast;
        ast = r;

        this.args = out_globals;
        this.val = ast + "";
        this.expr = ast;
        this.METHOD = EXPRESSION;
	}

	mount(element, scope, statics, presets){
		const tap = this.on.bind(scope);
		new ScriptIO(scope, [], tap, this, {}, statics = {});
	};
}

class scp extends ElementNode{

	constructor(children, attribs, presets){
        
		super("scope", children, attribs, presets);

		this.import = this.getAttrib("import").value;
		this.export = this.getAttrib("export").value;
		this.put = this.getAttrib("put").value;
		this.model_name = this.getAttrib("model").value;
		this.schema_name = this.getAttrib("schema").value;
        this.element = this.getAttrib("element").value;
	}

    createElement() {
        return createElement(this.element);
    }

	mount(element, scope, statics, presets){

        let data = {};

        let out_taps = [];

        let me = new Scope(scope, this.__presets__ || presets || this.presets, element, this);

        //this.pushChached(me);

        me._model_name_ = this.model_name;
        me._schema_name_ = this.schema_name;

        let tap_list = this.tap_list;

        /*
        for (let i = 0, l = tap_list.length; i < l; i++) {
            let tap = tap_list[i],
                name = tap.name;

            let bool = name == "update";

            me.taps[name] = bool ? new UpdateTap(me, name, tap.modes) : new Tap(me, name, tap.modes);

            if (bool)
                me.update_tap = me.taps[name];

            out_taps.push(me.taps[name]);
        }
        */

        /**
         * To keep the layout of the output HTML predictable, Wick requires that a "real" HTMLElement be defined before a scope object is created. 
         * If this is not the case, then a new element, defined by the "element" attribute of the scope virtual tag (defaulted to a "div"), 
         * will be created to allow the scope object to bind to an actual HTMLElement. 
         */
        if (!element || this.getAttrib("element").value) {

            let ele = this.createElement();

            this.class.split(" ").map(c => c ? ele.classList.add(c) : {});

            if (this.getAttribute("id"))
                ele.id = this.getAttribute("id");

            if (this.getAttribute("style"))
                ele.style = this.getAttribute("style");

            me.ele = ele;

            if (element) {
                appendChild(element, ele);
            }

            element = ele;

            if (this._badge_name_)
                me.badges[this._badge_name_] = element;

            /*
            let hook = {
                attr: this.attributes,
                bindings: [],
                style: null,
                ele: element
            };
            for (let i = 0, l = this.bindings.length; i < l; i++) {
                let attr = this.bindings[i];
                let bind = attr.binding._bind_(me, errors, out_taps, element, attr.name);

                if (hook) {
                    if (attr.name == "style" || attr.name == "css")
                        hook.style = bind;

                    hook.bindings.push(bind);
                }
            }

            me.hooks.push(hook);
            */
        }
        /*
        for (let i = 0, l = this.attributes.length; i < l; i++) {
            let attr = this.attributes[i];

            if (!attr.value) {
                //let value = this.par.importAttrib()
                //if(value) data[attr.name];
            } else
                data[attr.name] = attr.value;
        }
`           
        if (this.url || this.__statics__) {
            statics = Object.assign(statics, this.__statics__);
            statics.url = this.url;
        }
        */
        /*
            par_list.push(this)
        */

        //par_list.push(this);
        for(let i = 0; i < this.children.length; i++){
            //for (let node = this.fch; node; node = this.getNextChild(node))
            const node = this.children[i];
                node.mount(element, me, statics, presets);
        }
        /*
            par_list.pop()
        */
        /*
        if (statics || this.__statics__) {
            let s = Object.assign({}, statics ? statics : {}, this.__statics__);
            me.statics = s;
            me.update(me.statics);
        }*/

        //this.popCached(me);

        return me;
	}
}

class a$1 extends ElementNode{
	constructor(children, attribs){
		super("a", children, attribs);
	}
}

function getColumnRow(index, offset, set_size) {
    const adjusted_index = index - offset * set_size;
    const row = Math.floor(adjusted_index / set_size);
    const col = (index) % (set_size);
    return { row, col };
}

/**
 * ScopeContainer provide the mechanisms for dealing with lists and sets of components. 
 *
 * @param      {Scope}  parent   The Scope parent object.
 * @param      {Object}  data     The data object hosting attribute properties from the HTML template. 
 * @param      {Object}  presets  The global presets object.
 * @param      {HTMLElement}  element  The element that the Scope will _bind_ to. 
 */
class ScopeContainer extends View {

    constructor(parent, presets, element) {

        super();

        this.ele = element;
        this.parent = null;
        this.activeScopes = [];
        this.dom_scopes = [];
        this.filters = [];
        this.ios = [];
        this.terms = [];
        this.scopes = [];
        this.range = null;
        this._SCHD_ = 0;
        this.prop = null;
        this.component = null;
        this.transition_in = 0;
        this.limit = 0;
        this.shift_amount = 1;
        this.dom_dn = [];
        this.dom_up = [];
        this.trs_ascending = null;
        this.trs_descending = null;
        this.UPDATE_FILTER = false;
        this.dom_up_appended = false;
        this.dom_dn_appended = false;
        this.root = 0;
        this.AUTO_SCRUB = false;
        this.taps = {};

        this.scrub_velocity = 0;

        this.offset = 0;
        this.offset_diff = 0;
        this.offset_fractional = 0;

        parent.addTemplate(this);
    }

    get data() {}
    set data(container) {
        if (container instanceof ModelContainerBase) {
            container.pin();
            container.addObserver(this);
            return;
        }
        if (!container) return;
        if (Array.isArray(container)) this.cull(container);
        else this.cull(container.data);
    }

    update(container) {
        if (container instanceof ModelContainerBase) container = container.get();
        if (!container) return;
        //let results = container.get(this.getTerms());
        // if (container.length > 0) {
        if (Array.isArray(container)) this.cull(container);
        else this.cull(container.data);
        // }
    }


    /**
     * Called by Spark when a change is made to the Template HTML structure. 
     * 
     * @protected
     */
    scheduledUpdate() {

        if (this.SCRUBBING) {

            if (!this.AUTO_SCRUB) {
                this.SCRUBBING = false;
                return;
            }

            if (
                Math.abs(this.scrub_velocity) > 0.0001
            ) {
                if (this.scrub(this.scrub_velocity)) {

                    this.scrub_velocity *= (this.drag);

                    let pos = this.offset + this.scrub_velocity;

                    if (pos < 0 || pos > this.max)
                        this.scrub_velocity = 0;

                    spark.queueUpdate(this);
                }

            } else {
                this.scrub_velocity = 0;
                this.scrub(Infinity);
                this.SCRUBBING = false;
            }
        } else if (this.UPDATE_FILTER) {
            this.filterUpdate();
            this.render();
        } else {
            
            const offset_a = this.offset;
            
            this.limitUpdate();
            
            const offset_b = this.offset;

            this.offset = offset_a;
            this.forceMount();
            this.arrange();
            this.offset = offset_b;
            this.render();
            this.offset_diff = 0;
        }
    }

    forceMount() {
        const active_window_size = this.limit;
        const offset = this.offset;


        const min = Math.min(offset + this.offset_diff, offset) * this.shift_amount;
        const max = Math.max(offset + this.offset_diff, offset) * this.shift_amount + active_window_size;


        let i = min;

        this.ele.innerHTML = "";
        const output_length = this.activeScopes.length;
        this.dom_scopes.length = 0;

        while (i < max && i < output_length) {
            const node = this.activeScopes[i++];
            this.dom_scopes.push(node);
            node.appendToDOM(this.ele);
        }
    }

    /**
     * Scrub provides a mechanism to scroll through components of a container that have been limited through the limit filter.
     * @param  {Number} scrub_amount [description]
     */
    scrub(scrub_delta, SCRUBBING = true) {
        // scrub_delta is the relative ammunt of change from the previous offset. 

        if(!this.SCRUBBING) 
            this.render(null, this.activeScopes, true);

        this.SCRUBBING = true;

        if (this.AUTO_SCRUB && !SCRUBBING && scrub_delta != Infinity) {
            this.scrub_velocity = 0;
            this.AUTO_SCRUB = false;
        }

        let delta_offset = scrub_delta + this.offset_fractional;
        if (scrub_delta !== Infinity) {

            if (Math.abs(delta_offset) > 1) {
                if (delta_offset > 1) {

                    delta_offset = delta_offset % 1;
                    this.offset_fractional = delta_offset;
                    this.scrub_velocity = scrub_delta;

                    if (this.offset < this.max)
                        this.trs_ascending.play(1);

                    this.offset++;
                    this.offset_diff = 1;
                    this.render(null, this.activeScopes, true).play(1);
                } else {
                    delta_offset = delta_offset % 1;
                    this.offset_fractional = delta_offset;
                    this.scrub_velocity = scrub_delta;

                    if (this.offset >= 1)
                        this.trs_descending.play(1);
                    this.offset--;
                    this.offset_diff = -1;

                    this.render(null, this.activeScopes, true).play(1);
                }

            } 

            //Make Sure the the transition animation is completed before moving on to new animation sequences.

            if (delta_offset > 0) {

                if (this.offset + delta_offset >= this.max - 1) delta_offset = 0;

                if (!this.dom_up_appended) {

                    for (let i = 0; i < this.dom_up.length; i++) {
                        this.dom_up[i].appendToDOM(this.ele);
                        this.dom_up[i].index = -1;
                        this.dom_scopes.push(this.dom_up[i]);
                    }

                    this.dom_up_appended = true;
                }

                this.trs_ascending.play(delta_offset);
            } else {

                if (this.offset < 1) delta_offset = 0;

                if (!this.dom_dn_appended) {

                    for (let i = 0; i < this.dom_dn.length; i++) {
                        this.dom_dn[i].appendToDOM(this.ele, this.dom_scopes[0].ele);
                        this.dom_dn[i].index = -1;
                    }

                    this.dom_scopes = this.dom_dn.concat(this.dom_scopes);

                    this.dom_dn_appended = true;
                }

                this.trs_descending.play(-delta_offset);
            }

            this.offset_fractional = delta_offset;
            this.scrub_velocity = scrub_delta;

            return true;
        } else {

            if (Math.abs(this.scrub_velocity) > 0.0001) {
                const sign = Math.sign(this.scrub_velocity);

                if (Math.abs(this.scrub_velocity) < 0.1) this.scrub_velocity = 0.1 * sign;
                if (Math.abs(this.scrub_velocity) > 0.5) this.scrub_velocity = 0.5 * sign;

                this.AUTO_SCRUB = true;

                //Determine the distance traveled with normal drag decay of 0.5
                let dist = this.scrub_velocity * (1 / (-0.5 + 1));
                //get the distance to nearest page given the distance traveled
                let nearest = (this.offset + this.offset_fractional + dist);
                nearest = (this.scrub_velocity > 0) ? Math.min(this.max, Math.ceil(nearest)) : Math.max(0, Math.floor(nearest));
                //get the ratio of the distance from the current position and distance to the nearest 
                let nearest_dist = nearest - (this.offset + this.offset_fractional);
                let drag = Math.abs(1 - (1 / (nearest_dist / this.scrub_velocity)));

                this.drag = drag;
                this.scrub_velocity = this.scrub_velocity;
                this.SCRUBBING = true;
                spark.queueUpdate(this);
                return true;
            } else {
                this.offset += Math.round(this.offset_fractional);
                this.scrub_velocity = 0;
                this.offset_fractional = 0;
                this.render(null, this.activeScopes, true).play(1);
                this.SCRUBBING = false;
                return false;
            }
        }
    }

    arrange(output = this.activeScopes) {



        //Arranges active scopes according to their arrange handler.
        const
            limit = this.limit,
            offset = this.offset,
            transition = Animation.createTransition(),
            output_length = output.length,
            shift_points = Math.ceil(output_length / this.shift_amount),
            active_window_start = offset * this.shift_amount;

        let i = 0;

        //Scopes on the ascending edge of the transition window
        while (i < active_window_start && i < output_length)
            output[i].update({ trs_asc_out: { trs: transition.in, pos: getColumnRow(i, offset, this.shift_amount) } }), i++;

        //Scopes in the transtion window
        while (i < active_window_start + limit && i < output_length)
            output[i].update({ arrange: { trs: transition.in, pos: getColumnRow(i, offset, this.shift_amount) } }), i++;

        //Scopes on the descending edge of the transition window
        while (i < output_length)
            output[i].update({ trs_dec_out: { trs: transition.in, pos: getColumnRow(i, offset, this.shift_amount) } }), i++;
        
        transition.play(1);
        
    }

    render(transition, output = this.activeScopes, NO_TRANSITION = false) {


        let
            active_window_size = this.limit,
            offset = this.offset,
            j = 0,
            output_length = output.length,
            active_length = this.dom_scopes.length,
            direction = 1,
            OWN_TRANSITION = false;

        if (!transition) transition = Animation.createTransition(), OWN_TRANSITION = true;

        offset = Math.max(0, offset);

        const active_window_start = offset * this.shift_amount;

        direction = Math.sign(this.offset_diff);

        if (active_window_size > 0) {

            this.shift_amount = Math.max(1, Math.min(active_window_size, this.shift_amount));

            let
                i = 0,
                oa = 0,
                ein = [],
                shift_points = Math.ceil(output_length / this.shift_amount);

            this.max = shift_points - 1;
            this.offset = Math.max(0, Math.min(shift_points - 1, offset));

            //Two transitions to support scrubbing from an offset in either direction
            this.trs_ascending = Animation.createTransition(false);
            this.trs_descending = Animation.createTransition(false);

            this.dom_dn.length = 0;
            this.dom_up.length = 0;
            this.dom_up_appended = false;
            this.dom_dn_appended = false;

            //Scopes preceeding the transition window
            while (i < active_window_start - this.shift_amount) output[i++].index = -2;

            //Scopes entering the transition window ascending
            while (i < active_window_start) {
                this.dom_dn.push(output[i]);
                output[i].update({ trs_dec_in: { trs: this.trs_descending.in, pos: getColumnRow(i, this.offset - 1, this.shift_amount) } });
                output[i++].index = -2;
            }

            //Scopes in the transtion window
            while (i < active_window_start + active_window_size && i < output_length) {
                //Scopes on the descending edge of the transition window
                if (oa < this.shift_amount && ++oa) {
                    //console.log("pos",i, getColumnRow(i, this.offset+1, this.shift_amount), output[i].scopes[0].ele.style.transform)
                    output[i].update({ trs_asc_out: { trs: this.trs_ascending.out, pos: getColumnRow(i, this.offset + 1, this.shift_amount) } });
                } else
                    output[i].update({ arrange: { trs: this.trs_ascending.in, pos: getColumnRow(i, this.offset + 1, this.shift_amount) } });


                //Scopes on the ascending edge of the transition window
                if (i >= active_window_start + active_window_size - this.shift_amount)
                    output[i].update({ trs_dec_out: { trs: this.trs_descending.out, pos: getColumnRow(i, this.offset - 1, this.shift_amount) } });
                else
                    output[i].update({ arrange: { trs: this.trs_descending.in, pos: getColumnRow(i, this.offset - 1, this.shift_amount) } });


                output[i].index = i;
                ein.push(output[i++]);
            }

            //Scopes entering the transition window while offset is descending
            while (i < active_window_start + active_window_size + this.shift_amount && i < output_length) {
                this.dom_up.push(output[i]);
                output[i].update({
                    trs_asc_in: {
                        pos: getColumnRow(i, this.offset + 1, this.shift_amount),
                        trs: this.trs_ascending.in
                    }
                });
                output[i++].index = -3;
            }

            //Scopes following the transition window
            while (i < output_length) output[i++].index = -3;

            output = ein;
            output_length = ein.length;
        } else {
            this.max = 0;
            this.limit = 0;
        }

        let trs_in = { trs: transition.in, index: 0 };
        let trs_out = { trs: transition.out, index: 0 };

        for (let i = 0; i < output_length; i++) output[i].index = i;

        for (let i = 0; i < active_length; i++) {
            let as = this.dom_scopes[i];

            if (as.index > j) {
                while (j < as.index && j < output_length) {

                    let os = output[j];
                    os.index = j;
                    trs_in.pos = getColumnRow(j, this.offset, this.shift_amount);
                    os.appendToDOM(this.ele, as.element);
                    os.transitionIn(trs_in, (direction) ? "trs_asc_in" : "trs_dec_in");
                    j++;
                }
            } else if (as.index < 0) {
                trs_out.pos = getColumnRow(i, 0, this.shift_amount);
                if (!NO_TRANSITION) {
                    switch (as.index) {
                        case -2:
                        case -3:
                            as.transitionOut(trs_out, (direction > 0) ? "trs_asc_out" : "trs_dec_out");
                            break;
                        default:
                            as.transitionOut(trs_out);
                    }
                } else {

                    as.transitionOut();
                }

                continue;
            }
            trs_in.pos = getColumnRow(j++, 0, this.shift_amount);
            as.update({ arrange: trs_in });
            as._TRANSITION_STATE_ = true;
            as.index = -1;
        }

        while (j < output.length) {
            output[j].appendToDOM(this.ele);
            output[j].index = -1;
            trs_in.pos = getColumnRow(j, this.offset, this.shift_amount);

            output[j].transitionIn(trs_in, (direction) ? "arrange" : "arrange");
            j++;
        }

        this.ele.style.position = this.ele.style.position;
        this.dom_scopes = output;

        this.parent.upImport("template_count_changed", {
            displayed: output_length,
            offset: offset,
            count: this.activeScopes.length,
            pages: this.max,
            ele: this.ele,
            template: this,
            trs: transition.in
        });

        if (OWN_TRANSITION) {
            if (NO_TRANSITION)
                return transition;
            transition.start();
        }

        return transition;
    }

    // Reduces the compenents that are mounted and displayed to the ones determined by current filter parameters.
    limitUpdate() {
        let offset = this.offset;
        for (let i = 0, l = this.filters.length; i < l; i++) {
            let filter = this.filters[i];
            if (filter.CAN_USE) {
                if (filter._CAN_LIMIT_) this.limit = parseInt(filter._value_); // Make sure we are dealing with integers. 
                // Value could be string debinding on the type of 
                // binding. Applies to other values. 
                if (filter._CAN_OFFSET_) offset = parseInt(filter._value_);
                if (filter._CAN_SHIFT_) this.shift_amount = parseInt(filter._value_);
            }
        }

        this.offset_diff = offset - this.offset;
        this.offset = offset;
    }

    /**
     * Filters stored Scopes with search terms and outputs the matching Scopes to the DOM.
     * 
     * @protected
     */
    filterUpdate() {

        let output = this.scopes.slice();

        if (output.length < 1) return;
        for (let i = 0, l = this.filters.length; i < l; i++) {
            let filter = this.filters[i];
            if (filter.CAN_USE) {
                if (filter.CAN_FILTER) output = output.filter(filter.filter_function._filter_expression_);
                if (filter.CAN_SORT) output = output.sort(filter._sort_function_);
            }
        }
        this.activeScopes = output;
        this.UPDATE_FILTER = false;

        return output;
    }
    /**
     * Removes stored Scopes that do not match the ModelContainer contents. 
     *
     * @param      {Array}  new_items  Array of Models that are currently stored in the ModelContainer. 
     * 
     * @protected
     */
    cull(new_items = []) {
        const transition = Animation.createTransition();

        if (new_items.length == 0) {
            let sl = this.scopes.length;
            for (let i = 0; i < sl; i++) this.scopes[i].transitionOut(transition, "", true);
            this.scopes.length = 0;
            this.parent.upImport("template_count_changed", {
                displayed: 0,
                offset: 0,
                count: 0,
                pages: 0,
                ele: this.ele,
                template: this,
                trs: transition.in
            });
        } else {

            const
                exists = new Map(new_items.map(e => [e, true])),
                out = [];

            for (let i = 0, l = this.activeScopes.length; i < l; i++)
                if (exists.has(this.activeScopes[i].model)) 
                    exists.set(this.activeScopes[i].model, false);
                

            for (let i = 0, l = this.scopes.length; i < l; i++)
                if (!exists.has(this.scopes[i].model)) {
                    this.scopes[i].transitionOut(transition, "dismounting", true);
                    this.scopes[i].index = -1;
                    this.scopes.splice(i, 1);
                    l--;
                    i--;
                } else
                    exists.set(this.scopes[i].model, false);

            exists.forEach((v, k, m) => { if (v) out.push(k); });

            if (out.length > 0) {
                // Wrap models into components
                this.added(out, transition);

                // Update offset, limit, and shift variables.
                this.limitUpdate();

                // Filter the current components. 
                this.filterUpdate(out);

                //Preset the positions of initial components. 
                this.arrange();

                this.render(transition);
            } else {
                for (let i = 0, j = 0, l = this.activeScopes.length; i < l; i++, j++) {

                    if (this.activeScopes[i]._TRANSITION_STATE_) {
                        if (j !== i) {
                            this.activeScopes[i].update({
                                arrange: {
                                    pos: getColumnRow(i, this.offset, this.shift_amount),
                                    trs: transition.in
                                }
                            });
                        }
                    } else
                        this.activeScopes.splice(i, 1), i--, l--;
                }

                const c = this.filterUpdate(transition);
                this.limitUpdate(transition);
                this.arrange();
                this.render(transition);
            }
        }

        // If scrubbing is currently occuring, if the transition were to auto play then the results 
        // would interfere with the expected behavior of scrubbing. So the transition
        // is instead set to it's end state, and scrub is called to set intermittent 
        // position. 
        //*
        if (this.SCRUBBING) {
            //transition.play(1);
            //this.scrub(0);
        } else
            transition.start();
    
    }
    /**
     * Called by the ModelContainer when Models have been removed from its set.
     *
     * @param      {Array}  items   An array of items no longer stored in the ModelContainer. 
     */
    removed(items, transition = Animation.createTransition()) {
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            for (let j = 0; j < this.scopes.length; j++) {
                let Scope = this.scopes[j];
                if (Scope.model == item) {
                    this.scopes.splice(j, 1);
                    Scope.transitionOut(transition, "", true);
                    break;
                }
            }
        }

        this.limitUpdate();
        this.filterUpdate(transition);
        //this.arrange();
        this.render(transition);
    }
    /**
     * Called by the ModelContainer when Models have been added to its set.
     *
     * @param      {Array}  items   An array of new items now stored in the ModelContainer. 
     */
    added(items, transition) {
        let OWN_TRANSITION = false;

        if (!transition)
            transition = Animation.createTransition(), OWN_TRANSITION = true;

        for (let i = 0; i < items.length; i++) {
            const scope = this.component.mount(null, items[i]);
            this.scopes.push(scope);
            this.parent.addScope(scope);
        }

        if (OWN_TRANSITION) {
            this.limitUpdate();
            this.filterUpdate(transition);
            //this.arrange();
            this.render(transition);
            transition.play();
        }
    }

    revise() {
        if (this.cache) this.update(this.cache);
    }

    getTerms() {
        let out_terms = [];
        for (let i = 0, l = this.terms.length; i < l; i++) {
            let term = this.terms[i].term;
            if (term) out_terms.push(term);
        }
        if (out_terms.length == 0) return null;
        return out_terms;
    }

    get() {
        if (this.model instanceof MultiIndexedContainer) {
            if (this.data.index) {
                let index = this.data.index;
                let query = {};
                query[index] = this.getTerms();
                return this.model.get(query)[index];
            } else console.warn("No index value provided for MultiIndexedContainer!");
        } else {
            let scope = this.model.scope;
            let terms = this.getTerms();
            if (scope) {
                this.model.destroy();
                let model = scope.get(terms, null);
                model.pin();
                model.addObserver(this);
            }
            return this.model.get(terms);
        }
        return [];
    }

    down(data, changed_values) {
        for (let i = 0, l = this.activeScopes.length; i < l; i++) this.activeScopes[i].down(data, changed_values);
    }
}

ScopeContainer.prototype.removeIO = Tap.prototype.removeIO;
ScopeContainer.prototype.addIO = Tap.prototype.addIO;

class fltr extends ElementNode{
	constructor(attribs, presets){
		super("f", null, attribs, presets);
	}

	mount(scope, container){

	}
}

/******************** Expressions **********************/

class ExpressionIO extends ScriptIO {
    constructor(ele, scope, errors, tap, binding, lex){
        super(scope, errors, tap, binding, lex, {});
        this.ele = ele;   
        this._SCHD_ = 0;
    }

    updateProp(io, val){
        super.updateProp(io,val);
        this.down();
    }

    down(v,m){
        this.val = super.down(v,m);
        spark.queueUpdate(this);
    }

    scheduledUpdate() {
        this.ele.data = this.val;
    }   
}

const EXPRESSION$1 = 5;
const IDENTIFIER$1 = 6;
const EVENT$1 = 7;
const BOOL$1 = 8;

const defaults$1 = { glow: Animation };


class Binding{
	
	constructor(sym, env, lex){
		this.lex = lex.copy(); 
		this.lex.sl = lex.off-3; 
		this.lex.off = env.start; 

		this.METHOD = IDENTIFIER$1;
		
		this.expr = sym[1];
        this.exprb = (sym.length > 3) ? sym[3] : null;

		this.args = null;
		this.val = this.expr + "";

		if(!(this.expr instanceof identifier$1) && !(this.expr instanceof mem))
			this.processJSAST(this.expr, env.presets);

		console.log(this.expr + "");
	}

    toString(){
        if(this.exprb)
            return `((${this.expr + ""})(${this.exprb + ""}))`;
        else
            return `((${this.expr + ""}))`;
    }

	processJSAST(ast, presets = {custom:{}}, ALLOW_EMIT = false){

        let
            tvrs = ast.traverseDepthFirst(),
            node = tvrs.next().value,
            non_global = new Set(),
            globals = new Set(),
            assignments = new Map();

        //Retrieve undeclared variables to inject as function arguments.
        while (node) {

            if (
                node.type == types.id ||
                node.type == types.member
            ) {
                if (node.root)
                    globals.add(node.name);
            }

            if (node.type == types.assign) {

                node.id.root = false;

                if (!assignments.has(node.id.name))
                    assignments.set(node.id.name, []);

                const assignment_sites = assignments.get(node.id.name);

                assignment_sites.push(node);
            }

            if (
                node.type == types.lex ||
                node.type == types.var
            ) {
                node.bindings.forEach(b => (non_global.add(b.id.name), globals.delete(b.id.name)));
            }

            node = tvrs.next().value;
        }

        //Process any out globals and get argument wrappers
        const out_globals = [...globals.values()].reduce((red, out) => {
            let out_object = { name: out, val: null, IS_TAPPED: false };

            if (window[out]){
                return red;
                //out_object.val = window[out];
            }

            else if (presets.custom[out])
                out_object.val = presets.custom[out];

            else if (presets[out])
                out_object.val = presets[out];

            else if (defaults$1[out])
                out_object.val = defaults$1[out];

            else {
                out_object.IS_TAPPED = true;
            }

            red.push(out_object);

            return red;
        },[]);

        if(ALLOW_EMIT)
		    //Replace matching call sites with emit functions / emit member nodes
		    assignments.forEach((m,k)=>m.forEach(assign$$1 => {
		        if (window[k] || this.presets.custom[k]|| this.presets[k]|| defaults$1[k])
		            return;
		        assign$$1.id = new mem([new identifier$1(["emit"]), null, assign$$1.id]);
		    }));

        
        let r = new rtrn([]);
        r.expr = ast;
        ast = r;

        this.args = out_globals;
        this.val = ast + "";
        this.expr = ast;
        this.METHOD = EXPRESSION$1;
	}

	bind(scope){
        if(this.METHOD == EXPRESSION$1){
            return new ExpressionIO(null, scope, [], scope, this, this.lex);
        }
        else 
            return scope.getTap(this.val);	
    }
}

Binding.type = {
	Attribute:0,
	TextNode:1,
	Style:2
};

class TextNode {

    constructor(sym, env) {
        this.data = sym[0];
        this.IS_BINDING = (this.data instanceof Binding);
    }

    toString(off = 0) {
        return `${offset.repeat(off)} ${this.data.toString()}\n`;
    }

    mount(element, scope, statics, presets, ele = document.createTextNode("")) {

        if (ele instanceof Text)
            element.appendChild(ele);

        if (this.IS_BINDING)
            new DataNodeIO(scope, this.data.bind(scope), ele, this.data.exprb);
        else
            ele.data = this.data;
    }
}

class d$2 {
    // Compiles the component to a HTML file. 
    // Returns a string representing the file data.
    compileToHTML(bound_data_object) {

    }

    // Compiles the component to a JS file
    // Returns a string representing the file data.
    compileToJS(bound_data_object) {

    }

    //Registers the component as a Web Component.
    //Herafter the Web Component API will be used to mount this component. 
    register(bound_data_object) {

        if (!this.name)
            throw new Error("This component has not been defined with a name. Unable to register it as a Web Component.");

        if (customElements.get(this.name))
            console.trace(`Web Component for name ${this.name} has already been defined. It is now being redefined.`);

        customElements.define(
            this.name,
            d$2.web_component_constructor(this, bound_data_object), {}
        );
    }

    //Mounts component data to new HTMLElement object.
    mount(HTMLElement_, bound_data_object) {
        let element = null;
        
        if ((HTMLElement_ instanceof HTMLElement)){
            //throw new Error("HTMLElement_ argument is not an instance of HTMLElement. Cannot mount component");

            element = HTMLElement_.attachShadow({ mode: 'open' });
        }

        const scope = this.ast.mount(element);

        if (bound_data_object)
            scope.load(bound_data_object);

        return scope;
    }

    connect(h, b) { return this.mount(h, b) }
}

d$2.web_component_constructor = function(wick_component, bound_data) {
    return class extends HTMLElement {
        constructor() {
            super();
            wick_component.mount(this, bound_data);
        }
    };
};

function BaseComponent(ast, presets) {
    this.ast = ast;
    this.READY = true;
    this.presets = presets;
    //Reference to the component name. Used with the Web Component API
    this.name = "";
}

BaseComponent.prototype = d$2.prototype;

class ctr extends ElementNode {
    
    constructor(children, attribs, presets) {
        super("container", children, attribs, presets);

        this.filters = null;
        this.property_bind = null;
        this.scope_children = null;

        //Tag name of HTMLElement the container will create;
        this.element = this.getAttribute("element") || "ul";

        this.filters = children.reduce((r, c) => { if (c instanceof fltr) r.push(c); return r }, []);
        this.nodes = children.reduce((r, c) => { if (c instanceof ElementNode && !(c instanceof fltr)) r.push(c); return r }, []);
        this.binds = children.reduce((r, c) => { if (c instanceof TextNode && c.IS_BINDING) r.push(c); return r }, []);

        //Keep in mind slots!;
        this.component_constructor = (this.nodes.length > 0) ? new BaseComponent(this.nodes[0], this.presets) : null;
    }

    merge(node) {
        const merged_node = super.merge(node);
        merged_node.filters = this.filters;
        merged_node.nodes = this.filters;
        merged_node.binds = this.binds;
        merged_node.MERGED = true;
        return merged_node;
    }

    mount(element, scope, statics, presets) {

        scope = scope || new Scope(null, presets, element, this);

        const
            ele = createElement(this.element),
            container = new ScopeContainer(scope, presets, ele);

        appendChild(element, ele);

        this.class.split(" ").map(c => c ? ele.classList.add(c) : {});

        if(this.component_constructor)
            container.component = this.component_constructor;

        for (let i = 0; i < this.filters.length; i++)
            this.filters[i].mount(scope, container);

        for (let i = 0, l = this.attribs.length; i < l; i++)
            this.attribs[i].bind(ele, scope);

        if (this.binds.length > 0) {
            for (let i = 0; i < this.binds.length; i++)
                this.binds[i].mount(null, scope, statics, presets, container);
        }else{ 
            //If there is no binding, then there is no potential to have ModelContainer borne components.
            //Instead, load any existing children as component entries for the container element. 
            for (let i = 0; i < this.nodes.length; i++)
                container.activeScopes.push(this.nodes[i].mount(null, null, statics, presets));
        }


        container.render();

        return scope;
    }
}

class sty extends ElementNode{
	constructor(children, attribs){
		CSSParser;
		
		let data = children[0].data;
		CSSParser(data).then(css=>{
			debugger
		});
		super("style", children, attribs);
	}
}

class v$1 extends ElementNode{
	constructor(tag, children, attribs){
		super(tag, children, attribs);
	}
}

class svg extends ElementNode{
	constructor(children, attribs){
		super("svg", children, attribs);
	}
}

class slt extends ElementNode{
	constructor(children, attribs){
		super("slot", children, attribs);
	}
}

class pre extends ElementNode{
	constructor(children, attribs){
		super("pre", children, attribs);
	}
}

//import Plugin from "../../../plugin.mjs";

function element_selector (sym, env, lex){ 
	const 
        FULL = sym.length > 5,
        tag = sym[1],
        attribs = sym[2],
        children = (FULL) ? sym[4] : [];

    const presets = env.presets;

    let node = null;

    switch (tag) {
        case "filter":
        case "f":
            node =  new fltr(attribs, presets); break;
        case "a":
            node =  new a$1(children, attribs, presets); break;
            /** void elements **/
        case "template":
            node =  new v$1(tag, children, attribs, presets); break;
        case "css":
        case "style":
            node =  new sty(children, attribs, presets); break;
        case "script":
            node =  new scr(children, attribs, presets); break;
        case "svg":
        case "path":
            node =  new svg(tag, children, attribs, presets); break;
        case "container":
            node =  new ctr(children, attribs, presets); break;
        case "scope":
            node =  new scp(children, attribs, presets); break;
        case "slot":
            node =  new slt(children, attribs, presets); break;
            
            //Elements that should not be parsed for binding points.
        case "pre":
        case "code":
            node =  new pre(children, attribs, presets); break;
        default:
            node =  new ElementNode(tag, children, attribs, presets); break;
    }

    node.SINGLE = !FULL;

    return node;
}

class Attribute {

    constructor(sym) {

        const
            HAS_VALUE = sym.length > 1,
            name = sym[0],
            val = (HAS_VALUE) ? sym[2] : null;

        this.name = name;
        this.value = val;
        this.io_constr = AttribIO;
        this.isBINDING = false;

        if (this.value instanceof Binding)
            this.isBINDING = true;
    }

    link(element) {
        const tag = element.tag;

        if (this.isBINDING) {

            if (this.name == "value" && tag == "input")
                this.io_constr = InputIO;
        }

    }

    bind(element, scope) {
        if (!this.isBINDING)
            element.setAttribute(this.name, this.value);
        else {
            const
                bind = this.value.bind(scope),
                io = new this.io_constr(scope, [], bind, this.name, element, this.value.default);
        }
    }
}

const env = {
    table: {},
    ASI: true,
    functions: {
        //HTML
        element_selector,
        attribute: Attribute,
        wick_binding: Binding,
        text: TextNode,

        //JS
        for_stmt,
        call_expr,
        identifier: identifier$1,
        catch_stmt,
        try_stmt,
        stmts,
        lexical,
        binding,
        member: mem,
        block,
        assign,
        object,
        add,
        sub,
        div,
        mult,
        exp,
        lt,
        negate_expr: negate,
        if_stmt: function(sym) { this.bool = sym[2];
            this.body = sym[4];
            this.else = sym[6];},
        while_stmt: function(sym) { this.bool = sym[1];
            this.body = sym[3];},
        return_stmt: rtrn,
        class_stmt: function(sym) { this.id = sym[1], this.tail = sym[2];},
        class_tail: function(sym) { this.heritage = sym[0];
            this.body = sym[2];},
        debugger_stmt: base,
        lex_stmt: function(sym) { this.ty = sym[0];
            this.declarations = sym[1];},
        var_stmt: function(sym) { this.declarations = sym[1]; },
        member_expr: function(sym) { this.id = sym[0];
            this.expr = sym[2];},
        add_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "ADD";},
        or_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "OR";},
        and_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "AND";},
        sub_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "SUB";},
        mult_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "MUL";},
        div_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "DIV";},
        mod_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "MOD";},
        lt_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "LT";},
        gt_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "GT";},
        lte_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "LTE";},
        gte_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "GTE";},
        eq_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "EQ";},
        seq_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "STRICT_EQ";},
        neq_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "NEQ";},
        sneq_expr: function(sym) { this.le = sym[0];
            this.re = sym[2];
            this.ty = "STRICT_NEQ";},
        unary_not_expr: function(sym) { this.expr = sym[1];
            this.ty = "NOT";},
        unary_plus: function(sym) { this.expr = sym[1];
            this.ty = "PRE INCR";},
        unary_minus: function(sym) { this.expr = sym[1];
            this.ty = "PRE INCR";},
        pre_inc_expr: function(sym) { this.expr = sym[1];
            this.ty = "PRE INCR";},
        pre_dec_expr: function(sym) { this.expr = sym[1];
            this.ty = "PRE DEC";},
        post_inc_expr: function(sym) { this.expr = sym[0];
            this.ty = "POST INCR";},
        post_dec_expr: function(sym) { this.expr = sym[0];
            this.ty = "POST DEC";},
        condition_expr: function(sym) { this.condition = sym[0];
            this.le = sym[2];
            this.re = sym[4];},
        null_literal: null_,
        numeric_literal: number$2,
        bool_literal: bool$1,
        string_literal: string$2,
        label_stmt: function(sym) { this.label = sym[0];
            this.stmt = sym[1];},
        funct_decl: function(id, args, body) { this.id = id || "Anonymous";
            this.args = args;
            this.body = body, this.scope = false; },
        this_expr: function() {},

        defaultError: (tk, env, output, lex, prv_lex, ss, lu) => {
            /*USED for ASI*/

            if (env.ASI && lex.tx !== ")" && !lex.END) {

                if (lex.tx == "</") // As in "<script> script body => (</)script>"
                    return lu.get(";");

                let ENCOUNTERED_END_CHAR = (lex.tx == "}" || lex.END || lex.tx == "</");

                while (!ENCOUNTERED_END_CHAR && !prv_lex.END && prv_lex.off < lex.off) {
                    prv_lex.next();
                    if (prv_lex.ty == prv_lex.types.nl)
                        ENCOUNTERED_END_CHAR = true;
                }

                if (ENCOUNTERED_END_CHAR)
                    return lu.get(";");
            }

            if (lex.END)
                return lu.get(";");
        }
    },

    prst: [],
    pushPresets(prst) {
        env.prst.push(prst);
    },
    popPresets() {
        return env.prst.pop();
    },
    get presets() {
        return env.prst[env.prst.length - 1] || null;
    },

    options: {
        integrate: false,
        onstart: () => {
            env.table = {};
            env.ASI = true;
        }
    }
};

const

    default_presets = new Presets,

    // This is to allow components to import data from remote resources


    // If compilation fails, failure component is generated that provides 
    // error information. 

    compileAST = async (component_data, presets) => {
            var
                ast = null,
                string_data = "";

            switch (typeof component_data) {

                case "string":
                    /* Need to determine if string is:
                           URL to component resource
                           HTML data
                           JS data
                           or incompatible data that should throw.
                    */

                    string_data = component_data;

                    var url;

                    if ((url = URL.resolveRelative(component_data, "")))
                        string_data = await url.fetchText();
                    break;

                case "object":
                    if (component_data instanceof URL) {

                    } else if (component_data instanceof HTMLElement) {

                        if (component_data.tagName == "TEMPLATE")
                            if (component_data.tagName == "TEMPLATE") {
                                const temp = document.createElement("div");
                                temp.appendChild(component_data.content);
                                component_data = temp;
                            }

                        string_data = component_data.innerHTML;
                    }
                    // Extract properties from the object that relate to wick component attributes. 
                    break;
            }

            env.pushPresets(presets);

            try {

                ast = parser(whind$1(string_data), env);

            } catch (err) {
                console.error(err);
            }

            env.popPresets();

            return ast;
        },


        // This is a variadic function that accepts objects, string, and urls, 
        //  and compiles data from the argument sources into a wick component. 
        Component = function(...data) {
            // The presets object provides global values to this component
            // and all its derivatives and descendents. 
            let presets = default_presets;

            if (data.length > 1)
                presets = data.slice(-1);

            if (data.length === 0)
                throw new Error("This function requires arguments. Refer to wick docs on what arguments may be passed to this function.");

            const component_data = data[0];

            // If this function is an operand of the new operator, run an alternative 
            // compiler on the calling object.
            if (new.target) {
                const monitor = {pending_count:1};

                compileAST(component_data, presets, monitor).then(ast => {
                    this.READY = true;
                    this.ast = ast;

                    if (!this.name)
                        this.name = this.ast.getAttrib("component").value || "undefined-component";
                });

                this.ast = null;

                this.READY = false;

                this.presets = data[1] || default_presets;

                //Reference to the component name. Used with the Web Component API
                this.name = "";

                if (this.constructor !== Component) {
                    //Go through chain and extract functions that have names starting with $. Add them to the ast.  
                }

            } else {
                return new Component(...data);
            }
        };

Component.prototype = d$2.prototype;

//TODO: Fancy schmancy to string method.
Component.toString = function() {
    return "WICK 2019";
};

/**
 *   This is used by Model to create custom property getter and setters on non-ModelContainerBase and non-Model properties of the Model constructor.
 *   @protected
 *   @memberof module:wick~internals.model
 */
function CreateSchemedProperty(object, scheme, schema_name, index) {
    if (object[schema_name])
        return;

    Object.defineProperty(object, schema_name, {
        configurable: false,
        enumerable: true,
        get: function() {
            return this.getHook(schema_name, this.prop_array[index]);
        },
        set: function(value) {

            let result = { valid: false };

            let val = scheme.parse(value);

            scheme.verify(val, result);

            if (result.valid && this.prop_array[index] != val) {
                this.prop_array[index] = this.setHook(schema_name, val);
                this.scheduleUpdate(schema_name);
                this._changed_ = true;
            }
        }
    });
}

/**
    This is used by Model to create custom property getter and setters on Model properties of the Model constructor.
    @protected
    @memberof module:wick~internals.model
*/
function CreateModelProperty(object, model, schema_name, index) {

    Object.defineProperty(object, schema_name, {
        configurable: false,
        enumerable: true,
        get: function() {

            let m = this.prop_array[index];

            if (!m) {
                let address = this.address.slice();
                address.push(index);
                m = new model(null, this.root, address);
                m.par = this;
                m.prop_name = schema_name;
                m.MUTATION_ID = this.MUTATION_ID;
                this.prop_array[index] = m;
            }

            return this.getHook(schema_name, m);
        }
    });
}

class SchemedModel extends ModelBase {

    constructor(data, root = null, address = [], _schema_ = null) {

        super(root, address);

        if (this.constructor === SchemedModel)
            this.constructor = (class extends SchemedModel {});

        if (!this.schema) {

            let schema = this.constructor.schema || _schema_;

            this.constructor.schema = schema;

            if (schema) {

                let __FinalConstructor__ = schema.__FinalConstructor__;

                let constructor = this.constructor;
                let prototype = constructor.prototype;

                if (!__FinalConstructor__) {
                    let count = 0;
                    let look_up = {};

                    for (let schema_name in schema) {
                        let scheme = schema[schema_name];

                        if (schema_name == "self" && Array.isArray(scheme)) 
                            return new SchemedContainer(schema, root, address);
                        

                        if (schema_name == "getHook") {
                            prototype.getHook = scheme;
                            continue;
                        }

                        if (schema_name == "setHook") {
                            prototype.setHook = scheme;
                            continue;
                        }

                        if (schema_name == "proto") {
                            for (let name in schema.proto)
                                _SealedProperty_(prototype, name, schema.proto[name]);
                            continue;
                        }

                        if (typeof(scheme) == "function") {
                            CreateModelProperty(prototype, scheme, schema_name, count);
                        } else if (typeof(scheme) == "object") {
                            if (Array.isArray(scheme)) {
                                if (scheme[0] && scheme[0].container && scheme[0].schema)
                                    CreateModelProperty(prototype, scheme[0], schema_name, count);
                                else if (scheme[0] instanceof ModelContainerBase)
                                    CreateModelProperty(prototype, scheme[0].constructor, schema_name, count);
                                else
                                    CreateModelProperty(prototype, Model, schema_name, count);
                            } else if (scheme instanceof SchemeConstructor)
                                CreateSchemedProperty(prototype, scheme, schema_name, count);
                            else {
                                CreateModelProperty(prototype, scheme.constructor, schema_name, count);
                            }
                        } else {
                            console.warn(`Could not create property ${schema_name}.`);

                            continue;
                        }

                        look_up[schema_name] = count;
                        count++;
                    }

                    _SealedProperty_(prototype, "prop_offset", count);
                    _SealedProperty_(prototype, "look_up", look_up);
                    _SealedProperty_(prototype, "changed", false);

                    Object.seal(constructor);

                    schema.__FinalConstructor__ = constructor;
                    //_FrozenProperty_(schema, "__FinalConstructor__", constructor);

                    //Start the process over with a newly minted Model that has the properties defined in the Schema
                    return new schema.__FinalConstructor__(data, root, address);
                }

                _FrozenProperty_(prototype, "schema", schema);
            } else
                return new Model(data, root, address);
        }

        Object.defineProperty(this, "prop_array", { value: new Array(this.prop_offset), enumerable: false, configurable: false, writable: true });

        if (data)
            this.set(data, true);
    }

    destroy() { this.root = null; }

    set(data, FROM_ROOT = false) {

        if (!FROM_ROOT)
            return this._deferUpdateToRoot_(data).set(data, true);

        if (!data)
            return false;

        this._changed_ = false;

        for (let prop_name in data) {

            let data_prop = data[prop_name];

            let index = this.look_up[prop_name];

            if (index !== undefined) {

                let prop = this[prop_name];

                if (typeof(prop) == "object") {

                    if (prop.MUTATION_ID !== this.MUTATION_ID) {
                        prop = prop.clone();
                        prop.MUTATION_ID = this.MUTATION_ID;
                        this.prop_array[index] = prop;
                    }

                    if (prop.set(data_prop, true))
                        this.scheduleUpdate(prop_name);

                } else {
                    this[prop_name] = data_prop;
                }
            }
        }

        return this._changed_;
    }

    createProp() {}
}
SchemedModel.prototype.toJSON = Model.prototype.toJSON;

class SchemedContainer extends ArrayModelContainer {
    
    constructor(schema, root, address) {

        super(schema.self, root, address);

        if (schema.proto)
            for (let name in schema.proto)
                _SealedProperty_(this, name, schema.proto[name]);
    }
}

const wick = Component;

const model = (data, schema) => new SchemedModel(data, undefined, undefined, schema);
model.scheme = (s, scheme) => (scheme = class extends SchemedModel {}, scheme.schema = s, scheme);
model.constr = SchemedModel;
model.any = (data) => new Model(data);
model.any.constr = Model;
model.container = {
    multi: MultiIndexedContainer,
    array: ArrayModelContainer,
    btree: BTreeModelContainer,
    constr: ModelContainerBase
};
model.store = (data) => new Store(data);

wick.model = model;

exports.default = wick;