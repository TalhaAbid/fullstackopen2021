(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){"use strict";t.r(n);var r=t(1),o=t(15),c=t.n(o),a=t(6),u=t(3),i=t(4),s=t.n(i),d="/api/persons",l={createPerson:function(e){return s.a.post(d,e).then((function(e){return e.data}))},getPersons:function(){return s.a.get(d).then((function(e){return e.data}))},personDelete:function(e){return s.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},personUpdate:function(e){return s.a.put("".concat(d,"/").concat(e.id),e).then((function(e){return e.data}))}},b=t(0),j=function(e){var n=e.value,t=e.handleFilterChange;return Object(b.jsxs)("div",{children:["filter shown with"," ",Object(b.jsx)("input",{type:"text",value:n,onChange:t})]})},f=function(e){var n=e.formSubmit,t=e.name,r=e.nameChange,o=e.number,c=e.numberChange;return Object(b.jsxs)("form",{onSubmit:n,children:[Object(b.jsxs)("div",{children:["name: ",Object(b.jsx)("input",{value:t,onChange:r})]}),Object(b.jsxs)("div",{children:["number: ",Object(b.jsx)("input",{value:o,onChange:c})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",children:" add"})})]})},h=function(e){var n=e.persons,t=e.handleDelete;return Object(b.jsx)("div",{children:n.map((function(e){return Object(b.jsxs)("p",{children:[e.name," ",e.number,Object(b.jsx)("button",{onClick:function(){return t(e)},children:"delete"})]},e.name)}))})},m={color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},O={color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},p=function(e){var n=e.message,t=e.error;return null===n?Object(b.jsx)("p",{}):Object(b.jsx)("div",{style:t?O:m,children:n})},g=function(){var e=Object(r.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(r.useState)("First Last"),i=Object(u.a)(c,2),s=i[0],d=i[1],m=Object(r.useState)("000-000-0000"),O=Object(u.a)(m,2),g=O[0],v=O[1],x=Object(r.useState)(""),S=Object(u.a)(x,2),w=S[0],C=S[1],y=Object(r.useState)(null),k=Object(u.a)(y,2),D=k[0],P=k[1],B=Object(r.useState)(!0),F=Object(u.a)(B,2),L=F[0],T=F[1];Object(r.useEffect)((function(){l.getPersons().then((function(e){return o(e)}))}),[]);var z=t.filter((function(e){return e.name.toLowerCase().includes(w.toLowerCase())}));return Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"Phonebook"}),Object(b.jsx)(p,{message:D,error:L}),Object(b.jsx)(j,{value:w,handleFilterChange:function(e){return C(e.target.value)}}),Object(b.jsx)(f,{formSubmit:function(e){e.preventDefault();var n={name:s,number:g},r=t.filter((function(e){return e.name===s}));if(r.length>0){if(!window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?")))return;var c=Object(a.a)(Object(a.a)({},r[0]),{},{number:g});l.personUpdate(c).then((function(e){return o(t.map((function(n){return n.id!==e.id?n:e})))})).catch((function(){T(!0),P(" information of ".concat(c.name," has already been removed from server")),setTimeout((function(){return P(null)}),5e3),o(t.filter((function(e){return e.id!==c.id})))}))}else l.createPerson(n).then((function(e){T(!1),P("Added ".concat(e.name)),setTimeout((function(){return P(null)}),5e3),o(t.concat(e))})).catch((function(e){T(!0),P(e.response.data.error),setTimeout((function(){return P(null)}),5e3)}));d(""),v("")},name:s,nameChange:function(e){return d(e.target.value)},number:g,numberChange:function(e){return v(e.target.value)}}),Object(b.jsx)("h2",{children:"Numbers"}),Object(b.jsx)(h,{handleDelete:function(e){window.confirm("Delete ".concat(e.name))&&l.personDelete(e.id).then((function(){return o(t.filter((function(n){return n.id!==e.id})))}))},persons:z})]})};c.a.render(Object(b.jsx)(g,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.ea1dad92.chunk.js.map