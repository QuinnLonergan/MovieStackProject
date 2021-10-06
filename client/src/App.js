import './App.css';
import {useState, useEffect} from 'react'
import Login from './Login';
import Header from './Header';
import Main from './Main';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import Footer from './Footer'
import Grid from '@mui/material/Grid'



function App() {
  const [user, setUser] = useState(null);
  const [light, setLight] = useState(true)

  const apiKey = (process.env.REACT_APP_OMDB_API_KEY)

  console.log(apiKey)

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const lightTheme = createTheme({
    palette: {
      background: {
        default: "#e4f0e2"
      }
    }
  });

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;


  return (
    <ThemeProvider theme={light ? lightTheme : darkTheme}>
      <CssBaseline />
        <div className="App">
            <Header setUser={setUser} user={user} setLight={setLight} light={light}/>
            <Main apiKey={apiKey}/>
        </div>
          <Footer />
    </ThemeProvider>
  );
}

export default App;
