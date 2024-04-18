import React, { FC, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { featuredProjectsAPIPath} from "../global/wpAPIPath";
import handleHeadingIntersect  from "../global/handleHeadingIntersect";
import animateProjectArticle from "../global/animateProjectArticle";
import { Project } from "../interfaces/interfaces";
import ProjectArticle from "../components/ProjectArticle";


interface ActiveProject {
    [projectKey: string]: boolean;   // Index signature, tells TypeScript ActiveProject can be indexed with a string
    project1: boolean;
    project2: boolean;
    project3: boolean;
}

interface ProjectRefs {
    imageRef: React.RefObject<HTMLDivElement>;
    detailsRef: React.RefObject<HTMLDivElement>;
}

const ProjectSection: FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeProject, setActiveProject] = useState<ActiveProject>({
        project1: true,
        project2: false,
        project3: false
    });
    const projectKeys = Object.keys(activeProject);
    const [hasTitleAnimated, setHasTitleAnimated] = useState(false);

    const titleRef = useRef<HTMLHeadingElement>(null);                              // Reference to section heading
    const titleBorderRef = useRef<HTMLDivElement>(null);                            // Reference to section heading bottom border
    const viewAllProjectsRef = useRef<HTMLParagraphElement>(null);                  // Reference to view all projects link
    const projectWrapperRef = useRef<HTMLDivElement>(null);                         // Reference to project wrapper div

    // Stores an array of refs for each project
    const projectRefs = useRef<ProjectRefs[]>([]);

    // Update refs when the projects data changes
    useEffect(() => {
        // Initialize or re-initialize the refs when projects data changes
        projectRefs.current = projects.map(() => ({
            imageRef: React.createRef<HTMLDivElement>(),
            detailsRef: React.createRef<HTMLDivElement>()
        }));
    }, [projects]);


    // Set the active project when user clicks pagination dots
    const handlePaginationDots = ( projectNumber: string ) => {
        const currentIdx = projectKeys.findIndex(key => activeProject[key]);        // Get the current project pagination idx
        const targetIdx = projectKeys.findIndex(key => key === projectNumber);      // Get the desired project pagination idx

        const direction = (currentIdx > targetIdx) ? "left" : "right";              // Set the direction in which the project will slide in
        const ref = projectRefs.current[targetIdx];                                 // Get the selected project ref

        // Run the slide in animation
        animateProjectArticle(direction, ref);

        // Set active project
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
    
    // Watch where the scroll is based on the title border
    useEffect(() => {
        // Create a new IntersectionObserver
        const observer = new IntersectionObserver(( entries ) => {
            handleHeadingIntersect(
                entries,
                titleBorderRef,
                titleRef,
                viewAllProjectsRef,
                projectWrapperRef,
                hasTitleAnimated,
                setHasTitleAnimated
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
    }, [hasTitleAnimated]); // Re-run the effect when hasTitleAnimated changes

    return (
        <>
            <section id="projectSection" className="flex flex-col pt-10 min-h-screen max-w-[1280px] mx-auto">
                <h2 ref={titleRef} className="section-title">// FEATURED PROJECTS</h2>
                <div ref={titleBorderRef} className="title-border border-b-2 border-neutral-200 mb-6"></div>
                <p ref={viewAllProjectsRef} className="self-end">
                    <Link  to="/projects" className="block font-medium p-4 lg:text-lg link-hover">{"< VIEW ALL PROJECTS />"}</Link>
                </p>
                <div ref={projectWrapperRef} className="flex flex-col gap-6">
                    <div className="flex">
                        {projects.length > 0 && (
                            projects.map(( project, idx ) => {
                                const projectRef = projectRefs.current[idx];
                                return (
                                    <ProjectArticle
                                        key={project.title.rendered}
                                        project={project}
                                        active={activeProject[projectKeys[idx]]}
                                        imageRef={projectRef?.imageRef}
                                        detailsRef={projectRef?.detailsRef}
                                    />
                                )
                            })
                        )}
                    </div>
                    <div className="flex items-center gap-5 self-center">
                        {projectKeys.map((projectKey, idx) => (
                            <button
                                key={ idx }
                                className={ `pagination-dot ${activeProject[projectKey] === true ? "active-pagination-dot" : "" }`}
                                onClick={ () => handlePaginationDots(projectKey) }
                            ></button>
                        ))}
                    </div>
                </div>
            </section>
            <section className="min-h-screen"></section>
                
        </>
    )
}

export default ProjectSection;