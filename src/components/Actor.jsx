import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";


export default function Actor() {

    const { roles, movies, actors } = useContext(DataContext);
    const { id } = useParams();

    const rolesObjs = roles.filter((role) => role.actorid == id);
    
    const moviesAndRoles = [];

    rolesObjs.forEach(element => {
        const movieObj = movies.find((movie) => movie.id == element.movieid);
        const movieTitle = movieObj.title;
        const movieRoleArr = [];

        if(element.rolename === "NULL" || element.rolename === "null") {
             movieRoleArr.push(movieTitle, "Unnamed")
        }else {
            movieRoleArr.push(movieTitle, element.rolename)
        }
        
        moviesAndRoles.push(movieRoleArr);
    });

    const actorObj = actors.find((actor) => actor.id == id);
    const actorName = actorObj.fullname;

    return (
        <div className="actor-wallpaper">
            <Navbar />
            <div className="actor-movies-container">
                <h1>{`${actorName}'s Movies`}</h1>
                <ul className="list">
                    {moviesAndRoles.map((item, index) => {
                        const title = item[0];
                        const role = item[1];

                        return (
                            <li key={index}>{`${title} playing ${role}`}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}