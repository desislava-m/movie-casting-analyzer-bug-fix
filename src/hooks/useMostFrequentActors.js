import { DataContext } from "../context/DataContext";
import { useContext } from "react";

export function useMostFrequentActors() {
    const { roles } = useContext(DataContext);

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
                return { error: "Movie has less than two actors" }
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

    function getMostFrequentActors() {

        const actorsByMovie = groupActorsByMovie(roles);
        const pairCount = getEachPairCount(actorsByMovie);

        if (pairCount.error) {
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

    return getMostFrequentActors();
}