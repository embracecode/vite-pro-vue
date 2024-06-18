import{b as ne,i as se,d as $,a as P,u as ae,r as V,c as k,T as A,o as J,e as le,f as C,g as z,w as g,h as j,j as b,n as S,k as c,l as L,E as q,m as ie,p as B,t as O,q as re,s as H,F as de,v as R,x as ue,y as p,z as ce,_ as fe,C as pe,A as me,B as F,D as ge,G as W,H as Z,I as ve,J as G,K as he,L as ye,M as Q,N as _e,O as Ce,P as we,Q as be,R as Se,S as Ee,U as Me,V as Te,W as Ie,X as ke,Y as Ve,Z as xe,$ as ze,a0 as He,a1 as Ne,a2 as Pe,a3 as $e}from"./index-BaMIRSKY.js";import{g as Be}from"./time-DjVci_lI.js";const X=["success","info","warning","error"],Fe=ne({customClass:{type:String,default:""},dangerouslyUseHTMLString:{type:Boolean,default:!1},duration:{type:Number,default:4500},icon:{type:se},id:{type:String,default:""},message:{type:$([String,Object]),default:""},offset:{type:Number,default:0},onClick:{type:$(Function),default:()=>{}},onClose:{type:$(Function),required:!0},position:{type:String,values:["top-right","top-left","bottom-right","bottom-left"],default:"top-right"},showClose:{type:Boolean,default:!0},title:{type:String,default:""},type:{type:String,values:[...X,""],default:""},zIndex:Number}),Le={destroy:()=>!0},We=["id"],Ue=["textContent"],De={key:0},Ae=["innerHTML"],je=P({name:"ElNotification"}),qe=P({...je,props:Fe,emits:Le,setup(a,{expose:n}){const s=a,{ns:l,zIndex:d}=ae("notification"),{nextZIndex:v,currentZIndex:h}=d,{Close:m}=pe,e=V(!1);let o;const u=k(()=>{const t=s.type;return t&&A[s.type]?l.m(t):""}),r=k(()=>s.type&&A[s.type]||s.icon),y=k(()=>s.position.endsWith("right")?"right":"left"),M=k(()=>s.position.startsWith("top")?"top":"bottom"),D=k(()=>{var t;return{[M.value]:`${s.offset}px`,zIndex:(t=s.zIndex)!=null?t:h.value}});function T(){s.duration>0&&({stop:o}=me(()=>{e.value&&f()},s.duration))}function x(){o==null||o()}function f(){e.value=!1}function i({code:t}){t===F.delete||t===F.backspace?x():t===F.esc?e.value&&f():T()}return J(()=>{T(),v(),e.value=!0}),le(document,"keydown",i),n({visible:e,close:f}),(t,_)=>(C(),z(ce,{name:c(l).b("fade"),onBeforeLeave:t.onClose,onAfterLeave:_[1]||(_[1]=w=>t.$emit("destroy")),persisted:""},{default:g(()=>[j(b("div",{id:t.id,class:S([c(l).b(),t.customClass,c(y)]),style:L(c(D)),role:"alert",onMouseenter:x,onMouseleave:T,onClick:_[0]||(_[0]=(...w)=>t.onClick&&t.onClick(...w))},[c(r)?(C(),z(c(q),{key:0,class:S([c(l).e("icon"),c(u)])},{default:g(()=>[(C(),z(ie(c(r))))]),_:1},8,["class"])):B("v-if",!0),b("div",{class:S(c(l).e("group"))},[b("h2",{class:S(c(l).e("title")),textContent:O(t.title)},null,10,Ue),j(b("div",{class:S(c(l).e("content")),style:L(t.title?void 0:{margin:0})},[re(t.$slots,"default",{},()=>[t.dangerouslyUseHTMLString?(C(),H(de,{key:1},[B(" Caution here, message could've been compromised, never use user's input as message "),b("p",{innerHTML:t.message},null,8,Ae)],2112)):(C(),H("p",De,O(t.message),1))])],6),[[R,t.message]]),t.showClose?(C(),z(c(q),{key:0,class:S(c(l).e("closeBtn")),onClick:ue(f,["stop"])},{default:g(()=>[p(c(m))]),_:1},8,["class","onClick"])):B("v-if",!0)],2)],46,We),[[R,e.value]])]),_:3},8,["name","onBeforeLeave"]))}});var Oe=fe(qe,[["__file","notification.vue"]]);const N={"top-left":[],"top-right":[],"bottom-left":[],"bottom-right":[]},U=16;let Re=1;const E=function(a={},n=null){if(!ge)return{close:()=>{}};(typeof a=="string"||W(a))&&(a={message:a});const s=a.position||"top-right";let l=a.offset||0;N[s].forEach(({vm:u})=>{var r;l+=(((r=u.el)==null?void 0:r.offsetHeight)||0)+U}),l+=U;const d=`notification_${Re++}`,v=a.onClose,h={...a,offset:l,id:d,onClose:()=>{Ze(d,s,v)}};let m=document.body;Z(a.appendTo)?m=a.appendTo:ve(a.appendTo)&&(m=document.querySelector(a.appendTo)),Z(m)||(m=document.body);const e=document.createElement("div"),o=p(Oe,h,W(h.message)?{default:()=>h.message}:null);return o.appContext=n??E._context,o.props.onDestroy=()=>{G(null,e)},G(o,e),N[s].push({vm:o}),m.appendChild(e.firstElementChild),{close:()=>{o.component.exposed.visible.value=!1}}};X.forEach(a=>{E[a]=(n={})=>((typeof n=="string"||W(n))&&(n={message:n}),E({...n,type:a}))});function Ze(a,n,s){const l=N[n],d=l.findIndex(({vm:o})=>{var u;return((u=o.component)==null?void 0:u.props.id)===a});if(d===-1)return;const{vm:v}=l[d];if(!v)return;s==null||s(v);const h=v.el.offsetHeight,m=n.split("-")[0];l.splice(d,1);const e=l.length;if(!(e<1))for(let o=d;o<e;o++){const{el:u,component:r}=l[o].vm,y=Number.parseInt(u.style[m],10)-h-U;r.props.offset=y}}function Ge(){for(const a of Object.values(N))a.forEach(({vm:n})=>{n.component.exposed.visible.value=!1})}E.closeAll=Ge;E._context=null;const K=he(E,"$notify"),Ke=["width","height"],Je=P({__name:"index",props:{identifyCode:{default:"1234"},fontSizeMin:{default:25},fontSizeMax:{default:35},backgroundColorMin:{default:200},backgroundColorMax:{default:220},dotColorMin:{default:60},dotColorMax:{default:120},contentWidth:{default:100},contentHeight:{default:40}},setup(a){const n=a,s=(e,o)=>Math.floor(Math.random()*(o-e)+e),l=(e,o)=>{let u=s(e,o),r=s(e,o),y=s(e,o);return"rgb("+u+","+r+","+y+")"},d=()=>{let o=document.getElementById("id-canvas").getContext("2d");o.textBaseline="bottom",o.fillStyle="#e6ecfd",o.fillRect(0,0,n.contentWidth,n.contentHeight);for(let u=0;u<n.identifyCode.length;u++)v(o,n.identifyCode[u],u);h(o),m(o)},v=(e,o,u)=>{e.fillStyle=l(50,160),e.font=s(n.fontSizeMin,n.fontSizeMax)+"px SimHei";let r=(u+1)*(n.contentWidth/(n.identifyCode.length+1)),y=s(n.fontSizeMax,n.contentHeight-5);const M=s(-30,30);e.translate(r,y),e.rotate(M*Math.PI/180),e.fillText(o,0,0),e.rotate(-M*Math.PI/180),e.translate(-r,-y)},h=e=>{for(let o=0;o<4;o++)e.strokeStyle=l(100,200),e.beginPath(),e.moveTo(s(0,n.contentWidth),s(0,n.contentHeight)),e.lineTo(s(0,n.contentWidth),s(0,n.contentHeight)),e.stroke()},m=e=>{for(let o=0;o<30;o++)e.fillStyle=l(0,255),e.beginPath(),e.arc(s(0,n.contentWidth),s(0,n.contentHeight),1,0,2*Math.PI),e.fill()};return J(()=>{d()}),ye(()=>n.identifyCode,e=>{console.log(e),d()}),(e,o)=>(C(),H("div",{class:"canvas-box",style:L({height:e.contentHeight+"px"})},[b("canvas",{id:"id-canvas",class:"id-canvas",width:e.contentWidth,height:e.contentHeight},null,8,Ke)],4))}}),Qe=Q(Je,[["__scopeId","data-v-f0341b6e"]]),Xe=a=>(Pe("data-v-abbc57f5"),a=a(),$e(),a),Ye={class:"login_container"},et=Xe(()=>b("h1",null,"Vue-Admin",-1)),tt=P({__name:"login",setup(a){let n=be(),s=Se(),l=V(!1);const d=V("1234"),v=V("1234567890abcdefjhijklinopqrsduvwxyz"),h=()=>{d.value="",m(d,4)},m=(f,i)=>{for(let t=0;t<i;t++)d.value+=v.value[e(0,v.value.length)]},e=(f,i)=>Math.floor(Math.random()*(i-f)+f);let o=_e(),u=V();const r=Ce({username:"admin",password:"123456",verifyCode:"1234"}),T={username:[{trigger:"change",validator:(f,i,t)=>{i.length===0?t(new Error("请输入账号")):t()}}],password:[{trigger:"change",validator:(f,i,t)=>{i.length===0?t(new Error("请输入密码")):i.length<6||i.length>16?t(new Error("密码应为6~16位的任意组合")):t()}}],verifyCode:[{trigger:"blur",validator:(f,i,t)=>{console.log(i,d.value),i.length===0?t(new Error("请输入验证码")):i.length<4?t(new Error("请输入正确的验证码")):d.value!==i?t(new Error("请输入正确的验证码")):d.value===i&&t()}}]},x=async()=>{await u.value.validate(),l.value=!0;try{await o.userLogin(r);return}catch(f){l.value=!1,K({type:"error",message:f})}};return(f,i)=>{const t=ke,_=Ve,w=xe,Y=ze,ee=He,te=Ne,oe=we;return C(),H("div",Ye,[p(oe,null,{default:g(()=>[p(t,{span:12,xs:0}),p(t,{span:12,xs:24},{default:g(()=>[p(te,{class:"login_form"},{default:g(()=>[et,p(Y,{model:r,rules:T,ref_key:"loginForms",ref:u},{default:g(()=>[p(w,{prop:"username"},{default:g(()=>[p(_,{"prefix-icon":c(Ee),modelValue:r.username,"onUpdate:modelValue":i[0]||(i[0]=I=>r.username=I),clearable:"",placeholder:"请输入用户名",size:"large"},null,8,["prefix-icon","modelValue"])]),_:1}),p(w,{prop:"password"},{default:g(()=>[p(_,{type:"password","prefix-icon":c(Me),"show-password":"",modelValue:r.password,"onUpdate:modelValue":i[1]||(i[1]=I=>r.password=I),size:"large",placeholder:"请输入密码",clearable:""},null,8,["prefix-icon","modelValue"])]),_:1}),p(w,{prop:"verifyCode"},{default:g(()=>[p(_,{"prefix-icon":c(Te),"show-password":"",modelValue:r.verifyCode,"onUpdate:modelValue":i[2]||(i[2]=I=>r.verifyCode=I),placeholder:"VerifyCode",size:"large",maxlength:"4"},{append:g(()=>[p(Qe,{identifyCode:d.value,onClick:h},null,8,["identifyCode"])]),_:1},8,["prefix-icon","modelValue"])]),_:1})]),_:1},8,["model"]),p(w,null,{default:g(()=>[p(ee,{loading:c(l),class:"login_btn",type:"primary",size:"default",onClick:x},{default:g(()=>[Ie(" 登录 ")]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1})]),_:1})])}}}),st=Q(tt,[["__scopeId","data-v-abbc57f5"]]);export{st as default};