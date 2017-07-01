import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestUrl } from '../actions'
import Form from '../components/Form';

const mapStateToProps = state => ({
  responseMessage: state.url.response_message
});

const mapDispatchToProps = dispatch => ({
  dispatchUrlRequest: url => {
    dispatch(requestUrl(url))
  }
});

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

export default FormContainer;
