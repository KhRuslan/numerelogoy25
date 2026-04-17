export interface UTM { source?: string; medium?: string; campaign?: string }

export function parseUtm(search: string): UTM {
  const params = new URLSearchParams(search)
  const utm: UTM = {}
  const s = params.get('utm_source'); if (s) utm.source = s
  const m = params.get('utm_medium'); if (m) utm.medium = m
  const c = params.get('utm_campaign'); if (c) utm.campaign = c
  return utm
}
