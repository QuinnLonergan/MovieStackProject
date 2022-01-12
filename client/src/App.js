import './App.css';
import {useState, useEffect} from 'react'
import Login from './Login';
import Header from './Header';
import Main from './Main';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import Footer from './Footer'


function App() {
  const [user, setUser] = useState(null);
  const [light, setLight] = useState(true)

  const apiKey = (process.env.REACT_APP_OMDB_API_KEY)

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#81c784',
      },
    },
  });

  // const lightTheme = createTheme({
  //   palette: {
  //     background: {
  //       default: "#e4f0e2"
  //     }
  //   }
  // });
// const darkTheme = createTheme({
//   palette: {
//     type: 'dark',
//     primary: {
//       main: '#303030',
//       dark: '#9e9e9e',
//       light: '#7d7d7d',
//     },
//     secondary: {
//       main: '#81c784',
//       contrastText: '#81c784',
//     },
//     background: {
//       default: '#121212',
//       paper: '#121212',
//     },
//     info: {
//       main: '#ff5722',
//     },
//     text: {
//       primary: '#ffffff',
//     },
//   },
// })


  const lightTheme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: 'rgba(0,0,0,0.52)',
      },
      secondary: {
        main: '#fb8c00',
      },
      background: {
        default: '#e5ffe8',
        paper: '#ffffff',
      },
      info: {
        main: '#ff5722',
      },
      text: {
        primary: 'rgba(0,0,0,0.87)',
      },
    },
  })

  useEffect(() => {
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
