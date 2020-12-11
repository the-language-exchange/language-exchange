import './App.css';
import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import ProfileList from './components/ProfileList';
import SideBar from './components/SideBar/SideBar';
import ProfileDetails from './components/ProfileDetails';
import MyUserDetails from './components/MyUserDetails';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar'


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
     <Navbar user={this.state.user} setUser={this.setUser} />

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
    </div>
  );
  }
}



export default App;
