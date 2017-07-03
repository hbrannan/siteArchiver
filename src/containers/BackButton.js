import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { backToMain } from '../actions'

let BackButton = ({dispatch}) => {
  return (
    <div className="backButton" onClick={ () => { dispatch(backToMain())} }> ◀  B A C K &nbsp; T O &nbsp; M A I N </div>
  );
}

BackButton = connect()(BackButton)

export default BackButton
