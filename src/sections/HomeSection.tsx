import { FC } from "react"


const HomeSection: FC = () => {
    
    return (
        <section className="h-screen relative">
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-2/3 flex flex-col items-center">
                <h1 className="text-8xl font-semibold text-neutral-200 whitespace-nowrap md:text-[120px] lg:text-[160px]">
                    <span className="marquee">Hojin Chang</span>
                </h1>
                <h2 className="text-lg font-semi text-neutral-400 mt-8 text-center md:text-xl lg:text-2xl lg:mt-16">FULL STACK DEVELOPER, COMPUTER VISION & MACHINE LEARNING ENGINEER</h2>
            </div>
        </section>
    )
}

export default HomeSection;