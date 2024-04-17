import { FC, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { featuredProjectsAPIPath} from "../global/wpAPIPath";
import { handleHeaderIntersect } from "../global/utilityFunctions";
import { Project } from "../interfaces/interfaces";
import ProjectArticle from "../components/ProjectArticle";


interface ActiveProject {
    project1: boolean;
    project2: boolean;
    project3: boolean;
}

const ProjectSection: FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeProject, setActiveProject] = useState<ActiveProject>({
        project1: true,
        project2: false,
        project3: false
    });
    const [hasAnimated, setHasAnimated] = useState(false);

    const titleRef = useRef<HTMLHeadingElement>(null);
    const titleBorderRef = useRef<HTMLDivElement>(null);
    const viewAllProjectsRef = useRef<HTMLParagraphElement>(null);

    // Set the active project when user clicks pagination dots
    const handlePaginationDots = ( projectNumber: string ) => {
        setActiveProject({
            ...activeProject, 
            project1: projectNumber === "project1" ? true : false,
            project2: projectNumber === "project2" ? true : false,
            project3: projectNumber === "project3" ? true : false,
        });
    }

    // Fetch the featured projects
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
    
    // Watch where the scroll is
    useEffect(() => {
        // Create a new IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            handleHeaderIntersect(
                entries,
                titleBorderRef,
                titleRef,
                viewAllProjectsRef,
                hasAnimated,
                setHasAnimated
            )
        }, {
            root: null, // Use the viewport as the root
            rootMargin: "0px", // No margin around the root
            threshold: 0.1 // Trigger when 10% of the element is visible
        });
    
        // Observe the titleBorderRef element
        if (titleBorderRef.current) {
            observer.observe(titleBorderRef.current);
        }
    
        // Cleanup: Stop observing the element when the component unmounts
        return () => {
            if (titleBorderRef.current) {
                observer.unobserve(titleBorderRef.current);
            }
        };
    }, [hasAnimated]); // Re-run the effect when hasAnimated changes


    return (
        <section id="projectSection" className="flex flex-col pt-10 min-h-screen max-w-[1280px] mx-auto">
            <h2 ref={titleRef} className="section-title">// FEATURED PROJECTS</h2>
            <div ref={titleBorderRef} className="title-border border-b-2 border-neutral-200 mb-6"></div>
            <p ref={viewAllProjectsRef} className="self-end">
                <Link  to="/projects" className="block font-medium p-4 lg:text-lg link-hover">{"< VIEW ALL PROJECTS />"}</Link>
            </p>
            <div className="flex flex-col gap-6">
                <div>
                    {/* {projects.length > 0 && (
                        projects.map((project) => (
                            <ProjectArticle key={ project.title.rendered }  project={ project } />
                        ))
                    )} */}
                    {projects.length > 0 && (
                        
                        <ProjectArticle key={ projects[0].title.rendered }  project={ projects[0] } />
                    
                    )}
                </div>
                <div className="flex items-center gap-5 self-center">
                    <button 
                        className={`pagination-dot ${activeProject.project1 === true ? "active-pagination-dot" : ""}`}
                        onClick={ () => handlePaginationDots("project1") }
                    ></button>
                    <button 
                        className={`pagination-dot ${activeProject.project2 === true ? "active-pagination-dot" : ""}`}
                        onClick={ () => handlePaginationDots("project2") }
                    ></button>
                    <button 
                        className={`pagination-dot ${activeProject.project3 === true ? "active-pagination-dot" : ""}`}
                        onClick={ () => handlePaginationDots("project3") }
                    ></button>
                </div>
            </div>
        </section>
    )
}

export default ProjectSection;