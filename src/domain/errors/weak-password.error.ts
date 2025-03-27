export class WeakPasswordError extends Error {
  constructor() {
    super(
      'The password must be at least 8 characters long; contain at least one uppercase letter, one lowercase letter, one symbol and one number',
    )
  }
}
