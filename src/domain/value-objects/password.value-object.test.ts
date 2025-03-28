import { WeakPasswordError } from '../../shared/errors/weak-password.error'
import { Password } from './password.value-object'

describe('Password Value Object', () => {
  it('Should create a valid password', async () => {
    const passwordString = 'StrongP@ssw0rd!'
    const password = await Password.create(passwordString)

    expect(password).toBeDefined()

    const isMatch = await password.compare(passwordString)
    expect(isMatch).toBe(true)
  })

  it('Should not create a password with weak strength', async () => {
    const weakPasswordString = 'weakpassword'

    await expect(Password.create(weakPasswordString)).rejects.toThrow(
      WeakPasswordError,
    )
  })

  it('Should not match a different password', async () => {
    const passwordString = 'StrongP@ssw0rd!'
    const password = await Password.create(passwordString)

    const isMatch = await password.compare('DifferentP@ssw0rd!')
    expect(isMatch).toBe(false)
  })
})
