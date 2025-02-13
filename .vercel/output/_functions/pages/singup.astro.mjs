/* empty css                                     */
import { c as createComponent, r as renderTemplate } from '../chunks/astro/server_CBZukfnR.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Singup = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- ---
import Layout from "../layouts/Layout.astro";
import SignupForm from "../components/SignupForm";
---

<html>
  <body>
    <Layout title="Login">
      <SignupForm />
    </Layout>
  </body>
</html> -->`;
}, "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/singup.astro", void 0);

const $$file = "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/singup.astro";
const $$url = "/singup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Singup,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
