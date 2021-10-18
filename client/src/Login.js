import { useState } from "react"
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card'


function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  const lightTheme = createTheme({
    palette: {
      background: {
        default: "#e4f0e2"
      }
    }
  });

  return (
    <ThemeProvider theme={lightTheme}>
     <CssBaseline />
    <div>
      {showLogin ? (
        <>
        <Grid container sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Card variant="outlined" sx={{ maxWidth: 1000, minWidth: 900, minHeight: 500}} >
          <LoginForm onLogin={onLogin} />
          <Grid container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setShowLogin(false)}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Card>
          </Grid>
        </>
      ) : (
        <>
        <Grid container sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <Card variant="outlined" sx={{ maxWidth: 1000, minWidth: 900, minHeight: 550}} >
          <SignUpForm onLogin={onLogin} />
          <Grid container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setShowLogin(true)}>
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
            </Card>
            </Grid>
        </>
      )}
    </div>
    </ThemeProvider>
  )
}


export default Login