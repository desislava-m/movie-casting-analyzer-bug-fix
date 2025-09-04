# Movie Casting Analyzer Web App

This project is a web app that visualizes the two actors that have played in most movies together. It also shows movies info like release date and actors' roles.

At the start view the application allows the user to upload three csv files with roles, movies and actors data.
handleFileUpload func takes the uploaded file, reads it as text and passes it as a parameter to parseCsv function.
parseCsv takes the csv file, extracts the first row (the headers) and turns them to lower case. It parses every csv file into an array of objects where the object key is a column from the headers and the value is the corresponding column data from every row.

handleFileUpload function takes the result object from parseCsv { headers, data: result } and checks if the file headers include the words "birthdate", "title" or "rolename" in order to decide in which state (useState hook) to save the array of objects. An additional useEffect hook checks whether any of the states roles, actors or movies is empty and prompts the user to upload the needed files if any. After all the files have been uploaded the user lands on the home page.


In HomePage the app groups actors by movie in an object, where the key is the movieID and the value is an array of actors, then it finds all possible actor pairs and the movies that
they played in. It later finds the pair that has most movies together and displays it. 

The app uses React Context to store and distribute the current state of the data across components.

The MoviesPage visualizes a list of all movie titles which link to more information about the movie.

The ActorsPage visualizes a list of all actor names which link to information on the movies and roles they played.

