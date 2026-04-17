'use client'
import { useEffect, useState } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import AudienceSection from '@/components/sections/AudienceSection'
import BenefitsSection from '@/components/sections/BenefitsSection'
import LeadFormModal from '@/components/sections/LeadFormModal'
import SuccessSection from '@/components/sections/SuccessSection'
import { parseUtm } from '@/lib/utm'

export default function Landing() {
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const utm = parseUtm(window.location.search)
    sessionStorage.setItem('utm', JSON.stringify(utm))
    ;(window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: 'view_landing' })
  }, [])

  const openModal = () => {
    setModalOpen(true)
    ;(window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: 'click_book' })
  }

  const handleSuccess = () => {
    setModalOpen(false)
    setSubmitted(true)
    ;(window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: 'submit_lead' })
    requestAnimationFrame(() => {
      document.getElementById('success')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <main>
      <HeroSection onBook={openModal} />
      <AudienceSection />
      <BenefitsSection onBook={openModal} />
      {submitted && <SuccessSection />}
      <LeadFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </main>
  )
}
