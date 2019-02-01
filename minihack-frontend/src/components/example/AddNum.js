import React from 'react'

export default function AddNum(props) {
    
  return (
    <div>
        <button 
        className="btn btn-primary" 
        onClick = {props.addNum}
        >Click</button>
    </div>
  )
}
