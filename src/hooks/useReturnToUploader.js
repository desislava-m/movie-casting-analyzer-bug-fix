import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export function useReturnToUploaderPage() {
  const navigate = useNavigate();
  const { setActors, setRoles, setMovies } = useContext(DataContext);

  function returnToUploaderPage() {
    localStorage.clear();
    setActors([]);
    setRoles([]);
    setMovies([]);
    navigate("/");
  }

  return returnToUploaderPage;
}
