# Orthopedic Surgeon Platform

## Development

```bash
pnpm install
turbo run dev --filter=web     # http://localhost:4200
turbo run dev --filter=admin   # http://localhost:4201
turbo run dev --filter=api     # http://localhost:8080
```

## Build

```bash
turbo run build --filter=web
turbo run build --filter=admin
turbo run build --filter=api
```

## Test

```bash
turbo run test --filter=web
turbo run test --filter=admin
```

## Docker

```bash
docker compose up -d
# web   → http://localhost:4200
# admin → http://localhost:4201
# api   → http://localhost:8080
```
