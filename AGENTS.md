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

- Render all Trinova logo placements through the shared TrinovaLogo component using the uploaded CDN asset; this preserves one consistent brand image across the site.
