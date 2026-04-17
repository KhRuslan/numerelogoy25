'use client'
import Image from 'next/image'
import GoldButton from '@/components/ui/GoldButton'
import HairlineDivider from '@/components/ui/HairlineDivider'

interface Props {
  onBook: () => void
}

export default function HeroSection({ onBook }: Props) {
  return (
    <section className="relative min-h-svh px-5 md:px-10 pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-graphite-600">
      <div className="relative max-w-screen-xl mx-auto grid md:grid-cols-12 gap-y-10 md:gap-x-8 items-center">

        <div className="md:col-span-7 order-2 md:order-1">
          <p className="smallcaps mb-6">Алматы · 25 апреля · Офлайн-интенсив</p>

          <h1 className="font-display text-[clamp(38px,8vw,72px)] leading-[1.0]">
            Как партнёрам сетевого бизнеса вырасти в доходе{' '}
            <em className="italic text-gold-500">х3</em>,
            используя потенциал своей даты рождения?
          </h1>

          <HairlineDivider className="my-8" />

          <p className="text-bone-dim text-[clamp(15px,3.5vw,17px)] max-w-xl leading-relaxed">
            Эксклюзивный офлайн-интенсив от ведущего ведического нумеролога{' '}
            <span className="text-bone">Энвера Фаткуллина</span> (г. Новороссийск).
            Узнайте, как масштабировать команду и личный бренд через цифры.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start">
            <GoldButton variant="solid" onClick={onBook}>
              Забронировать место
            </GoldButton>
            <div className="flex items-center gap-3 text-bone-dim text-sm">
              <span className="text-red-accent font-medium">Осталось 12 мест</span>
            </div>
          </div>
        </div>

        <aside className="md:col-span-5 order-1 md:order-2">
          <div className="relative aspect-[3/4] w-full max-w-[420px] mx-auto md:ml-auto overflow-hidden">
            <Image
              src="/images/enver-hero.jpg"
              alt="Энвер Фаткуллин"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 420px"
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-graphite-900/90 to-transparent">
              <p className="font-display italic text-[clamp(24px,5vw,36px)] text-gold-500/80 leading-none">Энвер Фаткуллин</p>
              <p className="text-bone-dim text-xs mt-1 uppercase tracking-widest">Ведический нумеролог · г. Новороссийск</p>
            </div>
          </div>
        </aside>

      </div>
    </section>
  )
}
