import { PaginationValueError } from "../../shared/errors/pagination-value.error"

export class PaginationOptions {
  constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {
    if (page < 1) throw new PaginationValueError('Page must be at least 1')
    if (limit < 1) throw new PaginationValueError('Limit must be at least 1')
  }
}
