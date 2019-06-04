var wick = (function () {
    'use strict';

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

    const number = 1,
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
                t = thick_line.repeat(line_fill + 48),
                is_iws = (!this.IWS) ? "\n The Lexer produced whitespace tokens" : "";
            const pk = this.copy();
            pk.IWS = false;
            while (!pk.END && pk.ty !== Types.nl) { pk.next(); }
            const end = (pk.END) ? this.str.length : pk.off ;

        //console.log(`"${this.str.slice(this.off-this.char+((this.line > 0) ? 2 :2), end).split("").map((e,i,s)=>e.charCodeAt(0))}"`)
        let v = "", length = 0;
        v = this.str.slice(this.off-this.char+((this.line > 0) ? 2 :1), end);
        length = this.char;
        return `${message} at ${this.line}:${this.char}
${t}
${line_number+v}
${line.repeat(length+line_fill-((this.line > 0) ? 2 :1))+arrow}
${t}
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
            const l = marker.sl,
                str = marker.str,
                IWS = marker.IWS;

            let length = marker.tl,
                off = marker.off + length,
                type = symbol,
                line = marker.line,
                base = off,
                char = marker.char,
                root = marker.off;

            if (off >= l) {
                length = 0;
                base = l;
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
                    m;
                let i = 0;

                while (code == 32 && IWS)
                    (code = str.charCodeAt(++off2), off++);

                while ((m = map.get(code))) {
                    map = m;
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
                                while (++off < l && (12 & number_and_identifier_table[str.charCodeAt(off)]));

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
                                while (++off < l && ((10 & number_and_identifier_table[str.charCodeAt(off)])));
                                type = identifier;
                                length = off - base;
                                break;
                            case 2: //QUOTED STRING
                                if (this.PARSE_STRING) {
                                    type = symbol;
                                } else {
                                    while (++off < l && str.charCodeAt(off) !== code);
                                    type = string;
                                    length = off - base + 1;
                                }
                                break;
                            case 3: //SPACE SET
                                while (++off < l && str.charCodeAt(off) === SPACE);
                                type = white_space;
                                length = off - base;
                                break;
                            case 4: //TAB SET
                                while (++off < l && str[off] === HORIZONTAL_TAB);
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
                        if (off < l) {
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
                const c = jump_table[lex.string.charCodeAt(lex.off)];

                if (c > 2 && c < 7) {

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
                const c = jump_table[lex.string.charCodeAt(lex.sl - 1)];

                if (c > 2 && c < 7) {
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
                let m = map.get(code);
                if (!m) {
                    m = map.set(code, new Map).get(code);
                }
                map = m;
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

        set string_length(s) {}

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
        set END(v) {}

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

    const uri_reg_ex = /(?:([a-zA-Z][\dA-Za-z\+\.\-]*)(?:\:\/\/))?(?:([a-zA-Z][\dA-Za-z\+\.\-]*)(?:\:([^\<\>\:\?\[\]\@\/\#\b\s]*)?)?\@)?(?:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|((?:\[[0-9a-f]{1,4})+(?:\:[0-9a-f]{0,4}){2,7}\])|([^\<\>\:\?\[\]\@\/\#\b\s\.]{2,}(?:\.[^\<\>\:\?\[\]\@\/\#\b\s]*)*))?(?:\:(\d+))?((?:[^\?\[\]\#\s\b]*)+)?(?:\?([^\[\]\#\s\b]*))?(?:\#([^\#\s\b]*))?/i;

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
                fs = (await import('fs')).promises,
                path = (await import('path'));


            global.Location = (class extends URL {});

            global.document = global.document || {};

            global.document.location = new URL(process.env.PWD);
            /**
             * Global `fetch` polyfill - basic support
             */
            global.fetch = async (url, data) => {
                let
                    p = path.resolve(process.cwd(), "" + url),
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

            this.callback = ()=>{};


            if(typeof(window) !== "undefined"){
                window.addEventListener("load",()=>{
                    this.callback = () => this.update();
                    caller(this.callback);
                });
            }else{
                this.callback = () => this.update();
            }


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


            if(!this.SCHEDULE_PENDING){
                this.SCHEDULE_PENDING = true;
                caller(this.callback);
            }
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
                                {/*debugger*/};

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
        symbols = ["((","))",")(","||","^=","$=","*=","<=","...","<",">",">=","==","!=","===","!==","**","++","--","<<",">>",">>>","&&","+=","-=","%=","/=","**=","<<=",">>=",">>>=","&=","|=","=>","</"],

        /* Goto lookup maps */
        gt0 = [0,-1,1,-1,127,-1,128,-120,2,4,-18,5,6,9,8,7,10,11,12,118,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-2,119,123,-2,70,121,-7,35,95,-4,93,71,117,-7,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,3,126,-1,27,115,114],
    gt1 = [0,-148,129,-2,10,11,12,118,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-2,119,123,-2,70,121,-7,35,95,-4,93,71,117,-7,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt2 = [0,-148,9,8,133,10,11,12,118,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-2,119,123,-2,70,121,-7,35,95,-4,93,71,117,-7,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt3 = [0,-241,137],
    gt4 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-17,177,178,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt5 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-17,188,178,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt6 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-17,189,178,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt7 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-17,190,178,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt8 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-17,191,178,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt9 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-17,192,178,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt10 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-17,193,178,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt11 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-17,194,178,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt12 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-17,195,178,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt13 = [0,-225,197],
    gt14 = [0,-225,202],
    gt15 = [0,-189,70,186,-14,71,187,-11,203,204,65,66,91,-4,64,181,-7,180,-20,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt16 = [0,-282,207],
    gt17 = [0,-270,210,208],
    gt18 = [0,-272,220,218],
    gt19 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,229,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt20 = [0,-225,234],
    gt21 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-17,235,178,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt22 = [0,-175,237],
    gt23 = [0,-183,239,240,-73,242,244,245,-19,241,243,76,75,74],
    gt24 = [0,-152,249,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt25 = [0,-278,255,-2,256,76,75,74],
    gt26 = [0,-278,258,-2,256,76,75,74],
    gt27 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,260,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt28 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,262,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt29 = [0,-157,263],
    gt30 = [0,-290,265],
    gt31 = [0,-291,268,-5,267,-1,271,292],
    gt32 = [0,-207,297,298,-71,296,243,76,75,74],
    gt33 = [0,-280,302,243,76,75,74],
    gt34 = [0,-187,303,304,-69,306,244,245,-19,305,243,76,75,74],
    gt35 = [0,-5,308,-282,307,115,114],
    gt36 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,311,-2,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt37 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,312,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt38 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,313,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt39 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,314,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt40 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-7,315,39,40,41,42,43,44,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt41 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-8,316,40,41,42,43,44,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt42 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-9,317,41,42,43,44,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt43 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-10,318,42,43,44,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt44 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-11,319,43,44,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt45 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-12,320,44,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt46 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-12,321,44,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt47 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-12,322,44,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt48 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-12,323,44,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt49 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-13,324,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt50 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-13,325,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt51 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-13,326,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt52 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-13,327,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt53 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-13,328,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt54 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-13,329,45,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt55 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-14,330,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt56 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-14,331,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt57 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-14,332,46,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt58 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-15,333,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt59 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-15,334,47,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt60 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-16,335,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt61 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-16,336,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt62 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-16,337,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt63 = [0,-189,70,186,-13,93,71,187,-10,179,60,62,65,66,91,61,92,-2,64,181,-7,180,-16,338,48,49,57,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt64 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,341,340,344,343,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt65 = [0,-212,351,-16,347,348,353,357,358,349,-39,359,360,-3,350,-1,183,76,75,354],
    gt66 = [0,-282,76,75,362],
    gt67 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,363,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt68 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-1,365,64,181,-7,180,-3,366,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt69 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,368,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt70 = [0,-282,76,75,369],
    gt71 = [0,-225,370],
    gt72 = [0,-270,373],
    gt73 = [0,-272,375],
    gt74 = [0,-258,379,244,245,-19,378,243,76,75,74],
    gt75 = [0,-282,76,75,380],
    gt76 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,381,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt77 = [0,-189,70,186,-7,35,95,382,-3,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,-8,180,-3,383,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt78 = [0,-152,386,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-1,385,25,-3,26,16,-6,70,387,-7,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt79 = [0,-235,390],
    gt80 = [0,-235,392],
    gt81 = [0,-231,399,357,358,-27,394,395,-2,397,-1,398,-6,359,360,-4,400,243,76,75,354],
    gt82 = [0,-238,402,-19,409,244,245,-2,404,406,-1,407,408,403,-11,400,243,76,75,74],
    gt83 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,410,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt84 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,412,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt85 = [0,-162,418,-22,416,419,-2,70,186,-7,35,95,-4,93,71,187,-7,32,31,413,417,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt86 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,421,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt87 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,425,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt88 = [0,-178,427,428],
    gt89 = [0,-291,268,-5,267],
    gt90 = [0,-293,431,434,435],
    gt91 = [0,-293,439,434,435],
    gt92 = [0,-293,442,434,435],
    gt93 = [0,-293,443,434,435],
    gt94 = [0,-300,445],
    gt95 = [0,-293,446,434,435],
    gt96 = [0,-207,447,298],
    gt97 = [0,-209,449,451,452,453,-18,456,357,358,-40,359,360,-6,76,75,457],
    gt98 = [0,-189,70,186,-13,93,71,187,-10,458,60,62,65,66,91,61,92,-2,64,181,-7,180,-20,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt99 = [0,-192,459,461,460,463,-62,409,244,245,-5,464,408,462,-11,400,243,76,75,74],
    gt100 = [0,-235,468],
    gt101 = [0,-235,469],
    gt102 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-2,474,473,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt103 = [0,-238,476],
    gt104 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,478,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt105 = [0,-235,481],
    gt106 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,482,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt107 = [0,-231,485,357,358,-40,359,360,-6,76,75,457],
    gt108 = [0,-231,486,357,358,-40,359,360,-6,76,75,457],
    gt109 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,487,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt110 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,491,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt111 = [0,-148,9,8,499,10,11,12,118,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-2,119,123,-2,70,121,-6,498,35,95,-4,93,71,117,-7,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt112 = [0,-184,500,-73,242,244,245,-19,241,243,76,75,74],
    gt113 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,501,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt114 = [0,-280,505,243,76,75,74],
    gt115 = [0,-235,507],
    gt116 = [0,-258,409,244,245,-5,510,408,508,-11,400,243,76,75,74],
    gt117 = [0,-258,515,244,245,-19,514,243,76,75,74],
    gt118 = [0,-235,516],
    gt119 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,521,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt120 = [0,-163,524,-19,523,240,-73,526,244,245,-19,525,243,76,75,74],
    gt121 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,527,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt122 = [0,-163,533,-23,303,304,-69,535,244,245,-19,534,243,76,75,74],
    gt123 = [0,-162,538,-23,539,-2,70,186,-13,93,71,187,-10,536,60,62,65,66,91,61,92,-2,64,181,-7,180,-20,182,-11,69,-4,81,82,80,79,-1,68,-1,183,76,75,74],
    gt124 = [0,-179,542],
    gt125 = [0,-157,544],
    gt126 = [0,-294,547,435],
    gt127 = [0,-10,553,555,554,-276,551,549,-1,548,-5,550,552,292],
    gt128 = [0,-209,569,451,452,453,-18,456,357,358,-40,359,360,-6,76,75,457],
    gt129 = [0,-211,572,453,-18,456,357,358,-40,359,360,-6,76,75,457],
    gt130 = [0,-212,573,-18,456,357,358,-40,359,360,-6,76,75,457],
    gt131 = [0,-192,576,461,460,463,-62,409,244,245,-5,464,408,462,-11,400,243,76,75,74],
    gt132 = [0,-188,577,-69,306,244,245,-19,305,243,76,75,74],
    gt133 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,578,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt134 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-1,582,581,580,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt135 = [0,-212,351,-17,584,353,357,358,349,-39,359,360,-3,350,-1,183,76,75,354],
    gt136 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,585,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt137 = [0,-191,586,587,461,460,463,-62,409,244,245,-5,464,408,462,-11,400,243,76,75,74],
    gt138 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,592,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt139 = [0,-258,595,244,245,-19,594,243,76,75,74],
    gt140 = [0,-231,399,357,358,-27,597,-3,599,-1,398,-6,359,360,-4,400,243,76,75,354],
    gt141 = [0,-258,409,244,245,-5,600,408,-12,400,243,76,75,74],
    gt142 = [0,-238,603,-19,409,244,245,-3,605,-1,407,408,604,-11,400,243,76,75,74],
    gt143 = [0,-152,606,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt144 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,607,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt145 = [0,-152,608,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt146 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,609,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt147 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,612,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt148 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,618,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt149 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,620,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt150 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,621,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt151 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,622,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt152 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,623,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt153 = [0,-163,625,-94,627,244,245,-19,626,243,76,75,74],
    gt154 = [0,-163,533,-94,627,244,245,-19,626,243,76,75,74],
    gt155 = [0,-170,629],
    gt156 = [0,-152,631,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt157 = [0,-180,632,-77,634,244,245,-19,633,243,76,75,74],
    gt158 = [0,-10,553,555,554,-276,551,549,-1,635,-5,550,552,292],
    gt159 = [0,-10,553,555,554,-277,639,-7,638,552,292],
    gt160 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,640,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt161 = [0,-10,644,555,554,-283,641,-4,642],
    gt162 = [0,-291,651],
    gt163 = [0,-13,652,654,658,655,653,661,659,-2,660,-5,656,-1,667,-5,668,-13,666,-44,663,-4,664],
    gt164 = [0,-126,669,4,-18,5,6,9,8,7,10,11,12,118,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-2,119,123,-2,70,121,-7,35,95,-4,93,71,117,-7,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt165 = [0,-194,673,674,-62,409,244,245,-5,464,408,462,-11,400,243,76,75,74],
    gt166 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,676,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt167 = [0,-195,680,-17,679,-44,409,244,245,-5,464,408,-12,400,243,76,75,74],
    gt168 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,681,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt169 = [0,-258,409,244,245,-5,510,408,686,-11,400,243,76,75,74],
    gt170 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,691,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt171 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,693,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt172 = [0,-152,695,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt173 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,696,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt174 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,698,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt175 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,699,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt176 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,700,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt177 = [0,-152,703,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt178 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,708,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt179 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,710,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt180 = [0,-171,712,714,713],
    gt181 = [0,-297,719],
    gt182 = [0,-10,722,555,554,-289,725,724,723,726],
    gt183 = [0,-302,725,724,734,726],
    gt184 = [0,-291,735],
    gt185 = [0,-15,658,738,-1,661,659,-2,660,-5,739,-1,667,-5,668,-13,666,-44,663,-4,664],
    gt186 = [0,-15,740,-2,661,659,-2,660,-5,741,-1,667,-5,668,-13,666,-44,663,-4,664],
    gt187 = [0,-22,751,-5,741,-1,667,-5,668,-13,666,-65,752,750,-2,749,-1,753],
    gt188 = [0,-93,756,755,-5,758,757],
    gt189 = [0,-96,764,-1,782,765,-2,763,771,768,767,773,774,775,-1,776,-3,777,783],
    gt190 = [0,-148,9,8,499,10,11,12,118,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-2,119,123,-2,70,121,-5,788,789,35,95,-4,93,71,117,-7,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt191 = [0,-152,795,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt192 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,797,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt193 = [0,-152,800,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt194 = [0,-152,802,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt195 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,804,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt196 = [0,-152,809,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt197 = [0,-152,810,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt198 = [0,-152,811,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt199 = [0,-152,812,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt200 = [0,-152,813,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt201 = [0,-152,814,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt202 = [0,-189,70,186,-7,35,95,-4,93,71,187,-10,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,816,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt203 = [0,-172,820,818],
    gt204 = [0,-171,821,714],
    gt205 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,823,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt206 = [0,-157,825],
    gt207 = [0,-297,826],
    gt208 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,828,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt209 = [0,-302,831,-2,726],
    gt210 = [0,-49,836,-1,839,-1,837,841,838,843,-2,844,-2,842,847,845,-1,848,-4,849,-11,840],
    gt211 = [0,-31,853,-60,855],
    gt212 = [0,-41,858,861,860,862,867,865,-1,864,-22,863,-50,868],
    gt213 = [0,-22,751,-5,741,-1,667,-5,668,-13,666,-65,752,750,-2,871,-1,753],
    gt214 = [0,-95,872,-4,664],
    gt215 = [0,-22,875,-5,741,-1,667,-5,668,-13,666,-67,877,876,-2,878],
    gt216 = [0,-93,881,-6,758,757],
    gt217 = [0,-100,882],
    gt218 = [0,-96,883,-1,782,884,-6,773,774,775,-1,776,-3,777,783],
    gt219 = [0,-98,782,886,-6,888,774,775,-1,776,-3,777,783],
    gt220 = [0,-98,890,-16,783],
    gt221 = [0,-103,771,898,897],
    gt222 = [0,-114,901],
    gt223 = [0,-97,903,-16,904],
    gt224 = [0,-148,9,8,499,10,11,12,118,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-2,119,123,-2,70,121,-5,907,789,35,95,-4,93,71,117,-7,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt225 = [0,-148,9,8,499,10,11,12,118,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-2,119,123,-2,70,121,-5,908,789,35,95,-4,93,71,117,-7,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt226 = [0,-148,9,8,499,10,11,12,118,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-2,119,123,-2,70,121,-5,909,789,35,95,-4,93,71,117,-7,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt227 = [0,-152,912,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt228 = [0,-152,913,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt229 = [0,-152,914,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt230 = [0,-189,70,186,-7,35,95,-4,93,71,187,-7,32,31,915,36,60,62,65,66,91,61,92,-2,64,181,-7,180,-3,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,-1,68,96,231,76,75,74],
    gt231 = [0,-152,918,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt232 = [0,-152,919,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt233 = [0,-152,920,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt234 = [0,-152,921,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt235 = [0,-152,922,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt236 = [0,-152,924,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt237 = [0,-172,925],
    gt238 = [0,-172,820],
    gt239 = [0,-148,9,8,929,10,11,12,118,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-2,119,123,-2,70,121,-7,35,95,-4,93,71,117,-7,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt240 = [0,-83,935],
    gt241 = [0,-52,937],
    gt242 = [0,-57,941,939,-1,943,940],
    gt243 = [0,-54,841,946,843,-2,844,-2,842,847,945,-1,848,-4,849],
    gt244 = [0,-65,949,-6,951,-6,953,955,952,954,-1,958,-2,957],
    gt245 = [0,-91,961],
    gt246 = [0,-91,963],
    gt247 = [0,-41,966,861,965,862,867,865,-1,864,-22,863,-50,868],
    gt248 = [0,-37,969,967,971,968],
    gt249 = [0,-47,973,-47,974,-4,664],
    gt250 = [0,-116,980,-5,753],
    gt251 = [0,-123,984,982,981],
    gt252 = [0,-98,782,987,-6,888,774,775,-1,776,-3,777,783],
    gt253 = [0,-111,992],
    gt254 = [0,-113,998],
    gt255 = [0,-114,1000],
    gt256 = [0,-148,9,8,499,10,11,12,118,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-2,119,123,-2,70,121,-5,1005,789,35,95,-4,93,71,117,-7,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt257 = [0,-152,1006,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt258 = [0,-152,1008,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt259 = [0,-152,1009,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt260 = [0,-152,1010,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt261 = [0,-148,9,8,1012,10,11,12,118,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-2,119,123,-2,70,121,-7,35,95,-4,93,71,117,-7,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt262 = [0,-18,661,1016,1015,1014,-73,663,-4,664],
    gt263 = [0,-51,839,-1,1017,841,838,843,-2,844,-2,842,847,845,-1,848,-4,849,-11,840],
    gt264 = [0,-52,1018],
    gt265 = [0,-54,1019,946,843,-2,844,-2,842,847,845,-1,848,-4,849],
    gt266 = [0,-57,1020],
    gt267 = [0,-60,1021],
    gt268 = [0,-54,841,946,843,-2,844,-2,842,847,1022,-1,848,-4,849],
    gt269 = [0,-54,841,946,843,-2,844,-2,842,847,1023,-1,848,-4,849],
    gt270 = [0,-69,1027,1025],
    gt271 = [0,-73,1031],
    gt272 = [0,-74,1036,1037,-1,1038],
    gt273 = [0,-86,1043],
    gt274 = [0,-67,1050,1048],
    gt275 = [0,-29,1053,-2,1055,-1,1054,1056,-49,1059],
    gt276 = [0,-18,661,1016,1015,1064,-73,663,-4,664],
    gt277 = [0,-37,1065],
    gt278 = [0,-39,1066],
    gt279 = [0,-41,966,861,1067,862,867,865,-1,864,-22,863,-50,868],
    gt280 = [0,-41,966,861,1068,862,867,865,-1,864,-22,863,-50,868],
    gt281 = [0,-118,1070,-3,878],
    gt282 = [0,-121,1071,-1,984,982,1072],
    gt283 = [0,-123,1074],
    gt284 = [0,-123,984,982,1075],
    gt285 = [0,-109,1077],
    gt286 = [0,-95,1081,-4,664],
    gt287 = [0,-152,1084,-2,19,13,28,17,14,18,101,-2,20,21,22,24,23,102,-4,15,-2,25,-3,26,16,-6,70,-8,35,95,-4,93,71,-8,32,31,30,36,60,62,65,66,91,61,92,-2,64,-12,33,-1,34,37,38,39,40,41,42,43,44,45,46,47,48,49,57,72,-11,69,-4,81,82,80,79,97,68,96,73,76,75,74,-3,130,115,114],
    gt288 = [0,-18,661,1086,-75,663,-4,664],
    gt289 = [0,-69,1088],
    gt290 = [0,-80,1089,-1,1090,-1,958,-2,957],
    gt291 = [0,-80,1092,-1,1090,-1,958,-2,957],
    gt292 = [0,-82,1094],
    gt293 = [0,-67,1100],
    gt294 = [0,-32,1055,-1,1102,1056,-49,1059],
    gt295 = [0,-123,984,982,1072],
    gt296 = [0,-112,1109],
    gt297 = [0,-76,1114],
    gt298 = [0,-78,1116],
    gt299 = [0,-22,751,-5,741,-1,667,-5,668,-13,666,-65,752,750,-2,1119,-1,753],
    gt300 = [0,-35,1120,-49,1059],
    gt301 = [0,-80,1122,-1,1090,-1,958,-2,957],
    gt302 = [0,-80,1124,-1,1090,-1,958,-2,957],
    gt303 = [0,-22,875,-5,741,-1,667,-2,1125,-2,668,-13,666,-67,877,876,-2,878],

        // State action lookup maps
        sm0=[0,1,2,3,-1,0,-4,0,-4,4,5,-12,6,-3,7,-26,8,9,-19,10,11,12,-1,13,-1,14,15,16,17,-1,18,19,20,21,22,23,24,-1,25,-2,26,27,-5,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm1=[0,44,-3,0,-4,0],
    sm2=[0,45,-3,0,-4,0],
    sm3=[0,46,-3,0,-4,0,-5,46],
    sm4=[0,47,-3,0,-4,0,-5,47],
    sm5=[0,48,-3,0,-4,0,-5,48],
    sm6=[0,49,-3,0,-4,0,-5,49],
    sm7=[0,50,2,3,-1,0,-4,0,-4,4,51,-12,6,50,-2,7,-26,8,9,-18,50,10,11,12,-1,13,-1,14,15,16,17,-1,18,19,20,21,22,23,24,50,25,-2,26,27,-5,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm8=[0,52,52,52,-1,0,-4,0,-4,52,52,-12,52,52,-2,52,-26,52,52,-6,52,-11,52,52,52,52,-1,52,-1,52,52,52,52,-1,52,52,52,52,52,52,52,52,52,-2,52,52,-5,52,52,-2,52,-23,52,-1,52,52,52,52,52,52,-4,52,52,52,52,52,52],
    sm9=[0,53,53,53,-1,0,-4,0,-4,53,53,-12,53,53,-2,53,-26,53,53,-6,53,-11,53,53,53,53,-1,53,-1,53,53,53,53,-1,53,53,53,53,53,53,53,53,53,-2,53,53,-5,53,53,-2,53,-23,53,-1,53,53,53,53,53,53,-4,53,53,53,53,53,53],
    sm10=[0,54,54,54,-1,0,-4,0,-4,54,54,-12,54,54,-2,54,-26,54,54,-6,54,-11,54,54,54,54,-1,54,-1,54,54,54,54,-1,54,54,54,54,54,54,54,54,54,-2,54,54,-5,54,54,-2,54,-23,54,-1,54,54,54,54,54,54,-4,54,54,54,54,54,54],
    sm11=[0,55,55,55,-1,0,-4,0,-4,55,55,-12,55,55,-2,55,-26,55,55,-6,55,-11,55,55,55,55,-1,55,55,55,55,55,55,-1,55,55,55,55,55,55,55,55,55,-2,55,55,-5,55,55,-2,55,-23,55,-1,55,55,55,55,55,55,-4,55,55,55,55,55,55],
    sm12=[0,56,-3,0,-4,0,-4,57],
    sm13=[0,58,58,58,-1,0,-4,0,-4,58,58,-12,58,58,-2,58,-26,58,58,-6,58,-11,58,58,58,58,-1,58,58,58,58,58,58,-1,58,58,58,58,58,58,58,58,58,-2,58,58,-5,58,58,-2,58,-23,58,-1,58,58,58,58,58,58,-4,58,58,58,58,58,58],
    sm14=[0,-1,2,3,-1,0,-4,0,-4,4,51,-12,6,-3,7,-26,8,9,-19,10,11,12,-1,13,-1,14,15,16,17,-1,18,19,20,21,22,23,24,-1,25,-2,26,27,-5,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm15=[0,-4,0,-4,0,-4,59],
    sm16=[0,-4,0,-4,0,-4,60,-10,60,60,61,-5,60,-34,60,-7,60],
    sm17=[0,-4,0,-4,0,-4,62,-10,62,62,62,-5,62,-34,62,-7,62],
    sm18=[0,-4,0,-4,0,-4,63,-10,63,63,63,-5,63,-34,63,-7,63],
    sm19=[0,-4,0,-4,0,-4,64,-10,64,64,64,-1,64,-3,64,-34,64,-7,64],
    sm20=[0,-4,0,-4,0,-4,65,65,-1,65,65,-6,65,65,65,-1,65,-3,65,-14,65,66,-1,65,-1,65,-5,65,-1,65,65,65,-4,65,67,-1,68,-4,65,-37,69,70,71,72,73,74,75,76,77,78,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,-4,79,80],
    sm21=[0,-4,0,-4,0,-4,81,-10,81,81,81,-1,81,-3,81,-27,82,-6,81,-7,81,-47,83],
    sm22=[0,-4,0,-4,0,-4,84,-10,84,84,84,-1,84,-3,84,-27,84,-6,84,-7,84,-47,84,85],
    sm23=[0,-4,0,-4,0,-4,86,-10,86,86,86,-1,86,-3,86,-27,86,-1,87,-4,86,-7,86,-47,86,86],
    sm24=[0,-4,0,-4,0,-4,88,-10,88,88,88,-1,88,-3,88,-27,88,-1,88,-4,88,-7,88,-47,88,88,89],
    sm25=[0,-4,0,-4,0,-4,90,-10,90,90,90,-1,90,-3,90,-27,90,-1,90,-4,90,-7,90,-47,90,90,90,91],
    sm26=[0,-4,0,-4,0,-4,92,-10,92,92,92,-1,92,-3,92,-27,92,-1,92,-4,92,-7,92,-47,92,92,92,92,93,94,95,96],
    sm27=[0,-4,0,-4,0,-4,97,98,-2,99,-6,97,97,97,-1,97,-3,97,-14,100,-4,101,-7,97,-1,97,-4,97,-7,97,-47,97,97,97,97,97,97,97,97,102,103],
    sm28=[0,-4,0,-4,0,-4,104,104,-2,104,-6,104,104,104,-1,104,-3,104,-14,104,-4,104,-7,104,-1,104,-4,104,-7,104,-47,104,104,104,104,104,104,104,104,104,104,105,106,107],
    sm29=[0,-4,0,-4,0,-4,108,108,-2,108,-6,108,108,108,-1,108,-3,108,-14,108,-4,108,-5,109,-1,108,-1,108,-4,108,-7,108,-47,108,108,108,108,108,108,108,108,108,108,108,108,108,110],
    sm30=[0,-4,0,-4,0,-4,111,111,-1,112,111,-6,111,111,111,-1,111,-3,111,-14,111,-2,113,-1,111,-5,111,-1,111,114,111,-4,111,-7,111,-47,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
    sm31=[0,-4,0,-4,0,-4,115,115,-1,115,115,-6,115,115,115,-1,115,-3,115,-14,115,-2,115,-1,115,-5,115,-1,115,115,115,-4,115,-7,115,-47,115,115,115,115,115,115,115,115,115,115,115,115,115,115],
    sm32=[0,-4,0,-4,0,-4,116,116,-1,116,116,-6,116,116,116,-1,116,-3,116,-14,116,-2,116,-1,116,-5,116,-1,116,116,116,-4,116,-7,116,-47,116,116,116,116,116,116,116,116,116,116,116,116,116,116],
    sm33=[0,-4,0,-4,0,-4,117,117,-1,117,117,-6,117,117,117,-1,117,-3,117,-14,117,-2,117,-1,117,-5,117,-1,117,117,117,-4,117,-7,117,-47,117,117,117,117,117,117,117,117,117,117,117,117,117,117,118],
    sm34=[0,-1,2,3,-1,0,-4,0,-18,119,-3,7,-26,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm35=[0,-4,0,-4,0,-4,117,117,-1,117,117,-6,117,117,117,-1,117,-3,117,-14,117,-2,117,-1,117,-5,117,-1,117,117,117,-4,117,-7,117,-47,117,117,117,117,117,117,117,117,117,117,117,117,117,117,117],
    sm36=[0,-4,0,-4,0,-4,121,121,-1,121,121,-6,121,121,121,121,121,-3,121,-14,121,121,-1,121,-1,121,-5,121,-1,121,121,121,-4,121,121,-1,121,-4,121,-13,121,-23,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,-4,121,121],
    sm37=[0,-4,0,-4,0,-4,121,121,-1,121,121,-6,121,121,121,121,121,-2,122,121,-14,121,121,-1,121,-1,121,-5,121,-1,121,121,121,-1,123,-1,124,121,121,-1,121,-4,121,-13,121,-23,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,121,-4,121,121],
    sm38=[0,-4,0,-4,0,-4,125,125,-1,125,125,-6,125,125,125,125,125,-2,122,125,-14,125,125,-1,125,-1,125,-5,125,-1,125,125,125,-1,126,-1,127,125,125,-1,125,-4,125,-13,125,-23,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,-4,125,125],
    sm39=[0,-1,2,3,-1,0,-4,0,-18,119,-3,7,-32,128,-1,120,-12,10,11,-27,28,129,-2,30,-35,38,39,40,41,42,43],
    sm40=[0,-4,0,-4,0,-4,130,130,-1,130,130,-6,130,130,130,130,130,-2,130,130,-14,130,130,-1,130,-1,130,-5,130,-1,130,130,130,-1,130,-1,130,130,130,-1,130,-4,130,-13,130,-23,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,130,-4,130,130],
    sm41=[0,-4,0,-4,0,-4,131,131,-1,131,131,-6,131,131,131,131,131,-2,131,131,-14,131,131,-1,131,-1,131,-5,131,-1,131,131,131,-1,131,-1,131,131,131,-1,131,-4,131,-13,131,-23,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,-4,131,131],
    sm42=[0,-4,0,-4,0,-4,132,132,-1,132,132,-6,132,132,132,132,132,-2,132,132,-14,132,132,-1,132,-1,132,-5,132,-1,132,132,132,-1,132,-1,132,132,132,-1,132,-4,132,-13,132,-23,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,-4,132,132],
    sm43=[0,-4,0,-4,0,-4,132,132,-1,132,132,-6,132,132,132,-1,132,-2,132,132,-14,132,132,-1,132,-1,132,-5,132,-1,132,132,132,-1,132,-1,132,132,132,-1,132,-4,132,-13,132,-13,133,-9,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,-4,132,132],
    sm44=[0,-4,0,-4,0,-4,134,134,-1,134,134,-8,134,-4,134,-15,134,134,-1,134,-1,134,-5,134,-1,134,134,134,-1,134,-1,134,-1,134,-1,134,-4,135,-27,136,-9,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,-4,134,134],
    sm45=[0,-4,0,-4,0,-4,137,137,-1,137,137,-6,137,137,137,137,137,-2,137,137,-14,137,137,-1,137,-1,137,-5,137,-1,137,137,137,-1,137,-1,137,137,137,-1,137,-4,137,-13,137,-13,137,137,-8,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,-4,137,137],
    sm46=[0,-2,3,-1,0,-4,0,-4,138,138,-1,138,138,-6,138,138,138,138,138,-2,138,138,-14,138,138,-1,138,-1,138,-5,138,-1,138,138,138,-1,138,-1,138,138,138,-1,138,-4,138,-13,138,-13,138,138,-8,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,-4,138,138,-9,43],
    sm47=[0,-2,139,-1,0,-4,0,-4,139,139,-1,139,139,-6,139,139,139,139,139,-2,139,139,-14,139,139,-1,139,-1,139,-5,139,-1,139,139,139,-1,139,-1,139,139,139,-1,139,-4,139,-13,139,-13,139,139,-8,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,139,-4,139,139,-9,139],
    sm48=[0,-2,140,-1,0,-4,0,-4,140,140,-1,140,140,-6,140,140,140,140,140,-2,140,140,-14,140,140,-1,140,-1,140,-5,140,-1,140,140,140,-1,140,-1,140,140,140,-1,140,-4,140,-13,140,-13,140,140,-8,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,-4,140,140,-9,140],
    sm49=[0,-4,0,-4,0,-4,141,141,-1,141,141,-6,141,141,141,141,141,-2,141,141,-14,141,141,-1,141,-1,141,-5,141,-1,141,141,141,-1,141,-1,141,141,141,-1,141,-4,141,-13,141,-23,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,-4,141,141],
    sm50=[0,-4,0,-4,0,-4,142,142,-1,142,142,-6,142,142,142,142,142,-2,142,142,-14,142,142,-1,142,-1,142,-5,142,-1,142,142,142,-1,142,-1,142,142,142,-1,142,-4,142,-13,142,-23,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,-4,142,142],
    sm51=[0,-4,0,-4,0,-4,143,143,-1,143,143,-6,143,143,143,143,143,-2,143,143,-14,143,143,-1,143,-1,143,-5,143,-1,143,143,143,-1,143,-1,143,143,143,-1,143,-4,143,-13,143,-23,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,-4,143,143],
    sm52=[0,-1,144,145,-1,146,147,148,149,150,0,-139,151],
    sm53=[0,-1,152,153,-1,154,155,156,157,158,0,-140,159],
    sm54=[0,-4,0,-4,0,-4,160,160,-1,160,160,-6,160,160,160,160,160,-2,160,160,-14,160,160,-1,160,-1,160,-5,160,-1,160,160,160,-1,160,-1,160,160,160,-1,160,-4,160,-13,160,-23,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,-4,160,160],
    sm55=[0,-1,2,3,-1,0,-4,0,-18,119,-3,7,161,-25,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-1,162,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm56=[0,-4,0,-4,0,-22,122,-32,163,-1,164],
    sm57=[0,-4,0,-4,0,-4,165,165,-1,165,165,-6,165,165,165,165,165,-2,165,165,-14,165,165,-1,165,-1,165,-5,165,-1,165,165,165,-1,165,-1,165,165,165,-1,165,-4,165,-13,165,-23,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,-4,165,165],
    sm58=[0,-4,0,-4,0,-4,166,166,-1,166,166,-6,166,166,166,166,166,-2,166,166,-14,166,166,-1,166,-1,166,-5,166,-1,166,166,166,-1,166,-1,166,166,166,-1,166,-4,166,-13,166,-23,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,-4,166,166],
    sm59=[0,-4,0,-4,0,-94,167],
    sm60=[0,-4,0,-4,0,-94,133],
    sm61=[0,-4,0,-4,0,-66,168],
    sm62=[0,-2,3,-1,0,-4,0,-18,169,-38,170,-86,43],
    sm63=[0,171,171,171,-1,0,-4,0,-4,171,171,-12,171,171,-2,171,-26,171,171,-6,171,-11,171,171,171,171,-1,171,171,171,171,171,171,-1,171,171,171,171,171,171,171,171,171,-2,171,171,-5,171,171,-2,171,-23,171,-1,171,171,171,171,171,171,-4,171,171,171,171,171,171],
    sm64=[0,-4,0,-4,0,-22,172],
    sm65=[0,173,173,173,-1,0,-4,0,-4,173,173,-12,173,173,-2,173,-26,173,173,-6,173,-11,173,173,173,173,-1,173,173,173,173,173,173,-1,173,173,173,173,173,173,173,173,173,-2,173,173,-5,173,173,-2,173,-23,173,-1,173,173,173,173,173,173,-4,173,173,173,173,173,173],
    sm66=[0,-1,2,3,-1,0,-4,0,-4,4,51,-12,6,-3,7,-26,8,9,-23,13,-1,14,15,16,17,-1,18,19,20,21,22,23,24,-1,25,-2,26,-6,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm67=[0,-4,0,-4,0,-22,174],
    sm68=[0,-4,0,-4,0,-22,175,-58,176],
    sm69=[0,-4,0,-4,0,-22,177],
    sm70=[0,-2,3,-1,0,-4,0,-4,178,-139,43],
    sm71=[0,-2,3,-1,0,-4,0,-4,179,-139,43],
    sm72=[0,-1,2,3,-1,0,-4,0,-4,180,-13,119,-3,7,-26,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm73=[0,-4,0,-4,0,-22,181],
    sm74=[0,-4,0,-4,0,-18,6],
    sm75=[0,-4,0,-4,0,-4,182],
    sm76=[0,183,-3,0,-4,0,-4,183],
    sm77=[0,-4,0,-4,0,-5,184],
    sm78=[0,-2,185,-1,186,-4,187,-3,188,-2,189,-3,190,191,192,193,-132,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209],
    sm79=[0,210,210,210,-1,0,-4,0,-4,210,210,-12,210,210,-2,210,-26,210,210,-6,210,-11,210,210,210,210,-1,210,-1,210,210,210,210,-1,210,210,210,210,210,210,210,210,210,-2,210,210,-5,210,210,-2,210,-23,210,-1,210,210,210,210,210,210,-4,210,210,210,210,210,210],
    sm80=[0,-2,3,-1,0,-4,0,-18,211,-76,212,-48,43],
    sm81=[0,213,213,213,-1,0,-4,0,-4,213,213,-12,213,213,-2,213,-26,213,213,-6,213,-11,213,213,213,213,-1,213,-1,213,213,213,213,-1,213,213,213,213,213,213,213,213,213,-2,213,213,-5,213,213,-2,213,-23,213,-1,213,213,213,213,213,213,-4,213,213,213,213,213,213],
    sm82=[0,-2,3,-1,0,-4,0,-22,214,-121,43],
    sm83=[0,-2,215,-1,0,-4,0,-18,215,-38,215,-86,215],
    sm84=[0,-2,216,-1,0,-4,0,-18,216,-38,216,-86,216],
    sm85=[0,217,-3,0,-4,0],
    sm86=[0,-4,0,-4,0,-5,5],
    sm87=[0,-4,0,-4,0,-5,218],
    sm88=[0,219,219,219,-1,0,-4,0,-4,219,219,-12,219,219,-2,219,-26,219,219,-6,219,-11,219,219,219,219,-1,219,-1,219,219,219,219,-1,219,219,219,219,219,219,219,219,219,-2,219,219,-5,219,219,-2,219,-23,219,-1,219,219,219,219,219,219,-4,219,219,219,219,219,219],
    sm89=[0,-4,0,-4,0,-4,57],
    sm90=[0,-2,185,-1,186,-4,187,-3,188,-2,220,-3,190,191,192,193,-132,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209],
    sm91=[0,221,221,221,-1,0,-4,0,-4,221,221,-12,221,221,-2,221,-26,221,221,-6,221,-11,221,221,221,221,-1,221,221,221,221,221,221,-1,221,221,221,221,221,221,221,221,221,-2,221,221,-5,221,221,-2,221,-23,221,-1,221,221,221,221,221,221,-4,221,221,221,221,221,221],
    sm92=[0,-4,0,-4,0,-19,222],
    sm93=[0,223,223,223,-1,0,-4,0,-4,223,223,-12,223,223,-2,223,-26,223,223,-6,223,-11,223,223,223,223,-1,223,223,223,223,223,223,-1,223,223,223,223,223,223,223,223,223,-2,223,223,-5,223,223,-2,223,-23,223,-1,223,223,223,223,223,223,-4,223,223,223,223,223,223],
    sm94=[0,-4,0,-4,0,-4,224,224,-1,224,224,-6,224,224,224,-1,224,-3,224,-14,224,-2,224,-1,224,-5,224,-1,224,224,224,-4,224,-7,224,-47,224,224,224,224,224,224,224,224,224,224,224,224,224,224,224],
    sm95=[0,-4,0,-4,0,-4,225,225,-1,225,225,-6,225,225,225,-1,225,-3,225,-14,225,-2,225,-1,225,-5,225,-1,225,225,225,-4,225,-7,225,-47,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225],
    sm96=[0,-1,226,226,-1,0,-4,0,-18,226,-3,226,-26,226,226,-6,226,-12,226,226,-9,226,-17,226,226,-2,226,-23,226,-1,226,226,226,226,226,226,-4,226,226,226,226,226,226],
    sm97=[0,-4,0,-4,0,-4,227,227,-1,227,227,-6,227,227,227,-1,227,-3,227,-14,227,-2,227,-1,227,-5,227,-1,227,227,227,-4,227,-7,227,-47,227,227,227,227,227,227,227,227,227,227,227,227,227,227,227],
    sm98=[0,-4,0,-4,0,-4,65,65,-1,65,65,-6,65,65,65,-1,65,-3,65,-14,65,-2,65,-1,65,-5,65,-1,65,65,65,-4,65,-7,65,-47,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,-4,79,80],
    sm99=[0,-4,0,-4,0,-4,228,228,-1,228,228,-6,228,228,228,228,228,-2,228,228,-14,228,228,-1,228,-1,228,-5,228,-1,228,228,228,-1,228,-1,228,228,228,-1,228,-4,228,-13,228,-23,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,-4,228,228],
    sm100=[0,-4,0,-4,0,-4,229,229,-1,229,229,-6,229,229,229,229,229,-2,229,229,-14,229,229,-1,229,-1,229,-5,229,-1,229,229,229,-1,229,-1,229,229,229,-1,229,-4,229,-13,229,-23,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,-4,229,229],
    sm101=[0,-4,0,-4,0,-4,134,134,-1,134,134,-6,134,134,134,134,134,-2,134,134,-14,134,134,-1,134,-1,134,-5,134,-1,134,134,134,-1,134,-1,134,134,134,-1,134,-4,134,-13,134,-23,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,-4,134,134],
    sm102=[0,-1,2,3,-1,0,-4,0,-17,230,119,-3,7,-26,8,9,-6,120,231,-11,10,11,-9,18,-17,28,29,-1,232,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm103=[0,-1,2,3,-1,0,-4,0,-19,233,-37,234,-39,235,236,-3,237,-36,38,39,-3,43],
    sm104=[0,-4,0,-4,0,-4,238,238,-1,238,238,-6,238,238,238,238,238,-2,238,238,-14,238,238,-1,238,-1,238,-5,238,-1,238,238,238,-1,238,-1,238,238,238,-1,238,-4,238,-13,238,-23,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,238,-4,238,238],
    sm105=[0,-4,0,-4,0,-4,239,239,-1,239,239,-6,239,239,239,239,239,-2,239,239,-14,239,239,-1,239,-1,239,-5,239,-1,239,239,239,-1,239,-1,239,239,239,-1,239,-4,239,-13,239,-23,239,239,239,239,239,239,239,239,239,239,239,239,239,239,239,239,239,239,239,239,239,239,239,239,239,-4,239,239],
    sm106=[0,-4,0,-4,0,-4,240,240,-1,240,240,-6,240,240,240,-1,240,-3,240,-14,240,-2,240,-1,240,-5,240,-1,240,240,240,-4,240,-7,240,-47,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240],
    sm107=[0,-4,0,-4,0,-4,241,241,-1,241,241,-6,241,241,241,-1,241,-3,241,-14,241,-2,241,-1,241,-5,241,-1,241,241,241,-4,241,-7,241,-47,241,241,241,241,241,241,241,241,241,241,241,241,241,241,241],
    sm108=[0,-4,0,-4,0,-4,242,242,-1,242,242,-6,242,242,242,-1,242,-3,242,-14,242,-2,242,-1,242,-5,242,-1,242,242,242,-4,242,-7,242,-47,242,242,242,242,242,242,242,242,242,242,242,242,242,242,242],
    sm109=[0,-4,0,-4,0,-4,243,243,-1,243,243,-6,243,243,243,-1,243,-3,243,-14,243,-2,243,-1,243,-5,243,-1,243,243,243,-4,243,-7,243,-47,243,243,243,243,243,243,243,243,243,243,243,243,243,243,243],
    sm110=[0,-4,0,-4,0,-4,244,244,-1,244,244,-6,244,244,244,-1,244,-3,244,-14,244,-2,244,-1,244,-5,244,-1,244,244,244,-4,244,-7,244,-47,244,244,244,244,244,244,244,244,244,244,244,244,244,244,244],
    sm111=[0,-4,0,-4,0,-4,245,245,-1,245,245,-6,245,245,245,-1,245,-3,245,-14,245,-2,245,-1,245,-5,245,-1,245,245,245,-4,245,-7,245,-47,245,245,245,245,245,245,245,245,245,245,245,245,245,245,245],
    sm112=[0,-4,0,-4,0,-4,246,246,-1,246,246,-6,246,246,246,-1,246,-3,246,-14,246,-2,246,-1,246,-5,246,-1,246,246,246,-4,246,-7,246,-47,246,246,246,246,246,246,246,246,246,246,246,246,246,246,246],
    sm113=[0,-4,0,-4,0,-4,247,247,-1,247,247,-6,247,247,247,-1,247,-3,247,-14,247,-2,247,-1,247,-5,247,-1,247,247,247,-4,247,-7,247,-47,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247],
    sm114=[0,-2,3,-1,0,-4,0,-144,43],
    sm115=[0,-4,0,-4,0,-4,248,248,-1,248,248,-6,248,248,248,248,248,-2,248,248,-14,248,248,-1,248,-1,248,-5,248,-1,248,248,248,-1,248,-1,248,248,248,-1,248,-4,248,-13,248,-23,248,248,248,248,248,248,248,248,248,248,248,248,248,248,248,248,248,248,248,248,248,248,248,248,248,-4,248,248],
    sm116=[0,-1,2,3,-1,0,-4,0,-18,119,-3,7,249,-25,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-1,250,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm117=[0,-4,0,-4,0,-4,251,251,-1,251,251,-6,251,251,251,251,251,-2,251,251,-14,251,251,-1,251,-1,251,-5,251,-1,251,251,251,-1,251,-1,251,251,251,-1,251,-4,251,-13,251,-23,251,251,251,251,251,251,251,251,251,251,251,251,251,251,251,251,251,251,251,251,251,251,251,251,251,-4,251,251],
    sm118=[0,-4,0,-4,0,-4,252,252,-1,252,252,-6,252,252,252,252,252,-3,252,-14,252,252,-1,252,-1,252,-5,252,-1,252,252,252,-4,252,252,-1,252,-4,252,-13,252,-23,252,252,252,252,252,252,252,252,252,252,252,252,252,252,252,252,252,252,252,252,252,252,252,252,252,-4,252,252],
    sm119=[0,-4,0,-4,0,-101,253],
    sm120=[0,-4,0,-4,0,-55,163,-1,164],
    sm121=[0,-2,254,-1,0,-4,0,-4,254,254,-1,254,254,-6,254,254,254,254,254,-2,254,254,-14,254,254,-1,254,-1,254,-5,254,-1,254,254,254,-1,254,-1,254,254,254,-1,254,-4,254,-13,254,-13,254,254,-8,254,254,254,254,254,254,254,254,254,254,254,254,254,254,254,254,254,254,254,254,254,254,254,254,254,-4,254,254,-9,254],
    sm122=[0,-1,144,145,-1,146,147,148,149,150,0,-139,255],
    sm123=[0,-4,0,-4,0,-4,256,256,-1,256,256,-6,256,256,256,256,256,-2,256,256,-14,256,256,-1,256,-1,256,-5,256,-1,256,256,256,-1,256,-1,256,256,256,-1,256,-4,256,-13,256,-23,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,-4,256,256],
    sm124=[0,-1,257,257,-1,257,257,257,257,257,0,-139,257],
    sm125=[0,-1,258,258,-1,258,258,258,258,258,0,-139,258],
    sm126=[0,-1,152,153,-1,154,155,156,157,158,0,-140,259],
    sm127=[0,-1,260,260,-1,260,260,260,260,260,0,-140,260],
    sm128=[0,-1,261,261,-1,261,261,261,261,261,0,-140,261],
    sm129=[0,-4,0,-4,0,-4,262,262,-1,262,262,-6,262,262,262,262,262,-2,262,262,-14,262,262,-1,262,-1,262,-5,262,-1,262,262,262,-1,262,-1,262,262,262,-1,262,-4,262,-13,262,-13,262,-9,262,262,262,262,262,262,262,262,262,262,262,262,262,262,262,262,262,262,262,262,262,262,262,262,262,-4,262,262],
    sm130=[0,-4,0,-4,0,-17,263,-5,264],
    sm131=[0,-4,0,-4,0,-4,134,134,-1,134,134,-6,134,134,134,-1,134,-2,134,134,-14,134,134,-1,134,-1,134,-5,134,-1,134,134,134,-1,134,-1,134,134,134,-1,134,-4,134,-13,134,-13,136,-9,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,-4,134,134],
    sm132=[0,-4,0,-4,0,-4,265,265,-1,265,265,-6,265,265,265,265,265,-2,265,265,-14,265,265,-1,265,-1,265,-5,265,-1,265,265,265,-1,265,-1,265,265,265,-1,265,-4,265,-13,265,-23,265,265,265,265,265,265,265,265,265,265,265,265,265,265,265,265,265,265,265,265,265,265,265,265,265,-4,265,265],
    sm133=[0,-4,0,-4,0,-4,266,266,-1,266,266,-6,266,266,266,-1,266,-3,266,-14,266,-2,266,-1,266,-5,266,-1,266,266,266,-4,266,-7,266,-47,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266],
    sm134=[0,-1,2,3,-1,0,-4,0,-18,267,-3,7,-26,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm135=[0,268,268,268,-1,0,-4,0,-4,268,268,-12,268,268,-2,268,-26,268,268,-6,268,-11,268,268,268,268,-1,268,268,268,268,268,268,-1,268,268,268,268,268,268,268,268,268,-2,268,268,-5,268,268,-2,268,-23,268,-1,268,268,268,268,268,268,-4,268,268,268,268,268,268],
    sm136=[0,-1,2,3,-1,0,-4,0,-4,4,51,-12,6,-3,7,-26,8,9,-19,10,-3,13,-1,14,15,16,17,-1,18,19,20,21,22,23,24,-1,25,-2,26,-6,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm137=[0,-4,0,-4,0,-4,269,-12,270],
    sm138=[0,-4,0,-4,0,-4,271,-12,271],
    sm139=[0,-4,0,-4,0,-4,272,-12,272,-21,273],
    sm140=[0,-4,0,-4,0,-39,273],
    sm141=[0,-4,0,-4,0,-4,136,-12,136,136,136,-2,136,136,-15,136,-3,136,-14,136,-21,136,-14,136],
    sm142=[0,-4,0,-4,0,-17,274,-1,274,-3,274,-15,274,-3,274,-14,274,-21,274],
    sm143=[0,-1,2,3,-1,0,-4,0,-19,275,-37,234,-44,276,-36,38,39,-3,43],
    sm144=[0,-2,3,-1,0,-4,0,-17,230,169,-38,170,277,-43,278,-41,43],
    sm145=[0,-4,0,-4,0,-77,279],
    sm146=[0,-1,2,3,-1,0,-4,0,-4,280,-13,119,-3,7,-26,8,9,-6,120,-12,10,11,12,-6,281,-1,18,-11,27,-5,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm147=[0,-4,0,-4,0,-22,282],
    sm148=[0,283,283,283,-1,0,-4,0,-4,283,283,-12,283,283,-2,283,-26,283,283,-6,283,-11,283,283,283,283,-1,283,283,283,283,283,283,-1,283,283,283,283,283,283,283,283,283,-2,283,283,-5,283,283,-2,283,-23,283,-1,283,283,283,283,283,283,-4,283,283,283,283,283,283],
    sm149=[0,-4,0,-4,0,-4,284],
    sm150=[0,-4,0,-4,0,-4,135],
    sm151=[0,285,285,285,-1,0,-4,0,-4,285,285,-12,285,285,-2,285,-26,285,285,-6,285,-11,285,285,285,285,-1,285,285,285,285,285,285,-1,285,285,285,285,285,285,285,285,285,-2,285,285,-5,285,285,-2,285,-23,285,-1,285,285,285,285,285,285,-4,285,285,285,285,285,285],
    sm152=[0,-4,0,-4,0,-4,286],
    sm153=[0,287,287,287,-1,0,-4,0,-4,287,287,-12,287,287,-2,287,-26,287,287,-6,287,-11,287,287,287,287,-1,287,287,287,287,287,287,-1,287,287,287,287,287,287,287,287,287,-2,287,287,-5,287,287,-2,287,-23,287,-1,287,287,287,287,287,287,-4,287,287,287,287,287,287],
    sm154=[0,-4,0,-4,0,-4,288],
    sm155=[0,-4,0,-4,0,-4,289],
    sm156=[0,-4,0,-4,0,-90,290,291],
    sm157=[0,292,292,292,-1,0,-4,0,-4,292,292,-12,292,292,-2,292,-26,292,292,-6,292,-11,292,292,292,292,-1,292,292,292,292,292,292,-1,292,292,292,292,292,292,292,292,292,-2,292,292,-5,292,292,-2,292,-23,292,-1,292,292,292,292,292,292,-4,292,292,292,292,292,292],
    sm158=[0,293,-3,0,-4,0,-4,293],
    sm159=[0,-2,185,-1,0,-4,0,-6,220,-3,190,191,192,193,-132,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209],
    sm160=[0,-2,294,-1,0,-4,0,-7,295,296,-130,297,298],
    sm161=[0,-2,294,-1,0,-4,0,-7,299,300,-130,297,298],
    sm162=[0,-2,294,-1,0,-4,0,-139,297,298],
    sm163=[0,-4,186,-4,187,-3,188,-4,301],
    sm164=[0,-2,294,-1,0,-4,0,-7,302,302,-130,297,298],
    sm165=[0,-2,303,-1,0,-4,0,-7,303,303,-130,303,303],
    sm166=[0,-2,302,-1,0,-4,0,-7,302,302,-130,302,302],
    sm167=[0,-4,304,-4,304,-3,304,-1,304,-2,304,-5,304,-130,304],
    sm168=[0,-4,305,-4,305,-3,305,-1,305,-2,305,-5,305,-130,305],
    sm169=[0,-4,0,-4,0,-18,211,-76,212],
    sm170=[0,306,306,306,-1,0,-4,0,-4,306,306,-1,306,306,-6,306,306,306,306,306,-2,306,306,-14,306,306,-1,306,-1,306,-5,306,306,306,306,306,-1,306,-1,306,306,306,-1,306,-4,306,-2,306,306,306,306,-1,306,-1,306,306,306,306,306,306,306,306,306,306,306,306,306,306,-2,306,306,-5,306,306,-2,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,306,-4,306,306,306,306,306,306],
    sm171=[0,-4,0,-4,0,-18,307],
    sm172=[0,-1,2,3,-1,0,-4,0,-4,308,-14,309,-37,234,-38,310,235,236,-40,38,39,-3,43],
    sm173=[0,-1,2,3,-1,0,-4,0,-18,119,-3,7,-34,120,-12,10,11,-27,28,29,-2,30,-35,38,39,40,41,42,43],
    sm174=[0,-2,3,-1,0,-4,0,-18,169,-4,311,-33,170,-44,278,-41,43],
    sm175=[0,-4,0,-4,0,-22,312],
    sm176=[0,-4,0,-4,0,-4,313,-12,314],
    sm177=[0,-4,0,-4,0,-4,315,-12,315],
    sm178=[0,316,-3,0,-4,0],
    sm179=[0,-4,0,-4,0,-5,317],
    sm180=[0,318,318,318,-1,0,-4,0,-4,318,318,-12,318,318,-2,318,-26,318,318,-6,318,-11,318,318,318,318,-1,318,318,318,318,318,318,-1,318,318,318,318,318,318,318,318,318,318,318,318,318,-5,318,318,-2,318,-23,318,-1,318,318,318,318,318,318,-4,318,318,318,318,318,318],
    sm181=[0,-4,0,-4,0,-4,319,-10,319,319,319,-5,319,-34,319,-7,319],
    sm182=[0,-4,0,-4,0,-4,320,-10,320,320,320,-1,320,-3,320,-34,320,-7,320],
    sm183=[0,-4,0,-4,0,-66,321],
    sm184=[0,-4,0,-4,0,-4,322,-10,322,322,322,-1,322,-3,322,-27,322,-6,322,-7,322,-47,322,85],
    sm185=[0,-4,0,-4,0,-4,323,-10,323,323,323,-1,323,-3,323,-27,323,-1,87,-4,323,-7,323,-47,323,323],
    sm186=[0,-4,0,-4,0,-4,324,-10,324,324,324,-1,324,-3,324,-27,324,-1,324,-4,324,-7,324,-47,324,324,89],
    sm187=[0,-4,0,-4,0,-4,325,-10,325,325,325,-1,325,-3,325,-27,325,-1,325,-4,325,-7,325,-47,325,325,325,91],
    sm188=[0,-4,0,-4,0,-4,326,-10,326,326,326,-1,326,-3,326,-27,326,-1,326,-4,326,-7,326,-47,326,326,326,326,93,94,95,96],
    sm189=[0,-4,0,-4,0,-4,327,98,-2,99,-6,327,327,327,-1,327,-3,327,-14,100,-4,101,-7,327,-1,327,-4,327,-7,327,-47,327,327,327,327,327,327,327,327,102,103],
    sm190=[0,-4,0,-4,0,-4,328,98,-2,99,-6,328,328,328,-1,328,-3,328,-14,100,-4,101,-7,328,-1,328,-4,328,-7,328,-47,328,328,328,328,328,328,328,328,102,103],
    sm191=[0,-4,0,-4,0,-4,329,98,-2,99,-6,329,329,329,-1,329,-3,329,-14,100,-4,101,-7,329,-1,329,-4,329,-7,329,-47,329,329,329,329,329,329,329,329,102,103],
    sm192=[0,-4,0,-4,0,-4,330,98,-2,99,-6,330,330,330,-1,330,-3,330,-14,100,-4,101,-7,330,-1,330,-4,330,-7,330,-47,330,330,330,330,330,330,330,330,102,103],
    sm193=[0,-4,0,-4,0,-4,331,331,-2,331,-6,331,331,331,-1,331,-3,331,-14,331,-4,331,-7,331,-1,331,-4,331,-7,331,-47,331,331,331,331,331,331,331,331,331,331,105,106,107],
    sm194=[0,-4,0,-4,0,-4,332,332,-2,332,-6,332,332,332,-1,332,-3,332,-14,332,-4,332,-7,332,-1,332,-4,332,-7,332,-47,332,332,332,332,332,332,332,332,332,332,105,106,107],
    sm195=[0,-4,0,-4,0,-4,333,333,-2,333,-6,333,333,333,-1,333,-3,333,-14,333,-4,333,-7,333,-1,333,-4,333,-7,333,-47,333,333,333,333,333,333,333,333,333,333,105,106,107],
    sm196=[0,-4,0,-4,0,-4,334,334,-2,334,-6,334,334,334,-1,334,-3,334,-14,334,-4,334,-7,334,-1,334,-4,334,-7,334,-47,334,334,334,334,334,334,334,334,334,334,105,106,107],
    sm197=[0,-4,0,-4,0,-4,335,335,-2,335,-6,335,335,335,-1,335,-3,335,-14,335,-4,335,-7,335,-1,335,-4,335,-7,335,-47,335,335,335,335,335,335,335,335,335,335,105,106,107],
    sm198=[0,-4,0,-4,0,-4,336,336,-2,336,-6,336,336,336,-1,336,-3,336,-14,336,-4,336,-7,336,-1,336,-4,336,-7,336,-47,336,336,336,336,336,336,336,336,336,336,105,106,107],
    sm199=[0,-4,0,-4,0,-4,337,337,-2,337,-6,337,337,337,-1,337,-3,337,-14,337,-4,337,-5,109,-1,337,-1,337,-4,337,-7,337,-47,337,337,337,337,337,337,337,337,337,337,337,337,337,110],
    sm200=[0,-4,0,-4,0,-4,338,338,-2,338,-6,338,338,338,-1,338,-3,338,-14,338,-4,338,-5,109,-1,338,-1,338,-4,338,-7,338,-47,338,338,338,338,338,338,338,338,338,338,338,338,338,110],
    sm201=[0,-4,0,-4,0,-4,339,339,-2,339,-6,339,339,339,-1,339,-3,339,-14,339,-4,339,-5,109,-1,339,-1,339,-4,339,-7,339,-47,339,339,339,339,339,339,339,339,339,339,339,339,339,110],
    sm202=[0,-4,0,-4,0,-4,340,340,-1,112,340,-6,340,340,340,-1,340,-3,340,-14,340,-2,113,-1,340,-5,340,-1,340,114,340,-4,340,-7,340,-47,340,340,340,340,340,340,340,340,340,340,340,340,340,340],
    sm203=[0,-4,0,-4,0,-4,341,341,-1,112,341,-6,341,341,341,-1,341,-3,341,-14,341,-2,113,-1,341,-5,341,-1,341,114,341,-4,341,-7,341,-47,341,341,341,341,341,341,341,341,341,341,341,341,341,341],
    sm204=[0,-4,0,-4,0,-4,342,342,-1,342,342,-6,342,342,342,-1,342,-3,342,-14,342,-2,342,-1,342,-5,342,-1,342,342,342,-4,342,-7,342,-47,342,342,342,342,342,342,342,342,342,342,342,342,342,342],
    sm205=[0,-4,0,-4,0,-4,343,343,-1,343,343,-6,343,343,343,-1,343,-3,343,-14,343,-2,343,-1,343,-5,343,-1,343,343,343,-4,343,-7,343,-47,343,343,343,343,343,343,343,343,343,343,343,343,343,343],
    sm206=[0,-4,0,-4,0,-4,344,344,-1,344,344,-6,344,344,344,-1,344,-3,344,-14,344,-2,344,-1,344,-5,344,-1,344,344,344,-4,344,-7,344,-47,344,344,344,344,344,344,344,344,344,344,344,344,344,344],
    sm207=[0,-4,0,-4,0,-4,345,345,-1,345,345,-6,345,345,345,-1,345,-3,345,-14,345,-2,345,-1,345,-5,345,-1,345,345,345,-4,345,-7,345,-47,345,345,345,345,345,345,345,345,345,345,345,345,345,345],
    sm208=[0,-4,0,-4,0,-4,346,346,-1,346,346,-6,346,346,346,346,346,-2,346,346,-14,346,346,-1,346,-1,346,-5,346,-1,346,346,346,-1,346,-1,346,346,346,-1,346,-4,346,-13,346,-23,346,346,346,346,346,346,346,346,346,346,346,346,346,346,346,346,346,346,346,346,346,346,346,346,346,-4,346,346],
    sm209=[0,-1,2,3,-1,0,-4,0,-17,347,119,-3,7,-26,8,9,-6,120,348,-11,10,11,-9,18,-17,28,29,-1,232,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm210=[0,-4,0,-4,0,-17,349,-40,350],
    sm211=[0,-1,351,351,-1,0,-4,0,-17,351,351,-3,351,-26,351,351,-6,351,351,-11,351,351,-9,351,-17,351,351,-1,351,351,-23,351,-1,351,351,351,351,351,351,-4,351,351,351,351,351,351],
    sm212=[0,-4,0,-4,0,-17,352,-40,352],
    sm213=[0,-4,0,-4,0,-4,353,353,-1,353,353,-6,353,353,353,353,353,-2,353,353,-14,353,353,-1,353,-1,353,-5,353,-1,353,353,353,-1,353,-1,353,353,353,-1,353,-4,353,-13,353,-23,353,353,353,353,353,353,353,353,353,353,353,353,353,353,353,353,353,353,353,353,353,353,353,353,353,-4,353,353],
    sm214=[0,-4,0,-4,0,-17,354,-1,355],
    sm215=[0,-4,0,-4,0,-17,356,-1,356],
    sm216=[0,-4,0,-4,0,-17,357,-1,357],
    sm217=[0,-4,0,-4,0,-17,357,-1,357,-19,273],
    sm218=[0,-4,0,-4,0,-22,358,-43,359],
    sm219=[0,-4,0,-4,0,-17,137,-1,137,-2,360,-16,137,-26,360],
    sm220=[0,-1,2,3,-1,0,-4,0,-57,234,-81,38,39,-3,43],
    sm221=[0,-4,0,-4,0,-22,361,-43,361],
    sm222=[0,-4,0,-4,0,-22,360,-43,360],
    sm223=[0,-4,0,-4,0,-4,362,362,-1,362,362,-6,362,362,362,362,362,-2,362,362,-14,362,362,-1,362,-1,362,-5,362,-1,362,362,362,-1,362,-1,362,362,362,-1,362,-4,362,-13,362,-23,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,-4,362,362],
    sm224=[0,-4,0,-4,0,-58,363],
    sm225=[0,-4,0,-4,0,-4,364,364,-1,364,364,-6,364,364,364,364,364,-2,364,364,-14,364,364,-1,364,-1,364,-5,364,-1,364,364,364,-1,364,-1,364,364,364,-1,364,-4,364,-13,364,-23,364,364,364,364,364,364,364,364,364,364,364,364,364,364,364,364,364,364,364,364,364,364,364,364,364,-4,364,364],
    sm226=[0,-4,0,-4,0,-17,365,-5,366],
    sm227=[0,-4,0,-4,0,-17,367,-5,367],
    sm228=[0,-4,0,-4,0,-58,368],
    sm229=[0,-4,0,-4,0,-4,369,369,-1,369,369,-6,369,369,369,369,369,-2,369,369,-14,369,369,-1,369,-1,369,-5,369,-1,369,369,369,-1,369,-1,369,369,369,-1,369,-4,369,-13,369,-23,369,369,369,369,369,369,369,369,369,369,369,369,369,369,369,369,369,369,369,369,369,369,369,369,369,-4,369,369],
    sm230=[0,-4,0,-4,0,-4,370,370,-1,370,370,-6,370,370,370,370,370,-2,370,370,-14,370,370,-1,370,-1,370,-5,370,-1,370,370,370,-1,370,-1,370,370,370,-1,370,-4,370,-13,370,-23,370,370,370,370,370,370,370,370,370,370,370,370,370,370,370,370,370,370,370,370,370,370,370,370,370,-4,370,370],
    sm231=[0,-4,0,-4,0,-4,371,371,-1,371,371,-6,371,371,371,371,371,-2,371,371,-14,371,371,-1,371,-1,371,-5,371,-1,371,371,371,-1,371,-1,371,371,371,-1,371,-4,371,-13,371,-23,371,371,371,371,371,371,371,371,371,371,371,371,371,371,371,371,371,371,371,371,371,371,371,371,371,-4,371,371],
    sm232=[0,-4,0,-4,0,-4,372,372,-1,372,372,-6,372,372,372,372,372,-2,372,372,-14,372,372,-1,372,-1,372,-5,372,-1,372,372,372,-1,372,-1,372,372,372,-1,372,-4,372,-13,372,-23,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,-4,372,372],
    sm233=[0,-1,373,373,-1,373,373,373,373,373,0,-139,373],
    sm234=[0,-1,374,374,-1,374,374,374,374,374,0,-140,374],
    sm235=[0,-4,0,-4,0,-4,375,375,-1,375,375,-6,375,375,375,375,375,-2,375,375,-14,375,375,-1,375,-1,375,-5,375,-1,375,375,375,-1,375,-1,375,375,375,-1,375,-4,375,-13,375,-13,375,-9,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,-4,375,375],
    sm236=[0,-4,0,-4,0,-23,376,-78,377],
    sm237=[0,-4,0,-4,0,-23,378],
    sm238=[0,-4,0,-4,0,-23,379],
    sm239=[0,-4,0,-4,0,-4,380,380,-1,380,380,-6,380,380,380,380,380,-2,380,380,-14,380,380,-1,380,-1,380,-5,380,-1,380,380,380,-1,380,-1,380,380,380,-1,380,-4,380,-13,380,-23,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,380,-4,380,380],
    sm240=[0,-4,0,-4,0,-58,381],
    sm241=[0,-4,0,-4,0,-4,382,-10,382,382,382,-1,382,-3,382,-34,382,-7,382],
    sm242=[0,-4,0,-4,0,-4,383,-10,383,383,383,-1,383,-3,383,-34,383,-7,383],
    sm243=[0,384,384,384,-1,0,-4,0,-4,384,384,-12,384,384,-2,384,-26,384,384,-6,384,-11,384,384,384,384,-1,384,384,384,384,384,384,-1,384,384,384,384,384,384,384,384,384,-2,384,384,-5,384,384,-2,384,-23,384,-1,384,384,384,384,384,384,-4,384,384,384,384,384,384],
    sm244=[0,385,385,385,-1,0,-4,0,-4,385,385,-12,385,385,-2,385,-26,385,385,-6,385,-11,385,385,385,385,-1,385,385,385,385,385,385,-1,385,385,385,385,385,385,385,385,385,-2,385,385,-5,385,385,-2,385,-23,385,-1,385,385,385,385,385,385,-4,385,385,385,385,385,385],
    sm245=[0,386,386,386,-1,0,-4,0,-4,386,386,-12,386,386,-2,386,-26,386,386,-6,386,-11,386,386,386,386,-1,386,386,386,386,386,386,-1,386,386,386,386,386,386,386,386,386,-2,386,386,-5,386,386,-2,386,-23,386,-1,386,386,386,386,386,386,-4,386,386,386,386,386,386],
    sm246=[0,-4,0,-4,0,-4,387,-12,387],
    sm247=[0,-4,0,-4,0,-17,388,-1,388,-3,388,-15,388,-3,388,-14,388,-21,388],
    sm248=[0,-4,0,-4,0,-19,389],
    sm249=[0,-4,0,-4,0,-17,390,-1,391],
    sm250=[0,-4,0,-4,0,-17,392,-1,392],
    sm251=[0,-4,0,-4,0,-17,393,-1,393],
    sm252=[0,-4,0,-4,0,-66,394],
    sm253=[0,-4,0,-4,0,-17,395,-1,395,-3,395,-15,273,-18,395],
    sm254=[0,-4,0,-4,0,-17,396,-1,396,-3,396,-15,396,-3,396,-14,396,-21,396],
    sm255=[0,-2,3,-1,0,-4,0,-17,347,169,-38,170,397,-43,278,-41,43],
    sm256=[0,-4,0,-4,0,-58,398],
    sm257=[0,-4,0,-4,0,-17,399,-40,400],
    sm258=[0,-4,0,-4,0,-17,401,-40,401],
    sm259=[0,-4,0,-4,0,-17,402,-40,402],
    sm260=[0,-4,0,-4,0,-17,403,-1,403,-3,403,-34,403],
    sm261=[0,-4,0,-4,0,-17,403,-1,403,-3,403,-15,273,-18,403],
    sm262=[0,-4,0,-4,0,-23,404],
    sm263=[0,-4,0,-4,0,-22,405],
    sm264=[0,-4,0,-4,0,-23,406],
    sm265=[0,-4,0,-4,0,-4,407],
    sm266=[0,-1,2,3,-1,0,-4,0,-4,408,-13,119,-3,7,-26,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm267=[0,-1,2,3,-1,0,-4,0,-4,409,-13,119,-3,7,-26,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm268=[0,-4,0,-4,0,-4,65,65,-1,65,65,-8,65,-20,65,66,-1,65,-1,410,-5,65,-1,65,65,65,-5,67,-1,68,-18,411,-23,69,70,71,72,73,74,75,76,77,78,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,-4,79,80],
    sm269=[0,-4,0,-4,0,-43,412,-36,413],
    sm270=[0,-1,2,3,-1,0,-4,0,-18,119,-3,7,-34,120,-12,10,11,12,-6,414,-13,27,-5,28,29,-2,30,-35,38,39,40,41,42,43],
    sm271=[0,-4,0,-4,0,-23,415],
    sm272=[0,416,416,416,-1,0,-4,0,-4,416,416,-12,416,416,-2,416,-26,416,416,-6,416,-11,416,416,416,416,-1,416,416,416,416,416,416,-1,416,416,416,416,416,416,416,416,416,-2,416,416,-5,416,416,-2,416,-23,416,-1,416,416,416,416,416,416,-4,416,416,416,416,416,416],
    sm273=[0,417,417,417,-1,0,-4,0,-4,417,417,-12,417,417,-2,417,-26,417,417,-6,417,-11,417,417,417,417,-1,417,417,417,417,417,417,-1,417,417,417,417,417,417,417,417,417,-2,417,417,-5,417,417,-2,417,-23,417,-1,417,417,417,417,417,417,-4,417,417,417,417,417,417],
    sm274=[0,418,418,418,-1,0,-4,0,-4,418,418,-12,418,418,-2,418,-26,418,418,-6,418,-11,418,418,418,418,-1,418,418,418,418,418,418,-1,418,418,418,418,418,418,418,418,418,-2,418,418,-5,418,418,-2,418,-23,418,-1,418,418,418,418,418,418,-4,418,418,418,418,418,418],
    sm275=[0,-4,0,-4,0,-23,419],
    sm276=[0,420,420,420,-1,0,-4,0,-4,420,420,-12,420,420,-2,420,-26,420,420,-6,420,-11,420,420,420,420,-1,420,420,420,420,420,420,-1,420,420,420,420,420,420,420,420,420,-2,420,420,-5,420,420,-2,420,-23,420,-1,420,420,420,420,420,420,-4,420,420,420,420,420,420],
    sm277=[0,421,421,421,-1,0,-4,0,-4,421,421,-12,421,421,-2,421,-26,421,421,-6,421,-11,421,421,421,421,-1,421,421,421,421,421,421,-1,421,421,421,421,421,421,421,421,421,-1,291,421,421,-5,421,421,-2,421,-23,421,-1,421,421,421,421,421,421,-4,421,421,421,421,421,421],
    sm278=[0,422,422,422,-1,0,-4,0,-4,422,422,-12,422,422,-2,422,-26,422,422,-6,422,-11,422,422,422,422,-1,422,422,422,422,422,422,-1,422,422,422,422,422,422,422,422,422,-2,422,422,-5,422,422,-2,422,-23,422,-1,422,422,422,422,422,422,-4,422,422,422,422,422,422],
    sm279=[0,-4,0,-4,0,-22,423],
    sm280=[0,-2,294,-1,0,-4,0,-7,424,425,-130,297,298],
    sm281=[0,-4,186,-4,187,-3,188,-1,51,-8,426,-130,427],
    sm282=[0,-4,0,-4,0,-8,428],
    sm283=[0,-2,429,-1,0,-4,0,-7,429,429,-130,429,429],
    sm284=[0,-2,430,-1,0,-4,0,-7,430,430,-30,431,-99,430,430],
    sm285=[0,-2,432,-1,0,-4,0],
    sm286=[0,-2,433,-1,0,-4,0],
    sm287=[0,-2,434,-1,0,-4,0,-7,434,434,-30,434,-99,434,434],
    sm288=[0,-2,294,-1,0,-4,0,-7,435,436,-130,297,298],
    sm289=[0,437,-3,437,-4,437,-3,437,437,437,-8,437,-130,438],
    sm290=[0,-4,0,-4,0,-8,439],
    sm291=[0,-2,294,-1,0,-4,0,-8,440,-130,297,298],
    sm292=[0,-2,294,-1,0,-4,0,-8,441,-130,297,298],
    sm293=[0,-4,442,-4,442,-3,442,-1,442,-8,442,-130,442],
    sm294=[0,-4,443,-4,443,-3,443,-1,443,-2,443,-5,443,-130,443],
    sm295=[0,-2,294,-1,0,-4,0,-7,444,445,-130,297,298],
    sm296=[0,446,446,446,-1,0,-4,0,-4,446,446,-1,446,446,-6,446,446,446,446,446,-2,446,446,-14,446,446,-1,446,-1,446,-5,446,446,446,446,446,-1,446,-1,446,446,446,-1,446,-4,446,-2,446,446,446,446,-1,446,-1,446,446,446,446,446,446,446,446,446,446,446,446,446,446,-2,446,446,-5,446,446,-2,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,446,-4,446,446,446,446,446,446],
    sm297=[0,-1,2,3,-1,0,-4,0,-4,308,-14,447,-37,234,-38,310,235,236,-40,38,39,-3,43],
    sm298=[0,-4,0,-4,0,-19,448],
    sm299=[0,449,449,449,-1,0,-4,0,-4,449,449,-1,449,449,-6,449,449,449,449,449,-2,449,449,-14,449,449,-1,449,-1,449,-5,449,449,449,449,449,-1,449,-1,449,449,449,-1,449,-4,449,-2,449,449,449,449,-1,449,-1,449,449,449,449,449,449,449,449,449,449,449,449,449,449,-2,449,449,-5,449,449,-2,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,-4,449,449,449,449,449,449],
    sm300=[0,-1,2,3,-1,0,-4,0,-4,308,-14,450,-37,234,-38,310,235,236,-40,38,39,-3,43],
    sm301=[0,-1,451,451,-1,0,-4,0,-4,451,-14,451,-37,451,-38,451,451,451,-40,451,451,-3,451],
    sm302=[0,-1,452,452,-1,0,-4,0,-4,452,-14,452,-37,452,-38,452,452,452,-40,452,452,-3,452],
    sm303=[0,-1,2,3,-1,0,-4,0,-57,234,-39,235,236,-40,38,39,-3,43],
    sm304=[0,-4,0,-4,0,-22,358],
    sm305=[0,-4,0,-4,0,-22,360],
    sm306=[0,-4,0,-4,0,-18,453],
    sm307=[0,-4,0,-4,0,-23,454],
    sm308=[0,-4,0,-4,0,-23,455],
    sm309=[0,-4,0,-4,0,-17,456,-5,455],
    sm310=[0,-4,0,-4,0,-23,457],
    sm311=[0,-4,0,-4,0,-17,458,-5,458],
    sm312=[0,-4,0,-4,0,-17,459,-5,459],
    sm313=[0,460,460,460,-1,0,-4,0,-4,460,460,-12,460,460,-2,460,-26,460,460,-6,460,-11,460,460,460,460,-1,460,-1,460,460,460,460,-1,460,460,460,460,460,460,460,460,460,-2,460,460,-5,460,460,-2,460,-23,460,-1,460,460,460,460,460,460,-4,460,460,460,460,460,460],
    sm314=[0,-4,0,-4,0,-4,461,-12,461],
    sm315=[0,-4,0,-4,0,-4,462,462,-1,462,462,-6,462,462,462,462,462,-2,462,462,-14,462,462,-1,462,-1,462,-5,462,-1,462,462,462,-1,462,-1,462,462,462,-1,462,-4,462,-13,462,-23,462,462,462,462,462,462,462,462,462,462,462,462,462,462,462,462,462,462,462,462,462,462,462,462,462,-4,462,462],
    sm316=[0,-1,463,463,-1,0,-4,0,-17,463,463,-3,463,-26,463,463,-6,463,463,-11,463,463,-9,463,-17,463,463,-1,463,463,-23,463,-1,463,463,463,463,463,463,-4,463,463,463,463,463,463],
    sm317=[0,-4,0,-4,0,-17,464,-40,464],
    sm318=[0,-4,0,-4,0,-4,465,465,-1,465,465,-6,465,465,465,465,465,-2,465,465,-14,465,465,-1,465,-1,465,-5,465,-1,465,465,465,-1,465,-1,465,465,465,-1,465,-4,465,-13,465,-23,465,465,465,465,465,465,465,465,465,465,465,465,465,465,465,465,465,465,465,465,465,465,465,465,465,-4,465,465],
    sm319=[0,-4,0,-4,0,-17,347,-40,466],
    sm320=[0,-1,2,3,-1,0,-4,0,-17,230,119,-3,7,-26,8,9,-6,120,351,-11,10,11,-9,18,-17,28,29,-1,232,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm321=[0,-4,0,-4,0,-17,467,-40,467],
    sm322=[0,-4,0,-4,0,-4,468,468,-1,468,468,-6,468,468,468,468,468,-2,468,468,-14,468,468,-1,468,-1,468,-5,468,-1,468,468,468,-1,468,-1,468,468,468,-1,468,-4,468,-13,468,-23,468,468,468,468,468,468,468,468,468,468,468,468,468,468,468,468,468,468,468,468,468,468,468,468,468,-4,468,468],
    sm323=[0,-1,2,3,-1,0,-4,0,-19,469,-37,234,-39,235,236,-3,237,-36,38,39,-3,43],
    sm324=[0,-4,0,-4,0,-17,470,-1,470],
    sm325=[0,-4,0,-4,0,-17,471,-1,471],
    sm326=[0,-4,0,-4,0,-22,472],
    sm327=[0,-4,0,-4,0,-22,473],
    sm328=[0,-4,0,-4,0,-58,474],
    sm329=[0,-4,0,-4,0,-4,475,475,-1,475,475,-6,475,475,475,475,475,-2,475,475,-14,475,475,-1,475,-1,475,-5,475,-1,475,475,475,-1,475,-1,475,475,475,-1,475,-4,475,-13,475,-23,475,475,475,475,475,475,475,475,475,475,475,475,475,475,475,475,475,475,475,475,475,475,475,475,475,-4,475,475],
    sm330=[0,-4,0,-4,0,-4,476,476,-1,476,476,-6,476,476,476,476,476,-2,476,476,-14,476,476,-1,476,-1,476,-5,476,-1,476,476,476,-1,476,-1,476,476,476,-1,476,-4,476,-13,476,-23,476,476,476,476,476,476,476,476,476,476,476,476,476,476,476,476,476,476,476,476,476,476,476,476,476,-4,476,476],
    sm331=[0,-1,2,3,-1,0,-4,0,-18,119,-3,7,477,-25,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-1,478,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm332=[0,-4,0,-4,0,-17,479,-5,479],
    sm333=[0,-4,0,-4,0,-4,480,480,-1,480,480,-6,480,480,480,480,480,-2,480,480,-14,480,480,-1,480,-1,480,-5,480,-1,480,480,480,-1,480,-1,480,480,480,-1,480,-4,480,-13,480,-23,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,480,-4,480,480],
    sm334=[0,-4,0,-4,0,-4,481,481,-1,481,481,-6,481,481,481,481,481,-2,481,481,-14,481,481,-1,481,-1,481,-5,481,-1,481,481,481,-1,481,-1,481,481,481,-1,481,-4,481,-13,481,-13,481,-9,481,481,481,481,481,481,481,481,481,481,481,481,481,481,481,481,481,481,481,481,481,481,481,481,481,-4,481,481],
    sm335=[0,-4,0,-4,0,-4,482,482,-1,482,482,-6,482,482,482,482,482,-2,482,482,-14,482,482,-1,482,-1,482,-5,482,-1,482,482,482,-1,482,-1,482,482,482,-1,482,-4,482,-13,482,-13,482,-9,482,482,482,482,482,482,482,482,482,482,482,482,482,482,482,482,482,482,482,482,482,482,482,482,482,-4,482,482],
    sm336=[0,-4,0,-4,0,-4,483,483,-1,483,483,-6,483,483,483,483,483,-2,483,483,-14,483,483,-1,483,-1,483,-5,483,-1,483,483,483,-1,483,-1,483,483,483,-1,483,-4,483,-13,483,-23,483,483,483,483,483,483,483,483,483,483,483,483,483,483,483,483,483,483,483,483,483,483,483,483,483,-4,483,483],
    sm337=[0,-4,0,-4,0,-19,484],
    sm338=[0,-4,0,-4,0,-19,485],
    sm339=[0,-4,0,-4,0,-4,486,-12,486],
    sm340=[0,-4,0,-4,0,-4,487,-12,487,-1,487,-3,487,-34,487],
    sm341=[0,-4,0,-4,0,-17,488,-1,488,-3,488,-15,488,-3,488,-14,488,-21,488],
    sm342=[0,-1,2,3,-1,0,-4,0,-19,489,-37,234,-44,276,-36,38,39,-3,43],
    sm343=[0,-4,0,-4,0,-19,490],
    sm344=[0,-4,0,-4,0,-17,491,-1,491,-3,491,-34,491],
    sm345=[0,-4,0,-4,0,-58,492],
    sm346=[0,-4,0,-4,0,-17,493,-1,493,-3,493,-15,493,-3,493,-14,493,-21,493],
    sm347=[0,-4,0,-4,0,-17,494,-40,494],
    sm348=[0,-2,3,-1,0,-4,0,-17,230,169,-38,170,495,-43,278,-41,43],
    sm349=[0,-4,0,-4,0,-23,496,-34,496],
    sm350=[0,-4,0,-4,0,-17,497,-1,497,-3,497,-34,497],
    sm351=[0,-1,2,3,-1,0,-4,0,-4,498,-13,119,-3,7,-26,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm352=[0,-4,0,-4,0,-4,499],
    sm353=[0,-1,2,3,-1,0,-4,0,-18,119,-3,7,500,-25,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm354=[0,-4,0,-4,0,-4,501,-12,270],
    sm355=[0,-4,0,-4,0,-43,502,-36,503],
    sm356=[0,-4,0,-4,0,-4,272,-12,272,-21,273,-3,504,-36,504],
    sm357=[0,-4,0,-4,0,-39,273,-3,504,-36,504],
    sm358=[0,-4,0,-4,0,-4,505],
    sm359=[0,-1,2,3,-1,0,-4,0,-18,119,-3,7,506,-25,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm360=[0,-4,0,-4,0,-43,507,-36,507],
    sm361=[0,-4,0,-4,0,-80,508],
    sm362=[0,-4,0,-4,0,-80,509],
    sm363=[0,-4,0,-4,0,-18,510],
    sm364=[0,511,511,511,-1,0,-4,0,-4,511,511,-12,511,511,-2,511,-26,511,511,-6,511,-11,511,511,511,511,-1,511,511,511,511,511,511,-1,511,511,511,511,511,511,511,511,511,-2,511,511,-5,511,511,-2,511,-23,511,-1,511,511,511,511,511,511,-4,511,511,511,511,511,511],
    sm365=[0,512,512,512,-1,0,-4,0,-4,512,512,-12,512,512,-2,512,-26,512,512,-6,512,-11,512,512,512,512,-1,512,512,512,512,512,512,-1,512,512,512,512,512,512,512,512,512,-2,512,512,-5,512,512,-2,512,-23,512,-1,512,512,512,512,512,512,-4,512,512,512,512,512,512],
    sm366=[0,-4,0,-4,0,-8,513],
    sm367=[0,-2,514,-1,0,-4,0,-7,514,514,-130,514,514],
    sm368=[0,-4,186,-4,187,-3,188,-1,184,-8,426,-130,515],
    sm369=[0,-4,516,-4,516,-3,516,-1,516,-8,516,-130,516],
    sm370=[0,-4,517,-4,517,-3,517,-1,517,-8,517,-130,517],
    sm371=[0,-4,186,-4,187,-3,188,-1,518,-8,518,-130,518],
    sm372=[0,-4,518,-4,518,-3,518,-1,518,-8,518,-130,518],
    sm373=[0,-2,519,-1,519,-4,519,-3,519,-1,519,-1,519,519,-5,519,-124,519,519,-4,519],
    sm374=[0,520,-3,520,-4,520,-3,520,520,520,-8,520,-130,520],
    sm375=[0,-2,521,-1,0,-4,0,-14,426,-124,522,523],
    sm376=[0,-4,0,-4,0,-140,524],
    sm377=[0,-4,0,-4,0,-139,525],
    sm378=[0,520,-3,520,-4,520,-3,520,520,520,-8,520,-130,526],
    sm379=[0,-4,0,-4,0,-8,527],
    sm380=[0,-4,0,-4,0,-6,220,-3,190,191,-134,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209],
    sm381=[0,-4,0,-4,0,-5,528,-12,529,-5,530,-32,531],
    sm382=[0,-4,0,-4,0,-8,532],
    sm383=[0,-4,0,-4,0,-5,533],
    sm384=[0,-4,0,-4,0,-19,534],
    sm385=[0,535,535,535,-1,0,-4,0,-4,535,535,-1,535,535,-6,535,535,535,535,535,-2,535,535,-14,535,535,-1,535,-1,535,-5,535,535,535,535,535,-1,535,-1,535,535,535,-1,535,-4,535,-2,535,535,535,535,-1,535,-1,535,535,535,535,535,535,535,535,535,535,535,535,535,535,-2,535,535,-5,535,535,-2,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,535,-4,535,535,535,535,535,535],
    sm386=[0,536,536,536,-1,0,-4,0,-4,536,536,-1,536,536,-6,536,536,536,536,536,-2,536,536,-14,536,536,-1,536,-1,536,-5,536,536,536,536,536,-1,536,-1,536,536,536,-1,536,-4,536,-2,536,536,536,536,-1,536,-1,536,536,536,536,536,536,536,536,536,536,536,536,536,536,-2,536,536,-5,536,536,-2,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,536,-4,536,536,536,536,536,536],
    sm387=[0,-1,537,537,-1,0,-4,0,-4,537,-14,537,-37,537,-38,537,537,537,-40,537,537,-3,537],
    sm388=[0,-1,538,538,-1,0,-4,0,-4,538,-14,538,-37,538,-38,538,538,538,-40,538,538,-3,538],
    sm389=[0,-4,0,-4,0,-18,539],
    sm390=[0,-2,3,-1,0,-4,0,-18,169,-4,540,-33,170,-44,278,-41,43],
    sm391=[0,-4,0,-4,0,-23,541],
    sm392=[0,-4,0,-4,0,-4,542,-12,542],
    sm393=[0,-4,0,-4,0,-4,543,-10,543,543,543,-1,543,-3,543,-34,543,-7,543],
    sm394=[0,-4,0,-4,0,-4,544,544,-1,544,544,-6,544,544,544,544,544,-2,544,544,-14,544,544,-1,544,-1,544,-5,544,-1,544,544,544,-1,544,-1,544,544,544,-1,544,-4,544,-13,544,-23,544,544,544,544,544,544,544,544,544,544,544,544,544,544,544,544,544,544,544,544,544,544,544,544,544,-4,544,544],
    sm395=[0,-4,0,-4,0,-17,545,-40,545],
    sm396=[0,-1,2,3,-1,0,-4,0,-17,347,119,-3,7,-26,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm397=[0,-4,0,-4,0,-4,546,546,-1,546,546,-6,546,546,546,546,546,-2,546,546,-14,546,546,-1,546,-1,546,-5,546,-1,546,546,546,-1,546,-1,546,546,546,-1,546,-4,546,-13,546,-23,546,546,546,546,546,546,546,546,546,546,546,546,546,546,546,546,546,546,546,546,546,546,546,546,546,-4,546,546],
    sm398=[0,-4,0,-4,0,-17,547,-1,547],
    sm399=[0,-4,0,-4,0,-17,548,-1,548],
    sm400=[0,-4,0,-4,0,-23,549],
    sm401=[0,-4,0,-4,0,-23,550],
    sm402=[0,-4,0,-4,0,-23,551],
    sm403=[0,-4,0,-4,0,-22,552,-43,552],
    sm404=[0,-4,0,-4,0,-4,553,553,-1,553,553,-6,553,553,553,553,553,-2,553,553,-14,553,553,-1,553,-1,553,-5,553,-1,553,553,553,-1,553,-1,553,553,553,-1,553,-4,553,-13,553,-23,553,553,553,553,553,553,553,553,553,553,553,553,553,553,553,553,553,553,553,553,553,553,553,553,553,-4,553,553],
    sm405=[0,-4,0,-4,0,-17,554,-5,554],
    sm406=[0,-4,0,-4,0,-23,555],
    sm407=[0,-4,0,-4,0,-23,556],
    sm408=[0,-4,0,-4,0,-4,557,-10,557,557,557,-1,557,-3,557,-34,557,-7,557],
    sm409=[0,-4,0,-4,0,-19,558],
    sm410=[0,-4,0,-4,0,-17,559,-1,559,-3,559,-15,559,-3,559,-14,559,-21,559],
    sm411=[0,-4,0,-4,0,-17,560,-1,560],
    sm412=[0,-4,0,-4,0,-17,561,-1,561],
    sm413=[0,-4,0,-4,0,-17,562,-1,562,-3,562,-15,562,-3,562,-14,562,-21,562],
    sm414=[0,-2,3,-1,0,-4,0,-17,347,169,-38,170,563,-43,278,-41,43],
    sm415=[0,-4,0,-4,0,-58,564],
    sm416=[0,-4,0,-4,0,-17,565,-40,565],
    sm417=[0,566,566,566,-1,0,-4,0,-4,566,566,-12,566,566,-2,566,-26,566,566,-6,566,-11,566,566,566,566,-1,566,567,566,566,566,566,-1,566,566,566,566,566,566,566,566,566,-2,566,566,-5,566,566,-2,566,-23,566,-1,566,566,566,566,566,566,-4,566,566,566,566,566,566],
    sm418=[0,-4,0,-4,0,-23,568],
    sm419=[0,569,569,569,-1,0,-4,0,-4,569,569,-12,569,569,-2,569,-26,569,569,-6,569,-11,569,569,569,569,-1,569,569,569,569,569,569,-1,569,569,569,569,569,569,569,569,569,-2,569,569,-5,569,569,-2,569,-23,569,-1,569,569,569,569,569,569,-4,569,569,569,569,569,569],
    sm420=[0,-4,0,-4,0,-4,570],
    sm421=[0,-1,2,3,-1,0,-4,0,-18,119,-3,7,571,-25,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm422=[0,-4,0,-4,0,-23,572],
    sm423=[0,-1,2,3,-1,0,-4,0,-4,573,-13,119,-3,7,-26,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm424=[0,-1,2,3,-1,0,-4,0,-18,119,-3,7,574,-25,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm425=[0,-4,0,-4,0,-23,575],
    sm426=[0,-4,0,-4,0,-23,576],
    sm427=[0,-4,0,-4,0,-23,577],
    sm428=[0,-4,0,-4,0,-23,578],
    sm429=[0,-4,0,-4,0,-23,579],
    sm430=[0,-4,0,-4,0,-80,580],
    sm431=[0,-4,0,-4,0,-80,504],
    sm432=[0,581,581,581,-1,0,-4,0,-4,581,581,-12,581,581,-2,581,-26,581,581,-6,581,-11,581,581,581,581,-1,581,581,581,581,581,581,-1,581,581,581,581,581,581,581,581,581,-2,581,581,-5,581,581,-2,581,-23,581,-1,581,581,581,581,581,581,-4,581,581,581,581,581,581],
    sm433=[0,-4,0,-4,0,-19,582,-49,583,-18,584],
    sm434=[0,585,585,585,-1,0,-4,0,-4,585,585,-12,585,585,-2,585,-26,585,585,-6,585,-11,585,585,585,585,-1,585,585,585,585,585,585,-1,585,585,585,585,585,585,585,585,585,-2,585,585,-5,585,585,-2,585,-23,585,-1,585,585,585,585,585,585,-4,585,585,585,585,585,585],
    sm435=[0,-4,0,-4,0,-23,586],
    sm436=[0,-4,0,-4,0,-23,587],
    sm437=[0,-4,186,-4,187,-3,188,-1,184,-8,426,-130,588],
    sm438=[0,589,-3,589,-4,589,-3,589,589,589,-8,589,-130,589],
    sm439=[0,-2,185,-1,0,-4,0],
    sm440=[0,-4,590,-4,590,-3,590,-1,590,-8,590,-130,590],
    sm441=[0,-4,0,-4,0,-15,591,592],
    sm442=[0,-2,593,-1,0,-4,0,-7,593,593,-130,593,593],
    sm443=[0,-2,594,-1,0,-4,0,-7,594,594,-130,594,594],
    sm444=[0,-2,595,-1,596,-1,597,598,599,0,-3,600,-10,426,-148,601],
    sm445=[0,-2,595,-1,596,-1,597,598,599,0,-3,600,-159,601],
    sm446=[0,-2,602,-1,0,-4,0,-7,602,602,-30,602,-99,602,602],
    sm447=[0,-4,0,-4,0,-8,603],
    sm448=[0,-4,0,-4,0,-5,604],
    sm449=[0,-4,0,-4,0,-5,605],
    sm450=[0,-4,0,-4,0,-5,606,-12,529,-5,530,-32,531],
    sm451=[0,-4,0,-4,0,-4,607,608,-12,608,-5,608,-32,608],
    sm452=[0,-4,0,-4,0,-6,609,-14,610,-3,611,-7,612],
    sm453=[0,-4,0,-4,0,-5,613,-12,613,-5,613,-32,613],
    sm454=[0,-4,0,-4,0,-5,614,-12,614,-5,614,-32,614],
    sm455=[0,-4,0,-4,0,-17,615,616],
    sm456=[0,-2,617,-1,0,-4,0,-24,530],
    sm457=[0,-4,0,-4,0,-17,618,618],
    sm458=[0,-4,0,-4,0,-8,619,-8,620,620,-4,620,-5,620,620,-18,621,622,623,-5,531],
    sm459=[0,-2,624,-1,0,-4,0,-52,625,626,627,628,-1,629,630,-7,631],
    sm460=[0,-4,0,-4,0,-4,632],
    sm461=[0,-4,0,-4,0,-4,633],
    sm462=[0,-4,0,-4,0,-4,634],
    sm463=[0,-4,0,-4,0,-5,635],
    sm464=[0,-4,0,-4,0,-5,636],
    sm465=[0,637,637,637,-1,0,-4,0,-4,637,637,-1,637,637,-6,637,637,637,637,637,-2,637,637,-14,637,637,-1,637,-1,637,-5,637,637,637,637,637,-1,637,-1,637,637,637,-1,637,-4,637,-2,637,637,637,637,-1,637,-1,637,637,637,637,637,637,637,637,637,637,637,637,637,637,-2,637,637,-5,637,637,-2,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,637,-4,637,637,637,637,637,637],
    sm466=[0,-1,2,3,-1,0,-4,0,-4,4,51,-12,6,638,-2,7,-26,8,9,-19,10,11,12,-1,13,-1,14,15,16,17,-1,18,19,20,21,22,23,24,-1,25,-2,26,27,-5,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm467=[0,-4,0,-4,0,-23,639],
    sm468=[0,-4,0,-4,0,-17,640,-5,640],
    sm469=[0,-4,0,-4,0,-18,641],
    sm470=[0,-4,0,-4,0,-17,642,-40,642],
    sm471=[0,-4,0,-4,0,-18,643],
    sm472=[0,-4,0,-4,0,-18,644],
    sm473=[0,-4,0,-4,0,-23,645],
    sm474=[0,-4,0,-4,0,-23,646],
    sm475=[0,-4,0,-4,0,-17,647,-5,647],
    sm476=[0,-4,0,-4,0,-4,648,648,-1,648,648,-6,648,648,648,648,648,-2,648,648,-14,648,648,-1,648,-1,648,-5,648,-1,648,648,648,-1,648,-1,648,648,648,-1,648,-4,648,-13,648,-13,648,-9,648,648,648,648,648,648,648,648,648,648,648,648,648,648,648,648,648,648,648,648,648,648,648,648,648,-4,648,648],
    sm477=[0,-4,0,-4,0,-17,649,-1,649,-3,649,-15,649,-3,649,-14,649,-21,649],
    sm478=[0,-4,0,-4,0,-17,650,-1,650,-3,650,-15,650,-3,650,-14,650,-21,650],
    sm479=[0,-4,0,-4,0,-58,651],
    sm480=[0,-4,0,-4,0,-4,652],
    sm481=[0,-1,2,3,-1,0,-4,0,-18,119,-3,7,653,-25,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm482=[0,-4,0,-4,0,-23,654],
    sm483=[0,-4,0,-4,0,-23,655],
    sm484=[0,656,656,656,-1,0,-4,0,-4,656,656,-12,656,656,-2,656,-26,656,656,-6,656,-11,656,656,656,656,-1,656,656,656,656,656,656,-1,656,656,656,656,656,656,656,656,656,-2,656,656,-5,656,656,-2,656,-23,656,-1,656,656,656,656,656,656,-4,656,656,656,656,656,656],
    sm485=[0,-4,0,-4,0,-4,657],
    sm486=[0,-1,2,3,-1,0,-4,0,-18,119,-3,7,658,-25,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm487=[0,-4,0,-4,0,-23,659],
    sm488=[0,-4,0,-4,0,-23,660],
    sm489=[0,-4,0,-4,0,-23,661],
    sm490=[0,662,662,662,-1,0,-4,0,-4,662,662,-12,662,662,-2,662,-26,662,662,-6,662,-11,662,662,662,662,-1,662,662,662,662,662,662,-1,662,662,662,662,662,662,662,662,662,-2,662,662,-5,662,662,-2,662,-23,662,-1,662,662,662,662,662,662,-4,662,662,662,662,662,662],
    sm491=[0,-4,0,-4,0,-23,663],
    sm492=[0,-4,0,-4,0,-23,664],
    sm493=[0,665,665,665,-1,0,-4,0,-4,665,665,-12,665,665,-2,665,-26,665,665,-6,665,-11,665,665,665,665,-1,665,665,665,665,665,665,-1,665,665,665,665,665,665,665,665,665,-2,665,665,-5,665,665,-2,665,-23,665,-1,665,665,665,665,665,665,-4,665,665,665,665,665,665],
    sm494=[0,-4,0,-4,0,-19,666,-49,583,-18,584],
    sm495=[0,-4,0,-4,0,-19,667,-68,584],
    sm496=[0,-4,0,-4,0,-19,668,-49,668,-18,668],
    sm497=[0,-4,0,-4,0,-19,669,-46,670,-21,669],
    sm498=[0,-4,0,-4,0,-8,671],
    sm499=[0,-2,672,-1,672,-4,672,-3,672,-1,672,-1,672,672,-5,672,-124,672,672,-4,672],
    sm500=[0,-4,0,-4,0,-139,673],
    sm501=[0,-4,0,-4,0,-139,674],
    sm502=[0,-2,595,-1,596,-1,597,598,599,0,-3,600,-135,675,675,-22,601],
    sm503=[0,-2,676,-1,676,-1,676,676,676,0,-3,676,-135,676,676,-22,676],
    sm504=[0,-2,677,-1,677,-1,677,677,677,0,-3,677,-135,677,677,-22,677],
    sm505=[0,-2,678,-1,678,-1,678,678,678,0,-3,678,-135,678,678,-22,678],
    sm506=[0,-4,0,679,-3,0],
    sm507=[0,-4,0,-4,0,-140,680],
    sm508=[0,-4,0,-4,0,-8,681],
    sm509=[0,682,-3,682,-4,682,-3,682,682,682,-8,682,-130,682],
    sm510=[0,-4,0,-4,0,-7,683],
    sm511=[0,-4,0,-4,0,-5,684,-12,529,-5,530,-32,531],
    sm512=[0,-4,0,-4,0,-4,607,685,-12,685,-5,685,-32,685],
    sm513=[0,-4,0,-4,0,-5,686,-12,686,-5,686,-32,686],
    sm514=[0,-4,0,-4,0,-4,607],
    sm515=[0,-2,687,-1,0,-4,0,-4,687,687,-12,687,687,-4,687,-32,687],
    sm516=[0,-4,0,-4,0],
    sm517=[0,-2,688,-1,0,-4,0,-22,689,-8,690,-2,691],
    sm518=[0,-4,0,-4,0,-26,692,-112,693,694],
    sm519=[0,-2,695,-1,0,-4,696,-22,697,-8,698],
    sm520=[0,-4,0,-4,0,-57,531],
    sm521=[0,-2,617,-1,0,-4,0,-4,699,-14,700,-4,530],
    sm522=[0,-2,701,-1,0,-4,0,-4,702,-14,701,-4,701],
    sm523=[0,-2,703,-1,0,-4,0,-4,703,-14,703,-4,703],
    sm524=[0,-2,704,-1,0,-4,0,-4,704,-14,704,-4,704],
    sm525=[0,-2,705,-1,0,-4,0,-4,705,-14,705,-4,705],
    sm526=[0,-4,0,-4,0,-66,706],
    sm527=[0,-4,0,-4,0,-8,619,-8,707,707,-4,707,-5,707,707,-18,621,622,623,-5,531],
    sm528=[0,-4,0,-4,0,-8,708,-8,708,708,-4,708,-5,708,708,-18,708,708,708,-5,708],
    sm529=[0,-4,0,-4,0,-8,709,-8,709,709,-4,709,-5,709,709,-18,709,709,709,-5,709],
    sm530=[0,-4,0,-4,0,-57,710],
    sm531=[0,-4,0,-4,0,-54,627,628,-1,629,711,-7,631],
    sm532=[0,-4,0,-4,0,-54,627,628,-1,629,712,-7,631],
    sm533=[0,-4,0,-4,0,-58,713,-7,714],
    sm534=[0,-4,0,-4,0,-8,715,-8,715,715,-4,715,-5,715,715,-18,715,715,715,-5,715],
    sm535=[0,-4,0,-4,0,-54,716,716,-1,716,716,-7,716],
    sm536=[0,-2,717,-1,0,-4,0,-52,718],
    sm537=[0,-4,0,-4,0,-53,719,716,716,-1,716,716,-7,716],
    sm538=[0,-4,0,-4,0,-39,720,-10,720,-2,719,720,720,-1,720,720,720,720,720,-4,720],
    sm539=[0,-4,0,-4,0,-53,721],
    sm540=[0,-2,722,-1,0,-4,0,-52,722],
    sm541=[0,-4,0,-4,0,-54,723,723,-1,723,723,-7,723],
    sm542=[0,-4,0,-4,0,-54,724,724,-1,724,724,-7,724],
    sm543=[0,-2,725,-1,0,-4,0],
    sm544=[0,-2,726,-1,0,-4,0],
    sm545=[0,-2,624,-1,0,-4,0,-52,727,626],
    sm546=[0,-2,728,-1,0,-4,0,-66,729],
    sm547=[0,-4,0,-4,0,-58,730,-7,730],
    sm548=[0,-4,0,-4,0,-58,731,-7,729],
    sm549=[0,-4,0,-4,0,-7,732],
    sm550=[0,-4,0,-4,0,-19,733],
    sm551=[0,-4,0,-4,0,-19,734],
    sm552=[0,-4,0,-4,0,-18,735],
    sm553=[0,-4,0,-4,0,-17,736,-1,736,-3,736,-15,736,-3,736,-14,736,-21,736],
    sm554=[0,737,737,737,-1,0,-4,0,-4,737,737,-12,737,737,-2,737,-26,737,737,-6,737,-11,737,737,737,737,-1,737,737,737,737,737,737,-1,737,737,737,737,737,737,737,737,737,-2,737,737,-5,737,737,-2,737,-23,737,-1,737,737,737,737,737,737,-4,737,737,737,737,737,737],
    sm555=[0,738,738,738,-1,0,-4,0,-4,738,738,-12,738,738,-2,738,-26,738,738,-6,738,-11,738,738,738,738,-1,738,738,738,738,738,738,-1,738,738,738,738,738,738,738,738,738,-2,738,738,-5,738,738,-2,738,-23,738,-1,738,738,738,738,738,738,-4,738,738,738,738,738,738],
    sm556=[0,-4,0,-4,0,-23,739],
    sm557=[0,740,740,740,-1,0,-4,0,-4,740,740,-12,740,740,-2,740,-26,740,740,-6,740,-11,740,740,740,740,-1,740,740,740,740,740,740,-1,740,740,740,740,740,740,740,740,740,-2,740,740,-5,740,740,-2,740,-23,740,-1,740,740,740,740,740,740,-4,740,740,740,740,740,740],
    sm558=[0,741,741,741,-1,0,-4,0,-4,741,741,-12,741,741,-2,741,-26,741,741,-6,741,-11,741,741,741,741,-1,741,741,741,741,741,741,-1,741,741,741,741,741,741,741,741,741,-2,741,741,-5,741,741,-2,741,-23,741,-1,741,741,741,741,741,741,-4,741,741,741,741,741,741],
    sm559=[0,-1,2,3,-1,0,-4,0,-18,119,-3,7,742,-25,8,9,-6,120,-12,10,11,-9,18,-17,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm560=[0,-4,0,-4,0,-23,743],
    sm561=[0,744,744,744,-1,0,-4,0,-4,744,744,-12,744,744,-2,744,-26,744,744,-6,744,-11,744,744,744,744,-1,744,744,744,744,744,744,-1,744,744,744,744,744,744,744,744,744,-2,744,744,-5,744,744,-2,744,-23,744,-1,744,744,744,744,744,744,-4,744,744,744,744,744,744],
    sm562=[0,745,745,745,-1,0,-4,0,-4,745,745,-12,745,745,-2,745,-26,745,745,-6,745,-11,745,745,745,745,-1,745,745,745,745,745,745,-1,745,745,745,745,745,745,745,745,745,-2,745,745,-5,745,745,-2,745,-23,745,-1,745,745,745,745,745,745,-4,745,745,745,745,745,745],
    sm563=[0,746,746,746,-1,0,-4,0,-4,746,746,-12,746,746,-2,746,-26,746,746,-6,746,-11,746,746,746,746,-1,746,746,746,746,746,746,-1,746,746,746,746,746,746,746,746,746,-2,746,746,-5,746,746,-2,746,-23,746,-1,746,746,746,746,746,746,-4,746,746,746,746,746,746],
    sm564=[0,747,747,747,-1,0,-4,0,-4,747,747,-12,747,747,-2,747,-26,747,747,-6,747,-11,747,747,747,747,-1,747,747,747,747,747,747,-1,747,747,747,747,747,747,747,747,747,-2,747,747,-5,747,747,-2,747,-23,747,-1,747,747,747,747,747,747,-4,747,747,747,747,747,747],
    sm565=[0,-4,0,-4,0,-23,748],
    sm566=[0,-4,0,-4,0,-19,749,-68,584],
    sm567=[0,750,750,750,-1,0,-4,0,-4,750,750,-12,750,750,-2,750,-26,750,750,-6,750,-11,750,750,750,750,-1,750,750,750,750,750,750,-1,750,750,750,750,750,750,750,750,750,-2,750,750,-5,750,750,-2,750,-23,750,-1,750,750,750,750,750,750,-4,750,750,750,750,750,750],
    sm568=[0,-4,0,-4,0,-19,751,-49,751,-18,751],
    sm569=[0,-4,0,-4,0,-19,752,-68,584],
    sm570=[0,-4,0,-4,0,-66,753],
    sm571=[0,754,754,754,-1,0,-4,0,-4,754,754,-12,754,754,-2,754,-26,754,754,-6,754,-11,754,754,754,754,-1,754,754,754,754,754,754,-1,754,754,754,754,754,754,754,754,754,-1,754,754,754,-5,754,754,-2,754,-23,754,-1,754,754,754,754,754,754,-4,754,754,754,754,754,754],
    sm572=[0,-4,0,-4,0,-8,755],
    sm573=[0,756,-3,756,-4,756,-3,756,756,756,-8,756,-130,756],
    sm574=[0,-4,0,-4,0,-15,757],
    sm575=[0,-2,758,-1,0,-4,0,-7,758,758,-130,758,758],
    sm576=[0,-2,759,-1,0,-4,0,-7,759,759,-130,759,759],
    sm577=[0,-2,760,-1,760,-1,760,760,760,0,-3,760,-135,760,760,-22,760],
    sm578=[0,-2,761,-1,761,-1,761,761,761,0,-3,761,-135,761,761,-22,761],
    sm579=[0,-4,0,-4,0,-12,762],
    sm580=[0,-4,0,-4,0,-17,763,764],
    sm581=[0,-4,0,-4,0,-17,765,765],
    sm582=[0,-4,0,-4,0,-17,766,766,-10,767,767],
    sm583=[0,-2,768,-1,0,-4,0],
    sm584=[0,-4,0,-4,0,-17,766,766,-10,769],
    sm585=[0,-4,0,-4,0,-17,770,770,-10,770,770],
    sm586=[0,-4,0,-4,0,-17,771,771,-10,771,771],
    sm587=[0,-4,0,-4,0,-17,771,771,-10,772,773],
    sm588=[0,-2,774,-1,0,-4,0,-22,689,-8,775],
    sm589=[0,-4,0,-4,0,-17,776,776,-10,776,776],
    sm590=[0,-1,777,778,-1,0,-4,0],
    sm591=[0,-4,0,-4,0,-17,779,779,-3,780,-6,779],
    sm592=[0,-2,781,-1,0,-4,0],
    sm593=[0,-4,0,-4,0,-18,782],
    sm594=[0,-4,0,-4,0,-18,783],
    sm595=[0,-4,0,-4,0,-3,784],
    sm596=[0,-4,0,-4,0,-18,785,-10,786,786],
    sm597=[0,-4,0,-4,0,-18,787,-10,788,789],
    sm598=[0,-4,0,-4,0,-18,790,-10,790,790],
    sm599=[0,-4,0,-4,0,-18,791,-10,791,791],
    sm600=[0,-4,0,-4,0,-18,792,-10,792,792],
    sm601=[0,-4,0,-4,0,-18,793,-10,793,793],
    sm602=[0,-4,0,-4,0,-22,780,-43,706],
    sm603=[0,-2,794,-1,0,-4,0],
    sm604=[0,-2,617,-1,0,-4,0,-4,795,-14,796,-4,530],
    sm605=[0,-4,0,-4,0,-17,797,797],
    sm606=[0,-4,0,-4,0,-19,798],
    sm607=[0,-4,0,-4,0,-5,799,-12,799,799,-4,799,-32,799],
    sm608=[0,-2,800,-1,0,-4,0,-4,800,-14,800,-4,800],
    sm609=[0,-2,801,-1,0,-4,0,-4,802,-14,801,-4,801],
    sm610=[0,-2,803,-1,0,-4,0,-4,803,-14,803,-4,803],
    sm611=[0,-2,804,-1,0,-4,0,-4,804,-14,804,-4,804],
    sm612=[0,-2,617,-1,0,-4,0,-4,805,-14,805,-4,805],
    sm613=[0,-4,806,-4,0,-3,807,-18,808],
    sm614=[0,-4,0,-4,0,-8,809,-8,809,809,-4,809,-5,809,809,-18,809,809,809,-5,809],
    sm615=[0,-4,0,-4,0,-8,810,-8,810,810,-4,810,-5,810,810,-18,810,810,810,-5,810],
    sm616=[0,-4,0,-4,0,-54,627,628,-1,629,811,-7,631],
    sm617=[0,-4,0,-4,0,-58,812,-7,714],
    sm618=[0,-4,0,-4,0,-8,813,-8,813,813,-4,813,-5,813,813,-18,813,813,813,-5,813],
    sm619=[0,-4,0,-4,0,-58,814,-7,714],
    sm620=[0,-4,0,-4,0,-54,815,815,-1,815,815,-7,815],
    sm621=[0,-4,0,-4,0,-58,816,-7,816],
    sm622=[0,-4,0,-4,0,-66,729],
    sm623=[0,-4,0,-4,0,-54,817,817,-1,817,817,-7,817],
    sm624=[0,-4,0,-4,0,-39,818,-10,818,-3,818,818,-1,818,818,818,818,818,-4,818],
    sm625=[0,-2,819,-1,0,-4,0,-52,819],
    sm626=[0,-4,0,-4,0,-54,820,820,-1,820,820,-7,820],
    sm627=[0,-4,0,-4,0,-54,821,821,-1,821,821,-7,821],
    sm628=[0,-4,0,-4,0,-39,822,-10,823,-7,824,825,826,827],
    sm629=[0,-2,717,-1,0,-4,0],
    sm630=[0,-4,0,-4,0,-53,719],
    sm631=[0,-4,0,-4,0,-22,828,-31,829,829,-1,829,829,-7,829],
    sm632=[0,-4,0,-4,0,-58,830,-7,830],
    sm633=[0,-2,728,-1,0,-4,0],
    sm634=[0,-4,0,-4,0,-58,831,-7,729],
    sm635=[0,-4,0,-4,0,-58,832,-7,832],
    sm636=[0,-4,0,-4,0,-13,833],
    sm637=[0,834,834,834,-1,0,-4,0,-4,834,834,-1,834,834,-6,834,834,834,834,834,-2,834,834,-14,834,834,-1,834,-1,834,-5,834,834,834,834,834,-1,834,-1,834,834,834,-1,834,-4,834,-2,834,834,834,834,-1,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,-2,834,834,-5,834,834,-2,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,834,-4,834,834,834,834,834,834],
    sm638=[0,-4,0,-4,0,-19,835],
    sm639=[0,-4,0,-4,0,-19,836],
    sm640=[0,-4,0,-4,0,-19,837],
    sm641=[0,838,838,838,-1,0,-4,0,-4,838,838,-12,838,838,-2,838,-26,838,838,-6,838,-11,838,838,838,838,-1,838,838,838,838,838,838,-1,838,838,838,838,838,838,838,838,838,-2,838,838,-5,838,838,-2,838,-23,838,-1,838,838,838,838,838,838,-4,838,838,838,838,838,838],
    sm642=[0,839,839,839,-1,0,-4,0,-4,839,839,-12,839,839,-2,839,-26,839,839,-6,839,-11,839,839,839,839,-1,839,839,839,839,839,839,-1,839,839,839,839,839,839,839,839,839,-2,839,839,-5,839,839,-2,839,-23,839,-1,839,839,839,839,839,839,-4,839,839,839,839,839,839],
    sm643=[0,840,840,840,-1,0,-4,0,-4,840,840,-12,840,840,-2,840,-26,840,840,-6,840,-11,840,840,840,840,-1,840,840,840,840,840,840,-1,840,840,840,840,840,840,840,840,840,-2,840,840,-5,840,840,-2,840,-23,840,-1,840,840,840,840,840,840,-4,840,840,840,840,840,840],
    sm644=[0,-4,0,-4,0,-23,841],
    sm645=[0,842,842,842,-1,0,-4,0,-4,842,842,-12,842,842,-2,842,-26,842,842,-6,842,-11,842,842,842,842,-1,842,842,842,842,842,842,-1,842,842,842,842,842,842,842,842,842,-2,842,842,-5,842,842,-2,842,-23,842,-1,842,842,842,842,842,842,-4,842,842,842,842,842,842],
    sm646=[0,843,843,843,-1,0,-4,0,-4,843,843,-12,843,843,-2,843,-26,843,843,-6,843,-11,843,843,843,843,-1,843,843,843,843,843,843,-1,843,843,843,843,843,843,843,843,843,-2,843,843,-5,843,843,-2,843,-23,843,-1,843,843,843,843,843,843,-4,843,843,843,843,843,843],
    sm647=[0,844,844,844,-1,0,-4,0,-4,844,844,-12,844,844,-2,844,-26,844,844,-6,844,-11,844,844,844,844,-1,844,844,844,844,844,844,-1,844,844,844,844,844,844,844,844,844,-2,844,844,-5,844,844,-2,844,-23,844,-1,844,844,844,844,844,844,-4,844,844,844,844,844,844],
    sm648=[0,845,845,845,-1,0,-4,0,-4,845,845,-12,845,845,-2,845,-26,845,845,-6,845,-11,845,845,845,845,-1,845,845,845,845,845,845,-1,845,845,845,845,845,845,845,845,845,-2,845,845,-5,845,845,-2,845,-23,845,-1,845,845,845,845,845,845,-4,845,845,845,845,845,845],
    sm649=[0,846,846,846,-1,0,-4,0,-4,846,846,-12,846,846,-2,846,-26,846,846,-6,846,-11,846,846,846,846,-1,846,846,846,846,846,846,-1,846,846,846,846,846,846,846,846,846,-2,846,846,-5,846,846,-2,846,-23,846,-1,846,846,846,846,846,846,-4,846,846,846,846,846,846],
    sm650=[0,-4,0,-4,0,-19,847],
    sm651=[0,848,848,848,-1,0,-4,0,-4,848,848,-12,848,848,-2,848,-26,848,848,-6,848,-11,848,848,848,848,-1,848,848,848,848,848,848,-1,848,848,848,848,848,848,848,848,848,-2,848,848,-5,848,848,-2,848,-23,848,-1,848,848,848,848,848,848,-4,848,848,848,848,848,848],
    sm652=[0,-1,2,3,-1,0,-4,0,-4,4,51,-12,6,849,-2,7,-26,8,9,-18,849,10,11,12,-1,13,-1,14,15,16,17,-1,18,19,20,21,22,23,24,849,25,-2,26,27,-5,28,29,-2,30,-23,31,-1,32,33,34,35,36,37,-4,38,39,40,41,42,43],
    sm653=[0,-4,0,-4,0,-19,850,-68,850],
    sm654=[0,851,-3,851,-4,851,-3,851,851,851,-8,851,-130,851],
    sm655=[0,-2,852,-1,852,-4,852,-3,852,-1,852,-1,852,852,-5,852,-124,852,852,-4,852],
    sm656=[0,-4,0,-4,0,-8,853],
    sm657=[0,-4,0,-4,0,-18,529,854,-37,531],
    sm658=[0,-4,0,-4,0,-17,855,855,-10,769],
    sm659=[0,-4,0,-4,0,-17,779,779,-10,779],
    sm660=[0,-4,0,-4,0,-17,855,855],
    sm661=[0,-4,0,-4,0,-17,856,856,-10,772,856],
    sm662=[0,-4,0,-4,0,-17,857,857,-10,857,773],
    sm663=[0,-4,0,-4,0,-17,858,858,-10,858,858],
    sm664=[0,-4,0,-4,0,-17,859,859,-10,859,859],
    sm665=[0,-4,0,-4,0,-17,767,767,-10,767,767],
    sm666=[0,-4,0,-4,0,-22,780],
    sm667=[0,-4,0,-4,0,-23,860],
    sm668=[0,-4,861,-4,0,-3,862,-1,863,-2,863,-14,864,-14,863,863,-26,863],
    sm669=[0,-4,0,-4,0,-23,865],
    sm670=[0,-4,0,-4,0,-5,866,-2,867,-29,868,869,-26,870],
    sm671=[0,-4,0,-4,0,-5,871,-2,872,-29,873,874],
    sm672=[0,-4,0,-4,0,-5,875,-1,876,875,-14,875,-14,875,875,-2,877,878,879],
    sm673=[0,-4,0,-4,0,-5,875,-2,875,-14,875,-14,875,875],
    sm674=[0,-4,880,-4,0,-3,881,-19,882],
    sm675=[0,-1,883,-2,0,-4,0,-27,884,885],
    sm676=[0,-4,0,-4,0,-3,886,-135,887],
    sm677=[0,-4,0,-4,0,-3,888,-135,888,888],
    sm678=[0,-4,0,-4,0,-3,886,-136,889],
    sm679=[0,-4,0,-4,0,-18,890,-10,788,789],
    sm680=[0,-4,0,-4,0,-18,786,-10,786,786],
    sm681=[0,-4,0,-4,0,-18,890,-10,788,890],
    sm682=[0,-4,0,-4,0,-18,890,-10,890,789],
    sm683=[0,-4,0,-4,0,-18,891,-10,891,891],
    sm684=[0,-4,0,-4,0,-18,892,-10,892,892],
    sm685=[0,-4,0,-4,0,-18,893,-10,893,893],
    sm686=[0,-4,0,-4,0,-18,894,-10,894,894],
    sm687=[0,-4,861,-4,0,-3,862,-19,864],
    sm688=[0,-4,0,-4,0,-19,895],
    sm689=[0,-4,0,-4,0,-5,896,-12,896,896,-4,896,-32,896],
    sm690=[0,-2,617,-1,0,-4,0,-4,897,-14,897,-4,897],
    sm691=[0,-2,898,-1,0,-4,0,-4,898,-14,898,-4,898],
    sm692=[0,-2,899,-1,806,-4,0,-3,807,899,-13,899,899,-2,808,-1,899,-4,899,899,-101,900],
    sm693=[0,-2,901,-1,806,-4,0,-3,807,901,-13,901,901,-2,901,901,901,-4,901,901,-101,901],
    sm694=[0,-2,902,-1,902,-4,0,-3,902,902,-13,902,902,-2,902,902,902,-4,902,902,-101,902],
    sm695=[0,-2,903,-1,903,-4,0,-3,903,903,-13,903,903,-2,903,903,903,-4,903,903,-101,903],
    sm696=[0,-4,0,-4,0,-58,904,-7,714],
    sm697=[0,-4,0,-4,0,-8,905,-8,905,905,-4,905,-5,905,905,-18,905,905,905,-5,905],
    sm698=[0,-4,0,-4,0,-54,906,906,-1,906,906,-7,906],
    sm699=[0,-2,907,908,0,-4,0],
    sm700=[0,-4,0,-4,0,-39,909],
    sm701=[0,-2,910,910,0,-4,0],
    sm702=[0,-4,0,-4,0,-54,911,911,-1,911,911,-7,911],
    sm703=[0,-4,0,-4,0,-58,912,-7,912],
    sm704=[0,-4,0,-4,0,-8,913],
    sm705=[0,914,914,914,-1,0,-4,0,-4,914,914,-1,914,914,-6,914,914,914,914,914,-2,914,914,-14,914,914,-1,914,-1,914,-5,914,914,914,914,914,-1,914,-1,914,914,914,-1,914,-4,914,-2,914,914,914,914,-1,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,-2,914,914,-5,914,914,-2,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,914,-4,914,914,914,914,914,914],
    sm706=[0,-1,915,915,-1,0,-4,0,-4,915,-12,915,-1,915,-37,915,-38,915,915,915,-40,915,915,-3,915],
    sm707=[0,-1,916,916,-1,0,-4,0,-4,916,-12,916,-1,916,-37,916,-38,916,916,916,-40,916,916,-3,916],
    sm708=[0,-4,0,-4,0,-19,917],
    sm709=[0,918,918,918,-1,0,-4,0,-4,918,918,-12,918,918,-2,918,-26,918,918,-6,918,-11,918,918,918,918,-1,918,918,918,918,918,918,-1,918,918,918,918,918,918,918,918,918,-2,918,918,-5,918,918,-2,918,-23,918,-1,918,918,918,918,918,918,-4,918,918,918,918,918,918],
    sm710=[0,919,919,919,-1,0,-4,0,-4,919,919,-12,919,919,-2,919,-26,919,919,-6,919,-11,919,919,919,919,-1,919,919,919,919,919,919,-1,919,919,919,919,919,919,919,919,919,-2,919,919,-5,919,919,-2,919,-23,919,-1,919,919,919,919,919,919,-4,919,919,919,919,919,919],
    sm711=[0,920,920,920,-1,0,-4,0,-4,920,920,-12,920,920,-2,920,-26,920,920,-6,920,-11,920,920,920,920,-1,920,920,920,920,920,920,-1,920,920,920,920,920,920,920,920,920,-2,920,920,-5,920,920,-2,920,-23,920,-1,920,920,920,920,920,920,-4,920,920,920,920,920,920],
    sm712=[0,921,921,921,-1,0,-4,0,-4,921,921,-12,921,921,-2,921,-26,921,921,-6,921,-11,921,921,921,921,-1,921,921,921,921,921,921,-1,921,921,921,921,921,921,921,921,921,-2,921,921,-5,921,921,-2,921,-23,921,-1,921,921,921,921,921,921,-4,921,921,921,921,921,921],
    sm713=[0,922,922,922,-1,0,-4,0,-4,922,922,-12,922,922,-2,922,-26,922,922,-6,922,-11,922,922,922,922,-1,922,922,922,922,922,922,-1,922,922,922,922,922,922,922,922,922,-2,922,922,-5,922,922,-2,922,-23,922,-1,922,922,922,922,922,922,-4,922,922,922,922,922,922],
    sm714=[0,-4,0,-4,0,-19,923,-49,923,-18,923],
    sm715=[0,924,-3,924,-4,924,-3,924,924,924,-8,924,-130,924],
    sm716=[0,-4,0,-4,0,-19,925],
    sm717=[0,-4,0,-4,0,-18,529,926,-37,531],
    sm718=[0,-4,0,-4,0,-18,927,927,-37,927],
    sm719=[0,-4,0,-4,0,-17,928,928],
    sm720=[0,-4,0,-4,0,-17,929,929],
    sm721=[0,-4,0,-4,0,-17,930,930,-10,770,770],
    sm722=[0,-4,0,-4,0,-17,931,931,-10,931,931],
    sm723=[0,-4,0,-4,0,-17,932,932,-10,932,932],
    sm724=[0,-4,0,-4,0,-17,933,933,-10,933,933],
    sm725=[0,-4,861,-4,0,-3,862,-19,934],
    sm726=[0,-4,0,-4,0,-17,935,935,-10,935,935],
    sm727=[0,-4,936,-4,0,-3,936,-19,936],
    sm728=[0,-4,937,-4,0,-3,937,-19,937],
    sm729=[0,-1,777,938,-1,0,-4,0],
    sm730=[0,-1,939,939,-1,0,-4,0],
    sm731=[0,-1,939,939,-1,0,-4,0,-39,940],
    sm732=[0,-2,938,-1,0,-4,0],
    sm733=[0,-2,941,-1,0,-4,0],
    sm734=[0,-2,942,-1,0,-4,0],
    sm735=[0,-2,943,-1,0,-4,0],
    sm736=[0,-2,943,-1,0,-4,0,-39,944],
    sm737=[0,-4,0,-4,0,-5,945,-2,945,-14,945,-14,945,945],
    sm738=[0,-1,946,-2,0,-4,0],
    sm739=[0,-4,0,-4,0,-5,947,-2,947,-14,947,-14,947,947],
    sm740=[0,-4,880,-4,0,-3,881,-19,948],
    sm741=[0,-4,949,-4,0,-3,949,-19,949],
    sm742=[0,-4,950,-4,0,-3,950,-19,950],
    sm743=[0,-1,883,-2,0,-4,0,-19,951,-7,884,885],
    sm744=[0,-1,952,-2,0,-4,0,-19,952,-7,952,952],
    sm745=[0,-4,0,-4,0,-17,953,954],
    sm746=[0,-4,0,-4,0,-17,955,955],
    sm747=[0,-4,0,-4,0,-17,956,956],
    sm748=[0,-4,0,-4,0,-41,957],
    sm749=[0,-4,0,-4,0,-18,958],
    sm750=[0,-4,0,-4,0,-3,959,-135,959,959],
    sm751=[0,-4,0,-4,0,-19,960],
    sm752=[0,-4,0,-4,0,-18,961,-10,961,961],
    sm753=[0,-4,0,-4,0,-18,962,-10,962,962],
    sm754=[0,-4,0,-4,0,-18,963,-10,788,789],
    sm755=[0,-4,0,-4,0,-18,964,-10,788,789],
    sm756=[0,-4,0,-4,0,-5,965,-12,965,965,-4,965,-32,965],
    sm757=[0,-2,966,-1,0,-4,0,-4,966,-14,966,-4,966],
    sm758=[0,-2,967,-1,0,-4,0,-4,967,-13,967,967,-4,967,-4,967,967],
    sm759=[0,-2,968,-1,806,-4,0,-3,807,968,-13,968,968,-2,808,968,968,-4,968,968,-101,968],
    sm760=[0,-4,0,-4,0,-65,969],
    sm761=[0,-2,970,-1,970,-4,0,-3,970,970,-13,970,970,-2,970,970,970,-4,970,970,-101,970],
    sm762=[0,-4,806,-4,0,-3,807,-18,808,971],
    sm763=[0,-4,0,-4,0,-8,972,-8,972,972,-4,972,-5,972,972,-18,972,972,972,-5,972],
    sm764=[0,-4,0,-4,0,-58,973,-3,974,975],
    sm765=[0,-4,0,-4,0,-58,976,-3,976,976],
    sm766=[0,-2,977,977,0,-4,0],
    sm767=[0,-4,0,-4,0,-23,978],
    sm768=[0,-1,979,979,-1,0,-4,0,-4,979,-12,979,-1,979,-37,979,-38,979,979,979,-40,979,979,-3,979],
    sm769=[0,980,980,980,-1,0,-4,0,-4,980,980,-12,980,980,-2,980,-26,980,980,-6,980,-11,980,980,980,980,-1,980,980,980,980,980,980,-1,980,980,980,980,980,980,980,980,980,-2,980,980,-5,980,980,-2,980,-23,980,-1,980,980,980,980,980,980,-4,980,980,980,980,980,980],
    sm770=[0,-4,0,-4,0,-4,981],
    sm771=[0,-4,0,-4,0,-18,982,982,-37,982],
    sm772=[0,-4,0,-4,0,-17,983,983,-10,983,983],
    sm773=[0,-4,984,-4,0,-3,984,-19,984],
    sm774=[0,-4,0,-4,0,-23,985],
    sm775=[0,-4,0,-4,0,-23,875],
    sm776=[0,-4,0,-4,0,-23,863],
    sm777=[0,-4,0,-4,0,-23,986],
    sm778=[0,-1,987,987,-1,0,-4,0],
    sm779=[0,-4,0,-4,0,-8,988],
    sm780=[0,-4,0,-4,0,-5,989,-32,990],
    sm781=[0,-2,991,-1,0,-4,0],
    sm782=[0,-4,0,-4,0,-5,992,-2,992,-14,992,-14,992,992],
    sm783=[0,-4,993,-4,0,-3,993,-19,993],
    sm784=[0,-4,0,-4,0,-4,994],
    sm785=[0,-1,995,-2,0,-4,0,-19,995,-7,995,995],
    sm786=[0,-4,0,-4,0,-17,996,996],
    sm787=[0,-4,0,-4,0,-4,997],
    sm788=[0,-2,998,-1,0,-4,0,-4,998,-13,998,998,-4,998,-4,998,998],
    sm789=[0,-2,999,-1,999,-4,0,-3,999,999,-13,999,999,-2,999,999,999,-4,999,999,-101,999],
    sm790=[0,-4,0,-4,0,-58,1000],
    sm791=[0,-4,0,-4,0,-54,1001,1001,-1,1001,1001,-7,1001],
    sm792=[0,-4,0,-4,0,-58,1002],
    sm793=[0,-4,0,-4,0,-54,1003,1003,-1,1003,1003,-7,1003],
    sm794=[0,-1,1004,1004,-1,0,-4,0,-39,1005],
    sm795=[0,-1,1006,1006,-1,0,-4,0],
    sm796=[0,-2,617,-1,0,-4,0,-4,1007,-14,1008,-4,530],
    sm797=[0,-4,0,-4,0,-17,1009,1009],
    sm798=[0,-4,0,-4,0,-54,1010,1010,-1,1010,1010,-7,1010],
    sm799=[0,-4,0,-4,0,-23,1011],
    sm800=[0,-1,1012,1012,-1,0,-4,0],
    sm801=[0,-4,0,-4,0,-19,1013],
    sm802=[0,-1,1014,-2,0,-4,0,-19,1014,-7,1014,1014],
    sm803=[0,-4,0,-4,0,-19,1015],
    sm804=[0,-1,1016,-2,0,-4,0,-19,1016,-7,1016,1016],

        // Symbol Lookup map
        lu = new Map([[1,1],[2,2],[4,3],[8,4],[16,5],[32,6],[64,7],[128,8],[256,9],[512,10],[3,11],[264,11],[200,13],[";",14],["<",15],["import",16],["/",17],[">",18],["\"",149],["f",20],["filter",21],["style",22],["script",23],["((",24],["))",25],[")(",26],[",",27],["{",28],["}",29],[null,9],["supports",31],["(",32],[")",33],["@",34],["keyframes",35],["id",36],["from",37],["to",38],["and",39],["or",40],["not",41],["media",43],["only",44],[":",76],["<=",48],["=",49],["%",51],["px",52],["in",53],["rad",54],["url",55],["'",150],["[",67],["]",68],["+",59],["~",60],["||",61],["*",62],["|",63],["#",64],[".",65],["^=",69],["$=",70],["*=",71],["i",72],["s",73],["!",142],["important",75],["as",77],["export",78],["default",79],["function",80],["class",81],["let",82],["async",83],["if",84],["else",85],["do",86],["while",87],["for",88],["var",89],["of",90],["await",91],["continue",92],["break",93],["return",94],["throw",95],["with",96],["switch",97],["case",98],["try",99],["catch",100],["finally",101],["debugger",102],["const",103],["=>",104],["extends",105],["static",106],["get",107],["set",108],["new",109],["super",110],["target",111],["...",112],["this",113],["/=",114],["%=",115],["+=",116],["-=",117],["<<=",118],[">>=",119],[">>>=",120],["&=",121],["|=",122],["**=",123],["?",124],["&&",125],["^",126],["&",127],["==",128],["!=",129],["===",130],["!==",131],[">=",132],["instanceof",133],["<<",134],[">>",135],[">>>",136],["-",137],["**",138],["delete",139],["void",140],["typeof",141],["++",143],["--",144],["null",151],["true",152],["false",153],["$",154],["</",155],["input",156],["area",157],["base",158],["br",159],["col",160],["command",161],["embed",162],["hr",163],["img",164],["keygen",165],["link",166],["meta",167],["param",168],["source",169],["track",170],["wbr",171],["│",173]]),

        //Reverse Symbol Lookup map
        rlu = new Map([[1,1],[2,2],[3,4],[4,8],[5,16],[6,32],[7,64],[8,128],[9,256],[10,512],[11,3],[11,264],[13,200],[14,";"],[15,"<"],[16,"import"],[17,"/"],[18,">"],[149,"\""],[20,"f"],[21,"filter"],[22,"style"],[23,"script"],[24,"(("],[25,"))"],[26,")("],[27,","],[28,"{"],[29,"}"],[9,null],[31,"supports"],[32,"("],[33,")"],[34,"@"],[35,"keyframes"],[36,"id"],[37,"from"],[38,"to"],[39,"and"],[40,"or"],[41,"not"],[43,"media"],[44,"only"],[76,":"],[48,"<="],[49,"="],[51,"%"],[52,"px"],[53,"in"],[54,"rad"],[55,"url"],[150,"'"],[67,"["],[68,"]"],[59,"+"],[60,"~"],[61,"||"],[62,"*"],[63,"|"],[64,"#"],[65,"."],[69,"^="],[70,"$="],[71,"*="],[72,"i"],[73,"s"],[142,"!"],[75,"important"],[77,"as"],[78,"export"],[79,"default"],[80,"function"],[81,"class"],[82,"let"],[83,"async"],[84,"if"],[85,"else"],[86,"do"],[87,"while"],[88,"for"],[89,"var"],[90,"of"],[91,"await"],[92,"continue"],[93,"break"],[94,"return"],[95,"throw"],[96,"with"],[97,"switch"],[98,"case"],[99,"try"],[100,"catch"],[101,"finally"],[102,"debugger"],[103,"const"],[104,"=>"],[105,"extends"],[106,"static"],[107,"get"],[108,"set"],[109,"new"],[110,"super"],[111,"target"],[112,"..."],[113,"this"],[114,"/="],[115,"%="],[116,"+="],[117,"-="],[118,"<<="],[119,">>="],[120,">>>="],[121,"&="],[122,"|="],[123,"**="],[124,"?"],[125,"&&"],[126,"^"],[127,"&"],[128,"=="],[129,"!="],[130,"==="],[131,"!=="],[132,">="],[133,"instanceof"],[134,"<<"],[135,">>"],[136,">>>"],[137,"-"],[138,"**"],[139,"delete"],[140,"void"],[141,"typeof"],[143,"++"],[144,"--"],[151,"null"],[152,"true"],[153,"false"],[154,"$"],[155,"</"],[156,"input"],[157,"area"],[158,"base"],[159,"br"],[160,"col"],[161,"command"],[162,"embed"],[163,"hr"],[164,"img"],[165,"keygen"],[166,"link"],[167,"meta"],[168,"param"],[169,"source"],[170,"track"],[171,"wbr"],[173,"│"]]),

        // States 
        state = [sm0,
    sm1,
    sm2,
    sm2,
    sm3,
    sm4,
    sm5,
    sm6,
    sm7,
    sm8,
    sm9,
    sm10,
    sm10,
    sm11,
    sm11,
    sm11,
    sm11,
    sm11,
    sm11,
    sm11,
    sm11,
    sm11,
    sm11,
    sm11,
    sm11,
    sm11,
    sm11,
    sm12,
    sm13,
    sm14,
    sm15,
    sm16,
    sm17,
    sm18,
    sm19,
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
    sm29,
    sm30,
    sm31,
    sm32,
    sm33,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm35,
    sm34,
    sm34,
    sm36,
    sm37,
    sm38,
    sm39,
    sm40,
    sm40,
    sm40,
    sm41,
    sm42,
    sm42,
    sm42,
    sm42,
    sm43,
    sm44,
    sm45,
    sm46,
    sm47,
    sm48,
    sm48,
    sm49,
    sm49,
    sm49,
    sm49,
    sm50,
    sm50,
    sm51,
    sm52,
    sm53,
    sm54,
    sm55,
    sm56,
    sm57,
    sm58,
    sm58,
    sm34,
    sm59,
    sm60,
    sm61,
    sm62,
    sm63,
    sm64,
    sm65,
    sm65,
    sm66,
    sm67,
    sm68,
    sm69,
    sm70,
    sm71,
    sm72,
    sm73,
    sm34,
    sm74,
    sm75,
    sm76,
    sm77,
    sm78,
    sm79,
    sm79,
    sm79,
    sm80,
    sm81,
    sm82,
    sm62,
    sm83,
    sm84,
    sm85,
    sm86,
    sm87,
    sm88,
    sm89,
    sm90,
    sm91,
    sm92,
    sm93,
    sm34,
    sm34,
    sm34,
    sm94,
    sm95,
    sm96,
    sm96,
    sm96,
    sm96,
    sm96,
    sm96,
    sm96,
    sm96,
    sm96,
    sm96,
    sm96,
    sm96,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm34,
    sm97,
    sm35,
    sm98,
    sm99,
    sm100,
    sm42,
    sm101,
    sm102,
    sm103,
    sm104,
    sm105,
    sm106,
    sm107,
    sm108,
    sm109,
    sm110,
    sm111,
    sm112,
    sm113,
    sm114,
    sm115,
    sm34,
    sm116,
    sm34,
    sm114,
    sm117,
    sm118,
    sm38,
    sm119,
    sm120,
    sm121,
    sm122,
    sm123,
    sm124,
    sm125,
    sm125,
    sm125,
    sm125,
    sm125,
    sm125,
    sm125,
    sm126,
    sm123,
    sm127,
    sm128,
    sm128,
    sm128,
    sm128,
    sm128,
    sm128,
    sm128,
    sm129,
    sm130,
    sm62,
    sm131,
    sm114,
    sm34,
    sm132,
    sm133,
    sm134,
    sm135,
    sm136,
    sm137,
    sm138,
    sm139,
    sm140,
    sm141,
    sm142,
    sm142,
    sm143,
    sm144,
    sm34,
    sm145,
    sm34,
    sm146,
    sm147,
    sm34,
    sm148,
    sm149,
    sm150,
    sm151,
    sm152,
    sm153,
    sm154,
    sm34,
    sm155,
    sm156,
    sm157,
    sm158,
    sm159,
    sm160,
    sm161,
    sm162,
    sm162,
    sm163,
    sm164,
    sm165,
    sm166,
    sm166,
    sm166,
    sm166,
    sm166,
    sm166,
    sm166,
    sm166,
    sm166,
    sm166,
    sm166,
    sm166,
    sm166,
    sm166,
    sm166,
    sm166,
    sm166,
    sm166,
    sm167,
    sm168,
    sm168,
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
    sm140,
    sm140,
    sm178,
    sm179,
    sm166,
    sm180,
    sm181,
    sm182,
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
    sm195,
    sm196,
    sm197,
    sm198,
    sm199,
    sm200,
    sm201,
    sm202,
    sm203,
    sm204,
    sm205,
    sm206,
    sm207,
    sm208,
    sm209,
    sm210,
    sm211,
    sm212,
    sm212,
    sm34,
    sm213,
    sm214,
    sm215,
    sm216,
    sm217,
    sm216,
    sm34,
    sm218,
    sm219,
    sm220,
    sm220,
    sm221,
    sm221,
    sm222,
    sm222,
    sm34,
    sm223,
    sm224,
    sm225,
    sm226,
    sm227,
    sm34,
    sm228,
    sm229,
    sm230,
    sm231,
    sm232,
    sm233,
    sm232,
    sm234,
    sm235,
    sm236,
    sm237,
    sm238,
    sm239,
    sm240,
    sm241,
    sm242,
    sm14,
    sm243,
    sm244,
    sm244,
    sm245,
    sm62,
    sm246,
    sm34,
    sm246,
    sm247,
    sm248,
    sm249,
    sm114,
    sm250,
    sm251,
    sm252,
    sm253,
    sm254,
    sm255,
    sm256,
    sm257,
    sm62,
    sm258,
    sm259,
    sm260,
    sm261,
    sm262,
    sm263,
    sm264,
    sm265,
    sm266,
    sm62,
    sm267,
    sm268,
    sm269,
    sm62,
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
    sm74,
    sm280,
    sm281,
    sm282,
    sm283,
    sm284,
    sm285,
    sm286,
    sm287,
    sm288,
    sm289,
    sm290,
    sm291,
    sm292,
    sm293,
    sm294,
    sm295,
    sm296,
    sm297,
    sm298,
    sm299,
    sm300,
    sm301,
    sm302,
    sm303,
    sm302,
    sm304,
    sm305,
    sm306,
    sm307,
    sm308,
    sm309,
    sm310,
    sm311,
    sm312,
    sm174,
    sm313,
    sm62,
    sm314,
    sm314,
    sm34,
    sm315,
    sm316,
    sm317,
    sm317,
    sm318,
    sm319,
    sm320,
    sm321,
    sm322,
    sm323,
    sm324,
    sm325,
    sm34,
    sm174,
    sm326,
    sm327,
    sm328,
    sm329,
    sm330,
    sm331,
    sm332,
    sm333,
    sm334,
    sm62,
    sm335,
    sm335,
    sm336,
    sm337,
    sm338,
    sm339,
    sm340,
    sm341,
    sm341,
    sm342,
    sm343,
    sm62,
    sm344,
    sm345,
    sm346,
    sm347,
    sm346,
    sm346,
    sm348,
    sm349,
    sm349,
    sm350,
    sm66,
    sm34,
    sm66,
    sm351,
    sm352,
    sm353,
    sm354,
    sm355,
    sm356,
    sm357,
    sm358,
    sm359,
    sm34,
    sm34,
    sm34,
    sm34,
    sm360,
    sm357,
    sm357,
    sm361,
    sm62,
    sm362,
    sm62,
    sm363,
    sm66,
    sm364,
    sm62,
    sm365,
    sm281,
    sm366,
    sm367,
    sm368,
    sm369,
    sm369,
    sm370,
    sm371,
    sm372,
    sm373,
    sm373,
    sm34,
    sm374,
    sm375,
    sm376,
    sm377,
    sm378,
    sm379,
    sm380,
    sm374,
    sm381,
    sm14,
    sm382,
    sm383,
    sm384,
    sm385,
    sm386,
    sm387,
    sm388,
    sm389,
    sm390,
    sm391,
    sm392,
    sm393,
    sm394,
    sm395,
    sm395,
    sm396,
    sm397,
    sm398,
    sm399,
    sm400,
    sm401,
    sm402,
    sm62,
    sm403,
    sm404,
    sm405,
    sm34,
    sm406,
    sm407,
    sm408,
    sm409,
    sm410,
    sm411,
    sm412,
    sm413,
    sm413,
    sm414,
    sm415,
    sm416,
    sm417,
    sm418,
    sm419,
    sm420,
    sm421,
    sm34,
    sm422,
    sm66,
    sm423,
    sm34,
    sm34,
    sm424,
    sm425,
    sm66,
    sm426,
    sm427,
    sm428,
    sm429,
    sm34,
    sm430,
    sm431,
    sm431,
    sm34,
    sm432,
    sm433,
    sm434,
    sm435,
    sm436,
    sm436,
    sm437,
    sm438,
    sm439,
    sm440,
    sm440,
    sm441,
    sm442,
    sm443,
    sm443,
    sm443,
    sm444,
    sm445,
    sm446,
    sm446,
    sm380,
    sm438,
    sm447,
    sm448,
    sm449,
    sm450,
    sm450,
    sm451,
    sm452,
    sm453,
    sm454,
    sm454,
    sm455,
    sm456,
    sm457,
    sm458,
    sm459,
    sm460,
    sm461,
    sm462,
    sm463,
    sm464,
    sm465,
    sm466,
    sm467,
    sm468,
    sm469,
    sm470,
    sm471,
    sm472,
    sm473,
    sm474,
    sm475,
    sm476,
    sm476,
    sm477,
    sm478,
    sm479,
    sm478,
    sm66,
    sm480,
    sm481,
    sm482,
    sm66,
    sm483,
    sm66,
    sm484,
    sm485,
    sm486,
    sm487,
    sm488,
    sm489,
    sm66,
    sm66,
    sm490,
    sm66,
    sm66,
    sm66,
    sm66,
    sm491,
    sm34,
    sm492,
    sm493,
    sm494,
    sm495,
    sm496,
    sm34,
    sm497,
    sm74,
    sm439,
    sm498,
    sm34,
    sm499,
    sm500,
    sm501,
    sm502,
    sm503,
    sm504,
    sm505,
    sm505,
    sm505,
    sm505,
    sm505,
    sm505,
    sm506,
    sm507,
    sm508,
    sm509,
    sm510,
    sm511,
    sm512,
    sm513,
    sm514,
    sm515,
    sm516,
    sm517,
    sm518,
    sm519,
    sm456,
    sm520,
    sm521,
    sm522,
    sm523,
    sm524,
    sm525,
    sm526,
    sm527,
    sm528,
    sm520,
    sm529,
    sm530,
    sm530,
    sm530,
    sm530,
    sm531,
    sm532,
    sm533,
    sm534,
    sm535,
    sm536,
    sm537,
    sm538,
    sm539,
    sm540,
    sm541,
    sm542,
    sm542,
    sm542,
    sm542,
    sm543,
    sm544,
    sm545,
    sm546,
    sm547,
    sm548,
    sm515,
    sm515,
    sm515,
    sm549,
    sm550,
    sm551,
    sm466,
    sm466,
    sm466,
    sm552,
    sm553,
    sm554,
    sm555,
    sm556,
    sm66,
    sm66,
    sm557,
    sm66,
    sm558,
    sm559,
    sm560,
    sm66,
    sm66,
    sm66,
    sm66,
    sm561,
    sm562,
    sm563,
    sm564,
    sm563,
    sm564,
    sm66,
    sm565,
    sm66,
    sm566,
    sm567,
    sm568,
    sm569,
    sm567,
    sm570,
    sm14,
    sm571,
    sm572,
    sm573,
    sm574,
    sm575,
    sm576,
    sm577,
    sm578,
    sm576,
    sm573,
    sm579,
    sm580,
    sm581,
    sm582,
    sm583,
    sm584,
    sm585,
    sm585,
    sm586,
    sm586,
    sm587,
    sm588,
    sm589,
    sm589,
    sm589,
    sm590,
    sm591,
    sm592,
    sm593,
    sm594,
    sm594,
    sm595,
    sm595,
    sm596,
    sm519,
    sm597,
    sm598,
    sm598,
    sm598,
    sm599,
    sm599,
    sm520,
    sm600,
    sm601,
    sm602,
    sm603,
    sm604,
    sm605,
    sm606,
    sm607,
    sm608,
    sm609,
    sm610,
    sm611,
    sm612,
    sm613,
    sm614,
    sm615,
    sm616,
    sm617,
    sm618,
    sm619,
    sm618,
    sm620,
    sm618,
    sm621,
    sm622,
    sm623,
    sm624,
    sm625,
    sm626,
    sm627,
    sm628,
    sm629,
    sm630,
    sm631,
    sm632,
    sm633,
    sm634,
    sm635,
    sm636,
    sm637,
    sm638,
    sm639,
    sm640,
    sm466,
    sm66,
    sm641,
    sm642,
    sm643,
    sm644,
    sm66,
    sm66,
    sm645,
    sm646,
    sm647,
    sm648,
    sm649,
    sm66,
    sm649,
    sm650,
    sm651,
    sm651,
    sm652,
    sm653,
    sm654,
    sm655,
    sm656,
    sm657,
    sm517,
    sm658,
    sm659,
    sm660,
    sm588,
    sm661,
    sm662,
    sm663,
    sm588,
    sm664,
    sm588,
    sm587,
    sm665,
    sm588,
    sm666,
    sm667,
    sm668,
    sm669,
    sm669,
    sm669,
    sm670,
    sm671,
    sm672,
    sm673,
    sm673,
    sm674,
    sm675,
    sm676,
    sm677,
    sm678,
    sm657,
    sm679,
    sm680,
    sm681,
    sm682,
    sm683,
    sm519,
    sm684,
    sm519,
    sm685,
    sm686,
    sm687,
    sm688,
    sm689,
    sm689,
    sm690,
    sm691,
    sm692,
    sm693,
    sm613,
    sm694,
    sm695,
    sm695,
    sm696,
    sm697,
    sm697,
    sm697,
    sm698,
    sm699,
    sm700,
    sm701,
    sm701,
    sm701,
    sm701,
    sm702,
    sm520,
    sm703,
    sm704,
    sm705,
    sm706,
    sm707,
    sm708,
    sm709,
    sm66,
    sm710,
    sm711,
    sm712,
    sm713,
    sm714,
    sm715,
    sm716,
    sm717,
    sm718,
    sm719,
    sm720,
    sm721,
    sm722,
    sm723,
    sm587,
    sm587,
    sm724,
    sm725,
    sm726,
    sm727,
    sm728,
    sm728,
    sm729,
    sm729,
    sm730,
    sm731,
    sm730,
    sm730,
    sm732,
    sm733,
    sm734,
    sm735,
    sm736,
    sm735,
    sm735,
    sm737,
    sm738,
    sm739,
    sm739,
    sm739,
    sm740,
    sm726,
    sm741,
    sm742,
    sm742,
    sm743,
    sm744,
    sm745,
    sm746,
    sm747,
    sm747,
    sm747,
    sm748,
    sm749,
    sm750,
    sm749,
    sm751,
    sm752,
    sm753,
    sm754,
    sm755,
    sm756,
    sm757,
    sm758,
    sm759,
    sm760,
    sm761,
    sm762,
    sm763,
    sm764,
    sm765,
    sm765,
    sm766,
    sm767,
    sm715,
    sm768,
    sm769,
    sm770,
    sm771,
    sm772,
    sm773,
    sm774,
    sm775,
    sm776,
    sm777,
    sm778,
    sm777,
    sm779,
    sm780,
    sm781,
    sm782,
    sm772,
    sm783,
    sm784,
    sm785,
    sm456,
    sm675,
    sm786,
    sm787,
    sm788,
    sm789,
    sm790,
    sm791,
    sm792,
    sm792,
    sm793,
    sm729,
    sm794,
    sm729,
    sm795,
    sm795,
    sm796,
    sm797,
    sm798,
    sm799,
    sm800,
    sm799,
    sm801,
    sm802,
    sm803,
    sm804],

    /************ Functions *************/

        max = Math.max, min = Math.min,

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
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
    e$2,
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
        
    redv = (ret, fn, plen, ln, t, e, o, l, s) => {        ln = max(o.length - plen, 0);        o[ln] = fn(o.slice(-plen), e, l, s, o, plen);        o.length = ln + 1;        return ret;    },
    rednv = (ret, Fn, plen, ln, t, e, o, l, s) => {        ln = max(o.length - plen, 0);        o[ln] = new Fn(o.slice(-plen), e, l, s, o, plen);        o.length = ln + 1;        return ret;    },
    redn = (ret, plen, t, e, o, l, s) => {        if(plen > 0){            let ln = max(o.length - plen, 0);            o[ln] = o[o.length -1];            o.length = ln + 1;        }        return ret;    },
    shftf = (ret, fn, t, e, o, l, s) => (fn(o, e, l, s), ret),
    R0_S=function (sym,env,lex,state,output,len) {return sym[0]},
    R0_IMPORT_TAG_list=function (sym,env,lex,state,output,len) {return (sym[0].push(sym[1]),sym[0])},
    R1_IMPORT_TAG_list=function (sym,env,lex,state,output,len) {return [sym[0]]},
    R0_html$BODY=function (sym,env,lex,state,output,len) {return (sym[1].import_list = sym[0],sym[1])},
    R0_html$ATTRIBUTE_BODY=function (sym,env,lex,state,output,len) {return sym[1]},
    I0_BASIC_BINDING=function (sym,env,lex,state,output,len) {env.start = lex.off+2;},
    R0_css$COMPLEX_SELECTOR_list=function (sym,env,lex,state,output,len) {return (sym[0].push(sym[2]),sym[0])},
    C0_css$RULE_SET=function (sym,env,lex,state,output,len) {this.selectors = sym[0];this.body = sym[2];},
    C0_css$keyframes=function (sym,env,lex,state,output,len) {this.keyframes = sym[4];},
    C0_css$keyframes_blocks=function (sym,env,lex,state,output,len) {this.selectors = sym[0];this.props = sym[2].props;},
    R0_css$general_enclosed6602_group_list=function (sym,env,lex,state,output,len) {return sym[0] + sym[1]},
    R1_css$general_enclosed6602_group_list=function (sym,env,lex,state,output,len) {return sym[0] + ""},
    R0_css$COMPLEX_SELECTOR=function (sym,env,lex,state,output,len) {return len > 1 ? [sym[0]].concat(sym[1]) : [sym[0]]},
    R0_css$declaration_list=function (sym,env,lex,state,output,len) {return {props : sym[0],at_rules : []}},
    R1_css$declaration_list=function (sym,env,lex,state,output,len) {return {props : [],at_rules : [sym[0]]}},
    R3_css$declaration_list=function (sym,env,lex,state,output,len) {return (sym[0].at_rules.push(sym[1]),sym[0])},
    R4_css$declaration_list=function (sym,env,lex,state,output,len) {return (sym[0].props.push(...sym[1]),sym[0])},
    R0_css$declaration_values=function (sym,env,lex,state,output,len) {return sym.join("")},
    C0_js$empty_statement=function (sym,env,lex,state,output,len) {this.type = "empty";},
    R1_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],sym[4],sym[6],sym[8])},
    I2_js$iteration_statement=function (sym,env,lex,state,output,len) {env.ASI = false;},
    I3_js$iteration_statement=function (sym,env,lex,state,output,len) {env.ASI = true;},
    R4_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(null,sym[4],sym[6],sym[8])},
    R5_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],null,sym[6],sym[8])},
    R6_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],sym[4],null,sym[8])},
    R7_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(null,null,sym[4],sym[6])},
    R8_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],null,null,sym[8])},
    R9_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(null,null,null,sym[5])},
    R10_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[3],sym[5],sym[7],sym[9])},
    R11_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[3],sym[5],null,sym[9])},
    R12_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[3],null,sym[7],sym[9])},
    R13_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[3],null,null,sym[9])},
    R14_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],sym[3],null,sym[6])},
    R15_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],null,sym[5],sym[6])},
    R16_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],null,null,sym[5])},
    R17_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_in_stmt(sym[2],sym[4],sym[6])},
    R18_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_in_stmt(sym[3],sym[5],sym[7])},
    R19_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_of_stmt(sym[2],sym[4],sym[6])},
    R20_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_of_stmt(sym[3],sym[5],sym[7],true)},
    R21_js$iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_of_stmt(sym[4],sym[6],sym[8],true)},
    R0_js$continue_statement=function (sym,env,lex,state,output,len) {return new env.functions.continue_stmt(sym[1])},
    R0_js$break_statement=function (sym,env,lex,state,output,len) {return new env.functions.break_stmt(sym[1])},
    R0_js$case_block=function (sym,env,lex,state,output,len) {return []},
    R1_js$case_block=function (sym,env,lex,state,output,len) {return sym[1].concat(sym[2].concat(sym[3]))},
    R3_js$case_block=function (sym,env,lex,state,output,len) {return sym[1].concat(sym[2])},
    R0_js$case_clauses=function (sym,env,lex,state,output,len) {return sym[0].concat(sym[1])},
    R0_js$case_clause=function (sym,env,lex,state,output,len) {return new env.functions.case_stmt(sym[1],sym[3])},
    R1_js$case_clause=function (sym,env,lex,state,output,len) {return new env.functions.case_stmt(sym[1])},
    R0_js$default_clause=function (sym,env,lex,state,output,len) {return new env.functions.default_case_stmt(sym[2])},
    R1_js$default_clause=function (sym,env,lex,state,output,len) {return new env.functions.default_case_stmt()},
    R0_js$try_statement=function (sym,env,lex,state,output,len) {return new env.functions.try_stmt(sym[1],sym[2])},
    R1_js$try_statement=function (sym,env,lex,state,output,len) {return new env.functions.try_stmt(sym[1],null,sym[2])},
    R3_js$try_statement=function (sym,env,lex,state,output,len) {return new env.functions.try_stmt(sym[1],sym[2],sym[3])},
    R0_js$variable_declaration_list=function (sym,env,lex,state,output,len) {return sym[0].push(sym[2])},
    R0_js$let_or_const=function (sym,env,lex,state,output,len) {return "let"},
    R1_js$let_or_const=function (sym,env,lex,state,output,len) {return "const"},
    R0_js$function_declaration=function (sym,env,lex,state,output,len) {return new env.functions.funct_decl(null,sym[2],sym[5])},
    R1_js$function_declaration=function (sym,env,lex,state,output,len) {return new env.functions.funct_decl(sym[1],sym[3],sym[6])},
    R0_js$arrow_function=function (sym,env,lex,state,output,len) {return new env.functions.arrow(null,sym[0],sym[2])},
    R0_js$class_tail=function (sym,env,lex,state,output,len) {return new env.functions.class_tail(sym)},
    R1_js$class_tail=function (sym,env,lex,state,output,len) {return new env.functions.class_tail([null,...sym[0]])},
    R3_js$class_tail=function (sym,env,lex,state,output,len) {return new env.functions.class_tail([sym[0],null,null])},
    R4_js$class_tail=function (sym,env,lex,state,output,len) {return null},
    R0_js$class_element_list=function (sym,env,lex,state,output,len) {return sym[0].push(sym[1])},
    R0_js$class_element=function (sym,env,lex,state,output,len) {return (sym[1].static = true,sym[1])},
    R1_js$argument_list=function (sym,env,lex,state,output,len) {return (sym[0].push(new env.functions.spread_expr(env,sym.slice(2,4))),env[0])},
    R1_js$element_list=function (sym,env,lex,state,output,len) {return [sym[1]]},
    R1_js$cover_parenthesized_expression_and_arrow_parameter_list=function (sym,env,lex,state,output,len) {return new env.functions.spread_expr(env,sym.slice(1,3))},
    R2_js$cover_parenthesized_expression_and_arrow_parameter_list=function (sym,env,lex,state,output,len) {return Array.isArray(sym[0]) ? (sym[1].push(new env.functions.spread_expr(env,sym.slice(3,5))),sym[1]) : [sym[0],new env.functions.spread_expr(env,sym.slice(3,5))]},

        //Sparse Map Lookup
        lsm = (index, map) => {    if (map[0] == 0xFFFFFFFF) return map[index+1];    for (let i = 1, ind = 0, l = map.length, n = 0; i < l && ind <= index; i++) {        if (ind !== index) {            if ((n = map[i]) > -1) ind++;            else ind += -n;        } else return map[i];    }    return -1;},

        //State Action Functions
        state_funct = [(...v)=>((redn(149507,0,...v))),
    ()=>(354),
    ()=>(310),
    ()=>(398),
    ()=>(466),
    ()=>(118),
    ()=>(358),
    ()=>(214),
    ()=>(222),
    ()=>(490),
    ()=>(482),
    ()=>(498),
    ()=>(402),
    ()=>(414),
    ()=>(418),
    ()=>(422),
    ()=>(394),
    ()=>(378),
    ()=>(430),
    ()=>(434),
    ()=>(438),
    ()=>(446),
    ()=>(442),
    ()=>(426),
    ()=>(450),
    ()=>(454),
    ()=>(502),
    ()=>(254),
    ()=>(362),
    ()=>(270),
    ()=>(218),
    ()=>(202),
    ()=>(206),
    ()=>(210),
    ()=>(226),
    ()=>(234),
    ()=>(238),
    ()=>(346),
    ()=>(350),
    ()=>(342),
    ()=>(334),
    ()=>(338),
    ()=>(314),
    (...v)=>(redv(5,R0_S,1,0,...v)),
    (...v)=>(redn(1031,1,...v)),
    (...v)=>(redv(129031,R0_S,1,0,...v)),
    (...v)=>(redv(130055,R0_S,1,0,...v)),
    (...v)=>(redv(149511,R0_S,1,0,...v)),
    (...v)=>(redn(150535,1,...v)),
    (...v)=>(rednv(153607,fn.stmts,1,0,...v)),
    ()=>(526),
    (...v)=>(redv(152583,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redn(151559,1,...v)),
    (...v)=>(redn(154631,1,...v)),
    (...v)=>(redn(155655,1,...v)),
    (...v)=>(redn(292871,1,...v)),
    ()=>(530),
    (...v)=>(redn(159751,1,...v)),
    ()=>(538),
    (...v)=>(rednv(221191,fn.expression_list,1,0,...v)),
    ()=>(542),
    (...v)=>(redv(220167,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redn(219143,1,...v)),
    (...v)=>(redn(245767,1,...v)),
    (...v)=>(redn(261127,1,...v)),
    ()=>(546),
    ()=>(598),
    ()=>(562),
    ()=>(566),
    ()=>(570),
    ()=>(574),
    ()=>(578),
    ()=>(582),
    ()=>(586),
    ()=>(590),
    ()=>(594),
    ()=>(602),
    ()=>(606),
    ()=>(554),
    ()=>(558),
    (...v)=>(redn(247815,1,...v)),
    ()=>(614),
    ()=>(610),
    (...v)=>(redn(248839,1,...v)),
    ()=>(618),
    (...v)=>(redn(249863,1,...v)),
    ()=>(622),
    (...v)=>(redn(250887,1,...v)),
    ()=>(626),
    (...v)=>(redn(251911,1,...v)),
    ()=>(630),
    (...v)=>(redn(252935,1,...v)),
    ()=>(634),
    ()=>(638),
    ()=>(642),
    ()=>(646),
    (...v)=>(redn(253959,1,...v)),
    ()=>(650),
    ()=>(654),
    ()=>(658),
    ()=>(670),
    ()=>(662),
    ()=>(666),
    (...v)=>(redn(254983,1,...v)),
    ()=>(674),
    ()=>(678),
    ()=>(682),
    (...v)=>(redn(256007,1,...v)),
    ()=>(686),
    ()=>(690),
    (...v)=>(redn(257031,1,...v)),
    ()=>(698),
    ()=>(702),
    ()=>(694),
    (...v)=>(redn(258055,1,...v)),
    (...v)=>(redn(259079,1,...v)),
    (...v)=>(redn(260103,1,...v)),
    ()=>(706),
    ()=>(742),
    ()=>(738),
    (...v)=>(redn(222215,1,...v)),
    ()=>(798),
    ()=>(786),
    ()=>(794),
    (...v)=>(redn(223239,1,...v)),
    ()=>(806),
    ()=>(802),
    ()=>(822),
    ()=>(826),
    (...v)=>(redn(224263,1,...v)),
    (...v)=>(rednv(232455,fn.this_expr,1,0,...v)),
    (...v)=>(redn(232455,1,...v)),
    (...v)=>(redn(203783,1,...v)),
    (...v)=>(redn(285703,1,...v)),
    (...v)=>(redn(284679,1,...v)),
    (...v)=>(redn(286727,1,...v)),
    (...v)=>(redn(287751,1,...v)),
    (...v)=>(rednv(290823,fn.identifier,1,0,...v)),
    (...v)=>(redv(289799,R1_css$general_enclosed6602_group_list,1,0,...v)),
    (...v)=>(redn(288775,1,...v)),
    (...v)=>(redn(275463,1,...v)),
    (...v)=>(rednv(283655,fn.bool_literal,1,0,...v)),
    (...v)=>(rednv(282631,fn.null_literal,1,0,...v)),
    ()=>(858),
    ()=>(850),
    ()=>(846),
    ()=>(866),
    ()=>(870),
    ()=>(862),
    ()=>(854),
    ()=>(838),
    ()=>(898),
    ()=>(890),
    ()=>(886),
    ()=>(906),
    ()=>(910),
    ()=>(902),
    ()=>(894),
    ()=>(878),
    (...v)=>(rednv(281607,fn.numeric_literal,1,0,...v)),
    ()=>(914),
    ()=>(922),
    ()=>(930),
    ()=>(934),
    (...v)=>(redn(226311,1,...v)),
    (...v)=>(redn(228359,1,...v)),
    ()=>(946),
    ()=>(954),
    ()=>(986),
    ()=>(990),
    (...v)=>(rednv(161799,C0_js$empty_statement,1,0,...v)),
    ()=>(994),
    (...v)=>(redn(158727,1,...v)),
    ()=>(1002),
    (...v)=>(shftf(1006,I2_js$iteration_statement,...v)),
    ()=>(1010),
    ()=>(1014),
    ()=>(1018),
    ()=>(1030),
    ()=>(1038),
    ()=>(1046),
    ()=>(1058),
    (...v)=>(redn(294919,1,...v)),
    ()=>(1066),
    ()=>(1094),
    ()=>(1178),
    ()=>(1182),
    ()=>(1174),
    ()=>(1090),
    ()=>(1162),
    ()=>(1166),
    ()=>(1078),
    ()=>(1082),
    ()=>(1098),
    ()=>(1102),
    ()=>(1106),
    ()=>(1110),
    ()=>(1114),
    ()=>(1118),
    ()=>(1122),
    ()=>(1126),
    ()=>(1130),
    ()=>(1134),
    ()=>(1138),
    ()=>(1142),
    ()=>(1146),
    ()=>(1150),
    ()=>(1154),
    ()=>(1158),
    (...v)=>(redn(156679,1,...v)),
    ()=>(1198),
    ()=>(1202),
    (...v)=>(redn(157703,1,...v)),
    ()=>(1206),
    (...v)=>(redv(190471,R0_js$let_or_const,1,0,...v)),
    (...v)=>(redv(190471,R1_js$let_or_const,1,0,...v)),
    (...v)=>(redn(291847,1,...v)),
    (...v)=>(redv(3079,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redv(152587,R0_IMPORT_TAG_list,2,0,...v)),
    ()=>(1238),
    (...v)=>(redv(155659,R0_S,2,0,...v)),
    ()=>(1242),
    (...v)=>(rednv(162827,fn.expr_stmt,2,0,...v)),
    (...v)=>(rednv(261131,fn.post_inc_expr,2,0,...v)),
    (...v)=>(rednv(261131,fn.post_dec_expr,2,0,...v)),
    (...v)=>(redn(246791,1,...v)),
    (...v)=>(rednv(260107,fn.delete_expr,2,0,...v)),
    (...v)=>(rednv(232455,fn.array_literal,1,0,...v)),
    (...v)=>(rednv(232455,fn.object,1,0,...v)),
    ()=>(1370),
    ()=>(1358),
    ()=>(1382),
    ()=>(1386),
    ()=>(1446),
    ()=>(1422),
    ()=>(1426),
    ()=>(1410),
    (...v)=>(redn(193543,1,...v)),
    (...v)=>(redn(209927,1,...v)),
    (...v)=>(rednv(260107,fn.void_expr,2,0,...v)),
    (...v)=>(rednv(260107,fn.typeof_expr,2,0,...v)),
    (...v)=>(rednv(260107,fn.plus_expr,2,0,...v)),
    (...v)=>(rednv(260107,fn.negate_expr,2,0,...v)),
    (...v)=>(rednv(260107,fn.unary_or_expr,2,0,...v)),
    (...v)=>(rednv(260107,fn.unary_not_expr,2,0,...v)),
    (...v)=>(rednv(261131,fn.pre_inc_expr,2,0,...v)),
    (...v)=>(rednv(261131,fn.pre_dec_expr,2,0,...v)),
    (...v)=>(rednv(228363,fn.call_expr,2,0,...v)),
    ()=>(1458),
    ()=>(1470),
    (...v)=>(rednv(208907,fn.call_expr,2,0,...v)),
    (...v)=>(rednv(223243,fn.new_expr,2,0,...v)),
    ()=>(1486),
    (...v)=>(redv(289803,R0_css$general_enclosed6602_group_list,2,0,...v)),
    ()=>(1490),
    (...v)=>(rednv(280587,fn.string_literal,2,0,...v)),
    (...v)=>(redv(277511,R1_css$general_enclosed6602_group_list,1,0,...v)),
    (...v)=>(redn(276487,1,...v)),
    ()=>(1498),
    (...v)=>(redv(279559,R1_css$general_enclosed6602_group_list,1,0,...v)),
    (...v)=>(redn(278535,1,...v)),
    (...v)=>(redv(263179,R4_js$class_tail,2,0,...v)),
    ()=>(1510),
    ()=>(1506),
    (...v)=>(redn(229387,2,...v)),
    (...v)=>(rednv(262155,fn.await_expr,2,0,...v)),
    ()=>(1538),
    (...v)=>(rednv(178187,fn.label_stmt,2,0,...v)),
    ()=>(1554),
    ()=>(1558),
    (...v)=>(redv(187399,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(rednv(188423,fn.binding,1,0,...v)),
    ()=>(1566),
    (...v)=>(redn(264199,1,...v)),
    ()=>(1574),
    ()=>(1586),
    ()=>(1606),
    ()=>(1622),
    ()=>(1646),
    ()=>(1658),
    ()=>(1662),
    ()=>(1682),
    (...v)=>(rednv(167947,fn.continue_stmt,2,0,...v)),
    ()=>(1690),
    (...v)=>(rednv(168971,fn.break_stmt,2,0,...v)),
    ()=>(1694),
    (...v)=>(rednv(169995,fn.return_stmt,2,0,...v)),
    ()=>(1698),
    ()=>(1706),
    ()=>(1718),
    ()=>(1722),
    (...v)=>(rednv(185355,fn.debugger_stmt,2,0,...v)),
    (...v)=>(redv(294923,R0_html$ATTRIBUTE_BODY,2,0,...v)),
    ()=>(1754),
    ()=>(1734),
    ()=>(1730),
    ()=>(1750),
    ()=>(1746),
    ()=>(1766),
    ()=>(1762),
    ()=>(1778),
    (...v)=>(redn(297991,1,...v)),
    (...v)=>(redn(304135,1,...v)),
    (...v)=>(redv(306183,R1_css$general_enclosed6602_group_list,1,0,...v)),
    (...v)=>(redn(307207,1,...v)),
    (...v)=>(rednv(210955,fn.class_stmt,2,0,...v)),
    ()=>(1794),
    ()=>(1822),
    ()=>(1802),
    ()=>(1818),
    (...v)=>((redn(196611,0,...v))),
    ()=>(1862),
    ()=>(1866),
    ()=>(1870),
    (...v)=>(redv(191495,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redv(292875,R0_html$BODY,2,0,...v)),
    (...v)=>(redv(3083,R0_IMPORT_TAG_list,2,0,...v)),
    (...v)=>(rednv(160783,fn.block,3,0,...v)),
    (...v)=>(redv(220175,R0_css$COMPLEX_SELECTOR_list,3,0,...v)),
    (...v)=>(rednv(245775,fn.assign,3,0,...v)),
    ()=>(1882),
    (...v)=>(rednv(248847,fn.or,3,0,...v)),
    (...v)=>(rednv(249871,fn.and,3,0,...v)),
    (...v)=>(rednv(250895,fn.bit_or,3,0,...v)),
    (...v)=>(rednv(251919,fn.bit_xor,3,0,...v)),
    (...v)=>(rednv(252943,fn.bit_and,3,0,...v)),
    (...v)=>(rednv(253967,fn.eq,3,0,...v)),
    (...v)=>(rednv(253967,fn.neq,3,0,...v)),
    (...v)=>(rednv(253967,fn.strict_eq,3,0,...v)),
    (...v)=>(rednv(253967,fn.strict_neq,3,0,...v)),
    (...v)=>(rednv(254991,fn.lt,3,0,...v)),
    (...v)=>(rednv(254991,fn.gt,3,0,...v)),
    (...v)=>(rednv(254991,fn.lteq,3,0,...v)),
    (...v)=>(rednv(254991,fn.gteq,3,0,...v)),
    (...v)=>(rednv(254991,fn.instanceof_expr,3,0,...v)),
    (...v)=>(rednv(254991,fn.in,3,0,...v)),
    (...v)=>(rednv(256015,fn.l_shift,3,0,...v)),
    (...v)=>(rednv(256015,fn.r_shift,3,0,...v)),
    (...v)=>(rednv(256015,fn.r_shift_fill,3,0,...v)),
    (...v)=>(rednv(257039,fn.add,3,0,...v)),
    (...v)=>(rednv(257039,fn.sub,3,0,...v)),
    (...v)=>(rednv(258063,fn.mult,3,0,...v)),
    (...v)=>(rednv(258063,fn.div,3,0,...v)),
    (...v)=>(rednv(258063,fn.mod,3,0,...v)),
    (...v)=>(rednv(259087,fn.exp,3,0,...v)),
    (...v)=>(redv(241675,R0_js$case_block,2,0,...v)),
    ()=>(1890),
    ()=>(1886),
    ()=>(1910),
    ()=>(1902),
    (...v)=>(redn(243719,1,...v)),
    (...v)=>(redv(242695,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redv(233483,R4_js$class_tail,2,0,...v)),
    ()=>(1922),
    ()=>(1918),
    (...v)=>(redv(234503,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redn(235527,1,...v)),
    ()=>(1938),
    ()=>(1934),
    (...v)=>(redn(237575,1,...v)),
    (...v)=>(redn(236551,1,...v)),
    (...v)=>(rednv(228367,fn.call_expr,3,0,...v)),
    ()=>(1954),
    (...v)=>(redv(230411,R0_js$case_block,2,0,...v)),
    ()=>(1962),
    ()=>(1958),
    (...v)=>(redv(231431,R1_IMPORT_TAG_list,1,0,...v)),
    ()=>(1970),
    (...v)=>(rednv(224271,fn.member,3,0,...v)),
    (...v)=>(rednv(224271,fn.new_member_stmt,3,0,...v)),
    (...v)=>(rednv(227343,fn.new_target_expr,3,0,...v)),
    (...v)=>(rednv(280591,fn.string_literal,3,0,...v)),
    (...v)=>(redv(277515,R0_css$general_enclosed6602_group_list,2,0,...v)),
    (...v)=>(redv(279563,R0_css$general_enclosed6602_group_list,2,0,...v)),
    (...v)=>(redv(263183,R0_html$ATTRIBUTE_BODY,3,0,...v)),
    ()=>(1974),
    ()=>(1978),
    ()=>(1982),
    ()=>(1986),
    (...v)=>(rednv(225295,fn.supper_expr,3,0,...v)),
    ()=>(1990),
    (...v)=>(redv(202767,R0_js$arrow_function,3,0,...v)),
    (...v)=>(redn(204807,1,...v)),
    (...v)=>(redv(179211,R0_html$ATTRIBUTE_BODY,2,0,...v)),
    (...v)=>(redn(180231,1,...v)),
    (...v)=>(rednv(186383,fn.var_stmt,3,0,...v)),
    (...v)=>(rednv(188427,fn.binding,2,0,...v)),
    (...v)=>(redn(265227,2,...v)),
    ()=>(2010),
    ()=>(2018),
    ()=>(2014),
    (...v)=>(redn(268295,1,...v)),
    (...v)=>(redn(271367,1,...v)),
    ()=>(2026),
    (...v)=>(redn(273415,1,...v)),
    (...v)=>(redn(266251,2,...v)),
    ()=>(2038),
    ()=>(2046),
    ()=>(2054),
    ()=>(2050),
    (...v)=>(redn(269319,1,...v)),
    (...v)=>(redn(270343,1,...v)),
    (...v)=>(redn(272391,1,...v)),
    ()=>(2070),
    ()=>(2074),
    ()=>(2078),
    ()=>(2082),
    ()=>(2090),
    ()=>(2114),
    ()=>(2118),
    ()=>(2122),
    ()=>(2126),
    ()=>(2130),
    ()=>(2150),
    ()=>(2162),
    (...v)=>(redv(167951,R0_js$continue_statement,3,0,...v)),
    (...v)=>(redv(168975,R0_js$break_statement,3,0,...v)),
    (...v)=>(rednv(169999,fn.return_stmt,3,0,...v)),
    ()=>(2166),
    (...v)=>(rednv(171023,fn.throw_stmt,3,0,...v)),
    (...v)=>(redv(181263,R0_js$try_statement,3,0,...v)),
    (...v)=>(redv(181263,R1_js$try_statement,3,0,...v)),
    ()=>(2174),
    ()=>(2186),
    ()=>(2182),
    (...v)=>(shftf(2226,I0_BASIC_BINDING,...v)),
    (...v)=>((redn(299011,0,...v))),
    ()=>(2230),
    (...v)=>(redv(300039,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(rednv(301063,fn.attribute,1,0,...v)),
    ()=>(2234),
    ()=>(2238),
    ()=>(2242),
    (...v)=>(redn(302087,1,...v)),
    ()=>(2250),
    ()=>(2246),
    (...v)=>(rednv(296975,fn.element_selector,3,0,...v)),
    ()=>(2254),
    ()=>(2258),
    ()=>(2262),
    ()=>(2266),
    (...v)=>(redv(295951,R4_js$class_tail,3,0,...v)),
    (...v)=>(redv(306187,R0_css$general_enclosed6602_group_list,2,0,...v)),
    ()=>(2270),
    ()=>(2274),
    (...v)=>(rednv(210959,fn.class_stmt,3,0,...v)),
    ()=>(2282),
    ()=>(2286),
    (...v)=>(redv(211979,R4_js$class_tail,2,0,...v)),
    (...v)=>(redn(214023,1,...v)),
    (...v)=>(redv(215047,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redn(216071,1,...v)),
    (...v)=>(redv(213003,R0_html$ATTRIBUTE_BODY,2,0,...v)),
    ()=>(2298),
    (...v)=>(redn(196615,1,...v)),
    ()=>(2302),
    (...v)=>(redn(198663,1,...v)),
    (...v)=>(redv(197639,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redn(199687,1,...v)),
    (...v)=>(rednv(189455,fn.lexical,3,0,...v)),
    (...v)=>(rednv(192523,fn.binding,2,0,...v)),
    (...v)=>(redv(241679,R0_js$case_block,3,0,...v)),
    (...v)=>(redn(243723,2,...v)),
    (...v)=>(redv(242699,R1_js$element_list,2,0,...v)),
    (...v)=>(redv(241679,R0_html$ATTRIBUTE_BODY,3,0,...v)),
    ()=>(2318),
    (...v)=>(rednv(244747,fn.spread_expr,2,0,...v)),
    (...v)=>(redv(233487,R0_html$ATTRIBUTE_BODY,3,0,...v)),
    ()=>(2334),
    (...v)=>(rednv(239627,fn.binding,2,0,...v)),
    (...v)=>(rednv(235531,fn.spread_expr,2,0,...v)),
    ()=>(2354),
    ()=>(2358),
    ()=>(2362),
    (...v)=>(rednv(228371,fn.call_expr,4,0,...v)),
    (...v)=>(redv(230415,R0_html$ATTRIBUTE_BODY,3,0,...v)),
    ()=>(2366),
    ()=>(2374),
    (...v)=>(rednv(231435,fn.spread_expr,2,0,...v)),
    (...v)=>(rednv(224275,fn.member,4,0,...v)),
    (...v)=>(redv(263187,R0_html$ATTRIBUTE_BODY,4,0,...v)),
    (...v)=>(redv(263187,R1_js$cover_parenthesized_expression_and_arrow_parameter_list,4,0,...v)),
    (...v)=>(rednv(225299,fn.supper_expr,4,0,...v)),
    ()=>(2386),
    (...v)=>(redn(201735,1,...v)),
    (...v)=>(redv(187407,R0_js$variable_declaration_list,3,0,...v)),
    (...v)=>(redv(240651,R0_html$ATTRIBUTE_BODY,2,0,...v)),
    (...v)=>(redn(265231,3,...v)),
    ()=>(2394),
    (...v)=>(redn(267275,2,...v)),
    (...v)=>(redn(273419,2,...v)),
    ()=>(2406),
    (...v)=>(redn(266255,3,...v)),
    (...v)=>(redn(270347,2,...v)),
    ()=>(2410),
    (...v)=>(redn(274443,2,...v)),
    (...v)=>(redn(272395,2,...v)),
    ()=>(2442),
    ()=>(2446),
    ()=>(2454),
    ()=>(2458),
    ()=>(2462),
    ()=>(2466),
    (...v)=>(redn(166919,1,...v)),
    ()=>(2470),
    ()=>(2478),
    (...v)=>(redn(165899,2,...v)),
    ()=>(2498),
    ()=>(2514),
    ()=>(2522),
    (...v)=>(redv(181267,R3_js$try_statement,4,0,...v)),
    (...v)=>(rednv(183307,fn.finally_stmt,2,0,...v)),
    ()=>(2546),
    (...v)=>(redv(300043,R0_IMPORT_TAG_list,2,0,...v)),
    ()=>(2550),
    (...v)=>(redv(299015,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redv(299015,R4_js$class_tail,1,0,...v)),
    (...v)=>(rednv(305159,fn.text,1,0,...v)),
    (...v)=>(redn(10247,1,...v)),
    (...v)=>(rednv(296979,fn.element_selector,4,0,...v)),
    ()=>(2574),
    ()=>(2582),
    ()=>(2586),
    ()=>(2590),
    ()=>(2594),
    ()=>(2598),
    ()=>(2602),
    (...v)=>((redn(17411,0,...v))),
    ()=>(2650),
    ()=>(2630),
    ()=>(2662),
    ()=>(2682),
    (...v)=>(rednv(5139,fn.element_selector,4,0,...v)),
    ()=>(2686),
    (...v)=>(redv(211983,R3_js$class_tail,3,0,...v)),
    (...v)=>(redv(211983,R1_js$class_tail,3,0,...v)),
    (...v)=>(redv(215051,R0_js$class_element_list,2,0,...v)),
    (...v)=>(redv(216075,R0_js$class_element,2,0,...v)),
    ()=>(2690),
    (...v)=>(redv(196619,R0_S,2,0,...v)),
    ()=>(2702),
    (...v)=>(redv(191503,R0_js$variable_declaration_list,3,0,...v)),
    (...v)=>(rednv(247831,fn.condition_expr,5,0,...v)),
    (...v)=>(redv(241683,R0_html$ATTRIBUTE_BODY,4,0,...v)),
    (...v)=>(redv(242703,R0_css$COMPLEX_SELECTOR_list,3,0,...v)),
    (...v)=>(redv(233491,R0_html$ATTRIBUTE_BODY,4,0,...v)),
    (...v)=>(redv(234511,R0_css$COMPLEX_SELECTOR_list,3,0,...v)),
    (...v)=>(rednv(235535,fn.property_binding,3,0,...v)),
    ()=>(2710),
    (...v)=>(redn(195591,1,...v)),
    ()=>(2714),
    (...v)=>(redv(238607,R0_html$ATTRIBUTE_BODY,3,0,...v)),
    (...v)=>(redv(230419,R0_html$ATTRIBUTE_BODY,4,0,...v)),
    (...v)=>(redv(231439,R0_css$COMPLEX_SELECTOR_list,3,0,...v)),
    ()=>(2730),
    ()=>(2734),
    (...v)=>(redv(204815,R0_html$ATTRIBUTE_BODY,3,0,...v)),
    ()=>(2738),
    (...v)=>(redn(265235,4,...v)),
    (...v)=>(redn(268303,3,...v)),
    (...v)=>(redn(271375,3,...v)),
    (...v)=>(redn(266259,4,...v)),
    ()=>(2742),
    ()=>(2750),
    (...v)=>(redn(269327,3,...v)),
    (...v)=>(rednv(163863,fn.if_stmt,5,0,...v)),
    ()=>(2754),
    ()=>(2758),
    (...v)=>(rednv(164887,fn.while_stmt,5,0,...v)),
    ()=>(2762),
    ()=>(2770),
    ()=>(2778),
    ()=>(2790),
    ()=>(2806),
    ()=>(2810),
    ()=>(2818),
    ()=>(2822),
    ()=>(2826),
    ()=>(2830),
    ()=>(2838),
    (...v)=>(rednv(173079,fn.switch_stmt,5,0,...v)),
    ()=>(2846),
    ()=>(2866),
    ()=>(2862),
    (...v)=>(rednv(172055,fn.with_stmt,5,0,...v)),
    ()=>(2870),
    (...v)=>(redn(184327,1,...v)),
    ()=>(2874),
    (...v)=>(rednv(296983,fn.element_selector,5,0,...v)),
    (...v)=>(redv(299019,R0_IMPORT_TAG_list,2,0,...v)),
    ()=>(2886),
    ()=>(2882),
    (...v)=>(rednv(301071,fn.attribute,3,0,...v)),
    (...v)=>(redn(303111,1,...v)),
    ()=>(2910),
    ()=>(2914),
    ()=>(2930),
    ()=>(2926),
    ()=>(2922),
    ()=>(2918),
    ()=>(2934),
    (...v)=>(redv(302095,R0_html$ATTRIBUTE_BODY,3,0,...v)),
    ()=>(2946),
    ()=>(2950),
    (...v)=>(redn(13319,1,...v)),
    (...v)=>(redn(17415,1,...v)),
    ()=>(2970),
    (...v)=>(redv(14343,R1_IMPORT_TAG_list,1,0,...v)),
    ()=>(2974),
    ()=>(2986),
    ()=>(2982),
    ()=>(2978),
    (...v)=>(redv(16391,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redn(15367,1,...v)),
    ()=>(2994),
    ()=>(2990),
    ()=>(3018),
    (...v)=>(redv(18439,R1_IMPORT_TAG_list,1,0,...v)),
    ()=>(3038),
    (...v)=>(redv(97287,R0_css$COMPLEX_SELECTOR,1,0,...v)),
    ()=>(3042),
    ()=>(3046),
    ()=>(3050),
    ()=>(3082),
    ()=>(3078),
    ()=>(3090),
    ()=>(3114),
    ()=>(3118),
    ()=>(3122),
    ()=>(3066),
    ()=>(3126),
    ()=>(3138),
    ()=>(3142),
    ()=>(3146),
    ()=>(3150),
    (...v)=>(rednv(5143,fn.element_selector,5,0,...v)),
    (...v)=>(redv(211987,R0_js$class_tail,4,0,...v)),
    (...v)=>((redn(200707,0,...v))),
    (...v)=>(redv(196623,R0_css$COMPLEX_SELECTOR_list,3,0,...v)),
    (...v)=>(redv(197647,R0_css$COMPLEX_SELECTOR_list,3,0,...v)),
    ()=>(3162),
    (...v)=>(redv(242707,R0_css$COMPLEX_SELECTOR_list,4,0,...v)),
    ()=>(3166),
    ()=>(3170),
    ()=>(3174),
    (...v)=>(redn(218119,1,...v)),
    (...v)=>(redv(231443,R1_js$argument_list,4,0,...v)),
    (...v)=>(redv(263195,R2_js$cover_parenthesized_expression_and_arrow_parameter_list,6,0,...v)),
    (...v)=>(redn(265239,5,...v)),
    (...v)=>(redn(266263,5,...v)),
    ()=>(3178),
    ()=>(3186),
    ()=>(3194),
    ()=>(3198),
    ()=>(3206),
    (...v)=>(redv(164891,R9_js$iteration_statement,6,0,...v)),
    ()=>(3214),
    ()=>(3222),
    ()=>(3226),
    ()=>(3230),
    ()=>(3234),
    (...v)=>(redv(164891,R16_js$iteration_statement,6,0,...v)),
    ()=>(3262),
    ()=>(3270),
    (...v)=>(redv(174091,R0_js$case_block,2,0,...v)),
    ()=>(3278),
    ()=>(3290),
    (...v)=>(redv(175111,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redv(177159,R1_js$default_clause,1,0,...v)),
    ()=>(3298),
    ()=>(3310),
    (...v)=>(rednv(11279,fn.wick_binding,3,0,...v)),
    ()=>(3318),
    ()=>(3322),
    (...v)=>(redn(311303,1,...v)),
    (...v)=>(redv(310279,R1_css$general_enclosed6602_group_list,1,0,...v)),
    (...v)=>(redn(309255,1,...v)),
    (...v)=>(redn(312327,1,...v)),
    ()=>(3330),
    ()=>(3334),
    ()=>(3338),
    (...v)=>(rednv(296987,fn.element_selector,6,0,...v)),
    ()=>(3342),
    (...v)=>(redn(17419,2,...v)),
    (...v)=>(redv(14347,R0_IMPORT_TAG_list,2,0,...v)),
    (...v)=>(redv(16395,R0_IMPORT_TAG_list,2,0,...v)),
    (...v)=>(redn(22539,2,...v)),
    ()=>(3406),
    ()=>(3402),
    ()=>(3386),
    ()=>(3410),
    ()=>(3418),
    ()=>(3426),
    ()=>(3430),
    ()=>(3478),
    ()=>(3466),
    ()=>(3482),
    ()=>(3438),
    ()=>(3494),
    ()=>(3498),
    (...v)=>(redv(122887,R0_css$declaration_list,1,0,...v)),
    ()=>(3518),
    (...v)=>(redv(122887,R1_css$declaration_list,1,0,...v)),
    (...v)=>(redv(119815,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redn(118791,1,...v)),
    ()=>(3522),
    (...v)=>(redv(97291,R0_css$COMPLEX_SELECTOR,2,0,...v)),
    (...v)=>(redv(96263,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redv(95239,fn.comboSelector,1,0,...v)),
    (...v)=>(redn(103431,1,...v)),
    ()=>(3542),
    ()=>(3550),
    ()=>(3558),
    ()=>(3566),
    (...v)=>(rednv(102411,fn.compoundSelector,2,0,...v)),
    (...v)=>(rednv(104455,fn.selector,1,0,...v)),
    ()=>(3574),
    ()=>(3570),
    (...v)=>(redn(105479,1,...v)),
    (...v)=>(redn(107527,1,...v)),
    ()=>(3578),
    (...v)=>(redn(106503,1,...v)),
    (...v)=>(redv(98311,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redn(108551,1,...v)),
    ()=>(3582),
    ()=>(3586),
    ()=>(3598),
    ()=>(3602),
    ()=>(3610),
    (...v)=>(redv(101383,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redn(100359,1,...v)),
    ()=>(3622),
    ()=>(3626),
    (...v)=>(redn(200711,1,...v)),
    ()=>(3642),
    (...v)=>(redn(266267,6,...v)),
    (...v)=>(rednv(163871,fn.if_stmt,7,0,...v)),
    (...v)=>(rednv(164895,fn.do_while_stmt,7,0,...v)),
    (...v)=>(shftf(3646,I3_js$iteration_statement,...v)),
    (...v)=>(redv(164895,R8_js$iteration_statement,7,0,...v)),
    (...v)=>(redv(164895,R7_js$iteration_statement,7,0,...v)),
    ()=>(3666),
    ()=>(3670),
    (...v)=>(redv(164895,R14_js$iteration_statement,7,0,...v)),
    (...v)=>(redv(164895,R15_js$iteration_statement,7,0,...v)),
    (...v)=>(redv(164895,R17_js$iteration_statement,7,0,...v)),
    (...v)=>(redv(164895,R19_js$iteration_statement,7,0,...v)),
    ()=>(3694),
    ()=>(3706),
    (...v)=>(redv(174095,R0_html$ATTRIBUTE_BODY,3,0,...v)),
    (...v)=>(redv(175115,R0_js$case_clauses,2,0,...v)),
    ()=>(3710),
    ()=>(3714),
    (...v)=>(rednv(182295,fn.catch_stmt,5,0,...v)),
    ()=>(3722),
    (...v)=>(rednv(296991,fn.element_selector,8,0,...v)),
    ()=>(3726),
    (...v)=>(redv(303119,R0_html$ATTRIBUTE_BODY,3,0,...v)),
    (...v)=>(redv(308239,R0_html$ATTRIBUTE_BODY,3,0,...v)),
    (...v)=>(redv(310283,R0_css$general_enclosed6602_group_list,2,0,...v)),
    (...v)=>(redn(312331,2,...v)),
    ()=>(3730),
    ()=>(3738),
    ()=>(3734),
    (...v)=>(redv(50183,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redn(54279,1,...v)),
    (...v)=>(redn(64519,1,...v)),
    ()=>(3746),
    ()=>(3754),
    (...v)=>(redn(56327,1,...v)),
    (...v)=>(redn(55303,1,...v)),
    ()=>(3770),
    ()=>(3778),
    ()=>(3794),
    ()=>(3790),
    (...v)=>(redn(65543,1,...v)),
    ()=>(3826),
    ()=>(3802),
    (...v)=>(redn(84999,1,...v)),
    ()=>(3838),
    (...v)=>(redn(52231,1,...v)),
    ()=>(3842),
    (...v)=>(redn(31751,1,...v)),
    ()=>(3850),
    ()=>(3858),
    (...v)=>(redn(43015,1,...v)),
    (...v)=>(redn(41991,1,...v)),
    ()=>(3882),
    ()=>(3890),
    (...v)=>(redn(44039,1,...v)),
    (...v)=>(redn(45063,1,...v)),
    (...v)=>(redn(47111,1,...v)),
    (...v)=>(redn(46087,1,...v)),
    ()=>(3902),
    ()=>(3906),
    ()=>(3910),
    (...v)=>(redv(18447,R0_css$COMPLEX_SELECTOR_list,3,0,...v)),
    ()=>(3914),
    (...v)=>(rednv(19471,C0_css$RULE_SET,3,0,...v)),
    (...v)=>(redv(122891,R3_css$declaration_list,2,0,...v)),
    (...v)=>(redv(122891,R4_css$declaration_list,2,0,...v)),
    ()=>(3918),
    (...v)=>(redv(121863,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redn(120839,1,...v)),
    (...v)=>(redv(122891,R0_css$declaration_list,2,0,...v)),
    ()=>(3942),
    ()=>(3946),
    ()=>(3934),
    (...v)=>(redv(96267,R0_IMPORT_TAG_list,2,0,...v)),
    (...v)=>(redv(95243,fn.comboSelector,2,0,...v)),
    ()=>(3954),
    ()=>(3958),
    (...v)=>(rednv(102415,fn.compoundSelector,3,0,...v)),
    ()=>(3962),
    (...v)=>(redv(98315,R0_IMPORT_TAG_list,2,0,...v)),
    (...v)=>(redv(101387,R0_IMPORT_TAG_list,2,0,...v)),
    (...v)=>(rednv(104459,fn.selector,2,0,...v)),
    (...v)=>(redn(107531,2,...v)),
    (...v)=>(redn(106507,2,...v)),
    (...v)=>(rednv(109579,fn.idSelector,2,0,...v)),
    (...v)=>(rednv(110603,fn.classSelector,2,0,...v)),
    ()=>(3990),
    ()=>(3974),
    ()=>(3966),
    ()=>(3978),
    ()=>(3982),
    ()=>(3986),
    ()=>(3998),
    (...v)=>(rednv(116747,fn.pseudoClassSelector,2,0,...v)),
    (...v)=>(rednv(117771,fn.pseudoElementSelector,2,0,...v)),
    (...v)=>(redn(100363,2,...v)),
    (...v)=>(redv(99335,R1_IMPORT_TAG_list,1,0,...v)),
    ()=>(4006),
    (...v)=>(redv(194591,R0_js$function_declaration,7,0,...v)),
    ()=>(4010),
    ()=>(4014),
    ()=>(4018),
    (...v)=>(redv(164899,R6_js$iteration_statement,8,0,...v)),
    (...v)=>(redv(164899,R5_js$iteration_statement,8,0,...v)),
    (...v)=>(redv(164899,R4_js$iteration_statement,8,0,...v)),
    ()=>(4030),
    (...v)=>(redv(164899,R13_js$iteration_statement,8,0,...v)),
    (...v)=>(redv(164899,R18_js$iteration_statement,8,0,...v)),
    (...v)=>(redv(164899,R19_js$iteration_statement,8,0,...v)),
    (...v)=>(redv(164899,R1_js$iteration_statement,8,0,...v)),
    (...v)=>(redv(164899,R20_js$iteration_statement,8,0,...v)),
    ()=>(4046),
    (...v)=>(redv(174099,R3_js$case_block,4,0,...v)),
    (...v)=>(redv(176143,R1_js$case_clause,3,0,...v)),
    (...v)=>(redv(177167,R0_js$default_clause,3,0,...v)),
    (...v)=>(rednv(296995,fn.element_selector,8,0,...v)),
    (...v)=>(rednv(12311,fn.wick_binding,5,0,...v)),
    ()=>(4054),
    (...v)=>((redn(21507,0,...v))),
    (...v)=>(redn(54283,2,...v)),
    (...v)=>(redn(60427,2,...v)),
    (...v)=>(redn(63499,2,...v)),
    (...v)=>(redv(59399,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redv(62471,R1_IMPORT_TAG_list,1,0,...v)),
    ()=>(4098),
    ()=>(4118),
    ()=>(4114),
    (...v)=>(redn(83975,1,...v)),
    ()=>(4106),
    (...v)=>(redn(66567,1,...v)),
    ()=>(4130),
    ()=>(4134),
    ()=>(4138),
    ()=>(4142),
    ()=>(4122),
    ()=>(4158),
    ()=>(4162),
    ()=>(4166),
    ()=>(4170),
    (...v)=>(redn(81927,1,...v)),
    ()=>(4178),
    ()=>(4182),
    ()=>(4186),
    ()=>(4190),
    ()=>(4210),
    ()=>(4206),
    ()=>(4198),
    ()=>(4242),
    ()=>(4230),
    ()=>(4234),
    ()=>(4250),
    ()=>(4246),
    (...v)=>(redv(93191,R1_css$general_enclosed6602_group_list,1,0,...v)),
    ()=>(4254),
    (...v)=>(redn(41995,2,...v)),
    (...v)=>(redv(38919,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redv(40967,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redn(49163,2,...v)),
    (...v)=>(redn(48135,1,...v)),
    ()=>(4278),
    (...v)=>(rednv(19475,C0_css$RULE_SET,4,0,...v)),
    (...v)=>(redv(122895,R4_css$declaration_list,3,0,...v)),
    (...v)=>(redv(119823,R0_css$COMPLEX_SELECTOR_list,3,0,...v)),
    (...v)=>(redv(124943,fn.parseDeclaration,3,0,...v)),
    ()=>(4294),
    (...v)=>(redn(128007,1,...v)),
    (...v)=>(redv(126983,R1_css$general_enclosed6602_group_list,1,0,...v)),
    (...v)=>(redn(125959,1,...v)),
    ()=>(4306),
    (...v)=>(rednv(102419,fn.compoundSelector,4,0,...v)),
    (...v)=>(rednv(112655,fn.attribSelector,3,0,...v)),
    ()=>(4314),
    ()=>(4318),
    ()=>(4322),
    (...v)=>(redn(113671,1,...v)),
    (...v)=>(rednv(116751,fn.pseudoClassSelector,3,0,...v)),
    (...v)=>(redv(99339,R0_IMPORT_TAG_list,2,0,...v)),
    ()=>(4330),
    (...v)=>(redv(194595,R1_js$function_declaration,8,0,...v)),
    (...v)=>(rednv(217119,fn.class_method,7,0,...v)),
    (...v)=>(rednv(217119,fn.class_get_method,7,0,...v)),
    ()=>(4334),
    (...v)=>(redv(164903,R1_js$iteration_statement,9,0,...v)),
    (...v)=>(redv(164903,R11_js$iteration_statement,9,0,...v)),
    (...v)=>(redv(164903,R12_js$iteration_statement,9,0,...v)),
    (...v)=>(redv(164903,R21_js$iteration_statement,9,0,...v)),
    (...v)=>(redv(174103,R1_js$case_block,5,0,...v)),
    (...v)=>(redv(176147,R0_js$case_clause,4,0,...v)),
    (...v)=>(rednv(296999,fn.element_selector,9,0,...v)),
    ()=>(4342),
    (...v)=>(redn(21511,1,...v)),
    (...v)=>(redv(20487,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redv(50191,R0_css$COMPLEX_SELECTOR_list,3,0,...v)),
    (...v)=>(redn(54287,3,...v)),
    (...v)=>(redn(53259,2,...v)),
    (...v)=>(redv(59403,R0_IMPORT_TAG_list,2,0,...v)),
    (...v)=>(redv(62475,R0_IMPORT_TAG_list,2,0,...v)),
    (...v)=>(redn(67599,3,...v)),
    ()=>(4350),
    (...v)=>(redn(72719,3,...v)),
    (...v)=>(redv(71687,R1_css$general_enclosed6602_group_list,1,0,...v)),
    (...v)=>(redn(70663,1,...v)),
    ()=>(4366),
    (...v)=>(redn(74759,1,...v)),
    ()=>(4374),
    ()=>(4382),
    ()=>(4386),
    (...v)=>(redn(75783,1,...v)),
    ()=>(4390),
    (...v)=>(redn(89099,2,...v)),
    ()=>(4394),
    (...v)=>(redn(88071,1,...v)),
    ()=>(4398),
    (...v)=>(redv(69639,R1_css$general_enclosed6602_group_list,1,0,...v)),
    (...v)=>(redn(68615,1,...v)),
    ()=>(4406),
    (...v)=>(redv(29703,R1_IMPORT_TAG_list,1,0,...v)),
    ()=>(4418),
    ()=>(4414),
    (...v)=>(redv(32775,R1_IMPORT_TAG_list,1,0,...v)),
    (...v)=>(redn(35847,1,...v)),
    ()=>(4422),
    (...v)=>(redn(94223,3,...v)),
    (...v)=>(redv(93195,R0_css$general_enclosed6602_group_list,2,0,...v)),
    ()=>(4426),
    (...v)=>(redv(38923,R0_IMPORT_TAG_list,2,0,...v)),
    (...v)=>(redv(40971,R0_IMPORT_TAG_list,2,0,...v)),
    (...v)=>(redn(37899,2,...v)),
    (...v)=>(redn(39947,2,...v)),
    (...v)=>(rednv(19479,C0_css$RULE_SET,5,0,...v)),
    (...v)=>(redv(121871,R0_css$COMPLEX_SELECTOR_list,3,0,...v)),
    (...v)=>(redv(124947,fn.parseDeclaration,4,0,...v)),
    (...v)=>(redv(128011,R0_css$declaration_values,2,0,...v)),
    ()=>(4430),
    (...v)=>(redv(126987,R0_css$general_enclosed6602_group_list,2,0,...v)),
    ()=>(4434),
    (...v)=>(rednv(102423,fn.compoundSelector,5,0,...v)),
    ()=>(4442),
    ()=>(4446),
    ()=>(4450),
    (...v)=>(redn(111623,1,...v)),
    (...v)=>(redn(113675,2,...v)),
    ()=>(4454),
    (...v)=>(rednv(217123,fn.class_set_method,8,0,...v)),
    (...v)=>(redv(164907,R10_js$iteration_statement,10,0,...v)),
    (...v)=>(redn(51227,6,...v)),
    (...v)=>(redv(20491,R0_IMPORT_TAG_list,2,0,...v)),
    (...v)=>(redn(72723,4,...v)),
    (...v)=>(redv(71691,R0_css$general_enclosed6602_group_list,2,0,...v)),
    (...v)=>(redn(73743,3,...v)),
    (...v)=>(redn(80911,3,...v)),
    (...v)=>(redn(74763,2,...v)),
    ()=>(4462),
    ()=>(4470),
    ()=>(4474),
    (...v)=>(redn(75787,2,...v)),
    (...v)=>(redn(86031,3,...v)),
    (...v)=>(redv(69643,R0_css$general_enclosed6602_group_list,2,0,...v)),
    (...v)=>(rednv(30747,C0_css$keyframes,6,0,...v)),
    (...v)=>(redv(29707,R0_IMPORT_TAG_list,2,0,...v)),
    (...v)=>(redn(87051,2,...v)),
    (...v)=>(redn(36891,6,...v)),
    (...v)=>(redn(123915,2,...v)),
    (...v)=>(redv(128015,R0_css$declaration_values,3,0,...v)),
    ()=>(4486),
    (...v)=>(rednv(112663,fn.attribSelector,5,0,...v)),
    (...v)=>(redn(114695,1,...v)),
    (...v)=>(redn(115727,3,...v)),
    (...v)=>(redn(77831,1,...v)),
    ()=>(4494),
    (...v)=>(redn(79879,1,...v)),
    ()=>(4510),
    ()=>(4506),
    (...v)=>(redv(32783,R0_css$COMPLEX_SELECTOR_list,3,0,...v)),
    (...v)=>(rednv(112667,fn.attribSelector,6,0,...v)),
    (...v)=>(redn(80919,5,...v)),
    (...v)=>(redn(77835,2,...v)),
    ()=>(4514),
    (...v)=>(rednv(34835,C0_css$keyframes_blocks,4,0,...v)),
    (...v)=>(redn(33799,1,...v)),
    (...v)=>(rednv(34839,C0_css$keyframes_blocks,5,0,...v))],

        //Goto Lookup Functions
        goto = [v=>lsm(v,gt0),
    nf,
    nf,
    nf,
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
    nf,
    v=>lsm(v,gt2),
    nf,
    nf,
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
    v=>lsm(v,gt16),
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
    v=>lsm(v,gt17),
    v=>lsm(v,gt18),
    nf,
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
    v=>lsm(v,gt30),
    v=>lsm(v,gt31),
    nf,
    nf,
    nf,
    v=>lsm(v,gt32),
    nf,
    v=>lsm(v,gt33),
    v=>lsm(v,gt34),
    nf,
    nf,
    nf,
    v=>lsm(v,gt35),
    nf,
    nf,
    nf,
    v=>lsm(v,gt31),
    nf,
    nf,
    nf,
    v=>lsm(v,gt36),
    v=>lsm(v,gt37),
    v=>lsm(v,gt38),
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
    v=>lsm(v,gt62),
    v=>lsm(v,gt63),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt64),
    v=>lsm(v,gt65),
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
    v=>lsm(v,gt66),
    nf,
    v=>lsm(v,gt67),
    v=>lsm(v,gt68),
    v=>lsm(v,gt69),
    v=>lsm(v,gt70),
    nf,
    nf,
    v=>lsm(v,gt71),
    nf,
    nf,
    nf,
    v=>lsm(v,gt72),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt73),
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
    v=>lsm(v,gt74),
    nf,
    v=>lsm(v,gt75),
    v=>lsm(v,gt76),
    nf,
    nf,
    v=>lsm(v,gt77),
    nf,
    v=>lsm(v,gt78),
    nf,
    nf,
    v=>lsm(v,gt79),
    v=>lsm(v,gt80),
    nf,
    nf,
    nf,
    v=>lsm(v,gt81),
    v=>lsm(v,gt82),
    v=>lsm(v,gt83),
    nf,
    v=>lsm(v,gt84),
    v=>lsm(v,gt85),
    nf,
    v=>lsm(v,gt86),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt87),
    nf,
    v=>lsm(v,gt88),
    nf,
    nf,
    v=>lsm(v,gt89),
    v=>lsm(v,gt90),
    v=>lsm(v,gt91),
    v=>lsm(v,gt92),
    v=>lsm(v,gt93),
    v=>lsm(v,gt94),
    v=>lsm(v,gt95),
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
    v=>lsm(v,gt96),
    nf,
    nf,
    v=>lsm(v,gt97),
    v=>lsm(v,gt98),
    v=>lsm(v,gt99),
    nf,
    nf,
    nf,
    v=>lsm(v,gt100),
    v=>lsm(v,gt101),
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
    v=>lsm(v,gt102),
    v=>lsm(v,gt103),
    nf,
    nf,
    nf,
    v=>lsm(v,gt104),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt105),
    nf,
    v=>lsm(v,gt106),
    nf,
    nf,
    v=>lsm(v,gt107),
    v=>lsm(v,gt108),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt109),
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt110),
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
    v=>lsm(v,gt111),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt112),
    nf,
    v=>lsm(v,gt113),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt114),
    nf,
    nf,
    nf,
    v=>lsm(v,gt115),
    nf,
    v=>lsm(v,gt116),
    nf,
    nf,
    v=>lsm(v,gt117),
    nf,
    nf,
    nf,
    v=>lsm(v,gt118),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt119),
    v=>lsm(v,gt120),
    v=>lsm(v,gt121),
    v=>lsm(v,gt3),
    nf,
    v=>lsm(v,gt122),
    v=>lsm(v,gt123),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt124),
    nf,
    nf,
    v=>lsm(v,gt125),
    v=>lsm(v,gt126),
    v=>lsm(v,gt127),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt126),
    nf,
    nf,
    v=>lsm(v,gt126),
    v=>lsm(v,gt126),
    nf,
    nf,
    v=>lsm(v,gt126),
    nf,
    v=>lsm(v,gt128),
    nf,
    nf,
    v=>lsm(v,gt129),
    nf,
    nf,
    v=>lsm(v,gt130),
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
    v=>lsm(v,gt131),
    nf,
    v=>lsm(v,gt132),
    nf,
    nf,
    v=>lsm(v,gt133),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt134),
    nf,
    nf,
    v=>lsm(v,gt135),
    nf,
    nf,
    v=>lsm(v,gt136),
    v=>lsm(v,gt137),
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt138),
    nf,
    nf,
    nf,
    v=>lsm(v,gt139),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt140),
    nf,
    v=>lsm(v,gt141),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt142),
    nf,
    nf,
    nf,
    v=>lsm(v,gt143),
    v=>lsm(v,gt144),
    v=>lsm(v,gt145),
    v=>lsm(v,gt146),
    nf,
    v=>lsm(v,gt147),
    nf,
    nf,
    v=>lsm(v,gt79),
    v=>lsm(v,gt80),
    nf,
    v=>lsm(v,gt148),
    v=>lsm(v,gt149),
    v=>lsm(v,gt150),
    v=>lsm(v,gt151),
    v=>lsm(v,gt152),
    nf,
    v=>lsm(v,gt100),
    v=>lsm(v,gt101),
    nf,
    v=>lsm(v,gt153),
    nf,
    v=>lsm(v,gt154),
    v=>lsm(v,gt155),
    v=>lsm(v,gt156),
    nf,
    v=>lsm(v,gt157),
    nf,
    v=>lsm(v,gt158),
    nf,
    nf,
    v=>lsm(v,gt159),
    nf,
    nf,
    nf,
    v=>lsm(v,gt94),
    nf,
    nf,
    nf,
    v=>lsm(v,gt160),
    nf,
    v=>lsm(v,gt161),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt162),
    nf,
    v=>lsm(v,gt163),
    v=>lsm(v,gt164),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt165),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt166),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt167),
    nf,
    nf,
    nf,
    v=>lsm(v,gt168),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt169),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt170),
    v=>lsm(v,gt171),
    nf,
    v=>lsm(v,gt172),
    v=>lsm(v,gt173),
    v=>lsm(v,gt174),
    v=>lsm(v,gt175),
    v=>lsm(v,gt176),
    nf,
    v=>lsm(v,gt177),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt178),
    nf,
    nf,
    nf,
    v=>lsm(v,gt179),
    nf,
    v=>lsm(v,gt180),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt159),
    nf,
    v=>lsm(v,gt181),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt182),
    v=>lsm(v,gt183),
    nf,
    nf,
    v=>lsm(v,gt184),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt185),
    v=>lsm(v,gt186),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt187),
    nf,
    v=>lsm(v,gt188),
    v=>lsm(v,gt189),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt190),
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
    v=>lsm(v,gt191),
    nf,
    v=>lsm(v,gt192),
    nf,
    v=>lsm(v,gt193),
    nf,
    v=>lsm(v,gt194),
    nf,
    nf,
    v=>lsm(v,gt195),
    nf,
    nf,
    nf,
    v=>lsm(v,gt196),
    v=>lsm(v,gt197),
    nf,
    v=>lsm(v,gt198),
    v=>lsm(v,gt199),
    v=>lsm(v,gt200),
    v=>lsm(v,gt201),
    nf,
    v=>lsm(v,gt202),
    nf,
    nf,
    v=>lsm(v,gt203),
    v=>lsm(v,gt204),
    nf,
    v=>lsm(v,gt205),
    nf,
    v=>lsm(v,gt206),
    v=>lsm(v,gt207),
    nf,
    v=>lsm(v,gt208),
    nf,
    nf,
    nf,
    v=>lsm(v,gt209),
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
    v=>lsm(v,gt186),
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt210),
    v=>lsm(v,gt211),
    v=>lsm(v,gt212),
    v=>lsm(v,gt213),
    v=>lsm(v,gt214),
    v=>lsm(v,gt215),
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt216),
    nf,
    v=>lsm(v,gt217),
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt218),
    v=>lsm(v,gt219),
    v=>lsm(v,gt220),
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
    v=>lsm(v,gt221),
    v=>lsm(v,gt222),
    nf,
    v=>lsm(v,gt223),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt224),
    v=>lsm(v,gt225),
    v=>lsm(v,gt226),
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt227),
    v=>lsm(v,gt228),
    nf,
    v=>lsm(v,gt229),
    nf,
    v=>lsm(v,gt230),
    nf,
    v=>lsm(v,gt231),
    v=>lsm(v,gt232),
    v=>lsm(v,gt233),
    v=>lsm(v,gt234),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt235),
    nf,
    v=>lsm(v,gt236),
    v=>lsm(v,gt237),
    nf,
    nf,
    v=>lsm(v,gt238),
    nf,
    nf,
    v=>lsm(v,gt239),
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
    v=>lsm(v,gt240),
    v=>lsm(v,gt241),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt242),
    v=>lsm(v,gt243),
    nf,
    nf,
    nf,
    v=>lsm(v,gt244),
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt245),
    v=>lsm(v,gt246),
    nf,
    v=>lsm(v,gt247),
    v=>lsm(v,gt248),
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt249),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt215),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt250),
    v=>lsm(v,gt251),
    nf,
    nf,
    v=>lsm(v,gt252),
    v=>lsm(v,gt220),
    nf,
    v=>lsm(v,gt220),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt222),
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt253),
    nf,
    nf,
    v=>lsm(v,gt254),
    nf,
    nf,
    v=>lsm(v,gt255),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt256),
    v=>lsm(v,gt257),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt258),
    v=>lsm(v,gt259),
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt260),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt261),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt262),
    v=>lsm(v,gt263),
    v=>lsm(v,gt264),
    nf,
    nf,
    v=>lsm(v,gt265),
    v=>lsm(v,gt266),
    v=>lsm(v,gt267),
    nf,
    v=>lsm(v,gt268),
    nf,
    v=>lsm(v,gt269),
    v=>lsm(v,gt242),
    nf,
    v=>lsm(v,gt243),
    nf,
    nf,
    v=>lsm(v,gt270),
    nf,
    nf,
    nf,
    v=>lsm(v,gt271),
    v=>lsm(v,gt272),
    v=>lsm(v,gt273),
    nf,
    nf,
    v=>lsm(v,gt274),
    v=>lsm(v,gt275),
    nf,
    nf,
    nf,
    v=>lsm(v,gt276),
    v=>lsm(v,gt248),
    nf,
    v=>lsm(v,gt277),
    v=>lsm(v,gt278),
    nf,
    v=>lsm(v,gt279),
    nf,
    v=>lsm(v,gt280),
    nf,
    nf,
    v=>lsm(v,gt270),
    nf,
    nf,
    nf,
    v=>lsm(v,gt281),
    nf,
    v=>lsm(v,gt282),
    v=>lsm(v,gt283),
    v=>lsm(v,gt284),
    nf,
    nf,
    nf,
    v=>lsm(v,gt220),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt285),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt286),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt287),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt288),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt242),
    v=>lsm(v,gt242),
    nf,
    v=>lsm(v,gt289),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt290),
    v=>lsm(v,gt291),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt292),
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
    v=>lsm(v,gt293),
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt294),
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
    v=>lsm(v,gt248),
    v=>lsm(v,gt248),
    nf,
    nf,
    nf,
    v=>lsm(v,gt295),
    nf,
    nf,
    v=>lsm(v,gt295),
    nf,
    v=>lsm(v,gt296),
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
    v=>lsm(v,gt297),
    v=>lsm(v,gt298),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt299),
    v=>lsm(v,gt300),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    v=>lsm(v,gt301),
    nf,
    v=>lsm(v,gt302),
    nf,
    nf,
    v=>lsm(v,gt303),
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf,
    nf];

    function getToken(l, SYM_LU) {
        if (l.END) return 0; /*9*/

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

                        if (tk == "$eof")
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
        return o[0];
    };

    // This prevents env variable access conflicts when concurrent compilation
    // are processing text data. 

    class CompilerEnvironment {
        constructor(presets, env, url) {
            this.functions = env.functions;
            this.prst = [presets];
            this.url = "";
            this.pending = 0;
            this.parent = null;
            this.ASI = true; // Automatic Semi-Colon Insertion
            this.pendingResolvedFunction = () => {};
        }

        pushPresets(prst) {
            this.prst.push(prst);
        }

        popPresets() {
            return this.prst.pop();
        }

        get presets() {
            return this.prst[this.prst.length - 1] || null;
        }

        setParent(parent){
            this.parent = parent;
            parent.pending++;
        }

        resolve() {
            this.pending--;
            if (this.pending < 1) {
                if (this.parent)
                    this.parent.resolve();
                else
                    this.pendingResolvedFunction();
            }
        }
    }

    var types = {
    		number:1,
    		string:2,
    		id:3,
    		object:4,
    		null:5,
    		stmts:6,
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
    		assignment:35,
    		equal:36,
    		or:37,
    		and:38,
    		bit_or:39,
    		bit_and:40,
    		member:41,
    		call:42,
    		return:43,
    		if:44,
    		post_inc:45,
    		post_dec:46,
    		pre_inc:47,
    		pre_dec:48,
    		condition:49,
    		class:50,
    		negate:51,
    		array_literal:52,
    		this_expr:53,
    		prop_bind:54,
    		function_declaration:55,
    		debugger:56,
    		expression_list:57,
    		new_member:58
    	};

    class base {
        constructor(...vals) {

            this.vals = vals;
            this.parent = null;
        }

        replaceNode(original, _new = null, vals = this.vals) {
            for (let i = 0; i < vals.length; i++) {
                if (vals[i] === original)
                    if (_new === null) {
                        return i;
                    } else
                        return vals[i] = _new, -1;
            }
        }

        replace(node) {
            if (this.parent)
                this.parent.replaceNode(this, node);
        }

        getRootIds() {}

        * traverseDepthFirst(p, vals = this.vals) {
            this.parent = p;
            yield this;

            for (let i = 0; i < vals.length; i++) {

                const expr = vals[i];

                if (!expr) continue;

                if(Array.isArray(expr)){
                    yield* this.traverseDepthFirst(p, expr);
                }else
                    yield* expr.traverseDepthFirst(this);

                if (vals[i] !== expr) // Check to see if expression has been replaced. 
                    i--;
            }
        }

        skip(trvs) {

            for (let val = trvs.next().value; val && val !== this; val = trvs.next().value);

            return trvs;
        }
        spin(trvs) {
            let val = trvs.next().value;
            while (val !== undefined && val !== this) { val = trvs.next().value; };
        }
        toString() { return this.render() }

        render() { return this.vals.join("") }

        get connect(){
            this.vals.forEach(v=>{
                try{
                    v.parent = this;
                }catch(e){
                    
                }
            });
            return this;
        }
    }

    /** FOR **/
    class for_stmt extends base {

        get init() { return this.vals[0] }
        get bool() { return this.vals[1] }
        get iter() { return this.vals[2] }
        get body() { return this.vals[3] }

        getRootIds(ids, closure) {

            closure = new Set([...closure.values()]);

            if (this.bool) this.bool.getRootIds(ids, closure);
            if (this.iter) this.iter.getRootIds(ids, closure);
            if (this.body) this.body.getRootIds(ids, closure);
        }

        * traverseDepthFirst(p) {
            this.parent = p;
            yield this;
            if (this.init) yield* this.init.traverseDepthFirst(this);
            if (this.bool) yield* this.bool.traverseDepthFirst(this);
            if (this.iter) yield* this.iter.traverseDepthFirst(this);
            if (this.body) yield* this.body.traverseDepthFirst(this);
            yield this;
        }

        get type() { return types.for }

        render() {
            let init, bool, iter, body;

            if (this.init) init = this.init.render();
            if (this.bool) bool = this.bool.render();
            if (this.iter) iter = this.iter.render();
            if (this.body) body = this.body.render();

            return `for(${init};${bool};${iter})${body}`;
        }
    }

    class call_expr extends base {
        constructor(sym) {
            super(sym[0], (Array.isArray(sym[1])) ? sym[1] : [sym[1]]);
        }

        get id() { return this.vals[0] }
        get args() { return this.vals[1] }

        replaceNode(original, _new) {
            if (original == this.id)
                this.id = _new;
            else
                for (let i = 0; i < this.args.length; i++) {
                    if (this.args[i] == original)
                        return this.args[i] = _new;
                }
        }

        getRootIds(ids, closure) {
            this.id.getRootIds(ids, closure);
            this.args.forEach(e => e.getRootIds(ids, closure));
        }

        * traverseDepthFirst(p) {
            this.parent = p;
            yield this;
            yield* this.id.traverseDepthFirst(this);
            yield* super.traverseDepthFirst(p, this.args);
        }

        get name() { return this.id.name }
        get type() { return types.call }

        render() { 
            return `${this.id.render()}(${this.args.map(a=>a.render()).join(",")})` 
        }
    }

    /** IDENTIFIER **/
    class id extends base {
        constructor(sym) {
            super(sym[0]);
            this.root = true;
        }

        get val() { return this.vals[0] }

        getRootIds(ids, closuere) { if (!closuere.has(this.val)) ids.add(this.val); }

        * traverseDepthFirst(p) {
            this.parent = p;
            yield this;
        }

        get name() { return this.val }

        get type() { return types.id }

        render() { return this.val }
    }

    /** CATCH **/
    class catch_stmt extends base {
        constructor(sym) {
            super(sym[2], sym[4]);
        }

        get param() { return this.vals[0] }
        get body() { return this.vals[1] }

        getRootIds(ids, closure) {
            if (this.body) this.body.getRootIds(ids, closure);
        }

        * traverseDepthFirst(p) {
            this.parent = p;
            yield this;
            yield* this.param.traverseDepthFirst(this);
            yield* this.body.traverseDepthFirst(this);
        }

        get type() { return types.catch }
    }

    /** TRY **/
    class try_stmt extends base {
        constructor(body, _catch, _finally) {
            super(body, _catch, _finally);


        }
        get catch() { return this.vals[0] }
        get body() { return this.vals[1] }
        get finally() { return this.vals[2] }

        getRootIds(ids, clsr) {
            this.body.getRootIds(ids, clsr);
            if (this.catch) this.catch.getRootIds(ids, clsr);
            if (this.finally) this.finally.getRootIds(ids, clsr);
        }

        * traverseDepthFirst(p) {
            this.parent = p;
            yield this;
            if (this.body) yield* this.body.traverseDepthFirst(p);
            if (this.catch) yield* this.catch.traverseDepthFirst(p);
            if (this.finally) yield* this.finally.traverseDepthFirst(p);
        }

        get type() { return types.try }
    }

    /** STATEMENTS **/
    class stmts extends base {
        constructor(sym) {

            if (sym[0].length == 1)
                return sym[0][0];
            
            super(sym[0]);
        }

        get stmts() { return this.vals[0] }

        getRootIds(ids, closure) {
            this.stmts.forEach(s => s.getRootIds(ids, closure));
        }

        replaceNode(original, _new = null) {
            let index = -1;
            if ((index = super.replaceNode(original, _new, this.vals[0])) > -1) {
                this.vals[0].splice(index, 1);
            }
        }

        * traverseDepthFirst(p) {
            yield * super.traverseDepthFirst(p, this.vals[0]);
        }

        get type() { return types.stmts }

        render() { 
            return this.stmts.map(s=>(s.render())).join("") ;
        }
    }

    /** BLOCK **/
    class block extends stmts {

        constructor(sym) {
            if (!(sym[1] instanceof stmts))
                return sym[1];

            super(sym[1].vals);
        }

        getRootIds(ids, closure) {
            super.getRootIds(ids, new Set([...closure.values()]));
        }

        get type() { return types.block }

        render() { return `{${super.render()}}` }
    }

    /** LEXICAL DECLARATION **/
    class lexical extends base {
        constructor(sym) {
            super(sym[1]);
            this.mode = sym[0];
        }

        get bindings() { return this.vals[0] }

        getRootIds(ids, closure) {
            this.bindings.forEach(b => b.getRootIds(ids, closure));
        }

        get type() { return types.lex }

        render() { return `${this.mode} ${this.bindings.map(b=>b.render()).join(",")};` }
    }

    /** BINDING DECLARATION **/
    class binding extends base {
        constructor(sym) {
            super(sym[0], sym[1] || null);
            this.id.root = false;
        }

        get id() { return this.vals[0] }
        get init() { return this.vals[1] }

        getRootIds(ids, closure) {
            this.id.getRootIds(closure, closure);
            if (this.init) this.init.getRootIds(ids, closure);
        }

        * traverseDepthFirst(p) {
            this.parent = p;
            yield this;
            yield* this.id.traverseDepthFirst(this);
            yield* this.init.traverseDepthFirst(this);
        }

        render() { return `${this.id}${this.init ? ` = ${this.init.render()}` : ""}` }
    }

    /** MEMBER **/

    class mem extends base {
        constructor(sym) { super(sym[0], sym[2]);
            this.root = true;
            this.mem.root = false;
        }

        get id() { return this.vals[0] }
        get mem() { return this.vals[1] }

        getRootIds(ids, closuere) {
            this.id.getRootIds(ids, closuere);
        }

        * traverseDepthFirst(p) {
            this.parent = p;
            yield this;
            yield* this.id.traverseDepthFirst(this);
            yield* this.mem.traverseDepthFirst(this);
        }

        get name() { return this.id.name }
        get type() { return types.member }

        render() { 
            if(this.mem instanceof mem || this.mem instanceof id){
                return `${this.id.render()}.${this.mem.render()}`;
            }else{
                return `${this.id.render()}[${this.mem.render()}]`;
            }
        }
    }

    /** OPERATOR **/
    class operator$1 extends base {

        constructor(sym) {
            super(sym[0], sym[2]);
            this.op = "";
        }

        get left() { return this.vals[0] }
        get right() { return this.vals[1] }

        replaceNode(original, _new = null) {
            var index;

            if ((index = super.replaceNode(original, _new)) > -1){
                this.replace(this.vals[(index+1)%2]);
            }
        }

        render() { return `${this.left.render()} ${this.op} ${this.right.render()}` }
    }

    /** ASSIGNEMENT EXPRESSION **/

    class assign extends operator$1 {
        constructor(sym) {
            super(sym);
            this.op = sym[1];
            this.id.root = false;
        }
        get id() { return this.vals[0] }
        get expr() { return this.vals[2] }
        get type() { return types.assign }
    }

    /** MULTIPLY **/
    class add extends operator$1 {

        constructor(sym) {
            super(sym);
            this.op = "+";
        }

        get type() { return types.add }
    }

    /** EXPONENT **/
    class exp extends operator$1 {

        constructor(sym) {
            super(sym);
            this.op = "**";
        }

        get type() { return types.exp }
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
            super(sym[0] || []);
        }

        get props() { return this.vals[0] }

        * traverseDepthFirst(p) {
            this.parent = p;
            yield this;
            for (const prop of this.props)
                yield* prop.traverseDepthFirst(this);
        }

        get type() { return types.object }

        render() { return `{${this.props.map(p=>p.render()).join(",")}}` }
    }

    /** DEBUGGER STATEMENT  **/

    class debugger_stmt extends base {
        constructor() {
            super();
        }

        getRootIds(ids, closure) {
            if (this.expr) this.expr.getRootIds(ids, closure);
        }

        * traverseDepthFirst(p) {
            this.parent = p;
            yield this;
        }

        get type() { return types.debugger }

        render() { return `debugger` }
    }

    /** STRING **/

    class string$2 extends base {
        constructor(sym) { super(sym.length === 3 ? sym[1]: ""); }

        get val() { return this.vals[0] }

        getRootIds(ids, closuere) { if (!closuere.has(this.val)) ids.add(this.val); }

        * traverseDepthFirst(p) {
            this.parent = p;
            yield this;
        }


        get type() { return types.string }

        render() { return `"${this.val}"` }
    }

    /** NULL **/
    class null_ extends base {
        constructor() { super(); }
        get type() { return types.null }
        render() { return "null" }
    }

    /** NUMBER **/
    class number$2 extends base {
        constructor(sym) { super(parseFloat(sym)); }
        get val() { return this.vals[0] }
        get type() { return types.number }
        render() { return this.val + "" }
        * traverseDepthFirst(p) {
            this.parent = p;
            yield this;
        }
    }

    /** BOOLEAN **/

    class bool$1 extends base {
        constructor(sym) { super(sym[0]); }

        get type() { return types.bool }

        * traverseDepthFirst(p) {
            this.parent = p;
            yield this;
        }
    }

    /** OPERATOR **/
    class unary_pre extends base {

        constructor(sym) {
            super(sym[1]);
            this.op = "";
        }

        get expr() { return this.vals[0] }

        render() { return `${this.op}${this.expr.render()}` }
    }

    /** NEGATE **/

    class negate extends unary_pre {
        constructor(sym) { super(sym);
            this.op = "-";
        }
        get type() { return types.negate }
    }

    /** RETURN STATMENT  **/



    class return_stmt extends base {
        constructor(sym) {
            super((sym.length > 2) ? sym[1] : null);
        }

        get expr() { return this.vals[0] }

        getRootIds(ids, closure) {
            if (this.expr) this.expr.getRootIds(ids, closure);
        }

        get type() { return types.return }

        render() {
            let expr_str = "";
            if (this.expr) {
                if (Array.isArray(this.expr)) {
                    expr_str = this.expr.map(e=>e.render()).join(",");
                } else
                    expr_str = this.expr.render();
            }
            return `return ${expr_str};`;
        }
    }

    /** CONDITION EXPRESSIONS **/
    class condition extends base {
        constructor(sym) {
            super(sym[0], sym[2], sym[4]);
        }

        get bool() { return this.vals[0] }
        get left() { return this.vals[1] }
        get right() { return this.vals[2] }

        getRootIds(ids, closure) {
            this.bool.getRootIds(ids, closure);
            this.left.getRootIds(ids, closure);
            this.right.getRootIds(ids, closure);
        }

        get type() { return types.condition }

        render() {
            const
                bool = this.bool.render(),
                left = this.left.render(),
                right = this.right.render();

            return `${bool} ? ${left} : ${right}`;
        }
    }

    class array_literal extends base {
        constructor(sym) {
            super(sym[0]);
        }

        get exprs() { return this.vals[0] }

        getRootIds(ids, closure) {
            this.exprs.forEach(e => e.getRootIds(ids, closure));
        }

        replaceNode(original, _new = null) {
            let index = 0;
            if ((index = super.replaceNode(original, _new, this.vals[0])) > -1) {
                this.vals[0].splice(index, 1);
            }
        }

        * traverseDepthFirst(p) {
            this.parent = p;

            yield this;

            for (let i = 0; i < this.exprs.length; i++) {

                const expr = this.exprs[i];

                yield* expr.traverseDepthFirst(this);

                if (this.exprs[i] !== expr)
                    yield* this.exprs[i].traverseDepthFirst(this);
            }
        }

        get name() { return this.id.name }

        get type() { return types.array_literal }

        render() { return `[${this.exprs.map(a=>a.render()).join(",")}]` }
    }

    /** THIS EXPRESSION  **/



    class this_expr extends base {
        constructor() {
            super();
            this.root = false;
        }

        getRootIds(ids, closure) {
            if (this.expr) this.expr.getRootIds(ids, closure);
        }

        * traverseDepthFirst(p) {
            this.parent = p;
            yield this;
        }
        get name() { return "this" }
        get type() { return types.this_expr }

        render() { return `this` }
    }

    /** PROPERTY BINDING DECLARATION **/
    class property_binding extends binding {
        constructor(sym) {
            super([sym[0], sym[2]]);
        }
        get type( ){return types.prop_bind}
        render() { return `${this.id.type > 4 ? `[${this.id.render()}]` : this.id.render()} : ${this.init.render()}` }
    }

    class funct_decl extends base {
        constructor(id, args, body) {
            
            args = (Array.isArray(args)) ? args : [args];

            super(id, args || [], body || []);

            //This is a declaration and id cannot be a closure variable. 
            if (this.id)
                this.id.root = false;
        }

        get id() { return this.vals[0] }
        get args() { return this.vals[1] }
        get body() { return this.vals[2] }

        getRootIds(ids, closure) {
            if (this.id)
                this.id.getRootIds(ids, closure);
            this.args.forEach(e => e.getRootIds(ids, closure));
        }

        * traverseDepthFirst(p) {
            this.parent = p;

            yield this;

            if (this.id)
                yield* this.id.traverseDepthFirst(this);

            for (const arg of this.args)
                yield* arg.traverseDepthFirst(this);

            yield* this.body.traverseDepthFirst(this);

        }

        get name() { return this.id.name }

        get type() { return types.function_declaration }

        render() {
            const
                body_str = this.body.render(),
                args_str = this.args.map(e => e.render()).join(","),
                id = this.id ? this.id.render() : "";

            return `function ${id}(${args_str}){${body_str}}`;
        }
    }

    class arrow extends funct_decl {
        constructor(...sym) {
            super(...sym);
        }

        getRootIds(ids, closure) {
            this.args.forEach(e => e.getRootIds(ids, closure));
        }

        * traverseDepthFirst(p) {
            this.parent = p;

            yield this;

            if (this.id)
                yield* this.id.traverseDepthFirst(this);

            for (const arg of this.args)
                yield* arg.traverseDepthFirst(this);

            yield* this.body.traverseDepthFirst(this);

        }

        get name() { return null }

        get type() { return types.arrow_function_declaration }

        render() {
            const
                body_str = this.body.render(),
                args_str = this.args.map(e => e.render()).join(",");
            return `${this.args.length == 1 ? args_str : `(${args_str})`} => ${body_str}`;
        }
    }

    /** EXPRESSION_LIST **/

    class expression_list extends base {
        constructor(sym) {

            if (sym[0].length == 1)
                return sym[0][0];

            super(sym[0]);
        }

        get expressions() { return this.vals[0] }

        getRootIds(ids, closure) {
            this.expressions.forEach(s => s.getRootIds(ids, closure));
        }

        replaceNode(original, _new = null) {
            let index = -1;
            if ((index = super.replaceNode(original, _new, this.vals[0])) > -1) {
                this.vals[0].splice(index, 1);
            }
        }

        * traverseDepthFirst(p) {
            yield * super.traverseDepthFirst(p, this.vals[0]);
        }

        get type() { return types.expression_list }

        render() { return `(${this.expressions.map(s=>s.render()).join(",")})` }
    }

    /** STATEMENTS **/

    class if_stmt extends base {
        constructor(sym) {
            const expr = sym[2],
                stmt = sym[4],
                else_stmt = (sym.length > 5) ? sym[6] : null;

            super(expr, stmt, else_stmt);
        }

        get expr() { return this.vals[0] }
        get stmt() { return this.vals[1] }
        get else_stmt() { return this.vals[2] }

        getRootIds(ids, closure) {
            this.expr.getRootIds(ids, closure);
            this.stmt.getRootIds(ids, closure);
            if (this.else_stmt)
                this.else_stmt.getRootIds(ids, closure);
        }

        * traverseDepthFirst(p) {

            this.parent = p;

            yield this;

            yield* this.expr.traverseDepthFirst(this);
            yield* this.stmt.traverseDepthFirst(this);

            if (this.else_stmt)
                yield* this.else_stmt.traverseDepthFirst(this);
        }

        get type() { return types.if }

        render() {
            const
                expr = this.expr.render(),
                stmt = this.stmt.render(),
                _else = (this.else_stmt) ? " else " + this.else_stmt.render() : "";
            return `if(${expr})${stmt}${_else}`;
        }
    }

    /** OPERATOR **/

    class unary_post extends base {

        constructor(sym) {
            super(sym[0]);
            this.op = "";
        }

        get expr() { return this.vals[0] }
        render() { return `${this.expr.render()}${this.op}` }
    }

    /** POSTFIX INCREMENT **/

    class post_inc extends unary_post {

        constructor(sym) {
            super(sym);
            this.op = "++";
        }

        get type() { return types.post_inc }

    }

    /** POSTFIX INCREMENT **/

    class post_dec extends unary_post {

        constructor(sym) {
            super(sym);
            this.op = "--";
        }

        get type() { return types.post_dec }
    }

    /** EXPRESSION_LIST **/

    class expr_stmt extends base {

        constructor(sym) {
            super(sym[0]);
        }

        get expression() { return this.vals[0] }

        getRootIds(ids, closure) {
            this.expression.getRootIds(ids, closure);
        }

        replaceNode(original, _new = null) {
            if(!super.replaceNode(original, _new, this.vals[0]))
                this.replace();
        }

        * traverseDepthFirst(p) {
            this.parent = p;
            yield this;
            yield* this.expression.traverseDepthFirst(this);

        }

        get type() { return types.expression_statement }

        render() { return this.expression.render() + ";" }
    }

    /** OR **/
    class _or extends operator$1 {

        constructor(sym) {
            super(sym);
            this.op = "||";
        }

        get type() { return types.or }
    }

    /** AND **/
    class _and extends operator$1 {

        constructor(sym) {
            super(sym);
            this.op = "&&";
        }

        get type() { return types.and }
    }

    /** NOT **/

    class node extends unary_pre {

        constructor(sym) {
            super(sym);
            this.op = "!";
        }

        get type() { return types.node }

    }

    /** MEMBER **/

    class mem$1 extends base {
        constructor(sym) { super(sym[1], sym[2]);
            this.root = false;
            this.id.root = false;
        }

        get id() { return this.vals[0] }
        get args() { return this.vals[1] }

        getRootIds(ids, closuere) {
            this.id.getRootIds(ids, closuere);
        }

        get name() { return this.id.name }
        get type() { return types.new_member }

        render() { 
            const
                args_str = this.args.map(e => e.render()).join(",");

            return `new ${this.id.render()}(${args_str})`;
        }
    }

    /** SPREAD **/

    class node$1 extends unary_pre {

        constructor(sym) {
            super(sym);
            this.op = "...";
        }

        get type() { return types.spread }

    }

    /** EQ **/
    class equal extends operator$1 {
        constructor(sym) {super(sym); this.op = "=="; }
        get type() { return types.equal }
    }

    /** GREATER **/
    class greater extends operator$1 {
        constructor(sym) {super(sym);this.op = ">";}
        get type() { return types.greater }
    }

    /** GREATER THAN EQ **/
    class greater_eq extends operator$1 {
        constructor(sym) {super(sym);this.op = ">=";}
        get type() { return types.greater_eq }
    }

    /** LESS **/
    class less extends operator$1 {
        constructor(sym) {super(sym);this.op = "<";}
        get type() { return types.less }
    }

    /** LESS THAN EQUAL **/

    class less_eq extends operator$1 {
        constructor(sym) {super(sym);this.op = "<=";}
        get type() { return types.less_eq }
    }

    let fn$1 = {}; const 
    /************** Maps **************/

        /* Symbols To Inject into the Lexer */
        symbols$1 = ["...","<",">","<=",">=","==","!=","===","!==","**","++","--","<<",">>",">>>","&&","||","+=","-=","*=","%=","/=","**=","<<=",">>=",">>>=","&=","|=","^=","=>"],

        /* Goto lookup maps */
        gt0$1 = [0,-1,1,-18,2,3,6,5,4,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-7,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt1$1 = [0,-22,119,-2,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-7,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt2$1 = [0,-22,6,5,120,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-7,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt3$1 = [0,-115,124],
    gt4$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,164,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt5$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,175,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt6$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,176,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt7$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,177,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt8$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,178,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt9$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,179,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt10$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,180,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt11$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,181,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt12$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,182,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt13$1 = [0,-99,184],
    gt14$1 = [0,-99,189],
    gt15$1 = [0,-63,66,173,-14,67,174,-11,190,191,61,62,87,-4,60,168,-7,167,-20,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt16$1 = [0,-156,194],
    gt17$1 = [0,-144,197,195],
    gt18$1 = [0,-146,207,205],
    gt19$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,216,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt20$1 = [0,-99,221],
    gt21$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-17,222,165,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt22$1 = [0,-49,224],
    gt23$1 = [0,-57,226,227,-73,229,231,232,-19,228,230,72,71,70],
    gt24$1 = [0,-26,236,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt25$1 = [0,-152,242,-2,243,72,71,70],
    gt26$1 = [0,-152,245,-2,243,72,71,70],
    gt27$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,247,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt28$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,249,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt29$1 = [0,-31,250],
    gt30$1 = [0,-81,253,254,-71,252,230,72,71,70],
    gt31$1 = [0,-154,258,230,72,71,70],
    gt32$1 = [0,-61,259,260,-69,262,231,232,-19,261,230,72,71,70],
    gt33$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,264,-2,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt34$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,265,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt35$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,266,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt36$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,267,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt37$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-7,268,35,36,37,38,39,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt38$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-8,269,36,37,38,39,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt39$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-9,270,37,38,39,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt40$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-10,271,38,39,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt41$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-11,272,39,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt42$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-12,273,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt43$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-12,274,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt44$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-12,275,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt45$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-12,276,40,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt46$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-13,277,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt47$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-13,278,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt48$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-13,279,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt49$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-13,280,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt50$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-13,281,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt51$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-13,282,41,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt52$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-14,283,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt53$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-14,284,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt54$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-14,285,42,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt55$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-15,286,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt56$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-15,287,43,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt57$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-16,288,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt58$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-16,289,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt59$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-16,290,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt60$1 = [0,-63,66,173,-13,89,67,174,-10,166,56,58,61,62,87,57,88,-2,60,168,-7,167,-16,291,44,45,53,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt61$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,294,293,297,296,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt62$1 = [0,-86,304,-16,300,301,306,310,311,302,-39,312,313,-3,303,-1,170,72,71,307],
    gt63$1 = [0,-156,72,71,315],
    gt64$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,316,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt65$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-1,318,60,168,-7,167,-3,319,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt66$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,321,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt67$1 = [0,-156,72,71,322],
    gt68$1 = [0,-99,323],
    gt69$1 = [0,-144,326],
    gt70$1 = [0,-146,328],
    gt71$1 = [0,-132,332,231,232,-19,331,230,72,71,70],
    gt72$1 = [0,-156,72,71,333],
    gt73$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,334,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt74$1 = [0,-63,66,173,-7,31,91,335,-3,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,-8,167,-3,336,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt75$1 = [0,-26,339,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-1,338,22,-3,23,13,-6,66,340,-7,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt76$1 = [0,-109,343],
    gt77$1 = [0,-109,345],
    gt78$1 = [0,-105,352,310,311,-27,347,348,-2,350,-1,351,-6,312,313,-4,353,230,72,71,307],
    gt79$1 = [0,-112,355,-19,362,231,232,-2,357,359,-1,360,361,356,-11,353,230,72,71,70],
    gt80$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,363,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt81$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,365,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt82$1 = [0,-36,371,-22,369,372,-2,66,173,-7,31,91,-4,89,67,174,-7,28,27,366,370,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt83$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,374,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt84$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,378,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt85$1 = [0,-52,380,381],
    gt86$1 = [0,-81,384,254],
    gt87$1 = [0,-83,386,388,389,390,-18,393,310,311,-40,312,313,-6,72,71,394],
    gt88$1 = [0,-63,66,173,-13,89,67,174,-10,395,56,58,61,62,87,57,88,-2,60,168,-7,167,-20,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt89$1 = [0,-66,396,398,397,400,-62,362,231,232,-5,401,361,399,-11,353,230,72,71,70],
    gt90$1 = [0,-109,405],
    gt91$1 = [0,-109,406],
    gt92$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-2,411,410,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt93$1 = [0,-112,413],
    gt94$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,415,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt95$1 = [0,-109,418],
    gt96$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,419,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt97$1 = [0,-105,422,310,311,-40,312,313,-6,72,71,394],
    gt98$1 = [0,-105,423,310,311,-40,312,313,-6,72,71,394],
    gt99$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,424,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt100$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,428,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt101$1 = [0,-22,6,5,436,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-6,435,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt102$1 = [0,-58,437,-73,229,231,232,-19,228,230,72,71,70],
    gt103$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,438,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt104$1 = [0,-154,442,230,72,71,70],
    gt105$1 = [0,-109,444],
    gt106$1 = [0,-132,362,231,232,-5,447,361,445,-11,353,230,72,71,70],
    gt107$1 = [0,-132,452,231,232,-19,451,230,72,71,70],
    gt108$1 = [0,-109,453],
    gt109$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,458,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt110$1 = [0,-37,461,-19,460,227,-73,463,231,232,-19,462,230,72,71,70],
    gt111$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,464,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt112$1 = [0,-37,470,-23,259,260,-69,472,231,232,-19,471,230,72,71,70],
    gt113$1 = [0,-36,475,-23,476,-2,66,173,-13,89,67,174,-10,473,56,58,61,62,87,57,88,-2,60,168,-7,167,-20,169,-11,65,-4,77,78,76,75,-1,64,-1,170,72,71,70],
    gt114$1 = [0,-53,479],
    gt115$1 = [0,-31,481],
    gt116$1 = [0,-83,482,388,389,390,-18,393,310,311,-40,312,313,-6,72,71,394],
    gt117$1 = [0,-85,485,390,-18,393,310,311,-40,312,313,-6,72,71,394],
    gt118$1 = [0,-86,486,-18,393,310,311,-40,312,313,-6,72,71,394],
    gt119$1 = [0,-66,489,398,397,400,-62,362,231,232,-5,401,361,399,-11,353,230,72,71,70],
    gt120$1 = [0,-62,490,-69,262,231,232,-19,261,230,72,71,70],
    gt121$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,491,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt122$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-1,495,494,493,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt123$1 = [0,-86,304,-17,497,306,310,311,302,-39,312,313,-3,303,-1,170,72,71,307],
    gt124$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,498,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt125$1 = [0,-65,499,500,398,397,400,-62,362,231,232,-5,401,361,399,-11,353,230,72,71,70],
    gt126$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,505,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt127$1 = [0,-132,508,231,232,-19,507,230,72,71,70],
    gt128$1 = [0,-105,352,310,311,-27,510,-3,512,-1,351,-6,312,313,-4,353,230,72,71,307],
    gt129$1 = [0,-132,362,231,232,-5,513,361,-12,353,230,72,71,70],
    gt130$1 = [0,-112,516,-19,362,231,232,-3,518,-1,360,361,517,-11,353,230,72,71,70],
    gt131$1 = [0,-26,519,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt132$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,520,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt133$1 = [0,-26,521,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt134$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,522,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt135$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,525,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt136$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,531,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt137$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,533,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt138$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,534,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt139$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,535,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt140$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,536,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt141$1 = [0,-37,538,-94,540,231,232,-19,539,230,72,71,70],
    gt142$1 = [0,-37,470,-94,540,231,232,-19,539,230,72,71,70],
    gt143$1 = [0,-44,542],
    gt144$1 = [0,-26,544,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt145$1 = [0,-54,545,-77,547,231,232,-19,546,230,72,71,70],
    gt146$1 = [0,-68,550,551,-62,362,231,232,-5,401,361,399,-11,353,230,72,71,70],
    gt147$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,553,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt148$1 = [0,-69,557,-17,556,-44,362,231,232,-5,401,361,-12,353,230,72,71,70],
    gt149$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,558,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt150$1 = [0,-132,362,231,232,-5,447,361,563,-11,353,230,72,71,70],
    gt151$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,568,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt152$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,570,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt153$1 = [0,-26,572,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt154$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,573,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt155$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,575,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt156$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,576,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt157$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,577,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt158$1 = [0,-26,580,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt159$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,585,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt160$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,587,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt161$1 = [0,-45,589,591,590],
    gt162$1 = [0,-22,6,5,436,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-5,595,596,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt163$1 = [0,-26,602,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt164$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,604,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt165$1 = [0,-26,607,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt166$1 = [0,-26,609,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt167$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,611,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt168$1 = [0,-26,616,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt169$1 = [0,-26,617,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt170$1 = [0,-26,618,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt171$1 = [0,-26,619,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt172$1 = [0,-26,620,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt173$1 = [0,-26,621,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt174$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-10,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,623,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt175$1 = [0,-46,627,625],
    gt176$1 = [0,-45,628,591],
    gt177$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,630,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt178$1 = [0,-31,632],
    gt179$1 = [0,-22,6,5,436,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-5,634,596,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt180$1 = [0,-22,6,5,436,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-5,635,596,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt181$1 = [0,-22,6,5,436,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-5,636,596,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt182$1 = [0,-26,639,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt183$1 = [0,-26,640,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt184$1 = [0,-26,641,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt185$1 = [0,-63,66,173,-7,31,91,-4,89,67,174,-7,28,27,642,32,56,58,61,62,87,57,88,-2,60,168,-7,167,-3,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,-1,64,92,218,72,71,70],
    gt186$1 = [0,-26,645,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt187$1 = [0,-26,646,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt188$1 = [0,-26,647,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt189$1 = [0,-26,648,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt190$1 = [0,-26,649,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt191$1 = [0,-26,651,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt192$1 = [0,-46,652],
    gt193$1 = [0,-46,627],
    gt194$1 = [0,-22,6,5,656,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-7,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt195$1 = [0,-22,6,5,436,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-5,660,596,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt196$1 = [0,-26,661,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt197$1 = [0,-26,663,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt198$1 = [0,-26,664,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt199$1 = [0,-26,665,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt200$1 = [0,-22,6,5,667,7,8,9,111,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-2,112,116,-2,66,114,-7,31,91,-4,89,67,110,-7,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],
    gt201$1 = [0,-26,669,-2,16,10,24,14,11,15,97,-2,17,18,19,21,20,98,-4,12,-2,22,-3,23,13,-6,66,-8,31,91,-4,89,67,-8,28,27,26,32,56,58,61,62,87,57,88,-2,60,-12,29,-1,30,33,34,35,36,37,38,39,40,41,42,43,44,45,53,68,-11,65,-4,77,78,76,75,93,64,92,69,72,71,70],

        // State action lookup maps
        sm0$1=[0,1,2,3,-1,0,-4,0,-8,4,-3,5,-1,6,7,8,-2,9,10,-2,11,12,13,14,-2,15,16,17,18,19,20,21,-2,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm1$1=[0,43,-3,0,-4,0],
    sm2$1=[0,44,-3,0,-4,0],
    sm3$1=[0,45,-3,0,-4,0],
    sm4$1=[0,46,-3,0,-4,0],
    sm5$1=[0,47,2,3,-1,0,-4,0,-8,4,47,-2,5,47,6,7,8,-2,9,10,-2,11,12,13,14,-2,15,16,17,18,19,20,21,47,-1,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm6$1=[0,48,48,48,-1,0,-4,0,-8,48,48,-2,48,48,48,48,48,48,-1,48,48,-2,48,48,48,48,-2,48,48,48,48,48,48,48,48,-1,48,-2,48,48,-5,48,-2,48,-2,48,-31,48,48,-3,48,48,48,48,48,48,48,-7,48,48,48,48,48,48],
    sm7$1=[0,49,49,49,-1,0,-4,0,-8,49,49,-2,49,49,49,49,49,49,-1,49,49,-2,49,49,49,49,-2,49,49,49,49,49,49,49,49,-1,49,-2,49,49,-5,49,-2,49,-2,49,-31,49,49,-3,49,49,49,49,49,49,49,-7,49,49,49,49,49,49],
    sm8$1=[0,50,50,50,-1,0,-4,0,-8,50,50,-2,50,50,50,50,50,50,-1,50,50,-2,50,50,50,50,-2,50,50,50,50,50,50,50,50,-1,50,-2,50,50,-5,50,-2,50,-2,50,-31,50,50,-3,50,50,50,50,50,50,50,-7,50,50,50,50,50,50],
    sm9$1=[0,51,51,51,-1,0,-4,0,-8,51,51,-2,51,51,51,51,51,51,-1,51,51,-1,51,51,51,51,51,-2,51,51,51,51,51,51,51,51,-1,51,-2,51,51,-5,51,-2,51,-2,51,-31,51,51,-3,51,51,51,51,51,51,51,-7,51,51,51,51,51,51],
    sm10$1=[0,52,52,52,-1,0,-4,0,-8,52,52,-2,52,52,52,52,52,52,-1,52,52,-1,52,52,52,52,52,-2,52,52,52,52,52,52,52,52,-1,52,-2,52,52,-5,52,-2,52,-2,52,-31,52,52,-3,52,52,52,52,52,52,52,-7,52,52,52,52,52,52],
    sm11$1=[0,-1,2,3,-1,0,-4,0,-8,4,-3,5,-1,6,7,8,-2,9,10,-2,11,12,13,14,-2,15,16,17,18,19,20,21,-2,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm12$1=[0,-4,0,-4,0,-12,53],
    sm13$1=[0,-4,0,-4,0,-5,54,-6,55,-8,55,-15,55,-11,55],
    sm14$1=[0,-4,0,-4,0,-5,56,-6,56,-8,56,-15,56,-11,56],
    sm15$1=[0,-4,0,-4,0,-5,57,-6,57,-8,57,-15,57,-11,57],
    sm16$1=[0,-4,0,-4,0,-5,58,-3,58,-2,58,-8,58,-15,58,-11,58],
    sm17$1=[0,-4,0,-4,0,-5,59,59,-2,59,-2,59,-8,59,-5,59,-9,59,-11,59,-5,60,61,62,63,64,65,66,67,68,69,70,71,72,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,-5,73,74],
    sm18$1=[0,-4,0,-4,0,-5,75,-3,75,-2,75,-8,75,-15,75,-11,75,-18,76,77],
    sm19$1=[0,-4,0,-4,0,-5,78,-3,78,-2,78,-8,78,-15,78,-11,78,-18,78,78,79],
    sm20$1=[0,-4,0,-4,0,-5,80,-3,80,-2,80,-8,80,-15,80,-11,80,-18,80,80,80,81],
    sm21$1=[0,-4,0,-4,0,-5,82,-3,82,-2,82,-8,82,-15,82,-11,82,-18,82,82,82,82,83],
    sm22$1=[0,-4,0,-4,0,-5,84,-3,84,-2,84,-8,84,-15,84,-11,84,-18,84,84,84,84,84,85],
    sm23$1=[0,-4,0,-4,0,-5,86,-3,86,-2,86,-8,86,-15,86,-11,86,-18,86,86,86,86,86,86,87,88,89,90],
    sm24$1=[0,-4,0,-4,0,-5,91,-3,91,-2,91,-8,91,-5,92,-9,91,-11,91,-18,91,91,91,91,91,91,91,91,91,91,93,94,95,96,97],
    sm25$1=[0,-4,0,-4,0,-5,98,-3,98,-2,98,-8,98,-5,98,-9,98,-11,98,-18,98,98,98,98,98,98,98,98,98,98,98,98,98,98,98,99,100,101],
    sm26$1=[0,-4,0,-4,0,-5,102,-3,102,-2,102,-8,102,-5,102,-9,102,-11,102,-18,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,102,103,104],
    sm27$1=[0,-4,0,-4,0,-5,105,106,-2,105,-2,105,-8,105,-5,105,-9,105,-11,105,-18,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,107,108],
    sm28$1=[0,-4,0,-4,0,-5,109,109,-2,109,-2,109,-8,109,-5,109,-9,109,-11,109,-18,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109,109],
    sm29$1=[0,-4,0,-4,0,-5,110,110,-2,110,-2,110,-8,110,-5,110,-9,110,-11,110,-18,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110,110],
    sm30$1=[0,-4,0,-4,0,-5,111,111,-2,111,-2,111,-8,111,-5,111,-9,111,-11,111,-18,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,112],
    sm31$1=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm32$1=[0,-4,0,-4,0,-5,111,111,-2,111,-2,111,-8,111,-5,111,-9,111,-11,111,-18,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
    sm33$1=[0,-4,0,-4,0,-5,115,115,-1,115,115,-2,115,-8,115,-5,115,115,-8,115,-11,115,-5,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,-5,115,115],
    sm34$1=[0,-4,0,-4,0,-5,115,115,-1,115,115,-2,115,-4,116,-2,117,115,-5,115,115,-8,115,-11,115,118,-4,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,115,-5,115,115],
    sm35$1=[0,-4,0,-4,0,-5,119,119,-1,119,119,-2,119,-4,120,-2,117,119,-5,119,119,-8,119,-11,119,121,-4,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,-5,119,119],
    sm36$1=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,-27,25,-1,122,123,-2,27,-50,37,38,39,40,41,42],
    sm37$1=[0,-4,0,-4,0,-5,124,124,-1,124,124,-2,124,-4,124,-2,124,124,-5,124,124,-8,124,-11,124,124,-4,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,124,-5,124,124],
    sm38$1=[0,-4,0,-4,0,-5,125,125,-1,125,125,-2,125,-4,125,-2,125,125,-5,125,125,-8,125,-11,125,125,-4,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,125,-5,125,125],
    sm39$1=[0,-4,0,-4,0,-5,126,126,-1,126,126,-2,126,-4,126,-2,126,126,-5,126,126,-8,126,-11,126,126,-4,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,-5,126,126],
    sm40$1=[0,-4,0,-4,0,-5,126,126,-2,126,-2,126,-4,126,-2,126,126,-5,126,126,-8,126,-5,127,-5,126,126,-4,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,126,-5,126,126],
    sm41$1=[0,-4,0,-4,0,-5,128,128,-5,128,-4,128,-2,128,-6,128,-9,129,-5,130,-6,128,-4,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,-5,128,128],
    sm42$1=[0,-4,0,-4,0,-5,131,131,-1,131,131,-2,131,-4,131,-2,131,131,-5,131,131,-8,131,-5,131,131,-4,131,131,-4,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,131,-5,131,131],
    sm43$1=[0,-2,3,-1,0,-4,0,-5,132,132,-1,132,132,-2,132,-4,132,-2,132,132,-5,132,132,-8,132,-5,132,132,-4,132,132,-4,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,-5,132,132,-12,42],
    sm44$1=[0,-2,133,-1,0,-4,0,-5,133,133,-1,133,133,-2,133,-4,133,-2,133,133,-5,133,133,-8,133,-5,133,133,-4,133,133,-4,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,-5,133,133,-12,133],
    sm45$1=[0,-2,134,-1,0,-4,0,-5,134,134,-1,134,134,-2,134,-4,134,-2,134,134,-5,134,134,-8,134,-5,134,134,-4,134,134,-4,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,134,-5,134,134,-12,134],
    sm46$1=[0,-4,0,-4,0,-5,135,135,-1,135,135,-2,135,-4,135,-2,135,135,-5,135,135,-8,135,-11,135,135,-4,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,135,-5,135,135],
    sm47$1=[0,-4,0,-4,0,-5,136,136,-1,136,136,-2,136,-4,136,-2,136,136,-5,136,136,-8,136,-11,136,136,-4,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,-5,136,136],
    sm48$1=[0,-4,0,-4,0,-5,137,137,-1,137,137,-2,137,-4,137,-2,137,137,-5,137,137,-8,137,-11,137,137,-4,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,137,-5,137,137],
    sm49$1=[0,-1,138,139,-1,140,141,142,143,144,0,-105,145],
    sm50$1=[0,-1,146,147,-1,148,149,150,151,152,0,-106,153],
    sm51$1=[0,-4,0,-4,0,-5,154,154,-1,154,154,-2,154,-4,154,-2,154,154,-5,154,154,-8,154,-11,154,154,-4,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,-5,154,154],
    sm52$1=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,155,-7,15,-18,25,-2,26,-1,156,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm53$1=[0,-4,0,-4,0,-17,157,-2,117,-29,158],
    sm54$1=[0,-4,0,-4,0,-5,159,159,-1,159,159,-2,159,-4,159,-2,159,159,-5,159,159,-8,159,-11,159,159,-4,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,-5,159,159],
    sm55$1=[0,-4,0,-4,0,-5,160,160,-1,160,160,-2,160,-4,160,-2,160,160,-5,160,160,-8,160,-11,160,160,-4,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,-5,160,160],
    sm56$1=[0,-4,0,-4,0,-43,161],
    sm57$1=[0,-4,0,-4,0,-43,127],
    sm58$1=[0,-4,0,-4,0,-37,162],
    sm59$1=[0,-2,3,-1,0,-4,0,-8,163,-8,164,-92,42],
    sm60$1=[0,165,165,165,-1,0,-4,0,-8,165,165,-2,165,165,165,165,165,165,-1,165,165,-1,165,165,165,165,165,-2,165,165,165,165,165,165,165,165,-1,165,-2,165,165,-5,165,-2,165,-2,165,-31,165,165,-3,165,165,165,165,165,165,165,-7,165,165,165,165,165,165],
    sm61$1=[0,-4,0,-4,0,-20,166],
    sm62$1=[0,167,167,167,-1,0,-4,0,-8,167,167,-2,167,167,167,167,167,167,-1,167,167,-1,167,167,167,167,167,-2,167,167,167,167,167,167,167,167,-1,167,-2,167,167,-5,167,-2,167,-2,167,-31,167,167,-3,167,167,167,167,167,167,167,-7,167,167,167,167,167,167],
    sm63$1=[0,-1,2,3,-1,0,-4,0,-8,4,-3,5,-6,9,10,-2,11,12,13,14,-2,15,16,17,18,19,20,21,-2,22,-2,23,-6,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm64$1=[0,-4,0,-4,0,-20,168],
    sm65$1=[0,-4,0,-4,0,-20,169,-8,170],
    sm66$1=[0,-4,0,-4,0,-20,171],
    sm67$1=[0,-2,3,-1,0,-4,0,-12,172,-97,42],
    sm68$1=[0,-2,3,-1,0,-4,0,-12,173,-97,42],
    sm69$1=[0,-1,2,3,-1,0,-4,0,-8,113,-3,174,-1,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm70$1=[0,-4,0,-4,0,-20,175],
    sm71$1=[0,-4,0,-4,0,-8,4],
    sm72$1=[0,-4,0,-4,0,-12,176],
    sm73$1=[0,177,177,177,-1,0,-4,0,-8,177,177,-2,177,177,177,177,177,177,-1,177,177,-2,177,177,177,177,-2,177,177,177,177,177,177,177,177,-1,177,-2,177,177,-5,177,-2,177,-2,177,-31,177,177,-3,177,177,177,177,177,177,177,-7,177,177,177,177,177,177],
    sm74$1=[0,-2,3,-1,0,-4,0,-8,178,-35,179,-65,42],
    sm75$1=[0,180,180,180,-1,0,-4,0,-8,180,180,-2,180,180,180,180,180,180,-1,180,180,-2,180,180,180,180,-2,180,180,180,180,180,180,180,180,-1,180,-2,180,180,-5,180,-2,180,-2,180,-31,180,180,-3,180,180,180,180,180,180,180,-7,180,180,180,180,180,180],
    sm76$1=[0,-2,3,-1,0,-4,0,-20,181,-89,42],
    sm77$1=[0,-2,182,-1,0,-4,0,-8,182,-8,182,-92,182],
    sm78$1=[0,-2,183,-1,0,-4,0,-8,183,-8,183,-92,183],
    sm79$1=[0,184,184,184,-1,0,-4,0,-8,184,184,-2,184,184,184,184,184,184,-1,184,184,-2,184,184,184,184,-2,184,184,184,184,184,184,184,184,-1,184,-2,184,184,-5,184,-2,184,-2,184,-31,184,184,-3,184,184,184,184,184,184,184,-7,184,184,184,184,184,184],
    sm80$1=[0,-4,0,-4,0,-9,185],
    sm81$1=[0,186,186,186,-1,0,-4,0,-8,186,186,-2,186,186,186,186,186,186,-1,186,186,-1,186,186,186,186,186,-2,186,186,186,186,186,186,186,186,-1,186,-2,186,186,-5,186,-2,186,-2,186,-31,186,186,-3,186,186,186,186,186,186,186,-7,186,186,186,186,186,186],
    sm82$1=[0,-4,0,-4,0,-5,187,187,-2,187,-2,187,-8,187,-5,187,-9,187,-11,187,-18,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187,187],
    sm83$1=[0,-4,0,-4,0,-5,188,188,-2,188,-2,188,-8,188,-5,188,-9,188,-11,188,-18,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188,188],
    sm84$1=[0,-1,189,189,-1,0,-4,0,-8,189,-5,189,189,-1,189,-2,189,-8,189,-18,189,-2,189,-2,189,-31,189,189,-3,189,189,189,189,189,189,189,-7,189,189,189,189,189,189],
    sm85$1=[0,-4,0,-4,0,-5,190,190,-2,190,-2,190,-8,190,-5,190,-9,190,-11,190,-18,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190],
    sm86$1=[0,-4,0,-4,0,-5,59,59,-2,59,-2,59,-8,59,-5,59,-9,59,-11,59,-18,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,-5,73,74],
    sm87$1=[0,-4,0,-4,0,-5,191,191,-1,191,191,-2,191,-4,191,-2,191,191,-5,191,191,-8,191,-11,191,191,-4,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,191,-5,191,191],
    sm88$1=[0,-4,0,-4,0,-5,192,192,-1,192,192,-2,192,-4,192,-2,192,192,-5,192,192,-8,192,-11,192,192,-4,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,-5,192,192],
    sm89$1=[0,-4,0,-4,0,-5,128,128,-1,128,128,-2,128,-4,128,-2,128,128,-5,128,128,-8,128,-11,128,128,-4,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,-5,128,128],
    sm90$1=[0,-1,2,3,-1,0,-4,0,-5,193,-2,113,-5,6,7,-1,114,-2,10,-8,15,-18,25,194,-1,26,-1,195,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm91$1=[0,-1,2,3,-1,0,-4,0,-9,196,-7,197,-28,198,199,-5,200,-51,37,38,-3,42],
    sm92$1=[0,-4,0,-4,0,-5,201,201,-1,201,201,-2,201,-4,201,-2,201,201,-5,201,201,-8,201,-11,201,201,-4,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,201,-5,201,201],
    sm93$1=[0,-4,0,-4,0,-5,202,202,-1,202,202,-2,202,-4,202,-2,202,202,-5,202,202,-8,202,-11,202,202,-4,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,202,-5,202,202],
    sm94$1=[0,-4,0,-4,0,-5,203,203,-2,203,-2,203,-8,203,-5,203,-9,203,-11,203,-18,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203,203],
    sm95$1=[0,-4,0,-4,0,-5,204,204,-2,204,-2,204,-8,204,-5,204,-9,204,-11,204,-18,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204,204],
    sm96$1=[0,-4,0,-4,0,-5,205,205,-2,205,-2,205,-8,205,-5,205,-9,205,-11,205,-18,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205,205],
    sm97$1=[0,-4,0,-4,0,-5,206,206,-2,206,-2,206,-8,206,-5,206,-9,206,-11,206,-18,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206,206],
    sm98$1=[0,-4,0,-4,0,-5,207,207,-2,207,-2,207,-8,207,-5,207,-9,207,-11,207,-18,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207,207],
    sm99$1=[0,-4,0,-4,0,-5,208,208,-2,208,-2,208,-8,208,-5,208,-9,208,-11,208,-18,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208,208],
    sm100$1=[0,-4,0,-4,0,-5,209,209,-2,209,-2,209,-8,209,-5,209,-9,209,-11,209,-18,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209,209],
    sm101$1=[0,-4,0,-4,0,-5,210,210,-2,210,-2,210,-8,210,-5,210,-9,210,-11,210,-18,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210,210],
    sm102$1=[0,-2,3,-1,0,-4,0,-110,42],
    sm103$1=[0,-4,0,-4,0,-5,211,211,-1,211,211,-2,211,-4,211,-2,211,211,-5,211,211,-8,211,-11,211,211,-4,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,211,-5,211,211],
    sm104$1=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,212,-7,15,-18,25,-2,26,-1,213,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm105$1=[0,-4,0,-4,0,-5,214,214,-1,214,214,-2,214,-4,214,-2,214,214,-5,214,214,-8,214,-11,214,214,-4,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,214,-5,214,214],
    sm106$1=[0,-4,0,-4,0,-5,215,215,-1,215,215,-2,215,-8,215,-5,215,215,-8,215,-11,215,-5,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,215,-5,215,215],
    sm107$1=[0,-4,0,-4,0,-52,216],
    sm108$1=[0,-4,0,-4,0,-17,157,-32,158],
    sm109$1=[0,-2,217,-1,0,-4,0,-5,217,217,-1,217,217,-2,217,-4,217,-2,217,217,-5,217,217,-8,217,-5,217,217,-4,217,217,-4,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,217,-5,217,217,-12,217],
    sm110$1=[0,-1,138,139,-1,140,141,142,143,144,0,-105,218],
    sm111$1=[0,-4,0,-4,0,-5,219,219,-1,219,219,-2,219,-4,219,-2,219,219,-5,219,219,-8,219,-11,219,219,-4,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,219,-5,219,219],
    sm112$1=[0,-1,220,220,-1,220,220,220,220,220,0,-105,220],
    sm113$1=[0,-1,221,221,-1,221,221,221,221,221,0,-105,221],
    sm114$1=[0,-1,146,147,-1,148,149,150,151,152,0,-106,222],
    sm115$1=[0,-1,223,223,-1,223,223,223,223,223,0,-106,223],
    sm116$1=[0,-1,224,224,-1,224,224,224,224,224,0,-106,224],
    sm117$1=[0,-4,0,-4,0,-5,225,225,-1,225,225,-2,225,-4,225,-2,225,225,-5,225,225,-8,225,-5,225,-5,225,225,-4,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,225,-5,225,225],
    sm118$1=[0,-4,0,-4,0,-5,226,-15,227],
    sm119$1=[0,-4,0,-4,0,-5,128,128,-2,128,-2,128,-4,128,-2,128,128,-5,128,128,-8,128,-5,130,-5,128,128,-4,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,-5,128,128],
    sm120$1=[0,-4,0,-4,0,-5,228,228,-1,228,228,-2,228,-4,228,-2,228,228,-5,228,228,-8,228,-11,228,228,-4,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,228,-5,228,228],
    sm121$1=[0,-4,0,-4,0,-5,229,229,-2,229,-2,229,-8,229,-5,229,-9,229,-11,229,-18,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229,229],
    sm122$1=[0,-1,2,3,-1,0,-4,0,-8,230,-5,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm123$1=[0,231,231,231,-1,0,-4,0,-8,231,231,-2,231,231,231,231,231,231,-1,231,231,-1,231,231,231,231,231,-2,231,231,231,231,231,231,231,231,-1,231,-2,231,231,-5,231,-2,231,-2,231,-31,231,231,-3,231,231,231,231,231,231,231,-7,231,231,231,231,231,231],
    sm124$1=[0,-1,2,3,-1,0,-4,0,-8,4,-3,5,-1,6,-4,9,10,-2,11,12,13,14,-2,15,16,17,18,19,20,21,-2,22,-2,23,-6,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm125$1=[0,-4,0,-4,0,-5,232,-6,233],
    sm126$1=[0,-4,0,-4,0,-5,234,-6,234],
    sm127$1=[0,-4,0,-4,0,-5,235,-6,235,-42,236],
    sm128$1=[0,-4,0,-4,0,-55,236],
    sm129$1=[0,-4,0,-4,0,-5,130,-2,130,130,-2,130,-7,130,130,-5,130,130,-15,130,-4,130,-5,130],
    sm130$1=[0,-4,0,-4,0,-5,237,-3,237,-11,237,-5,237,237,-20,237,-5,237],
    sm131$1=[0,-1,2,3,-1,0,-4,0,-9,238,-7,197,-35,239,-51,37,38,-3,42],
    sm132$1=[0,-2,3,-1,0,-4,0,-5,193,-2,163,-8,164,-31,240,-3,241,-56,42],
    sm133$1=[0,-4,0,-4,0,-24,242],
    sm134$1=[0,-1,2,3,-1,0,-4,0,-8,113,-3,243,-1,6,7,8,114,-2,10,-5,244,-2,15,-12,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm135$1=[0,-4,0,-4,0,-20,245],
    sm136$1=[0,246,246,246,-1,0,-4,0,-8,246,246,-2,246,246,246,246,246,246,-1,246,246,-1,246,246,246,246,246,-2,246,246,246,246,246,246,246,246,-1,246,-2,246,246,-5,246,-2,246,-2,246,-31,246,246,-3,246,246,246,246,246,246,246,-7,246,246,246,246,246,246],
    sm137$1=[0,-4,0,-4,0,-12,247],
    sm138$1=[0,-4,0,-4,0,-12,129],
    sm139$1=[0,248,248,248,-1,0,-4,0,-8,248,248,-2,248,248,248,248,248,248,-1,248,248,-1,248,248,248,248,248,-2,248,248,248,248,248,248,248,248,-1,248,-2,248,248,-5,248,-2,248,-2,248,-31,248,248,-3,248,248,248,248,248,248,248,-7,248,248,248,248,248,248],
    sm140$1=[0,-4,0,-4,0,-12,249],
    sm141$1=[0,250,250,250,-1,0,-4,0,-8,250,250,-2,250,250,250,250,250,250,-1,250,250,-1,250,250,250,250,250,-2,250,250,250,250,250,250,250,250,-1,250,-2,250,250,-5,250,-2,250,-2,250,-31,250,250,-3,250,250,250,250,250,250,250,-7,250,250,250,250,250,250],
    sm142$1=[0,-4,0,-4,0,-12,251],
    sm143$1=[0,-4,0,-4,0,-12,252],
    sm144$1=[0,-4,0,-4,0,-39,253,254],
    sm145$1=[0,255,255,255,-1,0,-4,0,-8,255,255,-2,255,255,255,255,255,255,-1,255,255,-1,255,255,255,255,255,-2,255,255,255,255,255,255,255,255,-1,255,-2,255,255,-5,255,-2,255,-2,255,-31,255,255,-3,255,255,255,255,255,255,255,-7,255,255,255,255,255,255],
    sm146$1=[0,-4,0,-4,0,-8,178,-35,179],
    sm147$1=[0,256,256,256,-1,0,-4,0,-5,256,256,-1,256,256,-2,256,256,256,256,256,256,-1,256,256,256,-1,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,-2,256,256,-5,256,256,256,256,-2,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,-7,256,256,256,256,256,256],
    sm148$1=[0,-4,0,-4,0,-8,257],
    sm149$1=[0,-1,2,3,-1,0,-4,0,-9,258,-2,259,-4,197,-27,260,198,199,-57,37,38,-3,42],
    sm150$1=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,-27,25,-2,26,-2,27,-50,37,38,39,40,41,42],
    sm151$1=[0,-2,3,-1,0,-4,0,-8,163,-8,164,-3,261,-31,241,-56,42],
    sm152$1=[0,-4,0,-4,0,-20,262],
    sm153$1=[0,-4,0,-4,0,-5,263,-6,264],
    sm154$1=[0,-4,0,-4,0,-5,265,-6,265],
    sm155$1=[0,266,266,266,-1,0,-4,0,-8,266,266,-2,266,266,266,266,266,266,-1,266,266,-1,266,266,266,266,266,-2,266,266,266,266,266,266,266,266,-1,266,266,266,266,266,-5,266,-2,266,-2,266,-31,266,266,-3,266,266,266,266,266,266,266,-7,266,266,266,266,266,266],
    sm156$1=[0,-4,0,-4,0,-5,267,-6,267,-8,267,-15,267,-11,267],
    sm157$1=[0,-4,0,-4,0,-5,268,-3,268,-2,268,-8,268,-15,268,-11,268],
    sm158$1=[0,-4,0,-4,0,-37,269],
    sm159$1=[0,-4,0,-4,0,-5,270,-3,270,-2,270,-8,270,-15,270,-11,270,-18,270,270,79],
    sm160$1=[0,-4,0,-4,0,-5,271,-3,271,-2,271,-8,271,-15,271,-11,271,-18,271,271,271,81],
    sm161$1=[0,-4,0,-4,0,-5,272,-3,272,-2,272,-8,272,-15,272,-11,272,-18,272,272,272,272,83],
    sm162$1=[0,-4,0,-4,0,-5,273,-3,273,-2,273,-8,273,-15,273,-11,273,-18,273,273,273,273,273,85],
    sm163$1=[0,-4,0,-4,0,-5,274,-3,274,-2,274,-8,274,-15,274,-11,274,-18,274,274,274,274,274,274,87,88,89,90],
    sm164$1=[0,-4,0,-4,0,-5,275,-3,275,-2,275,-8,275,-5,92,-9,275,-11,275,-18,275,275,275,275,275,275,275,275,275,275,93,94,95,96,97],
    sm165$1=[0,-4,0,-4,0,-5,276,-3,276,-2,276,-8,276,-5,92,-9,276,-11,276,-18,276,276,276,276,276,276,276,276,276,276,93,94,95,96,97],
    sm166$1=[0,-4,0,-4,0,-5,277,-3,277,-2,277,-8,277,-5,92,-9,277,-11,277,-18,277,277,277,277,277,277,277,277,277,277,93,94,95,96,97],
    sm167$1=[0,-4,0,-4,0,-5,278,-3,278,-2,278,-8,278,-5,92,-9,278,-11,278,-18,278,278,278,278,278,278,278,278,278,278,93,94,95,96,97],
    sm168$1=[0,-4,0,-4,0,-5,279,-3,279,-2,279,-8,279,-5,279,-9,279,-11,279,-18,279,279,279,279,279,279,279,279,279,279,279,279,279,279,279,99,100,101],
    sm169$1=[0,-4,0,-4,0,-5,280,-3,280,-2,280,-8,280,-5,280,-9,280,-11,280,-18,280,280,280,280,280,280,280,280,280,280,280,280,280,280,280,99,100,101],
    sm170$1=[0,-4,0,-4,0,-5,281,-3,281,-2,281,-8,281,-5,281,-9,281,-11,281,-18,281,281,281,281,281,281,281,281,281,281,281,281,281,281,281,99,100,101],
    sm171$1=[0,-4,0,-4,0,-5,282,-3,282,-2,282,-8,282,-5,282,-9,282,-11,282,-18,282,282,282,282,282,282,282,282,282,282,282,282,282,282,282,99,100,101],
    sm172$1=[0,-4,0,-4,0,-5,283,-3,283,-2,283,-8,283,-5,283,-9,283,-11,283,-18,283,283,283,283,283,283,283,283,283,283,283,283,283,283,283,99,100,101],
    sm173$1=[0,-4,0,-4,0,-5,284,-3,284,-2,284,-8,284,-5,284,-9,284,-11,284,-18,284,284,284,284,284,284,284,284,284,284,284,284,284,284,284,99,100,101],
    sm174$1=[0,-4,0,-4,0,-5,285,-3,285,-2,285,-8,285,-5,285,-9,285,-11,285,-18,285,285,285,285,285,285,285,285,285,285,285,285,285,285,285,285,285,285,103,104],
    sm175$1=[0,-4,0,-4,0,-5,286,-3,286,-2,286,-8,286,-5,286,-9,286,-11,286,-18,286,286,286,286,286,286,286,286,286,286,286,286,286,286,286,286,286,286,103,104],
    sm176$1=[0,-4,0,-4,0,-5,287,-3,287,-2,287,-8,287,-5,287,-9,287,-11,287,-18,287,287,287,287,287,287,287,287,287,287,287,287,287,287,287,287,287,287,103,104],
    sm177$1=[0,-4,0,-4,0,-5,288,106,-2,288,-2,288,-8,288,-5,288,-9,288,-11,288,-18,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,288,107,108],
    sm178$1=[0,-4,0,-4,0,-5,289,106,-2,289,-2,289,-8,289,-5,289,-9,289,-11,289,-18,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,289,107,108],
    sm179$1=[0,-4,0,-4,0,-5,290,290,-2,290,-2,290,-8,290,-5,290,-9,290,-11,290,-18,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290,290],
    sm180$1=[0,-4,0,-4,0,-5,291,291,-2,291,-2,291,-8,291,-5,291,-9,291,-11,291,-18,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291,291],
    sm181$1=[0,-4,0,-4,0,-5,292,292,-2,292,-2,292,-8,292,-5,292,-9,292,-11,292,-18,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292,292],
    sm182$1=[0,-4,0,-4,0,-5,293,293,-2,293,-2,293,-8,293,-5,293,-9,293,-11,293,-18,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293,293],
    sm183$1=[0,-4,0,-4,0,-5,294,294,-1,294,294,-2,294,-4,294,-2,294,294,-5,294,294,-8,294,-11,294,294,-4,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,294,-5,294,294],
    sm184$1=[0,-1,2,3,-1,0,-4,0,-5,295,-2,113,-5,6,7,-1,114,-2,10,-8,15,-18,25,296,-1,26,-1,195,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm185$1=[0,-4,0,-4,0,-5,297,-43,298],
    sm186$1=[0,-1,299,299,-1,0,-4,0,-5,299,-2,299,-5,299,299,-1,299,-2,299,-8,299,-18,299,299,-1,299,-1,299,299,-31,299,299,-3,299,299,299,299,299,299,299,-7,299,299,299,299,299,299],
    sm187$1=[0,-4,0,-4,0,-5,300,-43,300],
    sm188$1=[0,-4,0,-4,0,-5,301,301,-1,301,301,-2,301,-4,301,-2,301,301,-5,301,301,-8,301,-11,301,301,-4,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,301,-5,301,301],
    sm189$1=[0,-4,0,-4,0,-5,302,-3,303],
    sm190$1=[0,-4,0,-4,0,-5,304,-3,304],
    sm191$1=[0,-4,0,-4,0,-5,305,-3,305],
    sm192$1=[0,-4,0,-4,0,-5,305,-3,305,-45,236],
    sm193$1=[0,-4,0,-4,0,-20,306,-16,307],
    sm194$1=[0,-4,0,-4,0,-5,131,-3,131,-10,308,-16,308,-17,131],
    sm195$1=[0,-1,2,3,-1,0,-4,0,-17,197,-87,37,38,-3,42],
    sm196$1=[0,-4,0,-4,0,-20,309,-16,309],
    sm197$1=[0,-4,0,-4,0,-20,308,-16,308],
    sm198$1=[0,-4,0,-4,0,-5,310,310,-1,310,310,-2,310,-4,310,-2,310,310,-5,310,310,-8,310,-11,310,310,-4,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,310,-5,310,310],
    sm199$1=[0,-4,0,-4,0,-49,311],
    sm200$1=[0,-4,0,-4,0,-5,312,312,-1,312,312,-2,312,-4,312,-2,312,312,-5,312,312,-8,312,-11,312,312,-4,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,312,-5,312,312],
    sm201$1=[0,-4,0,-4,0,-5,313,-15,314],
    sm202$1=[0,-4,0,-4,0,-5,315,-15,315],
    sm203$1=[0,-4,0,-4,0,-49,316],
    sm204$1=[0,-4,0,-4,0,-5,317,317,-1,317,317,-2,317,-4,317,-2,317,317,-5,317,317,-8,317,-11,317,317,-4,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,317,-5,317,317],
    sm205$1=[0,-4,0,-4,0,-5,318,318,-1,318,318,-2,318,-4,318,-2,318,318,-5,318,318,-8,318,-11,318,318,-4,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,318,-5,318,318],
    sm206$1=[0,-4,0,-4,0,-5,319,319,-1,319,319,-2,319,-4,319,-2,319,319,-5,319,319,-8,319,-11,319,319,-4,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,319,-5,319,319],
    sm207$1=[0,-4,0,-4,0,-5,320,320,-1,320,320,-2,320,-4,320,-2,320,320,-5,320,320,-8,320,-11,320,320,-4,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,320,-5,320,320],
    sm208$1=[0,-1,321,321,-1,321,321,321,321,321,0,-105,321],
    sm209$1=[0,-1,322,322,-1,322,322,322,322,322,0,-106,322],
    sm210$1=[0,-4,0,-4,0,-5,323,323,-1,323,323,-2,323,-4,323,-2,323,323,-5,323,323,-8,323,-5,323,-5,323,323,-4,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,323,-5,323,323],
    sm211$1=[0,-4,0,-4,0,-21,324,-31,325],
    sm212$1=[0,-4,0,-4,0,-21,326],
    sm213$1=[0,-4,0,-4,0,-21,327],
    sm214$1=[0,-4,0,-4,0,-5,328,328,-1,328,328,-2,328,-4,328,-2,328,328,-5,328,328,-8,328,-11,328,328,-4,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,328,-5,328,328],
    sm215$1=[0,-4,0,-4,0,-49,329],
    sm216$1=[0,-4,0,-4,0,-5,330,-3,330,-2,330,-8,330,-15,330,-11,330],
    sm217$1=[0,-4,0,-4,0,-5,331,-3,331,-2,331,-8,331,-15,331,-11,331],
    sm218$1=[0,332,332,332,-1,0,-4,0,-8,332,332,-2,332,332,332,332,332,332,-1,332,332,-1,332,332,332,332,332,-2,332,332,332,332,332,332,332,332,-1,332,-2,332,332,-5,332,-2,332,-2,332,-31,332,332,-3,332,332,332,332,332,332,332,-7,332,332,332,332,332,332],
    sm219$1=[0,333,333,333,-1,0,-4,0,-8,333,333,-2,333,333,333,333,333,333,-1,333,333,-1,333,333,333,333,333,-2,333,333,333,333,333,333,333,333,-1,333,-2,333,333,-5,333,-2,333,-2,333,-31,333,333,-3,333,333,333,333,333,333,333,-7,333,333,333,333,333,333],
    sm220$1=[0,334,334,334,-1,0,-4,0,-8,334,334,-2,334,334,334,334,334,334,-1,334,334,-1,334,334,334,334,334,-2,334,334,334,334,334,334,334,334,-1,334,-2,334,334,-5,334,-2,334,-2,334,-31,334,334,-3,334,334,334,334,334,334,334,-7,334,334,334,334,334,334],
    sm221$1=[0,-4,0,-4,0,-5,335,-6,335],
    sm222$1=[0,-4,0,-4,0,-5,336,-3,336,-11,336,-5,336,336,-20,336,-5,336],
    sm223$1=[0,-4,0,-4,0,-9,337],
    sm224$1=[0,-4,0,-4,0,-5,338,-3,339],
    sm225$1=[0,-4,0,-4,0,-5,340,-3,340],
    sm226$1=[0,-4,0,-4,0,-5,341,-3,341],
    sm227$1=[0,-4,0,-4,0,-37,342],
    sm228$1=[0,-4,0,-4,0,-5,343,-3,343,-11,343,-27,343,-5,236],
    sm229$1=[0,-4,0,-4,0,-5,344,-3,344,-11,344,-5,344,344,-20,344,-5,344],
    sm230$1=[0,-2,3,-1,0,-4,0,-5,295,-2,163,-8,164,-31,345,-3,241,-56,42],
    sm231$1=[0,-4,0,-4,0,-49,346],
    sm232$1=[0,-4,0,-4,0,-5,347,-43,348],
    sm233$1=[0,-4,0,-4,0,-5,349,-43,349],
    sm234$1=[0,-4,0,-4,0,-5,350,-43,350],
    sm235$1=[0,-4,0,-4,0,-5,351,-3,351,-11,351,-27,351],
    sm236$1=[0,-4,0,-4,0,-5,351,-3,351,-11,351,-27,351,-5,236],
    sm237$1=[0,-4,0,-4,0,-21,352],
    sm238$1=[0,-4,0,-4,0,-20,353],
    sm239$1=[0,-4,0,-4,0,-21,354],
    sm240$1=[0,-4,0,-4,0,-12,355],
    sm241$1=[0,-1,2,3,-1,0,-4,0,-8,113,-3,356,-1,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm242$1=[0,-1,2,3,-1,0,-4,0,-8,113,-3,357,-1,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm243$1=[0,-4,0,-4,0,-5,59,59,-5,59,-14,358,359,-26,60,61,62,63,64,65,66,67,68,69,70,71,72,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,-5,73,74],
    sm244$1=[0,-4,0,-4,0,-27,360,361],
    sm245$1=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,8,114,-2,10,-5,362,-15,24,-5,25,-2,26,-2,27,-50,37,38,39,40,41,42],
    sm246$1=[0,-4,0,-4,0,-21,363],
    sm247$1=[0,364,364,364,-1,0,-4,0,-8,364,364,-2,364,364,364,364,364,364,-1,364,364,-1,364,364,364,364,364,-2,364,364,364,364,364,364,364,364,-1,364,-2,364,364,-5,364,-2,364,-2,364,-31,364,364,-3,364,364,364,364,364,364,364,-7,364,364,364,364,364,364],
    sm248$1=[0,365,365,365,-1,0,-4,0,-8,365,365,-2,365,365,365,365,365,365,-1,365,365,-1,365,365,365,365,365,-2,365,365,365,365,365,365,365,365,-1,365,-2,365,365,-5,365,-2,365,-2,365,-31,365,365,-3,365,365,365,365,365,365,365,-7,365,365,365,365,365,365],
    sm249$1=[0,366,366,366,-1,0,-4,0,-8,366,366,-2,366,366,366,366,366,366,-1,366,366,-1,366,366,366,366,366,-2,366,366,366,366,366,366,366,366,-1,366,-2,366,366,-5,366,-2,366,-2,366,-31,366,366,-3,366,366,366,366,366,366,366,-7,366,366,366,366,366,366],
    sm250$1=[0,-4,0,-4,0,-21,367],
    sm251$1=[0,368,368,368,-1,0,-4,0,-8,368,368,-2,368,368,368,368,368,368,-1,368,368,-1,368,368,368,368,368,-2,368,368,368,368,368,368,368,368,-1,368,-2,368,368,-5,368,-2,368,-2,368,-31,368,368,-3,368,368,368,368,368,368,368,-7,368,368,368,368,368,368],
    sm252$1=[0,369,369,369,-1,0,-4,0,-8,369,369,-2,369,369,369,369,369,369,-1,369,369,-1,369,369,369,369,369,-2,369,369,369,369,369,369,369,369,-1,369,-1,254,369,369,-5,369,-2,369,-2,369,-31,369,369,-3,369,369,369,369,369,369,369,-7,369,369,369,369,369,369],
    sm253$1=[0,370,370,370,-1,0,-4,0,-8,370,370,-2,370,370,370,370,370,370,-1,370,370,-1,370,370,370,370,370,-2,370,370,370,370,370,370,370,370,-1,370,-2,370,370,-5,370,-2,370,-2,370,-31,370,370,-3,370,370,370,370,370,370,370,-7,370,370,370,370,370,370],
    sm254$1=[0,-4,0,-4,0,-20,371],
    sm255$1=[0,372,372,372,-1,0,-4,0,-5,372,372,-1,372,372,-2,372,372,372,372,372,372,-1,372,372,372,-1,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,-2,372,372,-5,372,372,372,372,-2,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,372,-7,372,372,372,372,372,372],
    sm256$1=[0,-1,2,3,-1,0,-4,0,-9,373,-2,259,-4,197,-27,260,198,199,-57,37,38,-3,42],
    sm257$1=[0,-4,0,-4,0,-9,374],
    sm258$1=[0,375,375,375,-1,0,-4,0,-5,375,375,-1,375,375,-2,375,375,375,375,375,375,-1,375,375,375,-1,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,-2,375,375,-5,375,375,375,375,-2,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,375,-7,375,375,375,375,375,375],
    sm259$1=[0,-1,2,3,-1,0,-4,0,-9,376,-2,259,-4,197,-27,260,198,199,-57,37,38,-3,42],
    sm260$1=[0,-1,377,377,-1,0,-4,0,-9,377,-2,377,-4,377,-27,377,377,377,-57,377,377,-3,377],
    sm261$1=[0,-1,378,378,-1,0,-4,0,-9,378,-2,378,-4,378,-27,378,378,378,-57,378,378,-3,378],
    sm262$1=[0,-1,2,3,-1,0,-4,0,-17,197,-28,198,199,-57,37,38,-3,42],
    sm263$1=[0,-4,0,-4,0,-20,306],
    sm264$1=[0,-4,0,-4,0,-20,308],
    sm265$1=[0,-4,0,-4,0,-8,379],
    sm266$1=[0,-4,0,-4,0,-21,380],
    sm267$1=[0,-4,0,-4,0,-21,381],
    sm268$1=[0,-4,0,-4,0,-5,382,-15,381],
    sm269$1=[0,-4,0,-4,0,-21,383],
    sm270$1=[0,-4,0,-4,0,-5,384,-15,384],
    sm271$1=[0,-4,0,-4,0,-5,385,-15,385],
    sm272$1=[0,386,386,386,-1,0,-4,0,-8,386,386,-2,386,386,386,386,386,386,-1,386,386,-2,386,386,386,386,-2,386,386,386,386,386,386,386,386,-1,386,-2,386,386,-5,386,-2,386,-2,386,-31,386,386,-3,386,386,386,386,386,386,386,-7,386,386,386,386,386,386],
    sm273$1=[0,-4,0,-4,0,-5,387,-6,387],
    sm274$1=[0,-4,0,-4,0,-5,388,388,-1,388,388,-2,388,-4,388,-2,388,388,-5,388,388,-8,388,-11,388,388,-4,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,388,-5,388,388],
    sm275$1=[0,-1,389,389,-1,0,-4,0,-5,389,-2,389,-5,389,389,-1,389,-2,389,-8,389,-18,389,389,-1,389,-1,389,389,-31,389,389,-3,389,389,389,389,389,389,389,-7,389,389,389,389,389,389],
    sm276$1=[0,-4,0,-4,0,-5,390,-43,390],
    sm277$1=[0,-4,0,-4,0,-5,391,391,-1,391,391,-2,391,-4,391,-2,391,391,-5,391,391,-8,391,-11,391,391,-4,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,391,-5,391,391],
    sm278$1=[0,-4,0,-4,0,-5,295,-43,392],
    sm279$1=[0,-1,2,3,-1,0,-4,0,-5,193,-2,113,-5,6,7,-1,114,-2,10,-8,15,-18,25,299,-1,26,-1,195,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm280$1=[0,-4,0,-4,0,-5,393,-43,393],
    sm281$1=[0,-4,0,-4,0,-5,394,394,-1,394,394,-2,394,-4,394,-2,394,394,-5,394,394,-8,394,-11,394,394,-4,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,394,-5,394,394],
    sm282$1=[0,-1,2,3,-1,0,-4,0,-9,395,-7,197,-28,198,199,-5,200,-51,37,38,-3,42],
    sm283$1=[0,-4,0,-4,0,-5,396,-3,396],
    sm284$1=[0,-4,0,-4,0,-5,397,-3,397],
    sm285$1=[0,-4,0,-4,0,-20,398],
    sm286$1=[0,-4,0,-4,0,-20,399],
    sm287$1=[0,-4,0,-4,0,-49,400],
    sm288$1=[0,-4,0,-4,0,-5,401,401,-1,401,401,-2,401,-4,401,-2,401,401,-5,401,401,-8,401,-11,401,401,-4,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,401,-5,401,401],
    sm289$1=[0,-4,0,-4,0,-5,402,402,-1,402,402,-2,402,-4,402,-2,402,402,-5,402,402,-8,402,-11,402,402,-4,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,402,-5,402,402],
    sm290$1=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,403,-7,15,-18,25,-2,26,-1,404,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm291$1=[0,-4,0,-4,0,-5,405,-15,405],
    sm292$1=[0,-4,0,-4,0,-5,406,406,-1,406,406,-2,406,-4,406,-2,406,406,-5,406,406,-8,406,-11,406,406,-4,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,406,-5,406,406],
    sm293$1=[0,-4,0,-4,0,-5,407,407,-1,407,407,-2,407,-4,407,-2,407,407,-5,407,407,-8,407,-5,407,-5,407,407,-4,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,407,-5,407,407],
    sm294$1=[0,-4,0,-4,0,-5,408,408,-1,408,408,-2,408,-4,408,-2,408,408,-5,408,408,-8,408,-5,408,-5,408,408,-4,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,408,-5,408,408],
    sm295$1=[0,-4,0,-4,0,-5,409,409,-1,409,409,-2,409,-4,409,-2,409,409,-5,409,409,-8,409,-11,409,409,-4,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,409,-5,409,409],
    sm296$1=[0,-4,0,-4,0,-9,410],
    sm297$1=[0,-4,0,-4,0,-9,411],
    sm298$1=[0,-4,0,-4,0,-5,412,-6,412],
    sm299$1=[0,-4,0,-4,0,-5,413,-3,413,-2,413,-8,413,-27,413],
    sm300$1=[0,-4,0,-4,0,-5,414,-3,414,-11,414,-5,414,414,-20,414,-5,414],
    sm301$1=[0,-1,2,3,-1,0,-4,0,-9,415,-7,197,-35,239,-51,37,38,-3,42],
    sm302$1=[0,-4,0,-4,0,-9,416],
    sm303$1=[0,-4,0,-4,0,-5,417,-3,417,-11,417,-27,417],
    sm304$1=[0,-4,0,-4,0,-49,418],
    sm305$1=[0,-4,0,-4,0,-5,419,-3,419,-11,419,-5,419,419,-20,419,-5,419],
    sm306$1=[0,-4,0,-4,0,-5,420,-43,420],
    sm307$1=[0,-2,3,-1,0,-4,0,-5,193,-2,163,-8,164,-31,421,-3,241,-56,42],
    sm308$1=[0,-4,0,-4,0,-21,422,-27,422],
    sm309$1=[0,-4,0,-4,0,-5,423,-3,423,-11,423,-27,423],
    sm310$1=[0,-1,2,3,-1,0,-4,0,-8,113,-3,424,-1,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm311$1=[0,-4,0,-4,0,-12,425],
    sm312$1=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,426,-7,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm313$1=[0,-4,0,-4,0,-5,232,-6,427],
    sm314$1=[0,-4,0,-4,0,-27,428,429],
    sm315$1=[0,-4,0,-4,0,-5,235,-6,235,-14,430,430,-26,236],
    sm316$1=[0,-4,0,-4,0,-27,430,430,-26,236],
    sm317$1=[0,-4,0,-4,0,-12,431],
    sm318$1=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,432,-7,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm319$1=[0,-4,0,-4,0,-27,433,433],
    sm320$1=[0,-4,0,-4,0,-28,434],
    sm321$1=[0,-4,0,-4,0,-28,435],
    sm322$1=[0,-4,0,-4,0,-8,436],
    sm323$1=[0,437,437,437,-1,0,-4,0,-8,437,437,-2,437,437,437,437,437,437,-1,437,437,-1,437,437,437,437,437,-2,437,437,437,437,437,437,437,437,-1,437,-2,437,437,-5,437,-2,437,-2,437,-31,437,437,-3,437,437,437,437,437,437,437,-7,437,437,437,437,437,437],
    sm324$1=[0,438,438,438,-1,0,-4,0,-8,438,438,-2,438,438,438,438,438,438,-1,438,438,-1,438,438,438,438,438,-2,438,438,438,438,438,438,438,438,-1,438,-2,438,438,-5,438,-2,438,-2,438,-31,438,438,-3,438,438,438,438,438,438,438,-7,438,438,438,438,438,438],
    sm325$1=[0,-4,0,-4,0,-9,439],
    sm326$1=[0,440,440,440,-1,0,-4,0,-5,440,440,-1,440,440,-2,440,440,440,440,440,440,-1,440,440,440,-1,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,-2,440,440,-5,440,440,440,440,-2,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,440,-7,440,440,440,440,440,440],
    sm327$1=[0,441,441,441,-1,0,-4,0,-5,441,441,-1,441,441,-2,441,441,441,441,441,441,-1,441,441,441,-1,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,-2,441,441,-5,441,441,441,441,-2,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,441,-7,441,441,441,441,441,441],
    sm328$1=[0,-1,442,442,-1,0,-4,0,-9,442,-2,442,-4,442,-27,442,442,442,-57,442,442,-3,442],
    sm329$1=[0,-1,443,443,-1,0,-4,0,-9,443,-2,443,-4,443,-27,443,443,443,-57,443,443,-3,443],
    sm330$1=[0,-4,0,-4,0,-8,444],
    sm331$1=[0,-2,3,-1,0,-4,0,-8,163,-8,164,-3,445,-31,241,-56,42],
    sm332$1=[0,-4,0,-4,0,-21,446],
    sm333$1=[0,-4,0,-4,0,-5,447,-6,447],
    sm334$1=[0,-4,0,-4,0,-5,448,-3,448,-2,448,-8,448,-15,448,-11,448],
    sm335$1=[0,-4,0,-4,0,-5,449,449,-1,449,449,-2,449,-4,449,-2,449,449,-5,449,449,-8,449,-11,449,449,-4,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,449,-5,449,449],
    sm336$1=[0,-4,0,-4,0,-5,450,-43,450],
    sm337$1=[0,-1,2,3,-1,0,-4,0,-5,295,-2,113,-5,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm338$1=[0,-4,0,-4,0,-5,451,451,-1,451,451,-2,451,-4,451,-2,451,451,-5,451,451,-8,451,-11,451,451,-4,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,451,-5,451,451],
    sm339$1=[0,-4,0,-4,0,-5,452,-3,452],
    sm340$1=[0,-4,0,-4,0,-5,453,-3,453],
    sm341$1=[0,-4,0,-4,0,-21,454],
    sm342$1=[0,-4,0,-4,0,-21,455],
    sm343$1=[0,-4,0,-4,0,-21,456],
    sm344$1=[0,-4,0,-4,0,-20,457,-16,457],
    sm345$1=[0,-4,0,-4,0,-5,458,458,-1,458,458,-2,458,-4,458,-2,458,458,-5,458,458,-8,458,-11,458,458,-4,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,458,-5,458,458],
    sm346$1=[0,-4,0,-4,0,-5,459,-15,459],
    sm347$1=[0,-4,0,-4,0,-21,460],
    sm348$1=[0,-4,0,-4,0,-21,461],
    sm349$1=[0,-4,0,-4,0,-5,462,-3,462,-2,462,-8,462,-15,462,-11,462],
    sm350$1=[0,-4,0,-4,0,-9,463],
    sm351$1=[0,-4,0,-4,0,-5,464,-3,464,-11,464,-5,464,464,-20,464,-5,464],
    sm352$1=[0,-4,0,-4,0,-5,465,-3,465],
    sm353$1=[0,-4,0,-4,0,-5,466,-3,466],
    sm354$1=[0,-4,0,-4,0,-5,467,-3,467,-11,467,-5,467,467,-20,467,-5,467],
    sm355$1=[0,-2,3,-1,0,-4,0,-5,295,-2,163,-8,164,-31,468,-3,241,-56,42],
    sm356$1=[0,-4,0,-4,0,-49,469],
    sm357$1=[0,-4,0,-4,0,-5,470,-43,470],
    sm358$1=[0,471,471,471,-1,0,-4,0,-8,471,471,-2,471,471,471,471,471,471,-1,471,471,-1,472,471,471,471,471,-2,471,471,471,471,471,471,471,471,-1,471,-2,471,471,-5,471,-2,471,-2,471,-31,471,471,-3,471,471,471,471,471,471,471,-7,471,471,471,471,471,471],
    sm359$1=[0,-4,0,-4,0,-21,473],
    sm360$1=[0,474,474,474,-1,0,-4,0,-8,474,474,-2,474,474,474,474,474,474,-1,474,474,-1,474,474,474,474,474,-2,474,474,474,474,474,474,474,474,-1,474,-2,474,474,-5,474,-2,474,-2,474,-31,474,474,-3,474,474,474,474,474,474,474,-7,474,474,474,474,474,474],
    sm361$1=[0,-4,0,-4,0,-12,475],
    sm362$1=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,476,-7,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm363$1=[0,-4,0,-4,0,-21,477],
    sm364$1=[0,-1,2,3,-1,0,-4,0,-8,113,-3,478,-1,6,7,-1,114,-2,10,-8,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm365$1=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,479,-7,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm366$1=[0,-4,0,-4,0,-21,480],
    sm367$1=[0,-4,0,-4,0,-21,481],
    sm368$1=[0,-4,0,-4,0,-21,482],
    sm369$1=[0,-4,0,-4,0,-21,483],
    sm370$1=[0,-4,0,-4,0,-21,484],
    sm371$1=[0,-4,0,-4,0,-28,485],
    sm372$1=[0,-4,0,-4,0,-28,430],
    sm373$1=[0,486,486,486,-1,0,-4,0,-8,486,486,-2,486,486,486,486,486,486,-1,486,486,-1,486,486,486,486,486,-2,486,486,486,486,486,486,486,486,-1,486,-2,486,486,-5,486,-2,486,-2,486,-31,486,486,-3,486,486,486,486,486,486,486,-7,486,486,486,486,486,486],
    sm374$1=[0,-4,0,-4,0,-9,487,-3,488,-22,489],
    sm375$1=[0,490,490,490,-1,0,-4,0,-8,490,490,-2,490,490,490,490,490,490,-1,490,490,-1,490,490,490,490,490,-2,490,490,490,490,490,490,490,490,-1,490,-2,490,490,-5,490,-2,490,-2,490,-31,490,490,-3,490,490,490,490,490,490,490,-7,490,490,490,490,490,490],
    sm376$1=[0,-4,0,-4,0,-21,491],
    sm377$1=[0,-4,0,-4,0,-21,492],
    sm378$1=[0,493,493,493,-1,0,-4,0,-5,493,493,-1,493,493,-2,493,493,493,493,493,493,-1,493,493,493,-1,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,-2,493,493,-5,493,493,493,493,-2,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,493,-7,493,493,493,493,493,493],
    sm379$1=[0,-1,2,3,-1,0,-4,0,-8,4,494,-2,5,-1,6,7,8,-2,9,10,-2,11,12,13,14,-2,15,16,17,18,19,20,21,-2,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm380$1=[0,-4,0,-4,0,-21,495],
    sm381$1=[0,-4,0,-4,0,-5,496,-15,496],
    sm382$1=[0,-4,0,-4,0,-8,497],
    sm383$1=[0,-4,0,-4,0,-5,498,-43,498],
    sm384$1=[0,-4,0,-4,0,-8,499],
    sm385$1=[0,-4,0,-4,0,-8,500],
    sm386$1=[0,-4,0,-4,0,-21,501],
    sm387$1=[0,-4,0,-4,0,-21,502],
    sm388$1=[0,-4,0,-4,0,-5,503,-15,503],
    sm389$1=[0,-4,0,-4,0,-5,504,504,-1,504,504,-2,504,-4,504,-2,504,504,-5,504,504,-8,504,-5,504,-5,504,504,-4,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,504,-5,504,504],
    sm390$1=[0,-4,0,-4,0,-5,505,-3,505,-11,505,-5,505,505,-20,505,-5,505],
    sm391$1=[0,-4,0,-4,0,-5,506,-3,506,-11,506,-5,506,506,-20,506,-5,506],
    sm392$1=[0,-4,0,-4,0,-49,507],
    sm393$1=[0,-4,0,-4,0,-12,508],
    sm394$1=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,509,-7,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm395$1=[0,-4,0,-4,0,-21,510],
    sm396$1=[0,-4,0,-4,0,-21,511],
    sm397$1=[0,512,512,512,-1,0,-4,0,-8,512,512,-2,512,512,512,512,512,512,-1,512,512,-1,512,512,512,512,512,-2,512,512,512,512,512,512,512,512,-1,512,-2,512,512,-5,512,-2,512,-2,512,-31,512,512,-3,512,512,512,512,512,512,512,-7,512,512,512,512,512,512],
    sm398$1=[0,-4,0,-4,0,-12,513],
    sm399$1=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,514,-7,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm400$1=[0,-4,0,-4,0,-21,515],
    sm401$1=[0,-4,0,-4,0,-21,516],
    sm402$1=[0,-4,0,-4,0,-21,517],
    sm403$1=[0,518,518,518,-1,0,-4,0,-8,518,518,-2,518,518,518,518,518,518,-1,518,518,-1,518,518,518,518,518,-2,518,518,518,518,518,518,518,518,-1,518,-2,518,518,-5,518,-2,518,-2,518,-31,518,518,-3,518,518,518,518,518,518,518,-7,518,518,518,518,518,518],
    sm404$1=[0,-4,0,-4,0,-21,519],
    sm405$1=[0,-4,0,-4,0,-21,520],
    sm406$1=[0,521,521,521,-1,0,-4,0,-8,521,521,-2,521,521,521,521,521,521,-1,521,521,-1,521,521,521,521,521,-2,521,521,521,521,521,521,521,521,-1,521,-2,521,521,-5,521,-2,521,-2,521,-31,521,521,-3,521,521,521,521,521,521,521,-7,521,521,521,521,521,521],
    sm407$1=[0,-4,0,-4,0,-9,522,-3,488,-22,489],
    sm408$1=[0,-4,0,-4,0,-9,523,-26,489],
    sm409$1=[0,-4,0,-4,0,-9,524,-3,524,-22,524],
    sm410$1=[0,-4,0,-4,0,-9,525,-26,525,526],
    sm411$1=[0,-4,0,-4,0,-9,527],
    sm412$1=[0,-4,0,-4,0,-9,528],
    sm413$1=[0,-4,0,-4,0,-8,529],
    sm414$1=[0,-4,0,-4,0,-5,530,-3,530,-11,530,-5,530,530,-20,530,-5,530],
    sm415$1=[0,531,531,531,-1,0,-4,0,-8,531,531,-2,531,531,531,531,531,531,-1,531,531,-1,531,531,531,531,531,-2,531,531,531,531,531,531,531,531,-1,531,-2,531,531,-5,531,-2,531,-2,531,-31,531,531,-3,531,531,531,531,531,531,531,-7,531,531,531,531,531,531],
    sm416$1=[0,532,532,532,-1,0,-4,0,-8,532,532,-2,532,532,532,532,532,532,-1,532,532,-1,532,532,532,532,532,-2,532,532,532,532,532,532,532,532,-1,532,-2,532,532,-5,532,-2,532,-2,532,-31,532,532,-3,532,532,532,532,532,532,532,-7,532,532,532,532,532,532],
    sm417$1=[0,-4,0,-4,0,-21,533],
    sm418$1=[0,534,534,534,-1,0,-4,0,-8,534,534,-2,534,534,534,534,534,534,-1,534,534,-1,534,534,534,534,534,-2,534,534,534,534,534,534,534,534,-1,534,-2,534,534,-5,534,-2,534,-2,534,-31,534,534,-3,534,534,534,534,534,534,534,-7,534,534,534,534,534,534],
    sm419$1=[0,535,535,535,-1,0,-4,0,-8,535,535,-2,535,535,535,535,535,535,-1,535,535,-1,535,535,535,535,535,-2,535,535,535,535,535,535,535,535,-1,535,-2,535,535,-5,535,-2,535,-2,535,-31,535,535,-3,535,535,535,535,535,535,535,-7,535,535,535,535,535,535],
    sm420$1=[0,-1,2,3,-1,0,-4,0,-8,113,-5,6,7,-1,114,-2,10,536,-7,15,-18,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm421$1=[0,-4,0,-4,0,-21,537],
    sm422$1=[0,538,538,538,-1,0,-4,0,-8,538,538,-2,538,538,538,538,538,538,-1,538,538,-1,538,538,538,538,538,-2,538,538,538,538,538,538,538,538,-1,538,-2,538,538,-5,538,-2,538,-2,538,-31,538,538,-3,538,538,538,538,538,538,538,-7,538,538,538,538,538,538],
    sm423$1=[0,539,539,539,-1,0,-4,0,-8,539,539,-2,539,539,539,539,539,539,-1,539,539,-1,539,539,539,539,539,-2,539,539,539,539,539,539,539,539,-1,539,-2,539,539,-5,539,-2,539,-2,539,-31,539,539,-3,539,539,539,539,539,539,539,-7,539,539,539,539,539,539],
    sm424$1=[0,540,540,540,-1,0,-4,0,-8,540,540,-2,540,540,540,540,540,540,-1,540,540,-1,540,540,540,540,540,-2,540,540,540,540,540,540,540,540,-1,540,-2,540,540,-5,540,-2,540,-2,540,-31,540,540,-3,540,540,540,540,540,540,540,-7,540,540,540,540,540,540],
    sm425$1=[0,541,541,541,-1,0,-4,0,-8,541,541,-2,541,541,541,541,541,541,-1,541,541,-1,541,541,541,541,541,-2,541,541,541,541,541,541,541,541,-1,541,-2,541,541,-5,541,-2,541,-2,541,-31,541,541,-3,541,541,541,541,541,541,541,-7,541,541,541,541,541,541],
    sm426$1=[0,-4,0,-4,0,-21,542],
    sm427$1=[0,-4,0,-4,0,-9,543,-26,489],
    sm428$1=[0,544,544,544,-1,0,-4,0,-8,544,544,-2,544,544,544,544,544,544,-1,544,544,-1,544,544,544,544,544,-2,544,544,544,544,544,544,544,544,-1,544,-2,544,544,-5,544,-2,544,-2,544,-31,544,544,-3,544,544,544,544,544,544,544,-7,544,544,544,544,544,544],
    sm429$1=[0,-4,0,-4,0,-9,545,-3,545,-22,545],
    sm430$1=[0,-4,0,-4,0,-9,546,-26,489],
    sm431$1=[0,-4,0,-4,0,-37,547],
    sm432$1=[0,548,548,548,-1,0,-4,0,-8,548,548,-2,548,548,548,548,548,548,-1,548,548,-1,548,548,548,548,548,-2,548,548,548,548,548,548,548,548,-1,548,-1,548,548,548,-5,548,-2,548,-2,548,-31,548,548,-3,548,548,548,548,548,548,548,-7,548,548,548,548,548,548],
    sm433$1=[0,549,549,549,-1,0,-4,0,-5,549,549,-1,549,549,-2,549,549,549,549,549,549,-1,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,-2,549,549,-5,549,549,549,549,-2,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,549,-7,549,549,549,549,549,549],
    sm434$1=[0,-4,0,-4,0,-9,550],
    sm435$1=[0,-4,0,-4,0,-9,551],
    sm436$1=[0,-4,0,-4,0,-9,552],
    sm437$1=[0,553,553,553,-1,0,-4,0,-8,553,553,-2,553,553,553,553,553,553,-1,553,553,-1,553,553,553,553,553,-2,553,553,553,553,553,553,553,553,-1,553,-2,553,553,-5,553,-2,553,-2,553,-31,553,553,-3,553,553,553,553,553,553,553,-7,553,553,553,553,553,553],
    sm438$1=[0,554,554,554,-1,0,-4,0,-8,554,554,-2,554,554,554,554,554,554,-1,554,554,-1,554,554,554,554,554,-2,554,554,554,554,554,554,554,554,-1,554,-2,554,554,-5,554,-2,554,-2,554,-31,554,554,-3,554,554,554,554,554,554,554,-7,554,554,554,554,554,554],
    sm439$1=[0,555,555,555,-1,0,-4,0,-8,555,555,-2,555,555,555,555,555,555,-1,555,555,-1,555,555,555,555,555,-2,555,555,555,555,555,555,555,555,-1,555,-2,555,555,-5,555,-2,555,-2,555,-31,555,555,-3,555,555,555,555,555,555,555,-7,555,555,555,555,555,555],
    sm440$1=[0,-4,0,-4,0,-21,556],
    sm441$1=[0,557,557,557,-1,0,-4,0,-8,557,557,-2,557,557,557,557,557,557,-1,557,557,-1,557,557,557,557,557,-2,557,557,557,557,557,557,557,557,-1,557,-2,557,557,-5,557,-2,557,-2,557,-31,557,557,-3,557,557,557,557,557,557,557,-7,557,557,557,557,557,557],
    sm442$1=[0,558,558,558,-1,0,-4,0,-8,558,558,-2,558,558,558,558,558,558,-1,558,558,-1,558,558,558,558,558,-2,558,558,558,558,558,558,558,558,-1,558,-2,558,558,-5,558,-2,558,-2,558,-31,558,558,-3,558,558,558,558,558,558,558,-7,558,558,558,558,558,558],
    sm443$1=[0,559,559,559,-1,0,-4,0,-8,559,559,-2,559,559,559,559,559,559,-1,559,559,-1,559,559,559,559,559,-2,559,559,559,559,559,559,559,559,-1,559,-2,559,559,-5,559,-2,559,-2,559,-31,559,559,-3,559,559,559,559,559,559,559,-7,559,559,559,559,559,559],
    sm444$1=[0,560,560,560,-1,0,-4,0,-8,560,560,-2,560,560,560,560,560,560,-1,560,560,-1,560,560,560,560,560,-2,560,560,560,560,560,560,560,560,-1,560,-2,560,560,-5,560,-2,560,-2,560,-31,560,560,-3,560,560,560,560,560,560,560,-7,560,560,560,560,560,560],
    sm445$1=[0,561,561,561,-1,0,-4,0,-8,561,561,-2,561,561,561,561,561,561,-1,561,561,-1,561,561,561,561,561,-2,561,561,561,561,561,561,561,561,-1,561,-2,561,561,-5,561,-2,561,-2,561,-31,561,561,-3,561,561,561,561,561,561,561,-7,561,561,561,561,561,561],
    sm446$1=[0,-4,0,-4,0,-9,562],
    sm447$1=[0,563,563,563,-1,0,-4,0,-8,563,563,-2,563,563,563,563,563,563,-1,563,563,-1,563,563,563,563,563,-2,563,563,563,563,563,563,563,563,-1,563,-2,563,563,-5,563,-2,563,-2,563,-31,563,563,-3,563,563,563,563,563,563,563,-7,563,563,563,563,563,563],
    sm448$1=[0,-1,2,3,-1,0,-4,0,-8,4,564,-2,5,564,6,7,8,-2,9,10,-2,11,12,13,14,-2,15,16,17,18,19,20,21,564,-1,22,-2,23,24,-5,25,-2,26,-2,27,-31,28,29,-3,30,31,32,33,34,35,36,-7,37,38,39,40,41,42],
    sm449$1=[0,-4,0,-4,0,-9,565,-26,565],
    sm450$1=[0,566,566,566,-1,0,-4,0,-5,566,566,-1,566,566,-2,566,566,566,566,566,566,-1,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,-2,566,566,-5,566,566,566,566,-2,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,566,-7,566,566,566,566,566,566],
    sm451$1=[0,-1,567,567,-1,0,-4,0,-5,567,-3,567,-2,567,-4,567,-27,567,567,567,-57,567,567,-3,567],
    sm452$1=[0,-1,568,568,-1,0,-4,0,-5,568,-3,568,-2,568,-4,568,-27,568,568,568,-57,568,568,-3,568],
    sm453$1=[0,-4,0,-4,0,-9,569],
    sm454$1=[0,570,570,570,-1,0,-4,0,-8,570,570,-2,570,570,570,570,570,570,-1,570,570,-1,570,570,570,570,570,-2,570,570,570,570,570,570,570,570,-1,570,-2,570,570,-5,570,-2,570,-2,570,-31,570,570,-3,570,570,570,570,570,570,570,-7,570,570,570,570,570,570],
    sm455$1=[0,571,571,571,-1,0,-4,0,-8,571,571,-2,571,571,571,571,571,571,-1,571,571,-1,571,571,571,571,571,-2,571,571,571,571,571,571,571,571,-1,571,-2,571,571,-5,571,-2,571,-2,571,-31,571,571,-3,571,571,571,571,571,571,571,-7,571,571,571,571,571,571],
    sm456$1=[0,572,572,572,-1,0,-4,0,-8,572,572,-2,572,572,572,572,572,572,-1,572,572,-1,572,572,572,572,572,-2,572,572,572,572,572,572,572,572,-1,572,-2,572,572,-5,572,-2,572,-2,572,-31,572,572,-3,572,572,572,572,572,572,572,-7,572,572,572,572,572,572],
    sm457$1=[0,573,573,573,-1,0,-4,0,-8,573,573,-2,573,573,573,573,573,573,-1,573,573,-1,573,573,573,573,573,-2,573,573,573,573,573,573,573,573,-1,573,-2,573,573,-5,573,-2,573,-2,573,-31,573,573,-3,573,573,573,573,573,573,573,-7,573,573,573,573,573,573],
    sm458$1=[0,574,574,574,-1,0,-4,0,-8,574,574,-2,574,574,574,574,574,574,-1,574,574,-1,574,574,574,574,574,-2,574,574,574,574,574,574,574,574,-1,574,-2,574,574,-5,574,-2,574,-2,574,-31,574,574,-3,574,574,574,574,574,574,574,-7,574,574,574,574,574,574],
    sm459$1=[0,-4,0,-4,0,-9,575,-3,575,-22,575],
    sm460$1=[0,-1,576,576,-1,0,-4,0,-5,576,-3,576,-2,576,-4,576,-27,576,576,576,-57,576,576,-3,576],
    sm461$1=[0,577,577,577,-1,0,-4,0,-8,577,577,-2,577,577,577,577,577,577,-1,577,577,-1,577,577,577,577,577,-2,577,577,577,577,577,577,577,577,-1,577,-2,577,577,-5,577,-2,577,-2,577,-31,577,577,-3,577,577,577,577,577,577,577,-7,577,577,577,577,577,577],

        // Symbol Lookup map
        lu$1 = new Map([[1,1],[2,2],[4,3],[8,4],[16,5],[32,6],[64,7],[128,8],[256,9],[512,10],[3,11],[264,11],[200,13],["import",14],[",",15],["*",16],["as",17],["{",18],["}",19],["from",20],["export",21],[";",22],["default",23],["function",24],["class",25],["let",26],["[",27],["async",28],["if",29],["(",30],[")",31],["else",32],["do",33],["while",34],["for",35],["var",36],["in",37],["of",38],["await",39],["continue",40],["break",41],["return",42],["throw",43],["with",44],["switch",45],["case",46],[":",47],["try",48],["catch",49],["finally",50],["debugger",51],["const",52],["=>",53],["extends",54],["static",55],["get",56],["set",57],["new",58],["]",59],[".",60],["super",61],["target",62],["...",63],["this",64],["=",65],["*=",66],["/=",67],["%=",68],["+=",69],["-=",70],["<<=",71],[">>=",72],[">>>=",73],["&=",74],["^=",75],["|=",76],["**=",77],["?",78],["||",79],["&&",80],["|",81],["^",82],["&",83],["==",84],["!=",85],["===",86],["!==",87],["<",88],[">",89],["<=",90],[">=",91],["instanceof",92],["<<",93],[">>",94],[">>>",95],["+",96],["-",97],["/",98],["%",99],["**",100],["delete",101],["void",102],["typeof",103],["~",104],["!",105],["++",106],["--",107],[null,6],["\"",115],["'",116],["null",117],["true",118],["false",119],["$",120]]),

        //Reverse Symbol Lookup map
        rlu$1 = new Map([[1,1],[2,2],[3,4],[4,8],[5,16],[6,32],[7,64],[8,128],[9,256],[10,512],[11,3],[11,264],[13,200],[14,"import"],[15,","],[16,"*"],[17,"as"],[18,"{"],[19,"}"],[20,"from"],[21,"export"],[22,";"],[23,"default"],[24,"function"],[25,"class"],[26,"let"],[27,"["],[28,"async"],[29,"if"],[30,"("],[31,")"],[32,"else"],[33,"do"],[34,"while"],[35,"for"],[36,"var"],[37,"in"],[38,"of"],[39,"await"],[40,"continue"],[41,"break"],[42,"return"],[43,"throw"],[44,"with"],[45,"switch"],[46,"case"],[47,":"],[48,"try"],[49,"catch"],[50,"finally"],[51,"debugger"],[52,"const"],[53,"=>"],[54,"extends"],[55,"static"],[56,"get"],[57,"set"],[58,"new"],[59,"]"],[60,"."],[61,"super"],[62,"target"],[63,"..."],[64,"this"],[65,"="],[66,"*="],[67,"/="],[68,"%="],[69,"+="],[70,"-="],[71,"<<="],[72,">>="],[73,">>>="],[74,"&="],[75,"^="],[76,"|="],[77,"**="],[78,"?"],[79,"||"],[80,"&&"],[81,"|"],[82,"^"],[83,"&"],[84,"=="],[85,"!="],[86,"==="],[87,"!=="],[88,"<"],[89,">"],[90,"<="],[91,">="],[92,"instanceof"],[93,"<<"],[94,">>"],[95,">>>"],[96,"+"],[97,"-"],[98,"/"],[99,"%"],[100,"**"],[101,"delete"],[102,"void"],[103,"typeof"],[104,"~"],[105,"!"],[106,"++"],[107,"--"],[6,null],[115,"\""],[116,"'"],[117,"null"],[118,"true"],[119,"false"],[120,"$"]]),

        // States 
        state$1 = [sm0$1,
    sm1$1,
    sm2$1,
    sm3$1,
    sm4$1,
    sm5$1,
    sm6$1,
    sm7$1,
    sm8$1,
    sm8$1,
    sm9$1,
    sm9$1,
    sm9$1,
    sm9$1,
    sm9$1,
    sm9$1,
    sm9$1,
    sm9$1,
    sm9$1,
    sm9$1,
    sm9$1,
    sm9$1,
    sm9$1,
    sm9$1,
    sm10$1,
    sm11$1,
    sm12$1,
    sm13$1,
    sm14$1,
    sm15$1,
    sm16$1,
    sm16$1,
    sm17$1,
    sm18$1,
    sm19$1,
    sm20$1,
    sm21$1,
    sm22$1,
    sm23$1,
    sm24$1,
    sm25$1,
    sm26$1,
    sm27$1,
    sm28$1,
    sm29$1,
    sm30$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm32$1,
    sm31$1,
    sm31$1,
    sm33$1,
    sm34$1,
    sm35$1,
    sm36$1,
    sm37$1,
    sm37$1,
    sm37$1,
    sm38$1,
    sm39$1,
    sm39$1,
    sm39$1,
    sm39$1,
    sm40$1,
    sm41$1,
    sm42$1,
    sm43$1,
    sm44$1,
    sm45$1,
    sm45$1,
    sm46$1,
    sm46$1,
    sm46$1,
    sm46$1,
    sm47$1,
    sm47$1,
    sm48$1,
    sm49$1,
    sm50$1,
    sm51$1,
    sm52$1,
    sm53$1,
    sm54$1,
    sm55$1,
    sm55$1,
    sm31$1,
    sm56$1,
    sm57$1,
    sm58$1,
    sm59$1,
    sm60$1,
    sm61$1,
    sm62$1,
    sm62$1,
    sm63$1,
    sm64$1,
    sm65$1,
    sm66$1,
    sm67$1,
    sm68$1,
    sm69$1,
    sm70$1,
    sm31$1,
    sm71$1,
    sm72$1,
    sm73$1,
    sm73$1,
    sm73$1,
    sm74$1,
    sm75$1,
    sm76$1,
    sm59$1,
    sm77$1,
    sm78$1,
    sm79$1,
    sm80$1,
    sm81$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm82$1,
    sm83$1,
    sm84$1,
    sm84$1,
    sm84$1,
    sm84$1,
    sm84$1,
    sm84$1,
    sm84$1,
    sm84$1,
    sm84$1,
    sm84$1,
    sm84$1,
    sm84$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm85$1,
    sm32$1,
    sm86$1,
    sm87$1,
    sm88$1,
    sm39$1,
    sm89$1,
    sm90$1,
    sm91$1,
    sm92$1,
    sm93$1,
    sm94$1,
    sm95$1,
    sm96$1,
    sm97$1,
    sm98$1,
    sm99$1,
    sm100$1,
    sm101$1,
    sm102$1,
    sm103$1,
    sm31$1,
    sm104$1,
    sm31$1,
    sm102$1,
    sm105$1,
    sm106$1,
    sm35$1,
    sm107$1,
    sm108$1,
    sm109$1,
    sm110$1,
    sm111$1,
    sm112$1,
    sm113$1,
    sm113$1,
    sm113$1,
    sm113$1,
    sm113$1,
    sm113$1,
    sm113$1,
    sm114$1,
    sm111$1,
    sm115$1,
    sm116$1,
    sm116$1,
    sm116$1,
    sm116$1,
    sm116$1,
    sm116$1,
    sm116$1,
    sm117$1,
    sm118$1,
    sm59$1,
    sm119$1,
    sm102$1,
    sm31$1,
    sm120$1,
    sm121$1,
    sm122$1,
    sm123$1,
    sm124$1,
    sm125$1,
    sm126$1,
    sm127$1,
    sm128$1,
    sm129$1,
    sm130$1,
    sm130$1,
    sm131$1,
    sm132$1,
    sm31$1,
    sm133$1,
    sm31$1,
    sm134$1,
    sm135$1,
    sm31$1,
    sm136$1,
    sm137$1,
    sm138$1,
    sm139$1,
    sm140$1,
    sm141$1,
    sm142$1,
    sm31$1,
    sm143$1,
    sm144$1,
    sm145$1,
    sm146$1,
    sm147$1,
    sm148$1,
    sm149$1,
    sm150$1,
    sm151$1,
    sm152$1,
    sm153$1,
    sm154$1,
    sm128$1,
    sm128$1,
    sm155$1,
    sm156$1,
    sm157$1,
    sm157$1,
    sm158$1,
    sm159$1,
    sm160$1,
    sm161$1,
    sm162$1,
    sm163$1,
    sm164$1,
    sm165$1,
    sm166$1,
    sm167$1,
    sm168$1,
    sm169$1,
    sm170$1,
    sm171$1,
    sm172$1,
    sm173$1,
    sm174$1,
    sm175$1,
    sm176$1,
    sm177$1,
    sm178$1,
    sm179$1,
    sm180$1,
    sm181$1,
    sm182$1,
    sm183$1,
    sm184$1,
    sm185$1,
    sm186$1,
    sm187$1,
    sm187$1,
    sm31$1,
    sm188$1,
    sm189$1,
    sm190$1,
    sm191$1,
    sm192$1,
    sm191$1,
    sm31$1,
    sm193$1,
    sm194$1,
    sm195$1,
    sm195$1,
    sm196$1,
    sm196$1,
    sm197$1,
    sm197$1,
    sm31$1,
    sm198$1,
    sm199$1,
    sm200$1,
    sm201$1,
    sm202$1,
    sm31$1,
    sm203$1,
    sm204$1,
    sm205$1,
    sm206$1,
    sm207$1,
    sm208$1,
    sm207$1,
    sm209$1,
    sm210$1,
    sm211$1,
    sm212$1,
    sm213$1,
    sm214$1,
    sm215$1,
    sm216$1,
    sm217$1,
    sm11$1,
    sm218$1,
    sm219$1,
    sm219$1,
    sm220$1,
    sm59$1,
    sm221$1,
    sm31$1,
    sm221$1,
    sm222$1,
    sm223$1,
    sm224$1,
    sm102$1,
    sm225$1,
    sm226$1,
    sm227$1,
    sm228$1,
    sm229$1,
    sm230$1,
    sm231$1,
    sm232$1,
    sm59$1,
    sm233$1,
    sm234$1,
    sm235$1,
    sm236$1,
    sm237$1,
    sm238$1,
    sm239$1,
    sm240$1,
    sm241$1,
    sm59$1,
    sm242$1,
    sm243$1,
    sm244$1,
    sm59$1,
    sm245$1,
    sm246$1,
    sm247$1,
    sm248$1,
    sm249$1,
    sm250$1,
    sm251$1,
    sm252$1,
    sm253$1,
    sm254$1,
    sm71$1,
    sm255$1,
    sm256$1,
    sm257$1,
    sm258$1,
    sm259$1,
    sm260$1,
    sm261$1,
    sm262$1,
    sm261$1,
    sm263$1,
    sm264$1,
    sm265$1,
    sm266$1,
    sm267$1,
    sm268$1,
    sm269$1,
    sm270$1,
    sm271$1,
    sm151$1,
    sm272$1,
    sm59$1,
    sm273$1,
    sm273$1,
    sm31$1,
    sm274$1,
    sm275$1,
    sm276$1,
    sm276$1,
    sm277$1,
    sm278$1,
    sm279$1,
    sm280$1,
    sm281$1,
    sm282$1,
    sm283$1,
    sm284$1,
    sm31$1,
    sm151$1,
    sm285$1,
    sm286$1,
    sm287$1,
    sm288$1,
    sm289$1,
    sm290$1,
    sm291$1,
    sm292$1,
    sm293$1,
    sm59$1,
    sm294$1,
    sm294$1,
    sm295$1,
    sm296$1,
    sm297$1,
    sm298$1,
    sm299$1,
    sm300$1,
    sm300$1,
    sm301$1,
    sm302$1,
    sm59$1,
    sm303$1,
    sm304$1,
    sm305$1,
    sm306$1,
    sm305$1,
    sm305$1,
    sm307$1,
    sm308$1,
    sm308$1,
    sm309$1,
    sm63$1,
    sm31$1,
    sm63$1,
    sm310$1,
    sm311$1,
    sm312$1,
    sm313$1,
    sm314$1,
    sm315$1,
    sm316$1,
    sm317$1,
    sm318$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm31$1,
    sm319$1,
    sm316$1,
    sm316$1,
    sm320$1,
    sm59$1,
    sm321$1,
    sm59$1,
    sm322$1,
    sm63$1,
    sm323$1,
    sm59$1,
    sm324$1,
    sm325$1,
    sm326$1,
    sm327$1,
    sm328$1,
    sm329$1,
    sm330$1,
    sm331$1,
    sm332$1,
    sm333$1,
    sm334$1,
    sm335$1,
    sm336$1,
    sm336$1,
    sm337$1,
    sm338$1,
    sm339$1,
    sm340$1,
    sm341$1,
    sm342$1,
    sm343$1,
    sm59$1,
    sm344$1,
    sm345$1,
    sm346$1,
    sm31$1,
    sm347$1,
    sm348$1,
    sm349$1,
    sm350$1,
    sm351$1,
    sm352$1,
    sm353$1,
    sm354$1,
    sm354$1,
    sm355$1,
    sm356$1,
    sm357$1,
    sm358$1,
    sm359$1,
    sm360$1,
    sm361$1,
    sm362$1,
    sm31$1,
    sm363$1,
    sm63$1,
    sm364$1,
    sm31$1,
    sm31$1,
    sm365$1,
    sm366$1,
    sm63$1,
    sm367$1,
    sm368$1,
    sm369$1,
    sm370$1,
    sm31$1,
    sm371$1,
    sm372$1,
    sm372$1,
    sm31$1,
    sm373$1,
    sm374$1,
    sm375$1,
    sm376$1,
    sm377$1,
    sm377$1,
    sm378$1,
    sm379$1,
    sm380$1,
    sm381$1,
    sm382$1,
    sm383$1,
    sm384$1,
    sm385$1,
    sm386$1,
    sm387$1,
    sm388$1,
    sm389$1,
    sm389$1,
    sm390$1,
    sm391$1,
    sm392$1,
    sm391$1,
    sm63$1,
    sm393$1,
    sm394$1,
    sm395$1,
    sm63$1,
    sm396$1,
    sm63$1,
    sm397$1,
    sm398$1,
    sm399$1,
    sm400$1,
    sm401$1,
    sm402$1,
    sm63$1,
    sm63$1,
    sm403$1,
    sm63$1,
    sm63$1,
    sm63$1,
    sm63$1,
    sm404$1,
    sm31$1,
    sm405$1,
    sm406$1,
    sm407$1,
    sm408$1,
    sm409$1,
    sm31$1,
    sm410$1,
    sm71$1,
    sm411$1,
    sm412$1,
    sm379$1,
    sm379$1,
    sm379$1,
    sm413$1,
    sm414$1,
    sm415$1,
    sm416$1,
    sm417$1,
    sm63$1,
    sm63$1,
    sm418$1,
    sm63$1,
    sm419$1,
    sm420$1,
    sm421$1,
    sm63$1,
    sm63$1,
    sm63$1,
    sm63$1,
    sm422$1,
    sm423$1,
    sm424$1,
    sm425$1,
    sm424$1,
    sm425$1,
    sm63$1,
    sm426$1,
    sm63$1,
    sm427$1,
    sm428$1,
    sm429$1,
    sm430$1,
    sm428$1,
    sm431$1,
    sm11$1,
    sm432$1,
    sm433$1,
    sm434$1,
    sm435$1,
    sm436$1,
    sm379$1,
    sm63$1,
    sm437$1,
    sm438$1,
    sm439$1,
    sm440$1,
    sm63$1,
    sm63$1,
    sm441$1,
    sm442$1,
    sm443$1,
    sm444$1,
    sm445$1,
    sm63$1,
    sm445$1,
    sm446$1,
    sm447$1,
    sm447$1,
    sm448$1,
    sm449$1,
    sm450$1,
    sm451$1,
    sm452$1,
    sm453$1,
    sm454$1,
    sm63$1,
    sm455$1,
    sm456$1,
    sm457$1,
    sm458$1,
    sm459$1,
    sm460$1,
    sm461$1],

    /************ Functions *************/

        max$1 = Math.max, min$1 = Math.min,

        //Error Functions
        e$3 = (...d)=>fn$1.defaultError(...d), 
        eh$1 = [e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3,
    e$3],

        //Empty Function
        nf$1 = ()=>-1, 

        //Environment Functions
        
    redv$1 = (ret, fn, plen, ln, t, e, o, l, s) => {        ln = max$1(o.length - plen, 0);        o[ln] = fn(o.slice(-plen), e, l, s, o, plen);        o.length = ln + 1;        return ret;    },
    rednv$1 = (ret, Fn, plen, ln, t, e, o, l, s) => {        ln = max$1(o.length - plen, 0);        o[ln] = new Fn(o.slice(-plen), e, l, s, o, plen);        o.length = ln + 1;        return ret;    },
    redn$1 = (ret, plen, t, e, o, l, s) => {        if(plen > 0){            let ln = max$1(o.length - plen, 0);            o[ln] = o[o.length -1];            o.length = ln + 1;        }        return ret;    },
    shftf$1 = (ret, fn, t, e, o, l, s) => (fn(o, e, l, s), ret),
    R0_javascript=function (sym,env,lex,state,output,len) {return sym[0]},
    R0_statement_list4701_group_list=function (sym,env,lex,state,output,len) {return (sym[0].push(sym[1]),sym[0])},
    R1_statement_list4701_group_list=function (sym,env,lex,state,output,len) {return [sym[0]]},
    C0_empty_statement=function (sym,env,lex,state,output,len) {this.type = "empty";},
    R0_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],sym[4],sym[6],sym[8])},
    I1_iteration_statement=function (sym,env,lex,state,output,len) {env.ASI = false;},
    I2_iteration_statement=function (sym,env,lex,state,output,len) {env.ASI = true;},
    R3_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(null,sym[4],sym[6],sym[8])},
    R4_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],null,sym[6],sym[8])},
    R5_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],sym[4],null,sym[8])},
    R6_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(null,null,sym[4],sym[6])},
    R7_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],null,null,sym[8])},
    R8_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(null,null,null,sym[5])},
    R9_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[3],sym[5],sym[7],sym[9])},
    R10_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[3],sym[5],null,sym[9])},
    R11_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[3],null,sym[7],sym[9])},
    R12_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[3],null,null,sym[9])},
    R13_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],sym[3],null,sym[6])},
    R14_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],null,sym[5],sym[6])},
    R15_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_stmt(sym[2],null,null,sym[5])},
    R16_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_in_stmt(sym[2],sym[4],sym[6])},
    R17_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_in_stmt(sym[3],sym[5],sym[7])},
    R18_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_of_stmt(sym[2],sym[4],sym[6])},
    R19_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_of_stmt(sym[3],sym[5],sym[7],true)},
    R20_iteration_statement=function (sym,env,lex,state,output,len) {return new env.functions.for_of_stmt(sym[4],sym[6],sym[8],true)},
    R0_continue_statement=function (sym,env,lex,state,output,len) {return new env.functions.continue_stmt(sym[1])},
    R0_break_statement=function (sym,env,lex,state,output,len) {return new env.functions.break_stmt(sym[1])},
    R0_case_block=function (sym,env,lex,state,output,len) {return []},
    R1_case_block=function (sym,env,lex,state,output,len) {return sym[1].concat(sym[2].concat(sym[3]))},
    R2_case_block=function (sym,env,lex,state,output,len) {return sym[1].concat(sym[2])},
    R3_case_block=function (sym,env,lex,state,output,len) {return sym[1]},
    R0_case_clauses=function (sym,env,lex,state,output,len) {return sym[0].concat(sym[1])},
    R0_case_clause=function (sym,env,lex,state,output,len) {return new env.functions.case_stmt(sym[1],sym[3])},
    R1_case_clause=function (sym,env,lex,state,output,len) {return new env.functions.case_stmt(sym[1])},
    R0_default_clause=function (sym,env,lex,state,output,len) {return new env.functions.default_case_stmt(sym[2])},
    R1_default_clause=function (sym,env,lex,state,output,len) {return new env.functions.default_case_stmt()},
    R0_try_statement=function (sym,env,lex,state,output,len) {return new env.functions.try_stmt(sym[1],sym[2])},
    R1_try_statement=function (sym,env,lex,state,output,len) {return new env.functions.try_stmt(sym[1],null,sym[2])},
    R2_try_statement=function (sym,env,lex,state,output,len) {return new env.functions.try_stmt(sym[1],sym[2],sym[3])},
    R0_variable_declaration_list=function (sym,env,lex,state,output,len) {return sym[0].push(sym[2])},
    R0_let_or_const=function (sym,env,lex,state,output,len) {return "let"},
    R1_let_or_const=function (sym,env,lex,state,output,len) {return "const"},
    R0_function_declaration=function (sym,env,lex,state,output,len) {return new env.functions.funct_decl(null,sym[2],sym[5])},
    R1_function_declaration=function (sym,env,lex,state,output,len) {return new env.functions.funct_decl(sym[1],sym[3],sym[6])},
    R0_formal_parameters=function (sym,env,lex,state,output,len) {return (sym[0].push(sym[2]),sym[0])},
    R0_arrow_function=function (sym,env,lex,state,output,len) {return new env.functions.arrow(null,sym[0],sym[2])},
    R0_class_tail=function (sym,env,lex,state,output,len) {return new env.functions.class_tail(sym)},
    R1_class_tail=function (sym,env,lex,state,output,len) {return new env.functions.class_tail([null,...sym[0]])},
    R2_class_tail=function (sym,env,lex,state,output,len) {return new env.functions.class_tail([sym[0],null,null])},
    R3_class_tail=function (sym,env,lex,state,output,len) {return null},
    R0_class_element_list=function (sym,env,lex,state,output,len) {return sym[0].push(sym[1])},
    R0_class_element=function (sym,env,lex,state,output,len) {return (sym[1].static = true,sym[1])},
    R0_argument_list=function (sym,env,lex,state,output,len) {return (sym[0].push(new env.functions.spread_expr(env,sym.slice(2,4))),env[0])},
    R0_element_list=function (sym,env,lex,state,output,len) {return [sym[1]]},
    R0_cover_parenthesized_expression_and_arrow_parameter_list=function (sym,env,lex,state,output,len) {return new env.functions.spread_expr(env,sym.slice(1,3))},
    R1_cover_parenthesized_expression_and_arrow_parameter_list=function (sym,env,lex,state,output,len) {return Array.isArray(sym[0]) ? (sym[1].push(new env.functions.spread_expr(env,sym.slice(3,5))),sym[1]) : [sym[0],new env.functions.spread_expr(env,sym.slice(3,5))]},
    R0_string_literal38407_group_list=function (sym,env,lex,state,output,len) {return sym[0] + sym[1]},
    R1_string_literal38407_group_list=function (sym,env,lex,state,output,len) {return sym[0] + ""},

        //Sparse Map Lookup
        lsm$1 = (index, map) => {    if (map[0] == 0xFFFFFFFF) return map[index+1];    for (let i = 1, ind = 0, l = map.length, n = 0; i < l && ind <= index; i++) {        if (ind !== index) {            if ((n = map[i]) > -1) ind++;            else ind += -n;        } else return map[i];    }    return -1;},

        //State Action Functions
        state_funct$1 = [(...v)=>((redn$1(20483,0,...v))),
    ()=>(338),
    ()=>(294),
    ()=>(102),
    ()=>(382),
    ()=>(462),
    ()=>(454),
    ()=>(470),
    ()=>(386),
    ()=>(342),
    ()=>(398),
    ()=>(402),
    ()=>(406),
    ()=>(378),
    ()=>(362),
    ()=>(414),
    ()=>(418),
    ()=>(422),
    ()=>(430),
    ()=>(426),
    ()=>(410),
    ()=>(434),
    ()=>(438),
    ()=>(474),
    ()=>(238),
    ()=>(346),
    ()=>(254),
    ()=>(198),
    ()=>(202),
    ()=>(186),
    ()=>(190),
    ()=>(194),
    ()=>(206),
    ()=>(210),
    ()=>(218),
    ()=>(222),
    ()=>(330),
    ()=>(334),
    ()=>(326),
    ()=>(318),
    ()=>(322),
    ()=>(298),
    (...v)=>(redv$1(5,R0_javascript,1,0,...v)),
    (...v)=>(redv$1(1031,R0_javascript,1,0,...v)),
    (...v)=>(redv$1(20487,R0_javascript,1,0,...v)),
    (...v)=>(redn$1(21511,1,...v)),
    (...v)=>(rednv$1(24583,fn$1.stmts,1,0,...v)),
    (...v)=>(redv$1(23559,R1_statement_list4701_group_list,1,0,...v)),
    (...v)=>(redn$1(22535,1,...v)),
    (...v)=>(redn$1(25607,1,...v)),
    (...v)=>(redn$1(26631,1,...v)),
    (...v)=>(redn$1(30727,1,...v)),
    ()=>(486),
    ()=>(490),
    (...v)=>(rednv$1(92167,fn$1.expression_list,1,0,...v)),
    (...v)=>(redv$1(91143,R1_statement_list4701_group_list,1,0,...v)),
    (...v)=>(redn$1(90119,1,...v)),
    (...v)=>(redn$1(116743,1,...v)),
    (...v)=>(redn$1(132103,1,...v)),
    ()=>(494),
    ()=>(510),
    ()=>(514),
    ()=>(518),
    ()=>(522),
    ()=>(526),
    ()=>(530),
    ()=>(534),
    ()=>(538),
    ()=>(542),
    ()=>(546),
    ()=>(550),
    ()=>(554),
    ()=>(502),
    ()=>(506),
    (...v)=>(redn$1(118791,1,...v)),
    ()=>(558),
    ()=>(562),
    (...v)=>(redn$1(119815,1,...v)),
    ()=>(566),
    (...v)=>(redn$1(120839,1,...v)),
    ()=>(570),
    (...v)=>(redn$1(121863,1,...v)),
    ()=>(574),
    (...v)=>(redn$1(122887,1,...v)),
    ()=>(578),
    (...v)=>(redn$1(123911,1,...v)),
    ()=>(582),
    ()=>(586),
    ()=>(590),
    ()=>(594),
    (...v)=>(redn$1(124935,1,...v)),
    ()=>(618),
    ()=>(598),
    ()=>(602),
    ()=>(606),
    ()=>(610),
    ()=>(614),
    (...v)=>(redn$1(125959,1,...v)),
    ()=>(622),
    ()=>(626),
    ()=>(630),
    (...v)=>(redn$1(126983,1,...v)),
    ()=>(634),
    ()=>(638),
    (...v)=>(redn$1(128007,1,...v)),
    ()=>(642),
    ()=>(646),
    ()=>(650),
    (...v)=>(redn$1(129031,1,...v)),
    (...v)=>(redn$1(130055,1,...v)),
    (...v)=>(redn$1(131079,1,...v)),
    ()=>(654),
    ()=>(690),
    ()=>(686),
    (...v)=>(redn$1(93191,1,...v)),
    ()=>(742),
    ()=>(746),
    ()=>(734),
    (...v)=>(redn$1(94215,1,...v)),
    ()=>(750),
    ()=>(754),
    ()=>(770),
    ()=>(774),
    (...v)=>(redn$1(95239,1,...v)),
    (...v)=>(rednv$1(103431,fn$1.this_expr,1,0,...v)),
    (...v)=>(redn$1(103431,1,...v)),
    (...v)=>(redn$1(74759,1,...v)),
    (...v)=>(redn$1(156679,1,...v)),
    (...v)=>(redn$1(155655,1,...v)),
    (...v)=>(redn$1(157703,1,...v)),
    (...v)=>(redn$1(158727,1,...v)),
    (...v)=>(rednv$1(161799,fn$1.identifier,1,0,...v)),
    (...v)=>(redv$1(160775,R1_string_literal38407_group_list,1,0,...v)),
    (...v)=>(redn$1(159751,1,...v)),
    (...v)=>(redn$1(146439,1,...v)),
    (...v)=>(rednv$1(154631,fn$1.bool_literal,1,0,...v)),
    (...v)=>(rednv$1(153607,fn$1.null_literal,1,0,...v)),
    ()=>(806),
    ()=>(798),
    ()=>(794),
    ()=>(814),
    ()=>(818),
    ()=>(810),
    ()=>(802),
    ()=>(786),
    ()=>(846),
    ()=>(838),
    ()=>(834),
    ()=>(854),
    ()=>(858),
    ()=>(850),
    ()=>(842),
    ()=>(826),
    (...v)=>(rednv$1(152583,fn$1.numeric_literal,1,0,...v)),
    ()=>(862),
    ()=>(870),
    ()=>(882),
    ()=>(878),
    (...v)=>(redn$1(97287,1,...v)),
    (...v)=>(redn$1(99335,1,...v)),
    ()=>(894),
    ()=>(902),
    ()=>(934),
    ()=>(938),
    (...v)=>(rednv$1(32775,C0_empty_statement,1,0,...v)),
    ()=>(942),
    (...v)=>(redn$1(29703,1,...v)),
    ()=>(950),
    (...v)=>(shftf$1(954,I1_iteration_statement,...v)),
    ()=>(958),
    ()=>(962),
    ()=>(966),
    ()=>(978),
    ()=>(986),
    ()=>(994),
    ()=>(1006),
    (...v)=>(redn$1(27655,1,...v)),
    ()=>(1022),
    ()=>(1026),
    (...v)=>(redn$1(28679,1,...v)),
    ()=>(1030),
    (...v)=>(redv$1(61447,R0_let_or_const,1,0,...v)),
    (...v)=>(redv$1(61447,R1_let_or_const,1,0,...v)),
    (...v)=>(redv$1(23563,R0_statement_list4701_group_list,2,0,...v)),
    ()=>(1054),
    (...v)=>(rednv$1(33803,fn$1.expr_stmt,2,0,...v)),
    (...v)=>(rednv$1(132107,fn$1.post_inc_expr,2,0,...v)),
    (...v)=>(rednv$1(132107,fn$1.post_dec_expr,2,0,...v)),
    (...v)=>(redn$1(117767,1,...v)),
    (...v)=>(rednv$1(131083,fn$1.delete_expr,2,0,...v)),
    (...v)=>(rednv$1(103431,fn$1.array_literal,1,0,...v)),
    (...v)=>(rednv$1(103431,fn$1.object,1,0,...v)),
    ()=>(1182),
    ()=>(1170),
    ()=>(1194),
    ()=>(1198),
    ()=>(1258),
    ()=>(1234),
    ()=>(1238),
    ()=>(1222),
    (...v)=>(redn$1(64519,1,...v)),
    (...v)=>(redn$1(80903,1,...v)),
    (...v)=>(rednv$1(131083,fn$1.void_expr,2,0,...v)),
    (...v)=>(rednv$1(131083,fn$1.typeof_expr,2,0,...v)),
    (...v)=>(rednv$1(131083,fn$1.plus_expr,2,0,...v)),
    (...v)=>(rednv$1(131083,fn$1.negate_expr,2,0,...v)),
    (...v)=>(rednv$1(131083,fn$1.unary_or_expr,2,0,...v)),
    (...v)=>(rednv$1(131083,fn$1.unary_not_expr,2,0,...v)),
    (...v)=>(rednv$1(132107,fn$1.pre_inc_expr,2,0,...v)),
    (...v)=>(rednv$1(132107,fn$1.pre_dec_expr,2,0,...v)),
    (...v)=>(rednv$1(99339,fn$1.call_expr,2,0,...v)),
    ()=>(1270),
    ()=>(1282),
    (...v)=>(rednv$1(79883,fn$1.call_expr,2,0,...v)),
    (...v)=>(rednv$1(94219,fn$1.new_expr,2,0,...v)),
    ()=>(1298),
    (...v)=>(redv$1(160779,R0_string_literal38407_group_list,2,0,...v)),
    ()=>(1302),
    (...v)=>(rednv$1(151563,fn$1.string_literal,2,0,...v)),
    (...v)=>(redv$1(148487,R1_string_literal38407_group_list,1,0,...v)),
    (...v)=>(redn$1(147463,1,...v)),
    ()=>(1310),
    (...v)=>(redv$1(150535,R1_string_literal38407_group_list,1,0,...v)),
    (...v)=>(redn$1(149511,1,...v)),
    (...v)=>(redv$1(134155,R3_class_tail,2,0,...v)),
    ()=>(1322),
    ()=>(1318),
    (...v)=>(redn$1(100363,2,...v)),
    (...v)=>(rednv$1(133131,fn$1.await_expr,2,0,...v)),
    ()=>(1350),
    (...v)=>(rednv$1(49163,fn$1.label_stmt,2,0,...v)),
    ()=>(1370),
    ()=>(1366),
    (...v)=>(redv$1(58375,R1_statement_list4701_group_list,1,0,...v)),
    (...v)=>(rednv$1(59399,fn$1.binding,1,0,...v)),
    ()=>(1378),
    (...v)=>(redn$1(135175,1,...v)),
    ()=>(1386),
    ()=>(1398),
    ()=>(1418),
    ()=>(1434),
    ()=>(1458),
    ()=>(1470),
    ()=>(1474),
    ()=>(1494),
    (...v)=>(rednv$1(38923,fn$1.continue_stmt,2,0,...v)),
    ()=>(1502),
    (...v)=>(rednv$1(39947,fn$1.break_stmt,2,0,...v)),
    ()=>(1506),
    (...v)=>(rednv$1(40971,fn$1.return_stmt,2,0,...v)),
    ()=>(1510),
    ()=>(1518),
    ()=>(1530),
    ()=>(1534),
    (...v)=>(rednv$1(56331,fn$1.debugger_stmt,2,0,...v)),
    (...v)=>(rednv$1(81931,fn$1.class_stmt,2,0,...v)),
    ()=>(1542),
    ()=>(1550),
    ()=>(1570),
    ()=>(1566),
    (...v)=>((redn$1(67587,0,...v))),
    ()=>(1610),
    ()=>(1618),
    ()=>(1614),
    (...v)=>(redv$1(62471,R1_statement_list4701_group_list,1,0,...v)),
    (...v)=>(rednv$1(31759,fn$1.block,3,0,...v)),
    (...v)=>(redv$1(91151,R0_formal_parameters,3,0,...v)),
    (...v)=>(rednv$1(116751,fn$1.assign,3,0,...v)),
    ()=>(1630),
    (...v)=>(rednv$1(119823,fn$1.or,3,0,...v)),
    (...v)=>(rednv$1(120847,fn$1.and,3,0,...v)),
    (...v)=>(rednv$1(121871,fn$1.bit_or,3,0,...v)),
    (...v)=>(rednv$1(122895,fn$1.bit_xor,3,0,...v)),
    (...v)=>(rednv$1(123919,fn$1.bit_and,3,0,...v)),
    (...v)=>(rednv$1(124943,fn$1.eq,3,0,...v)),
    (...v)=>(rednv$1(124943,fn$1.neq,3,0,...v)),
    (...v)=>(rednv$1(124943,fn$1.strict_eq,3,0,...v)),
    (...v)=>(rednv$1(124943,fn$1.strict_neq,3,0,...v)),
    (...v)=>(rednv$1(125967,fn$1.lt,3,0,...v)),
    (...v)=>(rednv$1(125967,fn$1.gt,3,0,...v)),
    (...v)=>(rednv$1(125967,fn$1.lteq,3,0,...v)),
    (...v)=>(rednv$1(125967,fn$1.gteq,3,0,...v)),
    (...v)=>(rednv$1(125967,fn$1.instanceof_expr,3,0,...v)),
    (...v)=>(rednv$1(125967,fn$1.in,3,0,...v)),
    (...v)=>(rednv$1(126991,fn$1.l_shift,3,0,...v)),
    (...v)=>(rednv$1(126991,fn$1.r_shift,3,0,...v)),
    (...v)=>(rednv$1(126991,fn$1.r_shift_fill,3,0,...v)),
    (...v)=>(rednv$1(128015,fn$1.add,3,0,...v)),
    (...v)=>(rednv$1(128015,fn$1.sub,3,0,...v)),
    (...v)=>(rednv$1(129039,fn$1.mult,3,0,...v)),
    (...v)=>(rednv$1(129039,fn$1.div,3,0,...v)),
    (...v)=>(rednv$1(129039,fn$1.mod,3,0,...v)),
    (...v)=>(rednv$1(130063,fn$1.exp,3,0,...v)),
    (...v)=>(redv$1(112651,R0_case_block,2,0,...v)),
    ()=>(1638),
    ()=>(1634),
    ()=>(1658),
    ()=>(1650),
    (...v)=>(redn$1(114695,1,...v)),
    (...v)=>(redv$1(113671,R1_statement_list4701_group_list,1,0,...v)),
    (...v)=>(redv$1(104459,R3_class_tail,2,0,...v)),
    ()=>(1670),
    ()=>(1666),
    (...v)=>(redv$1(105479,R1_statement_list4701_group_list,1,0,...v)),
    (...v)=>(redn$1(106503,1,...v)),
    ()=>(1686),
    ()=>(1682),
    (...v)=>(redn$1(108551,1,...v)),
    (...v)=>(redn$1(107527,1,...v)),
    (...v)=>(rednv$1(99343,fn$1.call_expr,3,0,...v)),
    ()=>(1702),
    (...v)=>(redv$1(101387,R0_case_block,2,0,...v)),
    ()=>(1710),
    ()=>(1706),
    (...v)=>(redv$1(102407,R1_statement_list4701_group_list,1,0,...v)),
    ()=>(1718),
    (...v)=>(rednv$1(95247,fn$1.member,3,0,...v)),
    (...v)=>(rednv$1(95247,fn$1.new_member_stmt,3,0,...v)),
    (...v)=>(rednv$1(98319,fn$1.new_target_expr,3,0,...v)),
    (...v)=>(rednv$1(151567,fn$1.string_literal,3,0,...v)),
    (...v)=>(redv$1(148491,R0_string_literal38407_group_list,2,0,...v)),
    (...v)=>(redv$1(150539,R0_string_literal38407_group_list,2,0,...v)),
    (...v)=>(redv$1(134159,R3_case_block,3,0,...v)),
    ()=>(1722),
    ()=>(1726),
    ()=>(1730),
    ()=>(1734),
    (...v)=>(rednv$1(96271,fn$1.supper_expr,3,0,...v)),
    ()=>(1738),
    (...v)=>(redv$1(73743,R0_arrow_function,3,0,...v)),
    (...v)=>(redn$1(75783,1,...v)),
    (...v)=>(redv$1(50187,R3_case_block,2,0,...v)),
    (...v)=>(redn$1(51207,1,...v)),
    (...v)=>(rednv$1(57359,fn$1.var_stmt,3,0,...v)),
    (...v)=>(rednv$1(59403,fn$1.binding,2,0,...v)),
    (...v)=>(redn$1(136203,2,...v)),
    ()=>(1758),
    ()=>(1766),
    ()=>(1762),
    (...v)=>(redn$1(139271,1,...v)),
    (...v)=>(redn$1(142343,1,...v)),
    ()=>(1774),
    (...v)=>(redn$1(144391,1,...v)),
    (...v)=>(redn$1(137227,2,...v)),
    ()=>(1786),
    ()=>(1794),
    ()=>(1802),
    ()=>(1798),
    (...v)=>(redn$1(140295,1,...v)),
    (...v)=>(redn$1(141319,1,...v)),
    (...v)=>(redn$1(143367,1,...v)),
    ()=>(1818),
    ()=>(1822),
    ()=>(1826),
    ()=>(1830),
    ()=>(1838),
    ()=>(1862),
    ()=>(1866),
    ()=>(1870),
    ()=>(1874),
    ()=>(1878),
    ()=>(1898),
    ()=>(1910),
    (...v)=>(redv$1(38927,R0_continue_statement,3,0,...v)),
    (...v)=>(redv$1(39951,R0_break_statement,3,0,...v)),
    (...v)=>(rednv$1(40975,fn$1.return_stmt,3,0,...v)),
    ()=>(1914),
    (...v)=>(rednv$1(41999,fn$1.throw_stmt,3,0,...v)),
    (...v)=>(redv$1(52239,R0_try_statement,3,0,...v)),
    (...v)=>(redv$1(52239,R1_try_statement,3,0,...v)),
    ()=>(1922),
    (...v)=>(rednv$1(81935,fn$1.class_stmt,3,0,...v)),
    ()=>(1934),
    ()=>(1938),
    (...v)=>(redv$1(82955,R3_class_tail,2,0,...v)),
    (...v)=>(redn$1(84999,1,...v)),
    (...v)=>(redv$1(86023,R1_statement_list4701_group_list,1,0,...v)),
    (...v)=>(redn$1(87047,1,...v)),
    (...v)=>(redv$1(83979,R3_case_block,2,0,...v)),
    ()=>(1950),
    (...v)=>(redn$1(67591,1,...v)),
    ()=>(1954),
    (...v)=>(redn$1(69639,1,...v)),
    (...v)=>(redv$1(68615,R1_statement_list4701_group_list,1,0,...v)),
    (...v)=>(redn$1(70663,1,...v)),
    (...v)=>(rednv$1(60431,fn$1.lexical,3,0,...v)),
    (...v)=>(rednv$1(63499,fn$1.binding,2,0,...v)),
    (...v)=>(redv$1(112655,R0_case_block,3,0,...v)),
    (...v)=>(redn$1(114699,2,...v)),
    (...v)=>(redv$1(113675,R0_element_list,2,0,...v)),
    (...v)=>(redv$1(112655,R3_case_block,3,0,...v)),
    ()=>(1970),
    (...v)=>(rednv$1(115723,fn$1.spread_expr,2,0,...v)),
    (...v)=>(redv$1(104463,R3_case_block,3,0,...v)),
    ()=>(1986),
    (...v)=>(rednv$1(110603,fn$1.binding,2,0,...v)),
    (...v)=>(rednv$1(106507,fn$1.spread_expr,2,0,...v)),
    ()=>(2006),
    ()=>(2010),
    ()=>(2014),
    (...v)=>(rednv$1(99347,fn$1.call_expr,4,0,...v)),
    (...v)=>(redv$1(101391,R3_case_block,3,0,...v)),
    ()=>(2018),
    ()=>(2026),
    (...v)=>(rednv$1(102411,fn$1.spread_expr,2,0,...v)),
    (...v)=>(rednv$1(95251,fn$1.member,4,0,...v)),
    (...v)=>(redv$1(134163,R3_case_block,4,0,...v)),
    (...v)=>(redv$1(134163,R0_cover_parenthesized_expression_and_arrow_parameter_list,4,0,...v)),
    (...v)=>(rednv$1(96275,fn$1.supper_expr,4,0,...v)),
    ()=>(2038),
    (...v)=>(redn$1(72711,1,...v)),
    (...v)=>(redv$1(58383,R0_variable_declaration_list,3,0,...v)),
    (...v)=>(redv$1(111627,R3_case_block,2,0,...v)),
    (...v)=>(redn$1(136207,3,...v)),
    ()=>(2046),
    (...v)=>(redn$1(138251,2,...v)),
    (...v)=>(redn$1(144395,2,...v)),
    ()=>(2058),
    (...v)=>(redn$1(137231,3,...v)),
    (...v)=>(redn$1(141323,2,...v)),
    ()=>(2062),
    (...v)=>(redn$1(145419,2,...v)),
    (...v)=>(redn$1(143371,2,...v)),
    ()=>(2094),
    ()=>(2098),
    ()=>(2106),
    ()=>(2110),
    ()=>(2114),
    ()=>(2118),
    (...v)=>(redn$1(37895,1,...v)),
    ()=>(2122),
    ()=>(2130),
    (...v)=>(redn$1(36875,2,...v)),
    ()=>(2150),
    ()=>(2166),
    ()=>(2174),
    (...v)=>(redv$1(52243,R2_try_statement,4,0,...v)),
    (...v)=>(rednv$1(54283,fn$1.finally_stmt,2,0,...v)),
    ()=>(2194),
    (...v)=>(redv$1(82959,R2_class_tail,3,0,...v)),
    (...v)=>(redv$1(82959,R1_class_tail,3,0,...v)),
    (...v)=>(redv$1(86027,R0_class_element_list,2,0,...v)),
    (...v)=>(redv$1(87051,R0_class_element,2,0,...v)),
    ()=>(2198),
    (...v)=>(redv$1(67595,R0_javascript,2,0,...v)),
    ()=>(2210),
    (...v)=>(redv$1(62479,R0_variable_declaration_list,3,0,...v)),
    (...v)=>(rednv$1(118807,fn$1.condition_expr,5,0,...v)),
    (...v)=>(redv$1(112659,R3_case_block,4,0,...v)),
    (...v)=>(redv$1(113679,R0_formal_parameters,3,0,...v)),
    (...v)=>(redv$1(104467,R3_case_block,4,0,...v)),
    (...v)=>(redv$1(105487,R0_formal_parameters,3,0,...v)),
    (...v)=>(rednv$1(106511,fn$1.property_binding,3,0,...v)),
    ()=>(2218),
    (...v)=>(redn$1(66567,1,...v)),
    ()=>(2222),
    (...v)=>(redv$1(109583,R3_case_block,3,0,...v)),
    (...v)=>(redv$1(101395,R3_case_block,4,0,...v)),
    (...v)=>(redv$1(102415,R0_formal_parameters,3,0,...v)),
    ()=>(2238),
    ()=>(2242),
    (...v)=>(redv$1(75791,R3_case_block,3,0,...v)),
    ()=>(2246),
    (...v)=>(redn$1(136211,4,...v)),
    (...v)=>(redn$1(139279,3,...v)),
    (...v)=>(redn$1(142351,3,...v)),
    (...v)=>(redn$1(137235,4,...v)),
    ()=>(2250),
    ()=>(2258),
    (...v)=>(redn$1(140303,3,...v)),
    (...v)=>(rednv$1(34839,fn$1.if_stmt,5,0,...v)),
    ()=>(2262),
    ()=>(2266),
    (...v)=>(rednv$1(35863,fn$1.while_stmt,5,0,...v)),
    ()=>(2270),
    ()=>(2278),
    ()=>(2286),
    ()=>(2298),
    ()=>(2314),
    ()=>(2318),
    ()=>(2326),
    ()=>(2330),
    ()=>(2334),
    ()=>(2338),
    ()=>(2346),
    (...v)=>(rednv$1(44055,fn$1.switch_stmt,5,0,...v)),
    ()=>(2354),
    ()=>(2374),
    ()=>(2370),
    (...v)=>(rednv$1(43031,fn$1.with_stmt,5,0,...v)),
    ()=>(2378),
    (...v)=>(redn$1(55303,1,...v)),
    (...v)=>(redv$1(82963,R0_class_tail,4,0,...v)),
    (...v)=>((redn$1(71683,0,...v))),
    (...v)=>(redv$1(67599,R0_formal_parameters,3,0,...v)),
    (...v)=>(redv$1(68623,R0_formal_parameters,3,0,...v)),
    ()=>(2390),
    (...v)=>(redv$1(113683,R0_formal_parameters,4,0,...v)),
    ()=>(2394),
    ()=>(2398),
    ()=>(2402),
    (...v)=>(redn$1(89095,1,...v)),
    (...v)=>(redv$1(102419,R0_argument_list,4,0,...v)),
    (...v)=>(redv$1(134171,R1_cover_parenthesized_expression_and_arrow_parameter_list,6,0,...v)),
    (...v)=>(redn$1(136215,5,...v)),
    (...v)=>(redn$1(137239,5,...v)),
    ()=>(2406),
    ()=>(2414),
    ()=>(2422),
    ()=>(2426),
    ()=>(2434),
    (...v)=>(redv$1(35867,R8_iteration_statement,6,0,...v)),
    ()=>(2442),
    ()=>(2450),
    ()=>(2454),
    ()=>(2458),
    ()=>(2462),
    (...v)=>(redv$1(35867,R15_iteration_statement,6,0,...v)),
    ()=>(2490),
    ()=>(2498),
    (...v)=>(redv$1(45067,R0_case_block,2,0,...v)),
    ()=>(2506),
    ()=>(2518),
    (...v)=>(redv$1(46087,R1_statement_list4701_group_list,1,0,...v)),
    (...v)=>(redv$1(48135,R1_default_clause,1,0,...v)),
    ()=>(2526),
    ()=>(2534),
    (...v)=>(redn$1(71687,1,...v)),
    ()=>(2550),
    (...v)=>(redn$1(137243,6,...v)),
    (...v)=>(rednv$1(34847,fn$1.if_stmt,7,0,...v)),
    (...v)=>(rednv$1(35871,fn$1.do_while_stmt,7,0,...v)),
    (...v)=>(shftf$1(2554,I2_iteration_statement,...v)),
    (...v)=>(redv$1(35871,R7_iteration_statement,7,0,...v)),
    (...v)=>(redv$1(35871,R6_iteration_statement,7,0,...v)),
    ()=>(2574),
    ()=>(2578),
    (...v)=>(redv$1(35871,R13_iteration_statement,7,0,...v)),
    (...v)=>(redv$1(35871,R14_iteration_statement,7,0,...v)),
    (...v)=>(redv$1(35871,R16_iteration_statement,7,0,...v)),
    (...v)=>(redv$1(35871,R18_iteration_statement,7,0,...v)),
    ()=>(2602),
    ()=>(2614),
    (...v)=>(redv$1(45071,R3_case_block,3,0,...v)),
    (...v)=>(redv$1(46091,R0_case_clauses,2,0,...v)),
    ()=>(2618),
    ()=>(2622),
    (...v)=>(rednv$1(53271,fn$1.catch_stmt,5,0,...v)),
    (...v)=>(redv$1(65567,R0_function_declaration,7,0,...v)),
    ()=>(2630),
    ()=>(2634),
    ()=>(2638),
    (...v)=>(redv$1(35875,R5_iteration_statement,8,0,...v)),
    (...v)=>(redv$1(35875,R4_iteration_statement,8,0,...v)),
    (...v)=>(redv$1(35875,R3_iteration_statement,8,0,...v)),
    ()=>(2650),
    (...v)=>(redv$1(35875,R12_iteration_statement,8,0,...v)),
    (...v)=>(redv$1(35875,R17_iteration_statement,8,0,...v)),
    (...v)=>(redv$1(35875,R18_iteration_statement,8,0,...v)),
    (...v)=>(redv$1(35875,R0_iteration_statement,8,0,...v)),
    (...v)=>(redv$1(35875,R19_iteration_statement,8,0,...v)),
    ()=>(2666),
    (...v)=>(redv$1(45075,R2_case_block,4,0,...v)),
    (...v)=>(redv$1(47119,R1_case_clause,3,0,...v)),
    (...v)=>(redv$1(48143,R0_default_clause,3,0,...v)),
    (...v)=>(redv$1(65571,R1_function_declaration,8,0,...v)),
    (...v)=>(rednv$1(88095,fn$1.class_method,7,0,...v)),
    (...v)=>(rednv$1(88095,fn$1.class_get_method,7,0,...v)),
    ()=>(2674),
    (...v)=>(redv$1(35879,R0_iteration_statement,9,0,...v)),
    (...v)=>(redv$1(35879,R10_iteration_statement,9,0,...v)),
    (...v)=>(redv$1(35879,R11_iteration_statement,9,0,...v)),
    (...v)=>(redv$1(35879,R20_iteration_statement,9,0,...v)),
    (...v)=>(redv$1(45079,R1_case_block,5,0,...v)),
    (...v)=>(redv$1(47123,R0_case_clause,4,0,...v)),
    (...v)=>(rednv$1(88099,fn$1.class_set_method,8,0,...v)),
    (...v)=>(redv$1(35883,R9_iteration_statement,10,0,...v))],

        //Goto Lookup Functions
        goto$1 = [v=>lsm$1(v,gt0$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt1$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt2$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt3$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt4$1),
    v=>lsm$1(v,gt5$1),
    v=>lsm$1(v,gt6$1),
    v=>lsm$1(v,gt7$1),
    v=>lsm$1(v,gt8$1),
    v=>lsm$1(v,gt9$1),
    v=>lsm$1(v,gt10$1),
    nf$1,
    v=>lsm$1(v,gt11$1),
    v=>lsm$1(v,gt12$1),
    nf$1,
    v=>lsm$1(v,gt13$1),
    v=>lsm$1(v,gt14$1),
    v=>lsm$1(v,gt15$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt16$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt17$1),
    v=>lsm$1(v,gt18$1),
    nf$1,
    v=>lsm$1(v,gt19$1),
    v=>lsm$1(v,gt20$1),
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt21$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt22$1),
    v=>lsm$1(v,gt23$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt24$1),
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt25$1),
    v=>lsm$1(v,gt26$1),
    v=>lsm$1(v,gt27$1),
    nf$1,
    v=>lsm$1(v,gt28$1),
    v=>lsm$1(v,gt29$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt30$1),
    nf$1,
    v=>lsm$1(v,gt31$1),
    v=>lsm$1(v,gt32$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt33$1),
    v=>lsm$1(v,gt34$1),
    v=>lsm$1(v,gt35$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt36$1),
    v=>lsm$1(v,gt37$1),
    v=>lsm$1(v,gt38$1),
    v=>lsm$1(v,gt39$1),
    v=>lsm$1(v,gt40$1),
    v=>lsm$1(v,gt41$1),
    v=>lsm$1(v,gt42$1),
    v=>lsm$1(v,gt43$1),
    v=>lsm$1(v,gt44$1),
    v=>lsm$1(v,gt45$1),
    v=>lsm$1(v,gt46$1),
    v=>lsm$1(v,gt47$1),
    v=>lsm$1(v,gt48$1),
    v=>lsm$1(v,gt49$1),
    v=>lsm$1(v,gt50$1),
    v=>lsm$1(v,gt51$1),
    v=>lsm$1(v,gt52$1),
    v=>lsm$1(v,gt53$1),
    v=>lsm$1(v,gt54$1),
    v=>lsm$1(v,gt55$1),
    v=>lsm$1(v,gt56$1),
    v=>lsm$1(v,gt57$1),
    v=>lsm$1(v,gt58$1),
    v=>lsm$1(v,gt59$1),
    v=>lsm$1(v,gt60$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt61$1),
    v=>lsm$1(v,gt62$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt63$1),
    nf$1,
    v=>lsm$1(v,gt64$1),
    v=>lsm$1(v,gt65$1),
    v=>lsm$1(v,gt66$1),
    v=>lsm$1(v,gt67$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt68$1),
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt69$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt70$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt71$1),
    nf$1,
    v=>lsm$1(v,gt72$1),
    v=>lsm$1(v,gt73$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt74$1),
    nf$1,
    v=>lsm$1(v,gt75$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt76$1),
    v=>lsm$1(v,gt77$1),
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt78$1),
    v=>lsm$1(v,gt79$1),
    v=>lsm$1(v,gt80$1),
    nf$1,
    v=>lsm$1(v,gt81$1),
    v=>lsm$1(v,gt82$1),
    nf$1,
    v=>lsm$1(v,gt83$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt84$1),
    nf$1,
    v=>lsm$1(v,gt85$1),
    nf$1,
    v=>lsm$1(v,gt86$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt87$1),
    v=>lsm$1(v,gt88$1),
    v=>lsm$1(v,gt89$1),
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt90$1),
    v=>lsm$1(v,gt91$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt92$1),
    v=>lsm$1(v,gt93$1),
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt94$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt95$1),
    nf$1,
    v=>lsm$1(v,gt96$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt97$1),
    v=>lsm$1(v,gt98$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt99$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt100$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt101$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt102$1),
    nf$1,
    v=>lsm$1(v,gt103$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt104$1),
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt105$1),
    nf$1,
    v=>lsm$1(v,gt106$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt107$1),
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt108$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt109$1),
    v=>lsm$1(v,gt110$1),
    v=>lsm$1(v,gt111$1),
    v=>lsm$1(v,gt3$1),
    nf$1,
    v=>lsm$1(v,gt112$1),
    v=>lsm$1(v,gt113$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt114$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt115$1),
    nf$1,
    v=>lsm$1(v,gt116$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt117$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt118$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt119$1),
    nf$1,
    v=>lsm$1(v,gt120$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt121$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt122$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt123$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt124$1),
    v=>lsm$1(v,gt125$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt126$1),
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt127$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt128$1),
    nf$1,
    v=>lsm$1(v,gt129$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt130$1),
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt131$1),
    v=>lsm$1(v,gt132$1),
    v=>lsm$1(v,gt133$1),
    v=>lsm$1(v,gt134$1),
    nf$1,
    v=>lsm$1(v,gt135$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt76$1),
    v=>lsm$1(v,gt77$1),
    nf$1,
    v=>lsm$1(v,gt136$1),
    v=>lsm$1(v,gt137$1),
    v=>lsm$1(v,gt138$1),
    v=>lsm$1(v,gt139$1),
    v=>lsm$1(v,gt140$1),
    nf$1,
    v=>lsm$1(v,gt90$1),
    v=>lsm$1(v,gt91$1),
    nf$1,
    v=>lsm$1(v,gt141$1),
    nf$1,
    v=>lsm$1(v,gt142$1),
    v=>lsm$1(v,gt143$1),
    v=>lsm$1(v,gt144$1),
    nf$1,
    v=>lsm$1(v,gt145$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt146$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt147$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt148$1),
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt149$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt150$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt151$1),
    v=>lsm$1(v,gt152$1),
    nf$1,
    v=>lsm$1(v,gt153$1),
    v=>lsm$1(v,gt154$1),
    v=>lsm$1(v,gt155$1),
    v=>lsm$1(v,gt156$1),
    v=>lsm$1(v,gt157$1),
    nf$1,
    v=>lsm$1(v,gt158$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt159$1),
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt160$1),
    nf$1,
    v=>lsm$1(v,gt161$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt162$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt163$1),
    nf$1,
    v=>lsm$1(v,gt164$1),
    nf$1,
    v=>lsm$1(v,gt165$1),
    nf$1,
    v=>lsm$1(v,gt166$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt167$1),
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt168$1),
    v=>lsm$1(v,gt169$1),
    nf$1,
    v=>lsm$1(v,gt170$1),
    v=>lsm$1(v,gt171$1),
    v=>lsm$1(v,gt172$1),
    v=>lsm$1(v,gt173$1),
    nf$1,
    v=>lsm$1(v,gt174$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt175$1),
    v=>lsm$1(v,gt176$1),
    nf$1,
    v=>lsm$1(v,gt177$1),
    nf$1,
    v=>lsm$1(v,gt178$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt179$1),
    v=>lsm$1(v,gt180$1),
    v=>lsm$1(v,gt181$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt182$1),
    v=>lsm$1(v,gt183$1),
    nf$1,
    v=>lsm$1(v,gt184$1),
    nf$1,
    v=>lsm$1(v,gt185$1),
    nf$1,
    v=>lsm$1(v,gt186$1),
    v=>lsm$1(v,gt187$1),
    v=>lsm$1(v,gt188$1),
    v=>lsm$1(v,gt189$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt190$1),
    nf$1,
    v=>lsm$1(v,gt191$1),
    v=>lsm$1(v,gt192$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt193$1),
    nf$1,
    nf$1,
    v=>lsm$1(v,gt194$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt195$1),
    v=>lsm$1(v,gt196$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt197$1),
    v=>lsm$1(v,gt198$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt199$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt200$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    v=>lsm$1(v,gt201$1),
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1,
    nf$1];

    function getToken$1(l, SYM_LU) {
        if (l.END) return 0; /*6*/

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

    function parser$1(l, e = {}) {
        
        fn$1 = e.functions;

        l.IWS = false;
        l.PARSE_STRING = true;

        if (symbols$1.length > 0) {
            symbols$1.forEach(s => { l.addSymbol(s); });
            l.tl = 0;
            l.next();
        }

        const o = [],
            ss = [0, 0];

        let time = 1000000,
            RECOVERING = 100,
            tk = getToken$1(l, lu$1),
            p = l.copy(),
            sp = 1,
            len = 0,
            off = 0;

        outer:

            while (time-- > 0) {

                const fn = lsm$1(tk, state$1[ss[sp]]) || 0;

                /*@*/// console.log({end:l.END, state:ss[sp], tx:l.tx, ty:l.ty, tk:tk, rev:rlu.get(tk), s_map:state[ss[sp]], res:lsm(tk, state[ss[sp]])});

                let r,
                    gt = -1;

                if (fn == 0) {
                    /*Ignore the token*/
                    l.next();
                    tk = getToken$1(l, lu$1);
                    continue;
                }

                if (fn > 0) {
                    r = state_funct$1[fn - 1](tk, e, o, l, ss[sp - 1]);
                } else {
                    if (RECOVERING > 1 && !l.END) {
                        if (tk !== lu$1.get(l.ty)) {
                            //console.log("ABLE", rlu.get(tk), l.tx, tk )
                            tk = lu$1.get(l.ty);
                            continue;
                        }

                        if (tk !== 13) {
                            //console.log("MABLE")
                            tk = 13;
                            RECOVERING = 1;
                            continue;
                        }
                    }

                    tk = getToken$1(l, lu$1);

                    const recovery_token = eh$1[ss[sp]](tk, e, o, l, p, ss[sp], lu$1);

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

                        if (tk == "$eof")
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
                        tk = getToken$1(l, lu$1);
                        RECOVERING++;
                        break;

                    case 3:
                        /* REDUCE */

                        len = (r & 0x3FC) >> 1;

                        ss.length -= len;
                        sp -= len;
                        gt = goto$1[ss[sp]](r >> 10);

                        if (gt < 0)
                            l.throw("Invalid state reached!");

                        ss.push(off, gt);
                        sp += 2;
                        break;
                }
            }
        return o[0];
    };

    const env = {
        table: {},
        ASI: true,
        functions: {

            //JS
            add,
            and: _and,
            array_literal,
            arrow,
            assign,
            binding,
            block,
            bool_literal: bool$1,
            call_expr,
            catch_stmt,
            condition_expr: condition,
            debugger_stmt,  
            div,
            eq: equal,
            exp,
            expr_stmt,
            expression_list,
            for_stmt,
            funct_decl,
            gt: greater,
            gteq: greater_eq,
            identifier: id,
            if_stmt,
            lexical,
            lt: less,
            lteq: less_eq,
            member: mem,
            mult,
            negate_expr: negate,
            null_literal: null_,
            numeric_literal: number$2,
            object,
            or: _or,
            post_dec_expr: post_dec,
            post_inc_expr: post_inc,
            property_binding,
            unary_not_expr:node,
            new_member_stmt: mem$1,
            spread_expr:node$1,
            return_stmt: return_stmt,
            stmts,
            string_literal: string$2,
            sub,
            this_expr,
            try_stmt,
            while_stmt: function(sym) {
                this.bool = sym[1];
                this.body = sym[3];
            },
            var_stmt: function(sym) { this.declarations = sym[1]; },
            mod_expr: function(sym) {
                this.le = sym[0];
                this.re = sym[2];
                this.ty = "MOD";
            },
            seq_expr: function(sym) {
                this.le = sym[0];
                this.re = sym[2];
                this.ty = "STRICT_EQ";
            },
            neq_expr: function(sym) {
                this.le = sym[0];
                this.re = sym[2];
                this.ty = "NEQ";
            },
            sneq_expr: function(sym) {
                this.le = sym[0];
                this.re = sym[2];
                this.ty = "STRICT_NEQ";
            },
            unary_plus: function(sym) {
                this.expr = sym[1];
                this.ty = "PRE INCR";
            },
            unary_minus: function(sym) {
                this.expr = sym[1];
                this.ty = "PRE INCR";
            },
            pre_inc_expr: function(sym) {
                this.expr = sym[1];
                this.ty = "PRE INCR";
            },
            pre_dec_expr: function(sym) {
                this.expr = sym[1];
                this.ty = "PRE DEC";
            },

            label_stmt: function(sym) {
                this.label = sym[0];
                this.stmt = sym[1];
            },

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

        options: {
            integrate: false,
            onstart: () => {
                env.table = {};
                env.ASI = true;
            }
        }
    };

    function parse(string){
    	return parser$1(whind$1(string), env);
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

    class ElementNode {

        constructor(env, tag = "", children = [], attribs = [], presets) {

            if (children)
                for (const child of children)
                    child.parent = this;

            this.SINGLE = false;
            this.MERGED = false;

            this.presets = presets;
            this.tag = tag;
            this.attribs = attribs || [];
            this.children = children || [];
            this.proxied = null;
            this.slots = null;

            this.component = this.getAttrib("component").value;

            if (this.component)
                presets.components[this.component] = this;

            this.url = this.getAttribute("url") ? URL.resolveRelative(this.getAttribute("url")) : null;
            this.id = this.getAttribute("id");
            this.class = this.getAttribute("id");
            this.name = this.getAttribute("name");
            this.slot = this.getAttribute("slot");
            this.pinned = (this.getAttribute("pin")) ? this.getAttribute("pin") + "$" : "";


            //Prepare attributes with data from this element
            for (const attrib of this.attribs)
                attrib.link(this);

            if (this.url)
                this.loadURL(env);

            return this;
        }

        // Traverse the contructed AST and apply any necessary transforms. 
        finalize(slots_in = {}) {


            if (this.slot) {

                if (!this.proxied_mount)
                    this.proxied_mount = this.mount.bind(this);

                //if(!slots_in[this.slot])
                slots_in[this.slot] = this.proxied_mount;

                this.mount = () => {};
            }

            for (let i = 0; i < this.children.length; i++) {
                const child = this.children[i];
                this.children[i] = child.finalize(slots_in);
            }

            const slots_out = Object.assign({}, slots_in);

            if (this.presets.components[this.tag])
                this.proxied = this.presets.components[this.tag].merge(this);

            if (this.proxied) {
                let ele = this.proxied.finalize(slots_out);
                ele.slots = slots_out;
                this.mount = ele.mount.bind(ele);
            }

            this.children.sort(function(a,b){
                if(a.tag == "script" && b.tag !== "script")
                    return 1;
                if(a.tag !== "script" && b.tag == "script")
                    return -1;
                return 0;
            });

            return this;
        }

        getAttribute(name) {
            return this.getAttrib(name).value;
        }

        getAttrib(name) {
            for (const attrib of this.attribs) {
                if (attrib.name === name)
                    return attrib;
            }

            return { name: "", value: "" }
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
            return this.children.map(e=>e.toString()).join("");
        }

        /****************************************** COMPONENTIZATION *****************************************/


        async loadURL(env) {

            try {
                const own_env = new CompilerEnvironment(env.presets, env);
                own_env.setParent(env);

                const txt_data = await this.url.fetchText();

                own_env.pending++;

                const ast = parser(whind$1(txt_data), own_env);

                this.proxied = ast.merge(this);

                own_env.resolve();

            } catch (err) {
                console.error(err);
            }
        }

        merge(node, merged_node = new this.constructor(null, this.tag, null, null, this.presets)) {

            merged_node.line = this.line;
            merged_node.char = this.char;
            merged_node.offset = this.offset;
            merged_node.single = this.single;
            merged_node.url = this.url;
            merged_node.tag = this.tag;
            merged_node.children = (node.children || this.children) ? [...node.children, ...this.children] : [];
            merged_node.css = this.css;
            merged_node.HAS_TAPS = this.HAS_TAPS;
            merged_node.MERGED = true;
            merged_node._badge_name_ = node._badge_name_;
            merged_node.presets = this.presets;
            merged_node.par = node.par;

            if (this.tap_list)
                merged_node.tap_list = this.tap_list.map(e => Object.assign({}, e));

            merged_node.attribs = merged_node.attribs.concat(this.attribs, node.attribs);

            merged_node.statics = node.statics;

            return merged_node;
        }

        /******************************************* BUILD ****************************************************/

        mount(element, scope, presets = this.presets, slots = {}, pinned = {}) {

            if (this.slots)
                slots = Object.assign({}, slots, this.slots);

            const own_element = this.createElement(scope);
            if (element) appendChild(element, own_element);

            if(this.pinned){
                pinned[this.pinned] = own_element;
            }

            if (!scope)
                scope = new Scope(null, presets || this.__presets__ || this.presets, own_element, this);

            //if (this.HAS_TAPS)
                //taps = scope.linkTaps(this.tap_list);

            if (!scope.ele) scope.ele = own_element;

            if (this._badge_name_)
                scope.badges[this._badge_name_] = own_element;

            for (let i = 0, l = this.attribs.length; i < l; i++)
                this.attribs[i].bind(own_element, scope, pinned);

            for (let i = 0; i < this.children.length; i++) {
                const node = this.children[i];
                node.mount(own_element, scope, presets, slots, pinned);
            }

            return scope;
        }
    }

    //Node that allows the combination of two sets of children from separate nodes that are merged together
    class MergerNode {
        constructor(...children_arrays) {
            this.c = [];

            for (let i = 0, l = children_arrays.length; i < l; i++)
                if (Array.isArray(children_arrays))
                    this.c = this.c.concat(children_arrays[i]);
        }

        mount(element, scope, presets, statics, pinned) {
            for (let i = 0, l = this.c.length; i < l; i++) {
                if (this.c[i].SLOTED == true) continue;
                this.c[i].build(element, scope, presets, statics, pinned);
            }

            return scope;
        }

        linkCSS() {}

        toString(off = 0) {
            return `${("    ").repeat(off)}${this.binding}\n`;
        }
    }

    const env$1 = {};
    var JS = {

    	processType(type, ast, fn){
    		for(const a of ast.traverseDepthFirst()){
    			if(a.type == type)
    				fn(a);
    		}
    	},

    	getFirst(ast, type){
    		const tvrs = ast.traverseDepthFirst(); let node = null;

    		while((node = tvrs.next().value)){
    			if(node.type == type){
    				return node;
    			}
    		}

    		return null;
    	},
    	
    	getClosureVariableNames(ast, ...global_objects){
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
                    if (node.root && !non_global.has(node.name)){
                        globals.add(node.name);
                    }else{
                    	non_global.add(node.name);
                    }
                }

                if (
                    node.type == types.lex ||
                    node.type == types.var
                ) {
                    node.bindings.forEach(b => (non_global.add(b.id.name), globals.delete(b.id.name)));
                }

                node = tvrs.next().value;
            }

            return [...globals.values()].reduce((red, out) => {
                if (window[out] || out == "this") 
                	//Skip anything already defined on the global object. 
                    return red;

                red.push(out);
                return red;
            }, [])
    	},

    	//Returns the argument names of the first function declaration defined in the ast
    	getFunctionDeclarationArgumentNames(ast){
    		const tvrs = ast.traverseDepthFirst(); let node = null;

    		while((node = tvrs.next().value)){
    			if(node.type == types.function_declaration){
    				return node.args.map(e=>e.name);
    			}
    		}
    		return [];
    	},
    	parse(lex){
    		let l = lex.copy();

    		return JSParser(lex, env$1);
    	},

    	validate(lex){
    		let l = lex.copy();

    		console.log(l.slice());
    		try{
    			let result = JSParser(lex, env$1);
    			console.log(result);
    			return true;
    		}catch(e){
    			console.error(e);
    			return false;
    		}
    	},

    	getRootVariables(lex){
    		let l = lex.copy();
    		
    		let ids = new Set();
    		let closure = new Set();

    		try{
    			let result = JSParser(lex, env$1);

    			if(result instanceof id){
    				ids.add(result.val);
    			}else
    				result.getRootIds(ids, closure);

    			return {ids, ast:result, SUCCESS : true}
    		}catch(e){
    			return {ids, ast:null, SUCCESS : false};
    		}
    	},

    	types : types
    };

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
     * Used to call the Scheduler after a JavaScript runtime tick.
     *
     * Depending on the platform, caller will either map to requestAnimationFrame or it will be a setTimout.
     */
     
    const caller$1 = (typeof(window) == "object" && window.requestAnimationFrame) ? window.requestAnimationFrame : (f) => {
        setTimeout(f, 1);
    };

    const perf$1 = (typeof(performance) == "undefined") ? { now: () => Date.now() } : performance;


    /**
     * Handles updating objects. It does this by splitting up update cycles, to respect the browser event model. 
     *    
     * If any object is scheduled to be updated, it will be blocked from scheduling more updates until the next ES VM tick.
     */
    class Spark$1 {
        /**
         * Constructs the object.
         */
        constructor() {

            this.update_queue_a = [];
            this.update_queue_b = [];

            this.update_queue = this.update_queue_a;

            this.queue_switch = 0;

            this.callback = ()=>{};


            if(typeof(window) !== "undefined"){
                window.addEventListener("load",()=>{
                    this.callback = () => this.update();
                    caller$1(this.callback);
                });
            }else{
                this.callback = () => this.update();
            }


            this.frame_time = perf$1.now();

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
                    return caller$1(this.callback);
            }

            object._SCHD_ = ((timestart & 0xFFFF) | ((timeend) << 16));

            this.update_queue.push(object);

            if (this._SCHD_)
                return;

            this.frame_time = perf$1.now() | 0;


            if(!this.SCHEDULE_PENDING){
                this.SCHEDULE_PENDING = true;
                caller$1(this.callback);
            }
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
            const time = perf$1.now() | 0;
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

    const spark$1 = new Spark$1();

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

    const A$1 = 65;
    const a$1 = 97;
    const ACKNOWLEDGE$1 = 6;
    const AMPERSAND$1 = 38;
    const ASTERISK$1 = 42;
    const AT$1 = 64;
    const B$1 = 66;
    const b$1 = 98;
    const BACKSLASH$1 = 92;
    const BACKSPACE$1 = 8;
    const BELL$1 = 7;
    const C$1 = 67;
    const c$1 = 99;
    const CANCEL$1 = 24;
    const CARET$1 = 94;
    const CARRIAGE_RETURN$1 = 13;
    const CLOSE_CURLY$1 = 125;
    const CLOSE_PARENTH$1 = 41;
    const CLOSE_SQUARE$1 = 93;
    const COLON$1 = 58;
    const COMMA$1 = 44;
    const d$1 = 100;
    const D$1 = 68;
    const DATA_LINK_ESCAPE$1 = 16;
    const DELETE$1 = 127;
    const DEVICE_CTRL_1$1 = 17;
    const DEVICE_CTRL_2$1 = 18;
    const DEVICE_CTRL_3$1 = 19;
    const DEVICE_CTRL_4$1 = 20;
    const DOLLAR$1 = 36;
    const DOUBLE_QUOTE$1 = 34;
    const e$4 = 101;
    const E$1 = 69;
    const EIGHT$1 = 56;
    const END_OF_MEDIUM$1 = 25;
    const END_OF_TRANSMISSION$1 = 4;
    const END_OF_TRANSMISSION_BLOCK$1 = 23;
    const END_OF_TXT$1 = 3;
    const ENQUIRY$1 = 5;
    const EQUAL$1 = 61;
    const ESCAPE$1 = 27;
    const EXCLAMATION$1 = 33;
    const f$1 = 102;
    const F$1 = 70;
    const FILE_SEPERATOR$1 = 28;
    const FIVE$1 = 53;
    const FORM_FEED$1 = 12;
    const FORWARD_SLASH$1 = 47;
    const FOUR$1 = 52;
    const g$1 = 103;
    const G$1 = 71;
    const GRAVE$1 = 96;
    const GREATER_THAN$1 = 62;
    const GROUP_SEPERATOR$1 = 29;
    const h$1 = 104;
    const H$1 = 72;
    const HASH$1 = 35;
    const HORIZONTAL_TAB$1 = 9;
    const HYPHEN$1 = 45;
    const i$2 = 105;
    const I$1 = 73;
    const j$1 = 106;
    const J$1 = 74;
    const k$1 = 107;
    const K$1 = 75;
    const l$1 = 108;
    const L$1 = 76;
    const LESS_THAN$1 = 60;
    const LINE_FEED$1 = 10;
    const m$1 = 109;
    const M$1 = 77;
    const n$1 = 110;
    const N$1 = 78;
    const NEGATIVE_ACKNOWLEDGE$1 = 21;
    const NINE$1 = 57;
    const NULL$1 = 0;
    const o$1 = 111;
    const O$1 = 79;
    const ONE$1 = 49;
    const OPEN_CURLY$1 = 123;
    const OPEN_PARENTH$1 = 40;
    const OPEN_SQUARE$1 = 91;
    const p$1 = 112;
    const P$1 = 80;
    const PERCENT$1 = 37;
    const PERIOD$1 = 46;
    const PLUS$1 = 43;
    const q$1 = 113;
    const Q$1 = 81;
    const QMARK$1 = 63;
    const QUOTE$1 = 39;
    const r$1 = 114;
    const R$1 = 82;
    const RECORD_SEPERATOR$1 = 30;
    const s$1 = 115;
    const S$1 = 83;
    const SEMICOLON$1 = 59;
    const SEVEN$1 = 55;
    const SHIFT_IN$1 = 15;
    const SHIFT_OUT$1 = 14;
    const SIX$1 = 54;
    const SPACE$1 = 32;
    const START_OF_HEADER$1 = 1;
    const START_OF_TEXT$1 = 2;
    const SUBSTITUTE$1 = 26;
    const SYNCH_IDLE$1 = 22;
    const t$1 = 116;
    const T$1 = 84;
    const THREE$1 = 51;
    const TILDE$1 = 126;
    const TWO$1 = 50;
    const u$1 = 117;
    const U$1 = 85;
    const UNDER_SCORE$1 = 95;
    const UNIT_SEPERATOR$1 = 31;
    const v$1 = 118;
    const V$1 = 86;
    const VERTICAL_BAR$1 = 124;
    const VERTICAL_TAB$1 = 11;
    const w$1 = 119;
    const W$1 = 87;
    const x$1 = 120;
    const X$1 = 88;
    const y$1 = 121;
    const Y$1 = 89;
    const z$1 = 122;
    const Z$1 = 90;
    const ZERO$1 = 48;

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
    const jump_table$1 = [
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
    const number_and_identifier_table$1 = [
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

    const number$3 = 1,
        identifier$1 = 2,
        string$3 = 4,
        white_space$1 = 8,
        open_bracket$1 = 16,
        close_bracket$1 = 32,
        operator$2 = 64,
        symbol$1 = 128,
        new_line$1 = 256,
        data_link$1 = 512,
        alpha_numeric$1 = (identifier$1 | number$3),
        white_space_new_line$1 = (white_space$1 | new_line$1),
        Types$1 = {
            num: number$3,
            number: number$3,
            id: identifier$1,
            identifier: identifier$1,
            str: string$3,
            string: string$3,
            ws: white_space$1,
            white_space: white_space$1,
            ob: open_bracket$1,
            open_bracket: open_bracket$1,
            cb: close_bracket$1,
            close_bracket: close_bracket$1,
            op: operator$2,
            operator: operator$2,
            sym: symbol$1,
            symbol: symbol$1,
            nl: new_line$1,
            new_line: new_line$1,
            dl: data_link$1,
            data_link: data_link$1,
            alpha_numeric: alpha_numeric$1,
            white_space_new_line: white_space_new_line$1,
        },

        /*** MASKS ***/

        TYPE_MASK$1 = 0xF,
        PARSE_STRING_MASK$1 = 0x10,
        IGNORE_WHITESPACE_MASK$1 = 0x20,
        CHARACTERS_ONLY_MASK$1 = 0x40,
        TOKEN_LENGTH_MASK$1 = 0xFFFFFF80,

        //De Bruijn Sequence for finding index of right most bit set.
        //http://supertech.csail.mit.edu/papers/debruijn.pdf
        debruijnLUT$1 = [
            0, 1, 28, 2, 29, 14, 24, 3, 30, 22, 20, 15, 25, 17, 4, 8,
            31, 27, 13, 23, 21, 19, 16, 7, 26, 12, 18, 6, 11, 5, 10, 9
        ];

    const  getNumbrOfTrailingZeroBitsFromPowerOf2$1 = (value) => debruijnLUT$1[(value * 0x077CB531) >>> 27];

    class Lexer$1 {

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
        copy(destination = new Lexer$1(this.str, false, true)) {
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

            if (marker instanceof Lexer$1) {
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
                t = thick_line.repeat(line_fill + 48),
                is_iws = (!this.IWS) ? "\n The Lexer produced whitespace tokens" : "";
            const pk = this.copy();
            pk.IWS = false;
            while (!pk.END && pk.ty !== Types$1.nl) { pk.next(); }
            const end = (pk.END) ? this.str.length : pk.off ;

        //console.log(`"${this.str.slice(this.off-this.char+((this.line > 0) ? 2 :2), end).split("").map((e,i,s)=>e.charCodeAt(0))}"`)
        let v = "", length = 0;
        v = this.str.slice(this.off-this.char+((this.line > 0) ? 2 :1), end);
        length = this.char;
        return `${message} at ${this.line}:${this.char}
${t}
${line_number+v}
${line.repeat(length+line_fill-((this.line > 0) ? 2 :1))+arrow}
${t}
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
            const l = marker.sl,
                str = marker.str,
                IWS = marker.IWS;

            let length = marker.tl,
                off = marker.off + length,
                type = symbol$1,
                line = marker.line,
                base = off,
                char = marker.char,
                root = marker.off;

            if (off >= l) {
                length = 0;
                base = l;
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
                    m;
                let i = 0;

                while (code == 32 && IWS)
                    (code = str.charCodeAt(++off2), off++);

                while ((m = map.get(code))) {
                    map = m;
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

                        switch (jump_table$1[code]) {
                            case 0: //NUMBER
                                while (++off < l && (12 & number_and_identifier_table$1[str.charCodeAt(off)]));

                                if ((str[off] == "e" || str[off] == "E") && (12 & number_and_identifier_table$1[str.charCodeAt(off + 1)])) {
                                    off++;
                                    if (str[off] == "-") off++;
                                    marker.off = off;
                                    marker.tl = 0;
                                    marker.next();
                                    off = marker.off + marker.tl;
                                    //Add e to the number string
                                }

                                type = number$3;
                                length = off - base;

                                break;
                            case 1: //IDENTIFIER
                                while (++off < l && ((10 & number_and_identifier_table$1[str.charCodeAt(off)])));
                                type = identifier$1;
                                length = off - base;
                                break;
                            case 2: //QUOTED STRING
                                if (this.PARSE_STRING) {
                                    type = symbol$1;
                                } else {
                                    while (++off < l && str.charCodeAt(off) !== code);
                                    type = string$3;
                                    length = off - base + 1;
                                }
                                break;
                            case 3: //SPACE SET
                                while (++off < l && str.charCodeAt(off) === SPACE$1);
                                type = white_space$1;
                                length = off - base;
                                break;
                            case 4: //TAB SET
                                while (++off < l && str[off] === HORIZONTAL_TAB$1);
                                type = white_space$1;
                                length = off - base;
                                break;
                            case 5: //CARIAGE RETURN
                                length = 2;
                            case 6: //LINEFEED
                                //Intentional
                                type = new_line$1;
                                line++;
                                base = off;
                                root = off;
                                off += length;
                                char = 0;
                                break;
                            case 7: //SYMBOL
                                type = symbol$1;
                                break;
                            case 8: //OPERATOR
                                type = operator$2;
                                break;
                            case 9: //OPEN BRACKET
                                type = open_bracket$1;
                                break;
                            case 10: //CLOSE BRACKET
                                type = close_bracket$1;
                                break;
                            case 11: //Data Link Escape
                                type = data_link$1;
                                length = 4; //Stores two UTF16 values and a data link sentinel
                                break;
                        }
                    }else{
                        break;
                    }

                    if (IWS && (type & white_space_new_line$1)) {
                        if (off < l) {
                            type = symbol$1;
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
            marker.tl = (this.masked_values & CHARACTERS_ONLY_MASK$1) ? Math.min(1, length) : length;
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
                    this.p = new Lexer$1(this.str, false, true);
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

            if (start instanceof Lexer$1) start = start.off;

            return this.str.slice(start, (this.off <= start) ? this.sl : this.off);
        }

        /**
         * Skips to the end of a comment section.
         * @param {boolean} ASSERT - If set to true, will through an error if there is not a comment line or block to skip.
         * @param {Lexer} [marker=this] - If another Lexer is passed into this method, it will advance the token state of that Lexer.
         */
        comment(ASSERT = false, marker = this) {

            if (!(marker instanceof Lexer$1)) return marker;

            if (marker.ch == "/") {
                if (marker.pk.ch == "*") {
                    marker.sync();
                    while (!marker.END && (marker.next().ch != "*" || marker.pk.ch != "/")) { /* NO OP */ }
                    marker.sync().assert("/");
                } else if (marker.pk.ch == "/") {
                    const IWS = marker.IWS;
                    while (marker.next().ty != Types$1.new_line && !marker.END) { /* NO OP */ }
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
                const c = jump_table$1[lex.string.charCodeAt(lex.off)];

                if (c > 2 && c < 7) {

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
                const c = jump_table$1[lex.string.charCodeAt(lex.sl - 1)];

                if (c > 2 && c < 7) {
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
                let m = map.get(code);
                if (!m) {
                    m = map.set(code, new Map).get(code);
                }
                map = m;
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

        set string_length(s) {}

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
        set END(v) {}

        get type() {
            return 1 << (this.masked_values & TYPE_MASK$1);
        }

        set type(value) {
            //assuming power of 2 value.
            this.masked_values = (this.masked_values & ~TYPE_MASK$1) | ((getNumbrOfTrailingZeroBitsFromPowerOf2$1(value)) & TYPE_MASK$1);
        }

        get tl() {
            return this.token_length;
        }

        set tl(value) {
            this.token_length = value;
        }

        get token_length() {
            return ((this.masked_values & TOKEN_LENGTH_MASK$1) >> 7);
        }

        set token_length(value) {
            this.masked_values = (this.masked_values & ~TOKEN_LENGTH_MASK$1) | (((value << 7) | 0) & TOKEN_LENGTH_MASK$1);
        }

        get IGNORE_WHITE_SPACE() {
            return this.IWS;
        }

        set IGNORE_WHITE_SPACE(bool) {
            this.iws = !!bool;
        }

        get CHARACTERS_ONLY() {
            return !!(this.masked_values & CHARACTERS_ONLY_MASK$1);
        }

        set CHARACTERS_ONLY(boolean) {
            this.masked_values = (this.masked_values & ~CHARACTERS_ONLY_MASK$1) | ((boolean | 0) << 6);
        }

        get IWS() {
            return !!(this.masked_values & IGNORE_WHITESPACE_MASK$1);
        }

        set IWS(boolean) {
            this.masked_values = (this.masked_values & ~IGNORE_WHITESPACE_MASK$1) | ((boolean | 0) << 5);
        }

        get PARSE_STRING() {
            return !!(this.masked_values & PARSE_STRING_MASK$1);
        }

        set PARSE_STRING(boolean) {
            this.masked_values = (this.masked_values & ~PARSE_STRING_MASK$1) | ((boolean | 0) << 4);
        }

        /**
         * Reference to token id types.
         */
        get types() {
            return Types$1;
        }
    }

    Lexer$1.prototype.addCharacter = Lexer$1.prototype.addSymbol;

    function whind$2(string, INCLUDE_WHITE_SPACE_TOKENS = false) { return new Lexer$1(string, INCLUDE_WHITE_SPACE_TOKENS) }

    whind$2.constructor = Lexer$1;

    Lexer$1.types = Types$1;
    whind$2.types = Types$1;

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

        constructor(r, g, b, a) {
            super(r, g, b, a);

            if (typeof(r) == "string")
                this.set(CSS_Color._fs_(r) || {r:255,g:255,b:255,a:0});

        }

        static parse(l, rule, r) {

            let c = CSS_Color._fs_(l);

            if (c) {
                l.next();

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
                l = whind$2(l);

            let out = { r: 0, g: 0, b: 0, a: 1 };

            switch (l.ch) {
                case "#":
                    var value = l.next().tx;
                    let num = parseInt(value,16);
                    
                    out = { r: 0, g: 0, b: 0, a: 1 };
                    if(value.length == 3){
                        out.r = (num >> 8) & 0xF;
                        out.g = (num >> 4) & 0xF;
                        out.b = (num) & 0xF;
                    }else{
                        if(value.length == 6){
                            out.r = (num >> 16) & 0xFF;
                            out.g = (num >> 8) & 0xFF;
                            out.b = (num) & 0xFF;
                        }if(value.length == 8){
                            out.r = (num >> 24) & 0xFF;
                            out.g = (num >> 16) & 0xFF;
                            out.b = (num >> 8) & 0xFF;
                            out.a = ((num) & 0xFF);
                        }
                    }
                    l.next();
                    break;
                case "r":
                    let tx = l.tx;
                    if (tx == "rgba") {
                        out = { r: 0, g: 0, b: 0, a: 1 };
                        l.next(); // (
                        out.r = parseInt(l.next().tx);
                        l.next(); // ,
                        out.g = parseInt(l.next().tx);
                        l.next(); // ,
                        out.b = parseInt(l.next().tx);
                        l.next(); // ,
                        out.a = parseFloat(l.next().tx);
                        l.next();
                        c = new CSS_Color();
                        c.set(out);
                        return c;
                    } else if (tx == "rgb") {
                        out = { r: 0, g: 0, b: 0, a: 1 };
                        l.next(); // (
                        out.r = parseInt(l.next().tx);
                        l.next(); // ,
                        out.g = parseInt(l.next().tx);
                        l.next(); // ,
                        out.b = parseInt(l.next().tx);
                        l.next();
                        c = new CSS_Color();
                        c.set(out);
                        return c;
                    } // intentional
                default:
                    let string = l.tx;

                    if (l.ty == l.types.str)
                        string = string.slice(1, -1);

                    out = CSS_Color.colors[string.toLowerCase()];
            }

            return out;
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

        constructor(v) {

            if (typeof(v) == "string") {
                let lex = whind(v);
                let val = CSS_Percentage.parse(lex);
                if (val) 
                    return val;
            }
            
            super(v);
        }

        static _verify_(l) {
            if(typeof(l) == "string" &&  !isNaN(parseInt(l)) && l.includes("%"))
                return true;
            return false;
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

    class CSS_Length extends Number {
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
                if (l.p.ty == l.types.id) {
                    let id = l.sync().tx;
                    l.next();
                    return new CSS_Length(parseFloat(tx) * mult, id);
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
                let lex = whind$2(v);
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

    const uri_reg_ex$1 = /(?:([^\:\?\[\]\@\/\#\b\s][^\:\?\[\]\@\/\#\b\s]*)(?:\:\/\/))?(?:([^\:\?\[\]\@\/\#\b\s][^\:\?\[\]\@\/\#\b\s]*)(?:\:([^\:\?\[\]\@\/\#\b\s]*)?)?\@)?(?:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|((?:\[[0-9a-f]{1,4})+(?:\:[0-9a-f]{0,4}){2,7}\])|([^\:\?\[\]\@\/\#\b\s\.]{2,}(?:\.[^\:\?\[\]\@\/\#\b\s]*)*))?(?:\:(\d+))?((?:[^\?\[\]\#\s\b]*)+)?(?:\?([^\[\]\#\s\b]*))?(?:\#([^\#\s\b]*))?/i;

    const STOCK_LOCATION$1 = {
        protocol: "",
        host: "",
        port: "",
        path: "",
        hash: "",
        query: "",
        search: ""
    };
    function fetchLocalText$1(URL, m = "same-origin") {
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

    function fetchLocalJSON$1(URL, m = "same-origin") {
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

    function submitForm$1(URL, form_data, m = "same-origin") {
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

    function submitJSON$1(URL, json_data, m = "same-origin") {
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
    class URL$1 {

        static resolveRelative(URL_or_url_new, URL_or_url_original = document.location.toString(), ) {

            let URL_old = (URL_or_url_original instanceof URL$1) ? URL_or_url_original : new URL$1(URL_or_url_original);
            let URL_new = (URL_or_url_new instanceof URL$1) ? URL_or_url_new : new URL$1(URL_or_url_new);
            
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


            let location = (typeof(document) !== "undefined") ? document.location : STOCK_LOCATION$1;

            if (typeof(Location) !== "undefined" && url instanceof Location) {
                location = url;
                url = "";
                IS_LOCATION = true;
            }
            if (!url || typeof(url) != "string") {
                IS_STRING = false;
                IS_LOCATION = true;
                if (URL$1.GLOBAL && USE_LOCATION)
                    return URL$1.GLOBAL;
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
                if (url instanceof URL$1) {
                    this.protocol = url.protocol;
                    this.user = url.user;
                    this.pwd = url.pwd;
                    this.host = url.host;
                    this.port = url.port;
                    this.path = url.path;
                    this.query = url.query;
                    this.hash = url.hash;
                } else {
                    let part = url.match(uri_reg_ex$1);

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
                    URL$1.G = this;
                    return URL$1.R;
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

            let lex = whind$2(this.query);


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

            return new URL$1(this);
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

                if (URL$1.G == this)
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

                let resource = URL$1.RC.get(this.path);

                if (resource)
                    return new Promise((res) => {
                        res(resource);
                    });
            }

            return fetchLocalText$1(this.path).then(res => (URL$1.RC.set(this.path, res), res));
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

                let resource = URL$1.RC.get(string_url);

                if (resource)
                    return new Promise((res) => {
                        res(resource);
                    });
            }

            return fetchLocalJSON$1(string_url).then(res => (URL$1.RC.set(this.path, res), res));
        }

        /**
         * Cache a local resource at the value 
         * @param    {object}  resource  The resource to store at this URL path value.
         * @returns {boolean} `true` if a resource was already cached for this URL, false otherwise.
         */
        cacheResource(resource) {

            let occupied = URL$1.RC.has(this.path);

            URL$1.RC.set(this.path, resource);

            return occupied;
        }

        submitForm(form_data) {
            return submitForm$1(this.toString(), form_data);
        }

        submitJSON(json_data, mode) {
            return submitJSON$1(this.toString(), json_data, mode);
        }
        /**
         * Goes to the current URL.
         */
        goto() {
            return;
            let url = this.toString();
            history.pushState({}, "ignored title", url);
            window.onpopstate();
            URL$1.G = this;
        }
        //Returns the last segment of the path
        get file(){
            return this.path.split("/").pop();
        }


        //Returns the all but the last segment of the path
        get dir(){
            return this.path.split("/").slice(0,-1).join("/") || "/";
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
    }

    /**
     * The fetched resource cache.
     */
    URL$1.RC = new Map();

    /**
     * The Default Global URL object. 
     */
    URL$1.G = null;

    /**
     * The Global object Proxy.
     */
    URL$1.R = {
        get protocol() {
            return URL$1.G.protocol;
        },
        set protocol(v) {
            return;
            URL$1.G.protocol = v;
        },
        get user() {
            return URL$1.G.user;
        },
        set user(v) {
            return;
            URL$1.G.user = v;
        },
        get pwd() {
            return URL$1.G.pwd;
        },
        set pwd(v) {
            return;
            URL$1.G.pwd = v;
        },
        get host() {
            return URL$1.G.host;
        },
        set host(v) {
            return;
            URL$1.G.host = v;
        },
        get port() {
            return URL$1.G.port;
        },
        set port(v) {
            return;
            URL$1.G.port = v;
        },
        get path() {
            return URL$1.G.path;
        },
        set path(v) {
            return;
            URL$1.G.path = v;
        },
        get query() {
            return URL$1.G.query;
        },
        set query(v) {
            return;
            URL$1.G.query = v;
        },
        get hash() {
            return URL$1.G.hash;
        },
        set hash(v) {
            return;
            URL$1.G.hash = v;
        },
        get map() {
            return URL$1.G.map;
        },
        set map(v) {
            return;
            URL$1.G.map = v;
        },
        setPath(path) {
            return URL$1.G.setPath(path);
        },
        setLocation() {
            return URL$1.G.setLocation();
        },
        toString() {
            return URL$1.G.toString();
        },
        getData(class_name = "") {
            return URL$1.G.getData(class_name = "");
        },
        setData(class_name = "", data = null) {
            return URL$1.G.setData(class_name, data);
        },
        fetchText(ALLOW_CACHE = true) {
            return URL$1.G.fetchText(ALLOW_CACHE);
        },
        cacheResource(resource) {
            return URL$1.G.cacheResource(resource);
        }
    };


    /** Implement Basic Fetch Mechanism for NodeJS **/
    if (typeof(fetch) == "undefined" && typeof(global) !== "undefined") {
        (async () => {
            console.log("Moonshot");
            
            global.fetch = (url, data) =>
                new Promise(async (res, rej) => {
                    let p = await path.resolve(process.cwd(), (url[0] == ".") ? url + "" : "." + url);
                    try {
                        let data = await fs.readFile(p, "utf8");
                        return res({
                            status: 200,
                            text: () => {
                                return {
                                    then: (f) => f(data)
                                }
                            }
                        })
                    } catch (err) {
                        return rej(err);
                    }
                });
        })();
    }


    let SIMDATA$1 = null;

    /* Replaces the fetch actions with functions that simulate network fetches. Resources are added by the user to a Map object. */
    URL$1.simulate = function(){
        SIMDATA$1 = new Map;
        URL$1.prototype.fetchText = async d => ((d = this.toString()), SIMDATA$1.get(d)) ? SIMDATA$1.get(d) : "" ;
        URL$1.prototype.fetchJSON = async d => ((d = this.toString()), SIMDATA$1.get(d)) ? JSON.parse(SIMDATA$1.get(d).toString()) : {} ;
    };

    //Allows simulated resources to be added as a key value pair, were the key is a URI string and the value is string data.
    URL$1.addResource = (n,v) => (n && v && (SIMDATA$1 || (SIMDATA$1 = new Map())) && SIMDATA$1.set(n.toString(), v.toString));

    URL$1.polyfill = function() {    if (typeof(global) !== "undefined") {
        console.log("AAAAAAAAAAAAAAAAAAAAAA");
            const fs = (import('fs')).promises;
            const path = (import('path'));


            global.Location =  (class extends URL$1{});
            
            global.document = global.document || {};

            global.document.location = new URL$1(process.env.PWD);
            /**
             * Global `fetch` polyfill - basic support
             */
            global.fetch = (url, data) =>
                new Promise((res, rej) => {
                    let p = path.resolve(process.cwd(), (url[0] == ".") ? url + "" : "." + url);
                    fs.readFile(p, "utf8", (err, data) => {
                        if (err) {
                            rej(err);
                        } else {
                            res({
                                status: 200,
                                text: () => {
                                    return {
                                        then: (f) => f(data)
                                    }
                                }
                            });
                        }
                    });
                });
        }
    };

    Object.freeze(URL$1.R);
    Object.freeze(URL$1.RC);
    Object.seal(URL$1);

    class CSS_URL extends URL$1 {
        static parse(l, rule, r) {
            if (l.tx == "url" || l.tx == "uri") {
                l.next().a("(");
                let v = "";
                if (l.ty == l.types.str) {
                    v = l.tx.slice(1,-1);
                    l.next().a(")");
                } else {
                    let p = l.p;
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
        static parse(l, rule, r) {
            if (l.ty == l.types.str) {
                let tx = l.tx;
                l.next();
                return new CSS_String(tx);
            }
            return null;
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
            if (l.tx == "inset" || l.tx == "circle" || l.tx == "ellipse" || l.tx == "polygon") {
                l.next().a("(");
                let v = "";
                if (l.ty == l.types.str) {
                    v = l.tx.slice(1,-1);
                    l.next().a(")");
                } else {
                    let p = l.p;
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
        static parse(l, rule, r) {
            let tx = l.tx;
            if(l.ty == l.types.num){
                l.next();
                return new CSS_Number(tx);
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
        var lex = whind$2(string);
        
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
            if (px) {
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

    /**
     * CSS Type constructors
     * @alias module:wick~internals.css.types.
     * @enum {object}
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
        //https://www.w3.org/TR/2018/REC-css-color-3-20180619//
        
        color: `<color>`,

        opacity: `<alphavalue>|inherit`,


        /*https://www.w3.org/TR/css-backgrounds-3/*/
        /* Background */
        background_color: `<color>`,
        background_image: `<bg_image>#`,
        background_repeat: `<repeat_style>#`,
        background_attachment: `scroll|fixed|local`,
        background_position: `[<percentage>|<length>]{1,2}|[top|center|bottom]||[left|center|right]`,
        background_clip: `<box>#`,
        background_origin: `<box>#`,
        background_size: `<bg_size>#`,
        background: `<bg_layer>#,<final_bg_layer>`,

        /* Font https://www.w3.org/TR/css-fonts-4*/
        font_family: `[[<family_name>|<generic_family>],]*[<family_name>|<generic_family>]`,
        family_name: `<id>||<string>`,
        generic_name: `serif|sans_serif|cursive|fantasy|monospace`,
        font: `[<font_style>||<font_variant>||<font_weight>]?<font_size>[/<line_height>]?<font_family>`,
        font_variant: `normal|small_caps`,
        font_style: `normal | italic | oblique <angle>?`,
        font_kerning: ` auto | normal | none`,
        font_variant_ligatures:`normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values> ]`,
        font_variant_position:`normal|sub|super`,
        font_variant_caps:`normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps`,


        /*CSS Clipping https://www.w3.org/TR/css-masking-1/#clipping `normal|italic|oblique`, */
        font_size: `<absolute_size>|<relative_size>|<length>|<percentage>`,
        absolute_size: `xx_small|x_small|small|medium|large|x_large|xx_large`,
        relative_size: `larger|smaller`,
        font_wight: `normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900`,

        /* Text */
        word_spacing: `normal|<length>`,
        letter_spacing: `normal|<length>`,
        text_decoration: `none|[underline||overline||line-through||blink]`,
        text_transform: `capitalize|uppercase|lowercase|none`,
        text_align: `left|right|center|justify`,
        text_indent: `<length>|<percentage>`,


        /* Border  https://www.w3.org/TR/css-backgrounds-3 */
        border_color: `<color>{1,4}`,
        border_top_color: `<color>`,
        border_right_color: `<color>`,
        border_bottom_color: `<color>`,
        border_left_color: `<color>`,

        border_width: `<line_width>{1,4}`,
        border_top_width: `<line_width>`,
        border_right_width: `<line_width>`,
        border_bottom_width: `<line_width>`,
        border_left_width: `<line_width>`,

        border_style: `<line_style>{1,4}`,
        border_top_style: `<line_style>`,
        border_right_style: `<line_style>`,
        border_bottom_style: `<line_style>`,
        border_left_style: `<line_style>`,

        border_top: `<line_width>||<line_style>||<color>`,
        border_right: `<line_width>||<line_style>||<color>`,
        border_bottom: `<line_width>||<line_style>||<color>`,
        border_left: `<line_width>||<line_style>||<color>`,

        border_radius: `<length_percentage>{1,4}[/<length_percentage>{1,4}]?`,
        border_top_left_radius: `<length_percentage>{1,2}`,
        border_top_right_radius: `<length_percentage>{1,2}`,
        border_bottom_right_radius: `<length_percentage>{1,2}`,
        border_bottom_left_radius: `<length_percentage>{1,2}`,

        border_image: `<border_image_source>||<border_image_slice>[/<border_image_width>|/<border_image_width>?/<border_image_outset>]?||<border_image_repeat>`,
        border_image_source: `none|<image>`,
        border_image_slice: `[<number>|<percentage>]{1,4}&&fill?`,
        border_image_width: `[<length_percentage>|<number>|auto]{1,4}`,
        border_image_outset: `[<length>|<number>]{1,4}`,
        border_image_repeat: `[stretch|repeat|round|space]{1,2}`,

        box_shadow: `none|<shadow>#`,

        border: `<line_width>||<line_style>||<color>`,

        width: `<length>|<percentage>|auto|inherit`,
        height: `<length>|<percentage>|auto|inherit`,
        float: `left|right|none`,
        clear: `left|right|both`,

        /* Classification */

        display: `[ <display_outside> || <display_inside> ] | <display_listitem> | <display_internal> | <display_box> | <display_legacy>`,
        white_space: `normal|pre|nowrap`,
        list_style_type: `disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-latin|upper-latin|armenian|georgian|lower-alpha|upper-alpha|none|inherit`,
        list_style_image: `<url>|none`,
        list_style_position: `inside|outside`,
        list_style: `[disc|circle|square|decimal|lower-roman|upper-roman|lower-alpha|upper-alpha|none]||[inside|outside]||[<url>|none]`,
        vertical_align: `baseline|sub|super|top|text-top|middle|bottom|text-bottom|<percentage>|<length>|inherit`,

        /* Layout https://www.w3.org/TR/css-position-3 */ 
        position: "static|relative|absolute|sticky|fixed",
        top: `<length>|<percentage>|auto|inherit`,
        left: `<length>|<percentage>|auto|inherit`,
        bottom: `<length>|<percentage>|auto|inherit`,
        right: `<length>|<percentage>|auto|inherit`,

        
        /* Box Model https://www.w3.org/TR/css-box-3 */
        margin: `[<length>|<percentage>|0|auto]{1,4}`,
        margin_top: `<length>|<percentage>|0|auto`,
        margin_right: `<length>|<percentage>|0|auto`,
        margin_bottom: `<length>|<percentage>|0|auto`,
        margin_left: `<length>|<percentage>|0|auto`,

        padding: `[<length>|<percentage>|0|auto]{1,4}`,
        padding_top: `<length>|<percentage>|0|auto`,
        padding_right: `<length>|<percentage>|0|auto`,
        padding_bottom: `<length>|<percentage>|0|auto`,
        padding_left: `<length>|<percentage>|0|auto`,

        min_width: `<length>|<percentage>|inherit`,
        max_width: `<length>|<percentage>|none|inherit`,
        min_height: `<length>|<percentage>|inherit`,
        max_height: `<length>|<percentage>|none|inherit`,
        line_height: `normal|<number>|<length>|<percentage>|inherit`,
        overflow: 'visible|hidden|scroll|auto|inherit',

        /* Flex Box https://www.w3.org/TR/css-flexbox-1/ */
        align_items: `flex-start | flex-end | center | baseline | stretch`,
        align_self: `auto | flex-start | flex-end | center | baseline | stretch`,
        align_content: `flex-start | flex-end | center | space-between | space-around | stretch`,
        flex_direction:`row | row-reverse | column | column-reverse`,
        flex_flow:`<flex-direction>||<flex-wrap>`,
        flex_wrap:`nowrap|wrap|wrap-reverse`,
        order:`<integer>`,
        flex:`none|[<flex-grow> <flex-shrink>?||<flex-basis>]`,
        flex_grow:`<number>`,
        flex_shrink:`<number>`,
        flex_basis:`content|<width>`,
        width:`<length>|<percentage>|auto|inherit`,

        box_sizing: `content-box | border-box`,

        /* Visual Effects */
        clip: '<shape>|auto|inherit',
        visibility: `visible|hidden|collapse|inherit`,
        content: `normal|none|[<string>|<uri>|<counter>|attr(<identifier>)|open-quote|close-quote|no-open-quote|no-close-quote]+|inherit`,
        quotas: `[<string><string>]+|none|inherit`,
        counter_reset: `[<identifier><integer>?]+|none|inherit`,
        counter_increment: `[<identifier><integer>?]+|none|inherit`,

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

        /* https://drafts.csswg.org/css-transitions-1/ */

        transition: `<single_transition>#`,
        transition_property: `none|<single_transition_property>#`,
        transition_duration: `<time>#`,
        transition_timing_function: `<timing_function>#`,
        transition_delay: `<time>#`,

        
        /* https://www.w3.org/TR/SVG11/interact.html#PointerEventsProperty */
        pointer_events : `visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|none|inherit|auto`,
    };

    /* Properties that are not directly accessible by CSS prop creator */

    const virtual_property_definitions = {


        alphavalue: '<number>',

        box: `border-box|padding-box|content-box`,

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
        display_listitem : `<display-outside>? && [ flow | flow-root ]? && list-item`,
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
                let lex = whind$2(string);
                while (!lex.END)
                    root.parseProperty(lex, this.r, property_definitions);
            }
        }

    }

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
        }

        addProperty(prop, rule) {
            if (prop)
                this.props[prop.name] = prop.value;
        }

        toString(off = 0) {
            let str = [],
                offset = ("    ").repeat(off);

            for (let a in this.props) {
                if (this.props[a] !== null) {
                    if (Array.isArray(this.props[a]))
                        str.push(offset, a.replace(/\_/g, "-"), ":", this.props[a].join(" "), ";\n");
                    else
                        str.push(offset, a.replace(/\_/g, "-"), ":", this.props[a].toString(), ";\n");
                }
            }

            return str.join(""); //JSON.stringify(this.props).replace(/\"/g, "").replace(/\_/g, "-");
        }

        merge(rule) {
            if (rule.props) {
                for (let n in rule.props)
                    this.props[n] = rule.props[n];
                this.LOADED = true;
            }
        }

        get _wick_type_() { return 0; }

        set _wick_type_(v) {}
    }

    /**
     * wick internals.
     * @class      NR (name)
     */
    class NR { //Notation Rule

        constructor() {

            this.r = [NaN, NaN];
            this._terms_ = [];
            this._prop_ = null;
            this._virtual_ = false;
        }

        sp(value, rule) { //Set Property
            if (this._prop_){
                if (value)
                    if (Array.isArray(value) && value.length === 1 && Array.isArray(value[0]))
                        rule[this._prop_] = value[0];
                    else
                        rule[this._prop_] = value;
            }
        }

        isRepeating() {
            return !(isNaN(this.r[0]) && isNaN(this.r[1]));
        }

        parse(lx, rule, out_val) {
            if (typeof(lx) == "string")
                lx = whind$2(lx);

            let r = out_val || { v: null },
                start = isNaN(this.r[0]) ? 1 : this.r[0],
                end = isNaN(this.r[1]) ? 1 : this.r[1];

            return this.___(lx, rule, out_val, r, start, end);
        }

        ___(lx, rule, out_val, r, start, end) {
            let bool = true;
            for (let j = 0; j < end && !lx.END; j++) {

                for (let i = 0, l = this._terms_.length; i < l; i++) {
                    bool = this._terms_[i].parse(lx, rule, r);
                    if (!bool) break;
                }

                if (!bool) {

                    this.sp(r.v, rule);

                    if (j < start)
                        return false;
                    else
                        return true;
                }
            }

            this.sp(r.v, rule);

            return true;
        }
    }

    class AND extends NR {
        ___(lx, rule, out_val, r, start, end) {

            outer:
                for (let j = 0; j < end && !lx.END; j++) {
                    for (let i = 0, l = this._terms_.length; i < l; i++)
                        if (!this._terms_[i].parse(lx, rule, r)) return false;
                }

            this.sp(r.v, rule);

            return true;
        }
    }

    class OR extends NR {
        ___(lx, rule, out_val, r, start, end) {
            let bool = false;

            for (let j = 0; j < end && !lx.END; j++) {
                bool = false;

                for (let i = 0, l = this._terms_.length; i < l; i++)
                    if (this._terms_[i].parse(lx, rule, r)) bool = true;

                if (!bool && j < start) {
                    this.sp(r.v, rule);
                    return false;
                }
            }

            this.sp(r.v, rule);

            return true;
        }
    }

    class ONE_OF extends NR {
        ___(lx, rule, out_val, r, start, end) {
            let bool = false;

            for (let j = 0; j < end && !lx.END; j++) {
                bool = false;

                for (let i = 0, l = this._terms_.length; i < l; i++) {
                    bool = this._terms_[i].parse(lx, rule, r);
                    if (bool) break;
                }

                if (!bool)
                    if (j < start) {
                        this.sp(r.v, rule);
                        return false;
                    }
            }

            this.sp(r.v, rule);

            return bool;
        }
    }

    class ValueTerm {

        constructor(value, getPropertyParser, definitions) {

            this._value_ = null;

            const IS_VIRTUAL = { is: false };

            if (!(this._value_ = types$1[value]))
                this._value_ = getPropertyParser(value, IS_VIRTUAL, definitions);

            this._prop_ = "";

            if (!this._value_)
                return new LiteralTerm(value);

            if (this._value_ instanceof NR && IS_VIRTUAL.is)
                this._virtual_ = true;
        }

        parse(l, rule, r) {
            if (typeof(l) == "string")
                l = whind$2(l);

            let rn = { v: null };

            let v = this._value_.parse(l, rule, rn);

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

        parse(l, rule, r) {

            if (typeof(l) == "string")
                l = whind$2(l);

            let v = l.tx;
            if (v == this._value_) {
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

                if (this._prop_)
                    rule[this._prop_] = v;

                return true;
            }
            return false;
        }
    }

    class SymbolTerm extends LiteralTerm {
        parse(l, rule, r) {
            if (typeof(l) == "string")
                l = whind$2(l);

            if (l.tx == this._value_) {
                l.next();
                return true;
            }

            return false;
        }
    };

    function getPropertyParser(property_name, IS_VIRTUAL = { is: false }, definitions = null) {

        let prop = definitions[property_name];

        if (prop) {

            if (typeof(prop) == "string")
                prop = definitions[property_name] = CreatePropertyParser(prop, property_name, definitions);

            return prop;
        }

        prop = virtual_property_definitions[property_name];

        if (prop) {

            IS_VIRTUAL.is = true;

            if (typeof(prop) == "string")
                prop = virtual_property_definitions[property_name] = CreatePropertyParser(prop, "", definitions);

            return prop;
        }

        return null;
    }


    function CreatePropertyParser(notation, name, definitions) {

        const l = whind$2(notation);

        const important = { is: false };

        let n = d$2(l, definitions);

        if (n instanceof NR && n._terms_.length == 1)
            n = n._terms_[0];

        n._prop_ = name;
        n.IMP = important.is;

        return n;
    }

    function d$2(l, definitions, super_term = false, group = false, need_group = false, and_group = false, important = null) {
        let term, nt;

        while (!l.END) {
            switch (l.ch) {
                case "]":
                    if (term) return term;
                    else 
                        throw new Error("Expected to have term before \"]\"");
                case "[":
                    if (term) return term;
                    term = d$2(l.next(), definitions);
                    l.a("]");
                    break;
                case "&":
                    if (l.pk.ch == "&") {
                        if (and_group)
                            return term;

                        nt = new AND();

                        nt._terms_.push(term);

                        l.sync().next();

                        while (!l.END) {
                            nt._terms_.push(d$2(l, definitions, super_term, group, need_group, true, important));
                            if (l.ch !== "&" || l.pk.ch !== "&") break;
                            l.a("&").a("&");
                        }

                        return nt;
                    }
                case "|":
                    {
                        if (l.pk.ch == "|") {

                            if (need_group)
                                return term;

                            nt = new OR();

                            nt._terms_.push(term);

                            l.sync().next();

                            while (!l.END) {
                                nt._terms_.push(d$2(l, definitions, super_term, group, true, and_group, important));
                                if (l.ch !== "|" || l.pk.ch !== "|") break;
                                l.a("|").a("|");
                            }

                            return nt;

                        } else {
                            if (group) {
                                return term;
                            }

                            nt = new ONE_OF();

                            nt._terms_.push(term);

                            l.next();

                            while (!l.END) {
                                nt._terms_.push(d$2(l, definitions, super_term, true, need_group, and_group, important));
                                if (l.ch !== "|") break;
                                l.a("|");
                            }

                            return nt;
                        }
                    }
                    break;
                case "{":
                    term = _Jux_(term);
                    term.r[0] = parseInt(l.next().tx);
                    if (l.next().ch == ",") {
                        l.next();
                        if (l.next().ch == "}")
                            term.r[1] = Infinity;
                        else {
                            term.r[1] = parseInt(l.tx);
                            l.next();
                        }
                    } else
                        term.r[1] = term.r[0];
                    l.a("}");
                    if (super_term) return term;
                    break;
                case "*":
                    term = _Jux_(term);
                    term.r[0] = 0;
                    term.r[1] = Infinity;
                    l.next();
                    if (super_term) return term;
                    break;
                case "+":
                    term = _Jux_(term);
                    term.r[0] = 1;
                    term.r[1] = Infinity;
                    l.next();
                    if (super_term) return term;
                    break;
                case "?":
                    term = _Jux_(term);
                    term.r[0] = 0;
                    term.r[1] = 1;
                    l.next();
                    if (super_term) return term;
                    break;
                case "#":
                    term = _Jux_(term);
                    term._terms_.push(new SymbolTerm(","));
                    term.r[0] = 1;
                    term.r[1] = Infinity;
                    l.next();
                    if (l.ch == "{") {
                        term.r[0] = parseInt(l.next().tx);
                        term.r[1] = parseInt(l.next().a(",").tx);
                        l.next().a("}");
                    }
                    if (super_term) return term;
                    break;
                case "<":
                    let v;

                    if (term) {
                        if (term instanceof NR && term.isRepeating()) term = _Jux_(new NR, term);
                        let v = d$2(l, definitions, true);
                        term = _Jux_(term, v);
                    } else {
                        let v = new ValueTerm(l.next().tx, getPropertyParser, definitions);
                        l.next().a(">");
                        term = v;
                    }
                    break;
                case "!":
                    /* https://www.w3.org/TR/CSS21/cascade.html#important-rules */

                    l.next().a("important");
                    important.is = true;
                    break;
                default:
                    if (term) {
                        if (term instanceof NR && term.isRepeating()) term = _Jux_(new NR, term);
                        let v = d$2(l, definitions, true);
                        term = _Jux_(term, v);
                    } else {
                        let v = (l.ty == l.types.symbol) ? new SymbolTerm(l.tx) : new LiteralTerm(l.tx);
                        l.next();
                        term = v;
                    }
            }
        }
        return term;
    }

    function _Jux_(term, new_term = null) {
        if (term) {
            if (!(term instanceof NR)) {
                let nr = new NR();
                nr._terms_.push(term);
                term = nr;
            }
            if (new_term) term._terms_.push(new_term);
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
            this.media_selector = null;
            /**
             * All selectors indexed by their value
             */
            this._selectors_ = {};
            /**
             * All selectors in order of appearance
             */
            this._sel_a_ = [];
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
                        let lex = whind$2(ss.v);
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
                };
            }

            return true;
        }

        /**
         * Retrieves the set of rules from all matching selectors for an element.
         * @param      {HTMLElement}  element - An element to retrieve CSS rules.
         * @public
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
                return this.parseProperty(lexer, rule, definitions);
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
                let selectors = [],
                    l = 0;
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
                                         * @todo Conform to CSS spec and only parse if @import is at the top of the CSS string.
                                         */
                                        return type.fetchText().then((str) =>
                                            //Successfully fetched content, proceed to parse in the current root.
                                            //let import_lexer = ;
                                            res(this.parse(whind$2(str), this).then((r) => this.parse(lexer, r)))
                                            //parse returns Promise. 
                                            // return;
                                        ).catch((e) => res(this.parse(lexer)));
                                    } else {
                                        //Failed to fetch resource, attempt to find the end to of the import clause.
                                        while (!lexer.END && lexer.next().tx !== ";") {};
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
                            let rule = new CSSRule(this);
                            this._applyProperties_(lexer.next(), rule);
                            for (let i = -1, sel = null; sel = selectors[++i];)
                                if (sel.r) sel.r.merge(rule);
                                else sel.r = rule;
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
            this.parse(whind$2(inCSSRuleBody + ""));
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
            let selector = this.parseSelector(whind$2(selector_value));

            if (selector)
                if (!this._selectors_[selector.id]) {
                    this._selectors_[selector.id] = selector;
                    this._sel_a_.push(selector);
                    selector.r = new CSSRule(this);
                } else
                    selector = this._selectors_[selector.id];

            return selector;
        }
    }

    LinkedList.mixinTree(CSSRuleBody);

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
            if (lex.sl > 0) {

                if (!root && root !== null) {
                    root = this;
                    this.pending_build++;
                }

                return this.fch.parse(lex, this).then(e => {
                    this._setREADY_();
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
    const CSSParser = (css_string, root = null) => (root = (!root || !(root instanceof CSSRootNode)) ? new CSSRootNode() : root, root.parse(whind$2(css_string)));

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
                        spark$1.queueUpdate(this);
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
                    spark$1.queueUpdate(this);
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
                        spark$1.queueUpdate(this);
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
                    spark$1.queueUpdate(this);
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
                        return spark$1.queueUpdate(this);
                } else {
                    if (this.time < this.duration)
                        return spark$1.queueUpdate(this);
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
        constructor(scope, errors, tap, script, id) {
            super(scope, errors, tap);
            this.ele = script;
            this.id = id;
            this.ACTIVE = false;
        }

        destroy() {
            this.id = null;
            super.destroy();
        }

        down(value) {
            this.ele.updateProp(this, value);
        }
    }


    //Function.apply(Function, [binding.arg_key || binding.tap_name, "event", "model", "emit", "presets", "static", "src", binding.val]);
    class ScriptIO extends IOBase {
        constructor(scope, errors, tap, script, lex, pinned) {

            const HAVE_CLOSURE = false;

            super(tap);

            this.scope = scope;
            this.TAP_BINDING_INDEX = script.args.reduce((r,a,i)=>(a.name == tap.name) ? i: r,0);
            this.ACTIVE_IOS = 0;
            this.IO_ACTIVATIONS = 0;
            
            this.function = null;
            
            this.HAVE_CLOSURE = HAVE_CLOSURE;
            if (this.HAVE_CLOSURE)
                this.function = script.function;
            else
                this.function = script.function.bind(scope);

            //Embedded emit functions
            const func_bound = this.emit.bind(this);
            func_bound.onTick = this.onTick.bind(this);

            //TODO: only needed if emit is called in function. Though highly probably. 
            this.arg_props = [];
            this.arg_ios = {};
            
            this.initProps(script.args, tap, errors, pinned);
            
            this.arg_props.push(new Proxy(func_bound, { set: (obj, name, value) => { obj(name, value); } }));
        }

        /*
            Removes all references to other objects.
            Calls destroy on any child objects.
         */
        destroy() {
            this.function = null;
            this.scope = null;
            this._bound_emit_function_ = null;
            this._meta = null;
            this.arg_props = null;
            this.props = null;

            for (const a of this.arg_ios)
                a.destroy();

            this.arg_ios = null;
        }

        initProps(arg_array, tap, errors, pinned){
            for(let i = 0; i < arg_array.length; i++){
                
                const a = arg_array[i];

                if(a.IS_ELEMENT){
                    
                    this.arg_props.push(pinned[a.name]);

                }else if(a.IS_TAPPED){

                    let val = null;
                    
                    const name = a.name;
                    
                    if(name == tap.name){
                        val = tap.prop;
                        this.TAP_BINDING_INDEX = i;
                    }
                    
                    this.ACTIVE_IOS++;
                    
                    this.arg_ios[name] = new argumentIO(this.scope, errors, this.scope.getTap(name), this, i);

                    this.arg_props.push(val);
                }else{
                    this.arg_props.push(a.val);
                }
            }
        }

        updateProp(io, val) {
            this.arg_props[io.id] = val;

            if (!io.ACTIVE) {
                io.ACTIVE = true;
                this.ACTIVE_IOS++;
            }
        }

        setValue(value) {
            if (typeof(value) == "object") {
                //Distribute iterable properties amongst the IO_Script's own props.
                for (const a in value) {
                    if (this.arg_ios[a])
                        this.arg_ios[a].down(value[a]);
                }
            } else {
                if (this.TAP_BINDING_INDEX !== -1)
                    this.arg_props[this.TAP_BINDING_INDEX] = value;
            }
        }

        down(value) {

            const src = this.scope;

            if (value)
                this.setValue(value);


            if (this.ACTIVE_IOS < this.IO_ACTIVATIONS)
                return

            try {

                if (this.HAVE_CLOSURE)
                    return this.function.apply(this, this.arg_props);
                else
                    return this.function.apply(this, this.arg_props);
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
        onTick(name) {
            spark.queueUpdate({
                _SCHD_: 0, // Meta value for spark;
                scheduledUpdate: (s, d) => this.emit(name, { step: s, diff: d })
            });
        }
    }

    //Cache for scripts that have already been built. Keys are the final strings of processed ASTs
    var FUNCTION_CACHE = new Map();

    const defaults = { glow: Animation };

    function GetOutGlobals(ast, presets) {

        return JS.getClosureVariableNames(ast).map(out => {
            const out_object = { name: out, val: null, IS_TAPPED: false, IS_ELEMENT : false};

            if (presets.custom[out])
                out_object.val = presets.custom[out];
            else if (presets[out])
                out_object.val = presets[out];
            else if (defaults[out])
                out_object.val = defaults[out];
            else if (out[out.length -1] == "$"){
                out_object.IS_ELEMENT = true;
                //out_object.name = out.slice(0,-1);
            } else {
                out_object.IS_TAPPED = true;
            }

            return out_object;
        });
    }

    function AddEmit(ast, presets, ignore) {
        JS.processType(types.assignment, ast, assign => {
            const k = assign.id.name;

            if (window[k] || presets.custom[k] || presets[k] || defaults[k] || ignore.includes(k))
                return;
            
            assign.connect.id.replace(new mem([new id(["emit"]), null, assign.id]));
        });
    }

    class scr extends ElementNode {
        
        constructor(env, tag, ast, attribs, presets) {
            super(env, "script", null, attribs, presets);
            this.function = null;
            this.args = null;
            this.ast = ast;
            this.READY = false;
            this.val = "";

            this.processJSAST(presets);

            this.on = this.getAttrib("on").value;
        }

        processJSAST(presets = { custom: {} }) {
            this.args = GetOutGlobals(this.ast, presets);
            AddEmit(this.ast, presets, this.args.map(a=>a.name));
            this.val = this.ast + "";
        }

        finalize() {
            if (!FUNCTION_CACHE.has(this.val)) {

                let func, HAVE_CLOSURE = false;

                const
                    args = this.args,
                    names = args.map(a => a.name);

                // For the injected emit function
                names.push("emit");

                try {
                    this.function = Function.apply(Function, names.concat([this.val]));
                    this.READY = true;
                    FUNCTION_CACHE.set(this.val, this.function);
                } catch (e) {
                    //errors.push(e);
                    //console.error(`Script error encountered in ${statics.url || "virtual file"}:${node.line+1}:${node.char}`)
                    console.warn(this.val);
                    console.error(e);
                }
            } else {
                this.function = FUNCTION_CACHE.get(this.val);
            }

            return this;
        }

        mount(element, scope, presets, slots, pinned) {
            if (this.READY) {
                const tap = this.on.bind(scope);
                new ScriptIO(scope, [], tap, this, {}, pinned);
            }
        }
    }

    class scp extends ElementNode{

    	constructor(env, tag, children, attribs, presets){
            
    		super(env, "scope", children, attribs, presets);

    		this.import = this.getAttrib("import").value;
    		this.export = this.getAttrib("export").value;
    		this.put = this.getAttrib("put").value;
    		this.model_name = this.getAttrib("model").value;
    		this.schema_name = this.getAttrib("schema").value;
            this.element = this.getAttrib("element").value;
    	}

        createElement() {
            return createElement(this.element || "div");
        }

    	mount(element, scope, presets = this.presets, slots = {}, pinned = {}){

            let me = new Scope(scope, presets, element, this);

            if(this.slots)
                slots = Object.assign({}, slots, this.slots);

            //Reset pinned
            pinned = {};

            if(this.pinned)
                pinned[this.pinned] = me.ele;
            

            me._model_name_ = this.model_name;
            me._schema_name_ = this.schema_name;

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
            }

            for (let i = 0, l = this.attribs.length; i < l; i++)
                this.attribs[i].bind(element, scope, pinned);

            for(let i = 0; i < this.children.length; i++){
                const node = this.children[i];
                node.mount(element, me, presets, slots, pinned);
            }

            return me;
    	}
    }

    class a$2 extends ElementNode{
    	constructor(env, tag, children, attribs, presets){
    		super(env, "a", children, attribs, presets);
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
            } else {

               // const offset_a = this.offset;

                //this.limitUpdate();

                //const offset_b = this.offset;

                //this.offset = offset_a;
                this.forceMount();
                this.arrange();
                //this.offset = offset_b;
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

            if (!this.SCRUBBING)
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

                const as = this.dom_scopes[i];

                if (as.index > j) {
                    while (j < as.index && j < output_length) {
                        const os = output[j];
                        os.index = -1;
                        trs_in.pos = getColumnRow(j, this.offset, this.shift_amount);

                        os.appendToDOM(this.ele, as.ele);
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
                            default:{
                                as.transitionOut(trs_out);
                            }
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

        /**
         * Filters stored Scopes with search terms and outputs the matching Scopes to the DOM.
         * 
         * @protected
         */
        filterUpdate() {

            let output = this.scopes.slice();

            if (output.length < 1) return;
            
            for (let i = 0, l = this.filters.length; i < l; i++) {
                const filter = this.filters[i];
                
                if(filter.ARRAY_ACTION)
                    output = filter.action(output);
            }

            this.activeScopes = output;
            
            this.UPDATE_FILTER = false;

            return output;
        }

        filterExpressionUpdate(transition = Animation.createTransition()) {
            // Filter the current components. 
            this.filterUpdate();

            this.limitExpressionUpdate(transition);
        }

        limitExpressionUpdate(transition = Animation.createTransition()){
            //Preset the positions of initial components. 
            this.arrange();

            this.render(transition);

            // If scrubbing is currently occuring, if the transition were to auto play then the results 
            // would interfere with the expected behavior of scrubbing. So the transition
            // is instead set to it's end state, and scrub is called to set intermittent 
            // position. 
            if (!this.SCRUBBING)
                transition.start();
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

                if (!this.SCRUBBING)
                    transition.start();

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
                }

                this.filterExpressionUpdate(transition);
            }
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

            this.filterExpressionUpdate(transition);
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

                //TODO: Make sure both of there references are removed when the scope is destroyed.
                this.scopes.push(scope);
                this.parent.addScope(scope);
            }


            if (OWN_TRANSITION) 
                this.filterExpressionUpdate(transition);
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

    class d$3 {
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
                d$3.web_component_constructor(this, bound_data_object), {}
            );
        }

        //Mounts component data to new HTMLElement object.
        async mount(HTMLElement_, bound_data_object) {

            if (this.READY !== true) {
                if (!this.__pending)
                    this.__pending = [];

                return new Promise(res =>this.__pending.push([HTMLElement_, bound_data_object, res]))
            }

            return this.nonAsyncMount(HTMLElement_, bound_data_object);
        }

        nonAsyncMount(HTMLElement_, bound_data_object){
            let element = null;

            if ((HTMLElement_ instanceof HTMLElement)) {
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

    d$3.web_component_constructor = function(wick_component, bound_data) {
        return class extends HTMLElement {
            constructor() {
                super();
                wick_component.mount(this, bound_data);
            }
        };
    };

    class fltr extends ElementNode{
    	constructor(env, tag, children, attribs, presets){
    		super(env, "f", null, attribs, presets);

    		this.type = 0;

    		if(this.attribs[0])
    			this.attribs[0].value.setForContainer();
    	}

    	mount(scope, container){
    		const io = this.attribs[0].value.bind(scope);
    		io.bindToContainer(this.attribs[0].name, container);
    	}
    }

    /******************** Expressions **********************/

    class ExpressionIO extends ScriptIO {
        constructor(ele, scope, errors, tap, binding, lex, pinned) {
            super(scope, errors, tap, binding, lex, pinned);
            this.ele = ele;
            this.old_val = null;
            this._SCHD_ = 0;
            this.ACTIVE = true;
            this.containerFunction = this.containerFunction.bind(this);
        }

        updateProp(io, val) {
            super.updateProp(io, val);
            this.down();
        }

        down(v, m) {
            this.val = super.down(v, m);
            
            if (!this._SCHD_){
                this.ele.data = this.val;
                this.old_val = this.val;
                spark.queueUpdate(this);
            }
        }

        scheduledUpdate() {
            if(this.val !== this.old_val)
                this.ele.data = this.val;
        }
    }

    /******************** Expressions **********************/

    class Container extends ScriptIO {
        constructor(container, scope, errors, tap, binding, lex, pinned) {
            super(scope, errors, tap, binding, lex, pinned);

            this.container = container;

            //Reference to function that is called to modify the host container. 
            this.action = null;

            this.ARRAY_ACTION = false;
        }

        bindToContainer(type, container) {
            this.container = container;

            switch (type) {
                case "sort":
                    this.ARRAY_ACTION = true;
                    container.filters.push(this);
                    this.action = this.sort;
                    break;
                case "filter":
                    this.ARRAY_ACTION = true;
                    container.filters.push(this);
                    this.action = this.filter;
                    break;
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
        }

        destroy() {
            super.destroy;
            this.container = null;
        }

        updateProp(io, val) {
            super.updateProp(io, val);
            this.down();
        }

        setValue(value) {
            if (Array.isArray(value)) {
                value.forEach((v, i) => this.arg_props[i] = v);
                this.active_IOS = this.IO_ACTIVATIONS;
            } else if (typeof(value) == "object") {
                //Distribute iterable properties amongst the IO_Script's own props.
                for (const a in value) {
                    if (this.arg_ios[a])
                        this.arg_ios[a].down(value[a]);
                }
            } else {
                if (this.TAP_BINDING !== -1)
                    this.arg_props[this.TAP_BINDING] = value;
            }
        }

        down(v, m) {
            let old = this.val;
            this.val = super.down(v, m);

            if (this.ARRAY_ACTION){
                this.container.filterExpressionUpdate();
            }

            else if (this.val !== undefined && val !== old) {
                this.action();
                this.container.limitExpressionUpdate();
            }
        }

        containerFunction(...data) {
            return super.down(data);
        }

        scheduledUpdate() {
            this.ele.data = this.val;
        }

        filter(array) {
            return array.filter((a) => super.down([a]));
        }

        sort(array) {
            return array.sort((a, b) => super.down([a, b]));
        }

        scrub() {
            this.container.scrub = this.val;
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

    const EXPRESSION = 5;
    const IDENTIFIER = 6;
    const CONTAINER = 7;
    const BOOL = 8;

    class Binding {

        constructor(sym, env, lex) {
            this.lex = lex.copy();
            this.lex.sl = lex.off - 3;
            this.lex.off = env.start;

            this.METHOD = IDENTIFIER;

            this.ast = sym[1];
            this.prop = (sym.length > 3) ? sym[3] : null;

            this.function = null;
            this.args = null;
            this.READY = false;

            this.val = this.ast + "";

            if (!(this.ast instanceof id) && !(this.ast instanceof mem))
                this.processJSAST(env.presets);
            
        }

        toString() {
            if (this.prop)
                return `((${this.ast + ""})(${this.prop + ""}))`;
            else
                return `((${this.ast + ""}))`;
        }

        processJSAST(presets = { custom: {} }) {
            this.args = GetOutGlobals(this.ast, presets);
            AddEmit(this.ast, presets);
            let r = new return_stmt([this.ast]);
            this.ast = r;
            this.val = r + "";
            this.METHOD = EXPRESSION;
            scr.prototype.finalize.call(this);
        }

        setForContainer() {
            if (this.METHOD == EXPRESSION)
                this.METHOD = CONTAINER;
        }

        bind(scope, element, pinned) {
            if (this.METHOD == EXPRESSION) {
                return new ExpressionIO(element, scope, [], scope, this, this.lex, pinned);
            } else if (this.METHOD == CONTAINER)
                return new Container(element, scope, [], scope, this, this.lex, pinned);
            else
                return scope.getTap(this.val);
        }
    }

    Binding.type = {
        Attribute: 0,
        TextNode: 1,
        Style: 2
    };

    class TextNode {

        constructor(sym, env) {
            this.data = sym[0];
            this.IS_BINDING = (this.data instanceof Binding);
        }

        toString(off = 0) {
            return `${offset.repeat(off)} ${this.data.toString()}\n`;
        }

        finalize(){
            return this;
        }

        mount(element, scope, presets, statics, pinned, ele = document.createTextNode("")) {

            if (ele instanceof Text)
                element.appendChild(ele);

            if (this.IS_BINDING)
                return new DataNodeIO(scope, this.data.bind(scope), ele, this.data.exprb);
            else
                ele.data = this.data;
        }
    }

    function BaseComponent(ast, presets) {
        this.ast = ast;
        this.READY = true;
        this.presets = presets;
        //Reference to the component name. Used with the Web Component API
        this.name = "";
    }

    Object.assign(BaseComponent.prototype,d$3.prototype);
    BaseComponent.prototype.mount = d$3.prototype.nonAsyncMount;

    class ctr extends ElementNode {
        
        constructor(env, tag, children, attribs, presets) {
            super(env, "container", children, attribs, presets);

            this.filters = null;
            this.property_bind = null;
            this.scope_children = null;

            //Tag name of HTMLElement the container will create;
            this.element = this.getAttribute("element") || "ul";

            this.filters = null;
            this.nodes = null;
            this.binds = null;
        }

        finalize(slots = {}){
            super.finalize(slots);

            const children = this.children;

            this.filters = children.reduce((r, c) => { if (c instanceof fltr) r.push(c); return r }, []);
            this.nodes = children.reduce((r, c) => { if (c instanceof ElementNode && !(c instanceof fltr)) r.push(c); return r }, []);
            this.binds = children.reduce((r, c) => { if (c instanceof TextNode && c.IS_BINDING) r.push(c); return r }, []);

            //Keep in mind slots!;
            this.component_constructor = (this.nodes.length > 0) ? new BaseComponent(this.nodes[0], this.presets) : null;

            return this;
        }

        merge(node) {
            const merged_node = super.merge(node);
            merged_node.filters = this.filters;
            merged_node.nodes = this.filters;
            merged_node.binds = this.binds;
            merged_node.MERGED = true;
            return merged_node;
        }

        mount(element, scope, presets, slots, pinned) {
            
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
                this.attribs[i].bind(ele, scope, pinned);

            if (this.binds.length > 0) {
                for (let i = 0; i < this.binds.length; i++)
                    this.binds[i].mount(null, scope, presets, slots, pinned, container);
            }else{ 
                //If there is no binding, then there is no potential to have ModelContainer borne components.
                //Instead, load any existing children as component entries for the container element. 
                for (let i = 0; i < this.nodes.length; i++)
                    container.scopes.push(this.nodes[i].mount(null, null, presets, slots));
                container.filterUpdate();
                container.render();
            }

            return scope;
        }
    }

    //import css from "@candlefw/css";

    class sty extends ElementNode{
    	constructor(env, tag, children, attribs, presets){
    		//css;
    		
    		let data = children[0].data;
    		/*
    		css(data).then(css=>{
    			debugger
    		});
    		*/
    		super(env, "style", children, attribs, presets);
    	}
    }

    class v$2 extends ElementNode{
    	constructor(env, tag, children, attribs, presets){
    		super(env, tag, children, attribs, presets);
    	}
    }

    class svg extends ElementNode{
    	constructor(env, tag, children, attribs, presets){
    		super(env, "svg", children, attribs, presets);
    	}
    }

    class slt extends ElementNode{
    	finalize(){
    		this.name = this.getAttribute("name");
    		return this;
    	}

    	mount(element, scope, presets, slots, pinned){
    		if(slots && slots[this.name]){
    			let ele = slots[this.name];
    			slots[this.name] = null;
    			ele(element, scope, presets, slots, pinned);
    		}
    	}
    }

    class pre extends ElementNode{
    	constructor(env, tag, children, attribs, presets){
    		super(env, "pre", children, attribs, presets);
    	}
    }

    class Import extends ElementNode{

    	constructor(env, tag, children, attribs, presets){
    		super(env, "import", null, attribs, presets);
    		this.url = URL.resolveRelative(this.getAttribute("url"), env.url);
    		this.load(env);
    	}

    	async load(env){
    		try{
    			const own_env = new CompilerEnvironment(env.presets, env);
    			own_env.setParent(env);

    			const txt_data = await this.url.fetchText();

    			own_env.pending++;

    			const ast = parser(whind$1(txt_data), own_env);
    			own_env.resolve();

    		}catch(err){
    			console.error(err);
    		}
    	}
    		
    	loadURL(){/*Intentional*/ return;}
    }

    //import Plugin from "./../plugin.mjs";

    function element_selector (sym, env, lex, st, stack, len){ 

    	const 
            FULL = len > 5,
            tag = sym[1],
            attribs = (Array.isArray(sym[2]))  ? sym[2] : [],
            children = (FULL) ? (Array.isArray(sym[2])) ? sym[4] : sym[3] : [];

        const presets = env.presets;

        let node = null, cstr = null;
        
        switch (tag) {
            case "filter":
            case "f":
                cstr =  fltr; break;
            case "a":
                cstr =  a$2; break;
                /** void elements **/
            case "template":
                cstr =  v$2; break;
            case "css":
            case "style":
                cstr =  sty; break;
            case "script":
                cstr =  scr; break;
            case "svg":
            case "path":
                cstr =  svg; break;
            case "container":
                cstr =  ctr; break;
            case "scope":
                cstr =  scp; break;
            case "slot":
                cstr =  slt; break;
            case "import":
                cstr =  Import; break;
                //Elements that should not be parsed for binding points.
            case "pre":
            case "code":
                cstr =  pre; break;
            default:
                cstr =  ElementNode; break;
        }

        node = new cstr(env, tag, children, attribs, presets);

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
                if (this.name == "value" && (tag == "input" || tag == "textarea"))
                    this.io_constr = InputIO;
            }

        }

        bind(element, scope, pinned) {
            
            if (!this.isBINDING)
                element.setAttribute(this.name, this.value);
            else {
                const
                    bind = this.value.bind(scope, pinned),
                    io = new this.io_constr(scope, [], bind, this.name, element, this.value.default);
            }
        }
    }

    const env$2 = {
        table: {},
        ASI: true,
        functions: {
            //HTML
            element_selector,
            attribute: Attribute,
            wick_binding: Binding,
            text: TextNode,

            //JS
            //JS
            add,
            and: _and,
            array_literal,
            arrow,
            assign,
            binding,
            block,
            bool_literal: bool$1,
            call_expr,
            catch_stmt,
            condition_expr: condition,
            debugger_stmt,
            div,
            eq: equal,
            exp,
            expr_stmt,
            expression_list,
            for_stmt,
            funct_decl,
            gt: greater,
            gteq: greater_eq,
            identifier: id,
            if_stmt,
            lexical,
            lt: less,
            lteq: less_eq,
            member: mem,
            mult,
            negate_expr: negate,
            null_literal: null_,
            numeric_literal: number$2,
            object,
            or: _or,
            post_dec_expr: post_dec,
            post_inc_expr: post_inc,
            property_binding,
            unary_not_expr: node,
            new_member_stmt: mem$1,
            spread_expr: node$1,
            return_stmt: return_stmt,
            stmts:stmts,
            string_literal: string$2,
            sub,
            this_expr,
            try_stmt,
            while_stmt: function(sym) {
                this.bool = sym[1];
                this.body = sym[3];
            },
            var_stmt: function(sym) { this.declarations = sym[1]; },
            mod_expr: function(sym) {
                this.le = sym[0];
                this.re = sym[2];
                this.ty = "MOD";
            },
            seq_expr: function(sym) {
                this.le = sym[0];
                this.re = sym[2];
                this.ty = "STRICT_EQ";
            },
            neq_expr: function(sym) {
                this.le = sym[0];
                this.re = sym[2];
                this.ty = "NEQ";
            },
            sneq_expr: function(sym) {
                this.le = sym[0];
                this.re = sym[2];
                this.ty = "STRICT_NEQ";
            },
            unary_plus: function(sym) {
                this.expr = sym[1];
                this.ty = "PRE INCR";
            },
            unary_minus: function(sym) {
                this.expr = sym[1];
                this.ty = "PRE INCR";
            },
            pre_inc_expr: function(sym) {
                this.expr = sym[1];
                this.ty = "PRE INCR";
            },
            pre_dec_expr: function(sym) {
                this.expr = sym[1];
                this.ty = "PRE DEC";
            },

            label_stmt: function(sym) {
                this.label = sym[0];
                this.stmt = sym[1];
            },

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
            env$2.prst.push(prst);
        },
        popPresets() {
            return env$2.prst.pop();
        },
        get presets() {
            return env$2.prst[env$2.prst.length - 1] || null;
        },

        options: {
            integrate: false,
            onstart: () => {
                env$2.table = {};
                env$2.ASI = true;
            }
        }
    };

    const

        default_presets = new Presets,

        // If compilation fails, failure component is generated that provides 
        // error information. Should be fancy though.

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

                        if ((url = URL.resolveRelative(component_data, ""))){
                            try{
                                string_data = await url.fetchText();
                            }catch(e){
                                console.log(e);
                            }
                        }

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

                try {

                    return await (new Promise(res => {
                        const compiler_env = new CompilerEnvironment(presets, env$2);
                        compiler_env.pending++;


                        compiler_env.pendingResolvedFunction = () => { res(ast); };

                        ast = parser(whind$1(string_data), compiler_env);

                        compiler_env.resolve();
                    }));

                } catch (err) {
                    console.error(err);
                }

                return ast;
            },


            // This is a variadic function that accepts objects, string, and urls, 
            //  and compiles data from the argument sources into a wick component. 
            Component = function(...data) {
                // The presets object provides global values to this component
                // and all its derivatives and descendents. 
                let presets = default_presets;

                if (data.length > 1)
                    presets = new Presets(data[1]);

                if (data.length === 0)
                    throw new Error("This function requires arguments. Please Refere to wick docs on what arguments may be passed to this function.");

                const component_data = data[0];

                // If this function is an operand of the new operator, run an alternative 
                // compiler on the calling object.
                if (new.target) {

                    this.ast = null;

                    this.READY = false;

                    this.presets = data[1] || default_presets;

                    //Reference to the component name. Used with the Web Component API
                    this.name = "";
                    
                    this.pending = new Promise(res => {
                        compileAST(component_data, presets).then(ast => {

                            if (this.constructor.prototype !== Component.prototype) {
                                                    
                                //Go through prototype chain and extract functions that have names starting with $. Add them to the ast.

                                for(const a of Object.getOwnPropertyNames(this.constructor.prototype)){
                                    if(a == "constructor") continue;

                                    const r = this.constructor.prototype[a];

                                    if(typeof r == "function"){

                                        //extract and process function information. 
                                        let c_env = new CompilerEnvironment(presets, env$2);
                                        
                                        let js_ast = parser(whind$1("function " + r.toString().trim()+";"), c_env);

                                        let func_ast = JS.getFirst(js_ast, types.function_declaration);
                                        let ids = JS.getClosureVariableNames(func_ast);
                                        let args = JS.getFunctionDeclarationArgumentNames(js_ast); // Function arguments in wick class component definitions are treated as TAP variables. 
                                        const HAS_CLOSURE = (ids.filter(a=>!args.includes(a))).length > 0;

                                        const binding = new Binding([null, func_ast.id], {presets, start:0}, whind$1("ddddd"));
                                        const attrib = new Attribute(["on", null, binding], presets);
                                        const stmt = func_ast.body;
                                
                                        let script = new scr({}, null, stmt, [attrib], presets);

                                        script.finalize();

                                        ast.children.push(script);

                                        //Create and attach a script IO to the HTML ast. 


                                        //Checking for variable leaks. 
                                        //if all closure variables match all argument variables, then the function is self contained and can be completely enclosed by the 
                                    }
                                }
                            }

                            this.READY = true;
                            this.ast = ast;
                            this.ast.finalize();

                            if (!this.name)
                                this.name = this.ast.getAttrib("component").value || "undefined-component";

                            if(this.__pending){
                                this.__pending.forEach(e=>e[2](this.mount(...e.slice(0,2))));
                                this.__pending = null;
                            }

                            return res(this)
                        });
                    });
                } else {
                    const comp = new Component(...data);

                    return comp;
                }
            };

    Component.prototype = d$3.prototype;

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

    return wick;

}());
