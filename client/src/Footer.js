import { SocialIcon } from 'react-social-icons';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Socials() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        <SocialIcon url="https://medium.com/@qui99lo" />
        <SocialIcon url="https://www.linkedin.com/in/quinn-lonergan/" style={{marginLeft: 5, marginRight: 5}}/>
        <SocialIcon url="https://github.com/QuinnLonergan" />
      </Typography>
    );
  }

  export default function Footer(){
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 3, flexGrow: 1 }} component="footer" >
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Made with ♥ by Quinn Lonergan
        </Typography>
        <Socials />
      </Box>
    )
}