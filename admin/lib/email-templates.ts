// Brand colours resolved from CSS custom properties
const PRIMARY = "#162D4E"; // hsl(213 56% 20%)
const ACCENT = "#F59E0B"; // hsl(38 92% 50%)
const BG = "#F4F7FA";
const TEXT = "#1A2B3C";
const MUTED = "#6B7A8D";
const WHITE = "#FFFFFF";

function baseLayout(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Netrix Systems</title>
</head>
<body style="margin:0;padding:0;background-color:${BG};font-family:'DM Sans',Arial,sans-serif;color:${TEXT};">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BG};padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:${WHITE};border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(22,45,78,0.10);">

          <tr>
            <td style="background-color:${PRIMARY};padding:28px 40px;text-align:center;">
              <span style="font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:22px;font-weight:800;color:${WHITE};letter-spacing:-0.5px;">
                Netrix <span style="color:${ACCENT};">Systems</span>
              </span>
              <p style="margin:6px 0 0 0;font-size:11px;color:rgba(255,255,255,0.55);letter-spacing:2px;text-transform:uppercase;font-family:'DM Sans',Arial,sans-serif;">ICT Solutions &bull; Nigeria</p>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 40px 32px 40px;">
              ${body}
            </td>
          </tr>

          <tr>
            <td style="background-color:${BG};border-top:1px solid #DDE3EC;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 4px 0;font-size:12px;color:${MUTED};">Netrix Systems Nigeria &mdash; Solar &bull; CCTV &bull; Cabling &bull; Power</p>
              <p style="margin:0;font-size:11px;color:#9AAABB;">This email was sent from the website contact form. Please do not reply directly to this message.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildOwnerEmail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): { subject: string; html: string } {
  const subject = `New Enquiry from ${data.name} — Netrix Website`;

  const body = `
    <h2 style="margin:0 0 6px 0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:20px;font-weight:700;color:${PRIMARY};">New Contact Enquiry</h2>
    <p style="margin:0 0 28px 0;font-size:14px;color:${MUTED};">You have received a new message via the website contact form.</p>

    <div style="width:40px;height:4px;background-color:${ACCENT};border-radius:2px;margin-bottom:28px;"></div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BG};border-radius:6px;border:1px solid #DDE3EC;margin-bottom:28px;">
      <tr>
        <td style="padding:20px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            ${infoRow("Full Name", data.name)}
            ${infoRow("Email Address", `<a href="mailto:${data.email}" style="color:${ACCENT};text-decoration:none;">${data.email}</a>`)}
            ${infoRow("Phone Number", data.phone, true)}
          </table>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${MUTED};font-family:'Plus Jakarta Sans',Arial,sans-serif;">Message</p>
    <div style="background-color:${BG};border-left:4px solid ${ACCENT};border-radius:0 6px 6px 0;padding:16px 20px;margin-bottom:28px;">
      <p style="margin:0;font-size:15px;line-height:1.7;color:${TEXT};">${data.message.replace(/\n/g, "<br/>")}</p>
    </div>

    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="background-color:${ACCENT};border-radius:6px;padding:0;">
          <a href="mailto:${data.email}" style="display:inline-block;padding:12px 28px;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:14px;font-weight:700;color:${WHITE};text-decoration:none;letter-spacing:0.2px;">Reply to ${data.name}</a>
        </td>
      </tr>
    </table>
  `;

  return { subject, html: baseLayout(body) };
}

export function buildSenderEmail(data: {
  name: string;
  businessEmail: string;
}): { subject: string; html: string } {
  const subject = "We've received your enquiry — Netrix Systems";

  const body = `
    <h2 style="margin:0 0 6px 0;font-family:'Plus Jakarta Sans',Arial,sans-serif;font-size:20px;font-weight:700;color:${PRIMARY};">Thanks for reaching out, ${data.name}!</h2>
    <p style="margin:0 0 28px 0;font-size:15px;line-height:1.7;color:${MUTED};">We've received your message and one of our team members will get back to you shortly.</p>

    <div style="width:40px;height:4px;background-color:${ACCENT};border-radius:2px;margin-bottom:28px;"></div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
      ${promiseRow("1", "Reply time", "We typically respond within one business day.")}
      ${promiseRow("2", "Site review", "Our team will review your request and recommend next steps.")}
      ${promiseRow("3", "Nigerian coverage", "We handle projects across Nigeria, including Lagos and Abuja.")}
    </table>

    <hr style="border:none;border-top:1px solid #DDE3EC;margin:0 0 28px 0;" />

    <p style="margin:0 0 6px 0;font-size:13px;color:${MUTED};">In the meantime, you can reach us directly:</p>
    <p style="margin:0;font-size:14px;color:${TEXT};">
      <a href="mailto:${data.businessEmail}" style="color:${ACCENT};font-weight:600;text-decoration:none;">${data.businessEmail}</a>
    </p>
  `;

  return { subject, html: baseLayout(body) };
}

function infoRow(label: string, value: string, last = false): string {
  return `
    <tr>
      <td style="padding:${last ? "10px 0 0 0" : "0 0 10px 0"};">
        <p style="margin:0 0 2px 0;font-size:11px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:${MUTED};font-family:'Plus Jakarta Sans',Arial,sans-serif;">${label}</p>
        <p style="margin:0;font-size:15px;color:${TEXT};">${value}</p>
      </td>
    </tr>
  `;
}

function promiseRow(icon: string, title: string, desc: string): string {
  return `
    <tr>
      <td style="padding:0 0 16px 0;">
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="width:40px;vertical-align:top;padding-top:2px;font-size:20px;">${icon}</td>
            <td>
              <p style="margin:0 0 2px 0;font-size:14px;font-weight:700;color:${TEXT};font-family:'Plus Jakarta Sans',Arial,sans-serif;">${title}</p>
              <p style="margin:0;font-size:13px;color:${MUTED};">${desc}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}
