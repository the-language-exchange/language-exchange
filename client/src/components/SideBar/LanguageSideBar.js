import React, {useState} from 'react'
import languages from './LanguageList'
import { Dropdown} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export default function LanguageSideBar(props) {
  const [language, setLanguage] = React.useState('')

  const changeHandler = (event, data) => {
    setLanguage(data.value)
    props.setLanguage(data.value)
    //props.handleChange()
   }

   React.useEffect(() => {
    props.handleChange()
   },[props.language])
  return (
    <div>
    <Dropdown 
    placeholder = 'Choose Your Language'
    className = 'languageSideBar'
    name={props.name}
    fluid multiple selection 
    options={languages.map(obj => ({...obj, key:obj.code, text:obj.name, value:obj.name }))}
    onChange = {changeHandler}
    defaultValue= {language}
     />
    </div>
  )
}
