# Convex Backend for thegracenetworkai-project (KOLA AI)

All backend logic lives here:
- schema.ts: exact tables + indexes
- http.ts: /webhooks/stripe + /webhooks/ghl
- payments.ts, applications.ts, users.ts, workshops.ts, ghl.ts, admin.ts, assets.ts, progress.ts

## Local development
1. `npx convex dev`
2. Copy the generated CONVEX_URL into .env.local

## Production
Deploy via Convex dashboard or CLI:
`npx convex deploy`
