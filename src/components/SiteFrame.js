import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SiteFrame extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return <iframe src={`data:text/html;charset=utf-8,${this.props.site}`} />
  }

}

export default SiteFrame

/*
todo, consider refactor:
shouldComponentUpdate() {
 return false;
}

todo: avoid console erros -> capture error? inject overwrite of console.log fn?
*/
