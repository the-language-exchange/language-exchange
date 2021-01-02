import React, {useState} from 'react'
import countries from './CountryList'
import { Dropdown} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export default function CountrySideBar(props) {
  const [country, setCountry] = React.useState('')

  const changeHandler = (event, data) => {
    setCountry(data.value)
    props.setCountry(data.value)
    //props.handleChange()
   }

   React.useEffect(() => {
    props.handleChange()
   },[props.country])
  return (
    <div>
    <Dropdown 
    placeholder = 'Choose The Country'
    className = 'languageSideBar'
    name={props.name}
    fluid multiple selection 
    options={countries.map(obj => ({...obj, key:obj.code, text:obj.name, value:obj.name }))}
    onChange = {changeHandler}
    defaultValue= {country}
     />
    </div>
  )
}