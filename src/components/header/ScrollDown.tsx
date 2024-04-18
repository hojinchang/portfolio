import { FC } from "react";


const ScrollDown: FC = () => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Get the ref to the ProjectSection and scroll to it
        const projectSection = document.getElementById("projectSection");

        if (projectSection) {
            const offset = 30;
            const sectionPosition = projectSection.getBoundingClientRect().top - offset;

            window.scrollTo({
                top: sectionPosition,
                behavior: "smooth"
            });
        }
    }

    return (
        <button className="p-3 absolute bottom-28 md:bottom-20 right-5" onClick={handleClick}>
            <span className="scroll-indicator"></span>
            <span className="scroll-indicator"></span>
            <span className="scroll-indicator"></span>
        </button>
    )
}

export default ScrollDown;