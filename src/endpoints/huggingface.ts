import { Endpoint } from "payload";

export const huggingFaceSearchEndpoint: Endpoint = {
  path: "/huggingface/search",
  method: "get",
  handler: async (req) => {
    const url = new URL(req.url || "", "http://localhost");
    const query = url.searchParams.get("search") || "";
    const limit = url.searchParams.get("limit") || "15";

    try {
      // Endpoint oficial do Hugging Face Hub API para modelos
      // Filtra por modelos tag GGUF e ordena por número de downloads
      const hfApiUrl = new URL("https://huggingface.co/api/models");
      hfApiUrl.searchParams.set("search", query);
      hfApiUrl.searchParams.set("filter", "gguf");
      hfApiUrl.searchParams.set("sort", "downloads");
      hfApiUrl.searchParams.set("direction", "-1");
      hfApiUrl.searchParams.set("limit", limit);
      hfApiUrl.searchParams.set("full", "true"); // Traz metadados adicionais

      const response = await fetch(hfApiUrl.toString(), {
        headers: {
          "User-Agent": "SneakAI-Admin-Importer/1.0",
        },
      });

      if (!response.ok) {
        return Response.json(
          { error: "Falha ao comunicar com a Hugging Face API" },
          { status: response.status },
        );
      }

      const models = await response.json();

      // Mapeia e higieniza os dados para consumo no frontend admin
      const formattedModels = models.map((item: any) => {
        const parts = item.id.split("/");
        const publisher = parts.length > 1 ? parts[0] : "Desconhecido";
        const modelName = parts.length > 1 ? parts[1] : item.id;

        // Tenta estimar o tamanho em GB navegando pelos sibling files (se existirem .gguf)
        let estimatedGB = 0;
        if (Array.isArray(item.siblings)) {
          const ggufFiles = item.siblings.filter((f: any) =>
            f.rfilename?.toLowerCase().endsWith(".gguf"),
          );
          if (ggufFiles.length > 0 && ggufFiles[0].size) {
            estimatedGB = parseFloat(
              (ggufFiles[0].size / (1024 * 1024 * 1024)).toFixed(2),
            );
          }
        }

        return {
          id: item.id,
          name: modelName,
          publisher,
          downloads: item.downloads || 0,
          likes: item.likes || 0,
          pipeline_tag: item.pipeline_tag || "text-generation",
          estimatedGB: estimatedGB || 4.5, // valor padrão se não puder calcular exatamente
          sha256: item.sha || "",
        };
      });

      return Response.json({ success: true, docs: formattedModels });
    } catch (error: any) {
      return Response.json(
        { error: error.message || "Erro interno ao pesquisar na HF" },
        { status: 500 },
      );
    }
  },
};
