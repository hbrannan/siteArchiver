import React from 'react'
import SearchDisplay from './SearchDisplay'
import SiteDisplay from '../containers/SiteDisplay'
import PropTypes from 'prop-types'
import '../styles/App.less';

const App = ({isDisplayingSite}) => {
  return isDisplayingSite ?  <SiteDisplay /> : <SearchDisplay />;
}

App.propTypes = {
  isDisplayingSite: PropTypes.bool.isRequired
};

export default App;
