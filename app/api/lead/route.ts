import { NextResponse } from 'next/server'
import { leadSchema } from '@/lib/validation'
import { rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const rl = rateLimit(`lead:${ip}`, 10, 60 * 60_000)
  if (!rl.allowed) return NextResponse.json({ error: 'rate_limited' }, { status: 429 })

  let body: unknown
  try { body = await req.json() } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }) }

  const utm = (body as { utm?: Record<string, string> })?.utm ?? {}
  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'invalid' }, { status: 400 })

  const webhookUrl = 'https://script.google.com/macros/s/AKfycbxRVDwq81kh_RwfdG7PVaqZnEfPotA4E2ZLP_zVv3xCoVYKLYq92auMVBFQ6kSgbIwO5w/exec'

  const payload = {
    timestamp: new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' }),
    name: parsed.data.name,
    phone: parsed.data.phone.replace(/^\+/, ''),
    utm_source: utm.source ?? '',
    utm_medium: utm.medium ?? '',
    utm_campaign: utm.campaign ?? '',
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      console.error('webhook error', res.status, await res.text())
      return NextResponse.json({ error: 'webhook_failed' }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('webhook fetch error', e)
    return NextResponse.json({ error: 'webhook_failed' }, { status: 500 })
  }
}
