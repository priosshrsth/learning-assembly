import z from "zod";

export const IframeQuerySchema = z.object({
  token: z.string().nonempty("Token is required."),
  clientId: z.string().nullish(),
  companyId: z.string().nullish(),
});

export type IFrameQuery = z.infer<typeof IframeQuerySchema>;
