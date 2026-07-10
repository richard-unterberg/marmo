import { LayoutComponent } from '@unterberg/nivel'

const ExtendTransformSection = () => {
  return (
    <div className="relative mt-32 mb-16 ">
      <div className="absolute top-0 left-0 right-0 h-[50svh] z-0">
        {/* lazy load */}
        <img
          src="/bg-dark-alt1.png"
          alt=""
          className="hidden dark:block absolute w-full h-full object-fill"
          loading="lazy"
        />
        <img
          src="/bg-light-alt1.png"
          alt=""
          className="dark:hidden absolute w-full h-full object-fill"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 right-0 h-full bg-linear-to-b from-base-100 via-transparent to-base-100" />
      </div>
      <LayoutComponent $size="xs" className="flex flex-col gap-8 min-h-svh">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center">Extend and Transform</h1>
        <p className="text-lg text-base-muted">
          With variants, you can easily create reusable components with different styles and behaviors based on props.
          This allows for a more maintainable and scalable codebase.
        </p>
      </LayoutComponent>
    </div>
  )
}

export default ExtendTransformSection
