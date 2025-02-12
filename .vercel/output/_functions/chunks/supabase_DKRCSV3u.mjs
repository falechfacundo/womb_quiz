import { c as createComponent, a as createAstro, r as renderTemplate, d as addAttribute, e as renderHead, f as renderSlot } from './astro/server_CBZukfnR.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                             */
import { createClient } from '@supabase/supabase-js';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon"${addAttribute(`/assets/logo.ico`, "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Womb Quiz</title><link rel="stylesheet" href="/styles/global.css">${renderHead()}</head> <body class="bg-power-600 text-cloud-100 relative" data-astro-cid-sckkx6r4> <header class="p-4 absolute left-0 right-0" data-astro-cid-sckkx6r4> <a href="/" data-astro-cid-sckkx6r4> <img${addAttribute(`/assets/logo.png`, "src")} alt="Logo de la Marca" class="h-28" data-astro-cid-sckkx6r4></a> </header> <main class="flex items-center justify-center min-h-screen pt-36" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </main>  </body></html>`;
}, "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/layouts/Layout.astro", void 0);

const supabase = createClient(
  "https://tuuuxxfvasbtffoyzent.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1dXV4eGZ2YXNidGZmb3l6ZW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNDY1NTEsImV4cCI6MjA1NDcyMjU1MX0.hY3JMZhVn-eUE01U5t8aBTIARn7yqXJzdZxGlu2qAug"
);

export { $$Layout as $, supabase as s };
