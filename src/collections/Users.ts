import { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Nome Completo",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "customer",
      options: [
        { label: "Administrador", value: "admin" },
        { label: "Distribuidor / Nó", value: "distributor" },
        { label: "Cliente", value: "customer" },
      ],
      label: "Papel no Sistema",
    },
  ],
};
