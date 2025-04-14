import { Controller } from '@shared/interfaces/controller.interface'
import { RetrieveUserUseCase } from '@app/use-cases/user/retrieve-user/retrieve-user.use-case'
import { ProfileContext } from './profile.context'

export class ProfileController implements Controller<ProfileContext> {
  constructor(
    private readonly retrieveUserUseCase: RetrieveUserUseCase,
  ) {}

  async handle({ req, res, next }: ProfileContext): Promise<void> {
    try {
      const sessionUser = req.user

      const dbUser = await this.retrieveUserUseCase.execute({
        id: sessionUser.sub,
      })

      res.status(200).json(dbUser)
    } catch (error) {
      next(error)
    }
  }
}
