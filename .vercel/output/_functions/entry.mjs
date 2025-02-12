import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_dc7SZSZg.mjs';
import { manifest } from './manifest_D11NsfDj.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/analytics.astro.mjs');
const _page2 = () => import('./pages/colors.astro.mjs');
const _page3 = () => import('./pages/login.astro.mjs');
const _page4 = () => import('./pages/quiz.astro.mjs');
const _page5 = () => import('./pages/singup.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/analytics.astro", _page1],
    ["src/pages/colors.astro", _page2],
    ["src/pages/login.astro", _page3],
    ["src/pages/quiz.astro", _page4],
    ["src/pages/singup.astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "bc35afa6-5e22-44c6-86d7-d60ec73a51e2",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
