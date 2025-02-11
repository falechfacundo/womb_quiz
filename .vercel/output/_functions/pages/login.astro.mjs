/* empty css                                     */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, f as renderComponent } from '../chunks/astro/server_BS2szf8N.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CuW-rAcI.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { s as supabase } from '../chunks/supabase_CAfStfkl.mjs';
export { renderers } from '../renderers.mjs';

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;
      const { error: sessionError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (sessionError) throw sessionError;
      window.location.href = "/analytics";
    } catch (err) {
      setError(err.message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col w-72 space-y-6", children: [
    error && /* @__PURE__ */ jsx("div", { className: "bg-red-100 text-red-700 p-3 rounded", children: error }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "email",
        name: "email",
        required: true,
        placeholder: "Email",
        className: "w-full px-3 py-2 border bg-transparent rounded focus:outline-none focus"
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "password",
        name: "password",
        required: true,
        placeholder: "Password",
        className: "w-full px-3 py-2 border bg-transparent rounded focus:outline-none focus"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        disabled: loading,
        className: "bg-clay-600 text-white p-2 rounded-md hover:bg-clay-500 disabled:opacity-50",
        children: loading ? "Loading..." : "Log In"
      }
    )
  ] }) });
}

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html> ${maybeRenderHead()}<body> ${renderComponent($$result, "Layout", $$Layout, { "title": "Login" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LoginForm", LoginForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/components/LoginForm", "client:component-export": "default" })} ` })} </body></html>`;
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
