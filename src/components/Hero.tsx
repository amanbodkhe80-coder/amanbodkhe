import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      // Initial state
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, ctaRef.current], {
        opacity: 0,
        y: 30,
      })
      gsap.set(glowRef.current, { opacity: 0, scale: 0.5 })

      // Ambient glow
      tl.to(glowRef.current, {
        opacity: 0.3,
        scale: 1,
        duration: 2,
        ease: 'power2.out',
      }, 0)

      // Line 1: "This is not just a portfolio."
      tl.to(line1Ref.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
      }, 0.5)

      // Fade out line 1
      tl.to(line1Ref.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power2.in',
      }, 3)

      // Line 2: "This is Aman Bodkhe."
      tl.to(line2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, 3.5)

      // Line 3: Role
      tl.to(line3Ref.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }, 4.5)

      // CTA on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom center',
        onUpdate: (self) => {
          if (self.progress > 0.1) {
            gsap.to(ctaRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            })
          }
        },
      })

      // Parallax out on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(line2Ref.current, { y: -100 * p, opacity: 1 - p })
          gsap.set(line3Ref.current, { y: -80 * p, opacity: 1 - p })
          gsap.set(ctaRef.current, { y: -60 * p, opacity: 1 - p * 1.5 })
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="scene"
      style={{ minHeight: '150vh', flexDirection: 'column' }}
    >
      {/* Ambient glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,168,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '24px',
        }}
      >
        {/* Line 1 */}
        <div ref={line1Ref} style={{ position: 'absolute' }}>
          <p
            className="body-lg"
            style={{
              fontStyle: 'italic',
              color: 'var(--grey-300)',
              letterSpacing: '0.05em',
            }}
          >
            This is not just a portfolio.
          </p>
        </div>

        {/* Line 2 */}
        <div ref={line2Ref}>
          <h1 className="heading-xl" style={{ marginBottom: '16px' }}>
            This is{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--white), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Aman Bodkhe
            </span>
            .
          </h1>
        </div>

        {/* Line 3 */}
        <div ref={line3Ref}>
          <p className="label" style={{ fontSize: '0.85rem', letterSpacing: '0.3em' }}>
            Frontend Developer &nbsp;|&nbsp; WordPress Developer
          </p>
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ marginTop: '48px' }}>
          <a href="#projects" className="glow-btn">
            <span>Explore My Work</span>
            <span style={{ fontSize: '1.1rem' }}>↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
