import Plausible from "./index.ts";

import { assert } from "https://deno.land/std@0.212.0/testing/asserts.ts";
import { initializeEnv } from "./helper.ts";

// Initialize environment variables for test runs
initializeEnv([
  "PLAUSIBLE_TOKEN",
  "PLAUSIBLE_SITE",
  "PLAUSIBLE_URL",
]);

const plausible = new Plausible(
  Deno.env.get("PLAUSIBLE_TOKEN")!,
  Deno.env.get("PLAUSIBLE_SITE")!,
  Deno.env.get("PLAUSIBLE_URL")!,
);

Deno.test("retrieves the number of current visitors", async () => {
  const currentVisitors = await plausible.getRealtime();
  assert(typeof currentVisitors === "number");
});

Deno.test("retrieves aggregated data", async () => {
  const data = await plausible.getAggregate("30d", "visitors");
  assert(typeof data === "object");
});

Deno.test("retrieves timeseries data", async () => {
  const data = await plausible.getTimeseries("30d", "visitors");
  assert(Array.isArray(data));
});

Deno.test("retrieves breakdown data", async () => {
  const data = await plausible.getBreakdown("30d", "pageviews", "visit:source");
  assert(typeof data === "object");
});
