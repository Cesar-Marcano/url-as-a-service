import { EnvContext } from '@shared/context/env.context'
import { MissingEnvError } from '@shared/errors/missing-env.error'

export function getEnv<T>(key: string, defaultValue?: T): T {
  const value = process.env[key]
  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new MissingEnvError(key)
    }

    // TODO: Emit a warning if the default value is used using a logger
    // logger.warn(`Environment variable ${key} is not set. Using default value: ${defaultValue}`)

    return defaultValue
  }

  try {
    const type =
      typeof defaultValue === 'undefined' ? 'string' : typeof defaultValue

    const envContext = new EnvContext(type)

    return envContext.parse(value) as T
  } catch (error) {
    if (error instanceof Error)
      throw new Error(
        `Error parsing environment variable '${key}': ${error.message}`,
      )
    throw new Error('Unknown error parsing environment variable')
  }
}
