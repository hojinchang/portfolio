import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Header from "../components/header/Header";
import ProjectArticle from "../components/project_articles/ProjectArticle";
import Loading from "../components/Loading";
import Footer from "../components/footer";

import { RootState } from "../store/store";
import { ProjectInterface } from "../interfaces/interfaces";
import { projectsAPIPath } from "../global/wpAPIPath";


const ProjectsPage: FC = () => {
    const isMobile = useSelector(( state: RootState ) => state.isMobile.isMobile);
    const [loading, setLoading] = useState<boolean>(true);
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
                // setLoading(false);
            } catch(err) {
                console.error("Error fetching projects:", err);
                setLoading(false);
            }
        }
        fetchProjects();

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // Minimum loading time of 1 second

        return () => clearTimeout(timer);
    }, [])

    if (loading) {
        return (
            <main>
                <Loading />
            </main>
        )
    }

    return (
        <>
            <Header />
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
            <Footer />
        </>
    )
}

export default ProjectsPage;