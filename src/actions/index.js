export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export function fetchMessages() {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8888/api/messages`)
    const json = await response.json()
    dispatch({
      type: MESSAGES_RECEIVED,
      messages: json._embedded.messages
    })
  }
}

export const SETUP_COMPOSE_FORM = 'SETUP_COMPOSE_FORM'
export function setupComposeForm() {
  return (dispatch) => {
    dispatch({
      type: SETUP_COMPOSE_FORM
    })
  }
}

export const TOGGLE_SELECTED = 'TOGGLE_SELECTED'
export const CHANGE_BULK_SELECTED = 'CHANGE_BULK_SELECTED'
export function toggleMessageSelected(message, messages) {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SELECTED,
      message: message,
      toolbar: messages.toolbar
    })
  }
}

export const BULK_MESSAGES_CLICKED = 'BULK_MESSAGES_CLICKED'
export const TOGGLE_BULK_SELECTED = 'TOGGLE_BULK_SELECTED'
export function bulkMessageClicked(bulkMessageClassName) {
  return (dispatch) => {
    dispatch({
      type: BULK_MESSAGES_CLICKED,
      bulkMessageClassName: bulkMessageClassName
    })
    dispatch({
      type: TOGGLE_BULK_SELECTED,
      bulkMessageClassName: bulkMessageClassName
    })
  }
}

export const TOGGLE_STARRED = 'TOGGLE_STARRED'
export function changeStarredStatus(message) {
  return async (dispatch) => {
    var request = {
      messageIds: [ message.id ],
      command: "star",
      star: !message.starred
    }
    const response = patchRequest(request)
    dispatch({
      type: TOGGLE_STARRED,
      message: message
    })
  }
}

export const TOGGLE_COMPOSE_FORM = 'TOGGLE_COMPOSE_FORM'
export function toggleCompForm() {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_COMPOSE_FORM
    })
  }
}

export const UPDATE_SUBJECT_TEXT = 'UPDATE_SUBJECT_TEXT'
export function updateSubjectText(subject) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_SUBJECT_TEXT,
      subject: subject
    })
  }
}

export const UPDATE_BODY_TEXT = 'UPDATE_BODY_TEXT'
export function updateBodyText(body) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_BODY_TEXT,
      body: body
    })
  }
}

export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE'
export function submitNewMessage(message) {
  return async (dispatch) => {
    const messageResponse = await fetch('http://localhost:8888/api/messages/', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const messageJson = await messageResponse.json()
    dispatch({
      type: ADD_NEW_MESSAGE,
      message: messageJson
    })
    dispatch({
      type: TOGGLE_COMPOSE_FORM,
    })
  }
}

export const DELETE_MESSAGES = "DELETE_MESSAGES"
export function deleteMessage(messages) {
  return async (dispatch) => {
    var newMessages = []
    var messageIds = []
    for(var message of messages){
        if(!message.selected)
          newMessages.push(message)
        else{
          messageIds.push(message.id)
        }
    }
    const request = {
      messageIds: messageIds,
      command: "delete"
    }
    patchRequest(request)
    dispatch({
      type: DELETE_MESSAGES,
      messages: newMessages
    })
  }
}

export const MARK_AS_READ = "MARK_AS_READ"
export function markAsRead(messages) {
  return async (dispatch) => {
    var messageIds = []
    var count = 0
    for(var message of messages){
      if(message.selected){
        if(!message.read)
          count++
        message.read=true
        messageIds.push(message.id)
      }
    }
    const request = {
      messageIds: messageIds,
      command: "read",
      read: true
    }
    patchRequest(request)
    dispatch({
      type: MARK_AS_READ,
      messages: messages,
      unreadMessageCount: count
    })
  }
}

export const MARK_AS_UNREAD = "MARK_AS_UNREAD"
export function markAsUnread(messages) {
  return async (dispatch) => {
    var messageIds = []
    var count = 0
    for(var message of messages){
      if(message.selected){
        if(message.read)
          count++
        message.read=false
        messageIds.push(message.id)
      }
    }
    const request = {
      messageIds: messageIds,
      command: "read",
      read: false
    }
    patchRequest(request)
    dispatch({
      type: MARK_AS_UNREAD,
      messages: messages,
      unreadMessageCount: count
    })
  }
}

export const ADD_LABEL = "ADD_LABEL"
export function addLabel(messages, label){
  return async (dispatch) => {
    var messageIds = []
    for(var message of messages){
      if(message.selected){
        var labelExists = false
        for(var l of message.labels){
          if(l === label)
            labelExists = true
        }
        if(!labelExists){
          message.labels.push(label)
          messageIds.push(message.id)
        }
      }
    }
    const request = {
      messageIds: messageIds,
      command: "addLabel",
      label: label
    }
    patchRequest(request)
    dispatch({
      type: ADD_LABEL,
      messages: messages
    })
  }
}

export const REMOVE_LABEL = "REMOVE_LABEL"
export function removeLabel(messages, label){
  return async (dispatch) => {
    var messageIds = []
    for(var message of messages){
      if(message.selected){
        var newLabels = []
        for(var l of message.labels){
          if(l !== label)
            newLabels.push(l)
        }
        message.labels = newLabels
        messageIds.push(message.id)
      }
    }
    const request = {
      messageIds: messageIds,
      command: "removeLabel",
      label: label
    }
    patchRequest(request)
    dispatch({
      type: ADD_LABEL,
      messages: messages
    })
  }
}

const patchRequest = async (request) => {
  await fetch(`/api/messages/`, {
    method: 'PATCH',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
}
