export interface TotalClickCountByUrlsInput {
  userId: number
}

export interface GetClickCountPerTimeInput {
  timeUnit: 'day' | 'week' | 'month'
  urlId: number
}

export interface GetGeoAnalyticsInput {
  urlId: number
}

export interface GetUserAgentAnalyticsInput {
  urlId: number
}

export type GetAnalyticsInput =
  | TotalClickCountByUrlsInput
  | GetClickCountPerTimeInput
  | GetGeoAnalyticsInput
  | GetUserAgentAnalyticsInput
