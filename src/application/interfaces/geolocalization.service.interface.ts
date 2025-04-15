export interface GeoResponse {
  country: string | undefined
  city: string | undefined
}

export interface IGeolocalizationService {
  localize(ipAddress: string): Promise<GeoResponse>
}
