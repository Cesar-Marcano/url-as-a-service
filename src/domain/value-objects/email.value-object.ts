import { InvalidFormatError } from "@domain/errors/invalid-format.error"

export class Email {
  private readonly email: string

  constructor(email: string) {
    if (!this.isValidEmail(email)) {
      throw new InvalidFormatError('email')
    }
    this.email = email
  }

  private isValidEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }

  public toString(): string {
    return this.email
  }

  public equals(other: Email): boolean {
    return this.email === other.toString()
  }
}
