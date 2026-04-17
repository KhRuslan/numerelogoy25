export default function HairlineDivider({ className = '' }: { className?: string }) {
  return <div role="separator" aria-hidden="true" className={`hairline w-full ${className}`} />
}
