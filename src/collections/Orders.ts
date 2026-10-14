import { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "id",
  },
  fields: [
    {
      name: "distributor",
      type: "relationship",
      relationTo: "distributors",
      required: true,
      label: "Distribuidor Atribuído",
    },
    {
      name: "customerInfo",
      type: "group",
      label: "Dados de Entrega do Cliente",
      fields: [
        { name: "name", type: "text", required: true, label: "Nome" },
        { name: "email", type: "text", required: true, label: "E-mail" },
        { name: "country", type: "text", required: true, label: "País" },
        { name: "city", type: "text", required: true, label: "Cidade" },
        { name: "address", type: "text", required: true, label: "Morada" },
      ],
    },
    {
      name: "models",
      type: "relationship",
      relationTo: "models",
      hasMany: true,
      required: true,
      label: "Modelos Incluídos",
    },
    {
      name: "drive",
      type: "relationship",
      relationTo: "drives",
      required: true,
      label: "Mídia Física Selecionada",
    },
    {
      name: "shippingType",
      type: "select",
      required: true,
      options: [
        { label: "Nacional", value: "Nacional" },
        { label: "Internacional", value: "Internacional" },
      ],
      label: "Tipo de Envio",
    },
    {
      name: "totalPriceUSD",
      type: "number",
      required: true,
      label: "Preço Total ($USD)",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "Pendente",
      options: [
        { label: "Pendente", value: "Pendente" },
        { label: "Enviado", value: "Enviado" },
        { label: "Entregue", value: "Entregue" },
      ],
      label: "Status da Encomenda",
    },
  ],
};
