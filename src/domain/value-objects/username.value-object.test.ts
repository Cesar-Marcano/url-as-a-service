import { InvalidFormatError } from '../../shared/errors/invalid-format.error'
import { Username } from './username.value-object'

describe('Username Value Object', () => {
  it('Should create a valid username', () => {
    const username = new Username('myusername123')

    expect(username).toBeDefined()
    expect(username.equals(new Username('myusername123'))).toBeTruthy()
  })

  it('Should not create a username with less than 6 characters', () => {
    expect(() => {
      new Username('abcde') // less than 6 characters
    }).toThrow(InvalidFormatError)
  })

  it('Should not create a username with more than 20 characters', () => {
    expect(() => {
      new Username('thisisaverylongusername12345') // more than 20 characters
    }).toThrow(InvalidFormatError)
  })

  it('Should not create a username with invalid characters', () => {
    expect(() => {
      new Username('invalid$username!') // contains invalid characters
    }).toThrow(InvalidFormatError)

    expect(() => {
      new Username('valid_username-123') // valid username
    }).not.toThrow()
  })
})
