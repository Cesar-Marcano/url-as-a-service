export interface TotalClickCountByUrlsInput {
  totalClickCountInput: {
    userId: number
  }
}

export interface GetClickCountPerTimeInput {
  clickCountPerTimeInput: {
    timeUnit: 'day' | 'week' | 'month'
    urlId: number
  }
}

export interface GetGeoAnalyticsInput {
  geoAnalyticsInput: {
    urlId: number
  }
}

export interface GetUserAgentAnalyticsInput {
  userAgentAnalyticsInput: {
    urlId: number
  }
}

export type GetAnalyticsInput =
  | TotalClickCountByUrlsInput
  | GetClickCountPerTimeInput
  | GetGeoAnalyticsInput
  | GetUserAgentAnalyticsInput
