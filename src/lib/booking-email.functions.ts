import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  referenceNumber: z.string().max(50),
  category: z.string().max(200),
  concerns: z.array(z.string().max(200)).max(30),
  concernDetails: z.string().max(5000),
  preferredDays: z.array(z.string().max(50)).max(10),
  preferredTimeWindows: z.array(z.string().max(80)).max(10),
  deliveryPreference: z.string().max(30).optional(),
  patientName: z.string().min(1).max(200),
  patientPhone: z.string().min(1).max(50),
  patientEmail: z.string().email().max(255),
  priorCareNotes: z.string().max(5000),
});

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const row = (k: string, v: string) =>
  `<tr><td style="padding:6px 12px 6px 0;color:#555;vertical-align:top"><b>${k}</b></td><td style="padding:6px 0">${esc(v || "—")}</td></tr>`;

export const sendBookingEmails = createServerFn({ method: "POST" })
  .inputValidator((d) => schema.parse(d))
  .handler(async ({ data }) => {
    const key = process.env['RESEND_API_KEY'];
    if (!key) return { ok: false, error: "Email not configured" };
    const from = process.env['RESEND_FROM'] || "Trinova Wellness Centre <onboarding@resend.dev>";
    const clinic = process.env['CLINIC_NOTIFY_EMAIL'] || "trinovawellnesscentre@gmail.com";

    const details = `<table style="font-family:Arial,sans-serif;font-size:14px">
${row("Reference", data.referenceNumber)}${row("Care category", data.category)}
${row("Concerns", data.concerns.join(", "))}${row("Preferred days", data.preferredDays.join(", "))}
${row("Preferred times", data.preferredTimeWindows.join(", "))}${row("Visit type", data.deliveryPreference ?? "")}
</table>`;

    const clinicHtml = `<div style="font-family:Arial,sans-serif"><h2 style="color:#0033A0">New appointment request</h2>
<table style="font-size:14px">${row("Name", data.patientName)}${row("Phone", data.patientPhone)}${row("Email", data.patientEmail)}</table>
${details}<h3>Details</h3><p>${esc(data.concernDetails || "—")}</p><h3>Prior care</h3><p>${esc(data.priorCareNotes || "—")}</p></div>`;

    const patientHtml = `<div style="font-family:Arial,sans-serif;color:#222"><h2 style="color:#0033A0">We received your request</h2>
<p>Hi ${esc(data.patientName)},</p><p>Thank you for contacting Trinova Wellness Centre. Our team will review your request and call or email you within one business day to confirm your appointment.</p>
${details}<p>If you have questions, simply reply to this email.</p><p>Trinova Wellness Centre<br/>Brampton, Ontario</p></div>`;

    const send = (body: Record<string, unknown>) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, ...body }),
      }).then(async (r) => {
        if (!r.ok) {
          const t = await r.text();
          console.error(`Resend failed [${r.status}]: ${t}`);
          return `[${r.status}] ${t}`;
        }
        return null;
      });

    const errors = (
      await Promise.all([
        send({ to: [clinic], reply_to: data.patientEmail, subject: `New booking ${data.referenceNumber} – ${data.patientName}`, html: clinicHtml }),
        send({ to: [data.patientEmail], reply_to: clinic, subject: `We received your appointment request (${data.referenceNumber})`, html: patientHtml }),
      ])
    ).filter(Boolean);
    return { ok: errors.length === 0, error: errors.join("; ") || undefined };
  });
