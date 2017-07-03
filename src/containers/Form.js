import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestUrl, requestSiteById } from '../actions'
import Form from '../components/Form';

const mapStateToProps = state => ({
  responseMessage: state.url.response_message
});

const mapDispatchToProps = dispatch => ({
  dispatchUrlRequest: id_or_url => {
    if (isNaN(id_or_url)){
      dispatch(requestUrl(id_or_url))
    } else {
      dispatch(requestSiteById(id_or_url))
    }
  }
});

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

export default FormContainer;
