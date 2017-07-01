import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { requestTopFive } from '../actions'
import SiteFrame from '../components/SiteFrame'

class TopFiveList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.props.dispatchTopFiveRequest();
  }

  render ()  {
    return (
      <div className="top-five__container">
        {
          this.props.topFive.map((html, rank) => {
            return <div className="frame__container" key={rank}><SiteFrame site={html} /></div>
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  topFive: state.top_five.topFive
});

const mapDispatchToProps = dispatch => ({
  dispatchTopFiveRequest: () => {
    dispatch(requestTopFive())
  }
});

TopFiveList.propTypes = {
  topFive: PropTypes.array.isRequired,
  dispatchTopFiveRequest: PropTypes.func.isRequired
}

TopFiveList = connect (
  mapStateToProps,
  mapDispatchToProps
)(TopFiveList);

export default TopFiveList
