import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useState, useEffect} from 'react'



export default function CustomStacks() {
    const [cards, setCards] = useState([])

    useEffect(() => {
        fetch(`/cardstacks`)
          .then(response => response.json())
          .then(data => setCards(data))
      }, [])
      
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
              Browse other users' custom movie stacks
            </Typography>
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
                    <Typography gutterBottom variant="subtitle1" component="h2">
                      Created by: {card.user.username}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    image={card.movies[0] && card.movies[0].poster ? (card.movies[0].poster) : "https://ih1.redbubble.net/image.1027712254.9762/fposter,small,wall_texture,product,750x1000.u2.jpg"}
                    alt="random"
                  />
                  <CardActions>
                    <NavLink style={{ textDecoration: 'none' }} to={`/stacks/${card.id}`}>
                        <Button size="small" >Swipe</Button>
                    </NavLink>
                  </CardActions>
                </Card>
              </Grid>
            ))) : <Typography gutterBottom variant="h5" component="h2">
            NO STACKS
          </Typography>}
          </Grid>
        </Container>
      </main>
      </>
  );
}