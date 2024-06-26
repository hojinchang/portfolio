import React, { FC, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { featuredProjectsAPIPath } from "../global/wpAPIPath";
import animateHeadingIntersect  from "../global/gsap_animations/animateHeadingIntersect";
import animateProjectArticle from "../global/gsap_animations/animateProjectArticle";
import { ProjectInterface } from "../interfaces/interfaces";
import FeaturedProjectArticle from "../components/project_articles/FeaturedProjectArticle";


interface ActiveProject {
    [projectKey: string]: boolean;   // Index signature, tells TypeScript ActiveProject can be indexed with a string
    project1: boolean;
    project2: boolean;
    project3: boolean;
}

interface ProjectRefs {
    articleRef: React.RefObject<HTMLElement>,
    imageRef: React.RefObject<HTMLDivElement>;
    detailsRef: React.RefObject<HTMLDivElement>;
}

const ProjectSection: FC = () => {
    const [projects, setProjects] = useState<ProjectInterface[]>([]);
    const [activeProject, setActiveProject] = useState<ActiveProject>({
        project1: true,
        project2: false,
        project3: false
    });
    const projectKeys = Object.keys(activeProject);
    const [hasTitleAnimated, setHasTitleAnimated] = useState(false);

    // References for GSAP animation
    const titleRef = useRef<HTMLHeadingElement>(null);                       // Reference to section heading
    const titleBorderRef = useRef<HTMLDivElement>(null);                     // Reference to section heading bottom border
    const viewAllProjectsRef = useRef<HTMLParagraphElement>(null);           // Reference to view all projects link
    const contentWrapperRef = useRef<HTMLDivElement>(null);                  // Reference to project wrapper div

    // Stores an array of refs for each project
    const projectRefs = useRef<ProjectRefs[]>([]);

    // Set the active project when user clicks pagination dots
    const handlePaginationDots = ( projectNumber: string ) => {
        if (activeProject[projectNumber]) {
            // If the project is already active, do nothing
            return;
        }

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

    // Update refs when the projects data changes
    useEffect(() => {
        // Initialize or re-initialize the refs when projects data changes
        projectRefs.current = projects.map(() => ({
            articleRef: React.createRef<HTMLElement>(),
            imageRef: React.createRef<HTMLDivElement>(),
            detailsRef: React.createRef<HTMLDivElement>()
        }));
    }, [projects]);

    // Fetch the featured projects
    useEffect(() => {
        const fetchProjects = async() => {
            try {
                const response = await axios.get(featuredProjectsAPIPath);
                if (response.data && response.data.length > 0) {
                    setProjects(response.data);
                }
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
            animateHeadingIntersect(
                entries[0],
                titleBorderRef,
                titleRef,
                viewAllProjectsRef,
                contentWrapperRef,
                hasTitleAnimated,
                setHasTitleAnimated
            )
        }, {
            root: null, // Use the viewport as the root
            rootMargin: "0px 0px -300px 0px",
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
        <section id="projects" className="section">
            <h2 ref={ titleRef } className="section-title">// FEATURED PROJECTS</h2>
            <div ref={ titleBorderRef } className="section-border"></div>
            <p ref={ viewAllProjectsRef } className="self-end hidden-section">
                <Link to="/projects" className="view-all-projects">{"< VIEW ALL PROJECTS />"}</Link>
            </p>
            <div ref={ contentWrapperRef } className="flex flex-col gap-6 hidden-section">
                <div className="flex">
                    { projects.length > 0 ? (
                        projects.map(( project, idx ) => {
                            const projectRef = projectRefs.current[idx];
                            return (
                                <FeaturedProjectArticle
                                    key={ project.title.rendered }
                                    idx={ idx }
                                    project={ project }
                                    active={ activeProject[projectKeys[idx]] }
                                    articleRef={ projectRef?.articleRef }
                                    imageRef={ projectRef?.imageRef }
                                    detailsRef={ projectRef?.detailsRef }
                                />
                            )
                        })) : (
                            <h2 className="font-bold text-center text-2xl">NO PROJECTS FOUND</h2>
                        )
                    }
                </div>
                <div className="flex items-center gap-2 self-center">
                    { projectKeys.map(( projectKey, idx ) => (
                        <button
                            key={ idx }
                            className="pagination-wrapper" // Wrapper for the clickable area
                            onClick={ () => handlePaginationDots(projectKey) }
                        >
                            <div className={ `pagination-dot ${activeProject[projectKey] === true ? "active-pagination-dot" : ""}` }></div>
                        </button>
                    )) }
                </div>
            </div>
        </section>
    )
}

export default ProjectSection;