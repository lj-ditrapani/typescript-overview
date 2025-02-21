ARG nodeV=22.14.0

FROM node:${nodeV}-bookworm-slim AS base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base AS build
RUN npm install
COPY tsconfig.json tsconfig-test.json vitest.config.ts \
     eslint.config.mjs .prettierrc.yaml .prettierignore ./
COPY src src
COPY test test
RUN npm run ci

FROM base AS release
COPY --from=build /app/dist/ dist/
RUN npm install --omit=dev
ENTRYPOINT ["npm", "start"]
