import { FC } from "react";


import AccordionButton from "./AccordionButton";

interface Props {
    activeAccordion: string | null;
    setActiveAccordion: React.Dispatch<React.SetStateAction<string | null>>;
}

const AboutAccordion: FC<Props> = ({ activeAccordion, setActiveAccordion }) => {

    const handleAccordionClick = (section: string) => {
        setActiveAccordion(activeAccordion === section ? null : section);
    };

    return (
        <div className="pt-5 pb-10 lg:flex lg:items-center lg:gap-10">
            <div className="shadow-accordion-shadow lg:w-1/2">
                <AccordionButton accordionName={ "developer" } activeAccordion={ activeAccordion }  handleAccordionClick={ handleAccordionClick }/>
                <div className={`accordion-content-wrapper ${activeAccordion === "developer" ? "block" : "hidden"}`}>
                    <p id="content-developer" className={`accordion-content ${activeAccordion === "developer" ? "opacity-100" : "opacity-0"}`}>Analytical, detail-oriented software developer specializing in Full-Stack development, Machine Learning, and Computer Vision.</p>
                </div>

                <AccordionButton accordionName={ "leader" } activeAccordion={ activeAccordion }  handleAccordionClick={ handleAccordionClick }/>
                <div className={`accordion-content-wrapper ${activeAccordion === "leader" ? "block" : "hidden"}`}>
                    <p id="content-leader" className={`accordion-content ${activeAccordion === "leader" ? "opacity-100" : "opacity-0"}`}>Proven leader adept at steering teams toward success through clear direction, collaboration, and a focus on achieving collective goals.</p>
                </div>

                <AccordionButton accordionName={ "innovator" } activeAccordion={ activeAccordion }  handleAccordionClick={ handleAccordionClick }/>
                <div className={`accordion-content-wrapper ${activeAccordion === "innovator" ? "block" : "hidden"}`}>
                    <p id="content-innovator" className={`accordion-content ${activeAccordion === "innovator" ? "opacity-100" : "opacity-0"}`}>Creative innovator committed to transforming ideas into practical solutions. Skilled in identifying unique opportunities for technological advancement and implementing cutting-edge approaches.</p>
                </div>
            </div>
            <div className="hidden lg:block lg:w-1/2">
                <p className={`heading-hero font-bold opacity-0 transition-opacity duration-1000 ease-in-out ${activeAccordion ? "opacity-100" : "opacity-0"} lg:text-7xl lg:w-1/2 xl:text-8xl`}>
                    {activeAccordion === "developer" && "DEVELOPER"
                    || activeAccordion === "leader" && "LEADER"
                    || activeAccordion === "innovator" && "INNOVATOR"
                    }
                </p>
            </div>
        </div>
    )
}

export default AboutAccordion;