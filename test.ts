import PlausibleAPI from "./index.ts";

const plausibleAPI = new PlausibleAPI(
  "nBJZCb0WGNmJ49tI3aEfEUsdu_vci3ZRsN1l4V7VkF2mkBW-p_KM-4W1kHPqAJBi",
  "uwuifier.com",
  "https://plausible.hedium.nl",
);

// Do the bare minimum and check if every function runs without crashing

Deno.test("get realtime pageviews", async () => {
  await plausibleAPI.getRealtime();
});

Deno.test("get aggregated pageviews", async () => {
  await plausibleAPI.getAggregate("6mo", "pageviews");
});

Deno.test("get pageviews timeseries", async () => {
  await plausibleAPI.getTimeseries("6mo", "pageviews");
});

Deno.test("get pageviews breakdown", async () => {
  await plausibleAPI.getBreakdown("6mo", "visit:browser", "pageviews");
});
