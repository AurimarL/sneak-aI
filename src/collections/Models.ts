import { CollectionConfig } from "payload";

export const Models: CollectionConfig = {
  slug: "models",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Nome do Modelo (Ex: Llama-3-70B)",
    },
    {
      name: "publisher",
      type: "text",
      required: true,
      label: "Criador / Publicador (Ex: Meta, DeepSeek)",
    },
    {
      name: "quantization",
      type: "text",
      required: true,
      label: "Quantização (Ex: Q4_K_M, Q8_0)",
    },
    {
      name: "sizeGB",
      type: "number",
      required: true,
      label: "Tamanho em Gigabytes (GB)",
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Geral & Raciocínio", value: "Geral & Raciocínio" },
        { label: "Programação & Código", value: "Programação & Código" },
        {
          label: "Raciocínio Lógico & Matemática",
          value: "Raciocínio Lógico & Matemática",
        },
        { label: "Ligeiro & Rápido", value: "Ligeiro & Rápido" },
      ],
      label: "Categoria",
    },
    {
      name: "description",
      type: "textarea",
      label: "Descrição Curta",
    },
    {
      name: "sha256",
      type: "text",
      label: "Checksum SHA-256 (Integridade)",
    },
  ],
};
