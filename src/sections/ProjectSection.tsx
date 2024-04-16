import { FC, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { featuredProjectsAPIPath} from "../global/wpAPIPath";
import { RootState } from "../store/store";
import { Embedded } from "../interfaces/interfaces";

import FeaturedImage from "../components/FeaturedImage";

// Define the structure of the Project object
interface Project {
    title: {
        rendered: string;
    };
    featured_media: number;
    acf: {
        sub_title: string;
        live_site_link: string;
        github_repo_link: string;
    };
    _embedded: Embedded;
}

const ProjectSection: FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const projectSectionRef = useRef<HTMLDivElement>(null);
    const isMobile = useSelector((state: RootState) => state.isMobile.isMobile);

    useEffect(() => {
        const fetchProjects = async() => {
            try {
                const response = await axios.get(featuredProjectsAPIPath);
                setProjects(response.data);
            } catch(err) {
                console.error("Error fetching featured projects:", err);
            }
        }

        fetchProjects();
    }, []);

    return (
        <section ref={projectSectionRef} id="projectSection" className="pt-8 min-h-screen max-w-[1280px] mx-auto">
            <h2 className="font-semibold text-[1.375rem]">// FEATURED PROJECTS</h2>
            {projects.length > 0 && (
                projects.map((project) => (
                    <article 
                        key={ project.title.rendered } 
                        className={`flex ${isMobile ? "flex-col" : "flex-row"}`}
                    >
                        {project.featured_media !== 0 && project._embedded && 
                            <div className={`${isMobile ? "" : "w-1/2"}`}>
                                <figure>
                                    <FeaturedImage featuredImageObject={project._embedded["wp:featuredmedia"][0]} />
                                </figure>
                            </div>
                        }
                        <div className={`p-2  ${isMobile ? "" : "w-1/2"}`}>
                            <div>
                                <h4>{project.title.rendered}</h4>
                                <p>{project.acf.sub_title}</p>
                                <p>{project._embedded["acf:post"].map((techStack) => techStack.title.rendered).join(" | ")}</p>
                            </div>
                            <div>
                                <Link to="/">VIEW MORE</Link>
                                <Link to={project.acf.live_site_link}>LIVE SITE</Link>
                            </div>

                        </div>
                    </article>
                ))
            )}
        </section>
    )
}

export default ProjectSection;