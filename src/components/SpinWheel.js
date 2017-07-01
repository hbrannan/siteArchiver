import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from 'react-spin'

let SpinWheel = ({isFetching}) => {
  const spinCfg = {};
  return isFetching ? <Spinner config={spinCfg} /> : null;
}

const mapStateToProps = state => ({
  isFetching: state.top_five.isFetching || state.url.isFetching
});

SpinWheel.propTypes = {
  isFetching: PropTypes.bool.isRequired
}

SpinWheel = connect(
  mapStateToProps
)(SpinWheel)

export default SpinWheel;


/* S p i n   W h e e l   D o c s:
  https://www.npmjs.com/package/react-spin
*/
