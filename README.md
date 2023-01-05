<a href="https://uwuifier.com">
    <img src="assets/plausible-512.png" alt="Plausible logo" align="right" height="60" width="60" />
</a>

# Plausible

A zero-dependency, TypeScript library for interacting with the Plausible Analytics API, written in Deno! Easily retrieve realtime, aggregated, and timeseries data for your site, or get breakdowns and properties for your Plausible Analytics account. More information can be found at [Plausible Analytics API documentation](https://plausible.io/docs/stats-api).

## Installation

### Deno

To use the library in Deno, import the module at https://deno.land/x/plausible@v1.0.0.

```ts
import PlausibleAPI from "https://deno.land/x/plausible@v1.0.0";
```

### Node

To use the library in Node, install it via npm:

```bash
npm install --save plausible
```

Then, import the library in your code:

```ts
import PlausibleAPI from "plausible";
```

## Quickstart

Here's an example of how you can use the PlausibleAPI class to retrieve the number of current visitors on your site:

```ts
import PlausibleAPI from "https://deno.land/x/plausible@v1.0.0";

const key = "your-api-key";
const site = "your-site-id";

const plausible = new PlausibleAPI(key, site);
const realtime = await plausible.getRealtime();

console.log(realtime);
```

## API
```ts
new PlausibleAPI(key: string, site: string, url?: string | null)
```
Creates a new `PlausibleAPI` instance.

Parameters:

- `key` Your Plausible Analytics API key.
- `site` The ID of the site you want to retrieve data for.
- `url` (optional): The base URL of the Plausible Analytics API. Defaults to https://plausible.com.

```ts
getRealtime(): Promise<number>
```

Retrieves the number of current visitors on your site. A current visitor is defined as a visitor who triggered a pageview on your site in the last 5 minutes.

```ts
getAggregate<Compare extends boolean>(period: Period, metric: Metrics, compare?: Compare | null, filters?: string | null): Promise<Aggregated<Compare>>
```

Aggregates metrics over a certain time period. If you are familiar with the Plausible dashboard, this function corresponds to the top row of stats that include Unique Visitors, Pageviews, Bounce rate, and Visit duration. You can retrieve any number and combination of these metrics in one request.
Parameters

- `period`: The time period to retrieve data for. Possible values are:
    - `"last_30_days"`
    - `"last_90_days"`
    - `"last_180_days"`
    - `"last_year"`
    - `"custom"`

- `metric`: The metric(s) to retrieve. Possible values are:
    - `"visitors"`
    - `"pageviews"`
    - `"bounce_rate"`
    - `"visit_duration"`
    - Multiple values can be passed as a comma-separated string (e.g. `"visitors,pageviews,bounce_rate"`).
- `compare` (optional): If `true`, the returned data will include a comparison to the previous period.
- `filters` (optional): A string containing filters to apply to the data. Filters can be used to segment the data by different dimensions, such as referral source or device type.

```ts
getTimeseries<Metric extends Metrics>(period: Period, metric?: Metric, filters?: string | null, interval
```

This function retrieves timeseries data over a certain time period. If you are familiar with the Plausible dashboard, this function corresponds to the main visitor graph.

- `period`: The time period to retrieve data for.  Possible values are:
    - `"last_30_days"`
    - `"last_90_days"`
    - `"last_180_days"`
    - `"last_year"`
    - `"custom"`
- `metric`: The metric to retrieve breakdowns for. Possible values are:
    - `"visitors"`
    - `"pageviews"`
    - `"bounce_rate"`
    - `"visit_duration"`
- `filters` (optional): A string containing filters to apply to the data. Filters can be used to segment the data by different dimensions, such as referral source or device type.
- `interval` (optional): The interval of the timeseries data. Possible values are:
    - `"day"`
    - `"week"`
    - `"month"`
    - If not provided, the default interval is "day".

```ts
getBreakdowns<Metric extends Metrics>(period: Period, metric: Metric, filters?: string | null): Promise<Breakdowns<Metric>>
```

Retrieves breakdowns of metrics over a certain time period. Breakdowns can be used to segment the data by different dimensions, such as referral source or device type.

Parameters

- `period`: The time period to retrieve data for.  Possible values are:
    - `"last_30_days"`
    - `"last_90_days"`
    - `"last_180_days"`
    - `"last_year"`
    - `"custom"`
- `metric`: The metric to retrieve breakdowns for. Possible values are:
    - `"visitors"`
    - `"pageviews"`
    - `"bounce_rate"`
    - `"visit_duration"`
- `filters` (optional): A string containing filters to apply to the data. Filters can be used to segment the data by different dimensions, such as referral source or device type.

## License

This library is licensed under the MIT License.
Credits

## Acknowledgments

This library was created using the [Plausible Analytics API documentation](https://plausible.io/docs/stats-api). The `README.md` was written with the help of ChatGPT, a language model developed by OpenAI.
