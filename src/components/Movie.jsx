import Navbar from "./Navbar";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useParams } from "react-router-dom";


function parseDate(dateStr) {
  dateStr = dateStr.trim();

  
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return new Date(dateStr);
  }

 
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    const [month, day, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  }


  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    const [month, day, year] = dateStr.split('-');
    return new Date(`${year}-${month}-${day}`);
  }


  if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateStr)) {
    const [day, month, year] = dateStr.split('.');
    return new Date(`${year}-${month}-${day}`);
  }

  if (/^[A-Za-z]+\s\d{1,2},\s\d{4}$/.test(dateStr)) {
    return new Date(dateStr);
  }

  return null; 
}

export default function Movie() {

    const { movies, roles, actors } = useContext(DataContext);
    const { id } = useParams();

    if(movies.length == 0 || roles.length == 0 || actors.length == 0) {
        return <p>Loading movie...</p>
    }

    const movie = movies.find((movie) => movie.id == id)
    const movieName = movie.title;
    
    const movieRoles = roles.filter((role) => role.movieid == id);

    const movieDate = parseDate(movie.releasedate);
    return (
        <div className="movie-wallpaper">
          <div className="transparent-wallpaper">
            <Navbar />
            <div className="movie-container">
              <h1>{movieName}</h1>
              <p>{`Release Date: ${movieDate.toLocaleDateString('bg-BG')}`}</p>
                <ul className="list">
                    {movieRoles.map((role) => {
                        const actor = actors.find((actor) => actor.id == role.actorid);
                        const actorName = actor.fullname;
                        const roleName = (role.rolename === "NULL" || role.rolename === "null")  ? "Unnamed" : role.rolename;

                        return (
                            <li key={role.id}>
                                {`${actorName} as ${roleName}`}
                            </li>
                        )
                    })}
                </ul>
            </div>
            </div>
        </div>
    )
}