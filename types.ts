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
  | "visit:country"
  | `event:props:${string}`;

export type Metrics =
  | "visitors"
  | "pageviews"
  | "bounce_rate"
  | "visit_duration"
  | "events"
  | "visits";

export type Aggregated<Compare extends boolean> = Compare extends true ? {
    value: number;
    change: number;
  }
  : { value: number };

export type Datapoints<Metric extends string> = Array<
  & {
    [key in Metric]: string;
  }
  & {
    date: string;
  }
>;

type Breakdown<T extends string, Metric extends Metrics> =
  & {
    [key in T]: string;
  }
  & {
    [key in Metric]: number;
  };

export type Breakdowns<T extends Properties, Metric extends Metrics> = Array<
  T extends `${string}:${infer Key}` ? Breakdown<Key, Metric> : never
>;
