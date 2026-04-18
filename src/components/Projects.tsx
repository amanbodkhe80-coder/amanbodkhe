import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string
  description: string
  url: string
  tags: string[]
  color: string
}

const projects: Project[] = [
  {
    title: 'Food Donation Platform',
    description:
      'A full-stack working platform connecting food donors with those in need. Built with real-world functionality and impact in mind.',
    url: 'https://food-donate-blush.vercel.app/',
    tags: ['Full Stack', 'React', 'Node.js'],
    color: '#ff6b35',
  },
  {
    title: 'Marksheet Generator',
    description:
      'Automated marksheet generation system for DBATU. Streamlining academic processes with precision and efficiency.',
    url: 'https://marksheet-pro.vercel.app/',
    tags: ['Automation', 'React', 'PDF'],
    color: '#00c9a7',
  },
  {
    title: 'Test Yourself',
    description:
      'An interactive MCQ platform designed for self-assessment. Dynamic quizzes with instant feedback and progress tracking.',
    url: 'https://frortune-mcq.vercel.app/',
    tags: ['EdTech', 'Interactive', 'React'],
    color: '#845ef7',
  },
  {
    title: 'Kunal Padole Website',
    description:
      'Professional WordPress political website for a client. Custom design with CMS integration for easy content management.',
    url: 'https://kunalpadole.com/',
    tags: ['WordPress', 'Client Work', 'Political'],
    color: '#ffd43b',
  },
  {
    title: 'Yuva Foundation',
    description:
      'NGO website for Yuva Foundation India. Showcasing their mission, initiatives, and impact through a clean digital presence.',
    url: 'https://yuvasite.yuvafoundationindia.org/',
    tags: ['NGO', 'WordPress', 'Design'],
    color: '#20c997',
  },
  {
    title: 'Siddhivinayak Infrastructure',
    description:
      'Business website for a construction and infrastructure company. Professional web presence with project showcases.',
    url: 'https://test.yuvagpt.com/',
    tags: ['Business', 'WordPress', 'Corporate'],
    color: '#339af0',
  },
]

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.projects-label', {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
      })
      gsap.from('.projects-heading', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 75%' },
      })

      // Project cards
      const projectEls = document.querySelectorAll('.project-scene')
      projectEls.forEach((el) => {
        const bg = el.querySelector('.project-bg')
        const content = el.querySelector('.project-content')
        const title = el.querySelector('.project-title')
        const desc = el.querySelector('.project-desc')
        const tags = el.querySelector('.project-tags')
        const cta = el.querySelector('.project-cta')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            end: 'center center',
            scrub: false,
            toggleActions: 'play none none none',
          },
        })

        // Background blur to clear
        if (bg) {
          gsap.set(bg, { filter: 'blur(20px)', scale: 1.1, opacity: 0 })
          tl.to(bg, { filter: 'blur(0px)', scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0)
        }
        if (content) {
          gsap.set(content, { opacity: 0 })
          tl.to(content, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.3)
        }
        if (title) {
          gsap.set(title, { opacity: 0, y: 30 })
          tl.to(title, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.5)
        }
        if (desc) {
          gsap.set(desc, { opacity: 0, y: 20 })
          tl.to(desc, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.7)
        }
        if (tags) {
          gsap.set(tags, { opacity: 0, y: 15 })
          tl.to(tags, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.9)
        }
        if (cta) {
          gsap.set(cta, { opacity: 0, y: 15 })
          tl.to(cta, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.1)
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} id="projects">
      {/* Section header */}
      <div
        ref={headerRef}
        className="scene"
        style={{ minHeight: '50vh' }}
      >
        <div className="scene-inner" style={{ textAlign: 'center' }}>
          <span className="label projects-label" style={{ marginBottom: '24px', display: 'block' }}>
            03 — Projects
          </span>
          <h2 className="heading-lg projects-heading">
            Selected{' '}
            <span style={{ color: 'var(--accent)' }}>Work</span>
          </h2>
        </div>
      </div>

      {/* Project scenes */}
      {projects.map((project, i) => (
        <div
          key={project.title}
          className="project-scene"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Colored accent glow background */}
          <div
            className="project-bg"
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(ellipse at ${i % 2 === 0 ? '30%' : '70%'} 50%, ${project.color}08 0%, transparent 60%)`,
              pointerEvents: 'none',
            }}
          />

          <div
            className="project-content"
            style={{
              maxWidth: '1000px',
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '40px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Project number */}
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 10vw, 8rem)',
                fontWeight: 800,
                color: 'var(--grey-700)',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Title */}
            <h3
              className="project-title heading-md"
              style={{ color: project.color }}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p className="project-desc body-lg" style={{ maxWidth: '600px' }}>
              {project.description}
            </p>

            {/* Tags */}
            <div
              className="project-tags"
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '50px',
                    border: `1px solid ${project.color}33`,
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-display)',
                    color: project.color,
                    letterSpacing: '0.05em',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="project-cta">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn"
                style={{
                  borderColor: project.color,
                  color: project.color,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.boxShadow = `0 0 30px ${project.color}44, 0 0 60px ${project.color}22`
                  el.style.color = 'var(--black)'
                  el.style.background = project.color
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.boxShadow = 'none'
                  el.style.color = project.color
                  el.style.background = 'transparent'
                }}
              >
                <span>View Live</span>
                <span style={{ fontSize: '1rem' }}>→</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
