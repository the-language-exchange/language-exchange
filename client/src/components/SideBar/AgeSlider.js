import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function AgeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.age);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.setAge(newValue);
    props.handleChange()
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Age
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min = {18}
        max = {99}
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}