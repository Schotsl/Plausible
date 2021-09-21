export type Period = "12mo" | "6mo" | "month" | "30d" | "7d" | "day";
export type Interval = "date" | "month";

export type Properties =
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

export type Aggregated<Compare extends boolean> = Compare extends true ? {
  value: number;
  change: number;
}
  : { value: number };

type Datapoint<T extends string> =
  & {
    [key in T]: string;
  }
  & {
    date: string;
  };

type Breakdown<T extends string, Metric extends Metrics> =
  & {
    [key in T]: string;
  }
  & {
    [key in Metric]: number;
  };

export type Datapoints<T extends Metrics> = Array<
  T extends `${infer Key}` ? Datapoint<Key> : never
>;

export type Breakdowns<T extends Properties, Metric extends Metrics> = Array<
  T extends `${infer _}:${infer Key}` ? Breakdown<Key, Metric> : never
>;
