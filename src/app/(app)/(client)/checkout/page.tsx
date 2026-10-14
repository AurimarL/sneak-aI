"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Truck,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  PackageCheck,
  Search,
  AlertCircle,
} from "lucide-react";

// Mock expandido de Distribuidores com diferentes condições, países e cidades
const MOCK_DISTRIBUTORS = [
  {
    id: "dist-1",
    nodeName: "LupuStudio Node #1",
    country: "Angola",
    city: "Luanda",
    condition: "Novo",
    driveTitle: "Kingston DataTraveler 128GB (Pen Drive)",
    drivePriceUSD: 25.0,
    driveCapacityGB: 128,
    shipsNationally: true,
    nationalShippingFee: 10.0,
    shipsInternationally: true,
    internationalShippingFee: 25.0,
  },
  {
    id: "dist-2",
    nodeName: "Global AI Media Node",
    country: "Portugal",
    city: "Lisboa",
    condition: "Novo",
    driveTitle: "SanDisk Extreme Portable SSD 500GB",
    drivePriceUSD: 65.0,
    driveCapacityGB: 500,
    shipsNationally: true,
    nationalShippingFee: 8.0,
    shipsInternationally: true,
    internationalShippingFee: 30.0,
  },
  {
    id: "dist-3",
    nodeName: "Benguela Tech Hub",
    country: "Angola",
    city: "Benguela",
    condition: "Usado",
    driveTitle: "Seagate Expansion 1TB HDD (Revisado)",
    drivePriceUSD: 35.0,
    driveCapacityGB: 1000,
    shipsNationally: true,
    nationalShippingFee: 12.0,
    shipsInternationally: false,
    internationalShippingFee: 0,
  },
  {
    id: "dist-4",
    nodeName: "Porto Storage Solutions",
    country: "Portugal",
    city: "Porto",
    condition: "Novo",
    driveTitle: "Crucial X6 1TB External SSD",
    drivePriceUSD: 95.0,
    driveCapacityGB: 1000,
    shipsNationally: true,
    nationalShippingFee: 6.0,
    shipsInternationally: true,
    internationalShippingFee: 22.0,
  },
];

