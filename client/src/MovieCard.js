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
import { red, green } from '@mui/material/colors';
import Fade from '@mui/material/Fade';




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





function MovieCard({title, currMov, setCurrMov, movieid, apiKey}) {
    const [expanded, setExpanded] = React.useState(false);
    const [currentMovie, setCurrentMovie] = useState([])
    const [user, setUser] = useState([])
    const [checked, setChecked] = useState(true);

    document.onkeydown = function (e) {
        e = e || window.event;
        switch (e.which || e.keyCode) {
              case 37 : nextCard() 
              onNoClick()
                  break;
                case 39 : nextCard() 
                onYesClick()
                      break;
        }
      }

    const handleChange = () => {
        setChecked(false);
        setTimeout(function(){ setChecked(true) }, 400);
    };

    useEffect(() => {
        fetch('/me')
            .then(response => response.json())
            .then(data => setUser(data))
        }, [])

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
        console.log("Make new swipesession aaociated with user and cardstack")
        console.log(movieid)
    }

    function onYesClick(){
        console.log(user)
        fetch('/votes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                liked: true,
                user_id: user.id,
                movie_id: movieid
            })
        })
    }

    function onNoClick(){
        console.log(user)
        fetch('/votes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                liked: false,
                user_id: user.id,
                movie_id: movieid
            })
        })
    }

    function nextCard(){
        setTimeout(function(){ setCurrMov(currMov + 1) }, 300);
                    if (currMov === 0){
                        onFirstClick()
                    }
        handleChange()
    }


    if (currentMovie) return(
        <Grid sx={{
            marginTop: 5,
            marginBottom: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <Fade direction="up" in={checked} mountOnEnter unmountOnExit>
        <Card sx={{ maxWidth: 300 }} >
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
            <CardActions disableSpacing >
                <IconButton aria-label="add to favorites" id="no" size="small" sx={{ color: red[500] }} onClick={() => {
                    nextCard()
                    onNoClick()
                    }}
                    >
                <CloseIcon fontSize="large"/>
                </IconButton>
                <IconButton aria-label="share" id="yes" size="small" sx={{ color: green[500] }} 
                    onClick={() => {
                        nextCard()
                        onYesClick()
                    }}>
                <CheckIcon fontSize="large"/>
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
                    <Typography variant="body2" color="text.secondary">
                    {currentMovie.Plot}
                    </Typography>
                </CardContent>
            </Collapse>
    </Card>
    </Fade>
    </Grid>
    )
}

export default MovieCard;