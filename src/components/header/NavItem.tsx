import { FC } from "react";


interface Props {
    idx: number,
    item: string
}

const NavItem: FC<Props> = ({ idx, item }) => {

    return (
        <li>
            <a href={`#${(item === "tech stack") ? "tech-stack" : item}`} className="nav-link group py-2">
                <p className="nav-top-text">{`0${idx}`}</p>
                <p className="nav-bottom-text"><span>//</span> {item.toUpperCase()}</p>
            </a>
        </li>
    )
}

export default NavItem;