export default function CheckoutPage() {
  // Estado do formulário de endereço
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Angola",
    city: "Luanda",
    address: "",
  });

  // Filtros de Distribuidores
  const [filterCondition, setFilterCondition] = useState<string>("Todos");
  const [filterCountry, setFilterCountry] = useState<string>("Todos");
  const [searchCity, setSearchCity] = useState<string>("");

  // Simulação de modelos vindos do carrinho (72.5 GB no total)[cite: 1]
  const cartModels = [
    { name: "Llama-3-70B-Instruct", sizeGB: 38.5 },
    { name: "DeepSeek-R1-Distill-32B", sizeGB: 34.0 },
  ];
  const totalGB = cartModels.reduce((acc, m) => acc + m.sizeGB, 0);

  // Filtragem dos Distribuidores baseada em Condição, País, Cidade e Capacidade da Mídia
  const filteredDistributors = MOCK_DISTRIBUTORS.filter((dist) => {
    const matchesCondition =
      filterCondition === "Todos" || dist.condition === filterCondition;
    const matchesCountry =
      filterCountry === "Todos" ||
      dist.country.toLowerCase() === filterCountry.toLowerCase();
    const matchesCity =
      searchCity === "" ||
      dist.city.toLowerCase().includes(searchCity.toLowerCase()) ||
      dist.nodeName.toLowerCase().includes(searchCity.toLowerCase());

    // O distribuidor só aparece se a capacidade da mídia for maior ou igual ao total de GBs do carrinho
    const hasEnoughCapacity = dist.driveCapacityGB >= totalGB;

    return (
      matchesCondition && matchesCountry && matchesCity && hasEnoughCapacity
    );
  });

  // Distribuidor selecionado (padrão para o primeiro da lista filtrada ou o ID atual)
  const [selectedDistributorId, setSelectedDistributorId] = useState<string>(
    filteredDistributors[0]?.id || MOCK_DISTRIBUTORS[0].id,
  );

  // Estado de confirmação
  const [isCompleted, setIsCompleted] = useState(false);

  // Obter o distribuidor atualmente selecionado
  const selectedDistributor =
    MOCK_DISTRIBUTORS.find((d) => d.id === selectedDistributorId) ||
    filteredDistributors[0] ||
    MOCK_DISTRIBUTORS[0];

  const isNational =
    customerInfo.country.toLowerCase().trim() ===
    selectedDistributor.country.toLowerCase().trim();

  const shippingFee = isNational
    ? selectedDistributor.nationalShippingFee
    : selectedDistributor.internationalShippingFee;

  const totalPriceUSD = selectedDistributor.drivePriceUSD + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.address) {
      alert("Por favor, preencha todos os campos da morada de entrega.");
      return;
    }
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center space-y-6">
          <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-zinc-50">
              Encomenda Confirmada!
            </h1>
            <p className="text-xs text-zinc-400">
              O seu pedido foi recebido pelo distribuidor{" "}
              <strong className="text-zinc-200">
                {selectedDistributor.nodeName}
              </strong>
              .
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-left font-mono text-xs space-y-2">
            <div className="flex justify-between text-zinc-400">
              <span>Nº do Pedido:</span>
              <span className="text-orange-400 font-bold">#SNK-8492</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Mídia Física:</span>
              <span className="text-zinc-200">
                {selectedDistributor.driveTitle}
              </span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Tipo de Envio:</span>
              <span className="text-zinc-200">
                {isNational ? "Nacional" : "Internacional"}
              </span>
            </div>
            <div className="flex justify-between text-zinc-400 pt-2 border-t border-zinc-800">
              <span>Total Pago:</span>
              <span className="text-emerald-400 font-bold">
                ${totalPriceUSD.toFixed(2)} USD
              </span>
            </div>
          </div>

          <p className="text-[11px] text-zinc-500">
            Receberá atualizações do envio no e-mail{" "}
            <strong>{customerInfo.email}</strong>.
          </p>

          <Link
            href="/marketplace"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-zinc-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-all w-full text-center"
          >
            Voltar ao Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500 selection:text-zinc-950">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/marketplace"
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao Marketplace</span>
          </Link>
        </div>
        <form
          onSubmit={handleSubmitOrder}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          {/* Lado Esquerdo: Formulário de Entrega e Seleção Avançada de Distribuidores */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Dados do Cliente e Endereço */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 space-y-4">
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span>1. Dados de Entrega</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Carlos Manuel"
                    value={customerInfo.name}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, name: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    E-mail para Notificação *
                  </label>
                  <input
                    type="email"
                    placeholder="carlos@exemplo.com"
                    value={customerInfo.email}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        email: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    País de Destino *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.country}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        country: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.city}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, city: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs text-zinc-400 mb-1">
                    Morada Completa de Entrega *
                  </label>
                  <input
                    type="text"
                    placeholder="Rua, Número, Bairro/Ponto de referência"
                    value={customerInfo.address}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        address: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 2. Seleção de Distribuidor com Filtros Avançados */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                    <Truck className="h-4 w-4 text-orange-500" />
                    <span>
                      2. Selecione o Nó Distribuidor (
                      {filteredDistributors.length})
                    </span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Filtrado automaticamente para suportar os{" "}
                    <strong className="text-orange-400">
                      {totalGB.toFixed(1)} GB
                    </strong>{" "}
                    selecionados.
                  </p>
                </div>
              </div>

              {/* Barra de Filtros */}
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Filtro de Condição */}
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1 font-mono">
                    Condição da Mídia
                  </label>
                  <select
                    value={filterCondition}
                    onChange={(e) => setFilterCondition(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                  >
                    <option value="Todos">Todas as Condições</option>
                    <option value="Novo">Novo</option>
                    <option value="Usado">Usado / Revisado</option>
                  </select>
                </div>

                {/* Filtro de País */}
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1 font-mono">
                    País do Nó
                  </label>
                  <select
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                  >
                    <option value="Todos">Todos os Países</option>
                    <option value="Angola">Angola</option>
                    <option value="Portugal">Portugal</option>
                  </select>
                </div>

                {/* Filtro de Cidade ou Nome */}
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1 font-mono">
                    Pesquisar Cidade / Nó
                  </label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Ex: Luanda, Lisboa..."
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-8 pr-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Lista de Distribuidores Filtrados */}
              <div className="space-y-3 max-h-105 overflow-y-auto pr-1">
                {filteredDistributors.map((dist) => {
                  const isDistNational =
                    customerInfo.country.toLowerCase().trim() ===
                    dist.country.toLowerCase().trim();
                  const fee = isDistNational
                    ? dist.nationalShippingFee
                    : dist.internationalShippingFee;

                  const isSelected = selectedDistributorId === dist.id;

                  return (
                    <div
                      key={dist.id}
                      onClick={() => setSelectedDistributorId(dist.id)}
                      className={`border rounded-xl p-4 cursor-pointer transition-all ${
                        isSelected
                          ? "border-orange-500 bg-orange-500/10 shadow-lg"
                          : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="distributor"
                            checked={isSelected}
                            onChange={() => setSelectedDistributorId(dist.id)}
                            className="accent-orange-500 mt-1"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-zinc-100 text-xs">
                                {dist.nodeName}
                              </span>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium ${
                                  dist.condition === "Novo"
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                }`}
                              >
                                {dist.condition}
                              </span>
                            </div>

                            <div className="text-[11px] text-zinc-400 flex items-center gap-2">
                              <MapPin className="h-3 w-3 text-zinc-500" />
                              <span>
                                {dist.city}, {dist.country}
                              </span>
                            </div>

                            <div className="text-[11px] text-orange-400 font-mono pt-1">
                              📦 Mídia: {dist.driveTitle} (
                              {dist.driveCapacityGB} GB)
                            </div>
                          </div>
                        </div>

                        <div className="text-right font-mono shrink-0">
                          <div className="text-emerald-400 font-bold text-sm">
                            ${dist.drivePriceUSD.toFixed(2)}
                          </div>
                          <div className="text-[10px] text-zinc-500">
                            Frete{" "}
                            {isDistNational ? "Nacional" : "Internacional"}: +$
                            {fee.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredDistributors.length === 0 && (
                  <div className="p-8 text-center bg-zinc-950 border border-zinc-800 rounded-xl space-y-2">
                    <AlertCircle className="h-8 w-8 text-amber-500 mx-auto" />
                    <div className="text-xs font-bold text-zinc-200">
                      Nenhum distribuidor encontrado com estes filtros ou
                      capacidade suficiente.
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Tente alterar os filtros de condição ou país para ver mais
                      opções de nós de entrega.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lado Direito: Resumo da Encomenda */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-24 space-y-6 shadow-2xl">
              <h2 className="text-base font-bold text-zinc-100 flex items-center justify-between border-b border-zinc-800 pb-4">
                <span>Resumo da Encomenda</span>
                <span className="text-xs font-mono text-orange-400">
                  {totalGB.toFixed(1)} GB
                </span>
              </h2>

              {/* Lista de Modelos */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-zinc-400">
                  Modelos Selecionados:
                </div>
                {cartModels.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-xs py-1.5 border-b border-zinc-800/40"
                  >
                    <span className="text-zinc-200 font-medium">{m.name}</span>
                    <span className="font-mono text-zinc-400">
                      {m.sizeGB} GB
                    </span>
                  </div>
                ))}
              </div>

              {/* Detalhes de Preço */}
              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Mídia ({selectedDistributor.driveTitle}):</span>
                  <span className="text-zinc-200">
                    ${selectedDistributor.drivePriceUSD.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>
                    Frete ({isNational ? "Nacional" : "Internacional"} via{" "}
                    {selectedDistributor.nodeName}):
                  </span>
                  <span className="text-zinc-200">
                    ${shippingFee.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-bold pt-3 border-t border-zinc-800 text-zinc-50">
                  <span>Total Final:</span>
                  <span className="text-emerald-400">
                    ${totalPriceUSD.toFixed(2)} USD
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-zinc-500 space-y-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-orange-500" />
                  <span>Gravação com verificação SHA-256</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PackageCheck className="h-3.5 w-3.5 text-orange-500" />
                  <span>Garantia de envio rastreado pelo nó</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={filteredDistributors.length === 0}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-bold py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
              >
                Confirmar Encomenda (${totalPriceUSD.toFixed(2)} USD)
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
