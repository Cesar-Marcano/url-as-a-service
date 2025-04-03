import { EnvStrategy } from '../interfaces/env-strategy.interface'
import { BooleanEnvStrategy } from '../strategies/boolean-env.strategy'
import { JsonEnvStrategy } from '../strategies/json-env.strategy'
import { NumberEnvStrategy } from '../strategies/number-env.strategy'
import { StringEnvStrategy } from '../strategies/string-env.strategy'

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
