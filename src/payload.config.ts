import { buildConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Drives } from "./collections/Drives";
import { Distributors } from "./collections/Distributors";
import { Models } from "./collections/Models";
import { Orders } from "./collections/Orders";

import { huggingFaceSearchEndpoint } from "./endpoints/huggingface";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      // Adiciona uma página/view dedicada no menu do Payload CMS Admin
      views: {
        HuggingFaceExplorer: {
          Component: "@/components/payload/HuggingFaceExplorer",
          path: "/huggingface-explorer",
        },
      },
    },
  },
  endpoints: [
    huggingFaceSearchEndpoint, // Endpoint que consulta a HuggingFace API
  ],
  collections: [Users, Media, Drives, Distributors, Models, Orders],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    idType: "uuidv7",
  }),
  sharp,
  plugins: [],
});
