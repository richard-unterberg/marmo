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
        <div className="absolute top-0 left-0 right-0 h-[calc(50svh+16*var(--spacing))] z-0 -translate-y-16">
          <img src="/bg-dark-strong.png" alt="" className="hidden dark:block absolute w-full h-full object-fill" />
          <img src="/bg-light-strong.png" alt="" className="dark:hidden absolute w-full h-full object-fill" />
          <div className="absolute top-0 left-0 right-0 h-full bg-linear-to-b from-base-100 from-10% via-transparent to-base-100" />
        </div>
        <div className="mt-24 mb-16">
          <LayoutComponent className="relative">
            <div className="text-center mx-auto z-2 relative">
              <div className=" px-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
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
