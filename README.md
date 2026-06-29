# thegracenetworkai-project (KOLA AI — Production Funnel Platform)

Complete high-ticket AI education & implementation platform for Emily Grace / KOLA AI (Kelowna, BC).

**Business Rules Enforced:**
- Workshop ($997–$2,997) is the **only** entry qualifier.
- Accelerator ($10,000) is gated behind Workshop attendance.
- No standalone low-ticket 1:1. IP lives in reusable frameworks.
- High-leverage: 10 attendees = $100k+ revenue day.

## Tech Stack (Exact)
- Next.js 14+ (App Router) + TypeScript + Tailwind + shadcn/ui
- Convex (schema, realtime, queries/mutations/actions, storage, auth hooks)
- Stripe Checkout Sessions + webhooks (signature verified)
- GoHighLevel (GHL): contacts, tags, memberships, calendars, workflows, webhooks (inbound + outbound)
- Railway hosting

## Project Structure
```
thegracenetworkai-project/
├── app/                    # Next.js pages + routes
│   ├── page.tsx            # Home
│   ├── workshop/           # Multi-step application
│   ├── accelerator/        # Gated landing + eligibility
│   ├── alumni/             # Gated portal
│   ├── admin/              # Protected dashboard
│   ├── thank-you/          # Realtime confirmation
│   └── ConvexClientProvider.tsx
├── convex/                 # Backend
│   ├── schema.ts
│   ├── http.ts             # Webhooks (/webhooks/stripe, /webhooks/ghl)
│   ├── payments.ts
│   ├── applications.ts     # Qualification scoring + gating
│   ├── users.ts
│   ├── workshops.ts
│   ├── ghl.ts              # GHL sync + membership
│   ├── admin.ts
│   ├── assets.ts
│   └── progress.ts
├── components/
├── lib/
├── scripts/seed.ts
└── README.md
```

## Core Flows Implemented
1. Visitor applies to Workshop → scored → thank you (realtime)
2. Payment via Stripe → webhook updates user.workshopAttended + GHL tag
3. Workshop attendee sees Accelerator unlocked
4. Accelerator apply/pay → full access + alumni portal (GHL membership)
5. Admin: realtime applications, override scores, grant access, revenue stats

## Environment Variables

Copy `.env.example` → `.env.local`

```env
NEXT_PUBLIC_CONVEX_URL=...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
GHL_API_KEY=...
GHL_LOCATION_ID=...
GHL_WEBHOOK_SECRET=...
ADMIN_DASHBOARD_KEY=change-this-please
NEXT_PUBLIC_SITE_URL=https://www.thegracenetwork.ai
```

## Local Development

1. Install + start Convex
```bash
cd thegracenetworkai-project
npm install
npm run convex:dev          # follow prompts to create project
```

2. Copy the `NEXT_PUBLIC_CONVEX_URL` output into `.env.local`

3. Run Next.js
```bash
npm run dev
```

4. Seed data
```bash
npm run seed
```

5. Open http://localhost:3000

### Stripe Webhook (local)
Use Stripe CLI:
```bash
stripe login
stripe listen --forward-to http://localhost:3001/webhooks/stripe
# Copy the whsec_... into STRIPE_WEBHOOK_SECRET
```

## GHL Integration Details

**Outbound (Convex → GHL):**
- `ghl.ts`: create/update contact, add tags (`kola-workshop-attendee`, `kola-accelerator`, `kola-alumni-portal`)
- After successful payment: trigger membership grant (tag-based or Membership API)

**Inbound (GHL → Convex):**
- GHL Workflow (Payment Received) → Webhook → `POST /webhooks/ghl`
- Example GHL workflow triggers:
  - "Workshop Payment Success" → Tag contact + Webhook to Convex
  - "Accelerator Application" → Add to private calendar + tag

**Memberships:**
- Use GHL Memberships product for alumni portal access (tag `kola-alumni-portal` + membership group)

**Calendar:**
- Private Accelerator 1:1 uses GHL Calendars. Links fetched per-user with contactId.

