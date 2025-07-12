import { createContext } from "react";


export const AppContext = createContext()

export const AppCondextProvider = (props) => {

    const test = "fahath"

    const value = {
        test
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}