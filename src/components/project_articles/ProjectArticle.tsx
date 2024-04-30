import { FC } from "react";
import { Link } from "react-router-dom";

import { ProjectInterface } from "../../interfaces/interfaces";
import { decodeHTMLEntities, reverseTechStackArray } from "../../global/utilityFunctions";

interface ProjectArticleProps {
    project: ProjectInterface;
}

const ProjectArticle: FC<ProjectArticleProps> = ({ project }) => {
    // Escape characters in the title
    const projectTitle = decodeHTMLEntities(project.title.rendered);
    // Reverse the tech stack array
    const reversedTechStack = reverseTechStackArray(project);

    return (
        <article className="project-article flex flex-col gap-4" >
            {project.featured_media !== 0 && project._embedded && 
                <div>
                    <figure>
                        <img className="rounded-lg" src={ project._embedded["wp:featuredmedia"][0].source_url } />
                    </figure>
                </div>
            }
            <div className="flex flex-col justify-between gap-6 h-full">
                <div className="flex flex-col gap-2">
                    <h3 className="font-medium text-2xl">{ projectTitle }</h3>
                    <p>{ project.acf.sub_title }</p>
                    <p className="text-neutral-400 text-sm leading-normal">{ reversedTechStack.map(( techStack ) => techStack.title.rendered).join(" | ") }</p>
                </div>
                <div className="flex justify-center gap-8">
                    <Link to={ `/project/${project.slug}` } className="underline p-2 link-hover">VIEW MORE</Link>
                    <Link to={ project.acf.live_site_link } target="_blank" className="underline p-2 link-hover">LIVE SITE</Link>
                </div>
            </div>
        </article>
    )
}

export default ProjectArticle;