import{b as A,o as N,r as p,p as T,c as m,j as e,s as S,m as V,F as R,M as Y,t as G,a as J,v as q,w as j,x as X,y as Z,z as ee,A as te,d as F,B as ne,C as I,H as se,O as re}from"./index-ed169895.js";import{B as b,c as B}from"./Button-87cb0513.js";import{u as x,q as ie}from"./useKey-6a533cc7.js";import{a as oe,c as ae,b as ce,B as le,Q as ue}from"./BtnMarkQuesitonToEdit-38a3a87c.js";import{u as de}from"./user.service-f1ee5120.js";import{s as fe}from"./config-c3e48a03.js";import{E as me}from"./ErrMsg-8775ee6e.js";import"./Modal-f0ec1844.js";import"./useOutsideClick-f4ca44bf.js";const xe=()=>{const s=A(),{language:t,numQuestions:o}=N(),[r,u]=p.useState(!1);x("Enter",d),x("ArrowDown",l),x("ArrowUp",c);function d(){s(T("active"))}function c(){u(!1)}function l(){u(!0)}return m("div",{className:"flex flex-1 flex-col items-center gap-3 px-3",children:[e("h2",{className:"w-full text-center text-4xl font-bold text-gray-50",children:`Welcome to The ${t} Quiz!`}),e("h3",{className:"w-full text-center text-xl font-bold text-gray-50 ",children:`${o} question to test your ${t} mastery`}),e(b,{onClickFn:d,className:B("mt-10 rounded-full bg-gray-600 px-8 py-6 text-3xl font-medium uppercase text-gray-100 transition-all duration-300",{"scale-110 bg-gray-800 text-gray-200":r}),children:"Let's start"})]})},pe=()=>{const{numQuestions:s,questionIdx:t,points:o,maxPossiblePoints:r,answerIdx:u}=N();return m("div",{className:"mb-16 grid grid-cols-2 gap-5 text-2xl",children:[e("progress",{value:t+ +(u!==null),max:s,className:"quiz-progress-bar col-span-full h-4 w-full"}),m("p",{children:["Question ",e("strong",{children:t+1}),"/",s]}),m("p",{className:"justify-self-end text-end",children:["Points ",e("strong",{children:o}),"/",r]})]})},ge=()=>{const s=A(),{questions:t,isTimerOn:o,secondsPerQuestion:r}=N(),[u,d]=p.useState(t.length*r),c=p.useRef(null),l=Math.floor(u/60),h=u%60;function g(){c.current&&clearInterval(c.current)}return p.useEffect(()=>(s(S(!0)),()=>{s(S(!1))}),[s]),p.useEffect(()=>{function y(){c.current=setInterval(()=>{d(n=>n===0?(s(T("finished")),n):n-1)},1e3)}return o?y():g(),()=>{g()}},[o,s]),e("div",{className:"col-start-1 row-start-1 flex h-16 items-center justify-center justify-self-start rounded-[100px] border-2 border-gray-200 px-8 text-3xl text-gray-200",children:m("span",{children:[l<10&&"0",l,":",h<10&&"0",h]})})},he=()=>{const s=A(),{isTimerOn:t}=N();function o(){s(S(!t))}const r=p.useRef(V()).current;return m(R,{children:[e("button",{onClick:o,"data-tooltip-id":r,"data-tooltip-content":"Toggle timer","data-tooltip-place":"top",children:t?e(Y,{color:"#f1f3f5",className:"text-5xl md:text-4xl"}):e(G,{color:"#f1f3f5",className:"text-5xl md:text-4xl"})}),e(ie,{id:r,style:{fontSize:"16px"},className:"hidden md:block"})]})},z=p.createContext(void 0);function we({children:s}){const t=A(),o=J(),{loggedInUser:r}=q(),{questions:u,questionIdx:d,numQuestions:c,answerIdx:l,points:h,highScore:g,isTimerOn:y}=N(),[n,f]=p.useState(""),a=u[d],w=r==null?void 0:r.roles.includes("admin"),k=l!==null,Q=d===c-1;x("Enter",H,{},[n]),x("ArrowRight",M,{},[n]),x("ArrowLeft",P,{},[n]),x("ArrowUp",L,{},[l,n]),x("ArrowDown",$,{},[l,n]),x("e",U),x("a",W,{},[w,a.isRevised]),x("m",_,{},[w,a==null?void 0:a.isMarkedToBeRevised]),x("t",D,{},[y]);function M(){f("next")}function P(){f("quit")}function L(){if(l)return;let i="";if(n==="")i="option-1";else if(n.includes("option")){const v=Number(n.split("-")[1]);v===1?i=`option-${c+1}`:i=`option-${v-1}`}else n?i=`option-${c+1}`:i="option-1";f(i)}function $(){if(l)return;let i="";if(n.includes("option")){const v=Number(n.split("-")[1]);v===c+1?i="option-1":i=`option-${v+1}`}else i="option-1";f(i)}function H(){if(n==="next")O();else if(n==="quit")C();else if(n.includes("option")){const i=Number(n.split("-")[1]);E(i-1)}f("")}function C(){t(j())}function E(i){t(X(i)),a.correctOption===i&&(t(Z(a.points)),r&&de.recordUserCorrectAnswer(a))}function O(){if(l===null)return;d>=0&&d<c-1?t(ee()):Q&&(t(T("finished")),h>g&&t(te(h)))}function D(){t(S(!y))}function U(){w&&(t(S(!1)),o(`question-edit/${a.id}`))}function W(){if(!w)return;const i={...a,isRevised:!a.isRevised};t(F(i))}function _(){if(!w)return;const i=a.isMarkedToBeRevised??!1,v={...a,isMarkedToBeRevised:!i};t(F(v))}p.useEffect(()=>{function i(){n!==""&&f("")}return document.addEventListener("mousemove",i),()=>{document.removeEventListener("mousemove",i)}},[n]);const K={focusedBtn:n,question:a,isNextBtnShown:k,isLastQuestionIdx:Q,onPassQuestion:O,handleQuitClick:C,onOptionSelection:E};return e(z.Provider,{value:K,children:s})}function ye(){const s=p.useContext(z);if(s===void 0)throw new Error("useQuestion must be used within a QuestionProvider");return s}const ve=()=>{const{loggedInUser:s}=q(),t=s==null?void 0:s.roles.includes("admin"),{focusedBtn:o,question:r,isNextBtnShown:u,isLastQuestionIdx:d,onPassQuestion:c,handleQuitClick:l,onOptionSelection:h}=ye(),{answerIdx:g}=N();return r?m("section",{className:"w-full max-w-[575px] px-14",children:[e(pe,{}),m("div",{children:[e("div",{className:"question-header",children:e("h4",{className:"mb-16 text-4xl font-bold text-gray-50 md:text-3xl",children:r.question})}),e("ul",{className:"mb-4 flex flex-col gap-4",children:r.options.map((y,n)=>{const f=g!==null,a=g===n,w=f&&r.correctOption===n;return e(b,{className:B("option-display w-full cursor-pointer rounded-full bg-gray-600 px-10 py-5 text-left text-3xl transition-all duration-300",{"translate-x-10":a,correct:w,wrong:f&&!w,"translate-x-5 !bg-gray-800 text-gray-200":o===`option-${n+1}`,"!cursor-not-allowed":g!==null}),onClickFn:()=>h(n),disabled:f,children:y},n)})})]}),m(ne,{className:"grid grid-cols-2 grid-rows-2	items-center gap-4",children:[e(ge,{}),u&&e(b,{onClickFn:c,className:B("col-start-2 row-start-1 flex h-20 items-center justify-center justify-self-end rounded-full bg-gray-600 px-7 text-4xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",{"scale-110 bg-gray-800 text-gray-200":o==="next"}),children:e("span",{children:d?"Finish":"Next"})}),e(b,{onClickFn:l,className:B("col-start-1 row-start-2 flex h-20 items-center justify-center justify-self-start rounded-full bg-gray-600 px-7 text-4xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",{"scale-110 bg-gray-800 text-gray-200":o==="quit"}),children:e("span",{children:"Quit"})}),t&&m("div",{className:"col-start-2 row-start-2 flex  items-center justify-center gap-3 justify-self-end",children:[e(he,{}),e(oe,{question:r}),e(ae,{question:r}),e(ce,{questionId:r.id}),e(le,{question:r})]})]})]}):null},Ne=()=>{const s=A(),{language:t,level:o,page:r,points:u,maxPossiblePoints:d,highScore:c,numQuestions:l}=N(),h=u/d*100,[g,y]=p.useState("none"),n=p.useRef("none");let f;h===100?f="🥳":h>=80?f="😎":h>=60?f="🙂":f="😞";function a(){s(I({language:t,level:o,page:r+1,limit:l}))}function w(){s(j())}x("ArrowRight",()=>{y(Q=>"restart")}),x("ArrowLeft",()=>{y(Q=>"newQuiz")}),x("Enter",()=>{const Q=n.current;Q==="newQuiz"?a():Q==="restart"&&w()});function k(){y(Q=>"none")}return p.useEffect(()=>(document.addEventListener("mousemove",k),()=>{document.removeEventListener("mousemove",k)}),[]),p.useEffect(()=>{n.current=g},[g]),m("section",{className:"flex flex-col items-center gap-12 px-4",children:[m("p",{className:"rounded-full px-6 py-8 text-center text-4xl font-medium",style:{background:"var(--color-theme)"},children:[e("span",{className:"mr-[4px] text-4xl",children:f}),"You scored ",e("strong",{children:u})," out of"," ",e("strong",{children:d})," points. (",Math.ceil(h),"%)"]}),m("p",{className:"text-center text-3xl",children:["(Highscore: ",c," points)"]}),m("div",{className:"flex items-center justify-center gap-5",children:[e(b,{className:B("cursor-pointer rounded-full bg-gray-600 px-10 py-7 text-3xl font-medium text-gray-100 transition-all duration-300",{"scale-110 bg-gray-800 text-gray-200":g==="newQuiz"}),onClickFn:a,children:"Start New Quiz"}),e(b,{className:B("cursor-pointer rounded-full bg-gray-600 px-10 py-7 text-3xl font-medium text-gray-100 transition-all duration-300",{"scale-110 bg-gray-800 text-gray-200":g==="restart"}),onClickFn:w,children:"Restart"})]})]})},Qe=()=>{const{language:s}=N(),t=fe.programmingLanguages[s];if(!t)return null;const{img:o}=t;return m(se,{className:"mb-12 mt-6 flex w-full items-center justify-center gap-5 px-10",children:[e("h1",{className:"text-6xl font-bold text-gray-50",children:"DevQuiz"}),e("img",{src:o,alt:"logo",className:"h-20 w-20 object-contain"})]})},be=({children:s,className:t})=>e("main",{className:t,children:s}),Re=()=>{const s=A(),{status:t,language:o,level:r,page:u,questions:d}=N();function c(l){switch(l){case"loading":return e(ue,{});case"error":return e(me,{msg:"There was an error fetching questions. Please try again later."});case"ready":return e(xe,{});case"active":return e(we,{children:e(ve,{})});case"finished":return e(Ne,{});default:return e(R,{})}}return p.useEffect(()=>{d.length>0||s(I({language:o,level:r,page:u}))},[]),m(be,{className:"flex w-full flex-1 flex-col items-center pb-24",children:[e(Qe,{}),c(t),e(re,{})]})};export{Re as default};
