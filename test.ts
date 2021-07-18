import { PlausibleAPI } from "./index.ts";

const plausibleAPI = new PlausibleAPI(
  "nBJZCb0WGNmJ49tI3aEfEUsdu_vci3ZRsN1l4V7VkF2mkBW-p_KM-4W1kHPqAJBi",
  "uwuifier.com",
);

console.log((await plausibleAPI.getBreakdown("6mo", "visit:browser")));