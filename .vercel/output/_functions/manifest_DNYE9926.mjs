import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BvC-flhu.mjs';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_BS2szf8N.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Faia%20Facundo/Desktop/Programacion/proyectos_workana/womb_form/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/analytics.CTHjrrb3.css"}],"routeData":{"route":"/analytics","isIndex":false,"type":"page","pattern":"^\\/analytics\\/?$","segments":[[{"content":"analytics","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/analytics.astro","pathname":"/analytics","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/analytics.CTHjrrb3.css"}],"routeData":{"route":"/colors","isIndex":false,"type":"page","pattern":"^\\/colors\\/?$","segments":[[{"content":"colors","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/colors.astro","pathname":"/colors","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/analytics.CTHjrrb3.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/analytics.CTHjrrb3.css"}],"routeData":{"route":"/quiz","isIndex":false,"type":"page","pattern":"^\\/quiz\\/?$","segments":[[{"content":"quiz","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/quiz.astro","pathname":"/quiz","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/analytics.CTHjrrb3.css"}],"routeData":{"route":"/singup","isIndex":false,"type":"page","pattern":"^\\/singup\\/?$","segments":[[{"content":"singup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/singup.astro","pathname":"/singup","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/analytics.CTHjrrb3.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/analytics.astro",{"propagation":"none","containsHead":true}],["C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/colors.astro",{"propagation":"none","containsHead":true}],["C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/quiz.astro",{"propagation":"none","containsHead":true}],["C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/singup.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/quiz@_@astro":"pages/quiz.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/analytics@_@astro":"pages/analytics.astro.mjs","\u0000@astro-page:src/pages/colors@_@astro":"pages/colors.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/singup@_@astro":"pages/singup.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Cs_7kq61.mjs","\u0000@astrojs-manifest":"manifest_DNYE9926.mjs","C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/components/ColorPalette":"_astro/ColorPalette.-JOSyNgX.js","C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/components/LoginForm":"_astro/LoginForm.Bd1WqD9v.js","C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/components/SignupForm":"_astro/SignupForm.DZMU2t_c.js","@astrojs/react/client.js":"_astro/client.CqOUPTCf.js","C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/components/Analytics":"_astro/Analytics.0VR4q1J1.js","C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/components/QuizForm":"_astro/QuizForm.kT7HBalS.js","C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/components/QuizForm.tsx":"_astro/QuizForm.BVCUxJc7.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/analytics.CTHjrrb3.css","/COLD.jpg","/cold_freebie.pdf","/DAMP.jpg","/damp_freebie.pdf","/HEALTHY.jpg","/healthy_freebie.pdf","/HOT.jpg","/hot_freebie.pdf","/mobile.jpg","/STUCK.jpg","/stuck_freebie.pdf","/assets/logo.ico","/assets/logo.png","/assets/logoZZ.svg","/fonts/FiguraSans_Medium.ttf","/fonts/HV_Florentino_Regular.ttf","/_astro/Analytics.0VR4q1J1.js","/_astro/browser.DpK-J-9u.js","/_astro/client.CqOUPTCf.js","/_astro/ColorPalette.-JOSyNgX.js","/_astro/index.wSCK2UMg.js","/_astro/jsx-runtime.BAVgcCJU.js","/_astro/LoginForm.Bd1WqD9v.js","/_astro/QuizForm.BVCUxJc7.js","/_astro/QuizForm.kT7HBalS.js","/_astro/SignupForm.DZMU2t_c.js","/_astro/supabase.Bp_RxVFO.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"8QkjrHzT9VVHbZokv7qyjcdgFNC1459Jl2cYBuNn7MQ="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
