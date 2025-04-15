import {
  GeoResponse,
  IGeolocalizationService,
} from '@app/interfaces/geolocalization.service.interface'
import { GeolocalizationInput } from './geolocalization.input'
import { UseCase } from '@app/interfaces/use-case.interface'

export class GeolocalizationUseCase
  implements UseCase<GeolocalizationInput, GeoResponse>
{
  constructor(
    private readonly geolocalizationService: IGeolocalizationService,
  ) {}

  async execute(input: GeolocalizationInput): Promise<GeoResponse> {
    const data = await this.geolocalizationService.localize(input.ipAddress)

    return data
  }
}
