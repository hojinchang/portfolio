import { FC } from "react";


interface Props {
    activeAccordion: string | null;
    setActiveAccordion: React.Dispatch<React.SetStateAction<string | null>>;
}

const AboutAccordion: FC<Props> = ({ activeAccordion, setActiveAccordion }) => {

    const handleAccordionClick = (section: string) => {
        setActiveAccordion(activeAccordion === section ? null : section);
    };

    return (
        <div className="shadow-accordion-shadow lg:w-1/2">
            <button className="accordion" onClick={() => handleAccordionClick("developer")}>
                <p className="font-semibold">DEVELOPER</p>
                {activeAccordion === "developer" 
                    ? (
                        <svg className="text-netural-100" fill="currentColor" width="10" height="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M0 10h24v4h-24z"/>
                        </svg>
                    ) : (
                        <svg className="text-netural-100" fill="currentColor" width="10" height="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
                        </svg>
                    )
                }
            </button>
            <div className={`accordion-content-wrapper ${activeAccordion === "developer" ? "block" : "hidden"}`}>
                <p id="content-developer" className={`accordion-content ${activeAccordion === "developer" ? "opacity-100" : "opacity-0"}`}>Analytical, detail-oriented software developer specializing in Full-Stack development, Machine Learning, and Computer Vision.</p>
            </div>

            <button className="accordion" onClick={() => handleAccordionClick("leader")}>
                <p className="font-semibold">LEADER</p>
                {activeAccordion === "leader" 
                    ? (
                        <svg className="text-netural-100" fill="currentColor" width="10" height="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M0 10h24v4h-24z"/>
                        </svg>
                    ) : (
                        <svg className="text-netural-100" fill="currentColor" width="10" height="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
                        </svg>
                    )
                }
            </button>
            <div className={`accordion-content-wrapper ${activeAccordion === "leader" ? "block" : "hidden"}`}>
                <p id="content-leader" className={`accordion-content ${activeAccordion === "leader" ? "opacity-100" : "opacity-0"}`}>Proven leader adept at steering teams toward success through clear direction, collaboration, and a focus on achieving collective goals.</p>
            </div>

            <button className="accordion" onClick={() => handleAccordionClick('innovator')}>
                <p className="font-semibold">INNOVATOR</p>
                {activeAccordion === "innovator" 
                    ? (
                        <svg className="text-netural-100" fill="currentColor" width="10" height="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M0 10h24v4h-24z"/>
                        </svg>
                    ) : (
                        <svg className="text-netural-100" fill="currentColor" width="10" height="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
                        </svg>
                    )
                }
            </button>
            <div className={`accordion-content-wrapper ${activeAccordion === "innovator" ? "block" : "hidden"}`}>
                <p id="content-innovator" className={`accordion-content ${activeAccordion === "innovator" ? "opacity-100" : "opacity-0"}`}>Creative innovator committed to transforming ideas into practical solutions. Skilled in identifying unique opportunities for technological advancement and implementing cutting-edge approaches.</p>
            </div>

        </div>
    )
}

export default AboutAccordion;