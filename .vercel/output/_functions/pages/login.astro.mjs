/* empty css                                     */
import { c as createComponent, r as renderTemplate } from '../chunks/astro/server_CBZukfnR.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- ---
import Layout from "../layouts/Layout.astro";
import LoginForm from "../components/LoginForm";
---

<html>
  <body>
    <Layout title="Login">
      <LoginForm />
    </Layout>
  </body>
</html> -->`;
}, "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/login.astro", void 0);

const $$file = "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
