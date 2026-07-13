const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/chunk-Cgr_MpsJ2.js","assets/chunks/chunk-B3b9habr.js"])))=>i.map(i=>d[i]);
import{R as e,V as t,a as n,c as r,d as i,f as a,h as o,l as s,o as c,p as l,u}from"./chunk-DLHIaVyH.js";import{t as d}from"./chunk-B3b9habr.js";var f=n(`check`,[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]),p=n(`circle-x`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m15 9-6 6`,key:`1uzhvr`}],[`path`,{d:`m9 9 6 6`,key:`z0biqf`}]]),m=n(`copy`,[[`rect`,{width:`14`,height:`14`,x:`8`,y:`8`,rx:`2`,ry:`2`,key:`17jyea`}],[`path`,{d:`M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`,key:`zix9uf`}]]),h=n(`info`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 16v-4`,key:`1dtifu`}],[`path`,{d:`M12 8h.01`,key:`e9boi3`}]]),g=n(`triangle-alert`,[[`path`,{d:`m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,key:`wmoenq`}],[`path`,{d:`M12 9v4`,key:`juzpu7`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]]),_=t(e(),1),v=o(),y=({env:e,label:t})=>(0,v.jsxs)(`div`,{className:`flex min-w-0 items-center gap-2`,children:[e&&(0,v.jsx)(ee,{$env:e===`server`||e===`client`?e:void 0}),e&&(0,v.jsx)(x,{$env:e===`server`||e===`client`?e:void 0}),e&&(0,v.jsx)(b,{$env:e===`server`||e===`client`?e:void 0,children:e}),(0,v.jsx)(`div`,{className:`font-mono text-xs font-semibold text-base-muted`,children:t})]}),ee=a.div.variants({base:`absolute h-1 -bottom-px left-0 w-full pointer-events-none`,variants:{$env:{server:`border-info/50 border-b `,client:`border-success/50 border-b`}},defaultVariants:{$env:`server`}}),b=a.div.variants({base:`shrink-0 badge badge-sm rounded-field badge-soft border pointer-events-none`,variants:{$env:{server:`badge-info border-info`,client:`badge-success border-success`}},defaultVariants:{$env:`server`}}),x=a.div.variants({base:`absolute inset-0 opacity-5 bg-linear-to-t via-40% via-transparent pointer-events-none`,variants:{$env:{server:`from-info`,client:`from-success`}},defaultVariants:{$env:`server`}}),S=e=>e.split(`
`).map(e=>e.trimEnd()).join(`
`),C=({actionDetail:e,onCopy:t,className:n=``})=>{let[i,a]=(0,_.useState)(`idle`);return(0,v.jsx)(`button`,{type:`button`,className:l(`btn btn-ghost btn-xs h-8 min-h-8 px-2 text-base-muted hover:text-base-content`,n),"data-nivel-action":e?.action,onClick:async n=>{let i=n.currentTarget,o=await t();e&&r(i,{...e,success:o}),a(o?`success`:`error`),window.setTimeout(()=>a(`idle`),900)},"aria-label":i===`idle`?`Copy to clipboard`:i===`success`?`Copied`:`Copy failed`,children:i===`success`?(0,v.jsx)(f,{size:14}):(0,v.jsx)(m,{size:14})})},w=(0,_.createContext)(!1),T=w.Provider,te=()=>(0,_.useContext)(w),ne=()=>()=>{},re=()=>null,E=(e,t)=>{let n=i()?.codeBlockChoices,r=(0,_.useSyncExternalStore)(n?.subscribe??ne,()=>n?.getChoice(e)??null,re),[a,o]=(0,_.useState)(t);return(0,_.useEffect)(()=>{if(!n||r)return;let t=n.getLegacyChoice?.(e);t&&n.setChoice(e,t)},[e,n,r]),n?[r??t,t=>n.setChoice(e,t)]:[a,o]},ie=e=>(0,_.isValidElement)(e)&&typeof e.props?.[`data-choice-value`]==`string`,ae=e=>(0,_.isValidElement)(e)&&e.type===P,D=e=>typeof e==`string`&&e.trim()?e.trim():null,O=e=>{for(let t of _.Children.toArray(e)){if(!(0,_.isValidElement)(t))continue;let e=t.props,n=D(e[`data-code-env`]),r=D(e[`data-code-title`]),i=e[`hide-menu`]===`true`;if(r||n||i)return{env:n,hideCopy:i,title:r};let a=O(e.children);if(a.title||a.env||a.hideCopy)return a}return{env:null,hideCopy:!1,title:null}},k=e=>_.Children.toArray(e).filter(ie),A=(e,t)=>{let n=k(e);return n.find(e=>e.props[`data-choice-value`]===t)??n[0]},j=e=>{for(let t of _.Children.toArray(e)){if(ae(t))return t;if(!(0,_.isValidElement)(t))continue;let e=j(t.props.children);if(e)return e}return null},M=({choiceGroup:e,selectedChoice:t,setSelectedChoice:n})=>{let i=(0,_.useId)(),a=`${i}-label`;return(0,v.jsxs)(`label`,{className:`select select-xs min-w-28 w-fit`,htmlFor:i,children:[(0,v.jsx)(`span`,{id:a,className:`sr-only`,children:`Choose code example variant`}),(0,v.jsx)(`select`,{id:i,"aria-labelledby":a,name:`choicesFor-${e.name}`,"data-nivel-action":`code.choice_change`,value:t,onChange:t=>{let i=t.currentTarget.value;n(i),r(t.currentTarget,{action:`code.choice_change`,choice:i,choiceGroup:e.name,component:`code-choice-group`})},children:e.choices.map(t=>(0,v.jsx)(`option`,{value:t,disabled:e.disabled.includes(t),children:t},t))})]})},N=({activeCodeBlockMeta:e,body:t,choices:n,copyChoice:r,copyChoiceGroup:i,headerLabel:a})=>{let o=(0,_.useRef)(null);return(0,v.jsxs)(`div`,{"data-choice-group-outer":!0,"data-nivel-component":`code-choice-group`,className:`my-6 flex h-full min-w-0 max-w-full flex-col overflow-hidden rounded-box border border-base-muted-light`,children:[(0,v.jsxs)(`div`,{className:`not-prose flex min-h-10 items-center relative justify-between gap-3 border-b border-base-muted-light bg-base-muted-superlight px-4`,"data-choice-group-header":!0,children:[(0,v.jsx)(y,{label:a,env:e.env}),(0,v.jsxs)(`div`,{className:`flex items-center gap-1`,children:[n,!e.hideCopy&&(0,v.jsx)(C,{actionDetail:{action:`code.copy`,choice:r,choiceGroup:i,component:`code-choice-group`,env:e.env,label:a},onCopy:async()=>{let e=S(o.current?.textContent??``);try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}})]})]}),(0,v.jsx)(`div`,{ref:o,className:`h-full min-w-0 max-w-full flex-1 bg-base-200! [&>*:first-child]:mt-0 [&>*:last-child]:mb-0`,children:(0,v.jsx)(T,{value:!0,children:t})})]})},oe=({activeOuterChoice:e,nestedChoiceGroup:t,outerChoiceGroup:n,outerSelect:r})=>{let[i,a]=E(t.props.choiceGroup.name,t.props.choiceGroup.default),o=A(t.props.children,i);if(!o)return(0,v.jsx)(v.Fragment,{children:e.props.children});let s=O(o.props.children),c=e.props[`data-choice-value`]??``,l=(o.props[`data-choice-value`]??``).toLowerCase(),u=s.title?`${s.title} / ${l}`:`${c} - ${l}`;return(0,v.jsx)(N,{activeCodeBlockMeta:s,body:o.props.children,choices:(0,v.jsxs)(v.Fragment,{children:[r,(0,v.jsx)(M,{choiceGroup:t.props.choiceGroup,selectedChoice:o.props[`data-choice-value`]??``,setSelectedChoice:a})]}),copyChoice:o.props[`data-choice-value`]??null,copyChoiceGroup:`${n.name}+${t.props.choiceGroup.name}`,headerLabel:u})},P=({children:e,choiceGroup:t,hide:n=!1})=>{let[r,i]=E(t.name,t.default),a=A(e,r);if(!a)return(0,v.jsx)(v.Fragment,{children:e});if(n)return(0,v.jsx)(v.Fragment,{children:a.props.children});let o=a.props[`data-choice-value`]??``,s=(0,v.jsx)(M,{choiceGroup:t,selectedChoice:o,setSelectedChoice:i}),c=j(a.props.children);if(c&&!c.props.hide)return(0,v.jsx)(oe,{activeOuterChoice:a,nestedChoiceGroup:c,outerChoiceGroup:t,outerSelect:s});let l=O(a.props.children),u=l.title??o;return(0,v.jsx)(N,{activeCodeBlockMeta:l,body:a.props.children,choices:s,copyChoice:o||null,copyChoiceGroup:t.name,headerLabel:u})},se=({children:e,lineBreak:t})=>(0,v.jsx)(`div`,{className:`with-line-break_${t}`,children:e}),ce=({children:e})=>(0,v.jsx)(`div`,{className:`doc-code-file-state doc-code-file-added`,children:e}),le=({children:e})=>(0,v.jsx)(`div`,{className:`doc-code-file-state doc-code-file-removed`,children:e}),F=null,I=`nivel-mermaid-svg`,L=`nivel-mermaid`,R=e=>`
#${e}.${I} {
  font-family: var(--font-sans);
}

#${e} .node rect,
#${e} .node circle,
#${e} .node ellipse,
#${e} .node polygon,
#${e} .node path {
  fill: var(--nivel-mermaid-node-fill, var(--color-primary-muted-superlight));
  stroke: var(--nivel-mermaid-node-stroke, var(--color-primary-muted-medium));
  stroke-width: var(--nivel-mermaid-node-stroke-width, 1px);
}

#${e} .node .label,
#${e} .node .label text,
#${e} .nodeLabel,
#${e} .nodeLabel *,
#${e} .cluster-label text,
#${e} .label text {
  background-color: transparent;
  fill: transparent;
  color: var(--nivel-mermaid-node-text, var(--color-base-content));
}

#${e} .edgeLabel,
#${e} .edgeLabel *,
#${e} .edgeLabel span,
#${e} .edgeLabel p {
  background-color: var(--nivel-mermaid-edge-label-fill, var(--color-base-100));
  color: var(--nivel-mermaid-edge-label-text, var(--nivel-mermaid-node-text, var(--color-base-content)));
}

