import{r as l,m as u,c as f,F as m,j as n,n as x,i as b,_ as C}from"./index-1c6b5466.js";import{q as g}from"./useKey-c4fb738a.js";const h=({question:e})=>{const i=l.useRef(u()).current;function r(){if(!e)return;const a=Object.entries(e).reduce((t,[o,s])=>{if(o==="question")return t+`${o}: ${s}
`;if(o==="options"){const p=s.map((c,d)=>`Option ${d+1}: ${c}`);return t+p.join(`
`)+`
`}return t},"");b(a),C.success("Question copied to clipboard",{style:{background:"#333",color:"#fff",fontSize:"13px",fontWeight:"600"}})}return f(m,{children:[n("button",{"data-tooltip-id":i,"data-tooltip-content":"Copy question to clipboard","data-tooltip-place":"top",onClick:r,children:n(x,{className:"text-5xl md:text-4xl"})}),n(g,{id:i,style:{fontSize:"16px"},className:"hidden md:block"})]})};export{h as B};
