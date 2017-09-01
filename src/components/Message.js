import React from 'react'

export default class Message extends React.Component {
  constructor(props){

    super(props)
    this.state = {
      starred: this.props.message.starred,
      selected: this.props.message.selected
    }
  }

  starClicked = (e) => {
    e.preventDefault()
    if(this.state.starred){
      this.setState({
        starred:false
      })
    }
    else {
      this.setState({
        starred:true
      })
    }
  }

  checkboxClicked = (e) => {
      this.props.messageSelected(this.props.message)
  }

  render(){

    var containerClassName = "row message unread"
    var selected = ""
    var starClassName = "star fa fa-star-o"

    if(this.props.message.read)
      containerClassName = "row message read"

    if(this.props.message.selected){
      containerClassName += " selected"
      selected = "checked"
    }

    if(this.state.starred)
      starClassName = "star fa fa-star"

    return(
        <div className ={containerClassName}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input onChange={this.checkboxClicked} type="checkbox" checked={selected}/>
              </div>
              <div className="col-xs-2">
                <i onClick={this.starClicked} className={starClassName}></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
          {this.props.message.labels.map((label,i) => <span key={i} className="label label-warning">{label}</span>)}
            <a href="#">
              {this.props.message.subject}
            </a>
          </div>
        </div>
    );
  }
}
