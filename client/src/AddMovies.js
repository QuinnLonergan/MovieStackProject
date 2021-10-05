import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {useState } from 'react'
import TextField from '@mui/material/TextField';
import RenderSearchedMovies from './RenderSearchedMovies'



export default function AddMovies({cardstackId, cardstackName, rerenderDelete, setRerenderDelete, apiKey}) {
    const [movieSearch, setMovieSearch] = useState("")



  return (
      <>
      <main>
        {/* Hero unit */}
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
              {`${cardstackName}`}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Search for movies to add to your new stack!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
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
          {/* End hero unit */}
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