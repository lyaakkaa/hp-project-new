import React from 'react'

const SingleCard = ({ card }) => {
  return (
        <div className="card">
            <div>
                <img
                    src={card.src}
                    className="front"
                    alt="card front"
                    width={20}
                    height={20}
                ></img>
                <img
                    src="/cover.png"
                    className="back"
                    alt="card back"
                    width={100}
                ></img>
            </div>
        </div>
    )
}

export default SingleCard