import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { default as Link } from "gatsby-plugin-transition-link"

import "../styles/index.css"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { BrainNoteListQuery } from "../../graphql-types"

const NoteCard: React.FC<{ slug: string; title: string }> = ({
  slug,
  title
}) => {
  return (
    <div className="flex p-2 rounded shadow border border-transparent hover:border-blue-300">
      <Link
        to={`/notes/${slug}`}
        className="text-purple-500 hover:text-purple-300"
      >
        {title}
      </Link>
    </div>
  )
}

const NoteList = () => {
  const { allBrainNote } = useStaticQuery<BrainNoteListQuery>(graphql`
    query BrainNoteList {
      allBrainNote {
        nodes {
          id
          title
          slug
        }
      }
    }
  `)
  return (
    <div className="grid grid-cols-3 gap-2 py-4">
      {allBrainNote.nodes.map(note => (
        <NoteCard key={note.id} {...note} />
      ))}
    </div>
  )
}

const Home = () => {
  return (
    <div className="flex flex-col p-8">
      <div className="py-8">
        <p className="text-4xl font-bold">Hi, I'm Andrew.</p>
        <p className="text-2xl">
          Currently, I'm working as a Software Engineer{" "}
          <a
            href="https://www.canceriq.com"
            className="text-purple-500 hover:text-purple-300"
          >
            @CancerIQ
          </a>
          .
        </p>
      </div>
      <div className="rounded border-dotted border-2 p-2">
        <p>
          This is my experimental digital garden; a collection of notes and
          thoughts in a varying range of baked-ness.
        </p>
        <NoteList />
      </div>
    </div>
  )
}

const IndexPage = ({ location, transitionStatus }) => {
  return (
    <Layout
      currentPath={location.pathname}
      history={location.state?.history || []}
      transitionStatus={transitionStatus}
    >
      <SEO title="Home" />
      <Home />
    </Layout>
  )
}

export default IndexPage
