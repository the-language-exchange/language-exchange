import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function SearchField(props) {
  const classes = useStyles();
   const [skillInterest, setSkillInterest] = React.useState('')

   const changeHandler = (event) => {
    setSkillInterest(event.target.value)
    props.setSkillInterest(event.target.value)
    //props.handleChange()
   }

   React.useEffect(() => {
    props.handleChange()
   },[props.skillInterest])

  return (
    <div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchIcon fontSize = "small"/>
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid"
            label="Search" 
            value = {skillInterest} 
            onChange = {changeHandler} 
          />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}