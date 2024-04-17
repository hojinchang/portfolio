import { FC } from "react";
import { Link } from "react-router-dom";


interface Props {
    idx: number,
    item: string
}

const NavItem: FC<Props> = ({ idx, item }) => {

    return (
        <li>
            <Link to={`#${(item === "tech stack") ? "tech-stack" : item}`} className="nav-link nav-link-hover group">
                <p className="nav-top-text">{`0${idx}`}</p>
                <p className="nav-bottom-text"><span>//</span> {item.toUpperCase()}</p>
            </Link >
        </li>
    )
}

export default NavItem;