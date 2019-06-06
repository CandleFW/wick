import {
    add_expression,
and_expression,
array_literal,
arrow_function_declaration,
assignment_expression,
await_expression,
binding,
block_statement,
bool_literal,
call_expression,
catch_statement,
condition_expression,
debugger_statement,
delete_expression,
divide_expression,
equality_expression,
exponent_expression,
expression_list,
expression_statement,
for_statement,
function_declaration,
identifier,
if_statement,
in_expression,
instanceof_expression,
left_shift_expression,
lexical_declaration,
member_expression,
modulo_expression,
multiply_expression,
negate_expression,
new_expression,
null_literal,
numeric_literal,
object_literal,
or_expression,
plus_expression,
post_decrement_expression,
post_increment_expression,
pre_decrement_expression,
pre_increment_expression,
property_binding,
right_shift_expression,
right_shift_fill_expression,
return_statement,
spread_element,
statements,
string,
subtract_expression,
this_literal,
try_statement,
typeof_expression,
unary_not_expression,
unary_or_expression,
unary_xor_expression,
void_expression,
argument_list
} from "@candlefw/js";

//HTML
import element_selector from "./html/element_selector.mjs";
import attribute from "./html/attribute.mjs";
import wick_binding from "./html/binding.mjs";
import text from "./html/text.mjs";

const env = {
    table: {},
    ASI: true,
    functions: {
        //HTML
        element_selector,
        attribute,
        wick_binding,
        text,

        //JS
        //JS
        add_expression,
and_expression,
array_literal,
arrow_function_declaration,
assignment_expression,
await_expression,
binding,
block_statement,
bool_literal,
call_expression,
catch_statement,
condition_expression,
debugger_statement,
delete_expression,
divide_expression,
equality_expression,
exponent_expression,
expression_list,
expression_statement,
for_statement,
function_declaration,
identifier,
if_statement,
in_expression,
instanceof_expression,
left_shift_expression,
lexical:lexical_declaration,
member_expression,
modulo_expression,
multiply_expression,
negate_expression,
new_expression,
null_literal,
numeric_literal,
object_literal,
or_expression,
plus_expression,
post_decrement_expression,
post_increment_expression,
pre_decrement_expression,
pre_increment_expression,
property_binding,
right_shift_expression,
right_shift_fill_expression,
return_statement,
spread_element,
statements,
string,
subtract_expression,
this_literal,
try_statement,
typeof_expression,
unary_not_expression,
unary_or_expression,
unary_xor_expression,
void_expression,
argument_list,
        while_stmt: function(sym) {
            this.bool = sym[1];
            this.body = sym[3];
        },
        var_stmt: function(sym) { this.declarations = sym[1] },
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

export default env;