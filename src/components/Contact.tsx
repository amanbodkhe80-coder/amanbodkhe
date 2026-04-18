import { useEffect, useRef, useState, type FormEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/amanbodkhe80-coder', icon: '⌘' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aman-bodkhe-0a9632322/', icon: '◆' },
  { name: 'Twitter', url: 'https://twitter.com/amanbodkhe', icon: '✦' },
  { name: 'Email', url: 'mailto:amanbodkhe80@gmail.com', icon: '◎' },
]

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline
      gsap.from('.contact-headline', {
        opacity: 0,
        y: 60,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
      })

      // Form
      gsap.from('.contact-form', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 65%' },
      })

      // Social links
      gsap.from('.social-link', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 60%' },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="contact" className="scene" style={{ minHeight: '100vh' }}>
      <div className="scene-inner" style={{ maxWidth: '700px', textAlign: 'center' }}>
        <span
          className="label"
          style={{ marginBottom: '24px', display: 'block' }}
        >
          06 — Contact
        </span>

        <h2
          className="contact-headline heading-lg"
          style={{ marginBottom: '16px' }}
        >
          Let's build something{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-strong))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            impactful
          </span>
          .
        </h2>

        <p
          className="body-md"
          style={{
            marginBottom: '60px',
            color: 'var(--grey-400)',
          }}
        >
          Have a project in mind? I'd love to hear about it.
        </p>

        {/* Contact Form */}
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            textAlign: 'left',
            marginBottom: '80px',
          }}
        >
          <div>
            <label
              htmlFor="contact-name"
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--grey-400)',
                marginBottom: '8px',
                display: 'block',
                fontFamily: 'var(--font-display)',
              }}
            >
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              className="contact-input"
              placeholder="What's your name?"
              required
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--grey-400)',
                marginBottom: '8px',
                display: 'block',
                fontFamily: 'var(--font-display)',
              }}
            >
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              className="contact-input"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="contact-message"
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--grey-400)',
                marginBottom: '8px',
                display: 'block',
                fontFamily: 'var(--font-display)',
              }}
            >
              Message
            </label>
            <textarea
              id="contact-message"
              className="contact-input"
              placeholder="Tell me about your project..."
              required
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            {submitted ? (
              <div
                style={{
                  padding: '14px 32px',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.08em',
                }}
              >
                ✓ Message sent. I'll get back to you soon.
              </div>
            ) : (
              <button
                type="submit"
                className="glow-btn"
                style={{ margin: '0 auto' }}
              >
                <span>Send Message</span>
                <span style={{ fontSize: '1rem' }}>→</span>
              </button>
            )}
          </div>
        </form>

        {/* Social Links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link hoverable"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                color: 'var(--grey-400)',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.05em',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--grey-400)'
              }}
            >
              <span style={{ fontSize: '1rem' }}>{link.icon}</span>
              {link.name}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '80px',
            paddingTop: '32px',
            borderTop: '1px solid var(--grey-700)',
          }}
        >
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--grey-500)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.05em',
            }}
          >
            © {new Date().getFullYear()} Aman Bodkhe. Crafted with purpose.
          </p>
        </div>
      </div>
    </section>
  )
}
