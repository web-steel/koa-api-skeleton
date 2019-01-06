FROM node:alpine AS builder

WORKDIR /opt/builder

COPY package-lock.json .
COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine AS run

WORKDIR /opt/app

COPY --from=builder /opt/builder/dist ./dist
COPY package-lock.json .
COPY package.json .

RUN npm install --production

EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start"]