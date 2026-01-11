import { cache } from "react";
import z from "zod";

const serverEnvSchema = z.object({
  ASSEMBLY_API_KEY: z.string(),
  NODE_ENV: z.enum(["development", "test", "staging", "production"]),
});

let validatedEnv: z.output<typeof serverEnvSchema>;

const getValidateEnv = cache(() => {
  if (validatedEnv) {
    return validatedEnv;
  }

  console.log("Validing env..");

  validatedEnv = serverEnvSchema.parse(process.env);
  return validatedEnv;
});

export const serverEnv = getValidateEnv();
