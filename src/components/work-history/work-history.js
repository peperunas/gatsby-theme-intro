import React from "react"
import { arrayOf, shape, WorkHistoryType } from "../../types"
import "./work-history.css"
import { FaBriefcase, FaBuilding, FaCode, FaLaptopCode } from "react-icons/fa"
import * as FaIcons from "react-icons/fa"
import * as SiIcons from "react-icons/si"
import * as DiIcons from "react-icons/di"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const WorkHistory = ({ history }) => {
  // Function to get an appropriate icon or image based on company name, logo property, or logoImage
  const getCompanyLogo = (company, logo, logoImage, index) => {
    // If a custom image is provided, use it
    if (logoImage) {
      console.log("Logo image data:", logoImage); // Debug log
      
      // Check if it's an SVG file
      const isSvg = logoImage.extension === 'svg' || 
                   (logoImage.publicURL && logoImage.publicURL.endsWith('.svg'));
      
      // For SVG files, we need to use the publicURL
      if (isSvg && logoImage.publicURL) {
        return (
          <img 
            src={logoImage.publicURL} 
            alt={`${company} logo`} 
            className="w-8 h-8 rounded-full object-contain"
          />
        );
      }
      
      // For regular images with childImageSharp
      if (logoImage.childImageSharp) {
        const image = getImage(logoImage);
        if (image) {
          return (
            <GatsbyImage 
              image={image} 
              alt={`${company} logo`} 
              className="w-8 h-8 rounded-full object-contain"
            />
          );
        }
      }
      
      // If we have a publicURL but it's not an SVG, use it directly
      if (logoImage.publicURL) {
        return (
          <img 
            src={logoImage.publicURL} 
            alt={`${company} logo`} 
            className="w-8 h-8 rounded-full object-contain"
          />
        );
      }
      
      // Last resort: try to use the raw file path
      const filePath = logoImage.absolutePath || logoImage.relativePath;
      if (filePath) {
        return (
          <img 
            src={filePath} 
            alt={`${company} logo`} 
            className="w-8 h-8 rounded-full object-contain"
          />
        );
      }
    }
    
    // If a logo icon name is specified, try to use it from react-icons
    if (logo) {
      // Check if it's a Font Awesome icon (Fa prefix)
      if (logo.startsWith("Fa") && FaIcons[logo]) {
        const Icon = FaIcons[logo];
        return <Icon className="w-5 h-5 text-lead" />;
      }
      // Check if it's a Simple Icons icon (Si prefix)
      else if (logo.startsWith("Si") && SiIcons[logo]) {
        const Icon = SiIcons[logo];
        return <Icon className="w-5 h-5 text-lead" />;
      }
      // Check if it's a Devicons icon (Di prefix)
      else if (logo.startsWith("Di") && DiIcons[logo]) {
        const Icon = DiIcons[logo];
        return <Icon className="w-5 h-5 text-lead" />;
      }
    }
    
    // Fallback to default icons if logo isn't specified or not found
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
            className={`history-entry relative w-1/2 py-4 work-history-entry ${url ? 'cursor-pointer' : ''}`}
            key={`${company}_${i}`}
            onClick={() => url && window.open(url, '_blank', 'noopener,noreferrer')}
            style={{ 
              transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
            }}
            onMouseOver={url ? (e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            } : undefined}
            onMouseOut={url ? (e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            } : undefined}
          >
            <span className="dot-bg w-14 h-14 absolute bg-line inline-flex rounded-full items-center justify-center transition-all duration-300">
              <span className="dot w-10 h-10 bg-back-light rounded-full transition-all duration-300 flex items-center justify-center">
                {getCompanyLogo(company, history[i].logo, history[i].logoImage, i)}
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
