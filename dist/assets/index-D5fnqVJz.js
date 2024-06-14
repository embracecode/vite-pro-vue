import{a as o,a6 as n,f as r,g as l,w as p,q as g,aP as m,bm as f,k as y,z as c,_ as h}from"./index-Rm7tvSTH.js";const _=o({name:"ElCollapseTransition"}),v=o({..._,setup(s){const d=n("collapse-transition"),e=t=>{t.style.maxHeight="",t.style.overflow=t.dataset.oldOverflow,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom},i={beforeEnter(t){t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.style.height&&(t.dataset.elExistsHeight=t.style.height),t.style.maxHeight=0,t.style.paddingTop=0,t.style.paddingBottom=0},enter(t){requestAnimationFrame(()=>{t.dataset.oldOverflow=t.style.overflow,t.dataset.elExistsHeight?t.style.maxHeight=t.dataset.elExistsHeight:t.scrollHeight!==0?t.style.maxHeight=`${t.scrollHeight}px`:t.style.maxHeight=0,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom,t.style.overflow="hidden"})},afterEnter(t){t.style.maxHeight="",t.style.overflow=t.dataset.oldOverflow},enterCancelled(t){e(t)},beforeLeave(t){t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.dataset.oldOverflow=t.style.overflow,t.style.maxHeight=`${t.scrollHeight}px`,t.style.overflow="hidden"},leave(t){t.scrollHeight!==0&&(t.style.maxHeight=0,t.style.paddingTop=0,t.style.paddingBottom=0)},afterLeave(t){e(t)},leaveCancelled(t){e(t)}};return(t,x)=>(r(),l(c,m({name:y(d).b()},f(i)),{default:p(()=>[g(t.$slots,"default")]),_:3},16,["name"]))}});var a=h(v,[["__file","collapse-transition.vue"]]);a.install=s=>{s.component(a.name,a)};const T=a;export{T as _};
