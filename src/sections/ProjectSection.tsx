import React, { FC, useState, useEffect, useRef } from "react";
import axios from "axios";

import wpAPIPath from "../global/wpAPIPath";

const ProjectSection: FC = () => {
    const [projects, setProjects] = useState<[]>([]);
    const projectSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProjects = async() => {
            try {
                const response = await axios.get(wpAPIPath + "portfolio-projects");
                setProjects(response.data);
            } catch(err) {
                console.error("Error fetching featured projects:", err);
            }
        }

        fetchProjects();
    }, []);

    const parseHTML = (htmlString: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        return Array.from(doc.body.childNodes);
      };

    return (
        <section ref={projectSectionRef} id="projectSection" className="min-h-screen pt-8">
            <h1 className="font-semibold text-xl">// FEATURED PROJECTS</h1>
            {projects.length > 0 && (
                projects.map(project => (
                    <article key={project.slug}>
                        <div dangerouslySetInnerHTML={{ __html: project.title.rendered }} />
                        <p>{project.acf.overview}</p>
                    {/* 
                        {project.acf.concept.map((concept, i) => (
                            <div key={i}>
                                <h3>{concept.content_title}</h3>
                                <div dangerouslySetInnerHTML={{ __html: concept.content_description }} />
                            </div>
                        ))} */}
                    </article>
                ))
            )}
        </section>
    )
}

export default ProjectSection;