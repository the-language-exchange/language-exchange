import React, { Component } from 'react';
// import MessageForm from './MessageForm';
import axios from 'axios';

// import { Link } from 'react-router-dom'
// import axios from 'axios';

export default class Messages extends Component {
  state = {
    messages: []
  }
  getData = () => {
    // get the current list of projects from the server
    axios.get('/api/messages')
      .then(response => {
        console.log(response);
        // put them into the state
        this.setState({
          messages: response.data
        })
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div>
        <h1>Messages will be here!</h1>
     

      </div>
    )
  }
}

