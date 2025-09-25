import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";
export const AppContext = createContext(null);
export const AppProvider = (props) => {
    const value={
        doctors
    }
    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}
export default AppProvider;