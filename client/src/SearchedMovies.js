export default function SearchedMovies({handleAdd, movies}){


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
              {isAdded ? (
                    <Button size="small" onClick={() => {handleAdd(card.Title, card.Poster)}}>Add to Stack</Button>
                  ) : (
                    <Button size="small" >Added</Button>
                  )}
              </CardActions>
            </Card>
          </Grid>
        ))) : <h1></h1>}
      </Grid>
        </div>
    )
}