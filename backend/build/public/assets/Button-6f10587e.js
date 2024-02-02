import{Z as u,j as f}from"./index-1f2d8112.js";var l={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var r={}.hasOwnProperty;function s(){for(var n=[],o=0;o<arguments.length;o++){var t=arguments[o];if(t){var i=typeof t;if(i==="string"||i==="number")n.push(t);else if(Array.isArray(t)){if(t.length){var c=s.apply(null,t);c&&n.push(c)}}else if(i==="object"){if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]")){n.push(t.toString());continue}for(var a in t)r.call(t,a)&&t[a]&&n.push(a)}}}return n.join(" ")}e.exports?(s.default=s,e.exports=s):window.classNames=s})()})(l);var p=l.exports;const v=u(p),h=({children:e,className:r,onClickFn:s,type:n="button",disabled:o=!1})=>f("button",{onClick:s,className:r,type:n,disabled:o,children:e});export{h as B,v as c};
