(()=>{"use strict";function e(e){console.log(e);let t=JSON.parse(JSON.stringify(i[e])),c=[...i.slice(0,e),...i.slice(e+1)];c.forEach(((t,c)=>{c>=e&&t.id--})),i=c,t.id=r;let n=[...a,t];a=n,o()}function t(e){console.log(e);let t=JSON.parse(JSON.stringify(a[e])),c=[...a.slice(0,e),...a.slice(e+1)];c.forEach(((t,c)=>{c>=e&&t.id--})),a=c,t.id=n;let r=[...i,t];i=r,o()}function c(e){console.log(e);let t=[...i.slice(0,e),...i.slice(e+1)];t.forEach(((t,c)=>{c>=e&&t.id--})),i=t,o()}let n,r,i=[],a=[];function d(e){if(0===e.length)return"<tr><td>You don't have any notes</td></tr>";{let t="";return e.map((({text:c,time:n,id:r,category:a,dates:d})=>{let o;o=e===i?`<button class="archive btn btn-secondary" data-id='${r}'>Archive</button>\n      <button class="delete btn btn-danger" data-id='${r}'>X</button>`:`<button class="unarchive btn btn-secondary" data-id='${r}'>Unarchive</button>`,t+=`<tr>\n      <td>${n}</td><td contenteditable class='text' id='${r}''>${c}</td><td>${a}</td><td>${d}</td>\n      <td>${o}</td>\n      </tr>`})),t}}function o(){const o=document.querySelector(".list"),s=document.querySelector(".archived-list");let u=d(i);o.innerHTML=u;let h=d(a);s.innerHTML=h,l("archive",e),l("delete",c),l("unarchive",t),document.querySelectorAll(".text").forEach((e=>{let t=+e.getAttribute("id");e.addEventListener("input",(e=>{!function(e,t){i.forEach((c=>{if(c.id===t){let n=JSON.parse(JSON.stringify(c));n.text=e;let r=/\d+\/\d+\/\d+/.exec(e)||"-";n.dates=r;let a=[...i.slice(0,t),n,...i.slice(t+1)];i=a}})),a.forEach((c=>{if(c.id===t){let n=JSON.parse(JSON.stringify(c));n.text=e;let r=/\d+\/\d+\/\d+/.exec(e)||"-";n.dates=r;let i=[...a.slice(0,t),n,...a.slice(t+1)];a=i}}))}(e.target.innerHTML,t)}))})),n=i.length,r=a.length,function(){let e=0,t=0,c=0,n=0,r=0,d=0;i.forEach((t=>{switch(t.category){case"Task":e++;break;case"Random thought":c++;break;case"Idea":r++}})),a.forEach((e=>{switch(e.category){case"Task":t++;break;case"Random thought":n++;break;case"Idea":d++}}));const o=document.querySelector(".tasks-active"),l=document.querySelector(".tasks-archived"),s=document.querySelector(".thoughts-active"),u=document.querySelector(".thoughts-archived"),h=document.querySelector(".ideas-active"),g=document.querySelector(".ideas-archived");o.innerHTML=e,l.innerHTML=t,s.innerHTML=c,u.innerHTML=n,h.innerHTML=r,g.innerHTML=d}()}function l(e,t){document.querySelectorAll(`.${e}`).forEach((e=>{let c=+e.getAttribute("data-id");e.addEventListener("click",(()=>t(c)))}))}const s=document.querySelector(".form"),u=document.querySelector(".create"),h=document.querySelector(".close-form"),g=document.querySelector(".get-archived"),f=document.querySelector(".archive");o(),s.addEventListener("submit",(function(e){e.preventDefault();let t=e.target.elements;if(""===t[0].value)return;let c=(new Date).toLocaleTimeString(),r=/\d+\/\d+\/\d+/.exec(t[0].value)||"-";i.push({text:t[0].value,time:c,category:t[1][t[1].options.selectedIndex].label,dates:r,id:n}),o(),e.target.elements[0].value=""})),u.addEventListener("click",(()=>{s.classList.toggle("hide")})),h.addEventListener("click",(()=>{s.classList.add("hide")})),g.addEventListener("click",(()=>{f.classList.toggle("hide")}))})();