/** This is the entire object structure of Wick, minus the platform specific outputs found in /source/root/ */

import { Presets } from "../../common/presets";

//Schema

import { SchemeConstructor, DateSchemeConstructor, TimeSchemeConstructor, StringSchemeConstructor, NumberSchemeConstructor, BoolSchemeConstructor, schemes } from "../../schema/schemas";

//Models
import { Store } from "../../model/store";
import { SchemedModel } from "../../model/schemed";
import { Model } from "../../model/model";
import { ModelContainerBase } from "../../model/container/base";
import { MultiIndexedContainer } from "../../model/container/multi";
import { BTreeModelContainer } from "../../model/container/btree";
import { ArrayModelContainer } from "../../model/container/array";
//Views
import { View } from "../../view/view";

//Source
import { SourcePackage } from "../../source/package";

//CSS
import { CSSParser } from "../../common/css/root";

//HTML
import { HTMLParser } from "../../common/html/root";

//Network
import { Getter } from "../../network/getter";
import { Setter } from "../../network/setter";

//Routing
import { WURL } from "../../network/wurl";
import { Router } from "../../network/router/router";

//Other
import { Lexer } from "../../common/string_parsing/lexer";
import * as Animation from "../../animation/animation";
import * as Common from "../../common/common";
import { Scheduler } from "../../common/scheduler";

const model = (data, schema) => new SchemedModel(data, undefined, undefined, schema);
model.scheme = function(schema, sm) { sm = class extends SchemedModel {};
    sm.schema = schema; return sm; };
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

//Construct Schema Exports
const scheme = Object.create(schemes);
scheme.constr = SchemeConstructor;
scheme.constr.bool = BoolSchemeConstructor;
scheme.constr.number = NumberSchemeConstructor;
scheme.constr.string = StringSchemeConstructor;
scheme.constr.date = DateSchemeConstructor;
scheme.constr.time = TimeSchemeConstructor;

Object.freeze(scheme.constr);
Object.freeze(scheme);
Object.freeze(Presets);
Object.freeze(model.container.constr);
Object.freeze(model.container);
Object.freeze(model.any);
Object.freeze(model);

const core = {
    presets: a => new Presets(a),
    common: Common,
    lexer: (string, INCLUDE_WHITE_SPACE_TOKENS) => new Lexer(string, INCLUDE_WHITE_SPACE_TOKENS),
    animation: Animation,
    view: View,
    css: CSSParser,
    html: HTMLParser,
    scheme: scheme,
    model: model,
    network: {
        url: WURL,
        router: Router,
        getter: Getter,
        setter: Setter,
    },
    source: (...a) => new SourcePackage(...a)
};

let internals = { /* Empty if production */ };
internals.lexer = Lexer;
internals.scheduler = Scheduler;

core.source.package = SourcePackage;

Object.freeze(core.source);
Object.freeze(core);

let source = core.source;

export {
    source,
    scheme,
    model,
    core,
    internals
};