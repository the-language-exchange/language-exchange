import React, { Component } from 'react'
import {Card } from 'react-bootstrap';
import Reply from './Reply'
export default class MessageCard extends Component {
  
  render() {
    console.log(this.props.clickedMessage, " cardmessage")
    return (
      <div className='messagesCenter'>
        <Card className="text-center">
          <Card.Header>Message from {null}</Card.Header>
            <Card.Body>
             {/*this.props.allMessages.map((data) => data._doc.message.map((message)=> {
               return (
                 <div>
                 <Card.Text>
                 {message.content}
                <p style={{fontSize: '10px'}}>Wrote by {message.user.username}</p>
                </Card.Text>  
                 </div>
               )
             } ))*/ this.props.clickedMessage && this.props.clickedMessage.map(message => {
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
