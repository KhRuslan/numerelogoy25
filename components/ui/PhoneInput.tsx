'use client'
import { ChangeEvent } from 'react'
import { AsYouType, type CountryCode } from 'libphonenumber-js'

interface Props {
  value: string
  country: CountryCode
  onChange: (v: string) => void
  onCountryChange: (c: CountryCode) => void
  error?: string
}

const COUNTRIES: { code: CountryCode; label: string; dial: string }[] = [
  { code: 'KZ', label: '🇰🇿 +7',   dial: '+7' },
  { code: 'RU', label: '🇷🇺 +7',   dial: '+7' },
  { code: 'UA', label: '🇺🇦 +380', dial: '+380' },
  { code: 'BY', label: '🇧🇾 +375', dial: '+375' },
  { code: 'UZ', label: '🇺🇿 +998', dial: '+998' },
  { code: 'KG', label: '🇰🇬 +996', dial: '+996' },
  { code: 'TR', label: '🇹🇷 +90',  dial: '+90' },
  { code: 'DE', label: '🇩🇪 +49',  dial: '+49' },
  { code: 'US', label: '🇺🇸 +1',   dial: '+1' },
]

export default function PhoneInput({ value, country, onChange, onCountryChange, error }: Props) {
  const dialCode = COUNTRIES.find(c => c.code === country)?.dial ?? ''

  // Show only the part after the dial code in the input field
  const displayValue = value.startsWith(dialCode + ' ')
    ? value.slice(dialCode.length + 1)
    : value.startsWith(dialCode)
    ? value.slice(dialCode.length)
    : value

  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const full = new AsYouType(country).input(dialCode + raw)
    onChange(full)
  }

  return (
    <div>
      <label htmlFor="phone" className="smallcaps mb-2 block">Телефон</label>
      <div className="flex gap-2">
        <label htmlFor="country" className="sr-only">Страна</label>
        <select
          id="country"
          value={country}
          onChange={(e) => onCountryChange(e.target.value as CountryCode)}
          className="bg-graphite-700 border border-graphite-600 text-bone px-3 py-3 focus:border-gold-500 outline-none rounded-[4px]"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={displayValue}
          onChange={handle}
          placeholder="700 123 45 67"
          className="flex-1 bg-graphite-700 border border-graphite-600 text-bone px-4 py-3 focus:border-gold-500 outline-none rounded-[4px]"
          aria-invalid={error ? 'true' : 'false'}
        />
      </div>
      {error && <p className="text-red-accent text-xs mt-2">{error}</p>}
    </div>
  )
}
