import React from "react"
import About from "../about/about"
import Projects from "../projects/projects"
import Publications from "../publications/publications"
import WorkHistory from "../work-history/work-history"

const MainContent = ({ history, projects, publications, profile, githubUsername }) => {
  return (
    <main className="lg:w-2/3 lg:pl-8 xl:pl-12 pt-16 pb-8 mb-0">
      {profile.about && <About about={profile.about} />}
      {publications && publications.length > 0 && <Publications publications={publications} />}
      <Projects projects={projects} githubUsername={githubUsername} />
      <WorkHistory history={history} />
    </main>
  )
}

export default MainContent
