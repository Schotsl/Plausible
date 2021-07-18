// deno-lint-ignore-file no-explicit-any

import {
  Aggregated,
  Datapoint,
  Interval,
  Metrics,
  Period,
  Property,
} from "./types.ts";

export class PlausibleAPI {
  public url = "https://plausible.hedium.nl";

  private key: string;
  private site: string;

  constructor(key: string, site: string) {
    this.key = key;
    this.site = site;
  }

  private async getAbstract(
    path: string,
    params: URLSearchParams = new URLSearchParams(),
  ): Promise<any> {
    params.append("site_id", this.site);

    const endpoint = `${this.url}/${path}?${params}`;
    const response = await fetch(endpoint, {
      method: `GET`,
      headers: {
        "Authorization": `Bearer ${this.key}`,
        "Content-Type": `application/json`,
      },
    });

    return await response.json();
  }

  /**
   * This function returns the number of current visitors on your site. A current visitor is defined as a visitor who triggered a pageview on your site in the last 5 minutes.
   */

  public getRealtime(): Promise<number> {
    return this.getAbstract(`api/v1/stats/realtime/visitors`);
  }

  // TODO: Allow multiple metrics

  /**
   * This function aggregates metrics over a certain time period. If you are familiar with the Plausible dashboard, this function corresponds to the top row of stats that include Unique Visitors, Pageviews, Bounce rate and Visit duration. You can retrieve any number and combination of these metrics in one request.
   */

  public async getAggregate(
    period: Period,
    metrics: Metrics,
    compare?: boolean,
    filters?: string,
  ): Promise<Aggregated> {
    const params = new URLSearchParams();

    params.append(`period`, period);
    params.append(`metrics`, metrics);

    if (compare) params.append(`compare`, "previous_period");
    if (filters) params.append("filters", filters);

    const response = await this.getAbstract(`api/v1/stats/aggregate`, params);

    if (response.results.visitors) return response.results.visitors;
    if (response.results.pageviews) return response.results.pageviews;
    if (response.results.bounce_rate) return response.results.bounce_rate;
    if (response.results.visit_duration) return response.results.visit_duration;

    throw Error("bruh");
  }

  // TODO: Metrics seems to do nothing

  /**
   * This function provides timeseries data over a certain time period. If you are familiar with the Plausible dashboard, this function corresponds to the main visitor graph.
   */

  public async getTimeseries(
    period: Period,
    metrics?: Metrics,
    filters?: string,
    interval?: Interval,
  ): Promise<Array<Datapoint>> {
    const params = new URLSearchParams();

    params.append(`period`, period);

    if (metrics) params.append(`metrics`, metrics);
    if (filters) params.append(`filters`, filters);
    if (interval) params.append("interval", interval);

    const response = await this.getAbstract(`api/v1/stats/timeseries`, params);
    return response.results;
  }

  /**
   * This function allows you to breakdown your stats by some property. If you are familiar with SQL family databases, this function corresponds to running GROUP BY on a certain property in your stats.
   *
   * Check out the [properties](https://plausible.io/docs/stats-api#properties) section for a reference of all the properties you can use in this query.
   */

  public getBreakdown(
    period: Period,
    property: "event:name",
    metrics?: Metrics,
    filters?: string,
    limit?: number,
    page?: number,
  ): Promise<
    Array<{
      name: string;
      visitors: number;
    }>
  >;

  public getBreakdown(
    period: Period,
    property: "event:page",
    metrics?: Metrics,
    filters?: string,
    limit?: number,
    page?: number,
  ): Promise<
    Array<{
      page: string;
      visitors: number;
    }>
  >;

  public getBreakdown(
    period: Period,
    property: "visit:source",
    metrics?: Metrics,
    filters?: string,
    limit?: number,
    page?: number,
  ): Promise<
    Array<{
      source: string;
      visitors: number;
    }>
  >;

  public getBreakdown(
    period: Period,
    property: "visit:referrer",
    metrics?: Metrics,
    filters?: string,
    limit?: number,
    page?: number,
  ): Promise<
    Array<{
      referrer: string;
      visitors: number;
    }>
  >;

  public getBreakdown(
    period: Period,
    property: "visit:utm_medium",
    metrics?: Metrics,
    filters?: string,
    limit?: number,
    page?: number,
  ): Promise<
    Array<{
      utm_medium: string;
      visitors: number;
    }>
  >;

  public getBreakdown(
    period: Period,
    property: "visit:utm_source",
    metrics?: Metrics,
    filters?: string,
    limit?: number,
    page?: number,
  ): Promise<
    Array<{
      utm_source: string;
      visitors: number;
    }>
  >;

  public getBreakdown(
    period: Period,
    property: "visit:utm_campaign",
    metrics?: Metrics,
    filters?: string,
    limit?: number,
    page?: number,
  ): Promise<
    Array<{
      utm_campaign: string;
      visitors: number;
    }>
  >;

  public getBreakdown(
    period: Period,
    property: "visit:device",
    metrics?: Metrics,
    filters?: string,
    limit?: number,
    page?: number,
  ): Promise<
    Array<{
      device: string;
      visitors: number;
    }>
  >;

  public getBreakdown(
    period: Period,
    property: "visit:browser",
    metrics?: Metrics,
    filters?: string,
    limit?: number,
    page?: number,
  ): Promise<
    Array<{
      browser: string;
      visitors: number;
    }>
  >;

  public getBreakdown(
    period: Period,
    property: "visit:browser_version",
    metrics?: Metrics,
    filters?: string,
    limit?: number,
    page?: number,
  ): Promise<
    Array<{
      browser_version: string;
      visitors: number;
    }>
  >;

  public getBreakdown(
    period: Period,
    property: "visit:os",
    metrics?: Metrics,
    filters?: string,
    limit?: number,
    page?: number,
  ): Promise<
    Array<{
      os: string;
      visitors: number;
    }>
  >;

  public getBreakdown(
    period: Period,
    property: "visit:os_version",
    metrics?: Metrics,
    filters?: string,
    limit?: number,
    page?: number,
  ): Promise<
    Array<{
      os_version: string;
      visitors: number;
    }>
  >;

  public getBreakdown(
    period: Period,
    property: "visit:country",
    metrics?: Metrics,
    filters?: string,
    limit?: number,
    page?: number,
  ): Promise<
    Array<{
      country: string;
      visitors: number;
    }>
  >;

  public async getBreakdown(
    period: Period,
    property: Property,
    metrics?: Metrics,
    filters?: string,
    limit?: number,
    page?: number,
  ): Promise<unknown> {
    const params = new URLSearchParams();

    params.append(`period`, period);
    params.append(`property`, property);

    if (metrics) params.append(`metrics`, metrics);
    if (filters) params.append(`filters`, filters);

    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());

    const response = await this.getAbstract(`api/v1/stats/breakdown`, params);
    return response.results;
  }
}
