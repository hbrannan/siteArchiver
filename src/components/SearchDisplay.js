import React from 'react'
import Form from  '../containers/Form'
import TopFiveList from  '../containers/TopFiveList'

let SearchDisplay = () => {
  return (
    <div>
      <div className="header">
        <h1>Web Crawler</h1>
      </div>
      <Form />
      <TopFiveList />
    </div>
  );
}

export default SearchDisplay
