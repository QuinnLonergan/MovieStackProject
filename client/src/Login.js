import { useState } from "react"
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? (
        <>
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
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <Grid container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setShowLogin(true)}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        </>
      )}
    </div>
  )
}


export default Login