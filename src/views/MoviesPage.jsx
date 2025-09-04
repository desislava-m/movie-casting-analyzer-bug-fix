import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


export default function MoviesPage() {

    const { movies } = useContext(DataContext);

    return (
        <div className="movies-background">
          <div className="transparent-wallpaper">
            <Navbar />
              <div className="movies-list-container">

                  <div className="movies-headline">
                    <h1>Movies:</h1>
                  </div>

                  <div className="movies-list">
                    <ul className="list">
                      {movies.map((movie) => {
                        return (
                            <li key={movie.id}>
                                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                            </li>
                        )
                      })}
                    </ul>
                  </div>
              </div>
          </div> 
        </div>
    )
}