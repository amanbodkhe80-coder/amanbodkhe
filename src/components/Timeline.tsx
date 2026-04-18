import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TimelineEntry {
  year: string
  title: string
  subtitle: string
  description: string
}

const education: TimelineEntry[] = [
  {
    year: '2022 – Present',
    title: 'B.Tech in Computer Science',
    subtitle: 'Dr. Babasaheb Ambedkar Technological University',
    description: 'Pursuing Computer Science & Engineering with focus on web technologies and software development.',
  },
  {
    year: '2020 – 2022',
    title: 'HSC (12th)',
    subtitle: 'Maharashtra State Board',
    description: 'Completed higher secondary education with strong foundation in science and mathematics.',
  },
]

const experience: TimelineEntry[] = [
  {
    year: '2024',
    title: 'Freelance WordPress Developer',
    subtitle: 'Various Clients',
    description: 'Developed and delivered professional WordPress websites for political figures, NGOs, and businesses.',
  },
  {
    year: '2023 – 2024',
    title: 'Frontend Developer',
    subtitle: 'Personal & Academic Projects',
    description: 'Built full-stack web applications including food donation platforms, MCQ systems, and automated tools.',
  },
]

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label + heading
      gsap.from('.timeline-label', {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      })
      gsap.from('.timeline-heading', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
      })

      // Timeline items
      const items = document.querySelectorAll('.timeline-item')
      items.forEach((item, _i) => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const renderTimeline = (entries: TimelineEntry[]) => (
    <div className="timeline">
      {entries.map((entry) => (
        <div
          key={entry.title}
          className="timeline-item"
          style={{ opacity: 0, transform: 'translateY(30px)', filter: 'blur(6px)' }}
        >
          <span
            className="label"
            style={{
              marginBottom: '8px',
              display: 'block',
              color: 'var(--accent)',
              fontSize: '0.7rem',
            }}
          >
            {entry.year}
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontWeight: 600,
              color: 'var(--white)',
              marginBottom: '4px',
            }}
          >
            {entry.title}
          </h3>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--grey-300)',
              marginBottom: '10px',
              fontStyle: 'italic',
            }}
          >
            {entry.subtitle}
          </p>
          <p className="body-md">{entry.description}</p>
        </div>
      ))}
    </div>
  )

  return (
    <section ref={containerRef} id="timeline" className="scene">
      <div className="scene-inner" style={{ maxWidth: '800px' }}>
        <span className="label timeline-label" style={{ display: 'block', marginBottom: '24px' }}>
          04 — Journey
        </span>
        <h2 className="heading-lg timeline-heading" style={{ marginBottom: '60px' }}>
          Education &{' '}
          <span style={{ color: 'var(--accent)' }}>Experience</span>
        </h2>

        {/* Education */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--grey-400)',
            marginBottom: '32px',
          }}
        >
          Education
        </h3>
        {renderTimeline(education)}

        <div className="scene-divider" style={{ margin: '60px auto' }} />

        {/* Experience */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--grey-400)',
            marginBottom: '32px',
          }}
        >
          Experience
        </h3>
        {renderTimeline(experience)}
      </div>
    </section>
  )
}
