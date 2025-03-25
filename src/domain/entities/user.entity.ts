export class UserEntity {
  constructor(
    public id: number,
    public email: string,
    public username: string,
    public password: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
