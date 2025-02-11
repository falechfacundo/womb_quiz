/* empty css                                     */
import { c as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BS2szf8N.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CuW-rAcI.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../renderers.mjs';

function ColorPalette({ colorPalettes }) {
  const [copiedColor, setCopiedColor] = useState(null);
  const handleCopy = async (hex, name) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedColor(name);
      setTimeout(() => setCopiedColor(null), 1e3);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto", children: Object.entries(colorPalettes).map(([paletteName, colors]) => /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-lg shadow-lg", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4 capitalize", children: paletteName }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: Object.entries(colors).map(([shade, hex]) => {
      const colorName = `${paletteName}-${shade}`;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center space-x-4 p-2 hover:bg-cloud-100/20 rounded-lg",
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleCopy(hex, colorName),
                className: `w-20 h-20 rounded-lg shadow-md hover:scale-105 transition-transform ${copiedColor === colorName ? "ring-2 ring-green-500" : ""}`,
                style: { backgroundColor: hex }
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: colorName }),
              /* @__PURE__ */ jsx("p", { className: "text-cloud-100/80 text-sm uppercase", children: hex })
            ] })
          ]
        },
        colorName
      );
    }) })
  ] }, paletteName)) });
}

const $$Colors = createComponent(($$result, $$props, $$slots) => {
  const colorPalettes = {
    power: {
      100: "#DAD6DB",
      200: "#BCB5BF",
      300: "#9E94A2",
      400: "#807286",
      500: "#625169",
      600: "#44304D"
    },
    clay: {
      100: "#EFDCDA",
      200: "#E2C0BC",
      300: "#D5A49E",
      400: "#C78780",
      500: "#BA6B62",
      600: "#AD4F44"
    },
    blush: {
      100: "#F9F1EF",
      200: "#F4E6E2",
      300: "#EFDBD6",
      400: "#EAD1C9",
      500: "#E5C6BD",
      600: "#E0BBB0"
    },
    sky: {
      100: "#F3F8FC",
      200: "#EAF2F9",
      300: "#D4E5F3",
      400: "#E1EDF7",
      500: "#CEE2F2",
      600: "#C5DCEF"
    },
    sage: {
      100: "#F0EFE5",
      200: "#E4E2D0",
      300: "#D7D5BB",
      400: "#CBC7A7",
      500: "#BEBA92",
      600: "#B2AD7D"
    },
    golden: {
      100: "#FCF0DC",
      200: "#FAE4C0",
      300: "#F7D9A4",
      400: "#F5CD89",
      500: "#F2C26D",
      600: "#F0B651"
    }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen p-8"> <h1 class="text-3xl font-bold text-center mb-8">Brand Colors</h1> ${renderComponent($$result2, "ColorPalette", ColorPalette, { "client:visible": true, "colorPalettes": colorPalettes, "client:component-hydration": "visible", "client:component-path": "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/components/ColorPalette", "client:component-export": "default" })} </div> ` })}`;
}, "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/colors.astro", void 0);

const $$file = "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/colors.astro";
const $$url = "/colors";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Colors,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
