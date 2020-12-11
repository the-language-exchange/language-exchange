import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import SideBar from './SideBar/SideBar';



export default class ProfileList extends Component {
  state = {
    users: []
  }

  getData = () => {
    axios.get('api/users')
    .then(response => {
      this.setState({ 
        users: response.data
      })
    })
    .catch(err => console.log(err))
  }

  updateData = (data) => {
    this.setState({users:data})
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    if (!this.state.users) return <h3>Loading ...</h3>
    return (
      <div className='users-container'>
      <SideBar updateData = {this.updateData} />
      {this.state.users.map(user => {
        return(
        <div key={user._id}>
              <h3>
              <Link to={`/${user._id}`}>
              {user.username}
              </Link>
            </h3>
        </div>
        )
      })}
      </div>
    )
  }
}