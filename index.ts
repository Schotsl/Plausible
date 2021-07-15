import { Period, Metrics, Interval } from "./types.ts";

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

  public getRealtime(): Promise<number> {
    return this.getAbstract(`api/v1/stats/realtime/visitors`);
  }

  // TODO: Allow multiple metrics

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
