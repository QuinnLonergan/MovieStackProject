
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CardHeader from "@mui/material/CardHeader";
import { Container } from "@mui/material";

export default function RenderSearchResults({ searchObject, cardstackId, rerenderDelete, setRerenderDelete, apiKey }) {
    const [movies, setMovies] = useState([]);
    const [currentStackMovies, setCurrentStackMovies] = useState([])
    const [isAdded, setIsAdded] = useState(true)

    useEffect(() => {
            fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchObject}`)
                .then(res => res.json())
                .then((movies) => {
                    setMovies(movies.Search)
                })
    }, [searchObject]);

    useEffect(() => {
        fetch(`/cardstacks/${cardstackId}`)
        .then(res => res.json())
        .then((stack) => {
                    setCurrentStackMovies(stack.movies)
                })
    }, [rerenderDelete, cardstackId])

    function handleAdd(movieTitle, moviePoster){
        setIsAdded((isAdded) => (!isAdded))
        fetch('/movies', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: movieTitle,
                    poster: moviePoster,
                    cardstack_id: cardstackId,
                })
            })
            .then(res => res.json())
            .then((movie) => {
                    console.log(movie)
                })
            setRerenderDelete(rerenderDelete = !rerenderDelete)
    }

    function handleDelete(id){
        fetch(`/movies/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            }
        })
        setRerenderDelete(rerenderDelete = !rerenderDelete)
    }

    if (searchObject.length > 0) {
        return (
            <div className='cardGroupSearch'>
            <Grid container spacing={4}>
                {movies ? (movies.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.Title}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    image={card.Poster}
                    alt={card.Poster}
                  />
                  <CardActions>
                    <Button size="small" onClick={() => {handleAdd(card.Title, card.Poster)}}>Add to Stack</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))) : <h1></h1>}
          </Grid>
            </div>
        )
    } else return (
        <Grid sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <Box sx={{ boxShadow: 15 }}>
        <Card variant="outlined" sx={{ maxWidth: 1000, minWidth: 900, minHeight: 500}} >
            <CardHeader title="Current Movies in Stack:" />
            <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {currentStackMovies ? (currentStackMovies.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    image={card.poster}
                    alt="random"
                  />
                  <CardActions>
                    <Button size="small" onClick={() => {handleDelete(card.id)}}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))) : <CardHeader />}
            </Grid>
        </Container>
        </Card>
        </Box>
        </Grid>
    )
}