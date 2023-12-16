FROM node:alpine As development
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
# COPY npm-lock.yml ./
# RUN npi i -g npm
RUN npm install
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY . .
# RUN install -g @nestjs/cli
RUN npm run build payments

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY package.json .
# COPY npm.lock.yml ./

# RUN npm i -g npm
RUN npm install --prod
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/apps/payments/main"]