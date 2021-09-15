import PlausibleAPI from "./index.ts";

const plausibleAPI = new PlausibleAPI(
  "IMuRtn-0O29u7Yhza3wmbaT3jfxX20l29Pg1J52R6vK1CgXHiYPaIJobb1SneR_4",
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
  console.log('\n');

  console.log((await plausibleAPI.getBreakdown("6mo", "visit:country", "pageviews"))[0]);
  console.log((await plausibleAPI.getBreakdown("6mo", "visit:browser", "pageviews"))[0]);

  console.log((await plausibleAPI.getBreakdown("6mo", "visit:browser", "pageviews"))[0]);
  console.log((await plausibleAPI.getBreakdown("6mo", "visit:browser", "bounce_rate"))[0]);
});
