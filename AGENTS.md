<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Imported Trinova site pages live in src/site and are wrapped by thin route files in src/routes; navigation goes through src/site/nav.ts so original page callbacks keep working.
- Form submissions (bookings, referrals, contact) are stored in the browser only, matching the original site; move to Lovable Cloud if shared data is needed.

- Render all Trinova logo placements through the shared TrinovaLogo component using public/trinova-logo.webp; site images live in public/ so they deploy with any host (e.g. Vercel).
- Booking emails go through src/lib/booking-email.functions.ts calling Resend directly with RESEND_API_KEY (optional RESEND_FROM, CLINIC_NOTIFY_EMAIL); keeps email working off-platform.
- Staff tracking uses unlisted /staff routes without public chrome, server-verified role PINs, encrypted HttpOnly sessions, and a token-protected Google Apps Script; enforce access again in every data function because hiding links is not authorization.
- The Google script provides durable login throttling and idempotent work writes; reject missing credentials and never fall back to browser-only work storage or unauthenticated sheet reads.
- Nitro targets Vercel for external deployments; Lovable's managed build overrides the target for its own hosting.
