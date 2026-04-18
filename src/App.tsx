import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis, useScrollProgress, useCustomCursor } from './hooks/useSmoothScroll'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Leadership from './components/Leadership'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────
   Navigation — minimal floating nav
   ────────────────────────────────────────────── */
const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
]

function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return
      if (window.scrollY > window.innerHeight * 0.8) {
        navRef.current.style.opacity = '1'
        navRef.current.style.pointerEvents = 'all'
      } else {
        navRef.current.style.opacity = '0'
        navRef.current.style.pointerEvents = 'none'
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: 'max-content',
        maxWidth: '90vw',
        gap: '6px',
        padding: '6px 10px',
        borderRadius: '50px',
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        opacity: 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }}
    >
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="hoverable"
          style={{
            padding: '6px 12px',
            fontSize: '0.65rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--grey-300)',
            textDecoration: 'none',
            borderRadius: '50px',
            transition: 'color 0.3s, background 0.3s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.color = 'var(--white)'
            el.style.background = 'rgba(255,255,255,0.08)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.color = 'var(--grey-300)'
            el.style.background = 'transparent'
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

/* ──────────────────────────────────────────────
   Scene Loader — the "loading" reveal illusion
   ────────────────────────────────────────────── */
function SceneLoader() {
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loaderRef.current) return

    const tl = gsap.timeline()
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        if (loaderRef.current) {
          loaderRef.current.style.display = 'none'
        }
      },
    })
  }, [])

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--black)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '2px solid var(--grey-700)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Main App
   ────────────────────────────────────────────── */
export default function App() {
  useLenis()
  const scrollProgress = useScrollProgress()
  const cursorRef = useCustomCursor()

  return (
    <>
      {/* Page loading illusion */}
      <SceneLoader />

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Custom cursor */}
      <div ref={cursorRef} className="custom-cursor" />

      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Navigation */}
      <Nav />

      {/* Scenes */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Leadership />
        <Contact />
      </main>
    </>
  )
}
