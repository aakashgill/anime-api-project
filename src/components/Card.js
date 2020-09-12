import React from 'react'

function Card({ image, title }) { // Destructring here.
  return (
    <div className="card">
      <div className="card__image__container">
        <img alt={"An image of "+title} width="150" height="200" className="card__image" src={image}/>
      </div>
      <div className="card__title">
        {title}
      </div>
    </div>
  )
}
export default Card;