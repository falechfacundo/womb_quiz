import { c as createComponent, a as createAstro, r as renderTemplate, b as addAttribute, d as renderHead, e as renderSlot } from './astro/server_BS2szf8N.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                             */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon"${addAttribute(`/assets/logo.ico`, "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Womb Quiz</title><link rel="stylesheet" href="/styles/global.css">${renderHead()}</head> <body class="bg-power-600 text-cloud-100 relative" data-astro-cid-sckkx6r4> <header class="p-4 absolute left-0 right-0" data-astro-cid-sckkx6r4> <a href="/" data-astro-cid-sckkx6r4> <img${addAttribute(`/assets/logo.png`, "src")} alt="Logo de la Marca" class="h-28" data-astro-cid-sckkx6r4></a> </header> <main class="flex items-center justify-center min-h-screen pt-36" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </main>  </body></html>`;
}, "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
