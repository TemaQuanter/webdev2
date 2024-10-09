import React from 'react'

const HorizontalScrollView = () => {
  const items = [1, 2, 3, 4, 5, 6] // Example items
  return (
    <div className="horizontal-scroll-container">
      {items.map((item) => (
        <div
          style={{ margin: '3rem', width: '15rem', height: '20rem' }}
          key={item}
          className="scroll-item"
        >
          <div className="content">Item {item}</div>
        </div>
      ))}
    </div>
  )
}

export default HorizontalScrollView
