import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList'
import Toolbar from './components/Toolbar'
import ComposeForm from './components/ComposeForm'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const App = ({ messages }) => {
  return (
    (messages.length) ?
      (
        <Router>
          <div>
            <Route path="/" component={Toolbar} />
            <Route path="/compose" component={ComposeForm} />
            <Route path="/" component={ props => <MessageList messages={messages} {...props} /> } />
          </div>
        </Router>
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
