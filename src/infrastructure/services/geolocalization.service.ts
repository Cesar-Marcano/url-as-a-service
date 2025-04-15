import {
  GeoResponse,
  IGeolocalizationService,
} from '@app/interfaces/geolocalization.service.interface'
import { Axios } from 'axios'

export class GeolocalizationService implements IGeolocalizationService {
  constructor(
    private readonly axios: Axios,
    private readonly getApiURI: (ipAddress: string, apiKey: string) => string,
    private readonly apiKey: string,
  ) {}

  async localize(ipAddress: string): Promise<GeoResponse> {
    const apiURI = this.getApiURI(ipAddress, this.apiKey)

    const response = await this.axios.get<GeoResponse>(apiURI)

    return response.data
  }
}
