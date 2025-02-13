/* empty css                                     */
import { c as createComponent, r as renderTemplate, b as renderComponent } from '../chunks/astro/server_CBZukfnR.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/supabase_DKRCSV3u.mjs';
import { Q as QuizForm } from '../chunks/QuizForm_Bo10oBGB.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "QuizForm", QuizForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/components/QuizForm.tsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/index.astro", void 0);

const $$file = "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
