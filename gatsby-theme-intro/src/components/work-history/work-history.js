import React from "react"
import { arrayOf, shape, WorkHistoryType } from "../../types"
import "./work-history.css"
import { FaBriefcase, FaBuilding, FaCode, FaLaptopCode } from "react-icons/fa"

const WorkHistory = ({ history }) => {
  // Function to get an appropriate icon based on company name
  const getCompanyIcon = (company, index) => {
    // Rotate through different icons based on index
    const icons = [
      <FaLaptopCode className="w-5 h-5 text-lead" />,
      <FaBuilding className="w-5 h-5 text-lead" />,
      <FaCode className="w-5 h-5 text-lead" />,
      <FaBriefcase className="w-5 h-5 text-lead" />
    ];
    
    return icons[index % icons.length];
  };
  return (
    <>
      <h5 id="work-history" className="font-header font-bold text-front text-2xl uppercase mt-8 mb-5 sticky top-0 bg-back z-50 py-2 border-b-2 border-line">
        Work history
      </h5>
      <div className="history flex flex-col relative pt-6 pb-6">
        {history.map(({ company, period, position, url }, i) => (
          <div
            className="history-entry relative w-1/2 py-4 work-history-entry"
            key={`${company}_${i}`}
          >
            <span className="dot-bg w-14 h-14 absolute bg-line inline-flex rounded-full items-center justify-center transition-all duration-300">
              <span className="dot w-10 h-10 bg-back-light rounded-full transition-all duration-300 flex items-center justify-center">
                {getCompanyIcon(company, i)}
              </span>
            </span>
            {url ? (
              <h4 className="subpixel-antialiased">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-75 transition-opacity duration-150"
                >
                  {company}
                </a>
              </h4>
            ) : (
              <h4 className="subpixel-antialiased">{company}</h4>
            )}

            {position && (
              <h5 className="text-sm font-normal mb-1 font-mono">{position}</h5>
            )}
            {period && (
              <span className="text-sm font-medium opacity-50 font-mono">{period}</span>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

WorkHistory.propTypes = {
  history: arrayOf(shape(WorkHistoryType)),
}

export default WorkHistory
