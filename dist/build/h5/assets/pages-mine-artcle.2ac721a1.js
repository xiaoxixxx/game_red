import{u as a,a as e,r as t,o as s,c as l,d as n,e as o,w as r,T as d,i as u,f as i,m}from"./index.61b5b460.js";import{_ as c}from"./loading.d21df86d.js";import{_ as f,b as p,a as v,r as _}from"./request.ef5cbed2.js";import{t as g}from"./topNav.ecc43495.js";var h=f({__name:"artcle",setup(f){a(),e();const h=t({name:"",des:"",content:""}),b=t(0),x=t(null);return s((()=>{x.value.loading=!0,setTimeout((()=>{x.value.loading=!1}),1e3)})),p((a=>{a.pos&&(b.value=a.pos,_({url:"page/article/detail",methods:"get",data:{id:b.value}}).then((a=>{a.name?h.value=a:(d.text("No more data"),history.back())})))})),(a,e)=>{const t=u,s=v(l("Loading"),c);return n(),o(t,null,{default:r((()=>[h.value.name?(n(),o(t,{key:0},{default:r((()=>[i(g,{title:h.value.name},null,8,["title"]),i(t,{class:"pdlr30 mt70"},{default:r((()=>[i(t,{class:"mainBox"},{default:r((()=>[i(t,{innerHTML:h.value.contents},null,8,["innerHTML"])])),_:1})])),_:1}),i(t,{style:{height:"100rpx"}})])),_:1})):m("",!0),i(s,{ref_key:"showLoading",ref:x},null,512)])),_:1})}}},[["__scopeId","data-v-1fecc14d"]]);export{h as default};
