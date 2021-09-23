import MovieCard from "./MovieCard"
import {useState, useEffect} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';

function MoviesContainer() {
    const [movies, setMovies] = useState([]);
    const [renderMovies, setRenderMovies] = useState([]);
    const [currMov, setCurrMov] = useState(0);
    const apiKey = "";

    useEffect(() => {
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=blart`)
                .then(res => res.json())
                .then((movies) => {
                    setMovies(movies.Search)
                })
    }, []);

    console.log(movies)
    
    const customMovies = [
        {Title: "Moonlight"},
        {Title: "Spider-Man: Into the Spider-Verse"},
        {Title: "No Country for Old Men"},
        {Title: "The Dark Knight"},
        {Title: "Pulp Fiction"},
        {Title: "Iron Man"},
        {Title: "Goodfellas"},
        {Title: "The Shining"},
        {Title: "Zodiac"},
        {Title: "Drive"},
        {Title: "The Thing"},
        {Title: "Toy Story"},
        {Title: "Alien"},
        {Title: "Get Out"},
        {Title: "Nightcrawler"},
        {Title: "The Grand Budapest Hotel"},
        {Title: "The Big Lebowski"},
        {Title: "The Departed"}
    ]


    useEffect(() => {
        if(movies) {
        setRenderMovies(customMovies.map(movie => (
            <MovieCard 
                title={movie.Title}
                currMov={currMov}
                setCurrMov={setCurrMov}
                renderMovies={renderMovies}
            />
        )))}
    }, [movies, currMov]);

if (renderMovies[currMov]) {
    return(
        <>
        <h1>{renderMovies[currMov]}</h1>
        </>
    )
} else return(
    <Grid sx={{
        marginTop: 35,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
      <Typography> WAITING ON FRIENDS </Typography>
      <CircularProgress />
    </Box>
    </Grid>
)
}

export default MoviesContainer