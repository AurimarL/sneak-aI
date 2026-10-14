"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HardDrive,
  Truck,
  PackageCheck,
  Plus,
  Save,
  Globe2,
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Trash2,
  DollarSign,
  Layers,
} from "lucide-react";

// Mock de dados iniciais para demonstração
const INITIAL_DRIVES = [
  {
    id: "1",
    title: "Kingston DataTraveler 128GB (Pen Drive)",
    type: "Flash Drive",
    capacityGB: 128,
    priceUSD: 25.0,
    stock: 12,
    modelsLoaded: ["Llama-3-8B-Instruct", "Qwen2.5-Coder-7B"],
  },
  {
    id: "2",
    title: "Crucial X6 1TB External Portable SSD",
    type: "SSD",
    capacityGB: 1000,
    priceUSD: 110.0,
    stock: 5,
    modelsLoaded: ["DeepSeek-R1-Distill-32B", "Llama-3-70B-Instruct"],
  },
];

const INITIAL_ORDERS = [
  {
    id: "ORD-9482",
    customerName: "Carlos M.",
    address: "Luanda, Angola (Ingombota)",
    driveTitle: "Kingston DataTraveler 128GB (Pen Drive)",
    totalPriceUSD: 35.0, // 25 + 10 frete
    shippingType: "Nacional",
    status: "Pendente",
    date: "14 Out 2026",
  },
  {
    id: "ORD-8301",
    customerName: "Ana S.",
    address: "Lisboa, Portugal",
    driveTitle: "Crucial X6 1TB External Portable SSD",
    totalPriceUSD: 135.0, // 110 + 25 frete
    shippingType: "Internacional",
    status: "Enviado",
    date: "12 Out 2026",
  },
];

