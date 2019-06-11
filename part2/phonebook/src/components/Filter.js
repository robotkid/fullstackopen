import React from 'react'

const Filter = (props) =>
  <p>filter shown with <input value={props.searchItem} onChange={props.changeHandler} /></p>

export default Filter