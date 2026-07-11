import cm from '@classmatejs/react'
import { ExternalLink } from '@unterberg/nivel/icons'
import type { JSX } from 'react'
import { hasGitUrl, withGithubUrl } from '../util/withGithubUrl'

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
  return (
    <Outer>
      <SmallBox data-code-presenter-small-left>
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
      <BigBox data-code-presenter-highlight>
        {/* <BigBoxShadow $height={hightlightBoxHeight} /> */}
        <h2 className="text-lg mb-4 text-center flex items-center justify-center gap-2">
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
      <SmallBox data-code-presenter-small-right>
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

const Outer = cm.div`
  landing-code-samples 
  md:grid grid-cols-12 
  gap-4 mt-16
  [&_[data-nivel-component="code-choice-group"]]:my-0
  [&_pre]:pb-12
`

const ExternalLinkIcon = cm.extend(ExternalLink)`
  size-3
`

const SmallBox = cm.div`
  small-text 
  relative z-1
  col-span-2 lg:col-span-3
`

const SmallBoxGradient = cm.div<{ $dir?: 'left' | 'right'; $height: CodePresenterProps['smallBoxHeight'] }>`
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

const SmallBoxCodeBlock = cm.div<{ $height: CodePresenterProps['smallBoxHeight'] }>`
  h-full w-full relative z-20

  ${({ style, $height }) =>
    style({
      height: `${$height}px`,
    })}
`

const SmallBoxHeadline = cm.h2`
  text-base-muted-medium 
  italic 
  mb-4
  flex items-center justify-center gap-2
`

const SmallBoxLink = cm.a`
  text-base-muted-medium 
  flex items-center justify-center gap-2
`

const BigBoxLink = cm.extend(SmallBoxLink)`
  text-base-muted
`

const BigBox = cm.div`
  col-span-8 lg:col-span-6 relative z-20
  md:-translate-y-10
  relative
`

const _BigBoxShadow = cm.div<{ $height: CodePresenterProps['hightlightBoxHeight'] }>`
  hidden md:block 
  absolute top-16 left-px right-px 
  ${({ style, $height }) => style({ height: `${$height - 24}px` })}
`

const BigBoxCodeBlock = cm.div<{ $height: CodePresenterProps['hightlightBoxHeight'] }>`
  h-full w-full relative z-20
  ${({ style, $height }) =>
    style({
      height: `${$height}px`,
    })}
`
