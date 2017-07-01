import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SiteFrame from '../components/SiteFrame'

let TopFiveList = ({topFive}) => (
  <div className="top-five__container">
    {
      topFive.map((html, rank) => {
        return <div className="frame__container" key={rank}><SiteFrame site={html} /></div>
      })
    }
  </div>
)

const mapStateToProps = state => ({
  topFive: state.top_five.topFive
})

TopFiveList.propTypes = {
  topFive: PropTypes.array.isRequired
}

TopFiveList = connect (
  mapStateToProps
)(TopFiveList);

export default TopFiveList
