module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},34005,a=>{a.n(a.i(77930))},43619,a=>{a.n(a.i(79962))},13718,a=>{a.n(a.i(85523))},18198,a=>{a.n(a.i(45518))},62212,a=>{a.n(a.i(66114))},54799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},87127,a=>{"use strict";function b(a){return"object"==typeof a&&null!==a&&!Array.isArray(a)}var c={0:8203,1:8204,2:8205,3:8290,4:8291,5:8288,6:65279,7:8289,8:119155,9:119156,a:119157,b:119158,c:119159,d:119160,e:119161,f:119162},d={0:8203,1:8204,2:8205,3:65279};[,,,,].fill(String.fromCodePoint(d[0])).join(""),Object.fromEntries(Object.entries(d).map(a=>a.reverse())),Object.fromEntries(Object.entries(c).map(a=>a.reverse()));var e=`${Object.values(c).map(a=>`\\u{${a.toString(16)}}`).join("")}`,f=RegExp(`[${e}]{4,}`,"gu");function g(a){var b,c;return a&&JSON.parse({cleaned:(b=JSON.stringify(a)).replace(f,""),encoded:(null==(c=b.match(f))?void 0:c[0])||""}.cleaned)}a.s(["isRecord",()=>b,"stegaClean",()=>g])},24070,a=>{"use strict";var b=a.i(7997),c=a.i(28472);function d({children:a,className:d,size:e="default"}){return(0,b.jsx)("div",{className:(0,c.cn)("w-full mx-auto px-6 md:px-8",{"max-w-[1280px]":"default"===e,"max-w-[768px]":"narrow"===e,"max-w-[1536px]":"wide"===e},d),children:a})}a.s(["Container",()=>d])},54625,a=>{"use strict";var b=a.i(19693);let c=`*[_type == "project"]|order(_createdAt desc){
  _id,
  title,
  slug,
  description,
  tags,
  featured,
  mainImage,
  link,
  github,
  publishedAt
}`,d=`*[_type == "project" && featured == true]|order(_createdAt desc){
  _id,
  title,
  slug,
  description,
  tags,
  featured,
  mainImage,
  link,
  github,
  publishedAt
}`,e=`*[_type == "post"]|order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  mainImage,
  "tags": tags
}`;async function f(){return b.client.fetch(c)}async function g(){return b.client.fetch(d)}async function h(){return b.client.fetch(e)}a.s(["getFeaturedProjects",()=>g,"getLatestPosts",()=>h,"getProjects",()=>f])},62128,a=>{"use strict";a.s(["ProjectCard",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call ProjectCard() from the server but ProjectCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/apps/web/src/components/ProjectCard.tsx <module evaluation>","ProjectCard")},53530,a=>{"use strict";a.s(["ProjectCard",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call ProjectCard() from the server but ProjectCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/apps/web/src/components/ProjectCard.tsx","ProjectCard")},10747,a=>{"use strict";a.i(62128);var b=a.i(53530);a.n(b)},94846,a=>{"use strict";var b=a.i(7997),c=a.i(24070),d=a.i(10747),e=a.i(54625);async function f(){let a=await (0,e.getProjects)();return(0,b.jsx)("section",{className:"py-16 md:py-24",children:(0,b.jsxs)(c.Container,{children:[(0,b.jsxs)("div",{className:"mb-12 md:mb-16",children:[(0,b.jsx)("h1",{className:"text-4xl md:text-5xl font-bold text-foreground mb-4",children:"Projects & Work"}),(0,b.jsx)("p",{className:"text-lg text-muted-foreground max-w-2xl",children:"A collection of projects, initiatives, and creative endeavors I've worked on. Each one represents a piece of my journey and the lessons I've learned along the way."})]}),(0,b.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",children:a.map((a,c)=>(0,b.jsx)(d.ProjectCard,{project:a,index:c},a._id))})]})})}a.s(["default",()=>f,"metadata",0,{title:"Projects & Work",description:"A collection of projects, initiatives, and creative endeavors I've worked on."}])},9489,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@sanity_client_dist__chunks-es_stegaEncodeSourceMap_e91a1003.js"].map(b=>a.l(b))).then(()=>b(14025)))},76016,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__48ac7fed._.js"].map(b=>a.l(b))).then(()=>b(12374)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__4a27ad41._.js.map