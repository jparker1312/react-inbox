import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'

var origMessages = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
];

export default class App extends Component {
  constructor(props){
      super(props)
      var unreadMessageCount = 0
      for(var message of origMessages){
        if(!message.read)
          unreadMessageCount++
      }

      this.state = {
        messages: origMessages,
        unreadMessageCount: unreadMessageCount,
        bulkMessageSelected: "fa fa-minus-square-o"
      }
  }

  bulkMessagesToggle = (bulkSelected) => {
    const messages = this.state.messages
    for(var message of messages){
      if(bulkSelected == "fa fa-check-square-o")
        message.selected=true
      else
        message.selected=false
    }

    this.setState({
      messages
    })
  }

  trash = () => {
    const messages = this.state.messages
    var newMessages = []
    var newUnreadMessageCount = 0
    for(var message of messages){
        if(!message.selected)
          newMessages.push(message)
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
            if(label == e.target.value)
              labelExists = true
          }
          if(!labelExists)
            message.labels.push(e.target.value)
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
            if(label != e.target.value)
              newLabels.push(label)
          }
          message.labels = newLabels
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
      if(m.id == message.id){
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
    if(numberSelected==0)
      bms = "fa fa-square-o"
    else if (numberSelected == messages.length)
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
    if(this.state.bulkMessageSelected == "fa fa-check-square-o")
      bms = "fa fa-square-o"
    else
      bms = "fa fa-check-square-o"

    this.setState({
      bulkMessageSelected:bms
    })
    this.bulkMessagesToggle(bms)
  }

  render() {
    return (
      <div>
        <Toolbar bulkMessagesToggle={this.bulkMessagesToggle}
          markAsRead={this.markAsRead}
          markAsUnread={this.markAsUnread}
          trash={this.trash}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          unreadMessageCount={this.state.unreadMessageCount}
          bulkMessageSelected={this.state.bulkMessageSelected}
          bulkSelect={this.bulkSelect}/>
        <MessageList messages={this.state.messages} messageSelected={this.messageSelected}/>
      </div>
    );
  }
}
