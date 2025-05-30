import ms from 'ms'
import { TokenType } from '@domain/enums/token-type.enum'
import { IJwtService } from '@app/interfaces/jwt.service.interface'
import { UseCase } from '@app/interfaces/use-case.interface'
import { RefreshTokenUseCaseInput } from './refresh-token.input'

export class RefreshTokenUseCase
  implements UseCase<RefreshTokenUseCaseInput, string>
{
  constructor(
    private readonly tokenService: IJwtService,
    private readonly duration: ms.StringValue | number,
  ) {}

  async execute(input: RefreshTokenUseCaseInput): Promise<string> {
    const { email, role, userId } = input
    const refreshToken = this.tokenService.sign(
      {
        sub: userId,
        email,
        role,
        type: TokenType.REFRESH,
      },
      this.duration,
    )

    return refreshToken
  }
}
