export interface UrlDTO {
  id: number
  slug: string
  originalUrl: string
  createdAt: Date
  updatedAt: Date
  authorId: number
  expirationDate?: Date | null
}
