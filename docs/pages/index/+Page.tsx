import { useGSAP } from '@gsap/react'
import { LayoutComponent } from '@unterberg/nivel'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'
import { withDocsBasePath } from '../../util/withBasePath'
import CTAButtons from './CTA'
import './startpage.css'

import BaseSection from './Base'
import ExtendTransformSection from './ExtendTransform'
import VariantsSection from './Variants'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Page = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current

      if (!root) {
        return
      }

      const outer = root.querySelector<HTMLElement>('[data-outer]')
      const scroller = root.querySelector<HTMLElement>('[data-scroller]')
      const heroHeadline = root.querySelector<HTMLElement>('[data-hero-headline]')
      const codeLeft = root.querySelector<HTMLElement>('[data-code-presenter-small-left]')
      const codeRight = root.querySelector<HTMLElement>('[data-code-presenter-small-right]')
      const codeHighlight = root.querySelector<HTMLElement>(
        '[data-hero-code-presenter] [data-code-presenter-highlight]',
      )

      if (!outer || !scroller || !codeHighlight) {
        return
      }

      const media = gsap.matchMedia(root)

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: outer,
              scrub: 2,
              markers: import.meta.env.DEV,
              start: 'top top',
              end: '+=50%',
            },
          })
          // .to(scroller, { yPercent: 20 }, 0)
          .to(heroHeadline, { yPercent: 5, autoAlpha: 0, delay: 0.1, duration: 0.6 }, 0)
          .to(codeHighlight, { yPercent: 8 }, 0)
          .to(codeLeft, { yPercent: 4, autoAlpha: 0 }, 0)
          .to(codeRight, { yPercent: -6, autoAlpha: 0 }, 0)
      })

      return () => media.revert()
    },
    { scope: rootRef },
  )

  return (
    <>
      <div ref={rootRef} className="landing-code-samples" data-beasties-container>
        <div className="flex flex-col justify-center w-full">
          <div
            data-outer
            className="absolute top-0 left-0 w-full overflow-hidden h-[calc(55svh-14*var(--spacing))] z-1"
          >
            <div data-scroller className="absolute -top-60 left-0 right-0 h-[calc(85svh+16*var(--spacing))] z-0 ">
              <img
                src={withDocsBasePath('/bg-dark-strong.png', import.meta.env.BASE_URL)}
                alt=""
                className="hidden dark:block absolute w-full h-full object-fill"
              />
              <img
                src={withDocsBasePath('/bg-light-strong.png', import.meta.env.BASE_URL)}
                alt=""
                className="dark:hidden absolute w-full h-full object-fill"
              />
            </div>
            <div className="absolute top-0 left-0 h-[calc(55svh+16*var(--spacing))] w-full bg-radial-[at_50%_15%] from-base-100 to-65% dark:from-base-100 z-0" />
          </div>
          <div className="absolute -top-16 left-0 right-0 bg-linear-to-b from-base-100 from-10% via-transparent via-20% to-base-100 z-4 h-[calc(55svh+2*var(--spacing))]" />

          <div className="mt-24 mb-12 z-5" data-hero-headline>
            <LayoutComponent className="relative">
              <div className="text-center mx-auto z-2 relative">
                <div className="px-8">
                  <img
                    src={withDocsBasePath('/marmo-dark.svg', import.meta.env.BASE_URL)}
                    alt="Marmo logo"
                    className="mx-auto mb-8 w-12 h-12 dark:hidden"
                    width={20}
                    height={20}
                  />
                  <img
                    src={withDocsBasePath('/marmo-light.svg', import.meta.env.BASE_URL)}
                    alt="Marmo logo"
                    className="mx-auto mb-8 w-12 h-12 hidden dark:block"
                    width={20}
                    height={20}
                  />
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-base-content">
                    Component factory for{' '}
                    <span className="text-nowrap underline text-shadow-lg text-shadow-primary-muted-superlight text-primary">
                      utility-first UI
                    </span>
                  </h1>
                  <p className="font-normal text-base-muted text-lg md:text-2xl lg:text-3xl mt-4">
                    Typed layer for class names. For React and SolidJS.
                  </p>
                </div>
              </div>
            </LayoutComponent>
            <LayoutComponent $size="sm" className="flex gap-2 justify-center">
              <CTAButtons />
            </LayoutComponent>
          </div>
          <div className="relative z-2" data-hero-code-presenter>
            <BaseSection />
          </div>
        </div>
      </div>
      <ExtendTransformSection />
      <VariantsSection />
    </>
  )
}

export default Page
