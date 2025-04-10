import { type RetrieveUserInput } from './retrieve-user.input'
import { type UserDTO } from '@app/dtos/user.dto'

export interface RetrieveUserStrategy {
  canHandle(input: RetrieveUserInput): boolean
  execute(input: RetrieveUserInput): Promise<UserDTO>
}
