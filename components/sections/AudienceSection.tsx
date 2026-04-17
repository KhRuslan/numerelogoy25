import SectionNumber from '@/components/ui/SectionNumber'
import HairlineDivider from '@/components/ui/HairlineDivider'

const CARDS = [
  {
    title: 'Действующим Топ-лидерам',
    text: 'У вас уже есть большая структура, но вы чувствуете «стеклянный потолок». Доход замер на одной отметке, а привычные методы мотивации команды перестали работать.',
  },
  {
    title: 'Лидерам в стадии активного роста',
    text: 'Вы строите первую линию, проводите много встреч, но часто сталкиваетесь с тем, что люди уходят или «не тянут». Вы тратите время не на тех.',
  },
  {
    title: 'Партнёрам сетевого бизнеса',
    text: 'Вы устали от бесконечного рекрутинга, зумов и ответственности за чужой результат. Энергия на нуле, вера в продукт или бизнес падает.',
  },
]

export default function AudienceSection() {
  return (
    <section className="px-5 md:px-10 py-20 md:py-28 border-b border-graphite-600">
      <div className="max-w-screen-xl mx-auto">
        <SectionNumber index={1} label="Кому важно быть на мероприятии" />
        <h2 className="font-display text-[clamp(36px,7vw,64px)] leading-[1.0] mt-6 max-w-3xl">
          Это про вас, <em className="italic">если вы узнаёте себя</em>
        </h2>
        <HairlineDivider className="my-10" />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {CARDS.map((card, i) => (
            <div key={i} className="border border-gold-500/20 p-6 md:p-8 bg-graphite-800 flex flex-col gap-4">
              <span className="font-display text-[56px] md:text-[72px] leading-none text-gold-500/20 select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[clamp(22px,4vw,28px)] leading-tight">{card.title}</h3>
              <p className="text-bone-dim text-[15px] leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
