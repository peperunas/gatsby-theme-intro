import { string } from "prop-types"

export const PublicationType = {
  title: string.isRequired,
  authors: string.isRequired,
  journal: string.isRequired,
  year: string.isRequired,
  abstract: string,
  pdfUrl: string,
  citation: string,
}
