import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { ListSubheader } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MovieIcon from '@mui/icons-material/Movie';
import HelpIcon from '@mui/icons-material/Help';


function Header({user, setUser, setLight, light}) {
  const [cards, setCards] = useState([])

    useEffect(() => {
        fetch(`/cardstacks`)
          .then(response => response.json())
          .then(data => setCards(data))
      }, [])

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // function randomStack(){
  //   fetch(`/cardstacks`)
  //     .then(response => response.json())
  //     .then(data => setCards(data))
  // }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {`logged in as: ${user.username}`}
        </ListSubheader>
      }>
          <ListItemButton component={Link} to={'/'} key={'Home'}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText  primary={'Home'} />
          </ListItemButton>
          <ListItemButton component={Link} to={'/custom'} key={'Custom Stacks'}>
            <ListItemIcon>
              <LocalMoviesIcon />
            </ListItemIcon>
            <ListItemText primary={'Custom Stacks'} />
          </ListItemButton>
          <ListItemButton component={Link} to={'/genre'} key={'Genre Stacks'}>
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary={'Genre Stacks'} />
          </ListItemButton>
          <ListItemButton onClick={console.log("hello")} component={Link} to={'/genre'} key={'Genre Stacks'}>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary={'Random Stack'} />
          </ListItemButton>
      </List>
    </Box>
  );



    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }

      const anchor = 'left'


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton >
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
          <Typography align='left' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MovieStack
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={() => setLight((prev) => !prev)} color="inherit">
                {light === false ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          <Button onClick={handleLogoutClick} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;