import { LayoutComponent } from '@unterberg/nivel'
import CTAButtons from './CTA'

import './startpage.css'
import BaseSection from './Base'
import ExtendTransformSection from './ExtendTransform'
import VariantsSection from './Variants'

const Page = () => {
  return (
    <div className="landing-code-samples">
      <div
        data-beasties-container
        className="overflow-x-clip min-h-[calc(100svh-14*var(--spacing))] flex flex-col justify-center w-full"
      >
        <div className="absolute top-0 left-0 right-0 h-[calc(50svh+16*var(--spacing))] z-0 ">
          <img src="/bg-dark-strong.png" alt="" className="hidden dark:block absolute w-full h-full object-fill" />
          <img src="/bg-light-strong.png" alt="" className="dark:hidden absolute w-full h-full object-fill" />
        </div>
        <div className="absolute top-0 left-0 h-[calc(50svh+16*var(--spacing))] w-full bg-radial-[at_50%_15%] from-base-100 to-65% dark:from-base-100 z-0" />
        <div className="absolute top-0 left-0 right-0 bg-linear-to-b from-base-100 from-10% via-transparent to-base-100 z-4 h-[calc(50svh+16*var(--spacing))]" />
        <div className="mt-24 mb-12 z-5">
          <LayoutComponent className="relative">
            <div className="text-center mx-auto z-2 relative">
              <div className="px-8">
                <img
                  src="/marmo-dark.svg"
                  alt="marmo logo"
                  className="mx-auto mb-8 w-12 h-12 dark:hidden"
                  width={20}
                  height={20}
                />
                <img
                  src="/marmo-light.svg"
                  alt="marmo logo"
                  className="mx-auto mb-8 w-12 h-12 hidden dark:block"
                  width={20}
                  height={20}
                />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                  Component factory for <span className="text-nowrap">utility-first UI</span>
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
        <BaseSection />
        <ExtendTransformSection />
        <VariantsSection />
      </div>
    </div>
  )
}

export default Page
