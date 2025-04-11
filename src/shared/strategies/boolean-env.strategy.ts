import { EnvStrategy } from '@shared/interfaces/env-strategy.interface'

export class BooleanEnvStrategy implements EnvStrategy {
  parse(value: string): boolean {
    return value.toLowerCase() === 'true'
  }
}
