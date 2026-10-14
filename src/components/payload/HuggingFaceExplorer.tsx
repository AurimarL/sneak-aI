"use client";

import React, { useState, useEffect } from "react";

export default function HuggingFaceExplorer() {
  const [search, setSearch] = useState("Llama-3");
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [importingId, setImportingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState("Geral & Raciocínio");

  const fetchHFModels = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/huggingface/search?search=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      if (data.docs) {
        setModels(data.docs);
      }
    } catch (err) {
      console.error("Erro ao buscar modelos na Hugging Face:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHFModels(search);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHFModels(search);
  };

  const handleImport = async (hfModel: any) => {
    setImportingId(hfModel.id);

    // Mapeamento automático dos campos para a tua coleção `Models`
    const payloadBody = {
      name: hfModel.name,
      publisher: hfModel.publisher,
      quantization: "Q4_K_M", // Padrão GGUF mais comum
      sizeGB: hfModel.estimatedGB || 4.0,
      category: selectedCategory,
      description: `Modelo importado do Hugging Face (${hfModel.id}). Downloads: ${hfModel.downloads}`,
      sha256: hfModel.sha256 || "",
    };

    try {
      const res = await fetch("/api/models", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadBody),
      });

      if (res.ok) {
        alert(
          `Modelo "${hfModel.name}" adicionado com sucesso à coleção Models!`,
        );
      } else {
        const errData = await res.json();
        alert(
          `Erro ao guardar modelo: ${errData.errors?.[0]?.message || "Falha na requisição"}`,
        );
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão ao salvar na base de dados.");
    } finally {
      setImportingId(null);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          🤗 Hugging Face Model Explorer
        </h1>
        <p style={{ color: "#666" }}>
          Explore e importe modelos GGUF diretamente da Hugging Face para o
          repositório do SneakAI.
        </p>
      </header>

      {/* Formulário de Busca e Filtros */}
      <form
        onSubmit={handleSearchSubmit}
        style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ex: DeepSeek-R1, Qwen2.5, Llama-3..."
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="Geral & Raciocínio">Geral & Raciocínio</option>
          <option value="Programação & Código">Programação & Código</option>
          <option value="Raciocínio Lógico & Matemática">
            Raciocínio Lógico & Matemática
          </option>
          <option value="Ligeiro & Rápido">Ligeiro & Rápido</option>
        </select>
        <button
          type="submit"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "A pesquisar..." : "Pesquisar"}
        </button>
      </form>

      {/* Grelha de Modelos */}
      {loading ? (
        <p>A carregar resultados da Hugging Face...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {models.map((model) => (
            <div
              key={model.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "1.25rem",
                backgroundColor: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.2rem 0.5rem",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "4px",
                    color: "#374151",
                  }}
                >
                  {model.publisher}
                </span>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    margin: "0.5rem 0",
                  }}
                >
                  {model.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "1rem",
                  }}
                >
                  📥 {model.downloads.toLocaleString()} downloads | ❤️{" "}
                  {model.likes} likes
                </p>
                <p style={{ fontSize: "0.85rem", color: "#4b5563" }}>
                  Est. Tamanho: <strong>~{model.estimatedGB} GB</strong>
                </p>
              </div>

              <button
                onClick={() => handleImport(model)}
                disabled={importingId === model.id}
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  padding: "0.6rem",
                  backgroundColor:
                    importingId === model.id ? "#9ca3af" : "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "600",
                  cursor: importingId === model.id ? "not-allowed" : "pointer",
                }}
              >
                {importingId === model.id
                  ? "A Adicionar..."
                  : "➕ Adicionar ao SneakAI"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
