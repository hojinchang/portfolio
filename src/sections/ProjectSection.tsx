import { FC, useRef } from "react";

const ProjectSection: FC = () => {
    const projectSectionRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={projectSectionRef} id="projectSection" className="min-h-screen">
            <h1 className="font-semibold text-xl">// FEATURED PROJECTS</h1>
        </section>
    )
}

export default ProjectSection;