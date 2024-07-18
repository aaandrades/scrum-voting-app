# Scrum voting app

Simple scrum voting app in real time based on [Server-Side Rendering](https://vitejs.dev/guide/ssr.html) and Express.

## Getting Started

```
npm install
```

## Development

- Configure port in .env file
- Runs the Development Server: `server-dev.js`.
- Dev site available on: `http://localhost:YOUR_PORT`

```
npm run dev
```

## Production - Build

Runs x2 scripts from `package.json`

1. "build:client"
2. "build:server"

```
npm run build
```

## Production - Serve

Runs the Production Server: `server-prod.js`. Production site available on: `http://localhost:YOUR_PROD_PORT`. _Disable JavaScript in your Browser and the page will still render._

```
npm run serve
```
