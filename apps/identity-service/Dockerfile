FROM node:20-alpine AS base
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/identity-service/package.json ./apps/identity-service/package.json
COPY packages ./packages
COPY apps/identity-service ./apps/identity-service

RUN corepack enable && pnpm install --frozen-lockfile

WORKDIR /app/apps/identity-service
RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=base /app/apps/identity-service/package.json ./apps/identity-service/package.json
COPY --from=base /app/apps/identity-service/dist ./apps/identity-service/dist
COPY --from=base /app/apps/identity-service/prisma ./apps/identity-service/prisma
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/apps/identity-service/node_modules ./apps/identity-service/node_modules

EXPOSE 3000

CMD ["node", "apps/identity-service/dist/main.js"]
