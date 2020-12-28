import axios from 'axios';
import React, { Component } from 'react'
import {Button, Form } from 'react-bootstrap';
export default class Reply extends Component {
  
  state = {
    content:'',
    clientID:null,
    username:null,
    clicks:0
  }

  sendData = async (data) => {
     return axios.post(`/api/messages/reply/${this.props.messageID}`, 
     {content:data,user:this.state.clientID})
    .then(res => true)
    .catch(err => console.log(err))
   }
  
    handleSubmit = async (event) => {
    event.preventDefault()
    const data = this.state.content
    const response = await this.sendData(data)
    this.props.replyMessage({user:{username:this.state.username}, content:this.state.content})
    response && this.setState({clicks:this.state.clicks+1, content:''})
    
    
  }
  handleChange = (event) => {
    this.setState({content:event.target.value})
  }

  componentDidMount() {
    axios.get('/api/client')
    .then(res => this.setState({clientID:res.data._id, username:res.data.username}))
  }

  /*componentDidUpdate(prevProps, prevState) {
   if( prevState.clicks >= 1 && this.state.clientID != null) {
    this.props.replyMessage({user:this.state.clientID, content:this.state.content})
    this.sendData()
   }
  }*/
  render() {
    return (
      <>

      <div className='messageFormInbox' >
      <hr></hr>

      <Form onSubmit={this.handleSubmit} > 
                <Form.Group>
                  <Form.Label htmlFor='content'> </Form.Label>
                  <Form.Control
                    type='text'
                    name='content'
                    placeholder='Write a message'
                    as="textarea" 
                    rows={3} 
                    id='content'
                    value={this.state.content}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button type='submit'>Send</Button>
        </Form>
      
      </div>
      </>
    )
  }
}
