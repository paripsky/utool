import{b as x,r as d,j as a,a as p,B as g,c as E,e as L,R as y,d as S,C as P,f as R}from"./vendor.2ca5fe5c.js";const _=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}};_();const v="modulepreload",m={},M="/utool/",b=function(s,n){return!n||n.length===0?s():Promise.all(n.map(r=>{if(r=`${M}${r}`,r in m)return;m[r]=!0;const e=r.endsWith(".css"),t=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${t}`))return;const o=document.createElement("link");if(o.rel=e?"stylesheet":v,e||(o.as="script",o.crossOrigin=""),o.href=r,document.head.appendChild(o),e)return new Promise((u,c)=>{o.addEventListener("load",u),o.addEventListener("error",c)})})).then(()=>s())};function O(l){return x.exports.transform(l,{presets:["react"]}).code}const k={components:{Button:E,Box:g},hooks:{useState:d.exports.useState}},$=()=>{const l=new URL(window.location.href).searchParams.get("code"),[s,n]=d.exports.useState(!0),[r,e]=d.exports.useState(!1),t=d.exports.useRef(null),o=t.current,u=async c=>{try{e(!1),n(!0);const w=`data:text/javascript;charset=utf-8,${(O(c)||"").replaceAll("/*#__PURE__*/","")}`,C=await b(()=>import(w),[]);t.current=C.default,n(!1)}catch(i){console.error(i),n(!1),e(!0)}};return d.exports.useEffect(()=>{var c;window.addEventListener("message",i=>{i.data.name==="code"&&(console.log("code",i.data),u(i.data.code))}),(c=window.top)==null||c.postMessage("ready","*")},[]),s||!o?a("div",{children:"loading..."}):r?a("div",{children:"Something went wrong."}):p(g,{p:4,children:[a(o,{pluginContext:k}),l]})},f=new URL(window.location.href).searchParams.get("colorMode");f&&localStorage.setItem("chakra-ui-color-mode",f);const h=L({config:{initialColorMode:f,useSystemColorMode:!1}});window.React=y;S.render(p(y.StrictMode,{children:[a(P,{initialColorMode:h.config.initialColorMode}),a(R,{theme:h,children:a($,{})})]}),document.getElementById("root"));
