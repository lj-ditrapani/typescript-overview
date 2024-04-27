ARG nodeV=20.12.2

FROM node:${nodeV}-bookworm-slim as base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base as build
RUN npm install
COPY tsconfig.json tsconfig-test.json vitest.config.ts \
     .eslintrc.cjs .prettierrc.yaml .prettierignore ./
COPY src src
COPY test test
RUN npm run ci

FROM base as release
COPY --from=build /app/dist/ dist/
RUN npm install --omit=dev
ENTRYPOINT ["npm", "start"]
