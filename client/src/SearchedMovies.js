import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'


export default function SearchedMovies({handleAdd, card, isAdded}){
    return (
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
              {isAdded ? (
                    <Button size="small" onClick={() => {handleAdd(card.Title, card.Poster)}}>Add to Stack</Button>
                  ) : (
                    <Button size="small" >Added</Button>
                  )}
              </CardActions>
            </Card>
          </Grid>
    )
}