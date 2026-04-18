import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const paragraphs = [
  "I'm a Computer Science student who doesn't just study tech — I build with it.",
  'From real-world full-stack platforms to polished WordPress websites for clients, I turn ideas into working digital experiences.',
  'My focus: crafting fast, beautiful frontends — while continuously learning React, Node, and the modern web stack.',
  "I believe in building things that matter. Not templates. Not tutorials. Real projects, for real people.",
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const parasRef = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label
      gsap.from(labelRef.current, {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      })

      // Heading
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      })

      // Profile image — emerge from darkness
      if (imageWrapperRef.current) {
        gsap.from(imageWrapperRef.current, {
          opacity: 0,
          scale: 1.1,
          filter: 'blur(16px) brightness(0.3)',
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: 'top 85%',
          },
        })
      }

      // Subtle parallax on the image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // Paragraphs — line-by-line reveal
      parasRef.current.forEach((p, i) => {
        if (!p) return
        gsap.from(p, {
          opacity: 0,
          y: 30,
          filter: 'blur(8px)',
          duration: 1,
          delay: i * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: p,
            start: 'top 88%',
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="about" className="scene">
      <div className="scene-inner" style={{ maxWidth: '900px' }}>
        <span ref={labelRef} className="label" style={{ display: 'block', marginBottom: '24px' }}>
          01 — About
        </span>

        <h2
          ref={headingRef}
          className="heading-lg"
          style={{ marginBottom: '60px' }}
        >
          Building the web,{' '}
          <span style={{ color: 'var(--accent)' }}>one project</span> at a
          time.
        </h2>

        {/* ───── Profile Image + Text Layout ───── */}
        <div
          style={{
            display: 'flex',
            gap: '60px',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          {/* Profile Image — frameless, floating on darkness */}
          <div
            ref={imageWrapperRef}
            style={{
              position: 'relative',
              flexShrink: 0,
              width: '280px',
              height: '340px',
              margin: '0 auto',
            }}
          >
            {/* Atmospheric glow behind figure */}
            <div
              style={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200%',
                height: '120%',
                background:
                  'radial-gradient(ellipse at 50% 40%, rgba(0,168,255,0.12) 0%, rgba(0,168,255,0.04) 35%, transparent 65%)',
                pointerEvents: 'none',
                filter: 'blur(30px)',
              }}
            />

            {/* The image — no container, no border, just floating */}
            <img
              ref={imageRef}
              src="/Photo2-removebg-preview.png"
              alt="Aman Bodkhe"
              style={{
                width: '100%',
                height: '120%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
                position: 'relative',
                zIndex: 1,
                filter: 'brightness(1.08) contrast(1.08)',
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}
            />

            {/* Soft ambient light splash beneath */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '60px',
                background: 'radial-gradient(ellipse, rgba(0,168,255,0.1) 0%, transparent 70%)',
                filter: 'blur(20px)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Text content */}
          <div style={{ flex: 1, minWidth: '280px', paddingTop: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {paragraphs.map((text, i) => (
                <p
                  key={i}
                  ref={(el) => { parasRef.current[i] = el }}
                  className="body-lg"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div
          className="scene-divider"
          style={{ marginTop: '100px' }}
        />
      </div>
    </section>
  )
}
