import React from 'react'
import PropTypes from 'prop-types'

let SiteFrame = ({site}) => (
  <iframe src={"data:text/html;charset=utf-8," + escape(site)} />
);

export default SiteFrame
