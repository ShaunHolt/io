import"./io-elements-core.js";import{IoElement,html,IoThemeSingleton,IoNode}from"./io.js";class IoElementDemo extends IoElement{static get Style(){return html`<style>:host {${IoThemeSingleton.panel}}:host > io-boolean {cursor: pointer !important;align-self: stretch;}:host > .icon {margin-top: 0.2em;margin-bottom: -1.55em;display: inline-block;padding: 0 0.5em;margin-left: auto;}:host > io-boolean {margin-bottom: var(--io-spacing);}:host > io-properties {align-self: stretch;padding: var(--io-spacing);}</style>`}static get Attributes(){return{element:{type:String,reflect:-1,notify:!0},properties:{type:Object,reflect:-1,notify:!0},width:{type:String,reflect:-1},height:{type:String,reflect:-1},config:{type:Object,reflect:-1,notify:!0}}}static get Properties(){return{expanded:!1}}_onPropSet(e){void 0!==this.properties[e.detail.property]&&(this.properties[e.detail.property]=e.detail.value),this.dispatchEvent("object-mutated",{object:this.properties,property:e.detail.property,value:e.detail.value,oldValue:e.detail.oldValue},!1,window)}_onObjectMutation(e){super._onObjectMutation(e);for(let t in this.properties)"object"==typeof this.properties[t]&&this._bubbleMutation(this.properties[t],this.properties,e.detail.object)}_bubbleMutation(e,t,r){if(e===r)this.dispatchEvent("object-mutated",{object:t},!1,window);else for(let t in e)"object"==typeof e[t]&&this._bubbleMutation(e[t],e,r)}changed(){for(let e in this.properties)"undefined"===this.properties[e]&&(this.properties[e]=void 0);if(this.element){const e=!!Object.keys(this.properties).length,t="<"+this.element+">";this.template([e?["span",{class:"icon"},"🔧"]:null,["io-boolean",{class:"io-item",value:this.bind("expanded"),true:t,false:t}],e&&this.expanded?["io-properties",{value:this.properties,config:Object.assign({"type:number":["io-float"],"type:boolean":["io-switch"]},this.config)}]:null,["div",{class:"io-frame"},[[this.element,Object.assign({"on-value-set":this._onPropSet,id:"demo-element"},this.properties)]]]]),this.$["demo-element"]&&(this.width&&(this.$["demo-element"].style.width=this.width),this.height&&(this.$["demo-element"].style.height=this.height))}else this.template([null])}}IoElementDemo.Register(),function(e){var t={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:d,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,nptable:d,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:"^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,table:d,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading| {0,3}>|<\/?(?:tag)(?: +|\n|\/?>)|<(?:script|pre|style|!--))[^\n]+)*)/,text:/^[^\n]+/};function r(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||k.defaults,this.rules=t.normal,this.options.pedantic?this.rules=t.pedantic:this.options.gfm&&(this.options.tables?this.rules=t.tables:this.rules=t.gfm)}t._label=/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,t._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,t.def=p(t.def).replace("label",t._label).replace("title",t._title).getRegex(),t.bullet=/(?:[*+-]|\d+\.)/,t.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,t.item=p(t.item,"gm").replace(/bull/g,t.bullet).getRegex(),t.list=p(t.list).replace(/bull/g,t.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+t.def.source+")").getRegex(),t._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",t._comment=/<!--(?!-?>)[\s\S]*?-->/,t.html=p(t.html,"i").replace("comment",t._comment).replace("tag",t._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),t.paragraph=p(t.paragraph).replace("hr",t.hr).replace("heading",t.heading).replace("lheading",t.lheading).replace("tag",t._tag).getRegex(),t.blockquote=p(t.blockquote).replace("paragraph",t.paragraph).getRegex(),t.normal=f({},t),t.gfm=f({},t.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),t.gfm.paragraph=p(t.paragraph).replace("(?!","(?!"+t.gfm.fences.source.replace("\\1","\\2")+"|"+t.list.source.replace("\\1","\\3")+"|").getRegex(),t.tables=f({},t.gfm,{nptable:/^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,table:/^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/}),t.pedantic=f({},t.normal,{html:p("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",t._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/}),r.rules=t,r.lex=function(e,t){return new r(t).lex(e)},r.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},r.prototype.token=function(e,r){var i,n,s,o,l,a,h,p,c,u,g,d,f,k,x,y;for(e=e.replace(/^ +$/gm,"");e;)if((s=this.rules.newline.exec(e))&&(e=e.substring(s[0].length),1<s[0].length&&this.tokens.push({type:"space"})),s=this.rules.code.exec(e))e=e.substring(s[0].length),s=s[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?s:b(s,"\n")});else if(s=this.rules.fences.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"code",lang:s[2],text:s[3]||""});else if(s=this.rules.heading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:s[1].length,text:s[2]});else if(r&&(s=this.rules.nptable.exec(e))&&(a={type:"table",header:m(s[1].replace(/^ *| *\| *$/g,"")),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3]?s[3].replace(/\n$/,"").split("\n"):[]}).header.length===a.align.length){for(e=e.substring(s[0].length),g=0;g<a.align.length;g++)/^ *-+: *$/.test(a.align[g])?a.align[g]="right":/^ *:-+: *$/.test(a.align[g])?a.align[g]="center":/^ *:-+ *$/.test(a.align[g])?a.align[g]="left":a.align[g]=null;for(g=0;g<a.cells.length;g++)a.cells[g]=m(a.cells[g],a.header.length);this.tokens.push(a)}else if(s=this.rules.hr.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"hr"});else if(s=this.rules.blockquote.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"blockquote_start"}),s=s[0].replace(/^ *> ?/gm,""),this.token(s,r),this.tokens.push({type:"blockquote_end"});else if(s=this.rules.list.exec(e)){for(e=e.substring(s[0].length),h={type:"list_start",ordered:k=1<(o=s[2]).length,start:k?+o:"",loose:!1},this.tokens.push(h),i=!(p=[]),f=(s=s[0].match(this.rules.item)).length,g=0;g<f;g++)u=(a=s[g]).length,~(a=a.replace(/^ *([*+-]|\d+\.) +/,"")).indexOf("\n ")&&(u-=a.length,a=this.options.pedantic?a.replace(/^ {1,4}/gm,""):a.replace(new RegExp("^ {1,"+u+"}","gm"),"")),this.options.smartLists&&g!==f-1&&(o===(l=t.bullet.exec(s[g+1])[0])||1<o.length&&1<l.length||(e=s.slice(g+1).join("\n")+e,g=f-1)),n=i||/\n\n(?!\s*$)/.test(a),g!==f-1&&(i="\n"===a.charAt(a.length-1),n||(n=i)),n&&(h.loose=!0),y=void 0,(x=/^\[[ xX]\] /.test(a))&&(y=" "!==a[1],a=a.replace(/^\[[ xX]\] +/,"")),c={type:"list_item_start",task:x,checked:y,loose:n},p.push(c),this.tokens.push(c),this.token(a,!1),this.tokens.push({type:"list_item_end"});if(h.loose)for(f=p.length,g=0;g<f;g++)p[g].loose=!0;this.tokens.push({type:"list_end"})}else if(s=this.rules.html.exec(e))e=e.substring(s[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===s[1]||"script"===s[1]||"style"===s[1]),text:s[0]});else if(r&&(s=this.rules.def.exec(e)))e=e.substring(s[0].length),s[3]&&(s[3]=s[3].substring(1,s[3].length-1)),d=s[1].toLowerCase().replace(/\s+/g," "),this.tokens.links[d]||(this.tokens.links[d]={href:s[2],title:s[3]});else if(r&&(s=this.rules.table.exec(e))&&(a={type:"table",header:m(s[1].replace(/^ *| *\| *$/g,"")),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3]?s[3].replace(/(?: *\| *)?\n$/,"").split("\n"):[]}).header.length===a.align.length){for(e=e.substring(s[0].length),g=0;g<a.align.length;g++)/^ *-+: *$/.test(a.align[g])?a.align[g]="right":/^ *:-+: *$/.test(a.align[g])?a.align[g]="center":/^ *:-+ *$/.test(a.align[g])?a.align[g]="left":a.align[g]=null;for(g=0;g<a.cells.length;g++)a.cells[g]=m(a.cells[g].replace(/^ *\| *| *\| *$/g,""),a.header.length);this.tokens.push(a)}else if(s=this.rules.lheading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:"="===s[2]?1:2,text:s[1]});else if(r&&(s=this.rules.paragraph.exec(e)))e=e.substring(s[0].length),this.tokens.push({type:"paragraph",text:"\n"===s[1].charAt(s[1].length-1)?s[1].slice(0,-1):s[1]});else if(s=this.rules.text.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"text",text:s[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var i={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:d,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(href(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,strong:/^__([^\s])__(?!_)|^\*\*([^\s])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,em:/^_([^\s_])_(?!_)|^\*([^\s*"<\[])\*(?!\*)|^_([^\s][\s\S]*?[^\s_])_(?!_)|^_([^\s_][\s\S]*?[^\s])_(?!_)|^\*([^\s"<\[][\s\S]*?[^\s*])\*(?!\*)|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:d,text:/^(`+|[^`])[\s\S]*?(?=[\\<!\[`*]|\b_| {2,}\n|$)/};function n(e,t){if(this.options=t||k.defaults,this.links=e,this.rules=i.normal,this.renderer=this.options.renderer||new s,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.pedantic?this.rules=i.pedantic:this.options.gfm&&(this.options.breaks?this.rules=i.breaks:this.rules=i.gfm)}function s(e){this.options=e||k.defaults}function o(){}function l(e){this.tokens=[],this.token=null,this.options=e||k.defaults,this.options.renderer=this.options.renderer||new s,this.renderer=this.options.renderer,this.renderer.options=this.options}function a(e,t){if(t){if(a.escapeTest.test(e))return e.replace(a.escapeReplace,function(e){return a.replacements[e]})}else if(a.escapeTestNoEncode.test(e))return e.replace(a.escapeReplaceNoEncode,function(e){return a.replacements[e]});return e}function h(e){return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,function(e,t){return"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}function p(e,t){return e=e.source||e,t=t||"",{replace:function(t,r){return r=(r=r.source||r).replace(/(^|[^\[])\^/g,"$1"),e=e.replace(t,r),this},getRegex:function(){return new RegExp(e,t)}}}function c(e,t){return u[" "+e]||(/^[^:]+:\/*[^/]*$/.test(e)?u[" "+e]=e+"/":u[" "+e]=b(e,"/",!0)),e=u[" "+e],"//"===t.slice(0,2)?e.replace(/:[\s\S]*/,":")+t:"/"===t.charAt(0)?e.replace(/(:\/*[^/]*)[\s\S]*/,"$1")+t:e+t}i._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,i._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,i._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,i.autolink=p(i.autolink).replace("scheme",i._scheme).replace("email",i._email).getRegex(),i._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,i.tag=p(i.tag).replace("comment",t._comment).replace("attribute",i._attribute).getRegex(),i._label=/(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?/,i._href=/\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f\\]*\)|[^\s\x00-\x1f()\\])*?)/,i._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,i.link=p(i.link).replace("label",i._label).replace("href",i._href).replace("title",i._title).getRegex(),i.reflink=p(i.reflink).replace("label",i._label).getRegex(),i.normal=f({},i),i.pedantic=f({},i.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,link:p(/^!?\[(label)\]\((.*?)\)/).replace("label",i._label).getRegex(),reflink:p(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",i._label).getRegex()}),i.gfm=f({},i.normal,{escape:p(i.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~+(?=\S)([\s\S]*?\S)~+/,text:p(i.text).replace("]|","~]|").replace("|$","|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&'*+/=?^_`{\\|}~-]+@|$").getRegex()}),i.gfm.url=p(i.gfm.url).replace("email",i.gfm._extended_email).getRegex(),i.breaks=f({},i.gfm,{br:p(i.br).replace("{2,}","*").getRegex(),text:p(i.gfm.text).replace("{2,}","*").getRegex()}),n.rules=i,n.output=function(e,t,r){return new n(t,r).output(e)},n.prototype.output=function(e){for(var t,r,i,s,o,l,h="";e;)if(o=this.rules.escape.exec(e))e=e.substring(o[0].length),h+=o[1];else if(o=this.rules.autolink.exec(e))e=e.substring(o[0].length),i="@"===o[2]?"mailto:"+(r=a(this.mangle(o[1]))):r=a(o[1]),h+=this.renderer.link(i,null,r);else if(this.inLink||!(o=this.rules.url.exec(e))){if(o=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(o[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(o[0])&&(this.inLink=!1),!this.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(o[0])?this.inRawBlock=!0:this.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(o[0])&&(this.inRawBlock=!1),e=e.substring(o[0].length),h+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):a(o[0]):o[0];else if(o=this.rules.link.exec(e))e=e.substring(o[0].length),this.inLink=!0,i=o[2],this.options.pedantic?(t=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i))?(i=t[1],s=t[3]):s="":s=o[3]?o[3].slice(1,-1):"",i=i.trim().replace(/^<([\s\S]*)>$/,"$1"),h+=this.outputLink(o,{href:n.escapes(i),title:n.escapes(s)}),this.inLink=!1;else if((o=this.rules.reflink.exec(e))||(o=this.rules.nolink.exec(e))){if(e=e.substring(o[0].length),t=(o[2]||o[1]).replace(/\s+/g," "),!(t=this.links[t.toLowerCase()])||!t.href){h+=o[0].charAt(0),e=o[0].substring(1)+e;continue}this.inLink=!0,h+=this.outputLink(o,t),this.inLink=!1}else if(o=this.rules.strong.exec(e))e=e.substring(o[0].length),h+=this.renderer.strong(this.output(o[4]||o[3]||o[2]||o[1]));else if(o=this.rules.em.exec(e))e=e.substring(o[0].length),h+=this.renderer.em(this.output(o[6]||o[5]||o[4]||o[3]||o[2]||o[1]));else if(o=this.rules.code.exec(e))e=e.substring(o[0].length),h+=this.renderer.codespan(a(o[2].trim(),!0));else if(o=this.rules.br.exec(e))e=e.substring(o[0].length),h+=this.renderer.br();else if(o=this.rules.del.exec(e))e=e.substring(o[0].length),h+=this.renderer.del(this.output(o[1]));else if(o=this.rules.text.exec(e))e=e.substring(o[0].length),this.inRawBlock?h+=this.renderer.text(o[0]):h+=this.renderer.text(a(this.smartypants(o[0])));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else{if("@"===o[2])i="mailto:"+(r=a(o[0]));else{for(;l=o[0],o[0]=this.rules._backpedal.exec(o[0])[0],l!==o[0];);r=a(o[0]),i="www."===o[1]?"http://"+r:r}e=e.substring(o[0].length),h+=this.renderer.link(i,null,r)}return h},n.escapes=function(e){return e?e.replace(n.rules._escapes,"$1"):e},n.prototype.outputLink=function(e,t){var r=t.href,i=t.title?a(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(r,i,this.output(e[1])):this.renderer.image(r,i,a(e[1]))},n.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},n.prototype.mangle=function(e){if(!this.options.mangle)return e;for(var t,r="",i=e.length,n=0;n<i;n++)t=e.charCodeAt(n),.5<Math.random()&&(t="x"+t.toString(16)),r+="&#"+t+";";return r},s.prototype.code=function(e,t,r){if(this.options.highlight){var i=this.options.highlight(e,t);null!=i&&i!==e&&(r=!0,e=i)}return t?'<pre><code class="'+this.options.langPrefix+a(t,!0)+'">'+(r?e:a(e,!0))+"</code></pre>\n":"<pre><code>"+(r?e:a(e,!0))+"</code></pre>"},s.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},s.prototype.html=function(e){return e},s.prototype.heading=function(e,t,r){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+r.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"},s.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},s.prototype.list=function(e,t,r){var i=t?"ol":"ul";return"<"+i+(t&&1!==r?' start="'+r+'"':"")+">\n"+e+"</"+i+">\n"},s.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},s.prototype.checkbox=function(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "},s.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"},s.prototype.table=function(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"},s.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},s.prototype.tablecell=function(e,t){var r=t.header?"th":"td";return(t.align?"<"+r+' align="'+t.align+'">':"<"+r+">")+e+"</"+r+">\n"},s.prototype.strong=function(e){return"<strong>"+e+"</strong>"},s.prototype.em=function(e){return"<em>"+e+"</em>"},s.prototype.codespan=function(e){return"<code>"+e+"</code>"},s.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},s.prototype.del=function(e){return"<del>"+e+"</del>"},s.prototype.link=function(e,t,r){if(this.options.sanitize){try{var i=decodeURIComponent(h(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return r}if(0===i.indexOf("javascript:")||0===i.indexOf("vbscript:")||0===i.indexOf("data:"))return r}this.options.baseUrl&&!g.test(e)&&(e=c(this.options.baseUrl,e));try{e=encodeURI(e).replace(/%25/g,"%")}catch(e){return r}var n='<a href="'+a(e)+'"';return t&&(n+=' title="'+t+'"'),n+">"+r+"</a>"},s.prototype.image=function(e,t,r){this.options.baseUrl&&!g.test(e)&&(e=c(this.options.baseUrl,e));var i='<img src="'+e+'" alt="'+r+'"';return t&&(i+=' title="'+t+'"'),i+(this.options.xhtml?"/>":">")},s.prototype.text=function(e){return e},o.prototype.strong=o.prototype.em=o.prototype.codespan=o.prototype.del=o.prototype.text=function(e){return e},o.prototype.link=o.prototype.image=function(e,t,r){return""+r},o.prototype.br=function(){return""},l.parse=function(e,t){return new l(t).parse(e)},l.prototype.parse=function(e){this.inline=new n(e.links,this.options),this.inlineText=new n(e.links,f({},this.options,{renderer:new o})),this.tokens=e.reverse();for(var t="";this.next();)t+=this.tok();return t},l.prototype.next=function(){return this.token=this.tokens.pop()},l.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},l.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},l.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,h(this.inlineText.output(this.token.text)));case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,r,i,n="",s="";for(r="",e=0;e<this.token.header.length;e++)r+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(n+=this.renderer.tablerow(r),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],r="",i=0;i<t.length;i++)r+=this.renderer.tablecell(this.inline.output(t[i]),{header:!1,align:this.token.align[i]});s+=this.renderer.tablerow(r)}return this.renderer.table(n,s);case"blockquote_start":for(s="";"blockquote_end"!==this.next().type;)s+=this.tok();return this.renderer.blockquote(s);case"list_start":s="";for(var o=this.token.ordered,l=this.token.start;"list_end"!==this.next().type;)s+=this.tok();return this.renderer.list(s,o,l);case"list_item_start":s="";var a=this.token.loose;for(this.token.task&&(s+=this.renderer.checkbox(this.token.checked));"list_item_end"!==this.next().type;)s+=a||"text"!==this.token.type?this.tok():this.parseText();return this.renderer.listitem(s);case"html":return this.renderer.html(this.token.text);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},a.escapeTest=/[&<>"']/,a.escapeReplace=/[&<>"']/g,a.replacements={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},a.escapeTestNoEncode=/[<>"']|&(?!#?\w+;)/,a.escapeReplaceNoEncode=/[<>"']|&(?!#?\w+;)/g;var u={},g=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function d(){}function f(e){for(var t,r,i=1;i<arguments.length;i++)for(r in t=arguments[i])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}function m(e,t){var r=e.replace(/\|/g,function(e,t,r){for(var i=!1,n=t;0<=--n&&"\\"===r[n];)i=!i;return i?"|":" |"}).split(/ \|/),i=0;if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;i<r.length;i++)r[i]=r[i].trim().replace(/\\\|/g,"|");return r}function b(e,t,r){if(0===e.length)return"";for(var i=0;i<e.length;){var n=e.charAt(e.length-i-1);if(n!==t||r){if(n===t||!r)break;i++}else i++}return e.substr(0,e.length-i)}function k(e,t,i){if(null==e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if(i||"function"==typeof t){i||(i=t,t=null);var n,s,o=(t=f({},k.defaults,t||{})).highlight,h=0;try{n=r.lex(e,t)}catch(e){return i(e)}s=n.length;var p=function(e){if(e)return t.highlight=o,i(e);var r;try{r=l.parse(n,t)}catch(r){e=r}return t.highlight=o,e?i(e):i(null,r)};if(!o||o.length<3)return p();if(delete t.highlight,!s)return p();for(;h<n.length;h++)!function(e){"code"!==e.type?--s||p():o(e.text,e.lang,function(t,r){return t?p(t):null==r||r===e.text?--s||p():(e.text=r,e.escaped=!0,void(--s||p()))})}(n[h])}else try{return t&&(t=f({},k.defaults,t)),l.parse(r.lex(e,t),t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",(t||k.defaults).silent)return"<p>An error occurred:</p><pre>"+a(e.message+"",!0)+"</pre>";throw e}}d.exec=d,k.options=k.setOptions=function(e){return f(k.defaults,e),k},k.getDefaults=function(){return{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:new s,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tables:!0,xhtml:!1}},k.defaults=k.getDefaults(),k.Parser=l,k.parser=l.parse,k.Renderer=s,k.TextRenderer=o,k.Lexer=r,k.lexer=r.lex,k.InlineLexer=n,k.inlineLexer=n.output,k.parse=k,"undefined"!=typeof module&&"object"==typeof exports?module.exports=k:"function"==typeof define&&define.amd?define(function(){return k}):e.marked=k}("undefined"!=typeof window?window:global);class IoMdView extends IoElement{static get Style(){return html`<style>:host {display: block;align-self: stretch;justify-self: stretch;flex: 1 1 auto;background-color: var(--io-background-color);color: var(--io-color);--io-code-size: 15px;padding: var(--io-spacing) calc(4 * var(--io-spacing));overflow-x: hidden;overflow-y: auto;}:host > :first-child {margin-top: 0;}:host > :last-child {margin-top: 0;}:host p {line-height: 1.4em;}:host a {text-decoration: underline;color: var(--io-color-link);}:host h1, :host h2, :host h3, :host h4 {margin: 0;border: var(--io-border);border-width: 0 0 var(--io-border-width) 0;}:host h1 {padding: 0.5em 0;}:host h2 {padding: 0.4em 0;}:host h3 {padding: 0.3em 0;}:host h4 {padding: 0.2em 0;}:host code {font-family: monospace, monospace;-webkit-font-smoothing: auto;overflow: auto;color: #007faa;}:host pre > code {color: inherit;background-color: var(--io-background-color-dark);line-height: 1.6em;}:host code.language-html,:host code.language-javascript {padding: 1em;display: block;font-size: var(--io-code-size);}:host blockquote {font-size: 0.85em;opacity: 0.5;margin: 0;padding: var(--io-spacing) 0;}:host table{width: 100% !important;border: 1px solid black;border-collapse: collapse;table-layout: fixed;}:host table td,:host table tr,:host table th {border: 1px solid gray;padding: 0.25em;text-overflow: ellipsis;overflow: hidden;}:host .videocontainer {width: 100%;height: 0;position: relative;padding-bottom: 56.25%;}:host .videocontainer > iframe {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}</style>`}static get Attributes(){return{role:"document"}}static get Properties(){return{path:{type:String,reflect:1},vars:Object}}onResized(){let e=this.getBoundingClientRect().width;e=Math.min((e-30)/35,15),this.style.setProperty("--io-code-size",e+"px")}pathChanged(){const e=this;this.classList.toggle("io-loading",!0),fetch(this.path).then(e=>e.text()).then(t=>{window.marked&&(window.marked&&window.marked.setOptions({sanitize:!1,highlight:function(e){return window.hljs?window.hljs.highlightAuto(e).value:null}}),e.innerHTML=window.marked(t),this.classList.toggle("io-loading",!1),this.dispatchEvent("content-ready",{},!0))})}}IoMdView.Register(),"serviceWorker"in navigator||console.warn("No Service Worker support!"),"PushManager"in window||console.warn("No Push API Support!");class IoServiceLoader extends IoNode{static get Properties(){return{path:"service.js",serviceWorker:void 0,permission:window.Notification?window.Notification.permission:"default",subscription:""}}constructor(e){super(e),this.requestNotification=this.requestNotification.bind(this),"serviceWorker"in navigator&&this.init()}async init(){const e=await navigator.serviceWorker.register(this.path);e.update(),navigator.serviceWorker.addEventListener("message",this.onServiceWorkerMessage),e.active?this.serviceWorker=e:e.addEventListener("activate",()=>{this.serviceWorker=e})}serviceWorkerChanged(){"granted"===this.permission&&this.subscribe()}subscribe(){navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({command:"subscribe"})}async requestNotification(){this.permission=await window.Notification.requestPermission(),"granted"===this.permission&&this.subscribe()}onServiceWorkerMessage(e){const t=JSON.parse(e.data);t.subscription&&(this.subscription=JSON.stringify(t.subscription))}}IoServiceLoader.Register();export{IoElementDemo,IoMdView,IoServiceLoader};