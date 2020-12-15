import React, { Component } from 'react';
// import MessageForm from './MessageForm';
import axios from 'axios';
import MessageList from './MessageList'
import MessageCard from './MessageCard'

// import axios from 'axios';

export default class Messages extends Component {
  state = {
    clickedMessage : '',
    messageID:null,
    allMessages: null,
    showMessage: false
  }

  getMessage = (messageID) => {
    const filtered = this.state.allMessages.filter(message => message._id == messageID)
    this.setState({messageID, clickedMessage:filtered.message})
  }
  getData = () => {
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

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    console.log(this.state);
    axios.post('/api/messages/', {
      content: this.state.content
    })
      .then(() => {
        // set the form to it's initial state (empty input fields)
        this.setState({
          content:''
        })
        // update the parent components state (in Projects) by calling getData()
        this.props.getData();
      })
      .catch(err => console.log(err))

  }

  toggleMessage = () => {
    this.setState((prevState) => ({
      showMessage: !prevState.showMessage
    }))
  }



  render() {
    if(!this.state.messages) return <p>Loading...</p>
    return (
    <div className='messagesInbox'>
     <MessageList allMessages = {this.state.allMessages} getMessage = {this.getMessage} />
     <MessageCard />
    </div>      
    )
  }
}

