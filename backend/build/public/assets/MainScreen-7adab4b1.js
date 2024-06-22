import{ae as f,j as p}from"./index-68a57afb.js";var l={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(n){(function(){var o={}.hasOwnProperty;function t(){for(var e=[],r=0;r<arguments.length;r++){var s=arguments[r];if(s){var a=typeof s;if(a==="string"||a==="number")e.push(s);else if(Array.isArray(s)){if(s.length){var c=t.apply(null,s);c&&e.push(c)}}else if(a==="object"){if(s.toString!==Object.prototype.toString&&!s.toString.toString().includes("[native code]")){e.push(s.toString());continue}for(var i in s)o.call(s,i)&&s[i]&&e.push(i)}}}return e.join(" ")}n.exports?(t.default=t,n.exports=t):window.classNames=t})()})(l);var u=l.exports;const m=f(u),h=({onClickFn:n,darkMode:o=!1})=>p("div",{className:m("fixed left-0 top-0 z-[100] h-screen w-screen cursor-pointer",{"bg-gray-700 bg-opacity-80":o},{"bg-transparent":!o}),onClick:n});export{h as M,m as c};
