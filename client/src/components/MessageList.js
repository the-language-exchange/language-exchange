import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
export default class MessageList extends Component {
  
  showData = (messageID) => {
    this.props.getMessage(messageID)
    this.props.getData()
  }
  //() => this.props.getMessage(messageID)
  //componentDidUpdate
  
  render() {
    console.log(this.props.allMessages, "allid")
    return (
      <div>
      <ListGroup className="text-left">
      {this.props.allMessages.map(message => {
        const messageID = message._doc._id
        return (<div>
          <ListGroup.Item>
          <Link onClick = {() => this.showData(messageID)}>
          {message.client._id == message._doc.sender._id ?
           message._doc.receiver.username : message._doc.sender.username}
          </Link>
          </ListGroup.Item>
        </div>)
      })}
      </ListGroup>
      </div>
    )
  }
}
