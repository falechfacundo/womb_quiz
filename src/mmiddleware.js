// import { defineMiddleware } from "astro:middleware";
// import { supabase } from "./lib/supabase";

// export const onRequest = defineMiddleware(
//   async ({ locals, url, redirect }, next) => {
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();
//     console.log("Session:", session);

//     // Proteger rutas que comiencen con /dashboard
//     if (url.pathname.startsWith("/analytics") && !session) {
//       return redirect("/login");
//     }

//     return next();
//   }
// );
