import React, { useState } from "react"
import { PublicationType } from "../../types"
import { FaDownload, FaQuoteRight, FaChevronDown, FaChevronUp } from "react-icons/fa"

const Publication = ({ title, authors, journal, year, abstract, pdfUrl, citation }) => {
  const [showCitation, setShowCitation] = useState(false)

  return (
    <div className="border-t-4 border-line relative flex flex-wrap p-4 lg:p-8 bg-no-repeat text-sm mb-8 overflow-hidden project-card">
      <div className="w-full">
        {/* Title */}
        <div className="px-3 py-2 pt-1 w-full mb-4 project-title">
          <h3 className="font-bold text-front text-lg uppercase tracking-wider">
            {title}
          </h3>
        </div>
        
        {/* Authors and Journal */}
        <div className="w-full my-4 p-3">
          <p className="text-front text-base leading-relaxed font-mono">
            <span className="font-semibold">Authors:</span> {authors}
          </p>
          <p className="text-front text-base leading-relaxed font-mono mt-2">
            <span className="font-semibold">Published in:</span> {journal}, {year}
          </p>
          
          {abstract && (
            <div className="mt-4">
              <p className="text-front text-base leading-relaxed font-mono">
                <span className="font-semibold">Abstract:</span> {abstract}
              </p>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap mt-4 gap-4">
          {pdfUrl && (
            <a 
              href={`/papers/${pdfUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-lead text-back-light rounded-lg transition-all duration-300 hover:bg-opacity-90"
            >
              <FaDownload className="mr-2" />
              Download PDF
            </a>
          )}
          
          {citation && (
            <button 
              onClick={() => setShowCitation(!showCitation)}
              className="inline-flex items-center px-4 py-2 bg-lead bg-opacity-10 text-front rounded-lg transition-all duration-300 hover:bg-opacity-20"
            >
              <FaQuoteRight className="mr-2" />
              {showCitation ? "Hide Citation" : "Show Citation"}
              {showCitation ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
            </button>
          )}
        </div>
        
        {/* Citation Box */}
        {citation && showCitation && (
          <div className="mt-4 p-4 bg-lead bg-opacity-5 rounded-lg border border-line font-mono text-sm overflow-x-auto">
            <pre className="whitespace-pre-wrap">{citation}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

Publication.propTypes = PublicationType

export default Publication
