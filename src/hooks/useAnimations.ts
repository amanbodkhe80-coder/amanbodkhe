import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(options?: {
  threshold?: number
  y?: number
  duration?: number
  delay?: number
  stagger?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const {
    y = 60,
    duration = 1.2,
    delay = 0,
    stagger = 0.15,
  } = options || {}

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll('.reveal-item')
    const targets = children.length > 0 ? children : [el]

    gsap.set(targets, { opacity: 0, y })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      },
    })

    tl.to(targets, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [y, duration, delay, stagger])

  return ref
}

export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.to(el, {
      yPercent: -30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [speed])

  return ref
}

export function useTextMask() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const lines = el.querySelectorAll('.mask-line')
    if (!lines.length) return

    gsap.set(lines, {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
    })

    gsap.to(lines, {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      duration: 1.4,
      stagger: 0.25,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [])

  return ref
}

export function useCounter(end: number, duration: number = 2) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (!ref.current || hasAnimated.current) return
    hasAnimated.current = true

    gsap.to(ref.current, {
      innerHTML: end,
      duration,
      snap: { innerHTML: 1 },
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })
  }, [end, duration])

  useEffect(() => {
    animate()
  }, [animate])

  return ref
}

export { gsap, ScrollTrigger }
