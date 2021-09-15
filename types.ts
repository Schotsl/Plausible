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

// I have no clue how the Breakdown / BreakdownReturns works so shoutout to @iDavidB

export type Datapoints = {
  date: string;
  visitors: number;
}[];

export type Aggregated = {
  value: number;
  change?: number;
};

type Breakdown<T extends string, Metric extends Metrics> =
  & {
    [key in T]: string;
  }
  & {
    [key in Metric]: number;
  };

export type Breakdowns<T extends Property, Metric extends Metrics> = Array<
  T extends `${infer _}:${infer Key}` ? Breakdown<Key, Metric> : never
>;
