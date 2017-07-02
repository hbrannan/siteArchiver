import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { requestUrl } from '../actions'
import SpinWheel from '../containers/SpinWheel'

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

  handleSubmit (e) {
    e.preventDefault();
    const { dispatchUrlRequest } = this.props;
    const vettedUrl = Form.vetUrl(this.state.formValue);
    dispatchUrlRequest(vettedUrl);
    this.setState({formValue: ''});
  }

  handleChange (e){
    this.setState({formValue: e.target.value})
  }

  render () {
    const { responseMessage } = this.props;

    return (
      <div className="form__container">
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.formValue} onChange={this.handleChange} placeholder="Search for a site"/>
        </form>
        <div className="form__response">{responseMessage}</div>
        <div className="form__loading-dock"><SpinWheel /></div>
      </div>
    );
  }

  /*
    TODO: increase fn robustness
    Param, inputUrl = STRING
    Remove http:// & /if !domainExists, add default ->  `.com`
  */
  static vetUrl (inputUrl) {
    var val = inputUrl.split('//');
    if ( val.length > 1 ) {
      val = val[1];
    } else {
      val = val[0];
    }

    const valSplitAtDot = val.split('.');
    if (valSplitAtDot.length > 1) {
      return val;
    } else {
      return `${val}.com`;
    }
  }
}

Form.propTypes = {
  responseMessage: PropTypes.string.isRequired,
  dispatchUrlRequest: PropTypes.func.isRequired
}

export default Form;
