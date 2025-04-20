import React from "react"
import Publication from "./publication"

const Publications = ({ publications }) => {
  return (
    <div className="w-full overflow-hidden">
      <h5 id="publications" className="font-header font-bold text-front text-2xl uppercase mt-8 mb-5 sticky top-0 bg-back z-50 py-2 border-b-2 border-line">
        Publications
      </h5>
      {publications.map((publication, i) => (
        <Publication key={`${publication.title}_${i}`} {...publication} />
      ))}
    </div>
  )
}

export default Publications
