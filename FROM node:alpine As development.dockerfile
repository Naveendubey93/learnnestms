FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
# COPY pnpm-lock.yaml ./
RUN npm install
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json



COPY apps/auth apps/auth
COPY libs libs

RUN npm install -r 

RUN npm run build auth

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g npm

RUN npm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]