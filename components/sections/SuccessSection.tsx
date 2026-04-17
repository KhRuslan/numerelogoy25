'use client'
import GoldButton from '@/components/ui/GoldButton'
import HairlineDivider from '@/components/ui/HairlineDivider'

export default function SuccessSection() {
  const onTelegram = () => {
    window.open('https://t.me/enversiya_kz', '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="px-5 md:px-10 py-20 md:py-28 border-t border-graphite-600">
      <div className="max-w-2xl mx-auto text-center">
        <p className="smallcaps mb-6">Готово</p>
        <h2 className="font-display text-[clamp(40px,8vw,72px)] leading-[1]">
          Место забронировано. <em className="italic">До встречи 25 апреля!</em>
        </h2>
        <HairlineDivider className="my-8" />
        <p className="text-bone-dim text-[clamp(15px,4vw,17px)] mb-10">
          Детали встречи и напоминание придут вам. Переходите в наш рабочий канал в Telegram, чтобы ничего не пропустить.
        </p>
        <GoldButton variant="solid" onClick={onTelegram}>
          Перейти в Telegram
        </GoldButton>
      </div>
    </section>
  )
}
