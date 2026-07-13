import ma from '@marmo/react'
import { ExternalLink } from '@unterberg/nivel/icons'
import { type JSX, type KeyboardEvent, useId, useState } from 'react'
import { hasGitUrl, withGithubUrl } from '../util/withGithubUrl'

type CodeExample = 'left' | 'highlight' | 'right'

interface CodePresenterProps {
  leftCode: JSX.Element
  leftCodeLabel: string
  leftCodeRepoLink?: string
  rightCode: JSX.Element
  rightCodeLabel: string
  rightCodeRepoLink?: string
  highlightCode: JSX.Element
  highlightCodeLabel: string
  highlightCodeRepoLink?: string
  smallBoxHeight: number
  hightlightBoxHeight: number
}

const CodePresenter = ({
  leftCode,
  leftCodeLabel,
  leftCodeRepoLink,
  rightCode,
  rightCodeLabel,
  rightCodeRepoLink,
  highlightCode,
  highlightCodeLabel,
  highlightCodeRepoLink,
  smallBoxHeight = 150,
  hightlightBoxHeight = 170,
}: CodePresenterProps) => {
  const presenterId = useId()
  const [activeExample, setActiveExample] = useState<CodeExample>('highlight')
  const examples: { id: CodeExample; label: string }[] = [
    { id: 'left', label: leftCodeLabel },
    { id: 'highlight', label: highlightCodeLabel },
    { id: 'right', label: rightCodeLabel },
  ]

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const tabs = Array.from(
      event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [],
    )
    const currentIndex = tabs.indexOf(event.currentTarget)
    let nextIndex: number | undefined

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1
    }

    if (nextIndex === undefined) {
      return
    }

    event.preventDefault()
    tabs[nextIndex]?.focus()
    tabs[nextIndex]?.click()
  }

  return (
    <Outer>
      <div className="tabs tabs-box tabs-sm col-span-full grid grid-cols-3 md:hidden" role="tablist">
        {examples.map(({ id, label }) => (
          <button
            aria-controls={`${presenterId}-${id}-panel`}
            aria-selected={activeExample === id}
            className={`tab ${activeExample === id ? 'tab-active' : ''}`}
            id={`${presenterId}-${id}-tab`}
            key={id}
            onClick={() => setActiveExample(id)}
            onKeyDown={handleTabKeyDown}
            role="tab"
            tabIndex={activeExample === id ? 0 : -1}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <SmallBox
        aria-labelledby={`${presenterId}-left-tab`}
        className={activeExample === 'left' ? undefined : 'hidden md:block'}
        data-code-presenter-small-left
        id={`${presenterId}-left-panel`}
        role="tabpanel"
      >
        <SmallBoxHeadline>
          {hasGitUrl && leftCodeRepoLink ? (
            <SmallBoxLink href={withGithubUrl(leftCodeRepoLink)}>
              {leftCodeLabel} <ExternalLinkIcon />
            </SmallBoxLink>
          ) : (
            leftCodeLabel
          )}
        </SmallBoxHeadline>
        <SmallBoxCodeBlock $height={smallBoxHeight}>
          <SmallBoxGradient $dir="left" $height={smallBoxHeight} />
          {leftCode}
        </SmallBoxCodeBlock>
      </SmallBox>
      <BigBox
        aria-labelledby={`${presenterId}-highlight-tab`}
        className={activeExample === 'highlight' ? undefined : 'hidden md:block'}
        data-code-presenter-highlight
        id={`${presenterId}-highlight-panel`}
        role="tabpanel"
      >
        {/* <BigBoxShadow $height={hightlightBoxHeight} /> */}
        <h2 className="text-lg mb-4 text-center hidden md:flex items-center justify-center gap-2">
          {hasGitUrl && highlightCodeRepoLink ? (
            <BigBoxLink href={withGithubUrl(highlightCodeRepoLink)}>
              {highlightCodeLabel} <ExternalLinkIcon />
            </BigBoxLink>
          ) : (
            highlightCodeLabel
          )}
        </h2>
        <span
          className="absolute left-1 right-1 aura aura-dual bg-accent/50 text-primary bottom-0 rounded-2xl z-1"
          style={{ height: `${hightlightBoxHeight}px` }}
        />
        <span
          className="absolute bottom-0 bg-base-100 block left-0 w-full rounded-2xl z-3"
          style={{ height: `${hightlightBoxHeight}px` }}
        />
        <BigBoxCodeBlock $height={hightlightBoxHeight}>{highlightCode}</BigBoxCodeBlock>
      </BigBox>
      <SmallBox
        aria-labelledby={`${presenterId}-right-tab`}
        className={activeExample === 'right' ? undefined : 'hidden md:block'}
        data-code-presenter-small-right
        id={`${presenterId}-right-panel`}
        role="tabpanel"
      >
        <SmallBoxHeadline>
          {hasGitUrl && rightCodeRepoLink ? (
            <SmallBoxLink href={withGithubUrl(rightCodeRepoLink)}>
              {rightCodeLabel} <ExternalLinkIcon />
            </SmallBoxLink>
          ) : (
            rightCodeLabel
          )}
        </SmallBoxHeadline>
        <SmallBoxCodeBlock $height={smallBoxHeight}>
          <SmallBoxGradient $dir="right" $height={smallBoxHeight} />
          {rightCode}
        </SmallBoxCodeBlock>
      </SmallBox>
    </Outer>
  )
}
export default CodePresenter

const Outer = ma.div`
  landing-code-samples 
  md:grid grid-cols-12 
  gap-4 mt-8 md:mt-16
  [&_[data-nivel-component="code-choice-group"]]:my-0
  [&_pre]:pb-12
`

const ExternalLinkIcon = ma.extend(ExternalLink)`
  size-3
`

const SmallBox = ma.div`
  small-text 
  relative z-1
  col-span-2 lg:col-span-3
`

const SmallBoxGradient = ma.div<{ $dir?: 'left' | 'right'; $height: CodePresenterProps['smallBoxHeight'] }>`
  ${({ $dir }) => ($dir === 'right' ? 'bg-linear-to-r' : 'bg-linear-to-l')}
  from-base-100/90
  hidden md:block 
  absolute bottom-0 w-full
  z-20 pointer-events-none
  ${({ style, $height }) =>
    style({
      height: `${$height}px`,
    })}
`

const SmallBoxCodeBlock = ma.div<{ $height: CodePresenterProps['smallBoxHeight'] }>`
  h-full w-full relative z-20

  ${({ style, $height }) =>
    style({
      height: `${$height}px`,
    })}
`

const SmallBoxHeadline = ma.h2`
  text-base-muted-medium 
  italic 
  mb-4
  hidden md:flex items-center justify-center gap-2
`

const SmallBoxLink = ma.a`
  text-base-muted-medium 
  flex items-center justify-center gap-2
`

const BigBoxLink = ma.extend(SmallBoxLink)`
  text-base-muted
`

const BigBox = ma.div`
  col-span-8 lg:col-span-6 relative z-20
  md:-translate-y-10
  relative
`

const _BigBoxShadow = ma.div<{ $height: CodePresenterProps['hightlightBoxHeight'] }>`
  hidden md:block 
  absolute top-16 left-px right-px 
  ${({ style, $height }) => style({ height: `${$height - 24}px` })}
`

const BigBoxCodeBlock = ma.div<{ $height: CodePresenterProps['hightlightBoxHeight'] }>`
  h-full w-full relative z-20
  ${({ style, $height }) =>
    style({
      height: `${$height}px`,
    })}
`
