import { EnvStrategy } from '@shared/interfaces/env-strategy.interface'

export class JsonEnvStrategy implements EnvStrategy {
  parse(value: string): any {
    try {
      return JSON.parse(value)
    } catch (error) {
      throw new Error(
        'Unexpected value type in environment variable; Expected a JSON but it cannot be parsed',
      )
    }
  }
}
