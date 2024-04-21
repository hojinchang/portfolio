import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";


const ProjectsPage: FC = () => {
    const isMobile = useSelector(( state: RootState ) => state.isMobile.isMobile);

    // Scroll to the top of the page when the page mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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