export class CurrencyEntity {
  constructor(
    public readonly id: number,
    public readonly code: string,
    public readonly symbol: string,
  ) {}
}
