import { type CopilotAPI, copilotApi } from "copilot-node-sdk";
import { cache } from "react";
import { serverEnv } from "src/config/server.env";
import type { AppPageProps } from "../next/next.types";
import { type IFrameQuery, IframeQuerySchema } from "./schema/iframe-query.schema";

export const getTokenFromPageProps = cache(async (data: AppPageProps) => {
  const searchParams = await data.searchParams;

  const parsedData = IframeQuerySchema.safeParse(searchParams);
  if (parsedData.error) {
    // We seem to have custom error, which I might need to integrate
    throw new Error("Could not get the token.");
  }

  return parsedData.data;
});

export class AssemblyClient {
  token: string;
  companyId?: string;
  clientId?: string;
  api: CopilotAPI;

  constructor(query: IFrameQuery) {
    this.token = query.token;
    if (query.companyId) {
      this.companyId = query.companyId;
    }
    if (query.clientId) {
      this.clientId = query.clientId;
    }

    const apiClient = copilotApi({
      apiKey: serverEnv.ASSEMBLY_API_KEY,
      token: query.token,
    });

    this.api = apiClient;
  }

  static async new(pagePropsOrToken: AppPageProps | string) {
    const query =
      typeof pagePropsOrToken === "string"
        ? { token: pagePropsOrToken }
        : await getTokenFromPageProps(pagePropsOrToken);

    if (globalThis.assemblyClient?.[query.token]) {
      return globalThis.assemblyClient[query.token];
    }

    const instance = new AssemblyClient(query);
    globalThis.assemblyClient = {
      [instance.token]: instance,
    };

    return instance;
  }
}

declare global {
  var assemblyClient: Record<string, AssemblyClient>;
}
