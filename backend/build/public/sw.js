if(!self.define){let s,e={};const i=(i,a)=>(i=new URL(i+".js",a).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(a,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let l={};const o=s=>i(s,r),t={module:{uri:r},exports:l,require:o};e[r]=Promise.all(a.map((s=>t[s]||o(s)))).then((s=>(n(...s),l)))}}define(["./workbox-97f1c4be"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/About-d418513a.js",revision:null},{url:"assets/AuthPage-0ff1503e.js",revision:null},{url:"assets/Button-ba209a33.js",revision:null},{url:"assets/ErrMsg-7b7025f2.js",revision:null},{url:"assets/Homepage-93dc3625.js",revision:null},{url:"assets/index-68a57afb.js",revision:null},{url:"assets/index-85fad4ea.css",revision:null},{url:"assets/index.esm-1fa7479e.js",revision:null},{url:"assets/index.esm-6fbf693b.js",revision:null},{url:"assets/InputNumber-c3d7c717.js",revision:null},{url:"assets/JobApplication-b9beb187.js",revision:null},{url:"assets/JobApplicationEdit-da8cba65.js",revision:null},{url:"assets/Main-bc9e1967.js",revision:null},{url:"assets/MainScreen-7adab4b1.js",revision:null},{url:"assets/Modal-b0239423.js",revision:null},{url:"assets/PageNotFound-99eb0684.js",revision:null},{url:"assets/ProfileDetails-f9af3e05.js",revision:null},{url:"assets/QuestionEdit-8aa98af9.js",revision:null},{url:"assets/QuestionLoader-7d2ee89d.css",revision:null},{url:"assets/QuestionLoader-dd2072f3.js",revision:null},{url:"assets/QuestionManagementPage-3b023b09.js",revision:null},{url:"assets/QuizSetting-9e6ed9cf.js",revision:null},{url:"assets/Select-4fcfcbf8.js",revision:null},{url:"assets/useJobApplication-6ba568e6.js",revision:null},{url:"assets/useKey-f336caaa.js",revision:null},{url:"assets/useOutsideClick-b2963c8e.js",revision:null},{url:"assets/user.service-bd9bd99f.js",revision:null},{url:"index.html",revision:"bec73b250e55ff8f151d9f1c6dbbda2c"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"9e25daaa4f3fb5d8a5280b5247cd0466"},{url:"assets/images/android-chrome-192x192.png",revision:"c1e3b4a88bc921b2786b0c181222e55b"},{url:"assets/images/android-chrome-512x512.png",revision:"c0d655a6b6d896b3b348fff4aff89e1a"},{url:"assets/images/Angular.png",revision:"e5514a9de22151e4ad02f24b4fe7f792"},{url:"assets/images/apple-touch-icon.png",revision:"9d41471eeabdc31be89d2f3a75ea1423"},{url:"assets/images/CSS.png",revision:"3bed97102466519a0f0ecda60d0f6ec0"},{url:"assets/images/Docker.png",revision:"7e2125c99164bc44888a05fcfecddc89"},{url:"assets/images/ExpressJS.png",revision:"1ffef42aa0318498d5d3580ebb689854"},{url:"assets/images/favicon-16x16.png",revision:"1984641891dc2140ee0de27507a6278d"},{url:"assets/images/favicon-32x32.png",revision:"495b883c297feb2647d5be4a51a2236d"},{url:"assets/images/Git.png",revision:"b9925639795cfe12fd51b11b585830dc"},{url:"assets/images/HTML.png",revision:"666c190e1f7a462852f10506d3375b5d"},{url:"assets/images/icon-128x128.png",revision:"5281c6beea773ff9e0b623125f3dc672"},{url:"assets/images/icon-144x144.png",revision:"40d22f3d32a5437679faf8f5c812ab91"},{url:"assets/images/icon-152x152.png",revision:"af1ce1ff6e01fc3cf547654254c95450"},{url:"assets/images/icon-192x192.png",revision:"92c1a1835806976bb4313155ae7476f3"},{url:"assets/images/icon-384x384.png",revision:"7a41ae1bb83b9efe0365a6a104644af3"},{url:"assets/images/icon-48x48.png",revision:"edc7c8837b8a0d1b90894188e6548e07"},{url:"assets/images/icon-512x512.png",revision:"f0deeb3d2fbd088c31c22b7520f682a4"},{url:"assets/images/icon-72x72.png",revision:"9dadcde79b42af706c6fd42cbe1b664d"},{url:"assets/images/icon-96x96.png",revision:"37e22de6ab759e458a09944e9a55f5cd"},{url:"assets/images/JavaScript.png",revision:"1d669332f96bbbca9199d22ab0be76d5"},{url:"assets/images/Jest.png",revision:"21fca2cdeda790bc8f0cf2c0e30b7914"},{url:"assets/images/MongoDB.png",revision:"35fc7f2bfb93f30f561f0ecf165939b6"},{url:"assets/images/NodeJS.png",revision:"1c88833fe43bc9d824d1d1640aa8068d"},{url:"assets/images/Python.png",revision:"22eeecf99b8d92726b4f3735be5473c0"},{url:"assets/images/React.png",revision:"917515db74ea8d1aee6a246cfbcc0b45"},{url:"assets/images/SQL.png",revision:"476f81a19db94f15fec396171c34239a"},{url:"assets/images/TypeScript.png",revision:"60284296291c9a23fef86934766b8abc"},{url:"assets/images/Vue.png",revision:"117d0ed326596f7a7f455b6d3ba78648"},{url:"assets/fonts/Codystar-Light.ttf",revision:"6b6cc88019d10c2de1c7eddd56f3eb4a"},{url:"assets/fonts/Codystar-Regular.ttf",revision:"952b3e3eb6c589d97707e90d57281fba"},{url:"assets/fonts/SourceCodePro-Regular.ttf",revision:"d1f776b31a50ae68ace3819fdc58b065"},{url:"manifest.webmanifest",revision:"320b312e95774972ce59ff39074840c1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("/offline.html"))),s.registerRoute(/\/api\/.*/,new s.NetworkFirst({cacheName:"api-cache",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:50,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:png|jpg|jpeg|svg|gif|tiff|ttf|woff|woff2|eot)$/,new s.CacheFirst({cacheName:"static-resources",plugins:[]}),"GET")}));
