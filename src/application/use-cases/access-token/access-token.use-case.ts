import ms from 'ms'
import { TokenType } from '../../../domain/enums/token-type.enum'
import { IJwtService } from '../../../domain/services/jwt.service'
import { UnauthorizedErrorException } from '../../../shared/errors/unauthorized.error'
import { UseCase } from '../../interfaces/use-case.interface'
import { AccessTokenUseCaseInput } from './access-token.input'

export class AccessTokenUseCase
  implements UseCase<AccessTokenUseCaseInput, string>
{
  constructor(
    private readonly tokenService: IJwtService,
    private readonly duration: ms.StringValue | number,
  ) {}

  async execute(input: AccessTokenUseCaseInput): Promise<string> {
    const { refreshToken } = input
    const decoded = this.tokenService.verify(refreshToken, TokenType.REFRESH)

    if (!decoded) {
      throw new UnauthorizedErrorException()
    }

    const { sub, email, role } = decoded

    const accessToken = this.tokenService.sign(
      {
        sub,
        email,
        role,
        type: TokenType.ACCESS,
      },
      this.duration,
    )

    return accessToken
  }
}
