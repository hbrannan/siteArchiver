import React from 'react'
import BackButton from  '../containers/BackButton'
import SiteFrame from  '../components/SiteFrame'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

let SiteDisplay = ({currentSite}) => (
  <div className="display__container">
    <div className="header">
      <h1>Web Crawler</h1>
      <BackButton />
    </div>
    <div className="site__container">
      <SiteFrame site={currentSite}/>
    </div>
  </div>
);

const mapStateToProps = state => ({
  currentSite: state.app.currentSite
});


SiteDisplay.propTypes = {
  currentSite: PropTypes.string.isRequired
}

SiteDisplay = connect(
  mapStateToProps
)(SiteDisplay);

export default SiteDisplay
