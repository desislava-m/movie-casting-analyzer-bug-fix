import { act, useContext, useEffect } from "react"
import { DataContext } from "../context/DataContext"
import Navbar from "../components/Navbar"
import { useReturnToUploaderPage } from "../hooks/useReturnToUploader"
import { useNavigate } from "react-router-dom"



function groupActorsByMovie(roles) {
    const actorsByMovie = {};

    roles.forEach(role => {
        const movieID = role.movieid;
        const actorID = role.actorid;

        if (!actorsByMovie[movieID]) {
            actorsByMovie[movieID] = [];
        }

        actorsByMovie[movieID].push(actorID);
    });

    return actorsByMovie;
}

function getEachPairCount(actorsByMovie) {
    const pairCount = {};

    for (const movieIDkey in actorsByMovie) {
        const actorsArray = actorsByMovie[movieIDkey];
        if (actorsArray.length < 2) {
            return {error: "Movie has less than two actors"}
        }

        for (let i = 0; i < actorsArray.length; i++) {
            for (let j = i + 1; j < actorsArray.length; j++) {

                const actor1Id = actorsArray[i];
                const actor2Id = actorsArray[j];

                const pairKey = [actor1Id, actor2Id].sort((a, b) => a - b).join('-');

                if (!pairCount[pairKey]) {
                    pairCount[pairKey] = [];
                }

                pairCount[pairKey].push(movieIDkey);
            }
        }
    }

    return pairCount;
}

function getMostFrequentActors(roles) {

    const actorsByMovie = groupActorsByMovie(roles);
    const pairCount = getEachPairCount(actorsByMovie);
    
    if(pairCount.error) {
        return pairCount;
    }

    let maxCount = 0;
    let mostFrequentPair = '';
    let freqPairMovies = [];

    for (const pairKey in pairCount) {
        const currentPairArr = pairCount[pairKey];
        const currentCount = currentPairArr.length;

        if (currentCount > maxCount) {
            maxCount = currentCount;
            mostFrequentPair = pairKey;
            freqPairMovies = pairCount[pairKey]
        }
    }

    return { mostFrequentPair, freqPairMovies, maxCount };

}



export default function HomePage() {


    const returnToUploaderPage = useReturnToUploaderPage();
    const { actors, roles, movies } = useContext(DataContext);
    const navigate = useNavigate();
   
    useEffect(() => {
        const missingData = actors.length === 0 || movies.length === 0 || roles.length === 0;

        if (missingData) {
            navigate("/");
        }
    }, [actors, movies, roles]);

    if (!actors.length === 0 || movies.length === 0 || roles.length === 0) {
        return <p>Loading data...</p>
    }

    const result = getMostFrequentActors(roles);

    if(result.error) {
        return (
            <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
                textAlign: "center"
            }}
        >
            <button onClick={returnToUploaderPage}>Go back</button>
            <p>{result.error}</p>
        </div>
        )
    }

    const { mostFrequentPair, freqPairMovies, maxCount } = result;
    const pairArray = mostFrequentPair.split('-');
    const actor1Id = pairArray[0];
    const actor2Id = pairArray[1];

    const actor1Obj = actors.find((a) => a.id == actor1Id);
    const actor2Obj = actors.find((a) => a.id == actor2Id);

    const movieTitlesArr = [];

    freqPairMovies.forEach(element => {
        const movieObject = movies.find((m) => m.id == element);
        const title = movieObject.title;
        movieTitlesArr.push(title);
    });

    return (
        <div className="actor-pair-container">
            <div className="transparent-wallpaper">  
                <Navbar />
                <div className="pair-text-container">
                    <h1>Top Actor Pair</h1>
                    <h2>{`${actor1Obj.fullname} - ${actor2Obj.fullname}`}</h2>
                    <h3>{`Appeared in ${maxCount} movies together`}</h3>
                    <ul className="list" >
                        {movieTitlesArr.map((title, index) => {
                            return (
                                <li className="list-element" key={index}>{title}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}