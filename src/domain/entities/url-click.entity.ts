export class UrlClickEntity {
  constructor(
    public readonly id: number,
    public readonly createdAt: Date,
    public readonly fromIpAddress: string,
    public readonly fromUserAgent: string,
  ) {}
}
