import { NavLink } from "react-router-dom";
import { useReturnToUploaderPage } from "../hooks/useReturnToUploader";


export default function Navbar() {

  const returnToUploaderPage = useReturnToUploaderPage()

  return (
    <nav>
      <div className="nav-content">

        <div className="back-button-container">
          <button onClick={returnToUploaderPage} className="back-button">Back to Upload</button> 
        </div>

        <div className="nav-links-container">
          <div className="nav-links">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/actors">Actors</NavLink>
            <NavLink to="/movies">Movies</NavLink>
          </div>
        </div>

        <div className="nav-right-column"></div>
      </div>  
    </nav>
  );
}
