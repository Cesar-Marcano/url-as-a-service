import { Controller } from '@shared/interfaces/controller.interface'
import { AccessTokenUseCase } from '@app/use-cases/user/access-token/access-token.use-case'
import { AccessTokenContext } from './accessToken.context'

export class AccessTokenController implements Controller<AccessTokenContext> {
  constructor(private readonly accessTokenUseCase: AccessTokenUseCase) {}
  async handle({ req, res, next }: AccessTokenContext): Promise<void> {
    try {
      const { refreshToken } = req.body
      const accessToken = await this.accessTokenUseCase.execute({
        refreshToken,
      })

      res.status(200).json({
        accessToken,
      })
    } catch (error) {
      next(error)
    }
  }
}
