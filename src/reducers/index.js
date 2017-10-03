import { combineReducers } from 'redux'
import { MESSAGES_RECEIVED,
         TOGGLE_STARRED,
         TOGGLE_SELECTED,
         TOGGLE_COMPOSE_FORM,
         SETUP_COMPOSE_FORM,
         UPDATE_SUBJECT_TEXT,
         UPDATE_BODY_TEXT,
         ADD_NEW_MESSAGE,
         BULK_MESSAGES_CLICKED,
         TOGGLE_BULK_SELECTED,
         CHANGE_BULK_SELECTED,
         DELETE_MESSAGES,
         MARK_AS_READ,
         MARK_AS_UNREAD,
         ADD_LABEL,
         REMOVE_LABEL,
         RETRIEVE_MESSAGE
       } from '../actions'

function messages(state = {all: [], toolbar: {bulkMessageClassName: "fa fa-square-o"}}, action) {
  switch(action.type) {
    case MESSAGES_RECEIVED:
      var count = 0
      for(var message of action.messages){
        if(!message.read)
          count++
      }
      return {
        ...state,
        all: action.messages, toolbar: {unreadMessageCount: count, bulkMessageClassName: "fa fa-square-o"}
      }
    case RETRIEVE_MESSAGE:
      var currentMessages = state.all
      var count = 0
      for(var message of currentMessages){
        if(message.id === action.message.id){
          if(!message.read){
            count--
            message.read = true
          }
          message.body = action.message.body
          break
        }
      }
      count += state.toolbar.unreadMessageCount
      return {
        ...state,
        all: currentMessages, toolbar: {unreadMessageCount: count, bulkMessageClassName: "fa fa-square-o"}
      }
    case MARK_AS_READ:
      var count = state.toolbar.unreadMessageCount - action.unreadMessageCount
      var newToolbar = {...state.toolbar, unreadMessageCount: count}
      return {
        ...state,
        all: action.messages, toolbar: newToolbar
      }
    case MARK_AS_UNREAD:
      var count = state.toolbar.unreadMessageCount + action.unreadMessageCount
      var newToolbar = {...state.toolbar, unreadMessageCount: count}
      return {
        ...state,
        all: action.messages, toolbar: newToolbar
      }
    case ADD_LABEL:
      return {
        ...state,
        all: action.messages
      }
    case REMOVE_LABEL:
      return {
        ...state,
        all: action.messages
      }
    case DELETE_MESSAGES:
      var count = 0
      for(var message of action.messages){
        if(!message.read)
          count++
      }
      return {
        ...state,
        all: action.messages, toolbar: {unreadMessageCount: count, bulkMessageClassName: "fa fa-square-o"}
      }
    case ADD_NEW_MESSAGE:
    var addedMessages = [action.message, ...state.all]
      var count = 0
      for(var message of addedMessages){
        if(!message.read)
          count++
      }
      return {
        ...state,
        all: addedMessages, toolbar: {unreadMessageCount: count, bulkMessageClassName: "fa fa-square-o"}
      }
    case TOGGLE_SELECTED:
      const newMessagesSelected = state.all
      var count = 0
      newMessagesSelected.map((m) => {
       if(m.id === action.message.id){
         m.selected = !m.selected;
       }
       if(m.selected)
        count++
      })
      var bmcn = "";
      if(count === 0)
        bmcn = "fa fa-square-o"
      else if(count === newMessagesSelected.length)
        bmcn = "fa fa-check-square-o"
      else
        bmcn = "fa fa-minus-square-o"
      var newToolbar = state.toolbar
      newToolbar.bulkMessageClassName = bmcn
      return {...state, all: newMessagesSelected, toolbar: newToolbar}
    case TOGGLE_BULK_SELECTED:
      const bulkMessagesSelected = state.all
      if(action.bulkMessageClassName === "fa fa-minus-square-o"){
        bulkMessagesSelected.map((m) => {
           m.selected = true;
        })
      }
      else {
        bulkMessagesSelected.map((m) => {
           m.selected = !m.selected;
        })
      }
      var bmcn = ""
      if(action.bulkMessageClassName === "fa fa-check-square-o")
        bmcn = "fa fa-square-o"
      else
        bmcn = "fa fa-check-square-o"
      var newToolbar = state.toolbar
      newToolbar.bulkMessageClassName = bmcn
      return {...state, all: bulkMessagesSelected, toolbar: newToolbar}
    case TOGGLE_STARRED:
      const newMessagesStarred = state.all
      newMessagesStarred.map((m) => {
       if(m.id === action.message.id){
         m.starred = !m.starred;
       }
      })
      return {...state, all: newMessagesStarred}
    default:
      return state
  }
}

function composeForm(state = {composeFormOpen: false}, action) {
  switch(action.type) {
    case TOGGLE_COMPOSE_FORM:
      return {
        ...state,
        composeFormOpen: !state.composeFormOpen
      }
    case SETUP_COMPOSE_FORM:
      return {
        ...state,
        composeFormOpen: false
      }
    case UPDATE_SUBJECT_TEXT:
      return {
        ...state,
        subject: action.subject
      }
    case UPDATE_BODY_TEXT:
      return {
        ...state,
        body: action.body
      }
    default:
      return state
  }
}

export default combineReducers({
  messages,
  composeForm
})
