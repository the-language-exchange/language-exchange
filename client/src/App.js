import './App.css';
import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import ProfileList from './components/ProfileList';
import { Route } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';



class App extends React.Component {

  state = {
    user: this.props.user
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }

  render () {
  return (
    <div className="App">
    <SideBar />
     <Route
          exact
          path='/signup'
          render={props => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path='/login'
          render={props => <Login setUser={this.setUser} {...props}/>}
        /> 
      <Route
      exact
      path='/'
      component={ProfileList}
      />
    </div>
  );
  }
}



export default App;
