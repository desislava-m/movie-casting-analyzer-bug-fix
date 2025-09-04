import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function ActorsPage() {

    const { actors } = useContext(DataContext);
    

    return (
        <div className="actors-background">
            <div className="transparent-wallpaper">
                <Navbar />
                <div className="actor-list-container">
                    <div className="actors-headline">
                    
                        <h1>All actors:</h1>

                    </div>
                    <div className="actors-list">
                            <ul className="list">
                                {actors.map((actor) => {
                                    return (
                                        <li key={actor.id}>
                                            <Link to={`/actor/${actor.id}`}>{actor.fullname}</Link>
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