<a href="https://github.com/Schotsl/Plausible">
  <img src="plausible.svg" alt="Schotsl/Plausible logo" height="60" width="60" />
</a>

# Plausible

A zero-dependency, TypeScript library for interacting with the Plausible
Analytics API, written in Deno! Easily retrieve realtime, aggregated, and
timeseries data for your site, or get breakdowns and properties for your
Plausible Analytics account. More information can be found at
[Plausible Analytics API documentation](https://plausible.io/docs/stats-api).

## Installation

### Deno

To use the library in Deno, import the module at
https://deno.land/x/plausible@v2.2.1/index.ts.

```ts
import Plausible from "https://deno.land/x/plausible@v2.2.1/index.ts";
```

### Node

To use the library in Node, install it via npm:

```bash
npm install --save plausible
```

Then, import the library in your code:

```ts
import Plausible from "plausible";
```

## Quickstart

Here's an example of how you can use the Plausible class to retrieve the number
of current visitors on your site:

```ts
import Plausible from "https://deno.land/x/plausible@v2.2.1/index.ts";

const key = "your-api-key";
const site = "your-site-id";

const plausible = new Plausible(key, site);
const realtime = await plausible.getRealtime();

console.log(realtime);
```

## API

### Plausible

```ts
new Plausible(key: string, site: string, url?: string | null)
```

Creates a new `Plausible` instance.

#### Parameters:

- `key`: Your Plausible Analytics API key.
- `site`: The ID of the site you want to retrieve data for.
- `url`: (optional): The base URL of the Plausible Analytics API. Defaults to
  https://plausible.com.

### getRealtime

```ts
getRealtime(): Promise<number>
```

Retrieves the number of current visitors on your site. A current visitor is
defined as a visitor who triggered a pageview on your site in the last 5
minutes.

### getAggregate

```ts
getAggregate<Compare extends boolean>(period: Period, metric: Metrics, compare?: Compare | null, filters?: string | null, date?: string | null): Promise<Aggregated<Compare>>
```

Aggregates metrics over a certain time period. If you are familiar with the
Plausible dashboard, this function corresponds to the top row of stats that
include `Unique Visitors` pageviews, `Bounce rate` and `Visit duration`.

#### Parameters

- `period`: The time period to retrieve data for. Possible values are:

  - `"12mo"`
  - `"6mo"`
  - `"month"`
  - `"30d"`
  - `"7d"`
  - `"day"`
  - `"custom"`

- `metric`: The metric to retrieve. Possible values are:

  - `"visitors"`
  - `"pageviews"`
  - `"bounce_rate"`
  - `"visit_duration"`
  - `"events"`
  - `"visits"`

- `compare` (optional): If `true`, the returned data will include a comparison
  to the previous period.

- `filters` (optional): A string containing filters to apply to the data.
  Filters can be used to segment the data by different dimensions, such as
  referral source or device type.

- `date` (optional): A string containing the ISO-8601 end date relative to
  period (e.g. `2000-01-01`). For example, if using `30d`, setting a date will
  query for the 30 days before the date. When period is set to `custom`, this
  expect 2 dates separated by a comma, e.g. `2000-01-01,2000-12-31`.

### getTimeseries

```ts
getTimeseries<Metric extends Metrics>(period: Period, metric: Metric, filters?: string | null, interval? Interval | null, date?: string | null): Promise<Datapoints<Metric>>
```

This function retrieves timeseries data over a certain time period. If you are
familiar with the Plausible dashboard, this function corresponds to the main
visitor graph.

#### Parameters

- `period`: The time period to retrieve data for. Possible values are:

  - `"12mo"`
  - `"6mo"`
  - `"month"`
  - `"30d"`
  - `"7d"`
  - `"day"`
  - `"custom"`

- `metric`: The metric to retrieve. Possible values are:

  - `"visitors"`
  - `"pageviews"`
  - `"bounce_rate"`
  - `"visit_duration"`
  - `"events"`
  - `"visits"`

- `filters` (optional): A string containing filters to apply to the data.
  Filters can be used to segment the data by different dimensions, such as
  referral source or device type.

- `interval` (optional): The reporting interval. Defaults to `month` for `6mo`
  and `12mo`, otherwise falls back to `date`. Possible values are:

  - `"date"`
  - `"month"`

- `date` (optional): A string containing the ISO-8601 end date relative to
  period (e.g. `2000-01-01`). For example, if using `30d`, setting a date will
  query for the 30 days before the date. When period is set to `custom`, this
  expect 2 dates separated by a comma, e.g. `2000-01-01,2000-12-31`.

### getBreakdown

```ts
getBreakdown<Property extends Properties, Metric extends Metrics>(period: Period, metric: Metric, property: Property, filter?: string | null, limit?: number | null, page?: number | null, date?: string | null): Promise<Breakdowns<Property, Metric>>
```

Retrieves breakdowns of metrics over a certain time period. Breakdowns can be
used to segment the data by different dimensions, such as referral source or
device type.

#### Parameters

- `period`: The time period to retrieve data for. Possible values are:

  - `"12mo"`
  - `"6mo"`
  - `"month"`
  - `"30d"`
  - `"7d"`
  - `"day"`
  - `"custom"`

- `metric`: The metric to retrieve. Possible values are:

  - `"visitors"`
  - `"pageviews"`
  - `"bounce_rate"`
  - `"visit_duration"`
  - `"events"`
  - `"visits"`

- `property`: The property to group the data by. Possible values are

  - `"event:name"`
  - `"event:page"`
  - `"visit:source"`
  - `"visit:referrer"`
  - `"visit:utm_medium"`
  - `"visit:utm_source"`
  - `"visit:utm_campaign"`
  - `"visit:device"`
  - `"visit:browser"`
  - `"visit:browser_version"`
  - `"visit:os"`
  - `"visit:os_version"`
  - `"visit:country"`

- `filters` (optional): A string containing filters to apply to the data.
  Filters can be used to segment the data by different dimensions, such as
  referral source or device type.

- `limit`: Limit the number of results. Maximum value is 1000. Defaults to 100.

- `offset`: Number of the page, used to paginate results. Importantly, the page
  numbers start from 1 not 0.

- `date` (optional): A string containing the ISO-8601 end date relative to
  period (e.g. `2000-01-01`). For example, if using `30d`, setting a date will
  query for the 30 days before the date. When period is set to `custom`, this
  expect 2 dates separated by a comma, e.g. `2000-01-01,2000-12-31`.

## License

This library is licensed under the MIT License.

## Acknowledgments

This library was created using the
[Plausible Analytics API documentation](https://plausible.io/docs/stats-api).
The `README.md` was written with the help of ChatGPT, a language model developed
by OpenAI.
