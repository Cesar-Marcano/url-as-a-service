export class UrlClickEntity {
  constructor(
    public readonly id: number,
    public readonly clickTime: Date,
    public readonly fromIpAddress: string,
    public readonly fromUserAgent: string,
  ) {}
}