#${e} .edgePath .path,
#${e} .flowchart-link,
#${e} .relationshipLine,
#${e} .messageLine0,
#${e} .messageLine1 {
  stroke: var(--nivel-mermaid-line-color, var(--color-primary-muted));
  stroke-width: var(--nivel-mermaid-line-width, 1.5px);
}

#${e} marker path,
#${e} .marker {
  fill: var(--nivel-mermaid-line-color, var(--color-primary-muted));
  stroke: var(--nivel-mermaid-line-color, var(--color-primary-muted));
}

#${e} .cluster rect {
  fill: var(--nivel-mermaid-cluster-fill, var(--color-base-100));
  stroke: var(--nivel-mermaid-cluster-stroke, var(--color-primary-muted-light));
  stroke-width: var(--nivel-mermaid-cluster-stroke-width, 1px);
}
`,z=async()=>(F??=d(()=>import(`./chunk-Cgr_MpsJ2.js`),__vite__mapDeps([0,1])),F),B=(e,t)=>e.replace(/<svg\b([^>]*?)>/,(e,t)=>{let n=t.match(/\sclass="([^"]*)"/);if(n){let e=`${n[1]} ${I}`.trim();return`<svg${t.replace(/\sclass="([^"]*)"/,` class="${e}"`)} data-mermaid-graphic="">`}return`<svg${t} class="${I}" data-mermaid-graphic="">`}).replace(`</svg>`,`<style>${R(t)}</style></svg>`),V=({source:e})=>(0,v.jsx)(`pre`,{className:`sr-only`,"data-mermaid-source":``,children:(0,v.jsx)(`code`,{children:e})}),H=({className:e,source:t})=>{let[n,r]=(0,_.useState)(null),[i,a]=(0,_.useState)(null),o=(0,_.useId)();return(0,_.useEffect)(()=>{let e=!0;return(async()=>{try{let{renderMermaidSvg:n}=await z(),i=await n(`nivel-mermaid-${o}`,t);if(!e)return;r(B(i,`nivel-mermaid-${o}`)),a(null)}catch(t){if(!e)return;let n=t instanceof Error?t.message:`Failed to render Mermaid diagram.`;a(n),r(null)}})(),()=>{e=!1}},[o,t]),i?(0,v.jsxs)(`div`,{className:l(L,`space-y-3`,e),"data-mermaid-diagram":``,"data-mermaid-status":`error`,children:[(0,v.jsx)(`div`,{className:`rounded-box border border-error/30 bg-error/8 px-4 py-3 text-sm text-error`,children:i}),(0,v.jsx)(`pre`,{className:`doc-code-pre m-0 overflow-x-auto bg-base-200! p-4 text-sm`,children:(0,v.jsx)(`code`,{children:t})})]}):n?(0,v.jsxs)(`div`,{className:l(L,`overflow-x-auto bg-base-200 px-3 py-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full`,e),"data-mermaid-diagram":``,"data-mermaid-status":`ready`,children:[(0,v.jsx)(`div`,{dangerouslySetInnerHTML:{__html:n}}),(0,v.jsx)(V,{source:t})]}):(0,v.jsxs)(`div`,{className:l(L,`space-y-3`,e),"data-mermaid-diagram":``,"data-mermaid-status":`loading`,children:[(0,v.jsxs)(`div`,{className:`px-4 py-10 text-center text-sm flex gap-2 items-center justify-center`,children:[(0,v.jsx)(`span`,{className:`loading loading-spinner loading-md`}),`Rendering diagram...`]}),(0,v.jsx)(V,{source:t})]})},U=e=>typeof e==`string`&&e.trim()?e.trim():null,W=e=>{let t=_.Children.toArray(e)[0];if(!(0,_.isValidElement)(t))return null;let n=t.props,r=U(n[`data-language`]);if(r)return r;let i=(typeof n.className==`string`?n.className.split(/\s+/):[]).find(e=>e.startsWith(`language-`));return i?i.slice(9):null},ue=e=>{let t=U(e[`data-language-label`]);if(t)return t;let n=U(e[`data-language`])??W(e.children);return n?n.toUpperCase():`CODE`},G=e=>typeof e==`string`||typeof e==`number`?String(e):Array.isArray(e)?e.map(e=>G(e)).join(``):(0,_.isValidElement)(e)?G(e.props.children):``,de=({children:e,className:t,...n})=>{let r=(0,_.useRef)(null),i=te(),a=U(n[`data-language`])??W(e),o=U(n[`data-code-title`])??ue({...n,children:e,"data-language":a??void 0}),s=U(n[`data-code-env`]),c=n[`file-added`]?`added`:n[`file-removed`]?`removed`:null,u=n[`hide-menu`]===`true`,d=a===`mermaid`&&n.render===`true`,f=S(G(e)),p=u||i?null:(0,v.jsx)(C,{actionDetail:{action:`code.copy`,component:`code-block`,env:s,label:o,language:a},onCopy:async()=>{let e=d?f:S(r.current?.textContent??``);try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}});return(0,v.jsxs)(`div`,{className:l(`group relative h-full min-w-0 max-w-full not-prose overflow-hidden`,i?``:`rounded-box border border-base-muted-light`,t),"data-code-block-frame":``,"data-file-state":c??void 0,"data-nivel-component":`code-block`,children:[!i&&(0,v.jsxs)(`div`,{className:`flex min-h-10 relative items-center justify-between gap-3 border-b border-base-muted-light bg-base-muted-superlight! px-4`,"data-code-block-header":``,children:[(0,v.jsx)(y,{label:o,env:s}),p]}),d?(0,v.jsx)(H,{className:`min-w-0`,source:f}):(0,v.jsx)(`pre`,{...n,ref:r,className:l(`doc-code-pre m-0 h-full min-w-0 max-w-full overflow-x-auto bg-base-200! p-4 text-sm`,t),"data-code-block-content":``,children:e})]})},fe={info:h,warning:g,error:p,success:f},K=({type:e=`info`,heading:t,children:n,icon:r=!0})=>{let i=r===!0?fe[e]:typeof r==`object`?()=>(0,v.jsx)(v.Fragment,{children:r}):null,a={info:`text-info`,warning:`text-warning`,error:`text-error`,success:`text-success`}[e];return(0,v.jsxs)(pe,{$variant:e,children:[!!t&&i&&(0,v.jsxs)(`div`,{className:`mb-3 flex items-center gap-2`,children:[(0,v.jsx)(i,{className:l(a,`float-left h-5 w-5`)}),(0,v.jsx)(q,{children:t})]}),!(t&&i)&&!!t&&(0,v.jsx)(q,{children:t}),!(t&&i)&&i&&(0,v.jsx)(`div`,{className:l(a,`float-left mr-2`),children:(0,v.jsx)(i,{className:`mt-1 h-5 w-5`})}),n]})},pe=a.section.variants({base:`
    p-4
    my-6
    border
    rounded-lg
    prose-p:last:mb-0
    prose-p:mt-0
    prose-headings:first:mt-0
    prose-headings:last:mb-0
    prose-ul:first:mt-0
    prose-ul:last:mb-0
    text-sm
  `,variants:{$variant:{info:`bg-info/10 border-info/30`,warning:`bg-warning/10 border-warning/30`,error:`bg-error/10 border-error/25`,success:`bg-success/10 border-success/35`}},defaultVariants:{$variant:`info`}}),q=a.header`
  font-bold
  text-base
