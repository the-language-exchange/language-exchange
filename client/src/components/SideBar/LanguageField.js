import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import countries from './CountryList'
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, targetValue, theme) {
  return {
    fontWeight:
      targetValue.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function LanguageField() {
  const classes = useStyles();
  const theme = useTheme();
  const [targetValue, setTargetValue] = React.useState([]);

  const handleChange = (event) => {
    setTargetValue(event.target.value);
  };

 

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Languages</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={targetValue}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {countries.map((country) => (
            <MenuItem key={country.code} value={country.name} style={getStyles(country.name, targetValue, theme)}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  
    </div>
  );
}