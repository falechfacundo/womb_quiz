import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginForm() {
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
        password,
      });

      if (sessionError) throw sessionError;

      // Redirigir a /analytics después de login exitoso
      window.location.href = "/analytics";
    } catch (err) {
      setError(err.message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col w-72 space-y-6">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
        )}
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="w-full px-3 py-2 border bg-transparent rounded focus:outline-none focus"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          className="w-full px-3 py-2 border bg-transparent rounded focus:outline-none focus"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-clay-600 text-white p-2 rounded-md hover:bg-clay-500 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
