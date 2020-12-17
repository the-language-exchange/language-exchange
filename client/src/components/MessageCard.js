import React, { Component } from 'react'
import {Card } from 'react-bootstrap';
import Reply from './Reply'
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
  
  render() {
    console.log(this.state.clickedMessage, " cardmessage")
    return (
      <div className='messagesCenter'>
        <Card className="text-center">
          <Card.Header>Message from {null}</Card.Header>
            <Card.Body>
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
                 <Card.Text>
                 {message.content}
                <p style={{fontSize: '10px'}}>Wrote by {message.user.username}</p>
                </Card.Text>  
                 </div>
               )
             })}

             
            <Card.Text>
            With supporting text below as a natural lead-in to additional content.
            <p style={{fontSize: '10px'}}>Wrote by Sender</p>
            </Card.Text>  
               <Reply replyMessage = {this.props.replyMessage} messageID = {this.props.messageID} />   
               </Card.Body>
               <Card.Footer className="text-muted">2 days ago</Card.Footer>
               </Card>
      </div>
    )
  }
}
