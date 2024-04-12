import { FC } from "react"
import { NavLink } from "react-router-dom";

const Nav:FC = () => {

    return (
        <nav className="flex justify-center">
            <ul className="flex gap-6 lg:gap-16">
                <li>
                    <NavLink to="/" className="nav-link">
                        <p className="nav-top-text">00</p>
                        <p className="nav-bottom-text"><span>//</span> HOME</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/projects" className="nav-link">
                        <p className="nav-top-text">01</p>
                        <p className="nav-bottom-text"><span>//</span> PROJECTS</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className="nav-link">
                        <p className="nav-top-text">02</p>
                        <p className="nav-bottom-text"><span>//</span> ABOUT</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tech-stack" className="nav-link">
                        <p className="nav-top-text">03</p>
                        <p className="nav-bottom-text"><span>//</span> TECH STACK</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact"  className="nav-link">
                        <p className="nav-top-text">04</p>
                        <p className="nav-bottom-text"><span>//</span> CONTACT</p>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;