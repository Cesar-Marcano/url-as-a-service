import { InvalidEnvError } from '../errors/invalid-env.error'
import { EnvStrategy } from '../interfaces/env-strategy.interface'

export class NumberEnvStrategy implements EnvStrategy {
  parse(value: string): number {
    const parsedValue = Number(value)
    if (isNaN(parsedValue)) {
      throw new InvalidEnvError(
        'Unexpected value type in environment variable; Expected a number but received: NaN',
      )
    }
    return parsedValue
  }
}
