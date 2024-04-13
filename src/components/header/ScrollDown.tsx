import { FC } from "react";


const ScrollDown: FC = () => {

    return (
        <div className="absolute bottom-20 right-5">
            <span className="scroll-indicator"></span>
            <span className="scroll-indicator"></span>
            <span className="scroll-indicator"></span>
        </div>
    )
}

export default ScrollDown;