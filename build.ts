import { build } from "https://deno.land/x/dnt@0.32.1/mod.ts";

await build({
  shims: {
    deno: true,
  },
  package: {
    name: "plausible",
    author: "Sjors van Holst",
    license: "MIT",
    version: "1.0.0",
    homepage: "https://github.com/Schotsl/Plausible",
    repository: "git://github.com/Schotsl/Plausible.git",
    description:
      "A simple Deno and Node wrapper for the recently released Plausible API",
  },
  outDir: "./dist",
  entryPoints: ["./index.ts"],
});

Deno.copyFileSync("README.md", "dist/README.md");
Deno.copyFileSync("LICENSE.md", "dist/LICENSE.md");
