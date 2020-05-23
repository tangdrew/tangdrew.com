import React, { useState } from "react"

import { GithubIcon } from "./icons/github"
import { LinkedInIcon } from "./icons/linkedin"
import { TransitionLink } from "./transition-link"

type TransitionStatus = "entering" | "entered" | "exiting" | "exit"

interface Props {
  title: string
  currentPath: string
  history: string[]
  transitionStatus: TransitionStatus
}

const Dropdown: React.FC<{ paths: string[] }> = ({ paths }) => (
  <div className="absolute top-20 rounded flex flex-col shadow-lg z-10 bg-white">
    {paths.map((path, i) => (
      <div key={i}>
        <TransitionLink
          to={`/notes/${path}`}
          className="no-underline text-lg text-purple-500 hover:text-purple-300 p-2"
        >
          {path}
        </TransitionLink>
        {i < paths.length - 1 && <hr className="border-1" />}
      </div>
    ))}
  </div>
)

const Title: React.FC<Props> = ({
  title,
  currentPath,
  history,
  transitionStatus
}) => {
  const Tilde = () => (
    <TransitionLink
      to="/"
      className="no-underline text-2xl text-purple-500 hover:text-purple-300"
    >
      {title}
    </TransitionLink>
  )

  if (currentPath === "/") return <Tilde />

  const historyWithCurrent = [...history, currentPath.replace("/notes", "")]

  const lastTwo = historyWithCurrent.slice(-2)

  const Ellipsis: React.FC<{ paths: string[] }> = ({ paths }) => {
    const [dropdown, setDropdown] = useState(false)
    return (
      <div>
        <div
          className="text-2xl text-purple-500 hover:text-purple-300 cursor-pointer"
          onClick={() => setDropdown(!dropdown)}
        >
          /...
        </div>
        {dropdown && (
          <div className="absolute top-20 rounded flex flex-col shadow-lg z-10">
            <Dropdown paths={paths} />
          </div>
        )}
      </div>
    )
  }

  const entering = (transitionStatus === "entering" && "typing") || ""
  const exiting = (transitionStatus === "exiting" && "backspacing") || ""

  return (
    <div className={`flex justify-start`}>
      <div className={`flex typewriter ${entering} ${exiting}`}>
        <Tilde />
        {historyWithCurrent.length > 2 && (
          <Ellipsis paths={historyWithCurrent.slice(0, -2)} />
        )}
        {lastTwo.map((path, i) => (
          <TransitionLink
            key={i}
            to={`/notes/${path}`}
            className={`no-underline text-2xl text-purple-500 hover:text-purple-300`}
          >
            {path}
          </TransitionLink>
        ))}
      </div>
      <div className="cursor text-2xl text-orange-500">|</div>
    </div>
  )
}

export const Header: React.FC<Props> = ({
  title,
  currentPath,
  history,
  transitionStatus
}) => {
  return (
    <header>
      <div className="flex justify-between items-center px-4 py-2 ">
        <Title
          title={title}
          currentPath={currentPath}
          history={history}
          transitionStatus={transitionStatus}
        />
        <div className="flex justify-end">
          <a
            href="https://github.com/tangdrew"
            target="_blank"
            className="px-1 text-purple-500 hover:text-purple-300"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href="https://linkedin.com/in/andrew-tang-033a6088"
            target="_blank"
            className="px-1 text-purple-500 hover:text-purple-300"
          >
            <LinkedInIcon size={16} />
          </a>
        </div>
      </div>
    </header>
  )
}
