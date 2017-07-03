import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SiteFrame extends Component {
  constructor(props) {
    super(props);
  }

  handleSourceError (e) {
    console.log('SiteFrame iframe src error', e);
    e.preventDefault();
  }

  render () {
    return <iframe src={"data:text/html;charset=utf-8," + escape(this.props.site)} onError={this.handleSourceError.bind(this)} />
  }

}

export default SiteFrame

/*
todo, consider refactor:
shouldComponentUpdate() {
 return false;
}
*/
