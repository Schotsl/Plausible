import { build, emptyDir } from "jsr:@deno/dnt";

await emptyDir(".npm");

await build({
  entryPoints: ["./index.ts"],
  outDir: ".npm",
  shims: {
    deno: true,
    undici: true,
  },
  package: {
    name: "plausible",
    bugs: {
      url: "https://github.com/Schotsl/Plausible/issues",
    },
    license: "MIT",
    version: "v2.2.0",
    description:
      "A zero-dependency, TypeScript library for interacting with the Plausible Analytics API, written in Deno!",
    repository: {
      type: "git",
      url: "git+https://github.com/Schotsl/Plausible",
    },
  },
});

Deno.copyFileSync("README.md", ".npm/README.md");
Deno.copyFileSync("LICENSE.md", ".npm/LICENSE.md");
