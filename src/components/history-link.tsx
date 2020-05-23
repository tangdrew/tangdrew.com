import React from "react"
import { useLocation, WindowLocation } from "@reach/router"
import { GatsbyLinkProps } from "gatsby"
import { TransitionLink } from "./transition-link"

interface LocationContextState {
  history: string[]
}

export const HistoryLink: React.FC<GatsbyLinkProps<LocationContextState>> = ({
  children,
  state,
  ...rest
}) => {
  const location: WindowLocation<LocationContextState> = useLocation() as any
  const history = (location.state && location.state.history) || []
  return (
    <TransitionLink
      state={{
        history: [...history, location.pathname.replace("/notes", "")],
        ...state
      }}
      {...(rest as any)}
    >
      {children}
    </TransitionLink>
  )
}
