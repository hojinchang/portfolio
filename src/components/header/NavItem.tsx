import { FC } from "react";

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

    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const sectionId = (item === "tech stack") ? "tech-stack" : item;
        const section = document.getElementById(sectionId);

        if (section) {
            const sectionTop = section.offsetTop;
            const scrollToPosition = sectionTop - scrollOffset;

            window.scrollTo({
                top: scrollToPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <li>
            <a onClick={handleNavigate} className={linkClassName}>
                <p className={topTextClassName}>{`0${idx}`}</p>
                <p className={bottomTextClassName}><span>//</span>{item.toUpperCase()}</p>
            </a>
        </li>
    );
}

export default NavItem;
