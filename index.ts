// deno-lint-ignore-file no-explicit-any

import type {
  Aggregated,
  Breakdowns,
  Datapoints,
  Interval,
  Metrics,
  Period,
  Properties,
} from "./types.ts";

export default class Plausible {
  private url = "https://plausible.com";

  private key: string;
  private site: string;

  constructor(key: string, site: string, url?: string | null) {
    this.key = key;
    this.site = site;

    if (url) {
      // Remove the / if it has been accidentally provided
      if (url.charAt(url.length) === "/") url = url.slice(0, -1);
      this.url = url;
    }
  }

  private async getAbstract(
    path: string,
    params: URLSearchParams = new URLSearchParams(),
  ): Promise<any> {
    // Append the standard site ID to every request
    params.append("site_id", this.site);

    // Construct the endpoint URL and fetch the results
    const endpoint = `${this.url}/${path}?${params}`;
    const response = await fetch(endpoint, {
      method: `GET`,
      headers: {
        Authorization: `Bearer ${this.key}`,
        "Content-Type": `application/json`,
      },
    });

    // Throw the error if the API has provided one
    const parsed = (await response.json()) as any;
    if (parsed.error) throw new Error(parsed.error);

    // Otherwise just return the results
    return parsed;
  }

  /**
   * This function returns the number of current visitors on your site. A current visitor is defined as a visitor who triggered a pageview on your site in the last 5 minutes.
   */
  public getRealtime(): Promise<number> {
    return this.getAbstract(`api/v1/stats/realtime/visitors`);
  }

  /**
   * This function aggregates metrics over a certain time period. If you are familiar with the Plausible dashboard, this function corresponds to the top row of stats that include Unique Visitors, Pageviews, Bounce rate and Visit duration. You can retrieve any number and combination of these metrics in one request.
   */
  public async getAggregate<Compare extends boolean>(
    period: Period,
    metric: Metrics,
    compare?: Compare | null,
    filters?: string | null,
    date?: string | null,
  ): Promise<Aggregated<Compare>> {
    const params = new URLSearchParams();

    params.append(`period`, period);
    params.append(`metrics`, metric);

    if (compare) params.append(`compare`, "previous_period");
    if (filters) params.append("filters", filters);
    if (date) params.append("date", date);

    const response = await this.getAbstract(`api/v1/stats/aggregate`, params);

    if (response.results.visitors) return response.results.visitors;
    if (response.results.pageviews) return response.results.pageviews;
    if (response.results.bounce_rate) return response.results.bounce_rate;

    return response.results.visit_duration;
  }

  /**
   * This function provides timeseries data over a certain time period. If you are familiar with the Plausible dashboard, this function corresponds to the main visitor graph.
   */
  public async getTimeseries<Metric extends Metrics>(
    period: Period,
    metric: Metric,
    filters?: string | null,
    interval?: Interval | null,
    date?: string | null,
  ): Promise<Datapoints<Metric>> {
    const params = new URLSearchParams();

    params.append(`period`, period);

    if (metric) params.append(`metrics`, metric);
    if (filters) params.append(`filters`, filters);
    if (interval) params.append("interval", interval);
    if (date) params.append("date", date);

    const response = await this.getAbstract(`api/v1/stats/timeseries`, params);
    return response.results;
  }

  /**
   * This function allows you to breakdown your stats by some property. If you are familiar with SQL family databases, this function corresponds to running GROUP BY on a certain property in your stats.
   *
   * Check out the [properties](https://plausible.io/docs/stats-api#properties) section for a reference of all the properties you can use in this query.
   */
  public async getBreakdown<
    Property extends Properties,
    Metric extends Metrics,
  >(
    period: Period,
    metric: Metric,
    property: Property,
    filter?: string | null,
    limit?: number | null,
    page?: number | null,
    date?: string | null,
  ): Promise<Breakdowns<Property, Metric>> {
    const params = new URLSearchParams();

    params.append(`period`, period);
    params.append(`metrics`, metric);
    params.append(`property`, property);

    if (filter) params.append(`filters`, filter);

    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());
    if (date) params.append("date", date);

    const response = await this.getAbstract(`api/v1/stats/breakdown`, params);
    return response.results;
  }
}
