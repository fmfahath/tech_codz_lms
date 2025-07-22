import { createContext, useState } from "react";
import { dummyCourses } from "../assets/assets";

export const AppContext = createContext()

export const AppCondextProvider = (props) => {

    const [allCourses, setAllCourses] = useState(dummyCourses);

    const value = {
        allCourses, setAllCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}