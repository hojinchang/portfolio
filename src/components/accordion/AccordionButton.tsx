import { FC } from "react"

interface Props {
    accordionName: string;
    activeAccordion: string | null;
    handleAccordionClick: (section: string) => void;
}

const AccordionButton: FC<Props> = ({ accordionName, activeAccordion, handleAccordionClick }) => {

    return (
        <button className="accordion" onClick={() => handleAccordionClick(accordionName)}>
            <p className="font-semibold uppercase">{accordionName}</p>
            {activeAccordion === accordionName
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
    )
}

export default AccordionButton;