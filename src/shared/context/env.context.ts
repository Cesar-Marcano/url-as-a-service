import { EnvStrategy } from '@shared/interfaces/env-strategy.interface'
import { BooleanEnvStrategy } from '@shared/strategies/boolean-env.strategy'
import { JsonEnvStrategy } from '@shared/strategies/json-env.strategy'
import { NumberEnvStrategy } from '@shared/strategies/number-env.strategy'
import { StringEnvStrategy } from '@shared/strategies/string-env.strategy'

export class EnvContext {
  private strategy: EnvStrategy

  constructor(type: string | undefined) {
    switch (type) {
      case 'boolean':
        this.strategy = new BooleanEnvStrategy()
        break
      case 'number':
        this.strategy = new NumberEnvStrategy()
        break
      case 'json':
        this.strategy = new JsonEnvStrategy()
        break
      default:
        this.strategy = new StringEnvStrategy()
        break
    }
  }

  public parse(value: string): any {
    return this.strategy.parse(value)
  }
}