export default function DistributorPortalPage() {
  const [activeTab, setActiveTab] = useState<
    "inventory" | "shipping" | "orders"
  >("inventory");

  // Estado do Perfil e Frete
  const [shippingConfig, setShippingConfig] = useState({
    nodeName: "LupuStudio Node #1",
    country: "Angola",
    city: "Luanda",
    shipsNationally: true,
    nationalShippingFee: 10.0,
    shipsInternationally: true,
    internationalShippingFee: 25.0,
  });

  // Estado de Inventário de Drives
  const [drives, setDrives] = useState(INITIAL_DRIVES);
  const [showAddDriveModal, setShowAddDriveModal] = useState(false);
  const [newDrive, setNewDrive] = useState({
    title: "",
    type: "SSD",
    capacityGB: 512,
    priceUSD: 60.0,
    stock: 5,
  });

  // Estado de Encomendas
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Handlers
  const handleSaveShipping = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Configurações de frete salvas com sucesso!");
  };

  const handleAddDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDrive.title) return;
    setDrives([
      ...drives,
      {
        id: String(Date.now()),
        title: newDrive.title,
        type: newDrive.type,
        capacityGB: Number(newDrive.capacityGB),
        priceUSD: Number(newDrive.priceUSD),
        stock: Number(newDrive.stock),
        modelsLoaded: [],
      },
    ]);
    setShowAddDriveModal(false);
    setNewDrive({
      title: "",
      type: "SSD",
      capacityGB: 512,
      priceUSD: 60.0,
      stock: 5,
    });
  };

  const handleDeleteDrive = (id: string) => {
    setDrives(drives.filter((d) => d.id !== id));
  };

  const toggleOrderStatus = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? { ...o, status: o.status === "Pendente" ? "Enviado" : "Pendente" }
          : o,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500 selection:text-zinc-950">

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Navegação por Abas */}
        <div className="flex border-b border-zinc-800 mb-8 gap-8">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`pb-3 text-sm font-medium transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === "inventory"
                ? "border-orange-500 text-orange-400"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <HardDrive className="h-4 w-4" />
            <span>Inventário de Mídias ({drives.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("shipping")}
            className={`pb-3 text-sm font-medium transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === "shipping"
                ? "border-orange-500 text-orange-400"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Truck className="h-4 w-4" />
            <span>Configuração de Fretes</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-sm font-medium transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === "orders"
                ? "border-orange-500 text-orange-400"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <PackageCheck className="h-4 w-4" />
            <span>Encomendas Recebidas ({orders.length})</span>
          </button>
        </div>

        {/* ABA 1: INVENTÁRIO DE MÍDIAS */}
        {activeTab === "inventory" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-zinc-100">
                  Mídias de Armazenamento em Stock
                </h2>
                <p className="text-xs text-zinc-400">
                  Cadastre os SSDs, HDDs e Pen Drives que tem disponíveis para
                  gravar modelos.
                </p>
              </div>
              <button
                onClick={() => setShowAddDriveModal(true)}
                className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>Adicionar Nova Mídia</span>
              </button>
            </div>

            {/* Tabela de Inventário */}
            <div className="border border-zinc-800 rounded-xl bg-zinc-900/40 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 font-mono">
                  <tr>
                    <th className="p-4">Título da Mídia</th>
                    <th className="p-4">Tipo</th>
                    <th className="p-4">Capacidade</th>
                    <th className="p-4">Preço ($USD)</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                  {drives.map((drive) => (
                    <tr
                      key={drive.id}
                      className="hover:bg-zinc-900/60 transition-colors"
                    >
                      <td className="p-4 font-semibold text-zinc-100">
                        {drive.title}
                      </td>
                      <td className="p-4 font-mono text-zinc-400">
                        {drive.type}
                      </td>
                      <td className="p-4 font-mono text-orange-400">
                        {drive.capacityGB} GB
                      </td>
                      <td className="p-4 font-mono font-bold text-emerald-400">
                        ${drive.priceUSD.toFixed(2)}
                      </td>
                      <td className="p-4 font-mono">{drive.stock} un.</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteDrive(drive.id)}
                          className="text-zinc-500 hover:text-red-400 p-1.5 transition-colors"
                          title="Remover mídia"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ABA 2: CONFIGURAÇÃO DE FRETES */}
        {activeTab === "shipping" && (
          <form
            onSubmit={handleSaveShipping}
            className="max-w-2xl bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 space-y-6"
          >
            <div>
              <h2 className="text-lg font-bold text-zinc-100">
                Configuração do distribuidor & Fretes Fixos
              </h2>
              <p className="text-xs text-zinc-400">
                Defina a sua localização e as taxas fixas de envio para o
                checkout.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Nome do Nó
                </label>
                <input
                  type="text"
                  value={shippingConfig.nodeName}
                  onChange={(e) =>
                    setShippingConfig({
                      ...shippingConfig,
                      nodeName: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  País
                </label>
                <input
                  type="text"
                  value={shippingConfig.country}
                  onChange={(e) =>
                    setShippingConfig({
                      ...shippingConfig,
                      country: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Cidade / Região
                </label>
                <input
                  type="text"
                  value={shippingConfig.city}
                  onChange={(e) =>
                    setShippingConfig({
                      ...shippingConfig,
                      city: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <hr className="border-zinc-800" />

            {/* Envio Nacional */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-semibold text-zinc-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shippingConfig.shipsNationally}
                    onChange={(e) =>
                      setShippingConfig({
                        ...shippingConfig,
                        shipsNationally: e.target.checked,
                      })
                    }
                    className="accent-orange-500 h-4 w-4 rounded"
                  />
                  <span>Oferece Envio Nacional (Dentro do mesmo país)</span>
                </label>
              </div>

              {shippingConfig.shipsNationally && (
                <div className="pl-6">
                  <label className="block text-xs text-zinc-400 mb-1">
                    Taxa Fixa de Frete Nacional ($USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={shippingConfig.nationalShippingFee}
                    onChange={(e) =>
                      setShippingConfig({
                        ...shippingConfig,
                        nationalShippingFee: Number(e.target.value),
                      })
                    }
                    className="w-full max-w-xs bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-zinc-100 focus:outline-none focus:border-orange-500"
                  />
                </div>
              )}
            </div>

            {/* Envio Internacional */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs font-semibold text-zinc-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shippingConfig.shipsInternationally}
                    onChange={(e) =>
                      setShippingConfig({
                        ...shippingConfig,
                        shipsInternationally: e.target.checked,
                      })
                    }
                    className="accent-orange-500 h-4 w-4 rounded"
                  />
                  <span>Oferece Envio Internacional (Outros países)</span>
                </label>
              </div>

              {shippingConfig.shipsInternationally && (
                <div className="pl-6">
                  <label className="block text-xs text-zinc-400 mb-1">
                    Taxa Fixa de Frete Internacional ($USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={shippingConfig.internationalShippingFee}
                    onChange={(e) =>
                      setShippingConfig({
                        ...shippingConfig,
                        internationalShippingFee: Number(e.target.value),
                      })
                    }
                    className="w-full max-w-xs bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-zinc-100 focus:outline-none focus:border-orange-500"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-semibold px-5 py-2.5 rounded-lg text-xs flex items-center gap-2 transition-all"
            >
              <Save className="h-4 w-4" />
              <span>Salvar Definições de Frete</span>
            </button>
          </form>
        )}

        {/* ABA 3: ENCOMENDAS RECEBIDAS */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-zinc-100">
                Encomendas dos Clientes
              </h2>
              <p className="text-xs text-zinc-400">
                Gerencie os pedidos recebidos no marketplace e atualize o status
                de envio.
              </p>
            </div>

            <div className="border border-zinc-800 rounded-xl bg-zinc-900/40 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 font-mono">
                  <tr>
                    <th className="p-4">ID Pedido</th>
                    <th className="p-4">Cliente / Morada</th>
                    <th className="p-4">Mídia Solicitada</th>
                    <th className="p-4">Tipo Frete</th>
                    <th className="p-4">Total ($USD)</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-zinc-900/60 transition-colors"
                    >
                      <td className="p-4 font-mono font-bold text-orange-400">
                        {order.id}
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-zinc-100">
                          {order.customerName}
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          {order.address}
                        </div>
                      </td>
                      <td className="p-4 font-medium text-zinc-200">
                        {order.driveTitle}
                      </td>
                      <td className="p-4 font-mono text-zinc-400">
                        {order.shippingType}
                      </td>
                      <td className="p-4 font-mono font-bold text-emerald-400">
                        ${order.totalPriceUSD.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium ${
                            order.status === "Enviado"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {order.status === "Enviado" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3 animate-pulse" />
                          )}
                          <span>{order.status}</span>
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => toggleOrderStatus(order.id)}
                          className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded transition-colors"
                        >
                          Marcar{" "}
                          {order.status === "Pendente" ? "Enviado" : "Pendente"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal para Adicionar Mídia */}
      {showAddDriveModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-zinc-100">
              Adicionar Mídia ao Inventário
            </h3>

            <form onSubmit={handleAddDrive} className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-300 mb-1">
                  Título/Modelo da Mídia
                </label>
                <input
                  type="text"
                  placeholder="Ex: SanDisk Ultra 256GB Flash Drive"
                  value={newDrive.title}
                  onChange={(e) =>
                    setNewDrive({ ...newDrive, title: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-300 mb-1">
                    Tipo
                  </label>
                  <select
                    value={newDrive.type}
                    onChange={(e) =>
                      setNewDrive({ ...newDrive, type: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                  >
                    <option value="SSD">SSD Externo</option>
                    <option value="Flash Drive">Pen Drive / Flash</option>
                    <option value="HDD">HDD Externo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1">
                    Capacidade (GB)
                  </label>
                  <input
                    type="number"
                    value={newDrive.capacityGB}
                    onChange={(e) =>
                      setNewDrive({
                        ...newDrive,
                        capacityGB: Number(e.target.value),
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-300 mb-1">
                    Preço ($USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newDrive.priceUSD}
                    onChange={(e) =>
                      setNewDrive({
                        ...newDrive,
                        priceUSD: Number(e.target.value),
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1">
                    Quantidade em Stock
                  </label>
                  <input
                    type="number"
                    value={newDrive.stock}
                    onChange={(e) =>
                      setNewDrive({
                        ...newDrive,
                        stock: Number(e.target.value),
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDriveModal(false)}
                  className="px-4 py-2 rounded-lg text-xs text-zinc-400 hover:text-zinc-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-semibold px-4 py-2 rounded-lg text-xs"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
