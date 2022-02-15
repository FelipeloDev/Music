import React from 'react'
import './Card.css'

function Card({track, chooseTrack}) {
    function  handlePlay(){
        chooseTrack(track)
    }

  return (
    <div className='songRow' onClick={handlePlay}>
        <img className='songRow__album' src={track.albumUrl} alt="Album cover" />        
        <div className='songRow__info'>
            <h2>{track.title}</h2>
            <p>{track.artist}</p>
            {/* <button className='fav__button'></button> */}
        </div>
    </div>
  )
}

export default Card