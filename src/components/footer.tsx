import { FC } from "react";
import { useSelector } from "react-redux";

import NavItem from "./header/NavItem";
import { RootState } from "../store/store";

const Footer: FC = () => {
    const isMobile = useSelector((state: RootState) => state.isMobile.isMobile);

    const navItems: string[] = ["home", "projects", "about", "tech stack", "contact"];

    const handleScrollUp = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <footer id="contact" className={ `relative px-4 pt-12 mt-[17rem] bg-neutral-950 xs:px-8 sm:px-12 ${isMobile ? "pb-[1.5rem]" : "pb-[2.5rem]"}` }>
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-10">
                    <h3 className="h3 mb-2">Before you go...</h3>
                    <p>Check out my socials to connect with me!</p>
                </div>
                <div className={ `flex justify-between gap-12 ${isMobile ? "flex-row" : "flex-col"}` }>
                    <div>
                        <h4 className="font-semibold mb-2">SOCIALS</h4>
                        <ul className={ `flex ${isMobile ? "flex-col" : "flex-row gap-16"}` }>
                            <li><a href="https://www.linkedin.com/in/hojin-chang/" target="_blank" className="inline-block py-2 text-sm underline link-hover">LINKEDIN</a></li>
                            <li><a href="https://github.com/hojinchang" target="_blank" className="inline-block py-2 text-sm underline link-hover">GITHUB</a></li>
                            <li><a href="mailto:hojinc1223@gmail.com" target="_blank" className="inline-block py-2 text-sm underline link-hover">EMAIL</a></li>
                        </ul>
                    </div>
                    {!isMobile && (
                        <div className="border-b-2 border-neutral-200"></div>
                    )}
                    <nav>
                        <h4 className="font-semibold mb-2">NAVIGATION</h4>
                        <ul className={ `flex ${isMobile ? "flex-col items-end" : "flex-row items-center gap-16"}` }>
                            {navItems.map(( item, idx ) => (
                                <NavItem 
                                    key={ idx } 
                                    idx={ idx } 
                                    item={ item }
                                    linkClassName="nav-link group"
                                    topTextClassName="leading-none font-semibold text-neutral-500 text-xs"
                                    bottomTextClassName="leading-none font-medium text-neutral-200 text-sm transition duration-300 lg:group-hover:text-neutral-500"
                                />
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="flex justify-end mt-16 md:mt-12">
                    <a className="scroll-up block p-3" onClick={ handleScrollUp }>
                        <svg className="text-neutral-100" role="img" width="36" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                            <title>Scroll to top</title>
                            <path d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;