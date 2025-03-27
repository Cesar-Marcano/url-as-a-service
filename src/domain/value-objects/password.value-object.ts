import { WeakPasswordError } from '@domain/errors/weak-password.error'
import bcrypt from 'bcryptjs'

export class Password {
  constructor(private readonly hash: string) {}

  public async compare(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.hash)
  }

  public static async create(password: string): Promise<Password> {
    if (!this.validatePasswordStrength(password)) {
      throw new WeakPasswordError()
    }

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    return new Password(hash)
  }

  public static validatePasswordStrength(password: string): boolean {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
    return regex.test(password)
  }
}
