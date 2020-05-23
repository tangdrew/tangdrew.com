import React from "react"
import { HistoryLink } from "../../components/history-link"
import { default as Tippy } from "@tippyjs/react/headless"

const bracketRegexInclusive = /\[\[.*?\]\]/g
const bracketRegexInclusiveCaptured = /(\[\[.*?\]\])/g

const HighlightLinks: React.FC<{ content: string }> = ({ content }) => (
  <>
    {content.split(bracketRegexInclusiveCaptured).map((s, i) => {
      if (bracketRegexInclusive.test(s)) {
        return (
          <span className="text-purple-500" key={i}>
            {s}
          </span>
        )
      }
      return <span key={i}>{s}</span>
    })}
  </>
)

export const AnchorTag = ({
  outboundReferenceNotes
}: {
  outboundReferenceNotes: { [href: string]: string }
}) => ({ href, ...restProps }) => {
  const reference = outboundReferenceNotes[href]
  return (
    <Tippy
      placement="top"
      duration={600}
      interactive={true}
      render={attrs => (
        <div
          className="rounded p-4 max-w-lg h-auto bg-gray-100 border-2 border-gray-300 focus:outline-none focus:shadow-outline max-w-xs"
          tabIndex={-1}
          {...attrs}
        >
          {reference ? <HighlightLinks content={reference} /> : href}
        </div>
      )}
    >
      <span className="text-purple-500 hover:text-purple-300">
        {reference ? (
          <HistoryLink {...restProps} to={href} />
        ) : (
          <a {...restProps} href={href} />
        )}
      </span>
    </Tippy>
  )
}
