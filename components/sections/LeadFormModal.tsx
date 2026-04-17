'use client'
import { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { isValidPhoneNumber, type CountryCode } from 'libphonenumber-js'
import GoldButton from '@/components/ui/GoldButton'
import PhoneInput from '@/components/ui/PhoneInput'

const formSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа').max(60).regex(/^[\p{L}][\p{L}\s\-]{1,59}$/u, 'Только буквы'),
  phone: z.string().min(5, 'Введите телефон'),
  country: z.string().length(2),
  consent: z.boolean().refine((v) => v === true, { message: 'Нужно согласие' }),
  hp: z.string().max(0),
})

type FormValues = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function LeadFormModal({ open, onClose, onSuccess }: Props) {
  const startedAt = useRef<number>(Date.now())
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', phone: '', country: 'KZ', consent: true, hp: '' },
  })

  useEffect(() => {
    if (open) {
      startedAt.current = Date.now()
      setServerError(null)
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    if (!isValidPhoneNumber(values.phone, values.country as CountryCode)) {
      setServerError('Неверный номер телефона')
      return
    }
    try {
      const utm = (typeof window !== 'undefined' && JSON.parse(sessionStorage.getItem('utm') ?? '{}')) || {}
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...values,
          startedAt: startedAt.current,
          utm,
        }),
      })
      if (!res.ok) {
        setServerError('Не удалось отправить. Попробуйте ещё раз.')
        return
      }
      onSuccess()
    } catch {
      setServerError('Сетевая ошибка. Попробуйте ещё раз.')
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-graphite-900/85 backdrop-blur-md p-5"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-[480px] bg-graphite-800 border border-gold-500/40 p-6 md:p-10 relative">
        <button onClick={onClose} aria-label="Закрыть" className="absolute top-4 right-4 text-bone-dim hover:text-gold-500 text-2xl leading-none">&times;</button>

        <p className="smallcaps mb-3">Бронирование места</p>
        <h2 id="lead-modal-title" className="font-display text-[clamp(28px,7vw,36px)] mb-2 leading-tight">
          Алматы · 25 апреля
        </h2>
        <p className="text-bone-dim text-sm mb-6">Оставьте контакты — мы пришлём подтверждение и детали встречи.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <input type="text" tabIndex={-1} autoComplete="off" {...register('hp')} className="hidden" aria-hidden="true" />

          <div>
            <label htmlFor="name" className="smallcaps mb-2 block">Имя и фамилия</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register('name')}
              className="w-full bg-graphite-700 border border-graphite-600 text-bone px-4 py-3 focus:border-gold-500 outline-none rounded-[4px]"
              aria-invalid={errors.name ? 'true' : 'false'}
            />
            {errors.name && <p className="text-red-accent text-xs mt-2">{errors.name.message}</p>}
          </div>

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Controller
                name="country"
                control={control}
                render={({ field: cf }) => (
                  <PhoneInput
                    value={field.value}
                    country={cf.value as CountryCode}
                    onChange={field.onChange}
                    onCountryChange={(c) => cf.onChange(c)}
                    error={errors.phone?.message}
                  />
                )}
              />
            )}
          />

          <label className="flex items-start gap-3 text-xs text-bone-dim cursor-pointer">
            <input
              type="checkbox"
              {...register('consent')}
              aria-label="Согласен на обработку персональных данных"
              className="mt-0.5 accent-gold-500"
            />
            <span>Согласен на обработку персональных данных и получение информационных сообщений</span>
          </label>
          {errors.consent && <p className="text-red-accent text-xs">{errors.consent.message}</p>}

          {serverError && <p className="text-red-accent text-xs">{serverError}</p>}

          <GoldButton variant="solid" type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Отправляем…' : 'Забронировать место'}
          </GoldButton>
        </form>
      </div>
    </div>
  )
}
