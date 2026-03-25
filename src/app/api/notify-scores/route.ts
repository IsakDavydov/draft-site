import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createServiceRoleClient } from '@/lib/supabase/admin';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'SAKFootball <noreply@sakfootball.com>';
const ADMIN_SECRET = process.env.ADMIN_SECRET;
const BATCH_DELAY_MS = 200; // avoid rate limits

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function scoreEmail(entry: {
  display_name: string;
  score: number;
  rank: number;
  correct_picks: number;
  near_picks: number;
  total_participants: number;
}): { subject: string; html: string } {
  const { display_name, score, rank, correct_picks, near_picks, total_participants } = entry;

  const subject = `Your 2026 NFL Draft Score: ${score} pts (Rank #${rank} of ${total_participants})`;

  const pctile = total_participants > 1
    ? Math.round(((total_participants - rank) / (total_participants - 1)) * 100)
    : 100;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 8px rgba(0,0,0,.08);">

        <!-- Header stripe -->
        <tr><td style="background:linear-gradient(135deg,#013369,#1a3d6e);padding:32px 40px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:rgba(255,255,255,0.5);">SAKFootball · 2026 NFL Draft</p>
          <h1 style="margin:0;font-size:28px;font-weight:900;color:#fff;line-height:1.2;">Your Draft Results</h1>
          <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.7);">Hi ${display_name} — here's how you did.</p>
        </td></tr>

        <!-- Score block -->
        <tr><td style="padding:32px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4ff;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:24px 28px;text-align:center;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#6b7280;">Your Score</p>
                <p style="margin:0;font-size:56px;font-weight:900;color:#D50A0A;line-height:1;">${score}</p>
                <p style="margin:4px 0 0;font-size:14px;color:#6b7280;">out of 480 points</p>
              </td>
              <td style="width:1px;background:#e5e7eb;"></td>
              <td style="padding:24px 28px;text-align:center;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#6b7280;">Your Rank</p>
                <p style="margin:0;font-size:56px;font-weight:900;color:#013369;line-height:1;">#${rank}</p>
                <p style="margin:4px 0 0;font-size:14px;color:#6b7280;">of ${total_participants} competitors</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Stats -->
        <tr><td style="padding:24px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:16px;background:#f9fafb;border-radius:10px;text-align:center;width:33%;">
                <p style="margin:0;font-size:28px;font-weight:900;color:#111827;">${correct_picks}</p>
                <p style="margin:4px 0 0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;">Exact Picks<br/><span style="font-size:9px;">(15 pts each)</span></p>
              </td>
              <td style="width:8px;"></td>
              <td style="padding:16px;background:#f9fafb;border-radius:10px;text-align:center;width:33%;">
                <p style="margin:0;font-size:28px;font-weight:900;color:#111827;">${near_picks}</p>
                <p style="margin:4px 0 0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;">Off by 1<br/><span style="font-size:9px;">(5 pts each)</span></p>
              </td>
              <td style="width:8px;"></td>
              <td style="padding:16px;background:#f9fafb;border-radius:10px;text-align:center;width:33%;">
                <p style="margin:0;font-size:28px;font-weight:900;color:#111827;">${pctile}%</p>
                <p style="margin:4px 0 0;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;">Percentile</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:32px 40px;">
          <p style="margin:0 0 20px;font-size:14px;color:#4b5563;line-height:1.6;">
            See the full leaderboard and how your picks compared to everyone else on SAKFootball.
          </p>
          <a href="https://sakfootball.com/leaderboard" style="display:inline-block;background:#D50A0A;color:#fff;text-decoration:none;border-radius:10px;padding:14px 28px;font-size:14px;font-weight:700;">
            View Full Leaderboard →
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 40px;border-top:1px solid #f3f4f6;background:#f9fafb;">
          <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
            SAKFootball · <a href="https://sakfootball.com" style="color:#9ca3af;">sakfootball.com</a><br/>
            You received this because you entered the 2026 Draft Prediction Challenge.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html };
}

export async function POST(req: NextRequest) {
  // Verify admin secret
  const body = await req.json();
  if (!ADMIN_SECRET || body.adminSecret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = createServiceRoleClient();
  if (!db) {
    return NextResponse.json({ error: 'Service role key not configured' }, { status: 500 });
  }

  // Fetch all score details
  const { data: scores, error: scoresError } = await db.rpc('get_all_score_details', { p_year: 2026 });
  if (scoresError || !scores || scores.length === 0) {
    return NextResponse.json({ error: scoresError?.message ?? 'No scores found' }, { status: 400 });
  }

  const totalParticipants = scores.length;

  // Fetch all user emails from auth.users
  const { data: { users }, error: usersError } = await db.auth.admin.listUsers({ perPage: 1000 });
  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 500 });
  }

  const emailByUserId = new Map<string, string>();
  for (const u of users) {
    if (u.email) emailByUserId.set(u.id, u.email);
  }

  let sent = 0;
  const errors: string[] = [];

  for (const entry of scores) {
    const email = emailByUserId.get(entry.user_id);
    if (!email) continue;

    const { subject, html } = scoreEmail({
      display_name: entry.display_name,
      score: Number(entry.score),
      rank: Number(entry.rank),
      correct_picks: Number(entry.correct_picks),
      near_picks: Number(entry.near_picks),
      total_participants: totalParticipants,
    });

    try {
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject,
        html,
      });
      if (error) {
        errors.push(`${email}: ${error.message}`);
      } else {
        sent++;
      }
    } catch (e) {
      errors.push(`${email}: ${e instanceof Error ? e.message : 'unknown'}`);
    }

    // Throttle to stay within Resend rate limits
    await sleep(BATCH_DELAY_MS);
  }

  return NextResponse.json({
    sent,
    total: scores.length,
    errors: errors.length > 0 ? errors : undefined,
  });
}
