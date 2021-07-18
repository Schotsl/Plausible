export type Period = "12mo" | "6mo" | "month" | "30d" | "7d" | "day";
export type Interval = "date" | "month";

export type Property =
  | "event:name"
  | "event:page"
  | "visit:source"
  | "visit:referrer"
  | "visit:utm_medium"
  | "visit:utm_source"
  | "visit:utm_campaign"
  | "visit:device"
  | "visit:browser"
  | "visit:browser_version"
  | "visit:os"
  | "visit:os_version"
  | "visit:country";

export type Metrics =
  | "visitors"
  | "pageviews"
  | "bounce_rate"
  | "visit_duration";

export interface Aggregated {
  value: number;
  change?: number;
}

export interface Datapoint {
  date: string;
  visitors: number;
}