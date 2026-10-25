// HentaiHaven public-page metadata adapter. No protected playback extraction.
const BASE="https://hentaihaven.xxx";
const decode=s=>String(s||"").replace(/&amp;/g,"&").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
function meta(html,key){const m=html.match(new RegExp('<meta[^>]+(?:property|name)=["\\']'+key+'["\\'][^>]+content=["\\']([^"\\']+)["\\']','i'));return m?decode(m[1]):"";}
function parseCards(html){const out=[],re=/<a\\b[^>]*href=["']([^"']+)["'][^>]*>([\\s\\S]*?)<\\/a>/gi;let m;while((m=re.exec(html))){const title=decode(m[2].replace(/<[^>]+>/g," ").replace(/\\s+/g," ").trim());if(title && /(?:anime|episode|series|watch|video)/i.test(m[1]+" "+title)){out.push({title,url:new URL(m[1],BASE).href,source:"HentaiHaven"});}}return [...new Map(out.map(x=>[x.url,x])).values()];}
async function fetchPage(url){const r=await fetch(url,{headers:{"User-Agent":"Mozilla/5.0 (compatible; NuvioMetadata/1.0)"}});if(!r.ok)throw new Error("HTTP "+r.status);return r.text();}
async function search(query){return parseCards(await fetchPage(BASE+"/?s="+encodeURIComponent(query)));}
async function details(url){const html=await fetchPage(new URL(url,BASE).href);return {title:meta(html,"og:title"),description:meta(html,"og:description")||meta(html,"description"),poster:meta(html,"og:image"),url:new URL(url,BASE).href,source:"HentaiHaven"};}
async function getStreams(){return [];}
module.exports={search,details,getStreams};
