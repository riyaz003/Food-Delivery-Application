// import React from 'react'
import './BackToTop.css'

const BackToTop = (backToTop) => {

    const scrollUp = () =>{
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
          })
      };

  return (
    <div className='back-to-top'>
      <button onClick={scrollUp} className='top-button'>↑</button>
    </div>
  )
}

export default BackToTop
