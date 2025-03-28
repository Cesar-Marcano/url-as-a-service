import { InvalidFormatError } from '../../shared/errors/invalid-format.error'
import { Email } from './email.value-object'

describe('Email Value Object', () => {
  it('should create a valid email', () => {
    const validEmail1 = new Email('mytestemail@gmail.com')
    const validEmail2 = new Email('myemail@test.io.dev')
    const validEmail3 = new Email('user@subdomain.domain.com')

    expect(validEmail1).toBeDefined()
    expect(validEmail1.toString()).toBe('mytestemail@gmail.com')

    expect(validEmail2).toBeDefined()
    expect(validEmail2.toString()).toBe('myemail@test.io.dev')

    expect(validEmail3).toBeDefined()
    expect(validEmail3.toString()).toBe('user@subdomain.domain.com')
  })

  it('should throw an error for an invalid email', () => {
    expect(() => {
      new Email('invalid-email')
    }).toThrow(InvalidFormatError)

    expect(() => {
      new Email('invalid@email')
    }).toThrow(InvalidFormatError)

    expect(() => {
      new Email('')
    }).toThrow(InvalidFormatError)

    expect(() => {
      new Email('test@')
    }).toThrow(InvalidFormatError)

    expect(() => {
      new Email('test@domain..com')
    }).toThrow(InvalidFormatError)

    expect(() => {
      new Email('user@subdomain.domain.com')
    }).not.toThrow()

    expect(() => {
      new Email('test@valid-domain.com')
    }).not.toThrow()
  })
})
