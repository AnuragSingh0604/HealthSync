import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";
export const AppContext = createContext(null);
export const AppProvider = (props) => {
    const currencySymbol="$";
    const value={
        doctors,currencySymbol
    }
    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}
export default AppProvider;