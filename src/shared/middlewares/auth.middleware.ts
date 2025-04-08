import passport from 'passport'

export const jwtAuthMiddleware = passport.authenticate('jwt', {
  session: false,
})

export const jwtRefreshMiddleware = passport.authenticate('jwt-refresh', {
  session: false,
})
