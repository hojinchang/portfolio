import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import ProjectArticle from "../components/project_articles/ProjectArticle";
import { RootState } from "../store/store";
import { ProjectInterface } from "../interfaces/interfaces";
import { projectsAPIPath } from "../global/wpAPIPath";


const ProjectsPage: FC = () => {
    const isMobile = useSelector(( state: RootState ) => state.isMobile.isMobile);
    const [projects, setProjects] = useState<ProjectInterface[]>([]);


    // Scroll to the top of the page when the page mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchProjects = async() => {
            try {
                const response = await axios.get(projectsAPIPath);
                setProjects(response.data);
            } catch(err) {
                console.error("Error fetching projects:", err);
            }
        }

        fetchProjects();
    }, [])

    return (
        <main className={ `px-4 ${ isMobile ? "pb-20" : "" }` }>
            <section className="max-w-[1400px] mx-auto mt-28 mb-16">
                <h1 className="font-bold text-center mb-12 text-5xl 2xs:text-6xl sm:text-7xl lg:text-8xl xl:text-9xl">PROJECTS</h1>
                <p className="text-center text-neutral-400">Here is a showcase of all of my projects.</p>
            </section>
            <section className="max-w-5xl mx-auto">
                <div className="mx-auto grid gap-4 grid-cols-1 max-w-[400px] sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
                    {projects.length > 0 && (
                        projects.map(( project ) => (
                            <ProjectArticle key={ project.title.rendered } project={ project } />
                        ))
                    )}
                </div>
            </section>
        </main>
    )
}

export default ProjectsPage;