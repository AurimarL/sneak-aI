import { CollectionConfig } from "payload";

export const Drives: CollectionConfig = {
  slug: "drives",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "distributor",
      type: "relationship",
      relationTo: "distributors",
      required: true,
      label: "Distribuidor Responsável",
    },
    {
      name: "title",
      type: "text",
      required: true,
      label: "Título da Mídia (Ex: Kingston 128GB)",
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "SSD Externo", value: "SSD" },
        { label: "Pen Drive / Flash", value: "Flash Drive" },
        { label: "HDD Externo", value: "HDD" },
      ],
      label: "Tipo de Mídia",
    },
    {
      name: "condition",
      type: "select",
      required: true,
      defaultValue: "Novo",
      options: [
        { label: "Novo", value: "Novo" },
        { label: "Usado / Revisado", value: "Usado" },
      ],
      label: "Condição",
    },
    {
      name: "capacityGB",
      type: "number",
      required: true,
      label: "Capacidade Total (GB)",
    },
    {
      name: "priceUSD",
      type: "number",
      required: true,
      label: "Preço da Mídia ($USD)",
    },
    {
      name: "stock",
      type: "number",
      required: true,
      defaultValue: 1,
      label: "Quantidade em Stock",
    },
  ],
};
