import { CurrencyEntity } from '@domain/entities/currency.entity'

export interface ICurrencyRepository {
  getCurrencyById(id: number): Promise<CurrencyEntity | null>

  getCurrencyByCode(code: string): Promise<CurrencyEntity | null>

  createCurrency(currency: CurrencyEntity): Promise<CurrencyEntity>

  updateCurrency(
    id: number,
    currency: Partial<CurrencyEntity>,
  ): Promise<CurrencyEntity | null>

  deleteCurrency(id: number): Promise<boolean>
}
