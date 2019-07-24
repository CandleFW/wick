import JS from "../js/tools.js";
import glow from "@candlefw/glow";
import { types, identifier, member_expression } from "@candlefw/js";

const defaults = {
    glow,
    wickNodeExpression: function(scope, id) {
        const out = scope.ast.presets.components[id].mount(null, scope, scope.ast.presets, undefined, undefined, true);
        return out;
    }
}

const root = typeof(global) == "object" ? global : window;

export function GetOutGlobals(ast, presets) {
    const args = [];
    const ids = [];
    const arg_lu = new Set();

    JS.getClosureVariableNames(ast).forEach(out => {

        const name = out.name;
        if (out.parent &&
            out.type == types.identifier &&
            out.parent.type == types.assignment_expression &&
            out == out.parent.left
        ) {
            // Expression name = expre would overwrite any value that "name" referenced, so there's no 
            // reason to count it among the global values.
        } else if (!arg_lu.has(name)) {
            arg_lu.add(name);

            const out_object = { name, val: null, IS_TAPPED: false, IS_ELEMENT: false };

            if (presets.custom[name])
                out_object.val = presets.custom[name];
            else if (presets[name])
                out_object.val = presets[name];
            else if (defaults[name]) {
                out_object.val = defaults[name];
            } else if (root[name]) {
                out_object.val = root[name];
            } else if (name[name.length - 1] == "$") {
                out_object.IS_ELEMENT = true;
            } else {
                out_object.IS_TAPPED = true;
            }
            args.push(out_object);
        }
        ids.push(out);
    });

    return { args, ids };
}

export function AddEmit(ast, presets, ignore) {


    ast.forEach(node => {

        if (node.parent && node.parent.type == types.assignment_expression && node.type == types.identifier) {
            if (node == node.parent.left) {

                const assign = node.parent;

                const k = node.name;

                if ((root[k] && !(root[k] instanceof HTMLElement)) || presets.custom[k] || presets[k] || defaults[k] || ignore.includes(k))
                    return;

                node.replace(new member_expression(new identifier(["emit"]), node));
            }
        }
    });
}
