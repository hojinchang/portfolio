import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { scrollOffset } from "../../global/globals";

interface Props {
    idx: number,
    item: string,
    linkClassName?: string, // Custom class names for the link
    topTextClassName?: string, // Custom class names for the top text
    bottomTextClassName?: string // Custom class names for the bottom text
}

const NavItem: FC<Props> = ({
    idx,
    item,
    linkClassName = "nav-link nav-link-hover group",
    topTextClassName = "nav-top-text",
    bottomTextClassName = "nav-bottom-text"
}) => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const sectionId = (item === "tech stack") ? "tech-stack" : item;
        const section = document.getElementById(sectionId);

        if (section && location.pathname === "/") {
            // If we are on the home page and the section exists
            const sectionTop = section.offsetTop;
            const scrollToPosition = sectionTop - scrollOffset;
            // Scroll to that section with some offset
            window.scrollTo({
                top: scrollToPosition,
                behavior: "smooth"
            });
        } else {
            // If we are not on the home page or the section does not exist
            navigate(`/?scrollTo=${sectionId}`);
        }
    };

    useEffect(() => {
        // If there is a section specified in the query string, scroll to it
        const scrollToElement = () => {
            const params = new URLSearchParams(location.search);
            const scrollTo = params.get("scrollTo");
            if (scrollTo) {
                const element = document.getElementById(scrollTo);
                if (element) {
                    setTimeout(() => {
                        const sectionTop = element.offsetTop;
                        const scrollToPosition = sectionTop - scrollOffset;
    
                        window.scrollTo({
                            top: scrollToPosition,
                            behavior: "smooth"
                        });

                        navigate(location.pathname, { replace: true });
                    }, 500);
                }
            }
        };

        scrollToElement();

    }, [location, location.search]);

    return (
        <li>
            <a href={`/#${item}`} onClick={ handleNavigate } className={ linkClassName }>
                <p className={ topTextClassName }>{`0${idx}`}</p>
                <p className={ bottomTextClassName }><span>//</span>{ item.toUpperCase() }</p>
            </a>
        </li>
    );
}

export default NavItem;
