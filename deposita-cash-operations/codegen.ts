import { CodegenConfig } from "@graphql-codegen/cli";
import { environment } from "./src/environments/environment";

const config: CodegenConfig = {
  overwrite: true,
  schema: environment.graphQLUrl,
  documents: "./src/app/shared/graphQL/**/*.graphql.ts",
  generates: {
    "./src/app/shared/graphQL/codegen/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-apollo-angular"
      ]
    },
    "./schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
