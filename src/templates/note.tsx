import React from "react"
import { graphql } from "gatsby"

import { Note } from "../components/note"
import { Layout } from "../components/layout"

export const query = graphql`
  query BrainNoteWithRefsBySlug($slug: String!) {
    brainNote(slug: { eq: $slug }) {
      slug
      title
      childMdx {
        body
      }
      inboundReferenceNotes {
        title
        slug
        childMdx {
          excerpt
        }
      }
      outboundReferenceNotes {
        title
        slug
        childMdx {
          excerpt
        }
      }
    }
  }
`

const NoteTemplate = props => {
  let className = ""
  switch (props.transitionStatus) {
    case "entering":
      className = "transition transform -translate-x-full"
      break
    case "entered":
      className = "transition ease-out transform duration-300"
      break
    case "exiting":
      className = "transition opacity-100 transform"
    case "exited":
      className =
        "transition ease-in opacity-0 transform translate-x-full duration-300"
      break
  }
  return (
    <Layout
      currentPath={props.location.pathname}
      history={props.location.state?.history || []}
      transitionStatus={props.transitionStatus}
    >
      <div className={className}>
        <Note note={props.data} />
      </div>
    </Layout>
  )
}

export default NoteTemplate
