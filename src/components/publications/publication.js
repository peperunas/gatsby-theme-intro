import React, { useState } from "react"
import { FaDownload, FaQuoteRight, FaChevronDown, FaChevronUp } from "react-icons/fa"

const Publication = ({ title, authors, journal, year, abstract, pdfUrl, citation, url }) => {
  const [showCitation, setShowCitation] = useState(false)

  return (
    <div 
      className="border-t-4 border-line relative flex flex-wrap p-4 lg:p-8 bg-no-repeat text-sm mb-8 overflow-hidden project-card"
      style={{ 
        transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Background Year - Fixed position */}
      <div className="fixed-year absolute opacity-10" 
           style={{ 
             right: '5%', 
             top: '100px', 
             pointerEvents: 'none', 
             zIndex: 0,
             position: 'absolute'
           }}>
        <span className="text-8xl font-black text-front" style={{ 
            fontSize: '8rem',
            textAlign: 'right',
            display: 'block'
          }}>
          {year}
        </span>
      </div>
      <div className="w-full">
        {/* Title */}
        <div 
          className="px-3 py-2 pt-1 w-full mb-4 project-title cursor-pointer"
          onClick={() => pdfUrl && window.open(pdfUrl.startsWith('http') ? pdfUrl : `/static/papers/${pdfUrl}`, '_blank', 'noopener,noreferrer')}
        >
          <h3 className="font-bold text-front text-lg uppercase tracking-wider">
            {pdfUrl ? (
              <a 
                href={pdfUrl.startsWith('http') ? pdfUrl : `${pdfUrl}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-front hover:text-lead transition-colors duration-200 underline"
                onClick={(e) => e.stopPropagation()}
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
        </div>
        
        {/* Authors and Journal */}
        <div 
          className="w-full my-4 p-3 cursor-pointer"
          onClick={() => pdfUrl && window.open(pdfUrl.startsWith('http') ? pdfUrl : `${pdfUrl}`, '_blank', 'noopener,noreferrer')}
        >
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
        <div className="flex flex-wrap mt-4 gap-4 px-3">
          {pdfUrl && (
            <a 
              href={pdfUrl.startsWith('http') ? pdfUrl : `${pdfUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center px-4 py-2 bg-lead text-white rounded-lg transition-all duration-300 hover:bg-opacity-90"
            >
              <FaDownload className="mr-2" />
              Download PDF
            </a>
          )}
          
          {citation && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowCitation(!showCitation);
              }}
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
          <div className="mt-4 p-4 mx-3 bg-lead bg-opacity-5 rounded-lg border border-line font-mono text-sm overflow-x-auto">
            <pre className="whitespace-pre-wrap">{citation}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default Publication
