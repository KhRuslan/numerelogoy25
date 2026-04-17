'use client'
import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'outline' | 'solid'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const base =
  'inline-flex items-center justify-center font-sans font-medium uppercase tracking-[0.18em] text-[12px] md:text-[13px] px-8 py-5 md:px-10 md:py-6 rounded-[5px] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500'

const outline =
  'border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white'

const solid =
  'bg-gold-500 text-white border border-gold-500 hover:bg-gold-400 hover:border-gold-400'

const GoldButton = forwardRef<HTMLButtonElement, Props>(function GoldButton(
  { variant = 'outline', className = '', children, ...rest },
  ref,
) {
  const v = variant === 'solid' ? solid : outline
  return (
    <button ref={ref} className={`${base} ${v} ${className}`} {...rest}>
      {children}
    </button>
  )
})

export default GoldButton
