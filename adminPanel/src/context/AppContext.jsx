import { createContext } from 'react';
export const AppContext =createContext();
const AppContextProvider =(props)=>{
    const calculateAge=(dob)=>{
        const today=new Date();
        const birthDate=new Date(dob)
        let age=today.getFullYear()-birthDate.getFullYear()
        return age;

    }
    const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const formatDate=(dateStr)=>{
    const dateArray=dateStr.split("-");
    return dateArray[0]+" "+months[parseInt(dateArray[1])-1]+" "+dateArray[2];
  }
    const value={
       calculateAge,
       formatDate
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;
    
