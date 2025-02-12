/* empty css                                     */
import { c as createComponent, a as createAstro, r as renderTemplate, b as renderComponent } from '../chunks/astro/server_CBZukfnR.mjs';
import 'kleur/colors';
import { s as supabase, $ as $$Layout } from '../chunks/supabase_DKRCSV3u.mjs';
import { Q as QuizForm } from '../chunks/QuizForm_Dd_VcxXv.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Quiz = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Quiz;
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const email = formData.get("email");
      const name = formData.get("name");
      const scores = JSON.parse(formData.get("scores"));
      const answers = JSON.parse(formData.get("answers"));
      const category = formData.get("category");
      const segment = formData.get("segment_id");
      const { data, error } = await supabase.from("quiz_results").insert([
        {
          name,
          email,
          category,
          scores,
          answers
        }
      ]);
      const FLODESK_API_KEY = undefined                               ;
      const base64Auth = btoa(`${FLODESK_API_KEY}:`);
      const [firstName, ...lastNameParts] = name.split(" ");
      const lastName = lastNameParts.join(" ");
      const customFields = {
        quiz_date: (/* @__PURE__ */ new Date()).toISOString(),
        total_score: String(Object.values(scores).reduce((a, b) => a + b, 0)),
        hot_score: String(scores.HOT),
        cold_score: String(scores.COLD),
        damp_score: String(scores.DAMP),
        stuck_score: String(scores.STUCK)
      };
      const flodeskResponse = await fetch(
        "https://api.flodesk.com/v1/subscribers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Womb Quiz (wombquiz.ireneshancezcelis.com)",
            Authorization: `Basic ${base64Auth}`
          },
          body: JSON.stringify({
            email,
            first_name: firstName,
            last_name: lastName,
            custom_fields: customFields,
            segment_ids: [segment],
            double_optin: false
          })
        }
      );
      return new Response(JSON.stringify({ success: true }), {
        status: 200
      });
    } catch (error) {
      console.log("error: ", error);
      console.log("error.message: ", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500
      });
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "QuizForm", QuizForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/components/QuizForm", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/quiz.astro", void 0);
const $$file = "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/quiz.astro";
const $$url = "/quiz";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Quiz,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
