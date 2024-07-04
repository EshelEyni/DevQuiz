import{a as N,b as d,N as B,r as p,m,c as s,F as u,j as t,K as b,I as x,$ as C,G as f,a0 as z,a1 as y,a2 as A,a3 as O}from"./index-b677ce40.js";import{B as w,d as R,a as g}from"./index.esm-c30e2d26.js";import{q as v}from"./useKey-d2f25f82.js";import{M as r}from"./Modal-0d2870c2.js";import{B as k}from"./Button-80749557.js";const q=({questionId:e})=>{const a=N(),l=d(),{isTimerOn:c}=B(),n=p.useRef(m()).current;function i(){c&&l(b(!1)),a(`question-edit/${e}`)}return s(u,{children:[t("button",{"data-tooltip-id":n,"data-tooltip-content":"Edit a question","data-tooltip-place":"top",onClick:i,children:t(w,{className:"text-5xl md:text-4xl"})}),t(v,{id:n,style:{fontSize:"16px"},className:"hidden md:block"})]})},Q=({question:e,setQuestionStatus:a,isToggled:l})=>{const c=d(),n=p.useRef(m()).current;function i(){const h={...e,isArchived:!e.isArchived};c(x(h,"archive")),a&&h.isArchived&&a("archived")}function o(){c(C(e)),a&&a("archived")}return l?t(k,{onClickFn:i,children:e.isArchived?t(R,{className:"text-5xl md:text-4xl"}):t(g,{className:"text-5xl md:text-4xl"})}):s(r,{children:[t(r.OpenBtn,{modalName:"archiveModal",children:t("button",{"data-tooltip-id":n,"data-tooltip-content":"Archive question","data-tooltip-place":"top",children:t(g,{className:"text-5xl md:text-4xl"})})}),t(v,{id:n,style:{fontSize:"16px"},className:"hidden md:block"}),s(r.Window,{name:"archiveModal",className:"fixed left-1/2 top-1/2 z-[150] flex min-w-[300px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-12 overflow-auto rounded-lg bg-gray-800 p-8 shadow-lg",children:[t("h3",{className:"text-center text-4xl font-semibold text-gray-200 md:text-3xl",children:"Are you sure you want to archive this question?"}),s("div",{className:"flex items-center gap-4",children:[t(r.CloseBtn,{className:"rounded-full bg-gray-600 px-5 py-3 text-lg font-medium uppercase text-gray-200 transition-all hover:scale-105",children:t("button",{children:"Cancel"})}),t(r.CloseBtn,{className:"rounded-full bg-gray-600 px-5 py-3 text-lg font-medium uppercase text-gray-200 transition-all hover:scale-105",onClickFn:o,children:t("button",{children:"archive"})})]})]})]})};function H(e){return f({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm376 116c-119.3 0-216 96.7-216 216s96.7 216 216 216 216-96.7 216-216-96.7-216-216-216zm107.5 323.5C750.8 868.2 712.6 884 672 884s-78.8-15.8-107.5-44.5C535.8 810.8 520 772.6 520 732s15.8-78.8 44.5-107.5C593.2 595.8 631.4 580 672 580s78.8 15.8 107.5 44.5C808.2 653.2 824 691.4 824 732s-15.8 78.8-44.5 107.5zM761 656h-44.3c-2.6 0-5 1.2-6.5 3.3l-63.5 87.8-23.1-31.9a7.92 7.92 0 0 0-6.5-3.3H573c-6.5 0-10.3 7.4-6.5 12.7l73.8 102.1c3.2 4.4 9.7 4.4 12.9 0l114.2-158c3.9-5.3.1-12.7-6.4-12.7zM440 852H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"}}]})(e)}function T(e){return f({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z"}}]})(e)}const $=({question:e,setQuestionStatus:a})=>{const l=d(),c=p.useRef(m()).current,{isRevised:n}=e;function i(){const o={...e,isRevised:!n};l(x(o,"approve")),o.isRevised&&(a==null||a("approved"))}return s(u,{children:[t("button",{onClick:i,"data-tooltip-id":c,"data-tooltip-content":n?"Remove approval":"Approve question","data-tooltip-place":"top",children:n?t(H,{className:"text-5xl md:text-4xl"}):t(T,{className:"text-5xl md:text-4xl"})}),t(v,{id:c,style:{fontSize:"16px"},className:"hidden md:block"})]})},D=({question:e,setQuestionStatus:a})=>{const l=d(),c=p.useRef(m()).current,{isMarkedToBeRevised:n}=e;function i(){const o={...e,isMarkedToBeRevised:!e.isMarkedToBeRevised};l(x(o,"mark")),o.isMarkedToBeRevised&&(a==null||a("marked"))}return s(u,{children:[t("button",{onClick:i,"data-tooltip-id":c,"data-tooltip-content":n?"Unmark question to be revised":"Mark question to be revised","data-tooltip-place":"top",children:n?t(z,{className:"text-5xl md:text-4xl"}):t(y,{className:"text-5xl md:text-4xl"})}),t(v,{id:c,style:{fontSize:"16px"},className:"hidden md:block"})]})};function I(e){return f({tag:"svg",attr:{viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"desc",attr:{},child:[]},{tag:"path",attr:{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}},{tag:"path",attr:{d:"M3 17h2.397a5 5 0 0 0 4.096 -2.133l.177 -.253m3.66 -5.227l.177 -.254a5 5 0 0 1 4.096 -2.133h3.397"}},{tag:"path",attr:{d:"M18 4l3 3l-3 3"}},{tag:"path",attr:{d:"M3 7h2.397a5 5 0 0 1 4.096 2.133l4.014 5.734a5 5 0 0 0 4.096 2.133h3.397"}},{tag:"path",attr:{d:"M18 20l3 -3l-3 -3"}}]})(e)}const G=({question:e})=>{const a=d();function l(){const{options:c,correctOption:n}=e,i=c.slice(),o=i[n];i.splice(n,1),i.sort(()=>Math.random()-.5),i.splice(Math.floor(Math.random()*(i.length+1)),0,o);const h=i.indexOf(o),M={...e,options:i,correctOption:h};a(x(M))}return t(k,{onClickFn:l,children:t(I,{className:"text-5xl md:text-4xl"})})};const W=()=>t("div",{className:"question-loader-container",children:s("div",{className:"question-loader-inner-container",children:[t("span",{className:"maginifying-glass-handle"}),t("div",{className:"center",children:t("div",{className:"wrap",children:t("div",{className:"box",children:A.map((e,a)=>t("div",{className:"code-file-icon-container",children:t(O,{className:"code-file-icon",color:e})},a))})})})]})});export{Q as B,W as Q,G as a,D as b,q as c,$ as d};