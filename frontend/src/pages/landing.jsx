import React from 'react'
import HeroSection from '../components/heroSection.jsx'
import { FeatureSection } from '../components/features-section.jsx'
import { Footer } from '../components/footer.jsx'
import { ParticleBackground } from '../components/particle-background.jsx'
import { ThemeProvider } from "../components/theme-provider"
import { ThemeModeToggle } from "../components/theme-mode-toggle"



function landingPage() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="connectsphere-theme">
      <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
        <ParticleBackground/>

        <div className="absolute top-4 right-4 z-50">
          <ThemeModeToggle />
        </div>

        <main className="container mx-auto px-4 relative z-10">
          <HeroSection />
          <FeatureSection />
        </main>

        <Footer />

        <div className="fixed bottom-6 right-6 z-50">
          <button className="bg-primary text-primary-foreground rounded-full p-3 shadow-glow hover:shadow-glow-intense transition-all duration-300">
            <HelpIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </ThemeProvider>
  )
}
function HelpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}

export default landingPage


