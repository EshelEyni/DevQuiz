import{G as T,r as h,b as C,c as r,j as e,g as B,e as I,f as M,m as z,F as j,a as R,h as L,i as E,d as k,k as q,_ as O,l as $,O as D}from"./index-1f2d8112.js";import{S as o}from"./Select-3229e15e.js";import{s as F}from"./config-bc6444f8.js";import{B as Q}from"./Button-6f10587e.js";import{u as H,B as P,a as G,b as V,c as _,Q as K}from"./BtnMarkQuesitonToEdit-e38c6c6a.js";import{q as W}from"./react-tooltip.min-84a1ff5c.js";import{B as J}from"./BtnCopyQuestion-03b40c40.js";function U(t){return T({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor"},child:[{tag:"path",attr:{d:"M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"}},{tag:"path",attr:{d:"M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"}}]})(t)}var X=function(t,a){var l=h.useState(null),i=l[0],s=l[1];return h.useEffect(function(){if(t.current&&typeof IntersectionObserver=="function"){var c=function(u){s(u[0])},d=new IntersectionObserver(c,a);return d.observe(t.current),function(){s(null),d.disconnect()}}return function(){}},[t.current,a.threshold,a.root,a.rootMargin]),i};const Y=X,Z=()=>{const t=C();H("Enter",x);const{programmingLanguages:a,difficultyLevels:l}=F,[i,s]=h.useState({language:"HTML",level:"beginner",searchTerm:"",Approved:{name:"All",value:void 0},Marked:{name:"All",value:void 0}}),{language:c,level:d,searchTerm:u,Approved:g,Marked:p}=i,m=[{name:"Approved only",value:!0},{name:"Remove approved",value:!1},{name:"All",value:void 0}],v=[{name:"Marked only",value:!0},{name:"Remove marked",value:!1},{name:"All",value:void 0}];function y(n){s({...i,language:n})}function w(n){s({...i,level:n})}function N(n){const b=n.target.value;s({...i,searchTerm:b})}function S(n){s({...i,Approved:n})}function f(n){s({...i,Marked:n})}function x(){t(B({language:c,level:d==="all"?void 0:d,page:1,limit:0,searchTerm:u,isMarkedToBeRevised:p.value,isRevised:g.value}))}function A(){t(I({language:c}))}return r("div",{className:"min-h-32 flex w-full flex-col items-center justify-between border-b border-gray-300 bg-gray-800 px-4 py-4 md:flex-row md:px-20",children:[r("div",{className:"flex flex-col gap-3",children:[r("div",{className:"flex flex-wrap items-center gap-3",children:[r(o,{onChange:y,children:[e(o.SelectTrigger,{className:`h-14 w-52 cursor-pointer rounded-xl \r
            bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300`,children:e("button",{type:"button",children:c})}),e(o.SelectList,{className:`z-[1500] mt-1 w-52  min-w-[100px] cursor-pointer \r
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300`,children:Object.keys(a).map(n=>e(o.SelectItem,{value:n,className:`flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl\r
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100`,children:e("span",{children:n})},n))})]}),r(o,{onChange:w,children:[e(o.SelectTrigger,{className:`h-14 w-52 cursor-pointer rounded-xl \r
            bg-gray-700 text-2xl capitalize leading-5 outline-none transition-all duration-300`,children:e("button",{type:"button",children:d})}),r(o.SelectList,{className:`z-[1500] mt-1 w-52  min-w-[100px] cursor-pointer \r
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300`,children:[l.map(n=>e(o.SelectItem,{value:n,className:`flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl\r
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100`,children:e("span",{className:"capitalize",children:n})},n)),e(o.SelectItem,{value:"all",className:`flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl\r
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100`,children:e("span",{className:"capitalize",children:"all"})})]})]}),e("input",{className:"h-14 w-96 rounded-xl bg-gray-700 px-3 text-2xl leading-5",type:"text",value:u,placeholder:"Search for a question",onChange:N})]}),r("div",{className:"flex flex-wrap items-center gap-4",children:[r(o,{onChange:S,children:[e(o.SelectTrigger,{className:`h-14 w-56 cursor-pointer rounded-xl \r
            bg-gray-700 text-2xl capitalize leading-5 outline-none transition-all duration-300`,children:e("button",{type:"button",children:g.name})}),e(o.SelectList,{className:`z-[1500] mt-1 w-56  min-w-[100px] cursor-pointer \r
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300`,children:m.map(({name:n,value:b})=>e(o.SelectItem,{value:{name:n,value:b},className:`flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl\r
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100`,children:e("span",{className:"capitalize",children:n})},n))})]}),r(o,{onChange:f,children:[e(o.SelectTrigger,{className:`h-14 w-56 cursor-pointer rounded-xl \r
            bg-gray-700 text-2xl capitalize leading-5 outline-none transition-all duration-300`,children:e("button",{type:"button",children:p.name})}),e(o.SelectList,{className:`z-[1500] mt-1 w-56  min-w-[100px] cursor-pointer \r
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300`,children:v.map(({name:n,value:b})=>e(o.SelectItem,{value:{name:n,value:b},className:`flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl\r
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100`,children:e("span",{className:"capitalize",children:n})},n))})]}),r(Q,{onClickFn:A,className:"flex items-center justify-center gap-1 whitespace-nowrap px-2.5",children:[e("span",{className:"text-2xl font-semibold",children:"Get Duplicates"}),e(U,{size:22,color:"white"})]})]})]}),e(Q,{onClickFn:x,className:"flex h-14 items-center justify-center self-end rounded-full bg-gray-700 p-10 text-2xl leading-5 text-gray-100 md:self-center",children:e("span",{className:"text-3xl capitalize",children:"search"})})]})};function ee(){const{questions:t,getQuestionsState:a,question:l,getQuestionState:i,addQuestionState:s,updateQuestionState:c,removeQuestionState:d}=M(u=>u.question);return{questions:t,getQuestionsState:a,question:l,getQuestionState:i,addQuestionState:s,updateQuestionState:c,removeQuestionState:d}}const te=({entity:t,handleBtnArchiveClick:a,color:l="#000"})=>{const i=h.useRef(z()).current;return r(j,{children:[e("button",{"data-tooltip-id":i,"data-tooltip-content":`Archive a ${t}`,"data-tooltip-place":"top",onClick:a,children:e(P,{className:"text-5xl md:text-4xl",color:l})}),e(W,{id:i,style:{fontSize:"16px"},className:"hidden md:block"})]})},ne=({question:t,bcgColor:a})=>{const{id:l,question:i,options:s,level:c,language:d,correctOption:u}=t,g=t.isMarkedToBeRevised??!1,p=C(),m=R();function v(){m(`question-edit/${l}`)}function y(){window.confirm("Are you sure you want to archive this question?")&&p(E(t))}function w(){if(!window.confirm("Are you sure you want to approve this question?"))return;const x={...t,isRevised:!0};p(k(x))}function N(){const f={...t,isMarkedToBeRevised:!g};p(k(f))}function S(){q(`Questions/${l}`),O.success("Id copied to clipboard",{style:{background:"#333",color:"#fff",fontSize:"13px",fontWeight:"600"}})}return r("li",{className:"white-box-shadow flex flex-col justify-between gap-2 overflow-auto rounded-lg p-8",style:{backgroundColor:a},children:[r("div",{children:[e("header",{className:"mb-2 flex items-center justify-between gap-2",children:r("p",{className:"cursor-pointer text-3xl font-semibold hover:underline",onClick:S,children:["Id: ",l]})}),e("div",{className:"mb-2 text-5xl font-semibold tracking-wide md:text-4xl",children:i}),e("div",{className:"ml-4 mt-4 flex flex-col gap-3 text-4xl sm:text-3xl md:text-3xl",children:s.map((f,x)=>e("div",{children:`${x+1}. ${f}`},x))})]}),r("div",{children:[r("div",{className:"mt-8 flex w-full justify-between gap-6 text-3xl font-semibold",children:[r("div",{className:"flex-1",children:[e("p",{children:"Level: "}),e("span",{children:L(c)})]}),r("div",{className:"flex-1",children:[e("p",{children:"Language: "}),e("span",{children:d})]}),r("div",{className:"group flex flex-1 flex-col items-center gap-1",children:[e("p",{children:"Correct Option:"}),e("span",{className:"opacity-0 group-hover:opacity-100",children:u+1})]})]}),r("div",{className:"flex items-center justify-end gap-4",children:[e(te,{entity:"question",handleBtnArchiveClick:y}),e(G,{isMarkedToBeRevised:g,handleBtnMarkToEditClick:N,color:"#000"}),e(V,{handleBtnEditClick:v}),e(J,{question:t,color:"#000"}),e(_,{isApproved:t.isRevised,handleBtnApproveClick:w,color:"#000"})]})]})]})};function re(){const[t,a]=h.useState(1),l=h.useRef(null),i=Y(l,{root:null,rootMargin:"0px",threshold:.1});return h.useEffect(()=>{i&&i.intersectionRatio>.1&&a(s=>s+1)},[i]),{paginationIdx:t,intersectionRef:l}}const ue=()=>{const t=C(),{questions:a,getQuestionsState:l}=ee(),{paginationIdx:i,intersectionRef:s}=re(),c=l.state==="loading",d=!c&&a.length===0,u=!c&&a.length>0,g=a.filter(m=>m.isRevised),p=Math.round(g.length/a.length*100);return h.useEffect(()=>{t(B({language:"HTML",level:"beginner",limit:0}))},[t]),r("main",{className:"flex w-screen flex-col items-center",children:[e(Z,{}),c&&e(K,{}),d&&e("h2",{className:"mt-14 text-center text-2xl font-bold",children:"No questions found.⚠️ Please try another search."}),u&&r("div",{className:"mx-auto mt-4 flex w-11/12 flex-col gap-5 pb-24 md:mt-2",children:[r("div",{className:"flex w-full flex-col flex-wrap justify-between gap-1 md:flex-row",children:[e("p",{className:"text-3xl font-semibold leading-none",children:`Number of Questions: ${a.length}`}),e("p",{className:"text-3xl font-semibold leading-none",children:`Number of Approved Questions: ${g.length}`}),r("p",{className:"text-3xl font-semibold leading-none",children:[r("em",{className:"mr-[4px]",children:[p,"%"]}),"of the questions have been approved."]})]}),e("ul",{className:"grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",children:a.slice(0,40*i).map((m,v)=>e(ne,{question:m,bcgColor:$(v)},m.id))}),e("div",{className:"h-40 w-full",ref:s})]}),e(D,{})]})};export{ue as default};