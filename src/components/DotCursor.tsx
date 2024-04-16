import { FC, useState, useEffect, useRef } from  "react";

const DotCursor: FC = () => {
    const dotRef = useRef<HTMLDivElement | null>(null);
    const haloRef = useRef<HTMLDivElement | null>(null);

    const [isHovered, setIsHovered] = useState(false);

    // Move the dot and its halo based on where cursor is
    const moveDot = (e: MouseEvent) => {
        if (dotRef.current && haloRef.current) {
            dotRef.current.style.left = `${e.pageX}px`;
            dotRef.current.style.top = `${e.pageY}px`;
            haloRef.current.style.left = `${e.pageX}px`;
            haloRef.current.style.top = `${e.pageY}px`;
        }
    };

    // Add event listeners on links and buttons to set a hover state on mouseover/mouseout
    // This creates the effect where the halo only shows on hover state
    useEffect(() => {
        const links = document.querySelectorAll("a");
        const buttons = document.querySelectorAll("button");

        const hoverElements = [links, buttons];
        hoverElements.forEach((elements) => {
            elements.forEach((element) => {
                element.addEventListener("mouseover", () => {console.log("HOVERED");   setIsHovered(true)});
                element.addEventListener("mouseout", () => setIsHovered(false));
            });
        });

        document.addEventListener('mousemove', moveDot);

        return () => {
            document.removeEventListener('mousemove', moveDot);
        };
    }, []);

    return (
        <>
            <div className="dot z-50" ref={ dotRef } />
            <div className={`halo z-50 ${isHovered ? "hovered" : ""}`} ref={ haloRef } />
        </>
    );
};

export default DotCursor;
