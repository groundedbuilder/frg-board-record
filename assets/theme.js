// Light/dark theme. Loaded in <head> (not deferred) so the saved theme applies before first paint.
// "auto" follows the system setting via prefers-color-scheme; "light"/"dark" override it.
(function(){
const KEY="vb:theme",ORDER=["auto","light","dark"];
const LABEL={auto:"Auto",light:"Light",dark:"Dark"};
// Icons from Lucide (lucide.dev, ISC license): monitor, sun, moon.
const ICON={
  auto:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  light:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
  dark:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>'
};
const get=()=>{try{const v=localStorage.getItem(KEY);return ORDER.includes(v)?v:"auto"}catch(e){return "auto"}};
const apply=t=>{const r=document.documentElement;if(t==="auto")r.removeAttribute("data-theme");else r.setAttribute("data-theme",t)};
let cur=get();apply(cur);
function paint(btn){const t=cur;btn.innerHTML=ICON[t]+`<span>${LABEL[t]}</span>`;
  btn.setAttribute("aria-label",`Color theme: ${LABEL[t]}${t==="auto"?" (follows your device)":""}. Click to change.`)}
document.addEventListener("DOMContentLoaded",()=>{
  const btn=document.getElementById("themebtn");if(!btn)return;paint(btn);
  btn.addEventListener("click",()=>{cur=ORDER[(ORDER.indexOf(cur)+1)%ORDER.length];
    try{localStorage.setItem(KEY,cur)}catch(e){}apply(cur);paint(btn)});
});
})();
