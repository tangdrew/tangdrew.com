import React from "react"
import { GatsbyLinkProps } from "gatsby"
import { default as TLink } from "gatsby-plugin-transition-link"

interface LocationContextState {
  history: string[]
}

export const TransitionLink: React.FC<GatsbyLinkProps<
  LocationContextState
>> = ({ children, ...rest }) => (
  <TLink
    exit={{ length: 0.5 }}
    entry={{ length: 0.5, delay: 1 }}
    {...(rest as any)}
  >
    {children}
  </TLink>
)
