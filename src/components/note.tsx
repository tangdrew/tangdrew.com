import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"

import { BrainNoteWithRefsBySlugQuery } from "../../graphql-types"
import { Link } from "gatsby"
import { AnchorTag } from "./mdx-components/anchor-tag"
import { HistoryLink } from "./history-link"

interface Props {
  note: BrainNoteWithRefsBySlugQuery
}

export const Note: React.FC<Props> = ({ note }) => {
  const { brainNote } = note
  brainNote.inboundReferenceNotes = brainNote.inboundReferenceNotes || []
  brainNote.outboundReferenceNotes = brainNote.outboundReferenceNotes || []

  const outboundReferenceNotes = brainNote.outboundReferenceNotes.reduce(
    (accum, note) => ({
      ...accum,
      ["/notes/" + note.slug]: note.childMdx.excerpt
    }),
    {}
  )

  return (
    <div className="py-8 px-16 md:px-64">
      <MDXProvider
        components={{
          a: AnchorTag({ outboundReferenceNotes }),
          p: ({ children }) => <p className="py-1">{children}</p>,
          h2: ({ children }) => (
            <h2 className="text-lg font-bold">{children}</h2>
          ),
          li: ({ children }) => (
            <li className="list-inside list-disc">{children}</li>
          )
        }}
      >
        <div id="note">
          <div>
            <p className="text-4xl text-bold">{brainNote.title}</p>
          </div>
          <div className="py-2">
            <MDXRenderer>{brainNote.childMdx.body}</MDXRenderer>
          </div>
        </div>
        {brainNote.inboundReferenceNotes.length > 0 && (
          <div className="p-4 rounded border-2 bg-gray-100 border-gray-200">
            <p className="text-xl italic">Referenced In</p>
            <ul className="list-inside">
              {brainNote.inboundReferenceNotes.map(note => (
                <li key={note.slug}>
                  <HistoryLink
                    to={`/notes/${note.slug}`}
                    className="text-purple-500 hover:text-purple-300"
                  >
                    {note.childMdx.excerpt}
                  </HistoryLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </MDXProvider>
    </div>
  )
}
