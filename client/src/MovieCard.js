import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import {useState, useEffect} from 'react'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function MovieCard({title, currMov, setCurrMov, renderMovies}) {
    const [expanded, setExpanded] = React.useState(false);
    const [currentMovie, setCurrentMovie] = useState([])
    const apiKey = "";

    const handleExpandClick = () => {
    setExpanded(!expanded);
    };

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`)
            .then(res => res.json())
            .then((movie) => {
                setCurrentMovie(movie)
            })
    }, [title]);

    function onFirstClick(){
        console.log("and here we go")
    }

    return(
        <Grid sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <Card sx={{ maxWidth: 320 }}>
            <CardHeader
                title={currentMovie.Title}
                subheader={currentMovie.Runtime}
            />
            <CardMedia
                component="img"
                height="450"
                image={currentMovie.Poster}
                alt={title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                {currentMovie.Plot}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => {
                    setCurrMov(currMov + 1);
                    if (currMov === 0){
                        onFirstClick()
                    }
                    }}>
                <CloseIcon />
                </IconButton>
                <IconButton aria-label="share" onClick={() => {
                    // currMov < renderMovies.length - 1 && setCurrMov(currMov + 1);
                    setCurrMov(currMov + 1);
                    if (currMov === 0){
                        onFirstClick()
                    }
                    }}>
                <CheckIcon />
                </IconButton>
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography paragraph>Released: {currentMovie.Released}</Typography>
                <Typography paragraph>
                    Director: {currentMovie.Director}
                </Typography>
                <Typography paragraph>
                    Awards: {currentMovie.Awards}
                </Typography>
                </CardContent>
            </Collapse>
    </Card>
    </Grid>
    )
}

export default MovieCard;