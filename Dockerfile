# Stage 1: Dependencies
FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables needed at build time
ARG WORDPRESS_URL
ARG WORDPRESS_HOSTNAME
ARG TRANSPOSH_API_URL
ARG TRANSPOSH_HEADLESS_SECRET
ARG TRANSPOSH_TRANSLATE_STATIC_ON_BUILD=false
ARG PUBLISHED_LOCALES=en
ENV WORDPRESS_URL=$WORDPRESS_URL
ENV WORDPRESS_HOSTNAME=$WORDPRESS_HOSTNAME
ENV TRANSPOSH_API_URL=$TRANSPOSH_API_URL
ENV TRANSPOSH_HEADLESS_SECRET=$TRANSPOSH_HEADLESS_SECRET
ENV TRANSPOSH_TRANSLATE_STATIC_ON_BUILD=$TRANSPOSH_TRANSLATE_STATIC_ON_BUILD
ENV PUBLISHED_LOCALES=$PUBLISHED_LOCALES
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# Stage 3: Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next-local/standalone ./
COPY --from=builder /app/.next-local/static ./.next-local/static

USER nextjs

EXPOSE 3000

# Railway sets PORT dynamically - default to 3000 if not set
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
