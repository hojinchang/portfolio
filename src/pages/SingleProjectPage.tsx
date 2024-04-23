import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";


import Header from "../components/header/Header";
import Footer from "../components/Footer";

import { RootState } from "../store/store";

const SingleProjectPage:FC = () => {

    const isMobile = useSelector(( state: RootState ) => state.isMobile.isMobile );

    // Scroll to the top of the page when the page mounts
    useEffect(() => {
        window.scrollTo(0, 0);
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