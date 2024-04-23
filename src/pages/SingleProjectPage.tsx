import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";


import Header from "../components/header/Header";
import Footer from "../components/Footer";

import { RootState } from "../store/store";
import { projectsAPIPath } from "../global/wpAPIPath";
import { ProjectInterface } from "../interfaces/interfaces";

const SingleProjectPage:FC = () => {
    // Get project slug from query string
    const { projectName } = useParams<string>();
    const isMobile = useSelector(( state: RootState ) => state.isMobile.isMobile );

    const [project, setProject] = useState<ProjectInterface | null>(null);

    // Scroll to the top of the page when the page mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch the project
    useEffect(() => {
        const fetchProject = async() => {
            try {
                const response = await axios.get(projectsAPIPath + `&slug=${projectName}`);
                if (response.data && response.data.length > 0) {
                    setProject(response.data[0]);
                }
            } catch(err) {
                console.error("Error fetching projects:", err);
            }
        }

        fetchProject();
    }, []);

    return (
        <>
            <Header />
            <main className={ `px-4 ${ isMobile ? "pb-20" : "" }` }>
            </main>
            <Footer />
        </>
    )
}

export default SingleProjectPage;