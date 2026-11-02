# Private work tracker setup

The website has no public staff links. Open `/staff` directly, or bookmark it.
Employee: `/staff/log`. Owner: `/staff/reports`.
Every private read/write is authorized on the server; the employee cannot read owner reports.
PIN sessions expire after eight hours. Five login requests per client are allowed per 15 minutes by the protected Google script. Short PINs are weaker than passwords; change any PIN shared in chat before going live.

## Protect Google Sheets first

The previously deployed script allowed anonymous reads. Do not put private work in it until replacing it.

1. Open your sheet → Extensions → Apps Script.
2. Replace the old code with `scripts/work-tracker.gs` from this project. No PINs belong in that script.
3. Project Settings → Script properties → add `WORK_TRACKER_API_TOKEN`. Generate this shared key using the secure secret form, copy it to the script property, and also to Vercel.
4. If the script is not bound to your sheet, add `SPREADSHEET_ID` (the ID in the Google Sheet URL).
5. Deploy → Manage deployments → Edit → New version → Deploy. Execute as yourself, access Anyone. The script rejects every unauthorized request despite being reachable publicly.
6. Keep the spreadsheet itself private. Do not publish it or enable public link sharing.
7. If Google gives a different deployment URL, replace `WORK_TRACKER_SCRIPT_URL` in the project secrets and Vercel. Remove/disable obsolete deployments that still allow public reading.

The script creates a `Work Entries` tab with ID, Timestamp, Date, Pillar, Category, Start, End, Minutes, Description. It excludes earlier demo rows in the original tab. Writes are deduplicated by entry ID when a request is retried. Time calculations use same-day local start/end times; split overnight work into separate dated entries. Time below one minute is not saved.

## Vercel deployment

This project is TanStack Start with server functions, not a static-only Vite website. The configuration uses Nitro's Vercel preset for external builds; Lovable overrides it for its own preview/publish.

In Vercel → Project → Settings → Environment Variables add these for Production and Preview:

- `EMPLOYEE_PIN`: employee's private PIN (no defaults in code).
- `OWNER_PIN`: owner's private PIN (no defaults in code).
- `STAFF_SESSION_SECRET`: a separate strong random value of at least 32 characters, preferably 64. Generate it in your password manager; this can differ from the Lovable secret because sessions are host-specific.
- `WORK_TRACKER_SCRIPT_URL`: the current Google Apps Script `/exec` URL.
- `WORK_TRACKER_API_TOKEN`: exactly the same protected token you put in Google Script properties.

Use the connected repository, framework Other if Vercel does not detect TanStack Start, and the existing `bun run build` command. Use Nitro's generated Vercel output, not a static `dist` directory or an SPA fallback. Redeploy after adding environment variables.

There is no Vercel project connection or deployment credential in this workspace. Lovable manages repository commits; the assistant cannot push git or deploy to your Vercel account here. If your Vercel project tracks the connected repository/branch, its automatic deployment can pick up changes after repository synchronization. Otherwise import/connect the repository in Vercel and deploy there.

## Before trusting the tracker

- Without a PIN, opening either private page must return to `/staff`.
- An employee must be unable to open `/staff/reports` or read report data.
- Log a real authorized test task and confirm it appears in `Work Entries`, then on the owner's report from a second browser.
- Verify time totals, date/pillar/category filters, CSV export, and sign-out.
- Anonymous GET requests to the script must only return Unauthorized, never rows.

Emails have not been changed or enabled by this task.