import React, { Component } from 'react'
import {Card } from 'react-bootstrap';
import Reply from './Reply';
import axios from 'axios'

export default class MessageCard extends Component {

  state = {
    clickedMessage: this.props.clickedMessage
  }
  componentDidUpdate(prevProps){
    if(prevProps.clickedMessage !== this.props.clickedMessage){
        this.setState({          
            clickedMessage: this.props.clickedMessage
        });
    }
}
  
  state = {
    client: ''
  }

  componentDidMount = () => {
    axios.get('/api/client')
    .then(response => {
      console.log(response.data);
      // put them into the state
      this.setState({
       client: response.data
      })
    })
    .catch(err => console.log(err))
  }
  
  render() {
    console.log(this.props.clickedMessage, "cardmessage")
    if (!this.state.client) return null
    return (
      <>
      <div className='messagesCenter'>
        <Card className="message-card">
          <Card.Header>Messages</Card.Header>
            <Card.Body className='scroller'>
             {/*this.state.allMessages.map((data) => data._doc.message.map((message)=> {
               return (
                 <div>
                 <Card.Text>
                 {message.content}
                <p style={{fontSize: '10px'}}>Wrote by {message.user.username}</p>
                </Card.Text>  
                 </div>
               )
             } ))*/ this.state.clickedMessage && this.state.clickedMessage.map(message => {
               return(
                 <div>
                 <Card.Text >
                 <div className= {this.state.client.username === message.user.username  ?  "talk-bubble-right tri-right round right-in" : "talk-bubble-left tri-right round left-in" }>
                 <div className= {this.state.client.username === message.user.username  ?  "talktext-right" : "talktext-left" } >
                 {message.content}
                 <p style={{fontSize: '10px'}}>Wrote by {message.user.username}</p>
                </div>
                </div>
                </Card.Text>  
                 </div>
               )
             })}

             
            {/* <Card.Text>
            <div class="talk-bubble-left tri-right round left-in">
            <div class="talktext-left"> 
            
            <p style={{fontSize: '10px'}}>Wrote by {message.user.username}</p>
            </div>
            </div>
            
            </Card.Text>   */}

               </Card.Body>

               <Reply replyMessage = {this.props.replyMessage} messageID = {this.props.messageID} />   


               </Card>
           </div>


      </>
    )
  }
}