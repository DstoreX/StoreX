# DINA COSMETIC — StoreX (Luxury Headless Commerce)

Luxury headless e-commerce platform for DINA COSMETIC.
Stack: Next.js (app router, Server Components), TailwindCSS, Supabase (Postgres + Auth + Storage), Stripe, Shippo, Resend. Deploy to Vercel.

Quick start (development)

1. Clone repository
2. Create .env.local with:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_KEY (server)
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET
   - RESEND_API_KEY
   - SHIPPO_TOKEN
3. Install
   npm install
4. Run dev
   npm run dev

Core directories:
- app/ (Next.js app router)
- lib/ (server helpers)
- components/ (shared UI)
- sql/schema.sql (database schema & policies)

See /sql/schema.sql for initial DB schema and RLS examples.