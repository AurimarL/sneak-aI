"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { User, Truck, Mail, Lock, ArrowRight } from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType =
    searchParams.get("type") === "distributor" ? "distributor" : "customer";

  const [role, setRole] = useState<"customer" | "distributor">(initialType);

  // Estados dos formulários
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // Campos do Distribuidor
    nodeName: "",
    country: "Angola",
    city: "Luanda",
    shipsNationally: true,
    nationalShippingFee: 10.0,
    shipsInternationally: true,
    internationalShippingFee: 25.0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "distributor") {
      router.push("/portal");
    } else {
      router.push("/marketplace");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-zinc-50">
          Criar Conta no SneakAI
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Escolha o tipo de conta que pretende registar.
        </p>
      </div>

      {/* Abas de Escolha de Perfil */}
      <div className="grid grid-cols-2 p-1 bg-zinc-950 rounded-xl border border-zinc-800/80">
        <button
          type="button"
          onClick={() => setRole("customer")}
          className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
            role === "customer"
              ? "bg-orange-500 text-zinc-950 shadow"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <User className="h-3.5 w-3.5" />
          <span>Cliente / Comprador</span>
        </button>

        <button
          type="button"
          onClick={() => setRole("distributor")}
          className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
            role === "distributor"
              ? "bg-orange-500 text-zinc-950 shadow"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Truck className="h-3.5 w-3.5" />
          <span>Distribuidor</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campos Comuns */}
        <div>
          <label className="block text-xs text-zinc-300 mb-1">
            Nome Completo
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-zinc-300 mb-1">E-mail</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
              required
            />
          </div>
        </div>

        {/* Campos Adicionais para Distribuidor */}
        {role === "distributor" && (
          <div className="pt-2 border-t border-zinc-800 space-y-4">
            <div className="text-xs font-semibold text-orange-400 font-mono">
              Definições & Envio
            </div>

            <div>
              <label className="block text-xs text-zinc-300 mb-1">
                Nome da Loja / Empresa
              </label>
              <input
                type="text"
                placeholder="Ex: Luanda AI Node #1"
                value={formData.nodeName}
                onChange={(e) =>
                  setFormData({ ...formData, nodeName: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-300 mb-1">País</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-300 mb-1">
                  Cidade
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold py-3 rounded-xl text-xs transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 mt-4"
        >
          <span>
            {role === "distributor"
              ? "Criar conta de Distribuidor"
              : "Criar Conta de Cliente"}
          </span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <Link
        href="/login"
        className="text-xs text-zinc-400 hover:text-white transition-colors"
      >
        Já tem conta?{" "}
        <span className="text-orange-400 font-semibold">Entrar &rarr;</span>
      </Link>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      {/* Boundary de Suspense ao redor de componentes com useSearchParams */}
      <Suspense
        fallback={
          <div className="max-w-md w-full mx-auto bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 text-center text-xs text-zinc-500 font-mono">
            Carregando formulário...
          </div>
        }
      >
        <div className="py-20">
          <RegisterForm />
        </div>
      </Suspense>
    </div>
  );
}
