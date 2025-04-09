# URL Shortener SaaS

## Overview

**URL Shortener SaaS** is a Software-as-a-Service (SaaS) application that provides URL shortening functionality with additional features like user authentication, subscription management, and analytics. The platform is designed to handle high traffic and offers a scalable architecture for enterprise-grade URL management.

## Features

- **URL Shortening**: Generate short, unique URLs for long links.
- **User Authentication**: Secure login and signup using JWT-based authentication.
- **Subscription Plans**: Manage user subscriptions with tiered plans (e.g., free, premium).
- **Analytics**: Track URL clicks, user agents, and IP addresses.
- **Rate Limiting**: Prevent abuse with Redis-backed rate limiting.
- **Caching**: Improve performance with Redis caching for frequently accessed data.
- **Scalable Architecture**: Built with clean architecture principles for maintainability and scalability.

## Tech Stack

- **Backend**: Node.js, TypeScript, Express
- **Database**: PostgreSQL
- **Payments**: PayPal
- **Caching**: Redis
- **Authentication**: Passport.js, JWT
- **Testing**: Jest

## Key Modules

### 1. Domain Layer
- Core business logic and entities like `UserEntity`, `UrlEntity`, and `SubscriptionEntity`.
- Value objects for encapsulating domain-specific data (e.g., `Email`, `Password`).
- Interfaces for repositories and services.

### 2. Application Layer
- Implements use cases such as `CreateUserUseCase`, `LoginUserUseCase`, and `RetrieveUserUseCase`.
- Maps domain entities to Data Transfer Objects (DTOs).

### 3. Infrastructure Layer
- Handles external integrations and configurations.
- Includes controllers, database repositories, and services like `JwtService` and `CacheService`.

### 4. Shared Layer
- Contains reusable utilities, middlewares, and error handling mechanisms.

## Installation

### Prerequisites
- Node.js (v20 or higher)
- pnpm (v10 or higher)
- Docker and Docker Compose

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Cesar-Marcano/url-shortener-saas.git
   cd url-shortener-saas
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the required variables (e.g., `DATABASE_URL`, `REDIS_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`).

4. Start the application:
   - For development:
     ```bash
     pnpm start:dev
     ```
   - For production:
     ```bash
     docker-compose up --build
     ```

## Testing

Run unit tests using Jest:
```bash
pnpm test
```

## Deployment

The application is containerized using Docker. To deploy, use the following command:
```bash
docker-compose up --build
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Author

Developed by [@Cesar-Marcano](https://github.com/Cesar-Marcano).