import{u as e,a as t,r as a,ac as r,b as l,d as s,e as o,w as u,ad as d,i as c,f as n,k as i,l as p,t as m,m as _,n as x,T as f,q as v,Q as h,v as b}from"./index.61b5b460.js";import{t as g}from"./topNav.ecc43495.js";import{o as y,b as k,r as S}from"./request.ef5cbed2.js";import{L as j}from"./en-US.bcbc83b2.js";const C={__name:"txid",setup(C){const T=e(),{t:w}=t(),U=a(""),V=a(!1),q=(e,t,a)=>{V.value=!1,N.value.cert=JSON.parse(e.responseText).data},N=a({tx_id:"",order_no:"",cert:""}),z=()=>{V.value=!1};return y((()=>{S({url:"finance/usdt/recharge/index",methods:"get"}).then((e=>{if(!e.order)return d({url:"../tabbar/index"}),!1;U.value=e.upload_host;try{N.value.tx_id=e.order.tx_id,N.value.order_no=e.order.order_no,N.value.cert=e.order.cert,e.order.cert&&(V.value=!0)}catch(t){}})),r.use("en-US",j)})),k((e=>{e.order&&(N.value.order_no=e.order)})),(e,t)=>{const a=c,r=h,d=l("nut-uploader"),y=b,k=l("nut-icon");return s(),o(a,null,{default:u((()=>[n(g,{title:i(w)("recharge.r_r1")},null,8,["title"]),n(a,{class:"pdlr45 mt70"},{default:u((()=>[n(a,{class:"pl14"},{default:u((()=>[p(" Txid ")])),_:1}),n(a,{class:"mt34"},{default:u((()=>[n(r,{class:"inp",placeholder:"txid","placeholder-class":"colorC",modelValue:N.value.tx_id,"onUpdate:modelValue":t[0]||(t[0]=e=>N.value.tx_id=e)},null,8,["modelValue"])])),_:1}),n(a,{class:"pl14 mt59"},{default:u((()=>[p(m(i(w)("recharge.r_r7")),1)])),_:1}),n(a,{class:"mt34 flex",style:{position:"relative"}},{default:u((()=>[n(d,{url:U.value+"api/uploads",name:"cert",type:"image/jpeg",onSuccess:q,style:{"border-radius":"20rpx"}},null,8,["url"]),V.value?(s(),o(a,{key:0,class:"",style:{position:"absolute",left:"0"}},{default:u((()=>[n(y,{src:U.value+N.value.cert,style:{width:"200rpx",height:"200rpx","border-radius":"20rpx"}},null,8,["src"])])),_:1})):_("",!0),V.value?(s(),o(k,{key:1,name:"close-little",size:"15",style:{position:"absolute",top:"-10rpx",left:"180rpx"},onClick:z})):_("",!0)])),_:1}),n(a,{class:"center l_inpS mt40 l_inpBg pdlr30 text_white mt40 f32",onClick:t[1]||(t[1]=e=>{S({url:"/finance/usdt/recharge/cert",methods:"post",data:{...N.value}}).then((e=>{f.text("Success"),setTimeout((()=>{v({url:"../tabbar/index"})}),500)})).catch((e=>{f.text(e.message)}))}),style:x({background:i(T).$state.contentColor})},{default:u((()=>[p(m(i(w)("recharge.r_r11")),1)])),_:1},8,["style"])])),_:1})])),_:1})}}};export{C as default};