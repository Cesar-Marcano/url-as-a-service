import { Router } from 'express'
import { db } from '@infra/database/database.instance'
import { jwtAuthMiddleware } from '@shared/middlewares/auth.middleware'
import { registerRoutes } from '@shared/utils/register-routes'
import { CreateUrlController } from '@infra/controllers/urls/createUrl/createUrl.controller'
import { CreateUrlUseCase } from '@app/use-cases/url/create-url/create-url.use-case'
import { UrlRepository } from '@infra/repositories/url.repository'
import { GetShortenUrlController } from '@infra/controllers/urls/getShortenUrl/getShortenUrl.controller'
import { RetrieveUrlUseCase } from '@app/use-cases/url/retrieve-url/retrieve-url.use-case'

// Route settings
export const router = Router()
export const name = 'url' // route prefix

// Respositories
const urlRepository = new UrlRepository(db)

// External services
// const cacheService = new CacheService(cache)

// Use cases
const createUrlUseCase = new CreateUrlUseCase(urlRepository)
const retrieveUrlUseCase = new RetrieveUrlUseCase(urlRepository)

// Controllers
const createUrlController = new CreateUrlController(createUrlUseCase)
const getShortenUrlController = new GetShortenUrlController(retrieveUrlUseCase)

// Route definitions
registerRoutes(router, [
  {
    path: '/create',
    controller: createUrlController,
    method: 'post',
    middlewares: [jwtAuthMiddleware],
  },
  {
    path: '/shorten/:url',
    controller: getShortenUrlController,
    method: 'get',
  },
])
