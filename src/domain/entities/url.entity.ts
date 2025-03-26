import { UserEntity } from './user.entity'

export class UrlEntity {
  constructor(
    public readonly id: number,
    public readonly slug: string,
    public readonly originalUrl: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly author: UserEntity,
    public readonly expirationDate: Date | null,
  ) {}
}
