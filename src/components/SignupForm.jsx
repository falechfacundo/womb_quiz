import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // const email = e.target.email.value;
      // const password = e.target.password.value;

      // 1. Crear usuario con metadata de rol
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email: "faiafacundo@gmail.com",
          password: "nemoswimsinthesea",
          options: {
            data: {
              role: "admin",
            },
          },
        }
      );

      if (signUpError) throw signUpError;

      // const { error: insertError } = await supabase.from("users").insert([
      //   {
      //     id: authData.user.id,
      //     email: "faiafacundo@gmail.com",
      //     role: "admin",
      //   },
      // ]);

      // if (insertError) throw insertError;

      alert("Usuario creado exitosamente");
      // Opcional: redirigir
      window.location.href = "/analytics";
    } catch (err) {
      setError(err.message);
      console.error("Error creating user:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col w-72 space-y-6">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
            {error}
          </div>
        )}
        {/* <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="border p-2 rounded-md text-black"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          minLength={6}
          className="border p-2 rounded-md text-black"
        /> */}
        <button
          type="submit"
          disabled={loading}
          className="bg-clay-600 text-white p-2 rounded-md hover:bg-clay-500 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
