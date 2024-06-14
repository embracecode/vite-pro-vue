import{o as W,al as J,aC as _,ad as q,a as I,a5 as G,a8 as K,aR as Q,c as L,f as k,s as z,j as R,q as y,n as m,k as e,t as Z,y as A,w as b,g as O,m as x,E as ee,p as j,l as U,_ as H,C as oe,aB as se,as as te,a6 as ae,r as N,a7 as le,h as ne,bn as re,aP as ie,aO as de,v as ce,z as ue,bo as fe,aa as me}from"./index-Rm7tvSTH.js";import{b as ve,c as pe,d as ge,a as he,u as be,E as ye,e as Ce}from"./el-overlay-CN1xueOC.js";import{c as Ee}from"./refs-BzejS40Y.js";const we=(r,a,v,C)=>{let i={offsetX:0,offsetY:0};const u=f=>{const E=f.clientX,w=f.clientY,{offsetX:p,offsetY:g}=i,d=r.value.getBoundingClientRect(),t=d.left,h=d.top,D=d.width,F=d.height,M=document.documentElement.clientWidth,S=document.documentElement.clientHeight,B=-t+p,P=-h+g,Y=M-t-D+p,X=S-h-F+g,c=o=>{let l=p+o.clientX-E,n=g+o.clientY-w;C!=null&&C.value||(l=Math.min(Math.max(l,B),Y),n=Math.min(Math.max(n,P),X)),i={offsetX:l,offsetY:n},r.value&&(r.value.style.transform=`translate(${q(l)}, ${q(n)})`)},T=()=>{document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",T)};document.addEventListener("mousemove",c),document.addEventListener("mouseup",T)},$=()=>{a.value&&r.value&&a.value.addEventListener("mousedown",u)},s=()=>{a.value&&r.value&&a.value.removeEventListener("mousedown",u)};W(()=>{J(()=>{v.value?$():s()})}),_(()=>{s()})},V=Symbol("dialogInjectionKey"),ke=["aria-level"],$e=["aria-label"],Le=["id"],De=I({name:"ElDialogContent"}),Me=I({...De,props:ve,emits:pe,setup(r){const a=r,{t:v}=G(),{Close:C}=oe,{dialogRef:i,headerRef:u,bodyId:$,ns:s,style:f}=K(V),{focusTrapRef:E}=K(Q),w=L(()=>[s.b(),s.is("fullscreen",a.fullscreen),s.is("draggable",a.draggable),s.is("align-center",a.alignCenter),{[s.m("center")]:a.center}]),p=Ee(E,i),g=L(()=>a.draggable),d=L(()=>a.overflow);return we(i,u,g,d),(t,h)=>(k(),z("div",{ref:e(p),class:m(e(w)),style:U(e(f)),tabindex:"-1"},[R("header",{ref_key:"headerRef",ref:u,class:m([e(s).e("header"),{"show-close":t.showClose}])},[y(t.$slots,"header",{},()=>[R("span",{role:"heading","aria-level":t.ariaLevel,class:m(e(s).e("title"))},Z(t.title),11,ke)]),t.showClose?(k(),z("button",{key:0,"aria-label":e(v)("el.dialog.close"),class:m(e(s).e("headerbtn")),type:"button",onClick:h[0]||(h[0]=D=>t.$emit("close"))},[A(e(ee),{class:m(e(s).e("close"))},{default:b(()=>[(k(),O(x(t.closeIcon||e(C))))]),_:1},8,["class"])],10,$e)):j("v-if",!0)],2),R("div",{id:e($),class:m(e(s).e("body"))},[y(t.$slots,"default")],10,Le),t.$slots.footer?(k(),z("footer",{key:0,class:m(e(s).e("footer"))},[y(t.$slots,"footer")],2)):j("v-if",!0)],6))}});var Te=H(Me,[["__file","dialog-content.vue"]]);const Re=["aria-label","aria-labelledby","aria-describedby"],Ae=I({name:"ElDialog",inheritAttrs:!1}),Ie=I({...Ae,props:ge,emits:he,setup(r,{expose:a}){const v=r,C=se();te({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},L(()=>!!C.title));const i=ae("dialog"),u=N(),$=N(),s=N(),{visible:f,titleId:E,bodyId:w,style:p,overlayDialogStyle:g,rendered:d,zIndex:t,afterEnter:h,afterLeave:D,beforeLeave:F,handleClose:M,onModalClick:S,onOpenAutoFocus:B,onCloseAutoFocus:P,onCloseRequested:Y,onFocusoutPrevented:X}=be(v,u);le(V,{dialogRef:u,headerRef:$,bodyId:w,ns:i,rendered:d,style:p});const c=Ce(S),T=L(()=>v.draggable&&!v.fullscreen);return a({visible:f,dialogContentRef:s}),(o,l)=>(k(),O(fe,{to:o.appendTo,disabled:o.appendTo!=="body"?!1:!o.appendToBody},[A(ue,{name:"dialog-fade",onAfterEnter:e(h),onAfterLeave:e(D),onBeforeLeave:e(F),persisted:""},{default:b(()=>[ne(A(e(ye),{"custom-mask-event":"",mask:o.modal,"overlay-class":o.modalClass,"z-index":e(t)},{default:b(()=>[R("div",{role:"dialog","aria-modal":"true","aria-label":o.title||void 0,"aria-labelledby":o.title?void 0:e(E),"aria-describedby":e(w),class:m(`${e(i).namespace.value}-overlay-dialog`),style:U(e(g)),onClick:l[0]||(l[0]=(...n)=>e(c).onClick&&e(c).onClick(...n)),onMousedown:l[1]||(l[1]=(...n)=>e(c).onMousedown&&e(c).onMousedown(...n)),onMouseup:l[2]||(l[2]=(...n)=>e(c).onMouseup&&e(c).onMouseup(...n))},[A(e(re),{loop:"",trapped:e(f),"focus-start-el":"container",onFocusAfterTrapped:e(B),onFocusAfterReleased:e(P),onFocusoutPrevented:e(X),onReleaseRequested:e(Y)},{default:b(()=>[e(d)?(k(),O(Te,ie({key:0,ref_key:"dialogContentRef",ref:s},o.$attrs,{center:o.center,"align-center":o.alignCenter,"close-icon":o.closeIcon,draggable:e(T),overflow:o.overflow,fullscreen:o.fullscreen,"show-close":o.showClose,title:o.title,"aria-level":o.headerAriaLevel,onClose:e(M)}),de({header:b(()=>[o.$slots.title?y(o.$slots,"title",{key:1}):y(o.$slots,"header",{key:0,close:e(M),titleId:e(E),titleClass:e(i).e("title")})]),default:b(()=>[y(o.$slots,"default")]),_:2},[o.$slots.footer?{name:"footer",fn:b(()=>[y(o.$slots,"footer")])}:void 0]),1040,["center","align-center","close-icon","draggable","overflow","fullscreen","show-close","title","aria-level","onClose"])):j("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,Re)]),_:3},8,["mask","overlay-class","z-index"]),[[ce,e(f)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])],8,["to","disabled"]))}});var Fe=H(Ie,[["__file","dialog.vue"]]);const Ye=me(Fe);export{Ye as E};
