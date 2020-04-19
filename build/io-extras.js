import{IoSelectorSidebar,Options,Option,IoStorageFactory,IoThemeSingleton}from"./io-elements.js";import{IoElement,IoNode}from"./io.js";function createCommonjsModule(e,t){return e(t={exports:{}},t.exports),t.exports}let defaults=createCommonjsModule(function(e){function t(){return{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,xhtml:!1}}e.exports={defaults:{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,xhtml:!1},getDefaults:t,changeDefaults:function(t){e.exports.defaults=t}}}),defaults_1=defaults.defaults,defaults_2=defaults.getDefaults,defaults_3=defaults.changeDefaults;const escapeTest=/[&<>"']/,escapeReplace=/[&<>"']/g,escapeTestNoEncode=/[<>"']|&(?!#?\w+;)/,escapeReplaceNoEncode=/[<>"']|&(?!#?\w+;)/g,escapeReplacements={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},getEscapeReplacement=e=>escapeReplacements[e];function escape(e,t){if(t){if(escapeTest.test(e))return e.replace(escapeReplace,getEscapeReplacement)}else if(escapeTestNoEncode.test(e))return e.replace(escapeReplaceNoEncode,getEscapeReplacement);return e}const unescapeTest=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function unescape(e){return e.replace(unescapeTest,(e,t)=>"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):"")}const caret=/(^|[^\[])\^/g;function edit(e,t){e=e.source||e,t=t||"";const n={replace:(t,i)=>(i=(i=i.source||i).replace(caret,"$1"),e=e.replace(t,i),n),getRegex:()=>new RegExp(e,t)};return n}const nonWordAndColonTest=/[^\w:]/g,originIndependentUrl=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function cleanUrl(e,t,n){if(e){let e;try{e=decodeURIComponent(unescape(n)).replace(nonWordAndColonTest,"").toLowerCase()}catch(e){return null}if(0===e.indexOf("javascript:")||0===e.indexOf("vbscript:")||0===e.indexOf("data:"))return null}t&&!originIndependentUrl.test(n)&&(n=resolveUrl(t,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch(e){return null}return n}const baseUrls={},justDomain=/^[^:]+:\/*[^/]*$/,protocol=/^([^:]+:)[\s\S]*$/,domain=/^([^:]+:\/*[^/]*)[\s\S]*$/;function resolveUrl(e,t){baseUrls[" "+e]||(justDomain.test(e)?baseUrls[" "+e]=e+"/":baseUrls[" "+e]=rtrim(e,"/",!0));const n=-1===(e=baseUrls[" "+e]).indexOf(":");return"//"===t.substring(0,2)?n?t:e.replace(protocol,"$1")+t:"/"===t.charAt(0)?n?t:e.replace(domain,"$1")+t:e+t}const noopTest={exec:function(){}};function merge(e){let t,n,i=1;for(;i<arguments.length;i++)for(n in t=arguments[i])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function splitCells(e,t){const n=e.replace(/\|/g,(e,t,n)=>{let i=!1,r=t;for(;--r>=0&&"\\"===n[r];)i=!i;return i?"|":" |"}).split(/ \|/);let i=0;if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;i<n.length;i++)n[i]=n[i].trim().replace(/\\\|/g,"|");return n}function rtrim(e,t,n){const i=e.length;if(0===i)return"";let r=0;for(;r<i;){const s=e.charAt(i-r-1);if(s!==t||n){if(s===t||!n)break;r++}else r++}return e.substr(0,i-r)}function findClosingBracket(e,t){if(-1===e.indexOf(t[1]))return-1;const n=e.length;let i=0,r=0;for(;r<n;r++)if("\\"===e[r])r++;else if(e[r]===t[0])i++;else if(e[r]===t[1]&&--i<0)return r;return-1}function checkSanitizeDeprecation(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}let helpers={escape:escape,unescape:unescape,edit:edit,cleanUrl:cleanUrl,resolveUrl:resolveUrl,noopTest:noopTest,merge:merge,splitCells:splitCells,rtrim:rtrim,findClosingBracket:findClosingBracket,checkSanitizeDeprecation:checkSanitizeDeprecation};const{noopTest:noopTest$1,edit:edit$1,merge:merge$1}=helpers,block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:"^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,nptable:noopTest$1,table:noopTest$1,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};block.def=edit$1(block.def).replace("label",block._label).replace("title",block._title).getRegex(),block.bullet=/(?:[*+-]|\d{1,9}\.)/,block.item=/^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/,block.item=edit$1(block.item,"gm").replace(/bull/g,block.bullet).getRegex(),block.list=edit$1(block.list).replace(/bull/g,block.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+block.def.source+")").getRegex(),block._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",block._comment=/<!--(?!-?>)[\s\S]*?-->/,block.html=edit$1(block.html,"i").replace("comment",block._comment).replace("tag",block._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),block.paragraph=edit$1(block._paragraph).replace("hr",block.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",block._tag).getRegex(),block.blockquote=edit$1(block.blockquote).replace("paragraph",block.paragraph).getRegex(),block.normal=merge$1({},block),block.gfm=merge$1({},block.normal,{nptable:"^ *([^|\\n ].*\\|.*)\\n *([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",table:"^ *\\|(.+)\\n *\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"}),block.gfm.nptable=edit$1(block.gfm.nptable).replace("hr",block.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",block._tag).getRegex(),block.gfm.table=edit$1(block.gfm.table).replace("hr",block.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",block._tag).getRegex(),block.pedantic=merge$1({},block.normal,{html:edit$1("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",block._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,fences:noopTest$1,paragraph:edit$1(block.normal._paragraph).replace("hr",block.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",block.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});const inline={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:noopTest$1,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,strong:/^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,em:/^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:noopTest$1,text:/^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/,_punctuation:"!\"#$%&'()*+,\\-./:;<=>?@\\[^_{|}~"};inline.em=edit$1(inline.em).replace(/punctuation/g,inline._punctuation).getRegex(),inline._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,inline._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,inline._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,inline.autolink=edit$1(inline.autolink).replace("scheme",inline._scheme).replace("email",inline._email).getRegex(),inline._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,inline.tag=edit$1(inline.tag).replace("comment",block._comment).replace("attribute",inline._attribute).getRegex(),inline._label=/(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,inline._href=/<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/,inline._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,inline.link=edit$1(inline.link).replace("label",inline._label).replace("href",inline._href).replace("title",inline._title).getRegex(),inline.reflink=edit$1(inline.reflink).replace("label",inline._label).getRegex(),inline.normal=merge$1({},inline),inline.pedantic=merge$1({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,link:edit$1(/^!?\[(label)\]\((.*?)\)/).replace("label",inline._label).getRegex(),reflink:edit$1(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",inline._label).getRegex()}),inline.gfm=merge$1({},inline.normal,{escape:edit$1(inline.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~+(?=\S)([\s\S]*?\S)~+/,text:/^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/}),inline.gfm.url=edit$1(inline.gfm.url,"i").replace("email",inline.gfm._extended_email).getRegex(),inline.breaks=merge$1({},inline.gfm,{br:edit$1(inline.br).replace("{2,}","*").getRegex(),text:edit$1(inline.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});let rules={block:block,inline:inline};const{defaults:defaults$1}=defaults,{block:block$1}=rules,{rtrim:rtrim$1,splitCells:splitCells$1,escape:escape$1}=helpers;let Lexer_1=class e{constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||defaults$1,this.rules=block$1.normal,this.options.pedantic?this.rules=block$1.pedantic:this.options.gfm&&(this.rules=block$1.gfm)}static get rules(){return block$1}static lex(t,n){return new e(n).lex(t)}lex(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    "),this.token(e,!0)}token(e,t){let n,i,r,s,o,l,a,c,h,p,d,g,u,m,b,k;for(e=e.replace(/^ +$/gm,"");e;)if((r=this.rules.newline.exec(e))&&(e=e.substring(r[0].length),r[0].length>1&&this.tokens.push({type:"space"})),r=this.rules.code.exec(e)){const t=this.tokens[this.tokens.length-1];e=e.substring(r[0].length),t&&"paragraph"===t.type?t.text+="\n"+r[0].trimRight():(r=r[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",codeBlockStyle:"indented",text:this.options.pedantic?r:rtrim$1(r,"\n")}))}else if(r=this.rules.fences.exec(e))e=e.substring(r[0].length),this.tokens.push({type:"code",lang:r[2]?r[2].trim():r[2],text:r[3]||""});else if(r=this.rules.heading.exec(e))e=e.substring(r[0].length),this.tokens.push({type:"heading",depth:r[1].length,text:r[2]});else if((r=this.rules.nptable.exec(e))&&(l={type:"table",header:splitCells$1(r[1].replace(/^ *| *\| *$/g,"")),align:r[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:r[3]?r[3].replace(/\n$/,"").split("\n"):[]}).header.length===l.align.length){for(e=e.substring(r[0].length),d=0;d<l.align.length;d++)/^ *-+: *$/.test(l.align[d])?l.align[d]="right":/^ *:-+: *$/.test(l.align[d])?l.align[d]="center":/^ *:-+ *$/.test(l.align[d])?l.align[d]="left":l.align[d]=null;for(d=0;d<l.cells.length;d++)l.cells[d]=splitCells$1(l.cells[d],l.header.length);this.tokens.push(l)}else if(r=this.rules.hr.exec(e))e=e.substring(r[0].length),this.tokens.push({type:"hr"});else if(r=this.rules.blockquote.exec(e))e=e.substring(r[0].length),this.tokens.push({type:"blockquote_start"}),r=r[0].replace(/^ *> ?/gm,""),this.token(r,t),this.tokens.push({type:"blockquote_end"});else if(r=this.rules.list.exec(e)){for(e=e.substring(r[0].length),a={type:"list_start",ordered:m=(s=r[2]).length>1,start:m?+s:"",loose:!1},this.tokens.push(a),c=[],n=!1,u=(r=r[0].match(this.rules.item)).length,d=0;d<u;d++)p=(l=r[d]).length,~(l=l.replace(/^ *([*+-]|\d+\.) */,"")).indexOf("\n ")&&(p-=l.length,l=this.options.pedantic?l.replace(/^ {1,4}/gm,""):l.replace(new RegExp("^ {1,"+p+"}","gm"),"")),d!==u-1&&(o=block$1.bullet.exec(r[d+1])[0],(s.length>1?1===o.length:o.length>1||this.options.smartLists&&o!==s)&&(e=r.slice(d+1).join("\n")+e,d=u-1)),i=n||/\n\n(?!\s*$)/.test(l),d!==u-1&&(n="\n"===l.charAt(l.length-1),i||(i=n)),i&&(a.loose=!0),k=void 0,(b=/^\[[ xX]\] /.test(l))&&(k=" "!==l[1],l=l.replace(/^\[[ xX]\] +/,"")),h={type:"list_item_start",task:b,checked:k,loose:i},c.push(h),this.tokens.push(h),this.token(l,!1),this.tokens.push({type:"list_item_end"});if(a.loose)for(u=c.length,d=0;d<u;d++)c[d].loose=!0;this.tokens.push({type:"list_end"})}else if(r=this.rules.html.exec(e))e=e.substring(r[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===r[1]||"script"===r[1]||"style"===r[1]),text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(r[0]):escape$1(r[0]):r[0]});else if(t&&(r=this.rules.def.exec(e)))e=e.substring(r[0].length),r[3]&&(r[3]=r[3].substring(1,r[3].length-1)),g=r[1].toLowerCase().replace(/\s+/g," "),this.tokens.links[g]||(this.tokens.links[g]={href:r[2],title:r[3]});else if((r=this.rules.table.exec(e))&&(l={type:"table",header:splitCells$1(r[1].replace(/^ *| *\| *$/g,"")),align:r[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:r[3]?r[3].replace(/\n$/,"").split("\n"):[]}).header.length===l.align.length){for(e=e.substring(r[0].length),d=0;d<l.align.length;d++)/^ *-+: *$/.test(l.align[d])?l.align[d]="right":/^ *:-+: *$/.test(l.align[d])?l.align[d]="center":/^ *:-+ *$/.test(l.align[d])?l.align[d]="left":l.align[d]=null;for(d=0;d<l.cells.length;d++)l.cells[d]=splitCells$1(l.cells[d].replace(/^ *\| *| *\| *$/g,""),l.header.length);this.tokens.push(l)}else if(r=this.rules.lheading.exec(e))e=e.substring(r[0].length),this.tokens.push({type:"heading",depth:"="===r[2].charAt(0)?1:2,text:r[1]});else if(t&&(r=this.rules.paragraph.exec(e)))e=e.substring(r[0].length),this.tokens.push({type:"paragraph",text:"\n"===r[1].charAt(r[1].length-1)?r[1].slice(0,-1):r[1]});else if(r=this.rules.text.exec(e))e=e.substring(r[0].length),this.tokens.push({type:"text",text:r[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens}};const{defaults:defaults$2}=defaults,{cleanUrl:cleanUrl$1,escape:escape$2}=helpers;let Renderer_1=class{constructor(e){this.options=e||defaults$2}code(e,t,n){const i=(t||"").match(/\S*/)[0];if(this.options.highlight){const t=this.options.highlight(e,i);null!=t&&t!==e&&(n=!0,e=t)}return i?'<pre><code class="'+this.options.langPrefix+escape$2(i,!0)+'">'+(n?e:escape$2(e,!0))+"</code></pre>\n":"<pre><code>"+(n?e:escape$2(e,!0))+"</code></pre>"}blockquote(e){return"<blockquote>\n"+e+"</blockquote>\n"}html(e){return e}heading(e,t,n,i){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+i.slug(n)+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"}hr(){return this.options.xhtml?"<hr/>\n":"<hr>\n"}list(e,t,n){const i=t?"ol":"ul";return"<"+i+(t&&1!==n?' start="'+n+'"':"")+">\n"+e+"</"+i+">\n"}listitem(e){return"<li>"+e+"</li>\n"}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(e){return"<p>"+e+"</p>\n"}table(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"}tablerow(e){return"<tr>\n"+e+"</tr>\n"}tablecell(e,t){const n=t.header?"th":"td";return(t.align?"<"+n+' align="'+t.align+'">':"<"+n+">")+e+"</"+n+">\n"}strong(e){return"<strong>"+e+"</strong>"}em(e){return"<em>"+e+"</em>"}codespan(e){return"<code>"+e+"</code>"}br(){return this.options.xhtml?"<br/>":"<br>"}del(e){return"<del>"+e+"</del>"}link(e,t,n){if(null===(e=cleanUrl$1(this.options.sanitize,this.options.baseUrl,e)))return n;let i='<a href="'+escape$2(e)+'"';return t&&(i+=' title="'+t+'"'),i+=">"+n+"</a>"}image(e,t,n){if(null===(e=cleanUrl$1(this.options.sanitize,this.options.baseUrl,e)))return n;let i='<img src="'+e+'" alt="'+n+'"';return t&&(i+=' title="'+t+'"'),i+=this.options.xhtml?"/>":">"}text(e){return e}},Slugger_1=class{constructor(){this.seen={}}slug(e){let t=e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-");if(this.seen.hasOwnProperty(t)){const e=t;do{this.seen[e]++,t=e+"-"+this.seen[e]}while(this.seen.hasOwnProperty(t))}return this.seen[t]=0,t}};const{defaults:defaults$3}=defaults,{inline:inline$1}=rules,{findClosingBracket:findClosingBracket$1,escape:escape$3}=helpers;let InlineLexer_1=class e{constructor(e,t){if(this.options=t||defaults$3,this.links=e,this.rules=inline$1.normal,this.options.renderer=this.options.renderer||new Renderer_1,this.renderer=this.options.renderer,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.pedantic?this.rules=inline$1.pedantic:this.options.gfm&&(this.options.breaks?this.rules=inline$1.breaks:this.rules=inline$1.gfm)}static get rules(){return inline$1}static output(t,n,i){return new e(n,i).output(t)}output(t){let n,i,r,s,o,l,a="";for(;t;)if(o=this.rules.escape.exec(t))t=t.substring(o[0].length),a+=escape$3(o[1]);else if(o=this.rules.tag.exec(t))!this.inLink&&/^<a /i.test(o[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(o[0])&&(this.inLink=!1),!this.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(o[0])?this.inRawBlock=!0:this.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(o[0])&&(this.inRawBlock=!1),t=t.substring(o[0].length),a+=this.renderer.html(this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):escape$3(o[0]):o[0]);else if(o=this.rules.link.exec(t)){const i=findClosingBracket$1(o[2],"()");if(i>-1){const e=(0===o[0].indexOf("!")?5:4)+o[1].length+i;o[2]=o[2].substring(0,i),o[0]=o[0].substring(0,e).trim(),o[3]=""}t=t.substring(o[0].length),this.inLink=!0,r=o[2],this.options.pedantic?(n=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r))?(r=n[1],s=n[3]):s="":s=o[3]?o[3].slice(1,-1):"",r=r.trim().replace(/^<([\s\S]*)>$/,"$1"),a+=this.outputLink(o,{href:e.escapes(r),title:e.escapes(s)}),this.inLink=!1}else if((o=this.rules.reflink.exec(t))||(o=this.rules.nolink.exec(t))){if(t=t.substring(o[0].length),n=(o[2]||o[1]).replace(/\s+/g," "),!(n=this.links[n.toLowerCase()])||!n.href){a+=o[0].charAt(0),t=o[0].substring(1)+t;continue}this.inLink=!0,a+=this.outputLink(o,n),this.inLink=!1}else if(o=this.rules.strong.exec(t))t=t.substring(o[0].length),a+=this.renderer.strong(this.output(o[4]||o[3]||o[2]||o[1]));else if(o=this.rules.em.exec(t))t=t.substring(o[0].length),a+=this.renderer.em(this.output(o[6]||o[5]||o[4]||o[3]||o[2]||o[1]));else if(o=this.rules.code.exec(t))t=t.substring(o[0].length),a+=this.renderer.codespan(escape$3(o[2].trim(),!0));else if(o=this.rules.br.exec(t))t=t.substring(o[0].length),a+=this.renderer.br();else if(o=this.rules.del.exec(t))t=t.substring(o[0].length),a+=this.renderer.del(this.output(o[1]));else if(o=this.rules.autolink.exec(t))t=t.substring(o[0].length),r="@"===o[2]?"mailto:"+(i=escape$3(this.mangle(o[1]))):i=escape$3(o[1]),a+=this.renderer.link(r,null,i);else if(this.inLink||!(o=this.rules.url.exec(t))){if(o=this.rules.text.exec(t))t=t.substring(o[0].length),this.inRawBlock?a+=this.renderer.text(this.options.sanitize?this.options.sanitizer?this.options.sanitizer(o[0]):escape$3(o[0]):o[0]):a+=this.renderer.text(escape$3(this.smartypants(o[0])));else if(t)throw new Error("Infinite loop on byte: "+t.charCodeAt(0))}else{if("@"===o[2])r="mailto:"+(i=escape$3(o[0]));else{do{l=o[0],o[0]=this.rules._backpedal.exec(o[0])[0]}while(l!==o[0]);i=escape$3(o[0]),r="www."===o[1]?"http://"+i:i}t=t.substring(o[0].length),a+=this.renderer.link(r,null,i)}return a}static escapes(t){return t?t.replace(e.rules._escapes,"$1"):t}outputLink(e,t){const n=t.href,i=t.title?escape$3(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,i,this.output(e[1])):this.renderer.image(n,i,escape$3(e[1]))}smartypants(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e}mangle(e){if(!this.options.mangle)return e;const t=e.length;let n,i="",r=0;for(;r<t;r++)n=e.charCodeAt(r),Math.random()>.5&&(n="x"+n.toString(16)),i+="&#"+n+";";return i}},TextRenderer_1=class{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}};const{defaults:defaults$4}=defaults,{merge:merge$2,unescape:unescape$1}=helpers;let Parser_1=class e{constructor(e){this.tokens=[],this.token=null,this.options=e||defaults$4,this.options.renderer=this.options.renderer||new Renderer_1,this.renderer=this.options.renderer,this.renderer.options=this.options,this.slugger=new Slugger_1}static parse(t,n){return new e(n).parse(t)}parse(e){this.inline=new InlineLexer_1(e.links,this.options),this.inlineText=new InlineLexer_1(e.links,merge$2({},this.options,{renderer:new TextRenderer_1})),this.tokens=e.reverse();let t="";for(;this.next();)t+=this.tok();return t}next(){return this.token=this.tokens.pop(),this.token}peek(){return this.tokens[this.tokens.length-1]||0}parseText(){let e=this.token.text;for(;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)}tok(){let e="";switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,unescape$1(this.inlineText.output(this.token.text)),this.slugger);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":{let t,n,i,r,s="";for(i="",t=0;t<this.token.header.length;t++)i+=this.renderer.tablecell(this.inline.output(this.token.header[t]),{header:!0,align:this.token.align[t]});for(s+=this.renderer.tablerow(i),t=0;t<this.token.cells.length;t++){for(n=this.token.cells[t],i="",r=0;r<n.length;r++)i+=this.renderer.tablecell(this.inline.output(n[r]),{header:!1,align:this.token.align[r]});e+=this.renderer.tablerow(i)}return this.renderer.table(s,e)}case"blockquote_start":for(e="";"blockquote_end"!==this.next().type;)e+=this.tok();return this.renderer.blockquote(e);case"list_start":{e="";const t=this.token.ordered,n=this.token.start;for(;"list_end"!==this.next().type;)e+=this.tok();return this.renderer.list(e,t,n)}case"list_item_start":{e="";const t=this.token.loose,n=this.token.checked,i=this.token.task;if(this.token.task)if(t)if("text"===this.peek().type){const e=this.peek();e.text=this.renderer.checkbox(n)+" "+e.text}else this.tokens.push({type:"text",text:this.renderer.checkbox(n)});else e+=this.renderer.checkbox(n);for(;"list_item_end"!==this.next().type;)e+=t||"text"!==this.token.type?this.tok():this.parseText();return this.renderer.listitem(e,i,n)}case"html":return this.renderer.html(this.token.text);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText());default:{const e='Token with "'+this.token.type+'" type was not found.';if(!this.options.silent)throw new Error(e);console.log(e)}}}};const{merge:merge$3,checkSanitizeDeprecation:checkSanitizeDeprecation$1,escape:escape$4}=helpers,{getDefaults:getDefaults,changeDefaults:changeDefaults,defaults:defaults$5}=defaults;function marked(e,t,n){if(void 0===e||null===e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if(n||"function"==typeof t){n||(n=t,t=null),t=merge$3({},marked.defaults,t||{}),checkSanitizeDeprecation$1(t);const i=t.highlight;let r,s,o=0;try{r=Lexer_1.lex(e,t)}catch(e){return n(e)}s=r.length;const l=function(e){if(e)return t.highlight=i,n(e);let s;try{s=Parser_1.parse(r,t)}catch(t){e=t}return t.highlight=i,e?n(e):n(null,s)};if(!i||i.length<3)return l();if(delete t.highlight,!s)return l();for(;o<r.length;o++)!function(e){"code"!==e.type?--s||l():i(e.text,e.lang,function(t,n){return t?l(t):null==n||n===e.text?--s||l():(e.text=n,e.escaped=!0,void(--s||l()))})}(r[o])}else try{return t=merge$3({},marked.defaults,t||{}),checkSanitizeDeprecation$1(t),Parser_1.parse(Lexer_1.lex(e,t),t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",(t||marked.defaults).silent)return"<p>An error occurred:</p><pre>"+escape$4(e.message+"",!0)+"</pre>";throw e}}marked.options=marked.setOptions=function(e){return merge$3(marked.defaults,e),changeDefaults(marked.defaults),marked},marked.getDefaults=getDefaults,marked.defaults=defaults$5,marked.Parser=Parser_1,marked.parser=Parser_1.parse,marked.Renderer=Renderer_1,marked.TextRenderer=TextRenderer_1,marked.Lexer=Lexer_1,marked.lexer=Lexer_1.lex,marked.InlineLexer=InlineLexer_1,marked.inlineLexer=InlineLexer_1.output,marked.Slugger=Slugger_1,marked.parse=marked;let marked_1=marked;class IoMdView extends IoElement{static get Style(){return"\n    :host {\n      display: block;\n      align-self: stretch;\n      justify-self: stretch;\n      flex: 1 1 auto;\n      --io-code-size: 15px;\n      padding: 0.5em 1em;\n    }\n    :host > :first-child {\n      margin-top: 0;\n    }\n    :host > :last-child {\n      margin-top: 0;\n    }\n    :host p {\n      line-height: 1.4em;\n      padding: 0 0.5em;\n    }\n    :host a {\n      text-decoration: underline;\n      color: var(--io-color-link);\n    }\n    :host h1, :host h2, :host h3, :host h4 {\n      margin: 0;\n      border: var(--io-border);\n      border-width: 0 0 var(--io-border-width) 0;\n    }\n    :host h1 {\n      padding: 0.5em 0;\n    }\n    :host h2 {\n      padding: 0.4em 0;\n    }\n    :host h3 {\n      padding: 0.3em 0;\n      border: 0;\n    }\n    :host h4 {\n      padding: 0.2em 0;\n      border: 0;\n    }\n    :host code {\n      font-family: monospace, monospace;\n      -webkit-font-smoothing: auto;\n      overflow: auto;\n      color: var(--io-color-link);\n    }\n    :host strong code {\n      background: var(--io-background-color-highlight);\n    }\n    :host pre > code {\n      background: var(--io-background-color-highlight);\n      color: inherit;\n      line-height: 1.6em;\n    }\n\n    :host code.language-html,\n    :host code.language-javascript {\n      padding: 1em;\n      display: block;\n      font-size: var(--io-code-size);\n    }\n    :host blockquote {\n      font-size: 0.85em;\n      opacity: 0.5;\n      margin: 0;\n      padding: var(--io-spacing) 0;\n    }\n    :host table  {\n      width: 100% !important;\n      border: 1px solid black;\n      border-collapse: collapse;\n      table-layout: fixed;\n    }\n    :host table td,\n    :host table tr,\n    :host table th {\n      border: 1px solid gray;\n      padding: 0.25em;\n      text-overflow: ellipsis;\n      overflow: hidden;\n    }\n    :host .videocontainer {\n        width: 100%;\n        height: 0;\n        position: relative;\n        padding-bottom: 56.25%;\n    }\n    :host .videocontainer > iframe {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n    @keyframes spinner {\n      to {transform: rotate(360deg);}\n    }\n    :host .io-loading {\n      background-image: repeating-linear-gradient(135deg, var(--io-background-color-highlight), var(--io-background-color) 3px, var(--io-background-color) 7px, var(--io-background-color-highlight) 10px) !important;\n      background-repeat: repeat;\n      position: relative;\n    }\n    :host .io-loading:after {\n      content: '';\n      box-sizing: border-box;\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      width: 40px;\n      height: 40px;\n      margin-top: -20px;\n      margin-left: -20px;\n      border-radius: 50%;\n      border: var(--io-border);\n      border-top-color: #000;\n      animation: spinner .6s linear infinite;\n    }\n    "}static get Properties(){return{path:{type:String,reflect:1},role:"document"}}onResized(){let e=this.getBoundingClientRect().width;e=Math.min((e-30)/35,15),this.style.setProperty("--io-code-size",e+"px")}parseMarkdown(e){marked_1&&(marked_1&&marked_1.setOptions({sanitize:!1,highlight:function(e){return window.hljs?window.hljs.highlightAuto(e).value:null}}),this.innerHTML=marked_1(e),this.classList.toggle("io-loading",!1),this.dispatchEvent("content-ready",{},!0))}pathChanged(){this.classList.toggle("io-loading",!0),fetch(this.path).then(e=>e.text()).then(e=>{this.parseMarkdown(e)})}}IoMdView.Register();class IoMdViewSelector extends IoSelectorSidebar{update(){this.template([this.getSlotted(),["io-md-view",{id:"content",class:"io-content",path:this._selectedID}]])}}IoMdViewSelector.Register(),"serviceWorker"in navigator||console.warn("No Service Worker support!"),"PushManager"in window||console.warn("No Push API Support!");class IoServiceLoader extends IoNode{static get Properties(){return{path:"service.js",serviceWorker:void 0,permission:window.Notification?window.Notification.permission:"default",subscription:""}}constructor(e){super(e),this.requestNotification=this.requestNotification.bind(this),"serviceWorker"in navigator&&this.init()}async init(){const e=await navigator.serviceWorker.register(this.path);e.update(),navigator.serviceWorker.addEventListener("message",this.onServiceWorkerMessage),e.active?this.serviceWorker=e:e.addEventListener("activate",()=>{this.serviceWorker=e})}serviceWorkerChanged(){"granted"===this.permission&&this.subscribe()}subscribe(){navigator.serviceWorker.controller&&navigator.serviceWorker.controller.postMessage({command:"subscribe"})}async requestNotification(){this.permission=await window.Notification.requestPermission(),"granted"===this.permission&&this.subscribe()}onServiceWorkerMessage(e){const t=JSON.parse(e.data);t.subscription&&(this.subscription=JSON.stringify(t.subscription))}}IoServiceLoader.Register();const suboptions=new Options,options=new Options([{label:"Red",icon:"❤️",options:[{value:"Red1"},{value:"Red2"},{value:"Red3"}]},{label:"Green",icon:"💚",options:[{value:"Green1"},{value:"Green2"},{value:"Green3"}]},{label:"Blue",icon:"💙",options:[{value:"Blue1"},{value:"Blue2"},{value:"Blue3"}]},{label:"Numbers",options:[{label:"one",value:1},{label:"two",value:2},{label:"three",value:3},{label:"four",value:4},{label:"five",value:5}]},{label:"Suboptions",options:suboptions}]);suboptions.push(...[{label:"Hearts",options:options},{label:"suboption one",options:options},{label:"suboption two",options:options},{label:"suboption three",options:options}]);const option=new Option({label:"Hearts",icon:"💕",hint:"colors",options:options}),words=["lorem","ipsum","dolor","sit","amet","ac","libero","vitae","magna","tellus","nisl","wisi","lacinia","curae","mauris","fusce","interdum","vestibulum","nunc","velit"],hearts=["❤️","💚","💙","💜","🧡","💔","💖","🖤","💗","💘"],longOptions=[];for(let e=0;e<100;e++){const e=words[Math.floor(20*Math.random())],t=words[Math.floor(20*Math.random())],n=words[Math.floor(20*Math.random())],i=hearts[Math.floor(10*Math.random())]||"";longOptions.push({icon:i,label:e+" "+t,value:e+" "+t,hint:n})}IoStorageFactory({key:"demo:boolean",value:!0}),IoStorageFactory({key:"demo:string",value:"Hello io!"}),IoStorageFactory({key:"demo:leet",value:1337}),IoStorageFactory({key:"demo:number",value:0}),IoStorageFactory({key:"demo:theme",value:IoThemeSingleton.bind("theme")}),IoStorageFactory({key:"demo:menuoptions",value:options}),IoStorageFactory({key:"demo:longmenuoptions",value:longOptions}),IoStorageFactory({key:"demo:menuoption",value:option}),IoStorageFactory({key:"demo:rgba",value:{r:1,g:.5,b:0,a:1}}),IoStorageFactory({key:"demo:cmyk",value:{c:0,m:0,y:0,k:0}}),IoStorageFactory({key:"demo:object",value:{number:.5,string:"hello",boolean:!0,object:{prop1:1,prop2:2},array:[0,1,2,3,4,5,6,7,8,9,10,11,12],vector2:[1,1],vector3:[1,1,1],vector4:[1,1,1,1],matrix2:[1,1,1,1],matrix3:[1,1,1,1,1,1,1,1,1],matrix4:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}}),IoStorageFactory({key:"demo:vector2",value:[0,1]});class IoElementDemo extends IoElement{static get Style(){return"\n    :host {\n      @apply --io-panel;\n      position: relative;\n    }\n    :host > io-boolicon {\n      z-index: 2;\n      position: absolute !important;\n      top: calc(calc(2 * var(--io-spacing)) + var(--io-border-width));\n      right: calc(calc(2 * var(--io-spacing)) + var(--io-border-width));\n    }\n    :host > io-boolicon:not([value]):not(:hover) {\n      opacity: 0.5;\n    }\n    :host > io-properties {\n      align-self: stretch;\n      padding: var(--io-spacing) 0;\n      margin: var(--io-border-width);\n      margin-right: var(--io-spacing);\n      margin-bottom: calc(2 * var(--io-spacing));\n    }\n    :host > io-properties > :nth-child(3) {\n      margin-right: calc(var(--io-item-height) + var(--io-spacing));\n    }\n    :host > .io-content {\n      border-radius: var(--io-border-radius);\n      border: var(--io-border);\n      border-color: var(--io-color-border-inset);\n      padding: var(--io-spacing);\n      box-shadow: var(--io-shadow-inset);\n      color: var(--io-color);\n      background-color: var(--io-background-color);\n      background-image: none;\n    }\n    :host:not([expanded]) > .io-content {\n      margin-right: calc(var(--io-item-height) + calc(3 * var(--io-spacing)));\n    }\n    "}static get Properties(){return{element:{type:String,reflect:-1},properties:{type:Object,reflect:-1,observe:!0},width:{type:String,reflect:-1},height:{type:String,reflect:-1},config:{type:Object,reflect:-1},expanded:{type:Boolean,reflect:2}}}objectMutated(e){super.objectMutated(e);for(let t=this.__observedProps.length;t--;){const n=this.__observedProps[t],i=this.__properties[n].value;if(!!this.filterObject(i,t=>t===e.detail.object)){const e=this.querySelectorAll("*");for(let t=0;t<e.length;t++)e[t].changed&&e[t].changed()}}}propertiesChanged(){for(let e in this.properties){const t=this.properties[e];"string"==typeof t&&t.startsWith("demo:")&&(this.properties[e]=IoStorageFactory({key:t}))}}changed(){const e=this.properties,t=[["io-boolicon",{value:this.bind("expanded"),true:"icons:tune",false:"icons:tune"}]];this.expanded&&t.push(["io-properties",{value:e,config:Object.assign({"type:number":["io-number",{step:1e-5}],"type:boolean":["io-switch"]},this.config)}]),t.push(["div",{class:"io-content"},[[this.element,Object.assign({id:"demo-element"},e)]]]),this.template(t),this.width&&(this.$["demo-element"].style.width=this.width),this.height&&(this.$["demo-element"].style.height=this.height),this.$["demo-element"].onResized&&this.$["demo-element"].onResized()}}IoElementDemo.Register();export{IoElementDemo,IoMdView,IoMdViewSelector,IoServiceLoader};