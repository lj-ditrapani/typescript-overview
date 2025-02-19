ARG nodeV=22.14.0

FROM node:${nodeV}-bookworm-slim as base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base as build
RUN npm install
COPY tsconfig.json tsconfig-test.json vitest.config.ts \
     .eslintrc.mjs .prettierrc.yaml .prettierignore ./
COPY src src
COPY test test
RUN npm run ci

FROM base as release
COPY --from=build /app/dist/ dist/
RUN npm install --omit=dev
ENTRYPOINT ["npm", "start"]
