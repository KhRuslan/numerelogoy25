'use client'
import Image from 'next/image'
import SectionNumber from '@/components/ui/SectionNumber'
import HairlineDivider from '@/components/ui/HairlineDivider'
import GoldButton from '@/components/ui/GoldButton'

const BENEFITS = [
  {
    title: 'Личная «Дорожная карта» лидера',
    text: 'Перестанете действовать «на ощупь». Узнаете, стоит ли сейчас вкладывать все ресурсы в масштабирование или лучше сфокусироваться на обучении и автоматизации текущей команды.',
  },
  {
    title: 'Технология «Безошибочный рекрутинг»',
    text: 'Вы научитесь за 5 минут понимать, кто перед вами: будущий «бриллиант», стабильный исполнитель или человек, который просто потратит ваше время. Ваша конверсия в ключевых партнёров вырастет.',
  },
  {
    title: 'Новое окружение и обучение',
    text: 'Для тех, кто придёт со своей командой, действует специальное скидочное предложение. Добавьте в своё портфолио уникальный инструмент работы с людьми либо приведите ключевых партнёров и усильте команду прямо на мероприятии.',
  },
]

interface Props {
  onBook: () => void
}

export default function BenefitsSection({ onBook }: Props) {
  return (
    <section className="px-5 md:px-10 py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto">
        <SectionNumber index={2} label="Что вы получите после мероприятия" />
        <h2 className="font-display text-[clamp(36px,7vw,64px)] leading-[1.0] mt-6 max-w-3xl">
          Три инструмента, <em className="italic">которые изменят вашу работу</em>
        </h2>
        <HairlineDivider className="my-10" />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {BENEFITS.map((b, i) => (
            <div key={i} className="border border-gold-500/20 p-6 md:p-8 bg-graphite-800 flex flex-col gap-4">
              <span className="font-display text-[56px] md:text-[72px] leading-none text-gold-500/20 select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[clamp(22px,4vw,28px)] leading-tight">{b.title}</h3>
              <p className="text-bone-dim text-[15px] leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>

        <HairlineDivider className="mb-16 md:mb-20" />

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden">
              <Image
                src="/images/enver-meetup.jpg"
                alt="Энвер Фаткуллин на встрече"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <SectionNumber index={3} label="Забронируйте место сейчас" />
            <p className="font-display text-[clamp(80px,18vw,150px)] leading-none text-gold-500 mt-4">25.04</p>
            <p className="smallcaps mt-3 mb-8">Алматы · 25 апреля</p>
            <div className="border border-gold-500/40 p-4 md:p-6 bg-graphite-800 mb-8">
              <p className="text-gold-500 text-sm font-sans uppercase tracking-widest mb-1">Фишка встречи</p>
              <p className="text-bone text-[15px]">«Мы разберём вашу дату рождения прямо в зале — и вы увидите свой рекрутинговый профиль»</p>
            </div>
            <GoldButton variant="solid" onClick={onBook}>
              Забронировать место
            </GoldButton>
            <p className="text-red-accent mt-4 text-sm font-medium">Осталось 12 мест</p>
          </div>
        </div>
      </div>
    </section>
  )
}
