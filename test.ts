import PlausibleAPI from "./index.ts";

import { initializeEnv } from "./helper.ts";

initializeEnv([
  "PLAUSIBLE_TOKEN",
  "PLAUSIBLE_SITE",
  "PLAUSIBLE_URL",
]);

const plausibleAPI = new PlausibleAPI(
  Deno.env.get("PLAUSIBLE_TOKEN")!,
  Deno.env.get("PLAUSIBLE_SITE")!,
  Deno.env.get("PLAUSIBLE_URL")!,
);

// Do the bare minimum and check if every function runs without crashing

Deno.test("get realtime pageviews", async () => {
  await plausibleAPI.getRealtime();
});

Deno.test("get aggregated pageviews", async () => {
  await plausibleAPI.getAggregate("6mo", "bounce_rate");
});

Deno.test("get pageviews timeseries", async () => {
  await plausibleAPI.getTimeseries("6mo", "bounce_rate");
});

Deno.test("get pageviews breakdown", async () => {
  await plausibleAPI.getBreakdown("6mo", "bounce_rate", "visit:os_version");
});
