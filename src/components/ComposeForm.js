import React from 'react'

export default class ComposeForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      subject: "",
      body: ""
    }
  }
  composeMessage = (e) => {
    var message = {
      subject: this.state.subject,
      body: this.state.body
    }
    this.props.addNewMessage(message)
  }

  changeSubject = (e) => {
    e.preventDefault()
    this.setState({subject: e.target.value})
  }

  changeBody = (e) => {
    e.preventDefault()
    this.setState({body: e.target.value})
  }

  render(){
    if(this.props.composeFormOpen){
      return (
        <form className="form-horizontal well">
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Compose Message</h4>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input onChange={this.changeSubject} type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea onChange={this.changeBody} name="body" id="body" className="form-control" defaultValue={""} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input onClick={this.composeMessage} defaultValue="Send" className="btn btn-primary" />
            </div>
          </div>
        </form>
      );
    }
    else{
      return(
        <div />
      );
    }
  }
}
