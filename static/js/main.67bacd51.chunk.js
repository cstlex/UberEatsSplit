(this.webpackJsonpuber_eats_split=this.webpackJsonpuber_eats_split||[]).push([[0],{15:function(e,t,c){},16:function(e,t,c){"use strict";c.r(t);var l=c(1),a=c.n(l),s=c(8),n=c.n(s),i=c(9),r=c(2),d=c(7),b=c.p+"static/media/add.2ce57a1b.svg",j=c(3),h=c(0);function u(e,t){return"$"+function(e){var t=parseFloat(e);return isNaN(t)?0:t}(e.toFixed(null!==t&&void 0!==t?t:2)).toLocaleString()}function m(e){if(!e)return 0;var t=parseFloat(e.replace(/(?!\.)\D/g,"").replace(/(?!^0$)^0+/g,""));return isNaN(t)?0:t}var o={name:"",menu:"",price:0};function x(){var e=a.a.useState([o]),t=Object(d.a)(e,2),c=t[0],l=t[1],s=a.a.useState({allServiceFees:0,discount:0,tip:0,isTipAbsolute:!0,taxRate:13}),n=Object(d.a)(s,2),x=n[0],O=n[1],f=x.isTipAbsolute,p=function(e){O(Object(r.a)(Object(r.a)({},x),{},{isTipAbsolute:e}))},g=function(e,t){l(c.map((function(c,l){return l===t?Object(r.a)(Object(r.a)({},c),e):c})))},N=function(e){O(Object(r.a)(Object(r.a)({},x),e))},v=c.map((function(e){return e.price})).reduce((function(e,t){return e+t})),w=(v+x.allServiceFees)*(x.taxRate/100),F=f?x.tip:(v+w)*(x.tip/100);return Object(h.jsxs)("div",{className:"w-screen h-screen p-5 flex flex-1 flex-col",children:[Object(h.jsxs)("div",{className:"flex-1 flex flex-col flex-grow overflow-scroll",children:[Object(h.jsx)("span",{className:"font-medium text-xl",children:"UberEats Bill Split"}),Object(h.jsxs)("table",{className:"w-full mt-3 border-separate table-fixed",children:[Object(h.jsx)("thead",{className:"bg-blue-thead",children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{children:"Name"}),Object(h.jsx)("th",{className:"hidden sm:table-cell",children:"Menu"}),Object(h.jsx)("th",{children:"Price"}),Object(h.jsx)("th",{className:"hidden sm:table-cell",children:"Fee"}),Object(h.jsx)("th",{className:"hidden sm:table-cell",children:"Tax"}),Object(h.jsx)("th",{className:"hidden sm:table-cell",children:"Tip"}),Object(h.jsx)("th",{className:"hidden sm:table-cell",children:"Discount"}),Object(h.jsx)("th",{children:"Total"}),Object(h.jsx)("th",{children:"Manage"})]})}),Object(h.jsxs)("tbody",{children:[c.map((function(e,t){return Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:Object(h.jsx)("input",{className:"w-full",value:e.name,placeholder:"Name",onChange:function(e){return g({name:e.target.value},t)}})}),Object(h.jsx)("td",{className:"hidden sm:table-cell",children:Object(h.jsx)("input",{className:"w-full",value:e.menu,placeholder:"Menu",onChange:function(e){return g({menu:e.target.value},t)}})}),Object(h.jsx)("td",{children:Object(h.jsx)(j.a,{className:"w-full",prefix:"$",defaultValue:e.price,placeholder:"Price",decimalsLimit:5,onValueChange:function(e){return g({price:m(e)},t)}})}),Object(h.jsx)("td",{className:"bg-gray-200 hidden sm:table-cell",children:u(x.allServiceFees/c.length,5)}),Object(h.jsx)("td",{className:"bg-gray-200 hidden sm:table-cell",children:u((e.price+x.allServiceFees/c.length)*(x.taxRate/100),5)}),Object(h.jsx)("td",{className:"bg-gray-200 hidden sm:table-cell",children:u(F/c.length)}),Object(h.jsx)("td",{className:"bg-gray-200 hidden sm:table-cell",children:u(x.discount/c.length)}),Object(h.jsx)("td",{className:"bg-gray-200",children:u((e.price+x.allServiceFees/c.length)*(1+x.taxRate/100)+x.tip/c.length-x.discount/c.length)}),Object(h.jsx)("td",{children:Object(h.jsx)("button",{className:"text-base bg-gray-35 h-7 w-20 text-center text-white rounded my-auto ml-1 md:ml-2 mt-2 md:mt-0 mb-2 md:mb-0",onClick:function(){return e=t,void l(c.filter((function(t,c){return c!==e})));var e},children:"Delete"})})]},"".concat(t,"-").concat(c.length))})),Object(h.jsxs)("tr",{className:"bg-gray-300",children:[Object(h.jsx)("td",{children:"Subtotal"}),Object(h.jsx)("td",{className:"hidden sm:table-cell"}),Object(h.jsx)("td",{children:u(v)}),Object(h.jsx)("td",{className:"hidden sm:table-cell",children:u(x.allServiceFees)}),Object(h.jsx)("td",{className:"hidden sm:table-cell",children:u(w)}),Object(h.jsx)("td",{className:"hidden sm:table-cell",children:u(F)}),Object(h.jsx)("td",{className:"hidden sm:table-cell",children:u(x.discount)}),Object(h.jsx)("td",{children:u(c.map((function(e){return function(e,t,c){return(e.price+t.allServiceFees/c)*(1+t.taxRate/100)+t.tip/c-t.discount/c}(e,x,c.length)})).reduce((function(e,t){return e+t})))})]})]})]}),Object(h.jsx)("table",{className:"w-full sm:w-2/3 table-fixed mt-3 mb-4",children:Object(h.jsxs)("tbody",{className:"bg-gray-200",children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{className:"hidden sm:table-cell",children:"All Fees (Service fee, Delivery fee, ... etc)"}),Object(h.jsx)("td",{className:"sm:hidden",children:"Fees"}),Object(h.jsx)("td",{children:Object(h.jsx)(j.a,{className:"w-full bg-transparent",prefix:"$",defaultValue:x.allServiceFees,placeholder:"Fees",decimalsLimit:5,onValueChange:function(e){return N({allServiceFees:m(e)})}})})]}),Object(h.jsxs)("tr",{children:[Object(h.jsxs)("td",{className:"flex flex-row",children:["Tip",Object(h.jsxs)("div",{className:"ml-auto mr-3 flex-col sm:flex-row",children:[Object(h.jsxs)("label",{className:"inline-flex items-center ml-2 sm:ml-0",children:[Object(h.jsx)("input",{type:"checkbox",className:"form-checkbox h-3 w-3 text-blue-600",checked:!f,onChange:function(){return p(!1)}}),Object(h.jsx)("span",{className:"ml-1 text-gray-700",children:"Percent"})]}),Object(h.jsxs)("label",{className:"inline-flex items-center ml-2",children:[Object(h.jsx)("input",{type:"checkbox",className:"form-checkbox h-3 w-3 text-blue-600",checked:f,onChange:function(){return p(!0)}}),Object(h.jsx)("span",{className:"ml-1 text-gray-700",children:"Absolute"})]})]})]}),Object(h.jsx)("td",{children:Object(h.jsx)(j.a,{className:"w-full bg-transparent",prefix:f?"$":"",defaultValue:x.tip,placeholder:"Tax",decimalsLimit:5,onValueChange:function(e){return N({tip:m(e)})}},"".concat(f).concat(x.tip))})]}),Object(h.jsxs)("tr",{children:[Object(h.jsxs)("td",{className:"flex flex-row",children:["Tax",Object(h.jsxs)("div",{className:"ml-auto mr-3 flex-row",children:[Object(h.jsx)(j.a,{className:"bg-white w-20 ml-3 text-right pr-1",prefix:"$",defaultValue:x.taxRate,placeholder:"Tax",decimalsLimit:5,onValueChange:function(e){return N({taxRate:m(e)})}}),"%"]})]}),Object(h.jsx)("td",{children:u(w)})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("td",{children:"Discount"}),Object(h.jsx)("td",{children:Object(h.jsx)(j.a,{className:"w-full bg-transparent",prefix:"$",defaultValue:x.discount,placeholder:"Discount",decimalsLimit:5,onValueChange:function(e){return N({discount:m(e)})}})})]})]})})]}),Object(h.jsx)("div",{className:"absolute mb-4 mr-4 bottom-0 right-0",children:Object(h.jsx)("button",{className:"p-0 w-16 h-16 bg-blue-highlight rounded-full hover:bg-blue-hover active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none",onClick:function(){l([].concat(Object(i.a)(c),[o]))},children:Object(h.jsx)("img",{className:"w-10 h-10 inline-block",src:b})})})]})}c(15);var O=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,17)).then((function(t){var c=t.getCLS,l=t.getFID,a=t.getFCP,s=t.getLCP,n=t.getTTFB;c(e),l(e),a(e),s(e),n(e)}))};n.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(x,{})}),document.getElementById("root")),O()}},[[16,1,2]]]);
//# sourceMappingURL=main.67bacd51.chunk.js.map