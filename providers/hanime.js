// Hanime.tv public-page metadata adapter. No login, DRM, or stream URL extraction.
const BASE = "https://hanime.tv";
const esc = s => String(s || "").replace(/&amp;/g,"&").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">");
function meta(html, key) { const re = new RegExp('<meta[^>]+(?:property|name)=["\\']'+key+'["\\'][^>]+content=["\\']([^"\\']+)["\\']','i'); const m=html.match(re); return m?esc(m[1]):""; }
function links(html) { const out=[]; const re=/<a\\b[^>]*href=["']([^"']+)["'][^>]*>([\\s\\S]*?)<\\/a>/gi; let m; while((m=re.exec(html))){const href=m[1], text=esc(m[2].replace(/<[^>]+>/g," ").replace(/\\s+/g," ").trim()); if(text && /\\/(?:videos|video|anime|watch)\\//i.test(href)) out.push({title:text,url:new URL(href,BASE).href});} return [...new Map(out.map(x=>[x.url,x])).values()]; }
async function fetchPage(url){const r=await fetch(url,{headers:{"User-Agent":"Mozilla/5.0 (compatible; NuvioMetadata/1.0)"}}); if(!r.ok) throw new Error("HTTP "+r.status); return r.text();}
async function search(query){const html=await fetchPage(BASE+"/search?query="+encodeURIComponent(query)); return links(html).map(x=>({...x,source:"Hanime.tv",poster:""}));}
async function details(url){const html=await fetchPage(new URL(url,BASE).href); return {title:meta(html,"og:title")||meta(html,"twitter:title"),description:meta(html,"og:description")||meta(html,"description"),poster:meta(html,"og:image"),url:new URL(url,BASE).href,source:"Hanime.tv"};}
async function getStreams(){return [];} // playback intentionally not scraped
module.exports={search,details,getStreams};