`;function J(e,t){if(!e)throw Error(`[UniversalMdxMods][Wrong Usage] ${t}`)}var me=e=>{let t=[],n;for(let r of e.split(``)){if(r==="`"){n?.nodeType===`code`?(t.push(n),n=void 0):(n&&t.push(n),n={nodeType:`code`,content:``});continue}n??={nodeType:`text`,content:``},n.content+=r}return n&&t.push(n),(0,v.jsx)(v.Fragment,{children:t.map((e,t)=>e.nodeType===`code`?(0,v.jsx)(`code`,{children:e.content},t):(0,v.jsx)(`span`,{children:e.content},t))})},he=e=>{let t=e.split(`#`)[1];return t?t.split(`:~:text`)[0]?.split(`-`).map((e,t)=>t===0?`${e[0]?.toUpperCase()??``}${e.slice(1)}`:e).join(` `):null},ge=e=>!e.startsWith(`/`)&&!e.startsWith(`#`)&&!s(e)&&!e.startsWith(`./`)&&!e.startsWith(`../`),Y=e=>typeof e==`string`?me(e):e,_e=({isCurrentPage:e,breadcrumb:t,noBreadcrumb:n,sectionTitle:r,title:i})=>{let a=[];return t&&a.push(...t.map(e=>Y(e))),i&&a.push(Y(i)),r&&a.push(Y(r)),n||e?a[a.length-1]??null:(0,v.jsx)(v.Fragment,{children:a.map((e,t)=>(0,v.jsxs)(`span`,{children:[t>0?` > `:null,e]},t))})},X=({href:e,text:t,noBreadcrumb:n,doNotInferSectionTitle:r,noWarning:a,children:o,className:u,...d})=>{let f=i();if(typeof e!=`string`||e===``)return(0,v.jsx)(`a`,{className:l(u,`inline-flex gap-1 items-center`),...d,children:t??o??`LINK-TARGET-NOT-FOUND`});J(e.startsWith(`/`)||e.startsWith(`#`)||s(e)||ge(e),`<Link href /> prop \`href==='${e}'\` but should be external, docs-relative, or start with '/' or '#'`),J(!t||!o,"Cannot use both `text` or `children`");let p=t??o,m=f?.resolveDocLink?.({href:e,doNotInferSectionTitle:r,noWarning:a}),h=m?.href??f?.localizeHref?.(e)??c(e),g=m?.sectionTitle??(r?null:he(e)),_=p??(m?_e({breadcrumb:m.breadcrumb,isCurrentPage:m.isCurrentPage,noBreadcrumb:n,sectionTitle:g??void 0,title:m.title}):s(e)?e:g??`LINK-TARGET-NOT-FOUND`);return(0,v.jsx)(`a`,{href:h,className:l(u,``),...d,children:_})},ve=e=>typeof e==`object`&&!!e&&`dividerText`in e,ye=(e,t)=>{if(!e)throw Error(`[UniversalMdxMods][Wrong Usage] ${t}`)},be=e=>{let t=[],n={items:[]},r=()=>{n.items.length>0&&t.push(n)};for(let t of e){if(ve(t)){r(),n={dividerText:t.dividerText,items:[]};continue}n.items.push(t)}return r(),t},xe=({href:e,title:t,excerpt:n})=>(0,v.jsxs)(Se,{href:c(e),children:[(0,v.jsx)(`span`,{className:`text-lg font-semibold text-base-content`,children:u(t)}),n?(0,v.jsx)(`p`,{className:`text-sm leading-relaxed text-base-muted`,children:u(n)}):null]}),Se=a.a`
    flex h-full flex-col gap-3 
    rounded-box border 
    border-base-muted-light hover:border-primary-muted
    hover:bg-primary-muted-superlight 
    no-underline transition-colors 
    shadow shadow-transparent hover:shadow-primary-muted-light
    p-5
  `,Z=(e,t)=>e.map(e=>{if(typeof e!=`string`)return e;let n=t?.(e);return ye(n,`Overview item "${e}" requires runtime.resolveOverviewItem(). Pass { title, href, excerpt } manually when no resolver is available.`),n}),Q=({items:e})=>{let t=be(Z(e,i()?.resolveOverviewItem));return t.length===0?null:(0,v.jsx)(`div`,{className:`prose-headings:my-0 prose-p:my-0 my-5 flex flex-col gap-8`,children:t.map((e,t)=>(0,v.jsxs)(`section`,{className:`flex flex-col gap-4`,children:[e.dividerText?(0,v.jsx)(`p`,{className:`text-sm font-semibold uppercase tracking-wide`,children:u(e.dividerText)}):null,(0,v.jsx)(`div`,{className:`grid gap-3 sm:grid-cols-2`,children:e.items.map((e,t)=>(0,_.createElement)(xe,{...e,key:e.href||t}))})]},t))})},Ce=({repo:e,timestamp:t})=>{if(!e||e.split(`/`).length!==2)throw Error(`Invalid repo`);return(0,v.jsxs)(`span`,{className:`inline-flex items-center gap-1`,children:[(0,v.jsx)(`span`,{className:`bg-white font-mono font-bold h-fit px-1 text-sm!`,children:t}),(0,v.jsxs)(`a`,{href:`https://github.com/${e}`,target:`_blank`,rel:`noopener`,children:[`GitHub > `,(0,v.jsx)(`code`,{children:e})]})]})},we=({size:e=`md`,data:t})=>(0,v.jsx)($,{children:(0,v.jsxs)(Ee,{$size:e,children:[(0,v.jsx)(`thead`,{className:`overflow-hidden rounded-t-box bg-base-200`,children:(0,v.jsx)(`tr`,{children:t.headers.map((e,t)=>(0,v.jsx)(`th`,{children:e},t))})}),(0,v.jsx)(`tbody`,{children:t.rows.map((e,t)=>(0,v.jsx)(`tr`,{children:e.map((e,t)=>(0,v.jsx)(`td`,{children:e},t))},t))})]})}),Te=({className:e,...t})=>(0,v.jsx)($,{children:(0,v.jsx)(`table`,{className:l(`
            table
            w-full
            min-w-[48rem]
            text-sm
            [&_code]:whitespace-nowrap
            [&_td]:align-top
            [&_td]:bg-base-200
            [&_td]:p-3
            [&_td]:[overflow-wrap:normal]
            [&_td]:[word-break:normal]
            [&_th]:align-top
            [&_th]:bg-base-muted-superlight
            [&_th]:font-semibold
            [&_th]:p-3
            [&_th]:[overflow-wrap:normal]
            [&_th]:[word-break:normal]
            [&_thead]:border-base-muted-light
            [&_tr]:border-base-muted-light
          `,e),...t})}),$=a.div`
  not-prose 
  my-8 
  max-w-full overflow-x-auto 
  rounded-box shadow
`,Ee=a.table.variants({base:`
    table
    w-full
    min-w-[44rem]
    table-zebra
    [&_td]:[overflow-wrap:normal]
    [&_td]:[word-break:normal]
    [&_th]:[overflow-wrap:normal]
    [&_th]:[word-break:normal]
  `,variants:{$size:{sm:`table-sm`,md:`table-md`,lg:`table-lg`}},defaultVariants:{$size:`md`}}),De=e=>({Alert:K,Link:X,RepoLink:Ce,Table:we,Overview:Q,ChoiceGroup:P,CodeBlockTransformer:se,FileAdded:ce,FileRemoved:le,pre:de,table:Te,...e});export{Q as i,K as n,X as r,De as t};