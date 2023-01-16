import{d as i,r as c,c as v,a as m,u as o,b as p,o as C}from"./index.4fdc9502.js";const k=i({__name:"index",setup(_){let l=c([{title:"\u8D2D\u7269",start:"2023-01-01 08:00",end:"2023-01-05 00:00",editable:!0},{title:"\u5199\u4EE3\u7801",start:"2023-01-11 08:00",end:"2023-01-15 12:00"}]);const a=e=>{console.log(e),l.value.push({start:e.dateStr+" 12:00",end:e.dateStr+" 18:00",title:"\u5B66\u4E60"})};let s=e=>{let n=document.createElement("div"),t=e.timeText.split("-"),d=t[0],r=t[1];return n.innerHTML=`
          <div>\u5F00\u59CB\u65F6\u95F4: ${d}</div>
          <div>\u7ED3\u675F\u65F6\u95F4: ${r}</div>
            <div>\u884C\u7A0B: <strong>${e.event.title}</strong></div>
        `,{domNodes:[n]}};const u=e=>{console.log(e)};return(e,n)=>{const t=p("m-calendar");return C(),v("div",null,[m(t,{events:o(l),displayEventEnd:"",eventContent:o(s),onDateClick:a,onEventClick:u},null,8,["events","eventContent"])])}}});export{k as default};
