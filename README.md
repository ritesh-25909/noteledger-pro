# Atlas — Private Notes Sales & Student CRM

A real React/TypeScript + Supabase application, without seeded demo records. Revenue and copy counts are calculated from purchases.

## Requirements
Node.js 20+, npm, and your own Supabase project.

## Setup
1. Create a Supabase project. In SQL Editor run `supabase/migrations/001_initial.sql` once. **Review SQL before executing.**
2. In Supabase Dashboard > Authentication > Users, create your own user manually. Disable public signups in Auth settings.
3. Copy that user's UUID and execute `insert into public.authorized_users(user_id) values ('YOUR_UUID');` in SQL Editor. Never run this insert with an untrusted UUID.
4. Copy `.env.example` to `.env`. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (publishable/anon only). **Never put a service-role key in the frontend.**
5. Run `npm install`, then `npm run dev`. For a production build run `npm run build`.
6. Configure hosting to serve `index.html` for all SPA routes. Use HTTPS in production.

## Features
- Private email/password login, persistent session, protected routes, no signup UI
- Allowlisted user database authorization via security-definer function and RLS on all business tables
- Students: add/edit/delete, unique normalized 10-digit phone, search, pagination, details and purchase history
- Sales: add/edit/delete, student quick-add, linked or manual chapter, payment methods, search, subject/payment/date filters, CSV export
- Notes: PDF upload (25 MB), private signed preview/download, replace, archive, delete, grid/table, sorting, derived sales
- Subjects: CRUD and derived performance, foreign keys restrict deletion while referenced
- Overview and analytics: real records, revenue/sales trends, top chapters, subject revenue, buyer metrics, date filters and CSV reports

## Security and data behavior
The SQL migration creates a private bucket and per-table RLS. The `authorized_users` table is maintained only from the Supabase SQL editor or trusted admin environment. All authorized accounts share the same workspace. Storage signed URLs expire after two minutes. Database deletion is restricted by foreign keys when records are referenced by purchases. PDFs are deleted after metadata deletion; if storage cleanup fails, the object may need manual cleanup.

## Important limitations
- This code package has not been connected to your Supabase project, and live end-to-end functionality has not been verified.
- CSV is implemented; native `.xlsx` export is not included.
- The notes library uses document-cover icons rather than generated PDF page thumbnails.
- Large datasets currently load for client-side filtering and aggregation. For high volume, add server-side pagination and SQL aggregate endpoints.
- File upload is restricted by browser validation and Supabase bucket MIME/size policies; inspect untrusted PDFs with malware scanning if accepting files from others.
- To enforce multi-user separation instead of a shared private workspace, add `owner_id` columns and owner-specific policies before onboarding additional users.
