import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import {useState } from 'react'
import TextField from '@mui/material/TextField';
import RenderSearchedMovies from './RenderSearchedMovies'
import { NavLink } from 'react-router-dom';
import {useEffect} from 'react';




export default function AddMovies({cardstackId, rerenderDelete, setRerenderDelete, apiKey, renderName}) {
    const [movieSearch, setMovieSearch] = useState("")

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
            >
              {`${renderName}`}
            </Typography>
            <NavLink style={{ textDecoration: 'none' }} to={`/stacks/${cardstackId}`}>
                <Button size="small" >SWIPE</Button>
            </NavLink>
            <Typography sx={{pt: 4}} variant="h5" align="center" color="text.secondary" paragraph>
              Search for movies to add to your new stack!
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <TextField
              value={movieSearch}
              onChange={(e) => setMovieSearch(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="movieSearch"
              label="Search for Movies"
              name="movieSearch"
              autoComplete="movieSearch"
              autoFocus
            />
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
              <RenderSearchedMovies 
                cardstackId={cardstackId} 
                searchObject={movieSearch}
                rerenderDelete={rerenderDelete}
                setRerenderDelete={setRerenderDelete}
                apiKey={apiKey}/>
          </Grid>
        </Container>
      </main>
      </>
  );
}