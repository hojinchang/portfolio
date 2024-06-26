import { FC, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../components/header/Header";

import { appTitle } from "../global/globals";

const ErrorPage: FC = () => {

    // Set the title of the page
    useEffect(() => {
        document.title = `${appTitle} - 404`;
    }, []);

    return (
        <>
            <Header />
            <main className="main flex items-center justify-center min-h-screen">
                <section className="flex flex-col gap-8 text-center">
                    <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">PAGE NOT FOUND</h1>
                    <div>
                        <p className="mb-3 md:text-lg lg:text-xl">You're cheeky, you tried to explore too deep.</p>
                        <p className="md:text-lg lg:text-xl">Let's go back to the <Link to="/" className="link-hover underline">Home Page</Link>.</p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ErrorPage;