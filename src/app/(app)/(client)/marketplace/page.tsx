"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  HardDrive,
  ShoppingBag,
  ArrowRight,
  Filter,
  Check,
  Plus,
  Trash2,
  Cpu,
  Layers,
  Info,
} from "lucide-react";

// Mock de modelos GGUF curados
const MODELS_CATALOG = [
  {
    id: "llama-3-70b",
    name: "Llama-3-70B-Instruct",
    quantization: "Q4_K_M",
    sizeGB: 38.5,
    category: "Geral & Raciocínio",
    publisher: "Meta / HuggingFace",
    description:
      "Modelo topo de linha para tarefas complexas, análise e assistentes virtuais avançados.",
  },
  {
    id: "deepseek-r1-32b",
    name: "DeepSeek-R1-Distill-Qwen-32B",
    quantization: "Q8_0",
    sizeGB: 34.0,
    category: "Raciocínio Lógico & Matemática",
    publisher: "DeepSeek",
    description:
      "Especialista em resolução de problemas matemáticos, código e cadeias de raciocínio passo a passo.",
  },
  {
    id: "qwen-coder-32b",
    name: "Qwen2.5-Coder-32B-Instruct",
    quantization: "Q4_K_M",
    sizeGB: 20.2,
    category: "Programação & Código",
    publisher: "Alibaba Cloud",
    description:
      "Geração, autocompletar e refatoração de código em mais de 90 linguagens de programação.",
  },
  {
    id: "mistral-small-22b",
    name: "Mistral-Small-24B-Instruct",
    quantization: "Q5_K_M",
    sizeGB: 16.8,
    category: "Geral & Raciocínio",
    publisher: "Mistral AI",
    description:
      "Equilíbrio perfeito entre velocidade e inteligência para máquinas com menos memória RAM/VRAM.",
  },
  {
    id: "llama-3-8b",
    name: "Llama-3.1-8B-Instruct",
    quantization: "Q8_0",
    sizeGB: 8.5,
    category: "Ligeiro & Rápido",
    publisher: "Meta",
    description:
      "Modelo ultrarrápido para execução leve em laptops ou computadores sem GPU dedicada.",
  },
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [cart, setCart] = useState<typeof MODELS_CATALOG>([]);

  // Filtros
  const categories = [
    "Todas",
    "Geral & Raciocínio",
    "Programação & Código",
    "Raciocínio Lógico & Matemática",
    "Ligeiro & Rápido",
  ];

  const filteredModels = MODELS_CATALOG.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todas" || model.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Gestão do Carrinho e GB Counter
  const toggleModelInCart = (model: (typeof MODELS_CATALOG)[0]) => {
    if (cart.some((item) => item.id === model.id)) {
      setCart(cart.filter((item) => item.id !== model.id));
    } else {
      setCart([...cart, model]);
    }
  };

  const totalGB = cart.reduce((acc, item) => acc + item.sizeGB, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500 selection:text-zinc-950 pb-32">

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Título e Barra de Pesquisa */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-50">
              Catálogo de Modelos de IA
            </h1>
            <p className="text-xs text-zinc-400">
              Escolha os pesos que pretende adquirir pré-carregados numa mídia
              física.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Pesquisar modelos ou categorias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Categorias / Filtros */}
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-900 pb-4">
          <span className="text-xs text-zinc-500 font-mono flex items-center gap-1.5 mr-2">
            <Filter className="h-3.5 w-3.5" /> Categoria:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                selectedCategory === cat
                  ? "bg-orange-500 text-zinc-950 font-semibold"
                  : "bg-zinc-900/60 text-zinc-400 border border-zinc-800/80 hover:text-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de Modelos (Tabela Interativa) */}
        <div className="border border-zinc-800 rounded-xl bg-zinc-900/40 overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 font-mono">
              <tr>
                <th className="p-4">Modelo</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Quantização</th>
                <th className="p-4">Tamanho</th>
                <th className="p-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
              {filteredModels.map((model) => {
                const inCart = cart.some((item) => item.id === model.id);
                return (
                  <tr
                    key={model.id}
                    className="hover:bg-zinc-900/60 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-zinc-100">
                        {model.name}
                      </div>
                      <div className="text-[11px] text-zinc-400 max-w-md mt-0.5">
                        {model.description}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-1 rounded text-[11px]">
                        {model.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-zinc-400">
                      {model.quantization}
                    </td>
                    <td className="p-4 font-mono font-bold text-orange-400">
                      {model.sizeGB.toFixed(1)} GB
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => toggleModelInCart(model)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 ${
                          inCart
                            ? "bg-zinc-800 text-emerald-400 border border-emerald-500/30"
                            : "bg-orange-500 hover:bg-orange-600 text-zinc-950"
                        }`}
                      >
                        {inCart ? (
                          <>
                            <Check className="h-3.5 w-3.5" /> Selecionado
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5" /> Adicionar
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredModels.length === 0 && (
            <div className="p-12 text-center text-zinc-500 text-xs">
              Nenhum modelo encontrado com os termos pesquisados.
            </div>
          )}
        </div>
      </main>

      {/* BARRA FLUTUANTE DO CARRINHO (GB COUNTER & GUEST CHECKOUT CTA) */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 max-w-3xl w-[calc(100%-3rem)] bg-zinc-900 border border-orange-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-md z-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <HardDrive className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-zinc-400">
                <strong className="text-zinc-100">{cart.length}</strong>{" "}
                modelo(s) selecionado(s)
              </div>
              <div className="text-sm font-bold text-orange-400 font-mono">
                Espaço Acumulado: {totalGB.toFixed(1)} GB
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCart([])}
              className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1"
            >
              Limpar
            </button>
            <Link
              href={`/checkout?models=${cart.map((m) => m.id).join(",")}`}
              className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20"
            >
              <span>Avançar para Escolha da Mídia e Frete</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
