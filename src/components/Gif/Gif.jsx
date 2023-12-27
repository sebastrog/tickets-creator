import { useState } from 'react'
import PropTypes from 'prop-types';
import { FiMaximize2, FiMinimize2  } from "react-icons/fi";

const Gif = ({gif}) => {
  const [expand, setExpand] = useState(false)

  return (
    <div className="relative">
      <img  
        src={gif}
        alt="ticket gif"
        className={`rounded-lg duration-200 ${expand ? "scale-105 md:scale-150" : "scale-1"}`}
      />

      <button 
        className={`absolute -bottom-3 -right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center duration-200 hover:scale-125 ${expand && "border-2 border-sky-500 text-sky-500 -bottom-10 -right-7 w-6 h-6"}`}
        onClick={() => setExpand(!expand)}
        >
          {expand ? <FiMinimize2 /> : <FiMaximize2 />}
          
        </button>
    </div>
  )
}

Gif.propTypes = {
  gif: PropTypes.string.isRequired
}

export default Gif