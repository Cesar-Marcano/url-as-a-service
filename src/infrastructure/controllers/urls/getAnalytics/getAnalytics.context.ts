import { GetAnalyticsInput } from '@app/use-cases/url-history/get-analytics/get-analytics.input'
import { GetAnalyticsOutput } from '@app/use-cases/url-history/get-analytics/get-analytics.strategy'
import { HydratedContext } from '@shared/interfaces/controller.interface'
import { JwtPayload } from 'jsonwebtoken'

export type GetAnalyticsContext = HydratedContext<
  JwtPayload, // User
  unknown, // Body (no body)
  undefined, // Params
  GetAnalyticsInput, // Query
  GetAnalyticsOutput // Response body (no response, just redirect)
>
