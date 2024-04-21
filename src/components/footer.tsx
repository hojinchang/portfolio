import { FC } from "react";
import { useSelector } from "react-redux";

import NavItem from "./header/NavItem";
import { RootState } from "../store/store";

const Footer: FC = () => {
    const isMobile = useSelector((state: RootState) => state.isMobile.isMobile);

    const navItems: string[] = ["home", "projects", "about", "tech stack", "contact"];


    return (
        <footer id="contact" className="pb-40 px-4">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-10">
                    <h3 className="h3">Before you go...</h3>
                    <p>Listen to some of my favourite songs!</p>
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
                    <div>
                        <h4 className="font-semibold mb-2">NAVIGATION</h4>
                        <ul className={ `flex ${isMobile ? "flex-col items-end" : "flex-row items-center gap-16"}` }>
                            {navItems.map(( item, idx ) => (
                                <NavItem 
                                    key={ idx } 
                                    idx={ idx } 
                                    item={ item }
                                    linkClassName="nav-link"
                                    topTextClassName="leading-none font-semibold text-neutral-500 text-xs"
                                    bottomTextClassName="leading-none font-medium text-neutral-200 text-sm"
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;