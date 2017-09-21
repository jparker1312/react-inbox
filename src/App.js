import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import ComposeForm from './components/ComposeForm'
import { connect } from 'react-redux'

const App = ({ messages }) => {
  return (
    (messages.length) ?
      (
        <div>
          <Toolbar />
          <ComposeForm />
          <MessageList messages={messages}/>
        </div>
      ) :
      (<div>Loading...</div>)
  )
}

const mapStateToProps = state => ({
  messages: state.messages.all
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
