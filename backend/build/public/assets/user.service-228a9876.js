import{a4 as t,a5 as s}from"./index-1a5e5a23.js";const o="user";async function n(){try{const r=await t.get(`${o}`);return s(r)}catch(r){throw console.error(r),r}}async function a(r){try{const e=await t.get(`${o}/${r}`);return s(e)}catch(e){throw console.error(e),e}}async function u(r){try{const e=await t.get(`${o}/username/${r}`);return s(e)}catch(e){throw console.error(e),e}}async function i(r){try{await t.delete(`${o}/${r}`)}catch(e){throw console.error(e),e}}async function w(r){try{const e=await t.put(`${o}`,r);return s(e)}catch(e){throw console.error(e),e}}async function y(r){try{await t.post(`${o}/correct-answer`,r)}catch(e){throw console.error(e),e}}async function h({level:r,language:e}){try{let c=`${o}/correct-answer?language=${e}`;r&&(c+=`&level=${r}`),await t.delete(c)}catch(c){throw console.error(c),c}}async function l(){try{const r=await t.get(`${o}/user-stats`);return s(r)}catch(r){throw console.error(r),r}}const p={query:n,getById:a,getByUsername:u,update:w,remove:i,recordUserCorrectAnswer:y,removeUserCorrectAnswers:h,getUserStats:l};export{p as u};
