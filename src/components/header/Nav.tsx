import { FC } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Nav:FC = () => {

    const isMobile = useSelector((state: RootState) => state.isMobile.isMobile);

    return (
        <div className="flex justify-center">
            <nav className={`absolute z-10 ${isMobile ? "bg-neutral-800 w-full bottom-0 px-2 py-4 border-t border-neutral-700 shadow-top-shadow" : "top-0 p-6"}`}>
                <ul className="flex justify-center gap-2 3xs:gap-4 2xs:gap-8 xs:gap-12 sm:gap-16 md:gap-6 lg:gap-16">
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
        </div>
    )
}

export default Nav;