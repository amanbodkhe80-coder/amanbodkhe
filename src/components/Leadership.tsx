import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const roles = [
  {
    title: 'President',
    context: 'CSE Department',
    description:
      'Leading the Computer Science & Engineering department student body. Organizing tech events, workshops, and fostering a culture of innovation.',
  },
  {
    title: 'Event Promotion Head',
    context: 'College Events',
    description:
      'Spearheading digital promotion strategies for college-level events. Managing outreach, social media, and creative campaigns.',
  },
]

export default function Leadership() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.leadership-label', {
        opacity: 0, x: -30, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      })
      gsap.from('.leadership-heading', {
        opacity: 0, y: 40, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
      })

      const roleEls = document.querySelectorAll('.leadership-role')
      roleEls.forEach((el) => {
        const title = el.querySelector('.role-title')
        const context = el.querySelector('.role-context')
        const desc = el.querySelector('.role-desc')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
          },
        })

        if (title) {
          gsap.set(title, { opacity: 0, y: 60, scale: 0.95 })
          tl.to(title, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }, 0)
        }
        if (context) {
          gsap.set(context, { opacity: 0, y: 20 })
          tl.to(context, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3)
        }
        if (desc) {
          gsap.set(desc, { opacity: 0, y: 20 })
          tl.to(desc, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.5)
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="leadership" className="scene">
      <div className="scene-inner" style={{ maxWidth: '900px' }}>
        <span className="label leadership-label" style={{ display: 'block', marginBottom: '24px' }}>
          05 — Leadership
        </span>
        <h2 className="heading-lg leadership-heading" style={{ marginBottom: '80px' }}>
          Beyond{' '}
          <span style={{ color: 'var(--accent)' }}>Code</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
          {roles.map((role) => (
            <div key={role.title} className="leadership-role">
              <h3
                className="role-title"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: 'var(--white)',
                  marginBottom: '12px',
                }}
              >
                {role.title}
              </h3>
              <p
                className="role-context label"
                style={{
                  fontSize: '0.9rem',
                  marginBottom: '20px',
                  color: 'var(--accent)',
                }}
              >
                {role.context}
              </p>
              <p
                className="role-desc body-lg"
                style={{ maxWidth: '550px' }}
              >
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
