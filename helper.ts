import "jsr:@std/dotenv/load";

export function initializeEnv(variables: string[]) {
  // Loop over every key and make sure it has been set
  variables.forEach((variable: string) => {
    if (!Deno.env.get(variable)) {
      throw new Error(`${variable} .env variable must be set.`);
    }
  });
}
