import { EnvStrategy } from '@shared/interfaces/env-strategy.interface'

export class StringEnvStrategy implements EnvStrategy {
  parse(value: string): string {
    return value
  }
}
