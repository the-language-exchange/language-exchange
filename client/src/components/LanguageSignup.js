import React ,{ useState } from 'react'
import { Dropdown} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import languages from './SideBar/LanguageList'


const LanguageSignup = () => {

  const [val, setVal] = useState([])
  const Handler = (e, data) => setVal(data.value)
  console.log(val)
  return (
    <>
    <Dropdown 
    placeholder = 'Choose Your Language'
    fluid multiple selection 
    options={languages.map(obj => ({...obj, key:obj.code, text:obj.name, value:obj.name }))}
    onChange = {Handler}
    defaultValue= {val}
     />
     </>
  )
 
 }

/*const DropdownExampleMultipleSelection = () => {
  const [val, setVal] = useState([]);
  const Handler = (e, data) => setVal(data.value);
  console.log(val)
  return(
    <>
     <Dropdown placeholder='Skills' fluid multiple selection options={options}
     onChange = {Handler} defaultValue = {val}/>
    </>
  )*/
 

/* 
ui.selection.dropdown
calc(1.5em + 0.75rem + 2px) !important

ui.selection.active.dropdown:hover {
    border-color: #cce2ff;
    box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
1px solid #ced4da
FOCUS!!
color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25)
*/
export default LanguageSignup
