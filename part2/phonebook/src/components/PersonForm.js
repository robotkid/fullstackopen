import React from 'react'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.formSubmitHandler}>
      <div>
        name: <input value={props.nameValue} onChange={props.nameChangeHandler} />
        <br />
        number: <input value={props.numberValue} onChange={props.numberChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm