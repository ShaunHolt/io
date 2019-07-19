import{Item,IoThemeMixinSingleton}from"./io-elements-core.js";import{IoElement,html,IoStorage}from"./io.js";class IoBreadcrumbs extends IoElement{static get Style(){return html`<style>:host {display: flex;flex: 0 0 auto;flex-direction: row;align-self: stretch;justify-self: stretch;border-radius: var(--io-border-radius);border: var(--io-inset-border);border-color: var(--io-inset-border-color);padding: var(--io-spacing);color: var(--io-color-field);background-color: var(--io-background-color-field);padding: var(--io-spacing);}:host > io-button {border: none;overflow: hidden;text-overflow: ellipsis;background: none;padding: 0 var(--io-spacing);}:host > io-button:hover {text-decoration: underline;}:host > io-button:first-of-type {color: var(--io-color);overflow: visible;text-overflow: clip;margin-left: var(--io-spacing);}:host > io-button:last-of-type {overflow: visible;text-overflow: clip;margin-right: var(--io-spacing);}:host > io-button:not(:first-of-type):before {content: '>';margin: 0 var(--io-spacing);padding: 0 var(--io-spacing) 0 0;opacity: 0.25;}</style>`}static get Properties(){return{value:null,options:Array,trim:Boolean}}_onClick(t){this.set("value",t.value),this.trim&&(this.options.length=t.index+1,this.dispatchEvent("object-mutated",{object:this.options},!1,window))}changed(){const t=this.options.map(t=>void 0!==t.label||void 0!==t.value?t:{value:t});this.template([t.map((t,e)=>["io-button",{action:this._onClick,value:{index:e,value:t.value},label:t.label||t.value}])])}}function isValuePropertyOf(t,e){for(let o in e)if(e[o]===t)return o;return null}IoBreadcrumbs.Register();class IoInspector extends IoElement{static get Style(){return html`<style>:host {display: flex;flex-direction: column;align-self: stretch;justify-self: stretch;border: var(--io-border);border-radius: var(--io-border-radius);padding: var(--io-spacing);background: var(--io-background-color);}:host > io-breadcrumbs {margin-bottom: var(--io-spacing);}:host io-item.io-property-editor {color: var(--io-color-link);}:host io-item.io-property-editor:hover {text-decoration: underline;}</style>`}static get Properties(){return{value:Object,config:Object,_options:Array}}static get Listeners(){return{"item-clicked":"_onSetInspectorValue"}}get groups(){return this.__proto__.__config.getConfig(this.value,this.config)}_onSetInspectorValue(t){t.stopImmediatePropagation(),this.set("value",t.detail.value)}_onBreadcrumbsValue(t){this.set("value",t.detail.value)}valueChanged(){if(!this._options.find(t=>t.value===this.value)){const t=this._options[this._options.length-1];t&&isValuePropertyOf(this.value,t.value)||(this._options.length=0),this._options.push(new Item(this.value)),this.dispatchEvent("object-mutated",{object:this._options},!1,window)}}changed(){const t=[["io-breadcrumbs",{value:this.value,options:this._options,trim:!0,"on-value-set":this._onBreadcrumbsValue}]];let e=this.value.constructor.name;e+=this.value.guid||this.value.uuid||this.value.id||"";for(let o in this.groups)t.push(["io-collapsable",{label:o,expanded:IoStorage("io-inspector-group-"+e+"-"+o,!0),elements:[["io-properties",{value:this.value,properties:this.groups[o],config:Object.assign({"type:object":["io-item"]},this.config)}]]}]);this.template(t)}static get Config(){return{"Object|hidden":[/^_/],"HTMLElement|hidden":[/^_/,"innerText","outerText","innerHTML","outerHTML","textContent"]}}}class Config{constructor(t){for(let e=0;e<t.length;e++)this.registerConfig(t[e].constructor.Config||{})}registerConfig(t){for(let e in t)this[e]=this[e]||[],this[e]=[...this[e],...t[e]]}getConfig(t,e){const o=Object.keys(t),i=[];let r=t.__proto__;for(;r;)o.push(...Object.keys(r)),i.push(r.constructor.name),r=r.__proto__;const s={};for(let t in this){const e=t.split("|");1===e.length&&e.splice(0,0,"Object"),-1!==i.indexOf(e[0])&&(s[e[1]]=s[e[1]]||[],s[e[1]].push(...this[t]))}for(let t in e){const o=t.split("|");1===o.length&&o.splice(0,0,"Object"),-1!==i.indexOf(o[0])&&(s[o[1]]=s[o[1]]||[],s[o[1]].push(e[t]))}const n={},l=[];for(let t in s){n[t]=n[t]||[];for(let e in s[t]){const i=s[t][e],r=new RegExp(i);for(let e=0;e<o.length;e++){const s=o[e];"string"==typeof i?s==i&&(n[t].push(s),l.push(s)):"object"==typeof i&&r.exec(s)&&(n[t].push(s),l.push(s))}}}if(0===l.length)n.properties=o;else for(let t=0;t<o.length;t++)n.properties=n.properties||[],-1===l.indexOf(o[t])&&n.properties.push(o[t]);for(let t in n)0===n[t].length&&delete n[t];return delete n.hidden,n}}IoInspector.Register=function(){IoElement.Register.call(this),Object.defineProperty(this.prototype,"__config",{value:new Config(this.prototype.__protochain)})},IoInspector.Register();class IoProperties extends IoElement{static get Style(){return html`<style>:host {display: grid;grid-gap: var(--io-spacing);justify-items: start;white-space: nowrap;}:host:not([horizontal]) {grid-template-columns: auto;}:host[horizontal] {grid-auto-flow: column;grid-template-rows: auto;}:host:not([horizontal])[labeled] {grid-template-columns: auto 1fr;}:host[horizontal][labeled] {grid-template-rows: auto auto;}:host > io-object {}/* ${IoThemeMixinSingleton.item} */:host > io-object {padding: 0;border: var(--io-inset-border);border-radius: var(--io-border-radius);border-color: transparent;background-color: transparent;background-image: none;}:host > io-object,:host > io-properties,:host > io-number,:host > io-string {width: auto;justify-self: stretch;}</style>`}static get Properties(){return{labeled:{value:!0,reflect:1},horizontal:{value:!1,reflect:1},value:Object,properties:Array,config:Object}}get _config(){return this.__proto__.__config.getConfig(this.value,this.config)}_onValueSet(t){if(t.detail.object)return;const e=t.composedPath()[0];if(e===this)return;t.stopImmediatePropagation();const o=e.id;if(null!==o&&"value"===t.detail.property){const e=t.detail.value,i=t.detail.oldValue;this.value[o]=e;const r={object:this.value,property:o,value:e,oldValue:i};this.dispatchEvent("object-mutated",r,!1,window)}}changed(){const t=this._config,e=[];for(let o in t)if(!this.properties.length||-1!==this.properties.indexOf(o)){const i=t[o][0],r=t[o][1],s=t[o].label||o,n={class:"io-property-editor",title:s,id:o,value:this.value[o],"on-value-set":this._onValueSet};n.config=this.config,e.push(this.labeled?["span",{class:"io-item"},s+":"]:null,[i,Object.assign(n,r)])}this.template(e)}static get Config(){return{"type:string":["io-string",{}],"type:number":["io-number",{step:1e-7}],"type:boolean":["io-boolean",{}],"type:object":["io-object",{}],"type:null":["io-string",{}],"type:undefined":["io-string",{}]}}}class Config$1{constructor(t){for(let e=0;e<t.length;e++)this.registerConfig(t[e].constructor.Config||{})}registerConfig(t){for(let e in t)this[e]=this[e]||[],this[e]=[t[e][0]||this[e][0],Object.assign(this[e][1]||{},t[e][1]||{})]}getConfig(t,e){const o=Object.keys(t),i=[];let r=t.__proto__;for(;r;)r.constructor!==HTMLElement&&r.constructor!==Element&&r.constructor!==Node&&r.constructor!==EventTarget&&r.constructor!==Object&&o.push(...Object.keys(r)),i.push(r.constructor.name),r=r.__proto__;const s={};for(let t in this){const e=t.split("|");1===e.length&&e.splice(0,0,"Object"),-1!==i.indexOf(e[0])&&(s[e[1]]=this[t])}for(let t in e){const o=t.split("|");1===o.length&&o.splice(0,0,"Object"),-1!==i.indexOf(o[0])&&(s[o[1]]=e[t])}const n={};for(let e=0;e<o.length;e++){const i=o[e],r=t[i],l=null===r?"null":typeof r,a=null!=r&&r.constructor?r.constructor.name:"null";if("function"==l)continue;const c="type:"+l,p="constructor:"+a,u=i.replace("type:","").replace("constructor:","");n[i]={},s[c]&&(n[i]=s[c]),s[p]&&(n[i]=s[p]),s[u]&&(n[i]=s[u])}return n}}IoProperties.Register=function(){IoElement.Register.call(this),Object.defineProperty(this.prototype,"__config",{value:new Config$1(this.prototype.__protochain)})},IoProperties.Register(),IoProperties.RegisterConfig=function(t){this.prototype.__config.registerConfig(t)};class IoObject extends IoElement{static get Style(){return html`<style>:host {${IoThemeMixinSingleton.panel}}:host > io-boolean {cursor: pointer !important;align-self: stretch;}:host > io-properties {display: grid !important;padding: calc(2 * var(--io-spacing)) var(--io-spacing) !important;}:host:not([expanded]) > io-properties {display: none;}</style>`}static get Attributes(){return{label:{notify:!0},expanded:{type:Boolean,notify:!0},role:"region"}}static get Properties(){return{value:Object,properties:Array,config:Object,labeled:!0}}_onButtonValueSet(t){this.set("expanded",t.detail.value)}changed(){const t=this.label||this.value.constructor.name;this.template([["io-boolean",{class:"io-item",true:"▾ "+t,false:"▸ "+t,value:this.expanded,"on-value-set":this._onButtonValueSet}],this.expanded?[["io-properties",{class:"io-frame",value:this.value,properties:this.properties,config:this.config,labeled:this.labeled}]]:null]),this.setAttribute("aria-expanded",String(this.expanded))}}IoObject.Register();export{IoInspector,IoObject,IoProperties};