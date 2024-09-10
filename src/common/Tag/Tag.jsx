import "./Tag.style.css"

import React from 'react'

const Tag = ({ label }) => {
  return (
    <div className="tag">
      {label}
    </div>
  )
}

export default Tag
