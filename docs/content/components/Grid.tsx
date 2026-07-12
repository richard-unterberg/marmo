import cm from '@classmatejs/react'

export const StyledDualGrid = cm.div`
  grid grid-cols-1 md:grid-cols-2 md:gap-5
  px-5 
  rounded-xl 
  bg-base-muted-superlight
  border border-base-muted-light
`

export const StyledGridCol = cm.div`
  flex flex-col 

  not-prose
  [&_h3]:mt-4 [&_h3]:text-lg [&_h3]:font-semibold
`
