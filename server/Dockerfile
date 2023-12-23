# syntax=docker/dockerfile:1
FROM node:18
WORKDIR /app
COPY package* ./
RUN npm install
COPY . .
COPY docker.env .env
RUN npx prisma generate
CMD ["npm", "run", "dev"]
