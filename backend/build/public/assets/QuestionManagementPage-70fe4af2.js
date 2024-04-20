import{r as f,G as R,u as Q,b as T,g as j,c as A,a as n,j as e,s as F,d as S,e as P,_ as I,f as $,h as B,i as D,F as L,k as q,l as G,m as U,n as W,O as V}from"./index-6de6e250.js";import{S as i}from"./Select-f84e2bd5.js";import{B as N,c as Z}from"./Button-7d124a9b.js";import{u as C,Q as _}from"./QuestionEdit-aa47bd12.js";import{u as H,B as K}from"./useKey-53223bcf.js";import{I as J}from"./InputNumber-c9477ef0.js";import{B as X,a as Y,b as ee,c as te,d as ne,Q as re}from"./QuestionLoader-8de8254b.js";import"./useOutsideClick-3309492b.js";import"./Modal-99950cef.js";var ae=function(a,o){var s=f.useState(null),t=s[0],r=s[1];return f.useEffect(function(){if(a.current&&typeof IntersectionObserver=="function"){var u=function(g){r(g[0])},d=new IntersectionObserver(u,o);return d.observe(a.current),function(){r(null),d.disconnect()}}return function(){}},[a.current,o.threshold,o.root,o.rootMargin]),t};const le=ae;function O(a){return R({tag:"svg",attr:{version:"1.1",viewBox:"0 0 17 17"},child:[{tag:"g",attr:{},child:[]},{tag:"path",attr:{d:"M12.497 0h-6.497v2.010h1v-1.010h5v4h4v8h-4.017v1h5.017v-9.818l-4.503-4.182zM13 1.832l2.335 2.168h-2.335v-2.168zM0 3v14h11v-9.818l-4.503-4.182h-6.497zM7 4.832l2.335 2.168h-2.335v-2.168zM1 16v-12h5v4h4v8h-9z"}}]})(a)}const se=()=>{const a=Q(),{loggedInUser:o}=T(),{programmingLanguages:s,difficultyLevels:t}=F,{filterBy:r}=C(),{language:u,level:d,searchTerm:g,approved:b,marked:v}=r,p=[{name:"Approved only",value:!0},{name:"Remove approved",value:!1},{name:"All",value:void 0}],x=[{name:"Marked only",value:!0},{name:"Remove marked",value:!1},{name:"All",value:void 0}];H("Enter",z,{},[r]);function y(l){a(S({...r,language:l}))}function c(l){a(S({...r,level:l}))}function h(l){const w=l.target.value;a(S({...r,searchTerm:w}))}function m(l){a(S({...r,approved:l}))}function k(l){a(S({...r,marked:l}))}function z(){const l={language:u,page:1,limit:0,searchTerm:g,isMarkedToBeRevised:v.value,isRevised:b.value,isManagePage:!0};d&&d!=="all"&&(l.level=d),a(j(l)),o&&a(A({...o,searchSettings:r}))}function E(){a(P({language:u}))}return n("div",{className:"min-h-32 flex w-full flex-col items-center justify-between border-b border-gray-300 bg-gray-800 px-4 py-4 md:flex-row md:px-20",children:[n("div",{className:"flex flex-col gap-3",children:[n("div",{className:"flex flex-wrap items-center gap-3",children:[n(i,{onChange:y,children:[e(i.SelectTrigger,{className:`h-14 w-52 cursor-pointer rounded-xl \r
            bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300`,children:e("button",{type:"button",children:u})}),e(i.SelectList,{className:`z-[1500] mt-1 w-52  min-w-[100px] cursor-pointer \r
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300`,children:Object.keys(s).map(l=>e(i.SelectItem,{value:l,className:`flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl\r
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100`,children:e("span",{children:l})},l))})]}),n(i,{onChange:c,children:[e(i.SelectTrigger,{className:`h-14 w-52 cursor-pointer rounded-xl \r
            bg-gray-700 text-2xl capitalize leading-5 outline-none transition-all duration-300`,children:e("button",{type:"button",children:d})}),n(i.SelectList,{className:`z-[1500] mt-1 w-52  min-w-[100px] cursor-pointer \r
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300`,children:[t.map(l=>e(i.SelectItem,{value:l,className:`flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl\r
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100`,children:e("span",{className:"capitalize",children:l})},l)),e(i.SelectItem,{value:"all",className:`flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl\r
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100`,children:e("span",{className:"capitalize",children:"all"})})]})]}),e("input",{className:"h-14 w-96 rounded-xl bg-gray-700 px-3 text-2xl leading-5",type:"text",value:g,placeholder:"Search for a question",onChange:h})]}),n("div",{className:"flex flex-wrap items-center gap-4",children:[n(i,{onChange:m,children:[e(i.SelectTrigger,{className:`h-14 w-56 cursor-pointer rounded-xl \r
            bg-gray-700 text-2xl capitalize leading-5 outline-none transition-all duration-300`,children:e("button",{type:"button",children:b.name})}),e(i.SelectList,{className:`z-[1500] mt-1 w-56  min-w-[100px] cursor-pointer \r
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300`,children:p.map(({name:l,value:w})=>e(i.SelectItem,{value:{name:l,value:w},className:`flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl\r
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100`,children:e("span",{className:"capitalize",children:l})},l))})]}),n(i,{onChange:k,children:[e(i.SelectTrigger,{className:`h-14 w-56 cursor-pointer rounded-xl \r
            bg-gray-700 text-2xl capitalize leading-5 outline-none transition-all duration-300`,children:e("button",{type:"button",children:v.name})}),e(i.SelectList,{className:`z-[1500] mt-1 w-56  min-w-[100px] cursor-pointer \r
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300`,children:x.map(({name:l,value:w})=>e(i.SelectItem,{value:{name:l,value:w},className:`flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl\r
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100`,children:e("span",{className:"capitalize",children:l})},l))})]}),n(N,{onClickFn:E,className:"flex items-center justify-center gap-3 whitespace-nowrap px-2.5",children:[e("span",{className:"text-2xl font-semibold",children:"Get Duplicates"}),e(O,{size:20,color:"white"})]})]})]}),e(N,{onClickFn:z,className:"flex h-14 items-center justify-center self-end rounded-full bg-gray-700 p-10 text-2xl leading-5 text-gray-100 md:self-center",children:e("span",{className:"text-3xl capitalize",children:"search"})})]})};function ie(){const{editState:a}=C(),{archiveCount:o,approveCount:s,markCount:t}=a;f.useEffect(()=>{const r=o+s+t,d=[o,s,t].filter(g=>g>0).length>=2;r<=0||I(n("div",{className:"flex flex-col gap-2 bg-[#333] text-xl capitalize",children:[s>0&&n("p",{children:[s," questions approved"]}),t>0&&n("p",{children:[t," questions marked"]}),o>0&&n("p",{children:[o," questions archived"]}),d&&n("p",{children:[r," Total"]})]}),{style:{background:"#333",color:"#fff",fontSize:"13px",fontWeight:"600"},duration:2e3})},[o,s,t])}const oe=({question:a,bcgColor:o})=>{const s=Q(),[t,r]=f.useState(""),{id:u,question:d,options:g,level:b,language:v,correctOption:p}=a;function x(){B(`Questions/${u}`),I.success("Id copied to clipboard",{style:{background:"#333",color:"#fff",fontSize:"13px",fontWeight:"600"}})}function y(){s(D(u))}function c(){r("")}return n("li",{className:"white-box-shadow relative flex flex-col justify-between gap-2 overflow-auto rounded-lg p-8",style:{backgroundColor:o},children:[t&&e("div",{className:"absolute right-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black bg-opacity-60 p-2",onClick:c,children:e("p",{className:"text-5xl font-semibold capitalize text-gray-100 shadow-xl",children:t})}),n("div",{children:[e("header",{className:"mb-2 flex items-center justify-between gap-2",children:n("p",{className:"cursor-pointer text-3xl font-semibold hover:underline",onClick:x,children:["Id: ",u]})}),e("div",{className:"mb-2 text-5xl font-semibold tracking-wide md:text-4xl",children:d}),e("div",{className:"ml-4 mt-4 flex flex-col gap-3 text-4xl sm:text-3xl md:text-3xl",children:g.map((h,m)=>e("div",{children:`${m+1}. ${h}`},m))})]}),n("div",{children:[n("div",{className:"mb-3 mt-8 flex w-full justify-between gap-6 text-2xl font-semibold",children:[n("div",{className:"flex-1",children:[e("p",{children:"Level: "}),e("span",{children:$(b)})]}),n("div",{className:"flex-1",children:[e("p",{children:"Language: "}),e("span",{children:v})]}),n("div",{className:"group flex flex-1 flex-col items-center gap-1",children:[e("p",{children:"Correct Option:"}),e("span",{className:"opacity-0 group-hover:opacity-100",children:p+1})]})]}),n("div",{className:"flex items-center justify-end gap-4",children:[e(X,{question:a,setQuestionStatus:r,isToggled:!0}),e(Y,{question:a}),e(ee,{question:a,setQuestionStatus:r}),e(te,{questionId:a.id}),e(K,{question:a}),e(ne,{question:a,setQuestionStatus:r}),e(N,{onClickFn:y,className:"flex items-center justify-center gap-3 whitespace-nowrap px-2.5",children:e(O,{size:20,color:"#000"})})]})]})]})};function ce(){const[a,o]=f.useState(1),s=f.useRef(null),t=le(s,{root:null,rootMargin:"0px",threshold:.1});return f.useEffect(()=>{t&&t.intersectionRatio>.1&&o(r=>r+1)},[t]),{paginationIdx:a,intersectionRef:s}}const M=({noResMsg:a="No questions found.⚠️ Please try another search."})=>{const{paginationIdx:o,intersectionRef:s}=ce(),{questions:t,getQuestionsState:r}=C(),u=t.filter(p=>p.isRevised),d=Math.round(u.length/t.length*100),g=r.state==="succeeded"&&t.length===0,b=r.state!=="loading"&&t.length>0;function v(){const p=t.map((x,y)=>`${y+1}. ${x.question}
`).join("");B(p),I.success("Questions copied to clipboard",{style:{background:"#333",color:"#fff",fontSize:"13px",fontWeight:"600"}})}return n(L,{children:[r.state==="loading"&&e(re,{}),r.state==="failed"&&n("div",{children:[e("h2",{className:"mt-14 text-center text-3xl font-bold",children:"Something went wrong. Please try again later."}),r.error&&e("p",{className:"mt-4 text-center text-2xl",children:r.error})]}),g&&e("h2",{className:"mt-14 text-center text-2xl font-bold",children:a}),b&&n("div",{className:"mx-auto mt-4 flex w-11/12 flex-col gap-5 pb-24 md:mt-2",children:[n("div",{className:"flex w-full flex-col flex-wrap justify-between gap-1 md:flex-row",children:[n("div",{className:"flex items-center gap-2",children:[e("p",{className:"text-3xl font-semibold leading-none",children:`Number of Questions: ${t.length}`}),e(N,{onClickFn:v,children:e(q,{className:"text-5xl md:text-4xl"})})]}),e("p",{className:"text-3xl font-semibold leading-none",children:`Number of Approved Questions: ${u.length}`}),n("p",{className:"text-3xl font-semibold leading-none",children:[n("em",{className:"mr-[4px]",children:[d,"%"]}),"of the questions have been approved."]})]}),e("ul",{className:"grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",children:t.slice(0,40*o).map((p,x)=>e(oe,{question:p,bcgColor:G(x)},`${p.id}-${x+1}`))}),e("div",{className:"h-40 w-full",ref:s})]})]})},de=()=>{const a=Q(),[o,s]=f.useState(!1),[t,r]=f.useState({prompt:"",language:"HTML",level:"beginner",numberOfQuestions:5}),{programmingLanguages:u,difficultyLevels:d}=F;function g(c){r({...t,language:c})}function b(c){r({...t,level:c})}function v(c){const h=c.target.value;r({...t,prompt:h})}function p(c){const h=Number(c.target.value),m=h>90?90:h;r({...t,numberOfQuestions:m})}function x(c){const h=t.numberOfQuestions+c;let m=0;h<1?m=1:h>90?m=90:m=h,r({...t,numberOfQuestions:m})}function y(){const{prompt:c,language:h,level:m,numberOfQuestions:k}=t;a(W({prompt:c,language:h,level:m,numberOfQuestions:k})),s(!0)}return f.useEffect(()=>{a(U([]))},[a]),n("div",{className:"flex w-full flex-col gap-4 rounded-lg",children:[n("div",{className:"flex w-full flex-wrap items-center justify-end gap-4 border-b-2 border-gray-950 bg-gray-800 p-4 sm:!justify-between",children:[n("div",{className:"flex flex-wrap items-center gap-4",children:[e("textarea",{className:"h-14 w-[350px] rounded-xl bg-gray-700 p-5 text-2xl leading-5 text-gray-100 outline-none",placeholder:"Enter a prompt",value:t.prompt,onChange:v}),n(i,{onChange:g,children:[e(i.SelectTrigger,{className:`h-14 w-52 cursor-pointer rounded-xl \r
            bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300`,children:e("button",{type:"button",children:t.language})}),e(i.SelectList,{className:`z-[1500] mt-1 w-52  min-w-[100px] cursor-pointer \r
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300`,children:Object.keys(u).map(c=>e(i.SelectItem,{value:c,className:`flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl\r
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100`,children:e("span",{children:c})},c))})]}),n(i,{onChange:b,children:[e(i.SelectTrigger,{className:`h-14 w-52 cursor-pointer rounded-xl \r
            bg-gray-700 text-2xl capitalize leading-5 outline-none transition-all duration-300`,children:e("button",{type:"button",children:t.level})}),n(i.SelectList,{className:`z-[1500] mt-1 w-52  min-w-[100px] cursor-pointer \r
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300`,children:[d.map(c=>e(i.SelectItem,{value:c,className:`flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl\r
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100`,children:e("span",{className:"capitalize",children:c})},c)),e(i.SelectItem,{value:"all",className:`flex h-14 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl\r
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100`,children:e("span",{className:"capitalize",children:"all"})})]})]}),n("div",{className:"flex flex-col gap-1 p-1",children:[e("h2",{className:"text-3xl font-medium text-gray-200",children:"Number of Questions"}),e(J,{handleChange:p,updateNumber:x,value:t.numberOfQuestions,max:90,name:"secondsPerQuestion",className:"self-center"})]})]}),e(N,{className:"rounded-full bg-gray-700 px-10 py-4 text-3xl font-medium text-gray-100",onClickFn:y,children:"Fetch"})]}),!o&&e("h2",{className:"mt-4 text-center text-3xl font-bold",children:"Fetch questions from OpenAI"}),o&&e(M,{})]})},ye=()=>{ie();const a=Q(),{loggedInUser:o}=T(),{filterBy:s}=C(),[t,r]=f.useState("search"),u=[{name:"Search",value:"search"},{name:"Add",value:"add"},{name:"Fetch",value:"fetch"}];return f.useEffect(()=>{if(t!=="search"||!o)return;const d={language:s.language,page:1,limit:0,searchTerm:s.searchTerm,isMarkedToBeRevised:s.marked.value,isRevised:s.approved.value,isManagePage:!0};s.level&&s.level!=="all"&&(d.level=s.level),a(j(d))},[a,t,o]),n("main",{className:"flex w-screen flex-1 flex-col items-center",children:[e("div",{className:"flex w-full justify-center gap-4 bg-gray-800 p-3",children:u.map((d,g)=>e(N,{onClickFn:()=>r(d.value),className:Z("rounded-md px-6 py-4 text-3xl font-bold",t===d.value?"bg-blue-500 text-white":"bg-gray-200 text-gray-800"),children:d.name},g))}),t==="search"&&n(L,{children:[e(se,{}),e(M,{})]}),t==="add"&&e(_,{isNested:!1,setFilterBy:r}),t==="fetch"&&e(de,{}),e(V,{})]})};export{ye as default};