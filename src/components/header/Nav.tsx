import { FC } from "react"

const Nav:FC = () => {

    return (
        <nav className="flex justify-center absolute top-0 w-full">
            <ul className="flex gap-6 lg:gap-16">
                <li>
                    <a href="#" className="nav-link">
                        <p className="nav-top-text">00</p>
                        <p className="nav-bottom-text"><span>//</span> HOME</p>
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                        <p className="nav-top-text">01</p>
                        <p className="nav-bottom-text"><span>//</span> PROJECTS</p>
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                        <p className="nav-top-text">02</p>
                        <p className="nav-bottom-text"><span>//</span> ABOUT</p>
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link">
                        <p className="nav-top-text">03</p>
                        <p className="nav-bottom-text"><span>//</span> TECH STACK</p>
                    </a>
                </li>
                <li>
                    <a href="#"  className="nav-link">
                        <p className="nav-top-text">04</p>
                        <p className="nav-bottom-text"><span>//</span> CONTACT</p>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;