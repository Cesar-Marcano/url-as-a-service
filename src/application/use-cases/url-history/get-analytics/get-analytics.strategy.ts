import {
  ClickCountPerTime,
  GeoAnalytics,
  TotalClickCountByUrls,
  UserAgentAnalytics,
} from '@domain/repositories/url-click.repository'
import { type GetAnalyticsInput } from './get-analytics.input'

export interface GetAnalyticsRetrieveUserStrategy {
  canHandle(input: GetAnalyticsInput): boolean

  execute(
    input: GetAnalyticsInput,
  ): Promise<
    | TotalClickCountByUrls
    | ClickCountPerTime
    | GeoAnalytics
    | UserAgentAnalytics
  >
}
