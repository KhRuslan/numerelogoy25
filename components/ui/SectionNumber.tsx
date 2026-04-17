export default function SectionNumber({ index, total = 3, label }: { index: number; total?: number; label: string }) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <p className="smallcaps">
      {pad(index)} / {pad(total)} · {label}
    </p>
  )
}
