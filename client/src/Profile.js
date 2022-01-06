import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const theme = createTheme();

export default function Profile({user, cards, setCardstackName, setCardstackId, cardstackName, setRerenderDelete, rerenderDelete}) {


    function handleSubmit(){
        fetch('/cardstacks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Accept: "application/json"
            },
            body: JSON.stringify({
                name: cardstackName,
                user_id: user.id,
            })
        })
        .then(res => res.json())
        .then((cardstack) => {
                setCardstackId(cardstack.id)
            })
        setRerenderDelete(rerenderDelete = !rerenderDelete)
    }

    function handleDelete(id){
        fetch(`/cardstacks/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            }
        })
        setRerenderDelete(rerenderDelete = !rerenderDelete)
    }

    function addToCard(id, name){
        setCardstackId(id) 
        setCardstackName(name)
    }


  return (
      <>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {`${user.username}'s MovieStacks`}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>      
                Welcome to MovieStack!         
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Remove the stress from movie night. Swipe through a stack of movies, send a link to a friend, and MovieStack will pick for you! 
            </Typography>
            <Stack
              sx={{ pt: 1 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <TextField
              value={cardstackName}
              onChange={(e) => setCardstackName(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="cardstackName"
              label="New MovieStack Name"
              name="cardstackName"
              autoComplete="cardstackName"
              autoFocus
            />
            <NavLink style={{ textDecoration: 'none' }} to="/addmovies">
              <Button variant="outlined" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit} >Create!</Button>
            </NavLink>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards ? (cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    image={card.movies[0] && card.movies[0].poster ? (card.movies[0].poster) : "https://ih1.redbubble.net/image.1027712254.9762/fposter,small,wall_texture,product,750x1000.u2.jpg"}
                    alt="random"
                  />
                  <CardActions>
                    <NavLink style={{ textDecoration: 'none' }} to={`/stacks/${card.id}`}>
                        <Button size="small">Swipe</Button>
                    </NavLink>
                    <NavLink style={{ textDecoration: 'none' }} to="/addmovies">
                        <Button size="small" onClick={() => {addToCard(card.id, card.name)}}>Add</Button>
                    </NavLink>
                    <Button size="small" onClick={() => {handleDelete(card.id)}}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))) : <Typography gutterBottom variant="h5" component="h2">
            NO CARDS
          </Typography>}
          </Grid>
        </Container>
      </main>
      </>
  );
}