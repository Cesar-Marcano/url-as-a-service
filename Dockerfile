FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app
COPY . .

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
  pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
  pnpm install --frozen-lockfile && pnpm run build

FROM node:20-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
COPY pnpm-lock.yaml ./

EXPOSE 3000

CMD ["pnpm", "start"]
