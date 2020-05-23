import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { GatsbyIcon } from "../components/icons/gatsby"
import { Header } from "./header"
import { SiteTitleQueryQuery } from "../../graphql-types"

type TransitionStatus = "entering" | "entered" | "exiting" | "exit"

export const Layout: React.FC<{
  currentPath: string
  history: string[]
  transitionStatus: TransitionStatus
}> = ({ children, currentPath, history, transitionStatus }) => {
  const data = useStaticQuery<SiteTitleQueryQuery>(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="flex flex-col min-h-screen font-main">
      <Header
        currentPath={currentPath || ""}
        title={data.site.siteMetadata.title}
        history={history || []}
        transitionStatus={transitionStatus}
      />
      <main className="flex-grow">{children}</main>
      <footer className="flex px-4 py-2 items-center">
        Andrew © {new Date().getFullYear()}, Built with
        <a
          href="https://www.gatsbyjs.org"
          target="_blank"
          className="px-1 text-purple-500 hover:text-purple-300"
        >
          <GatsbyIcon size={16} />
        </a>
      </footer>
    </div>
  )
}
