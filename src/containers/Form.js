import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValue: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    // API CALL
    // Form Response
  }

  handleChange (e){
    this.setState({formValue: e.target.value})
  }

  render () {
    return (
      <div className="form__container">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} placeholder="Search for a site"/>
        </form>
        <div className="form__response"></div>
      </div>
    );
  }
}


export default Form;
