import React from 'react'
import './LoadingSpinner.style.css';
import ClipLoader from "react-spinners/ClipLoader";

const LoadingSpinner = () => {
  return (
    <div className='loading-container'>
      <ClipLoader color="green" size={150} />
    </div>
  )
}

export default LoadingSpinner
