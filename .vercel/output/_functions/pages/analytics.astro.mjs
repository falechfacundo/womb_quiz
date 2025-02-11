/* empty css                                     */
import { c as createComponent, a as createAstro, r as renderTemplate, f as renderComponent } from '../chunks/astro/server_BS2szf8N.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CuW-rAcI.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, LineChart, Line } from 'recharts';
import { s as supabase } from '../chunks/supabase_CAfStfkl.mjs';
export { renderers } from '../renderers.mjs';

function Analytics({ initialResults }) {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [results, setResults] = useState(initialResults);
  const totalResponses = results ? results.length : 0;
  const categoryCounts = results ? results.reduce((acc, result) => {
    acc[result.category] = (acc[result.category] || 0) + 1;
    return acc;
  }, {}) : {};
  async function fetchResults() {
    try {
      const response = await fetch("/analytics", {
        method: "POST"
      });
      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }
      const { results: newResults } = await response.json();
      setResults(newResults);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  }
  useEffect(() => {
    const interval = setInterval(fetchResults, 3e4);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "p-8 bg-power-950 min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-HVFlorentino text-golden-600 mb-8", children: "Womb Quiz Analytics" }),
    results && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        StatCard,
        {
          title: "Total",
          value: totalResponses,
          className: "bg-power-800 mb-6 bg-rich_black-100/40"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", children: [
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: "HOT Wombs",
            value: categoryCounts["HOT"] || 0,
            className: "bg-clay-600"
          }
        ),
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: "DAMP Wombs",
            value: categoryCounts["DAMP"] || 0,
            className: "bg-blush-700/90"
          }
        ),
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: "STUCK Wombs",
            value: categoryCounts["STUCK"] || 0,
            className: "bg-blush-900/60"
          }
        ),
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: "COLD Wombs",
            value: categoryCounts["COLD"] || 0,
            className: "bg-sky-800/60"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8", children: [
        /* @__PURE__ */ jsx(CategoryChart, { data: categoryCounts }),
        /* @__PURE__ */ jsx(TimelineChart, { data: results })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-power-800 rounded-lg p-6 shadow-lg mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-HVFlorentino text-golden-600 mb-4", children: "Recent Results" }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-power-700", children: [
            /* @__PURE__ */ jsx("th", { className: "py-2 px-4 text-left text-golden-500", children: "Date" }),
            /* @__PURE__ */ jsx("th", { className: "py-2 px-4 text-left text-golden-500", children: "Name" }),
            /* @__PURE__ */ jsx("th", { className: "py-2 px-4 text-left text-golden-500", children: "Email" }),
            /* @__PURE__ */ jsx("th", { className: "py-2 px-4 text-left text-golden-500", children: "Category" }),
            /* @__PURE__ */ jsx("th", { className: "py-2 px-4 text-left text-golden-500", children: "Score" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: results.map((result, index) => /* @__PURE__ */ jsxs(
            "tr",
            {
              className: "border-b border-power-700 hover:bg-power-700/50 cursor-pointer",
              onClick: () => setSelectedProfile(result),
              children: [
                /* @__PURE__ */ jsx("td", { className: "py-2 px-4 text-cloud-100", children: result.created_at ? result.created_at.substring(0, 10) : "N/A" }),
                /* @__PURE__ */ jsx("td", { className: "py-2 px-4 text-cloud-100", children: result.name }),
                /* @__PURE__ */ jsx("td", { className: "py-2 px-4 text-cloud-100", children: result.email }),
                /* @__PURE__ */ jsx("td", { className: "py-2 px-4 text-cloud-100", children: result.category }),
                /* @__PURE__ */ jsx("td", { className: "py-2 px-4 text-cloud-100", children: result.scores[result.category] })
              ]
            },
            index
          )) })
        ] }) })
      ] }),
      selectedProfile && /* @__PURE__ */ jsxs("div", { className: "bg-power-800 rounded-lg p-6 shadow-lg", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-HVFlorentino text-golden-600", children: [
            "Detailed Responses for ",
            selectedProfile.name,
            " (",
            selectedProfile.email,
            ")"
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "bg-power-500 px-4 py-2 rounded hover:bg-power-600 transition-colors",
              onClick: () => setSelectedProfile(null),
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-power-700", children: [
            /* @__PURE__ */ jsx("th", { className: "py-2 px-4 text-left text-golden-500", children: "Category" }),
            /* @__PURE__ */ jsx("th", { className: "py-2 px-4 text-left text-golden-500", children: "Question" }),
            /* @__PURE__ */ jsx("th", { className: "py-2 px-4 text-left text-golden-500", children: "Answer" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: Object.entries(selectedProfile.answers).sort(
            (a, b) => a[1].category.localeCompare(b[1].category)
          ).map(([key, answerObj]) => /* @__PURE__ */ jsxs(
            "tr",
            {
              className: "border-b border-power-700/50 hover:bg-power-700/30",
              children: [
                /* @__PURE__ */ jsx("td", { className: "py-2 px-4 font-medium", children: answerObj.category }),
                /* @__PURE__ */ jsx("td", { className: "py-2 px-4 text-cloud-100", children: answerObj.question }),
                /* @__PURE__ */ jsx(
                  "td",
                  {
                    className: `py-2 px-4 ${answerObj.answer === 2 ? "text-cloud-100" : answerObj.answer === 1 ? "text-clay-300" : "text-clay-500"}`,
                    children: answerObj.answer === 0 ? "NO" : answerObj.answer === 1 ? "Does not Apply" : "YES"
                  }
                )
              ]
            },
            key
          )) })
        ] }) })
      ] })
    ] })
  ] }) });
}
function StatCard({ title, value, className = "" }) {
  return /* @__PURE__ */ jsxs("div", { className: `rounded-lg p-6 shadow-lg ${className}`, children: [
    /* @__PURE__ */ jsx("h3", { className: "text-golden-500 text-lg font-HVFlorentino mb-2", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-3xl text-cloud-100 font-bold", children: value })
  ] });
}
function CategoryChart({ data }) {
  const chartData = [
    { name: "HOT", value: data["HOT"] || 0 },
    { name: "COLD", value: data["COLD"] || 0 },
    { name: "DAMP", value: data["DAMP"] || 0 },
    { name: "STUCK", value: data["STUCK"] || 0 }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "bg-power-800 rounded-lg p-6 shadow-lg", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-2xl font-HVFlorentino text-golden-600 mb-4", children: "Category Distribution" }),
    /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(BarChart, { data: chartData, children: [
      /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#44304D" }),
      /* @__PURE__ */ jsx(XAxis, { dataKey: "name", tick: { fill: "#E8E4E2" }, stroke: "#E8E4E2" }),
      /* @__PURE__ */ jsx(YAxis, { tick: { fill: "#E8E4E2" }, stroke: "#E8E4E2" }),
      /* @__PURE__ */ jsx(
        Tooltip,
        {
          cursor: false,
          contentStyle: {
            backgroundColor: "#44304D",
            border: "none",
            borderRadius: "4px",
            color: "#E8E4E2"
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Bar,
        {
          dataKey: "value",
          fill: "#F0B651",
          radius: [4, 4, 0, 0],
          maxBarSize: 60,
          isAnimationActive: false
        }
      )
    ] }) })
  ] });
}
function TimelineChart({ data }) {
  const timelineData = data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).map((result) => ({
    date: result.created_at.substring(0, 10),
    score: result.scores[result.category],
    category: result.category,
    name: result.name
  }));
  return /* @__PURE__ */ jsxs("div", { className: "bg-power-800 rounded-lg p-6 shadow-lg", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-2xl font-HVFlorentino text-golden-600 mb-4", children: "Results Timeline" }),
    /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxs(LineChart, { data: timelineData, children: [
      /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#44304D" }),
      /* @__PURE__ */ jsx(XAxis, { dataKey: "date", tick: { fill: "#E8E4E2" }, stroke: "#E8E4E2" }),
      /* @__PURE__ */ jsx(YAxis, { tick: { fill: "#E8E4E2" }, stroke: "#E8E4E2" }),
      /* @__PURE__ */ jsx(
        Tooltip,
        {
          contentStyle: {
            backgroundColor: "#44304D",
            border: "none",
            borderRadius: "4px",
            color: "#E8E4E2"
          },
          formatter: (value, name, props) => [
            `Score: ${value}`,
            `${props.payload.name} - ${props.payload.category}`
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Line,
        {
          type: "monotone",
          dataKey: "score",
          stroke: "#F0B651",
          strokeWidth: 2,
          dot: { fill: "#F0B651" }
        }
      )
    ] }) })
  ] });
}

const $$Astro = createAstro();
const $$Analytics = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Analytics;
  if (Astro2.request.method === "POST") {
    try {
      const { data: results, error } = await supabase.from("quiz_results").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify({ results }), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message || "Error fetching results" }),
        { status: 500 }
      );
    }
  }
  const { data: initialResults } = await supabase.from("quiz_results").select("*").order("created_at", { ascending: false });
  const safeInitialResults = initialResults || [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AnalyticsComponent", Analytics, { "initialResults": safeInitialResults, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/components/Analytics", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/analytics.astro", void 0);

const $$file = "C:/Users/Faia Facundo/Desktop/Programacion/proyectos_workana/womb_form/src/pages/analytics.astro";
const $$url = "/analytics";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Analytics,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
