import { EnvStrategy } from '../interfaces/env-strategy.interface'

export class BooleanEnvStrategy implements EnvStrategy {
  parse(value: string): boolean {
    return value.toLowerCase() === 'true'
  }
}
