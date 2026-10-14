"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/marketplace");
  };

  return (
    <div className="min-h-screen py-20 bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500 selection:text-zinc-950 flex flex-col justify-between p-6">
      {/* Box do Formulário */}
      <div className="max-w-md w-full mx-auto bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-50">Entrar no SneakAI</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Aceda ao seu painel ou acompanhe o estado dos seus pedidos.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-300 mb-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-zinc-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 mt-4"
          >
            <span>Iniciar Sessão</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <Link
          href="/register"
          className="text-xs text-zinc-400 hover:text-white transition-colors"
        >
          Não tem conta?{" "}
          <span className="text-orange-400 font-semibold">Registar &rarr;</span>
        </Link>
      </div>
    </div>
  );
}
