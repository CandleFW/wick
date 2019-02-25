import whind from "@candlefw/whind";
import URL from "@candlefw/url";

import { EL } from "../../short_names";
import { CreateHTMLNode } from "./nodes/index";
import { Skeleton } from "../skeleton";



function complete(lex, SourcePackage, presets, ast, url, win) {


    //Record URL if present for proper error messaging. 
    if(url && !ast.url)
        ast.url = url;    

    /*
     * Only accept certain nodes for mounting to the DOM. 
     * The custom element `import` is simply used to import extra HTML data from network for use with template system. It should not exist otherwise.
     */
    if (ast.tag) {
        if ((ast.tag == "import" || ast.tag == "link")) {
            //add tags to package itself.
            SourcePackage.links.push(ast);
        } else if (ast.tag !== "template") {
            let skeleton = new Skeleton(ast, presets);
            SourcePackage.skeletons.push(skeleton);
        }
    }

    lex.IWS = true;

    while (!lex.END && lex.ch != "<") { lex.n; }

    if (!lex.END)
        return parseText(lex, SourcePackage, presets, url, win);

    SourcePackage.complete();

    return SourcePackage;
}


function buildCSS(lex, SourcePackage, presets, ast, css_list, index, url, win) {
    return css_list[index].READY().then(() => {

        if (++index < css_list.length) return buildCSS(lex, SourcePackage, presets, ast, css_list, index, url, win);

        ast.linkCSS(null, win);

        return complete(lex, SourcePackage, presets, ast, url, win);
    });
}

export function parseText(lex, SourcePackage, presets, url, win) {
    let start = lex.off;

    while (!lex.END && lex.ch != "<") { lex.n; }

    if (!lex.END) {

        if (lex.pk.ty != lex.types.id)
            lex.throw(`Expecting an Identifier after '<' character, ${lex.str}`);

        let node = CreateHTMLNode(lex.p.tx);

        node.presets = presets;

        return node.parse(lex, url).then((ast) => {
            if (ast.css && ast.css.length > 0)
                return buildCSS(lex, SourcePackage, presets, ast, ast.css, 0, url, win);

            return complete(lex, SourcePackage, presets, ast, url, win);
        }).catch((e) => {
            SourcePackage.addError(e);
            SourcePackage.complete();
        });
    }

    debugger;
    SourcePackage.addError(new Error(`Unexpected end of input. ${lex.slice(start)}, ${lex.str}`));
    SourcePackage.complete();
}


/**
 * Compiles an object graph based input into a SourcePackage.
 * @param      {SourcePackage}  SourcePackage     The source package
 * @param      {Presets}  presets           The global Presets instance
 * @param      {HTMLElement | Lexer | string}  element     The element
 * @memberof module:wick~internals.templateCompiler
 * @alias CompileSource
 */
function CompileSource(SourcePackage, presets, element, url, win = window) {
    
    if(!url)
        url = URL.G;

    let lex;
    if (element instanceof whind.constructor) {
        lex = element;
    } else if (typeof(element) == "string")
        lex = whind(element);
    else if (element instanceof EL) {
        if (element.tagName == "TEMPLATE") {
            let temp = document.createElement("div");
            temp.appendChild(element.content);
            element = temp;
        }
        lex = whind(element.innerHTML);
    } else {
        let e = new Error("Cannot compile component");
        SourcePackage.addError(e);
        SourcePackage.complete();
    }
    return parseText(lex, SourcePackage, presets, url, win);
}

export { CompileSource };
