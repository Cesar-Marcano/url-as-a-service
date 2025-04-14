import { Router } from 'express'
import { db } from '@infra/database/database.instance'
import { jwtAuthMiddleware } from '@shared/middlewares/auth.middleware'
import { registerRoutes } from '@shared/utils/register-routes'
import { CreateUrlController } from '@infra/controllers/urls/createUrl/createUrl.controller'
import { CreateUrlUseCase } from '@app/use-cases/url/create-url/create-url.use-case'
import { UrlRepository } from '@infra/repositories/url.repository'
import { GetShortenUrlController } from '@infra/controllers/urls/getShortenUrl/getShortenUrl.controller'
import { RetrieveUrlUseCase } from '@app/use-cases/url/retrieve-url/retrieve-url.use-case'
import { UserRepository } from '@infra/repositories/user.repository'
import { DeleteUrlUseCase } from '@app/use-cases/url/delete-url/delete-url.use-case'
import { RetrieveUserUseCase } from '@app/use-cases/user/retrieve-user/retrieve-user.use-case'
import { RetrieveUserByIdStrategy } from '@app/use-cases/user/retrieve-user/strategies/by-id.strategy'
import { DeleteUrlController } from '@infra/controllers/urls/deleteUrl/deleteUrl.controller'
import { RegisterClickUseCase } from '@app/use-cases/url-history/register-click/register-click.use-case'
import { UrlClickRepository } from '@infra/repositories/url-click.repository'

// Route settings
export const router = Router()
export const name = 'url' // route prefix

// Respositories
const urlRepository = new UrlRepository(db)
const urlClickRepository = new UrlClickRepository(db)
const userRepository = new UserRepository(db)

// External services
// const cacheService = new CacheService(cache)

// Use cases
const createUrlUseCase = new CreateUrlUseCase(urlRepository)
const retrieveUrlUseCase = new RetrieveUrlUseCase(urlRepository)
const deleteUrlUseCase = new DeleteUrlUseCase(urlRepository)
const retrieveUserUseCase = new RetrieveUserUseCase([
  new RetrieveUserByIdStrategy(userRepository),
])
const registerClickUseCase = new RegisterClickUseCase(
  urlRepository,
  urlClickRepository,
)

// Controllers
const createUrlController = new CreateUrlController(createUrlUseCase)
const getShortenUrlController = new GetShortenUrlController(
  retrieveUrlUseCase,
  registerClickUseCase,
)
const deleteUrlController = new DeleteUrlController(
  deleteUrlUseCase,
  retrieveUserUseCase,
)

// Route definitions
registerRoutes(router, [
  {
    path: '/create',
    controller: createUrlController,
    method: 'post',
    middlewares: [jwtAuthMiddleware],
  },
  {
    path: '/delete/:urlId',
    controller: deleteUrlController,
    method: 'delete',
    middlewares: [jwtAuthMiddleware],
  },
  {
    path: '/shorten/:url',
    controller: getShortenUrlController,
    method: 'get',
  },
])
