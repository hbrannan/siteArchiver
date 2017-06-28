import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestUrl } from '../actions'


class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValue: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //TODO: increase robustness of this function
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
    const { dispatch } = this.props;

    //validation || trimming
    const vettedUrl = this.vetUrl();

    //dispatch action
    dispatch(requestUrl(vettedUrl));

    // -> spinner
    // -> then ... Form Response (comes thru other action)
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

Form.propTypes = {
  dispatch: PropTypes.func.isRequired
}

Form = connect()(Form);

export default Form;
