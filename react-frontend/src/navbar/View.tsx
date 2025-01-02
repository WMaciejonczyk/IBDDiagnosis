import {ReactNode} from "react";
import Navbar from "./Navbar";

interface ViewProps {
    children?: ReactNode;
}

function View({ children }: ViewProps) {

    return (
        <div className="h-screen flex flex-row bg-grayish-blue select-none font-montserrat font-regular tracking-widest">
            <div className={`flex flex-1 flex-col z-20 bg-white rounded-tl-3xl`}>
                <Navbar/>
                <div className={`z-20 flex-1 min-h-0 scrollbar overflow-y-auto bg-grayish-blue`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default View;

