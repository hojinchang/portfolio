import { FC, useState, useEffect, useRef } from "react";
import axios from "axios";

import { featuredProjectsAPIPath} from "../global/wpAPIPath";
import { Project } from "../interfaces/interfaces";
import ProjectArticle from "../components/ProjectArticle";


const ProjectSection: FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const projectSectionRef = useRef<HTMLDivElement>(null);

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
        <section ref={projectSectionRef} id="projectSection" className="pt-10 min-h-screen max-w-[1280px] mx-auto">
            <h2 className="section-title">// FEATURED PROJECTS</h2>
            {projects.length > 0 && (
                projects.map((project) => (
                    <ProjectArticle project={project} />
                ))
            )}
        </section>
    )
}

export default ProjectSection;