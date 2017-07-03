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
    const val = this.state.formValue;

    if(val.length){
      const { dispatchUrlRequest } = this.props;
      const vettedUrl = Form.vetUrl(val);
      dispatchUrlRequest(vettedUrl);
      this.setState({formValue: ''});
    }
  }

  handleChange (e){
    this.setState({formValue: e.target.value})
  }

  render () {
    const { responseMessage } = this.props;

    return (
      <div className="form__container">
        <form className="form__body" onSubmit={this.handleSubmit}>
          <label className="form__label">Enter site or your provided Archive Job ID</label>
          <input className="form__input" value={this.state.formValue} onChange={this.handleChange} placeholder="E.g.,'google', '6', or 'craigconnects.org'"/>
        </form>
        <div className="form__response">{responseMessage}</div>
        <div className="form__loading-dock"><SpinWheel /></div>
      </div>
    );
  }

  /*
    Param, inputUrl = STRING || NUMBER
    Remove http:// & /if !domainExists, add default ->  `.com`
  */
  static vetUrl (inputUrl) {
    inputUrl = inputUrl.toLowerCase()

    if ( isNaN(inputUrl)){
      var val = inputUrl.split('//');
      if ( val.length > 1 ) {
        val = val[1];
      } else {
        val = val[0];
      }
      val = val.split(' ').join('')
      const valSplitAtDot = val.split('.');
      if (valSplitAtDot.length > 1) {
        return val;
      } else {
        return encodeURI(`${val}.com`);
      }
    } else {
      return inputUrl;
    }
  }
}

Form.propTypes = {
  responseMessage: PropTypes.string.isRequired,
  dispatchUrlRequest: PropTypes.func.isRequired
}

export default Form;
