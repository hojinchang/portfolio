import { FC, useState, useEffect } from  "react";
import { motion } from "framer-motion";

const DotCursor: FC = () => {

    const [cursorPosition, setCursorPosition] = useState<{ x: number, y: number }>({
        x: 0,
        y: 0
    });
    const [haloPosition, setHaloPosition] = useState<{ x: number, y: number }>({
        x: 0,
        y: 0
    });

    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Set the cursor and halo positions on mouse move
    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setCursorPosition({ 
                x: e.clientX - 8,   // subtract the radius
                y: e.clientY - 8
            });

            setHaloPosition({ 
                x: e.clientX - 20,   // subtract the radius
                y: e.clientY - 20
            });
        }

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        }
    }, []);


    // Add event listeners on links and buttons to set a hover state on mouseover/mouseout
    // This creates the effect where the halo only shows on hover state
    useEffect(() => {
        const handleMouseOver = (e: Event) => {
            if ((e.target as Element).closest("a, button")) {
                setIsHovered(true);
            }
        };

        const handleMouseOut = (e: Event) => {
            if ((e.target as Element).closest("a, button")) {
                setIsHovered(false);
            }
        };

        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    // Detect touch devices and hide cursor permanently on them
    useEffect(() => {
        const handleTouchStart = () => {
            setIsVisible(false);  // Permanently hide cursor on touch devices
        };

        window.addEventListener("touchstart", handleTouchStart);

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
        };
    }, []);


    return (
        <>
            {isVisible && (
                <>
                    <motion.div 
                        className="cursor-dot z-50" 
                        style={{
                            translateX: cursorPosition.x,
                            translateY: cursorPosition.y,
                        }} 
                    />
                    <motion.div 
                        className={ `halo z-50 ${isHovered ? "hovered" : ""}` }  
                        style={{
                            translateX: haloPosition.x,
                            translateY: haloPosition.y,
                        }} 
                    />
                </>
            )}
        </>
    );
};

export default DotCursor;