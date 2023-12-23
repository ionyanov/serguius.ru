<!-- @format -->

# serguius.ru

## Backend

-   Nest
-   Prisma
-   Multer
-   Sharp
-   MySQL

### For run:

```
cd server
npm i
npm run dev
```

### Docker

```
cd server
docker build -t serguius-server .
docker run -dp 127.0.0.1:5000:5000 serguius-server
```

## Admin Panel

-   Vite
-   React
-   TypeScript
-   RTK Query
-   Material UI

### For run:

```
cd client
npm i
npm run dev
```

### Docker

```
cd client
docker build -t serguius-client .
docker run -dp 127.0.0.1:5173:5173 serguius-client
```

## Frontend

-   React
-   TypeScript
-   Next.JS (SSG)

### For run:

```
cd frontend
npm i
npm run dev
```

### Docker

```
cd frontend
docker build -t serguius-front .
docker run -dp 127.0.0.1:3000:3000 serguius-front
```

## Doker

```
docker-compose up
```

Will created DB with sample data.

-   Admin Pannel: http://localhost:5173/
    -   Login: test@test.com
    -   Password: test123
-   Front: http://localhost:3000
