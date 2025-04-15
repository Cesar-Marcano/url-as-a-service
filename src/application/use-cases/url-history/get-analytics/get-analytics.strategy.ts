import {
  ClickCountPerTime,
  GeoAnalytics,
  TotalClickCountByUrls,
  UserAgentAnalytics,
} from '@domain/repositories/url-click.repository'
import { type GetAnalyticsInput } from './get-analytics.input'

export type GetAnalyticsOutput =
  | TotalClickCountByUrls
  | ClickCountPerTime
  | GeoAnalytics
  | UserAgentAnalytics

export interface GetAnalyticsStrategy {
  canHandle(input: GetAnalyticsInput): boolean

  execute(input: GetAnalyticsInput): Promise<GetAnalyticsOutput>
}
