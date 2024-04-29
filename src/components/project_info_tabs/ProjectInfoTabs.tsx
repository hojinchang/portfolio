import { FC, useState } from "react";

import ConceptTab from "./ConceptTab";
import FeaturesTab from "./FeaturesTab";
import ReflectionTab from "./ReflectionTab";

import { ProjectInterface } from "../../interfaces/interfaces";

interface Props {
    project: ProjectInterface
}

const ProjectInfoTabs:FC<Props> = ({ project }) => {

    const [activeTab, setActiveTab] = useState<string>("concept");

    // Set active tab
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3">
                {["concept", "features", "reflection"].map(( tab, index ) => (
                    <button 
                        key={ tab }
                        className={ 
                            `details-button 
                            ${index === 0 ? 'rounded-tl-lg' : index === 2 ? 'rounded-tr-lg' : ''} 
                            ${activeTab === tab ? "active text-neutral-200 bg-neutral-800" : "text-neutral-500 bg-neutral-900"}` 
                        }
                        onClick={ () => handleTabClick(tab) }
                    >
                        <p>
                            {tab.toUpperCase()}
                        </p>
                    </button>
                ))}
            </div>
            <div className="bg-neutral-800 py-8 px-20 rounded-b-lg">
                { activeTab === "concept" && <ConceptTab project={ project } /> }
                { activeTab === "features" && <FeaturesTab project={ project } /> }
                { activeTab === "reflection" && <ReflectionTab project={ project } /> }
            </div>
        </div>
    )
}

export default ProjectInfoTabs;