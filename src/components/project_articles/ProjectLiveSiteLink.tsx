import { FC } from "react";
import { ProjectInterface } from "../../interfaces/interfaces";

interface Props {
    project: ProjectInterface
}

const ProjectLiveSiteLink:FC<Props> = ({ project }) => {

    return (
        <>
            {project.acf.live_site_link ? (
                <a href={ project.acf.live_site_link } target="_blank" className="underline p-2 lg:text-lg link-hover">LIVE SITE</a>
            ) : (
                <a href="#" className="underline p-2 lg:text-lg pointer-events-none opacity-50" onClick={(e) => e.preventDefault()}>IN PROGRESS</a>
            )}
        </>
    )
}

export default ProjectLiveSiteLink;