import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = state => ({
  isDisplayingSite: state.app.isDisplayingSite
});

const AppScreen = connect(
  mapStateToProps
)(App);

export default AppScreen
