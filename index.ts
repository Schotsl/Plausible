import { Interval, Metrics, Period } from "./types.ts";

export class PlausibleAPI {
  public url = "https://plausible.hedium.nl";

  private key: string;
  private site: string;

  constructor(key: string, site: string) {
    this.key = key;
    this.site = site;
  }

  private async getAbstract<T>(
    path: string,
    params: URLSearchParams = new URLSearchParams(),
  ): Promise<T> {
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

  public getAggregate(
    period: Period,
    metrics: Metrics,
    compare?: boolean,
    filters?: string,
  ): Promise<unknown> {
    const params = new URLSearchParams();

    params.append(`period`, period);
    params.append(`metrics`, metrics);

    if (compare) params.append(`compare`, "previous_period");
    if (filters) params.append("filters", filters);

    return this.getAbstract(`api/v1/stats/aggregate`, params);
  }

  // TODO: Metrics seems to do nothing

  /**
   * This function provides timeseries data over a certain time period. If you are familiar with the Plausible dashboard, this function corresponds to the main visitor graph.
   */

  public getTimeseries(
    period: Period,
    metrics?: Metrics,
    filters?: string,
    interval?: Interval,
  ): Promise<unknown> {
    const params = new URLSearchParams();

    params.append(`period`, period);

    if (metrics) params.append(`metrics`, metrics);
    if (filters) params.append(`filters`, filters);
    if (interval) params.append("interval", interval);

    return this.getAbstract(`api/v1/stats/timeseries`, params);
  }

  /**
   * This function allows you to breakdown your stats by some property. If you are familiar with SQL family databases, this function corresponds to running GROUP BY on a certain property in your stats.
   *
   * Check out the [properties](https://plausible.io/docs/stats-api#properties) section for a reference of all the properties you can use in this query.
   */

  public getBreakdown(
    period: Period,
    property: string,
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

    return this.getAbstract(`api/v1/stats/breakdown`, params);
  }
}
