import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SearchField from './SearchField';
import LanguageField from './LanguageField';
import CountryField from './CountryField'
import AgeSlider from './AgeSlider';
import axios from 'axios'
import _ from 'lodash'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function SideBar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [age, setAge] = React.useState([18,37])
  const [country, setCountry] = React.useState([])
  const [language, setLanguage] = React.useState([])
  const [skillInterest, setSkillInterest] = React.useState('')

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = () => {
    axios.get('api/users')
    .then(response => {
      const filtered = response.data.filter(obj =>{
        console.log(skillInterest)
        return(
          (obj.age >= age[0] && obj.age <= age[1]) && 
          (language.length == 0 ? true: _.intersection(obj.languagesSpoken, language).length !== 0 )
          && (obj.skills.join(' ').toLowerCase().includes(skillInterest.toLowerCase())   
            || obj.interests.join(' ').toLowerCase().includes(skillInterest.toLowerCase()) 
          ) && (country.length == 0 ? true: country.includes(obj.country))
        )
      } )
     props.updateData(filtered)
    })
    .catch(err => console.log(err))
  }
 
  
  const drawer = (
    <div>
      <div className={classes.toolbar} />
     <Typography paragraph>Hello</Typography>
      <Divider />
      <List>
        
        <SearchField handleChange = {handleChange} skillInterest = {skillInterest} setSkillInterest = {setSkillInterest}/>
        <LanguageField handleChange = {handleChange} language= {language} setLanguage = {setLanguage} />
        <CountryField handleChange = {handleChange} setCountry = {setCountry} country = {country} />
        <AgeSlider age = {age} setAge = {setAge} handleChange = {handleChange} />
      
      </List>
     
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
      

      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="permanent"
            
            open={mobileOpen}
           
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      
    </div>
  );
}

SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SideBar;