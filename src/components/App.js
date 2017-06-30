import React from 'react'
import SearchDisplay from './SearchDisplay'
import SiteDisplay from '../containers/SiteDisplay'
import PropTypes from 'prop-types'
// import './App.less';

const App = ({isDisplayingSite}) => {
  if (!isDisplayingSite) return <SearchDisplay />;
  else return <SiteDisplay />;
}

App.propTypes = {
  isDisplayingSite: PropTypes.bool.isRequired
};

export default App;
