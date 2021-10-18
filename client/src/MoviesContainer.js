import MovieCard from "./MovieCard"
import {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CardHeader, CardMedia } from "@mui/material";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InvitePage from './InvitePage';
import Typography from '@mui/material/Typography'
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";


function MoviesContainer({user, apiKey}) {
    const [matchMovies, setMatchMovies] = useState([]);
    const [renderMovies, setRenderMovies] = useState([]);
    const [currMov, setCurrMov] = useState(0);
    const [stackMovies, setStackMovies] = useState([]);
    const [votes, setVotes] = useState([])
    const [usersToCompare, setUsersToCompare] = useState("");
    const [errors, setErrors] = useState("");
    const [movPoster, setMovPoster] = useState("");
    const { id } = useParams();
    



    useEffect(() => {
        fetch(`/cardstacks/${id}`)
          .then(response => response.json())
          .then(data => setStackMovies(data.movies))
      }, [])



    useEffect(() => {
        if(stackMovies) {
        setRenderMovies(stackMovies.map(movie => (
            <MovieCard 
                key={movie.id}
                title={movie.title}
                movieid={movie.id}
                currMov={currMov}
                setCurrMov={setCurrMov}
                renderMovies={renderMovies}
                apiKey={apiKey}
            />
        )))}
    }, [stackMovies, currMov]);



    function returnLikedMovies() {
        fetch('/votes')
          .then(response => response.json())
          .then(data => setVotes(data))
    }


    useEffect(() => {
        const doesUserExist = votes.filter(vote => (vote.user.username === usersToCompare))
        const usersvotes = votes.filter(vote => (vote.user.username === usersToCompare || vote.user.username === user.username))
        const likedvotes = usersvotes.filter(vote => (vote.liked === true))
        const likedmovies = likedvotes.map(vote => vote.movie.title)

        console.log(doesUserExist)


        const dupMov = likedmovies.filter((c, index) => {
            return likedmovies.indexOf(c) !== index;
        });


        if (doesUserExist.length > 0 && dupMov.length > 0){
            const moviearray = (dupMov.map(mov => mov))
            const singlemovie = moviearray[Math.floor(Math.random()*matchMovies.length)]
            setMatchMovies(singlemovie)
        } else if (likedmovies.length > 1 && dupMov.length < 1){
            setErrors("No Matches")
        }
    }, [votes])

    function handleShowAll(){
        const usersvotes = votes.filter(vote => (vote.user.username === usersToCompare || vote.user.username === user.username))
        const likedvotes = usersvotes.filter(vote => (vote.liked === true))
        const likedmovies = likedvotes.map(vote => vote.movie.title)
        const dupMov = likedmovies.filter((c, index) => {
            return likedmovies.indexOf(c) !== index;
        });
        setMatchMovies(dupMov)
    }

    function resetVotes(){
        fetch(`/resetvotes/${user.id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            }})
        setCurrMov(0)
        setMatchMovies([])
        setUsersToCompare("")
        setErrors("")
    }

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${matchMovies}`)
            .then(res => res.json())
            .then((movie) => {
                setMovPoster(movie.Poster)
            })
    }, [matchMovies]);


if (renderMovies[currMov]) {
    console.log(renderMovies[currMov])
    return(
        
        <>
        <Box height={800}>{renderMovies[currMov]}</Box>
        </>
        
        
    )
}else if (matchMovies.length > 0){
    return(
        <Grid sx={{
            marginTop: 10,
            marginBottom: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <Box sx={{ boxShadow: 15 }}>
        <Card variant="outlined" sx={{ maxWidth: 1000, minWidth: 600, minHeight: 500}} >
            <CardHeader title="YOU SHOULD WATCH:" />
            <CardContent>
            {typeof matchMovies === 'string' ? 
                <>
                <Paper elevation={0}>
                    <img src={movPoster} alt="moviePoster"/>
                </Paper>
                <h1 key={matchMovies.id}>{matchMovies}</h1>
                </> : 
                matchMovies.map(movie => <h1 key={movie.id}>{movie}</h1>)}
                 <Button variant="contained" size="large" onClick={resetVotes}>
                NEW SESSION
                </Button>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
                    OR
                </Typography>
                <Button variant="contained" size="large" onClick={handleShowAll}>
                SEE ALL MATCHES
                </Button>
            </CardContent>
        </Card>
        </Box>
        </Grid>
    )
}else return(
    <InvitePage 
        returnLikedMovies={returnLikedMovies}
        usersToCompare={usersToCompare}
        setUsersToCompare={setUsersToCompare}
        errors={errors}
        resetVotes={resetVotes}
        />
)
}

export default MoviesContainer