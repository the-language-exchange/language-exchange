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


  getData = () => {
    axios.get('/api/messages')
      .then(response => {
        console.log(response.data,  "  messages of all");
        // put them into the state
        this.setState({
          allMessages: response.data
        })
      })
      .catch(err => console.log(err))
  }

  getMessage = (messageID) => {
    const filtered = this.state.allMessages.filter(message => message._doc._id == messageID)
    console.log(filtered, ' msg filtered')
    this.setState({messageID, clickedMessage:filtered[0]._doc.message})
  }

  replyMessage = (message) => {
    this.setState(prevState => ({
      clickedMessage: [...prevState.clickedMessage, message]
    }))
  }

  componentDidMount() {
    this.getData();
  }


  

  toggleMessage = () => {
    this.setState((prevState) => ({
      showMessage: !prevState.showMessage
    }))
  }



  render() {
    if(!this.state.allMessages) return <p>Loading...</p>
    return (
    <div className='messagesInbox'>
     <MessageList 
     allMessages = {this.state.allMessages} 
     getMessage = {this.getMessage}
     getData = {this.getData}
     />
     <MessageCard 
     replyMessage = {this.replyMessage} 
     messageID = {this.state.messageID}
     clickedMessage = {this.state.clickedMessage}
     allMessages ={this.state.allMessages}
    />
    </div>      
    )
  }
}