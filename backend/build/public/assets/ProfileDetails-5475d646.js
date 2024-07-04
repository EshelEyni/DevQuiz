import{j as e,r as u,v as O,c as s,u as Q,a as H,b as R,k as T,a5 as V,L as E,H as $,F as W,a6 as U,a7 as G,t as J}from"./index-b677ce40.js";import{B as k}from"./Button-80749557.js";import{u as v}from"./user.service-aa4bc03b.js";import{S as w}from"./Select-f2c32f0d.js";import{M as p}from"./Modal-0d2870c2.js";import{E as j}from"./ErrMsg-3315a070.js";import{u as K}from"./index.esm-dc58bfc8.js";import"./useOutsideClick-d3376fb3.js";const X=({percentage:n,themeColor:l})=>{const c=`radial-gradient(closest-side,  rgb(71 85 99) 80%, transparent 81%),
  conic-gradient(${l} ${n>100?100:n}%, rgb(241 245 249) 0)`;return e("div",{className:"relative my-auto flex h-40 w-40 items-center justify-center",children:e("div",{className:"h-full w-full rounded-full",style:{background:c}})})};function L({answerCount:n,questionCount:l}){return n/l*100}const Y=({answerLanguage:n,answerCount:l,questionCount:c,onRestart:o})=>{const[a,h]=u.useState("total"),[m,x]=u.useState(L({answerCount:l.total,questionCount:c.total})),{themeColor:y}=O.programmingLanguages[n].themeColors;function d(i){h(i),x(L({answerCount:l[i],questionCount:c[i]}))}async function N(){o({language:n,level:a==="total"?void 0:a})}return s("div",{className:"flex min-h-[26rem] w-full flex-col items-center overflow-hidden rounded-md bg-gray-600 pt-4",children:[e(X,{percentage:m,themeColor:y}),s("h3",{className:"my-auto text-4xl font-medium md:text-3xl",children:[l[a],"/",c[a]]}),s(p,{children:[e(p.OpenBtn,{modalName:"restart",className:`my-auto flex h-12 w-44 \r
          cursor-pointer items-center justify-center rounded-xl border border-gray-800 bg-gray-700 text-2xl font-semibold capitalize leading-5 text-gray-100 outline-none transition-all duration-300`,children:e("span",{children:"restart"})}),s(p.Window,{name:"restart",className:"fixed left-1/2 top-1/2 z-[500] flex max-w-[320px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-lg bg-gray-600 p-8 text-gray-100 shadow-xl",children:[e("p",{className:"text-2xl font-semibold",children:"Are you sure you want to restart?"}),e("p",{className:"text-md mt-4 max-w-[200px] font-medium",children:"This will reset all your progress, and bring you questions you have already answered."}),s("div",{className:"mt-8 flex items-center gap-4",children:[e(p.CloseBtn,{className:"rounded-full bg-gray-800 px-5 py-3 text-lg font-medium uppercase",children:e("button",{children:"cancel"})}),e(p.CloseBtn,{className:"rounded-full bg-gray-800 px-5 py-3 text-lg font-medium uppercase",onClickFn:N,children:e("button",{children:"restart"})})]})]})]}),s(w,{onChange:d,children:[e(w.SelectTrigger,{className:`my-auto h-12 w-44 cursor-pointer rounded-xl \r
            border border-gray-800 bg-gray-700 text-2xl capitalize leading-5 outline-none transition-all duration-300`,children:e("button",{type:"button",children:a})}),e(w.SelectList,{className:`z-[1500] mt-1 w-44  min-w-[100px] cursor-pointer \r
            border-2  border-gray-800 bg-gray-700 text-2xl leading-5 outline-none transition-all duration-300`,children:Object.keys(l).map(i=>e(w.SelectItem,{value:i,className:`flex h-12 w-full min-w-[100px]  cursor-pointer items-center justify-center border-b-2 border-gray-800 bg-gray-700 text-2xl\r
                    text-gray-100 hover:border-gray-900 hover:bg-gray-950 hover:text-gray-100`,children:e("span",{className:"capitalize",children:i})},i))})]}),e("div",{className:"mt-auto flex h-14 w-full items-center justify-center bg-gray-900",children:e("span",{className:"text-[1.8rem] font-bold tracking-wide text-gray-100",children:n})})]})},le=()=>{const n=Q(),l=H(),c=R(),{loggedInUser:o}=T(),[a,h]=u.useState(null),[m,x]=u.useState(!1),[y,d]=u.useState(V),N=y.state==="succeeded"&&a&&!m,i=y.state==="loading",{id:F}=n,b=o&&o.id===F,{register:C,handleSubmit:q,formState:{errors:S}}=K({}),B=[{onClickFn:P,text:"Logout"},{onClickFn:I,text:m?"Stats":"Edit"}];async function z(){try{d(r=>({...r,state:"loading"}));const t=await v.getUserStats();h(t),d(r=>({...r,state:"succeeded"}))}catch(t){const r=U(t);d(g=>({...g,state:"failed",error:r}))}}u.useEffect(()=>{!b||a||z()},[b,a]);function P(){c(G()),l("/home")}function I(){x(t=>!t)}async function M({language:t,level:r}){try{d(f=>({...f,state:"loading"})),await v.removeUserCorrectAnswers({language:t,level:r});const g=await v.getUserStats();h(g),d(f=>({...f,state:"succeeded"}))}catch(g){const f=U(g);d(D=>({...D,state:"failed",error:f}))}}function A(t){o&&(c(J({...o,...t})),x(!1))}return s("main",{className:"flex min-h-[250px] w-screen flex-col items-center overflow-hidden px-8 pb-24",children:[!b&&e(E,{className:"mt-52"}),b&&s("div",{className:"mt-5 flex w-full flex-col items-center gap-6 md:w-4/5",children:[s($,{className:"flex w-full flex-col gap-4",children:[e("h1",{className:"text-4xl font-semibold tracking-wider",children:o.username}),e("div",{className:"flex items-center gap-3 self-start",children:B.map((t,r)=>e(k,{onClickFn:t.onClickFn,className:"transform rounded-full bg-gray-800 px-6 py-4 text-3xl font-semibold uppercase transition-all duration-300 ease-in-out hover:scale-105",children:t.text},r))})]}),m&&s("form",{onSubmit:q(A),className:"mt-10 flex flex-col items-center gap-4 rounded-xl bg-gray-600 p-6",children:[e("input",{...C("username",{required:"Username is required"}),placeholder:"Username",className:"text-md w-64 transform rounded-full bg-gray-800 p-3 font-semibold uppercase transition-all duration-300 ease-in-out hover:scale-105",defaultValue:o.username||""}),S.username&&e(j,{msg:S.username.message}),e("input",{...C("email",{required:"Email is required",pattern:{value:/\S+@\S+\.\S+/,message:"Entered value does not match email format"}}),placeholder:"Email",className:"text-md w-64 transform rounded-full bg-gray-800 p-3 font-semibold uppercase transition-all duration-300 ease-in-out hover:scale-105",defaultValue:o.email||""}),S.email&&e(j,{msg:S.email.message}),e(k,{type:"submit",className:"text-md mt-5 w-20 transform rounded-full bg-gray-800 p-3 font-semibold uppercase transition-all duration-300 ease-in-out hover:scale-105",children:"Save"})]}),s("ul",{className:"stats-list",children:[i&&e(E,{className:"mt-10 self-center"}),N&&e(W,{children:Object.entries(a.answersCount).map(([t,r])=>e(Y,{answerLanguage:t,answerCount:r,questionCount:a.questionsCount[t],onRestart:M},t))})]})]})]})};export{le as default};