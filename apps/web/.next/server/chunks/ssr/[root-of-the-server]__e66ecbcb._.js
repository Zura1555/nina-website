module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},34005,a=>{a.n(a.i(77930))},43619,a=>{a.n(a.i(79962))},13718,a=>{a.n(a.i(85523))},18198,a=>{a.n(a.i(45518))},62212,a=>{a.n(a.i(66114))},54799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},87127,a=>{"use strict";function b(a){return"object"==typeof a&&null!==a&&!Array.isArray(a)}var c={0:8203,1:8204,2:8205,3:8290,4:8291,5:8288,6:65279,7:8289,8:119155,9:119156,a:119157,b:119158,c:119159,d:119160,e:119161,f:119162},d={0:8203,1:8204,2:8205,3:65279};[,,,,].fill(String.fromCodePoint(d[0])).join(""),Object.fromEntries(Object.entries(d).map(a=>a.reverse())),Object.fromEntries(Object.entries(c).map(a=>a.reverse()));var e=`${Object.values(c).map(a=>`\\u{${a.toString(16)}}`).join("")}`,f=RegExp(`[${e}]{4,}`,"gu");function g(a){var b,c;return a&&JSON.parse({cleaned:(b=JSON.stringify(a)).replace(f,""),encoded:(null==(c=b.match(f))?void 0:c[0])||""}.cleaned)}a.s(["isRecord",()=>b,"stegaClean",()=>g])},54625,a=>{"use strict";var b=a.i(19693);let c=`*[_type == "project"]|order(_createdAt desc){
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
}`;async function f(){return b.client.fetch(c)}async function g(){return b.client.fetch(d)}async function h(){return b.client.fetch(e)}a.s(["getFeaturedProjects",()=>g,"getLatestPosts",()=>h,"getProjects",()=>f])},13053,a=>{"use strict";a.s(["HomeContent",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call HomeContent() from the server but HomeContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/apps/web/src/components/HomeContent.tsx <module evaluation>","HomeContent")},16052,a=>{"use strict";a.s(["HomeContent",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call HomeContent() from the server but HomeContent is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/apps/web/src/components/HomeContent.tsx","HomeContent")},84916,a=>{"use strict";a.i(13053);var b=a.i(16052);a.n(b)},52204,a=>{"use strict";var b=a.i(7997),c=a.i(84916),d=a.i(54625);async function e(){let[a,e]=await Promise.all([(0,d.getFeaturedProjects)(),(0,d.getLatestPosts)()]);return(0,b.jsx)(c.HomeContent,{featuredProjects:a,latestPosts:e})}a.s(["default",()=>e,"metadata",0,{title:"Nina's Personal Website",description:"Personal brand, projects, and blog by Nina"}])},9489,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@sanity_client_dist__chunks-es_stegaEncodeSourceMap_e91a1003.js"].map(b=>a.l(b))).then(()=>b(14025)))},76016,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__48ac7fed._.js"].map(b=>a.l(b))).then(()=>b(12374)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__e66ecbcb._.js.map