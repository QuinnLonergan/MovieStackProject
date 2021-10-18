
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';

function InvitePage({returnLikedMovies, usersToCompare, setUsersToCompare, errors, resetVotes}){
    const [copied, setCopied] = useState(false);

    // CODE TO COPY CURRENT URL
    function copy() {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
    }

    // CODE TO COPY A STATIC URL
    // function copy() {
    //     var el = document.createElement('textarea');
    //     el.value = "STATIC URL HERE";
    //     el.setAttribute('readonly', '');
    //     el.style = {position: 'absolute', left: '-9999px'};
    //     document.body.appendChild(el);
    //     el.select();
    //     document.execCommand('copy');
    //     document.body.removeChild(el);
    //     setCopied(true);
    //  }


    return(
        <Grid sx={{
            marginTop: 10,
            marginBottom: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <Box sx={{ boxShadow: 15 }}>
        <Card variant="outlined" sx={{ maxWidth: 1000, minWidth: 900, minHeight: 500}} >
            <CardHeader title="Compare with a friend!" />
            <CardContent>
            <Button onClick={copy}>{!copied ? "Copy link to this stack" : "Copied!"}</Button>
            </CardContent>
                    <TextField
                    value={usersToCompare}
                    onChange={(e) => setUsersToCompare(e.target.value)}
                    margin="normal"
                    required
                    helperText={errors}
                    id="users"
                    label="Users"
                    name="users"
                    autoComplete="users"
                    autoFocus
                    sx={{ width: 500 }}
                    />
                    <CardContent>
                        <Button
                        type="submit"
                        variant="contained"
                        onClick={returnLikedMovies}
                        sx={{ mb: 2 }}
                        >
                        See Combatable Movies
                        </Button>
                    </CardContent>
                    <Divider />
                    <CardHeader title="No matches? Start a new session" />
                    <Button variant="contained" size="large" onClick={resetVotes}>
                        NEW SESSION
                    </Button>
        </Card>
        </Box>
        </Grid>
    )
}

export default InvitePage