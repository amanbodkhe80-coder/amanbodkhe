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
          {/* Profile Image — with professional reddish background */}
          <div
            ref={imageWrapperRef}
            style={{
              position: 'relative',
              flexShrink: 0,
              width: '280px',
              height: '360px',
              margin: '0 auto',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {/* ── Reddish gradient background layers ── */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(160deg, #0a0a0a 0%, #1a0808 25%, #2d0a0a 50%, #1a0505 75%, #0a0a0a 100%)',
                zIndex: 0,
              }}
            />
            {/* Core crimson glow — centered behind the figure */}
            <div
              style={{
                position: 'absolute',
                top: '15%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '160%',
                height: '90%',
                background: 'radial-gradient(ellipse at 50% 35%, rgba(180,20,20,0.35) 0%, rgba(120,10,10,0.15) 40%, transparent 70%)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
            {/* Subtle edge highlight — cinematic side lighting */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '60%',
                height: '100%',
                background: 'linear-gradient(250deg, rgba(200,40,40,0.18) 0%, transparent 60%)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
            {/* Warm ambient particles / noise texture effect */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 75% 25%, rgba(255,60,60,0.08) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(200,30,30,0.06) 0%, transparent 40%)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            {/* The image — transparent bg, floating on the gradient */}
            <img
              ref={imageRef}
              src="/aman-----removebg-preview.png"
              alt="Aman Bodkhe"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 10%',
                display: 'block',
                position: 'relative',
                zIndex: 2,
                filter: 'brightness(1.05) contrast(1.08)',
                maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
              }}
            />

            {/* Bottom fade into page background */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '30%',
                background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)',
                zIndex: 3,
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Outer atmospheric glow — red halo around the card */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '140px',
              width: '280px',
              height: '360px',
              background: 'radial-gradient(ellipse at 50% 40%, rgba(180,20,20,0.12) 0%, transparent 60%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />

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
