import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

export function initializeEnv(variables: string[]) {
  // Load .env file
  config({ export: true });

  // Loop over every key and make sure it has been set
  variables.forEach((variable: string) => {
    if (!Deno.env.get(variable)) {
      throw new Error(`${variable} .env variable must be set.`);
    }
  });
}
