import { CollectionConfig } from "payload";

export const Distributors: CollectionConfig = {
  slug: "distributors",
  admin: {
    useAsTitle: "nodeName",
  },
  fields: [
    {
      name: "nodeName",
      type: "text",
      required: true,
      label: "Nome do Nó / Empresa",
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      unique: true,
      label: "Utilizador Associado",
    },
    {
      name: "country",
      type: "text",
      required: true,
      label: "País",
    },
    {
      name: "city",
      type: "text",
      required: true,
      label: "Cidade",
    },
    {
      name: "shipping",
      type: "group",
      label: "Configuração de Fretes Fixos",
      fields: [
        {
          name: "shipsNationally",
          type: "checkbox",
          defaultValue: true,
          label: "Faz Envio Nacional?",
        },
        {
          name: "nationalShippingFee",
          type: "number",
          defaultValue: 10,
          label: "Taxa Fixa Nacional ($USD)",
        },
        {
          name: "shipsInternationally",
          type: "checkbox",
          defaultValue: true,
          label: "Faz Envio Internacional?",
        },
        {
          name: "internationalShippingFee",
          type: "number",
          defaultValue: 25,
          label: "Taxa Fixa Internacional ($USD)",
        },
      ],
    },
  ],
};
