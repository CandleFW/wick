/** NULL **/

import base from "./base.mjs";
import types from "./types.mjs";
export default class extends base{
	 constructor (sym){super()}
	 get type () { return types.null }

	 render(){return "null"}
}