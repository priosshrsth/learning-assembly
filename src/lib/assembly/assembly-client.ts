import { type CopilotAPI, copilotApi } from "copilot-node-sdk";
import { cache } from "react";
import { serverEnv } from "src/config/server.env";
import { type IFrameQuery, IframeQuerySchema } from "./schema/iframe-query.schema";

export class AssemblyClient {
  token: string;
  api: CopilotAPI;

  constructor(payload: IFrameQuery) {
    this.token = payload.token;
    this.api = copilotApi({
      apiKey: serverEnv.ASSEMBLY_API_KEY,
      token: payload.token,
    });
  }
}

export const getAssemblyClient = cache(async (data: Pick<PageProps<"/">, "searchParams">) => {
  const searchParams = await data.searchParams;

  const parsedData = IframeQuerySchema.safeParse(searchParams);
  if (parsedData.error) {
    // We seem to have custom error, which I might need to integrate
    throw new Error("Could not get the token.");
  }

  return new AssemblyClient(parsedData.data);
});
