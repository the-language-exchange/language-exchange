import './App.css';
import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import ProfileList from './components/ProfileList';


import ProfileDetails from './components/ProfileDetails';
import MyUserDetails from './components/MyUserDetails';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Messages from './components/Messages';



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
    
     <Navbar user={this.state.user} setUser={this.setUser} />

    <Switch>
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
        path='/messages'
        component={Messages}
      />
      <Route
        exact
        path='/'
        component={ProfileList}
      />
      <Route
        exact
        path='/:id'
        render={props => <ProfileDetails setUser={this.setUser} {...props}/>}
        // component={ProfileDetails}
      />
      <Route
        exact
        path='/myuser/:id'
        render={props => <MyUserDetails setUser={this.setUser} {...props}/>}
      />
     
      </Switch>
    </div>
  );
  }
}



export default App;
