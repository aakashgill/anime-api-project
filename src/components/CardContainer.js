import React from 'react'

function CardContainer(props) {
  return (
    <div className="card__container">
      { props.children }
    </div>
  )
}

export default CardContainer
