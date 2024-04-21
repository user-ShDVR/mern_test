import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./swagger-spec.json",
  apiFile: "./src/store/api/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "./src/store/api/defaultApi.ts",
  exportName: "defaultApi",
  hooks: true,
};

export default config;
