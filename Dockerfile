FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run swagger
RUN pnpm tsc

EXPOSE 3001

CMD [ "pnpm", "run", "serve" ]
