import{l as o,j as i,q as r,_ as s}from"./index-90fe3c4e.js";import{B as a}from"./Button-221e910c.js";const u=()=>{const{loggedInUser:n}=o();function t(e){r(e),s.success("Link copied to clipboard",{style:{background:"#333",color:"#fff",fontSize:"13px",fontWeight:"600"}})}if(!n)return null;const l=[{name:"LinkedIn",link:n.linkedInProfile},{name:"GitHub",link:n.githubProfile},{name:"Portfolio",link:n.portfolio}];return i("div",{className:"my-3 flex w-full items-center justify-center px-3",children:i("div",{className:"my-3 flex w-full max-w-[700px] flex-wrap items-center justify-between gap-6",children:l.map(e=>e.link?i(a,{className:"rounded-full border-2 border-white px-6 py-3 text-4xl text-white",onClickFn:()=>t(e.link),children:e.name},e.name):null)})})};export{u as S};
