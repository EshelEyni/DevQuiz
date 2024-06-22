import{r as u,j as e,u as v,a,F as h,s as w,b as f,m as j,c as S,d as A,g as L,L as D,e as T}from"./index-08896f59.js";import{B as E,c as C,M as F}from"./Button-d50fc63f.js";import{u as N}from"./useJobApplication-9bb0fb82.js";import{B as k,a as B,b as M,c as V}from"./index.esm-86fbe9fb.js";import{M as x}from"./Modal-bc2e0c18.js";import"./useOutsideClick-f1a79b4c.js";const b=u.createContext(void 0),n=({children:t})=>{const[l,i]=u.useState(!1),s={isEditing:l,setIsEditing:i};return e(b.Provider,{value:s,children:t})},I=({children:t,className:l})=>{const{isEditing:i,setIsEditing:s}=u.useContext(b);let r=0;function o(){s(!0)}function m(){const d=new Date().getTime(),c=d-r;c<300&&c>0&&s(!0),r=d}return i?null:u.cloneElement(t,{onDoubleClick:o,onTouchEnd:m,className:l})},J=({children:t,onChange:l,className:i})=>{const{isEditing:s}=u.useContext(b);return s?u.cloneElement(t,{onChange:l,className:i}):null},P=({children:t,onSubmit:l,className:i})=>{const{isEditing:s,setIsEditing:r}=u.useContext(b);function o(){l(),r(!1)}return s?u.cloneElement(t,{onClick:o,className:i}):null},z=({children:t,className:l})=>{const{isEditing:i,setIsEditing:s}=u.useContext(b);function r(){s(!0)}return i?null:u.cloneElement(t,{onClick:r,className:l})};n.DisplayElement=I;n.EditElement=J;n.SaveButton=P;n.EditButton=z;const G=({contact:t})=>{const{application:l}=N(),i=v();function s(m){if(!l)return;const d=m.target.name,c=m.target.value,p={...l,contacts:l.contacts.map(g=>g.name===t.name?{...g,[d]:c}:g)};i(w(p))}function r(){l&&i(f(l))}function o(){if(!l)return;const m={...l,contacts:l.contacts.filter(d=>d.name!==t.name)};i(f(m))}return a("div",{className:"flex w-full flex-col gap-3 rounded-3xl border p-3",children:[a("div",{className:"flex items-center justify-between gap-4",children:[e("h3",{className:"text-2xl font-bold",children:"Contact"}),a(x,{children:[e(x.OpenBtn,{modalName:"archiveModal",children:e("button",{children:e(k,{className:"text-3xl md:text-4xl"})})}),a(x.Window,{name:"archiveModal",className:"fixed left-1/2 top-1/2 z-[1500] flex max-w-[320px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-lg bg-gray-600 p-8 text-gray-100 shadow-xl",children:[e("h3",{className:"text-3xl font-semibold text-gray-200 md:text-3xl",children:"Are you sure you want to remove this contact?"}),a("div",{className:"mt-2 flex items-center gap-4",children:[e(x.CloseBtn,{className:"rounded-full bg-gray-600 px-5 py-3 text-lg font-medium uppercase text-gray-200 transition-all hover:scale-105",children:e("button",{children:"Cancel"})}),e(x.CloseBtn,{className:"rounded-full bg-gray-600 px-5 py-3 text-lg font-medium uppercase text-gray-200 transition-all hover:scale-105",onClickFn:o,children:e("button",{children:"remove"})})]})]})]})]}),a(n,{children:[e(n.DisplayElement,{className:"text-3xl text-white",children:e("div",{children:t.name||"Name"})}),a("div",{className:"flex items-center gap-4",children:[e(n.EditElement,{onChange:s,className:"w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none",children:e("input",{type:"text",defaultValue:t.name,name:"name"})}),e(n.SaveButton,{onSubmit:r,className:"flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",children:e("div",{children:e(h,{})})})]})]}),a(n,{children:[e(n.DisplayElement,{className:"text-3xl text-white",children:e("div",{children:t.email||"Email"})}),a("div",{className:"flex items-center gap-4",children:[e(n.EditElement,{onChange:s,className:"w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none",children:e("input",{type:"text",defaultValue:t.email,name:"email",placeholder:"Email"})}),e(n.SaveButton,{onSubmit:r,className:"flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",children:e("div",{children:e(h,{})})})]})]}),a(n,{children:[a("div",{className:"flex flex-wrap items-center gap-4",children:[e(n.DisplayElement,{className:"overflow-hidden text-3xl text-blue-400 hover:underline",children:e("a",{href:t.url,target:"_blank",rel:"noreferrer",children:t.url||"Link"})}),e(n.EditButton,{className:"cursor-pointer text-4xl",children:e("div",{children:e(B,{})})})]}),a("div",{className:"flex items-center gap-4",children:[e(n.EditElement,{onChange:s,className:"w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none",children:e("input",{type:"text",defaultValue:t.url,name:"url",placeholder:"Link"})}),e(n.SaveButton,{onSubmit:r,className:"flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",children:e("div",{children:e(h,{})})})]})]})]})},O=()=>{const{application:t}=N(),l=v();function i(){if(!t)return;const r={name:"name",url:"link",email:"email"},o={...t,contacts:[...t.contacts,r]};l(f(o))}if(!t)return null;const{contacts:s}=t;return a("div",{children:[e("h3",{className:"mb-4 text-2xl  font-bold",children:"Contacts"}),a("div",{className:"flex w-full flex-wrap justify-center gap-2",children:[s.map((r,o)=>e(G,{contact:r},o)),e(E,{onClickFn:i,className:"flex h-20 items-center justify-center gap-2 self-center justify-self-start rounded-full bg-gray-600 px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",children:"Add Contact"})]})]})},R=({isChecked:t,handleClick:l,size:i=40,color:s="white"})=>e("div",{className:"cursor-pointer",onClick:l,children:t?e(M,{size:i,color:s}):e(V,{size:i,color:s})}),W=({todoItem:t})=>{const{application:l}=N(),i=v();function s(d){if(!l)return;const c=d.target.name,p=d.target.value,g={...l,todoList:l.todoList.map(y=>y.id===t.id?{...y,[c]:p}:y)};i(w(g))}function r(){if(!l)return;const d={...l,todoList:l.todoList.map(c=>c.id===t.id?{...c,completed:!c.completed}:c)};i(f(d))}function o(){if(!l)return;const d={...l,todoList:l.todoList.filter(c=>c.id!==t.id)};i(f(d))}function m(){l&&i(f(l))}return e("div",{className:"flex w-full flex-col gap-3 rounded-3xl border p-3",children:a(n,{children:[e(n.DisplayElement,{className:"flex items-center justify-between",children:a("div",{children:[e("div",{className:C("text-3xl text-white",{"line-through":t.completed}),children:t.text||"Todo Item"}),a("div",{className:"flex items-center gap-1",children:[e(R,{handleClick:r,isChecked:t.completed}),a(x,{children:[e(x.OpenBtn,{modalName:"archiveModal",children:e("button",{children:e(k,{className:"text-3xl md:text-4xl"})})}),a(x.Window,{name:"archiveModal",className:"fixed left-1/2 top-1/2 z-[1500] flex max-w-[320px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-lg bg-gray-600 p-8 text-gray-100 shadow-xl",children:[e("h3",{className:"text-3xl font-semibold text-gray-200 md:text-3xl",children:"Are you sure you want to remove this item?"}),a("div",{className:"mt-2 flex items-center gap-4",children:[e(x.CloseBtn,{className:"rounded-full bg-gray-600 px-5 py-3 text-lg font-medium uppercase text-gray-200 transition-all hover:scale-105",children:e("button",{children:"Cancel"})}),e(x.CloseBtn,{className:"rounded-full bg-gray-600 px-5 py-3 text-lg font-medium uppercase text-gray-200 transition-all hover:scale-105",onClickFn:o,children:e("button",{children:"remove"})})]})]})]})]})]})}),a("div",{className:"flex items-center gap-4",children:[e(n.EditElement,{onChange:s,className:"w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none",children:e("input",{type:"text",defaultValue:t.text,name:"text",placeholder:"Todo Item"})}),e(n.SaveButton,{onSubmit:m,className:"flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",children:e("div",{children:e(h,{})})})]})]})})},_=()=>{const{application:t}=N(),l=v();if(!t)return null;function i(){if(!t)return;const r={text:"Todo Item",completed:!1,id:j()},o={...t,todoList:[...t.todoList,r]};l(f(o))}const{todoList:s}=t;return a("div",{children:[e("h3",{className:"mb-4 text-2xl  font-bold",children:"Todo List"}),a("div",{className:"flex w-full flex-wrap justify-center gap-2",children:[s.map((r,o)=>e(W,{todoItem:r},o)),e(E,{onClickFn:i,className:"flex h-20 items-center justify-center gap-2 self-center justify-self-start rounded-full bg-gray-600 px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",children:e("span",{children:"Add Todo"})})]})]})},Y=()=>{const{application:t,getApplicationState:l}=N(),i=S(),s=A(),r=v();function o(){s("/job-applications")}function m(c){const p=c.target.name,g=c.target.value,y={...t,[p]:g};r(w(y))}function d(){t&&r(f({...t}))}return u.useEffect(()=>{const{id:c}=i;return c&&r(L(c)),()=>{r(w(null))}},[i,r]),l.state==="loading"?e(D,{}):a(T,{children:[e(F,{onClickFn:o,darkMode:!0}),a("div",{className:C("fixed left-0 top-0 z-[1000] flex h-screen w-screen flex-col gap-3 overflow-scroll bg-gray-800 p-8 md:left-1/2 md:top-1/2 md:h-4/5 md:w-3/5 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl",{"justify-center":!t}),children:[a("div",{className:"mb-5 flex w-full items-center justify-between",children:[e("h1",{className:"text-3xl font-bold text-white",children:"Job Application"}),e(E,{onClickFn:o,className:"flex h-16 items-center justify-center gap-2 self-center rounded-full bg-gray-600 px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",children:e("span",{children:"Go Back"})})]}),a(n,{children:[e(n.DisplayElement,{className:"text-3xl text-white",children:e("div",{children:(t==null?void 0:t.company)||"Company"})}),a("div",{className:"flex items-center gap-4",children:[e(n.EditElement,{onChange:m,className:"w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none",children:e("input",{type:"text",defaultValue:t==null?void 0:t.company,name:"company",placeholder:"Company"})}),e(n.SaveButton,{onSubmit:d,className:"flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",children:e("div",{children:e(h,{})})})]})]}),a(n,{children:[e(n.DisplayElement,{className:"text-3xl text-white",children:e("div",{children:(t==null?void 0:t.position)||"Position"})}),a("div",{className:"flex items-center gap-4",children:[e(n.EditElement,{onChange:m,className:"w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none",children:e("input",{type:"text",defaultValue:t==null?void 0:t.position,name:"position",placeholder:"Position"})}),e(n.SaveButton,{onSubmit:d,className:"flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",children:e("div",{children:e(h,{})})})]})]}),a(n,{children:[e(n.DisplayElement,{className:"text-3xl text-white",children:e("div",{children:(t==null?void 0:t.status)||"Status"})}),a("div",{className:"flex items-center gap-4",children:[e(n.EditElement,{onChange:m,className:"w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none",children:e("input",{type:"text",defaultValue:t==null?void 0:t.status,name:"status",placeholder:"Status"})}),e(n.SaveButton,{onSubmit:d,className:"flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",children:e("div",{children:e(h,{})})})]})]}),a(n,{children:[a("div",{className:"flex flex-wrap items-center gap-4",children:[e(n.DisplayElement,{className:"text-3xl text-blue-400 hover:underline",children:e("a",{href:t==null?void 0:t.url,target:"_blank",rel:"noreferrer",children:(t==null?void 0:t.url)||"Link"})}),e(n.EditButton,{className:"cursor-pointer text-4xl",children:e("div",{children:e(B,{})})})]}),a("div",{className:"flex items-center gap-4",children:[e(n.EditElement,{onChange:m,className:"w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none",children:e("input",{type:"text",defaultValue:t==null?void 0:t.url,name:"url",placeholder:"Link"})}),e(n.SaveButton,{onSubmit:d,className:"flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",children:e("div",{children:e(h,{})})})]})]}),a(n,{children:[e(n.DisplayElement,{className:"text-3xl text-white",children:e("p",{children:(t==null?void 0:t.notes)||"notes"})}),a("div",{className:"flex items-center gap-4",children:[e(n.EditElement,{onChange:m,className:"w-full rounded-md bg-gray-700 p-4 text-2xl font-medium text-gray-100 outline-none",children:e("textarea",{defaultValue:t==null?void 0:t.notes,name:"notes"})}),e(n.SaveButton,{onSubmit:d,className:"flex items-center justify-center justify-self-start  px-7 text-3xl font-medium leading-none tracking-wide text-gray-100 transition-all duration-300 hover:scale-110 md:h-14 md:text-2xl",children:e("div",{children:e(h,{})})})]})]}),e(O,{}),e(_,{})]})]})};export{Y as default};
