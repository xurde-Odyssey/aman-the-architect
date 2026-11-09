// Dependency-light preview export for environments without the full framework.
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const node = (type, props) => {
 if (typeof type === 'function') return type(props);
 const {children, ...attrs} = props || {};
 const content = (Array.isArray(children) ? children.flat(Infinity) : [children]).filter(v => v !== undefined && v !== null && typeof v !== 'boolean').join('');
 if (typeof type === 'symbol') return content;
 const attributes = Object.entries(attrs).filter(([k,v]) => !['key','ref'].includes(k) && !k.startsWith('on') && v !== undefined && v !== null && v !== false).map(([k,v]) => ` ${k === 'className' ? 'class' : k === 'fetchPriority' ? 'fetchpriority' : k}="${escape(v)}"`).join('');
 return `<${type}${attributes}>${content}${['img','input','br','meta','link','hr'].includes(type)?'':`</${type}>`}`;
};
const compiled = ts.transpileModule(fs.readFileSync('app/page.tsx','utf8'), {compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const context = {exports:{},require(name){if(name === 'react/jsx-runtime') return {jsx:node,jsxs:node,Fragment:Symbol('fragment')}; if(name === 'react') return {useState:v=>[v,()=>{}],useEffect:()=>{},useRef:()=>({current:null})};throw Error(name);}};
vm.runInNewContext(compiled,context);
const html = context.exports.default();
fs.mkdirSync('dist',{recursive:true});
fs.copyFileSync('app/globals.css','dist/style.css');
fs.cpSync('public','dist',{recursive:true});
fs.copyFileSync('scripts/preview-interactions.js','dist/interactions.js');
fs.writeFileSync('dist/index.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Aman the Architect — Where Imagination Takes Shape</title><meta name="description" content="Where Imagination Takes Shape. Architecture and interiors by Aman the Architect."><link rel="icon" href="./favicon.svg"><link rel="stylesheet" href="./style.css"></head><body>${html}<script src="./interactions.js"></script></body></html>`);
console.log('Static preview exported to dist/index.html');
