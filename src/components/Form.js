import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { requestUrl } from '../actions'
import SpinWheel from './SpinWheel'

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: ''
    }
    console.log(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //TODO: increase robustness of this function & also separate it out into : "static" ! part of class
  vetUrl () {
    //remove http://
    var val = this.state.formValue.split('//');
    if ( val.length > 1 ) {
      val = val[1];
    } else {
      val = val[0];
    }
    //check for domain; if !exists, default: `.com`
    const valSplitAtDot = val.split('.');
    if (valSplitAtDot.length > 1) {
      return val;
    } else {
      return `${val}.com`;
    }
  }

  handleSubmit (e) {
    e.preventDefault();
    const { dispatchUrlRequest } = this.props;
    const vettedUrl = this.vetUrl();
    dispatchUrlRequest(vettedUrl);

    // this.setState({formValue: ''}); // how to do this in react for inputs?
  }

  handleChange (e){
    this.setState({formValue: e.target.value})
  }

  render () {
    const { responseMessage } = this.props;

    return (
      <div className="form__container">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} placeholder="Search for a site"/>
        </form>
        <div className="form__response">{responseMessage}</div>
        <div className="form__loading-dock"><SpinWheel /></div>
      </div>
    );
  }
}

Form.propTypes = {
  responseMessage: PropTypes.string.isRequired,
  dispatchUrlRequest: PropTypes.func.isRequired
}

export default Form;
