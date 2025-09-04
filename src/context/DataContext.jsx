import { createContext, useEffect } from "react";
import { useState } from "react";


export const DataContext = createContext();


export default function DataProvider({ children }) {

    const [ actors, setActors ] = useState([]);
    const [ roles, setRoles ] = useState([]);
    const [ movies, setMovies ] = useState([]);
    

    useEffect(() => {
        const storedActors = localStorage.getItem("actors");
        const storedRoles = localStorage.getItem("roles");
        const storedMovies = localStorage.getItem("movies");

        if(storedActors) {
            setActors(JSON.parse(storedActors));
        }

         if(storedRoles) {
            setRoles(JSON.parse(storedRoles));
        }

        if(storedMovies) {
            setMovies(JSON.parse(storedMovies));
        }
        
    }, [])

    return (
        <DataContext.Provider value = {{
            actors, setActors,
            roles, setRoles,
            movies, setMovies
        }}>
            {children}
        </DataContext.Provider>
    )

}