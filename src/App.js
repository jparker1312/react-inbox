import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import ComposeForm from './components/ComposeForm'

export default class App extends Component {
  constructor(props){
      super(props)
      this.state = {
        messages: [{
          starred: false,
          labels:[],
          id: 1,
          subject: "",
          read: false,
          body: ""
        }],
        unreadMessageCount: 0,
        bulkMessageSelected: "fa fa-minus-square-o",
        composeFormOpen: false
      }
  }

  async componentDidMount() {
    const messagesResponse = await fetch('http://localhost:8888/api/messages')
    const messagesJson = await messagesResponse.json()

    var unreadMessageCount = 0
    for(var message of messagesJson._embedded.messages){
      if(!message.read)
        unreadMessageCount++
    }

    this.setState({
      messages: messagesJson._embedded.messages,
      unreadMessageCount: unreadMessageCount
    })
  }

  bulkMessagesToggle = (bulkSelected) => {
    const messages = this.state.messages
    for(var message of messages){
      if(bulkSelected === "fa fa-check-square-o")
        message.selected=true
      else
        message.selected=false
    }

    this.setState({
      messages
    })
  }

  deleteMessage = () => {
    const messages = this.state.messages
    var newMessages = []
    var newUnreadMessageCount = 0
    for(var message of messages){
        if(!message.selected)
          newMessages.push(message)
        else{
          const request = {
            messageIds: [ message.id ],
            command: "delete"
          }
          this.patchRequest(request)
        }
    }

    for(var nm of newMessages){
      if(!nm.read)
        newUnreadMessageCount++
    }

    this.setState({
      messages:newMessages,
      unreadMessageCount:newUnreadMessageCount
    })
  }

  addLabel = (e) => {
    const messages = this.state.messages
    for(var message of messages){
        if(message.selected){
          var labelExists = false
          for(var label of message.labels){
            if(label === e.target.value)
              labelExists = true
          }
          if(!labelExists){
            message.labels.push(e.target.value)
            const request = {
              messageIds: [ message.id ],
              command: "addLabel",
              label: e.target.value
            }
            this.patchRequest(request)
          }
        }

    }
    this.setState({
      messages
    })
  }

  removeLabel = (e) => {
    const messages = this.state.messages
    for(var message of messages){
        if(message.selected){
          var newLabels = []
          for(var label of message.labels){
            if(label !== e.target.value)
              newLabels.push(label)
          }
          message.labels = newLabels
          const request = {
            messageIds: [ message.id ],
            command: "removeLabel",
            label: e.target.value
          }
          this.patchRequest(request)
        }
    }
    this.setState({
      messages
    })
  }

  markAsRead = () => {
    const messages = this.state.messages
    var newUnreadMessageCount = this.state.unreadMessageCount
    for(var message of messages){
        if(message.selected){
          if(!message.read)
            newUnreadMessageCount--
          message.read=true
          const request = {
            messageIds: [ message.id ],
            command: "read",
            read: true
          }
          this.patchRequest(request)
        }
    }
    this.setState({
      messages,
      unreadMessageCount:newUnreadMessageCount
    })
  }

  markAsUnread = () => {
    const messages = this.state.messages
    var newUnreadMessageCount = this.state.unreadMessageCount
    for(var message of messages){
        if(message.selected){
          if(message.read)
            newUnreadMessageCount++
          message.read=false
          const request = {
            messageIds: [ message.id ],
            command: "read",
            read: false
          }
          this.patchRequest(request)
        }
    }
    this.setState({
      messages,
      unreadMessageCount:newUnreadMessageCount
    })
  }

  messageSelected = (message) => {
    const messages = this.state.messages
    for(var m of messages){
      if(m.id === message.id){
        m.selected=!message.selected;
        break;
      }
    }

    var numberSelected = 0;
    for(var ms of messages){
      if(ms.selected)
        numberSelected++
    }

    var bms = this.state.bulkMessageSelected
    if(numberSelected === 0)
      bms = "fa fa-square-o"
    else if (numberSelected === messages.length)
      bms = "fa fa-check-square-o"
    else
      bms = "fa fa-minus-square-o"

    this.setState({
      messages,
      bulkMessageSelected:bms
    })
  }

  bulkSelect = (e) => {
    var bms = this.state.bulkMessageSelected
    if(this.state.bulkMessageSelected === "fa fa-check-square-o")
      bms = "fa fa-square-o"
    else
      bms = "fa fa-check-square-o"

    this.setState({
      bulkMessageSelected:bms
    })
    this.bulkMessagesToggle(bms)
  }

  starClicked = async (message) => {
    var messages = this.state.messages
    if(message !== undefined){
      for(var m of messages){
        if(m.id === message.id){
          m.starred = !m.starred
          var request = {
            messageIds: [ m.id ],
            command: "star",
            star: m.starred
          }
          this.patchRequest(request)
          break;
        }
      }
      this.setState({
        messages: messages
      })
    }
  }

  patchRequest = async (request) => {
    await fetch('http://localhost:8888/api/messages/', {
      method: 'PATCH',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  }

  toggleComposeForm = (e) => {
    this.setState({composeFormOpen: !this.state.composeFormOpen})
  }

  addNewMessage = async (message) => {
    const messageResponse = await fetch('http://localhost:8888/api/messages/', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const messageJson = await messageResponse.json()
    this.toggleComposeForm()
    this.setState({
      messages: [...this.state.messages, messageJson]
    })
  }

  render() {
    return (
      <div>
        <Toolbar bulkMessagesToggle={this.bulkMessagesToggle}
          markAsRead={this.markAsRead}
          markAsUnread={this.markAsUnread}
          deleteMessage={this.deleteMessage}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          unreadMessageCount={this.state.unreadMessageCount}
          bulkMessageSelected={this.state.bulkMessageSelected}
          bulkSelect={this.bulkSelect}
          toggleComposeForm={this.toggleComposeForm}/>
        <ComposeForm composeFormOpen={this.state.composeFormOpen} addNewMessage={this.addNewMessage}/>
        <MessageList
          messages={this.state.messages}
          messageSelected={this.messageSelected}
          starClicked={this.starClicked}/>
      </div>);
  }
}
