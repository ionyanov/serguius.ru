# syntax=docker/dockerfile:1
FROM node:18
WORKDIR /app
COPY package* ./
RUN npm install
COPY . .
CMD ["npm", "run", "docker"]
EXPOSE 5173