**Recommended GHL Setup:**
1. Create two pipelines: "Workshop Funnel" + "Accelerator"
2. Workflow 1: Payment Received (Workshop) → Tag + Email + Webhook Convex + Calendar Invite
3. Workflow 2: Accelerator paid → Membership grant + Private calendar access email
4. Form submissions from site can feed into GHL via native forms or webhook

## Deployment

### Convex
```bash
npx convex deploy
```

### Railway (recommended by user)
1. Install Railway CLI (optional): `npm i -g @railway/cli`
2. `railway login`
3. In your project folder: `railway link` (or connect via GitHub in Railway dashboard)
4. Set environment variables in Railway Dashboard → Project → Service → Variables:
   - `NEXT_PUBLIC_SITE_URL=https://www.thegracenetwork.ai`
   - `NEXT_PUBLIC_CONVEX_URL=...` (from Convex)
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `GHL_API_KEY`, etc.
   - `ADMIN_DASHBOARD_KEY`
5. Deploy: `railway deploy` (or push to GitHub if using auto-deploy)

Railway auto-detects Next.js. Build command is usually `next build`, start is `next start`.

### Connect Custom Domain www.thegracenetwork.ai
1. Go to Railway Dashboard → your project → the service → **Settings → Domains**
2. Click **Add Domain** and enter `www.thegracenetwork.ai`
3. (Optional) Also add the apex `thegracenetwork.ai`
4. Railway will display the exact DNS record(s) you need to add (typically a CNAME record pointing to a Railway-provided target).
5. Log in to your domain registrar (where you manage DNS for thegracenetwork.ai) and add the CNAME as shown.
6. Wait for DNS propagation (check with `dig www.thegracenetwork.ai` or dnschecker.org).
7. Railway automatically issues and renews SSL certificates (HTTPS).

Once live:
- Frontend (Next.js pages, forms, thank-you, etc.) will be served at `https://www.thegracenetwork.ai`
- All success URLs in checkout will resolve correctly.

### Production Webhook URLs (Important)
Stripe and GHL webhooks must point to your **Convex** production deployment, **not** Railway:
- After `npx convex deploy`, copy the HTTP / Site URL from Convex.
- Stripe: Add webhook endpoint `https://<convex-id>.convex.cloud/webhooks/stripe`
- GHL: Point workflows to `https://<convex-id>.convex.cloud/webhooks/ghl`

### Recommended Redirects (Apex → www)
You can set this up in your DNS provider (preferred for Railway) or add Next.js middleware for client-side redirects. Example DNS: point `thegracenetwork.ai` to same target or use a redirect service.

### Local Development
Still uses localhost. Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` in `.env.local` for local testing.

## Edge Cases Handled
- Rate limiting on applications (3/hr/email)
- Workshop capacity enforcement (spotsTaken)
- Accelerator gate enforced in `submitApplication` + `createCheckoutSession`
- Payment failure → status = failed (no access granted)
- Admin overrides + audit logs
- Idempotent webhooks
- Realtime updates via Convex `useQuery`

## Testing Checklist
- [ ] Workshop multi-step form submits + scores correctly
- [ ] Stripe checkout creates pending payment
- [ ] Webhook marks succeeded + updates workshopAttended
- [ ] Accelerator hidden until workshop attended
- [ ] Admin dashboard loads with key
- [ ] Alumni portal gates correctly
- [ ] Seed data appears
- [ ] Thank-you page shows live status

## Production Notes
- Add proper authentication for alumni (GHL Membership JWT or magic link via email)
- Add Google Analytics + UTM capture in forms (already stubbed)
- Store files in Convex Storage (`ctx.storage`) for assets
- Add refund handling in webhook (update status, revoke tags)
- Add email/SMS via GHL after payment (already in workflows)

## Support
All IP and frameworks are attendee-only. No exceptions.

Built for Emily Grace / KOLA AI — production-ready, scalable, realtime-first. (Project: thegracenetworkai-project)
