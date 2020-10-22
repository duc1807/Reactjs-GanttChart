import React from 'react'
import './buttonMonth.scss'

const ButtonMonthControl = (props) => {
    const {currentMonth, handleChart} = props
    return(
        <>
          <button className="homeBtn" onClick={() => handleChart("prev")}>{"< Prev"}</button>
          <input
            disabled
            className="monthNum"
            value={currentMonth}
          ></input>
          <button className="homeBtn" onClick={() => handleChart("next")}>{"Next >"}</button>
        </>
    )
}

export default ButtonMonthControl