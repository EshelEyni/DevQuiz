import{a as x,j as t,a0 as m,a1 as i}from"./index-b335d02f.js";const c=({handleChange:a,updateNumber:e,value:n,max:r,name:s,className:o=""})=>x("div",{className:"flex w-max items-center justify-around gap-1 rounded-full bg-gray-700 px-6 py-3 "+o,children:[t(m,{className:"cursor-pointer text-3xl font-medium text-gray-50",onClick:()=>e(-1)}),t("input",{type:"number",className:"max-h-content w-12 bg-transparent pb-1 text-center text-3xl font-medium text-gray-50 md:text-4xl",name:s,min:1,max:r,value:n,onChange:a}),t(i,{className:"cursor-pointer text-3xl font-medium text-gray-50",onClick:()=>e(1)})]});export{c as I};