import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

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
        <main className={ `${ isMobile ? "pb-20" : "" }` }>
            <section className="max-w-[1400px] mx-auto mt-28">
                <h1 className="font-bold text-9xl text-center mb-16">PROJECTS</h1>
                <p className="text-center text-neutral-400">Here is a showcase of all of my projects.</p>
            </section>
            <section className="max-w-5xl mx-auto">
                <div>Project</div>
            </section>
        </main>
    )
}

export default ProjectsPage;