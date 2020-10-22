import React from 'react'
import './taskInputForm.scss'

const TaskInputForm = (props) => {
    // Destructuring constant variables from props 
    const { state } = props
    // Destructuring functions from props
    const { handleSubmit, handleChange } = props

    return(
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Task:{" "}
          <input
            style={{ padding: "0 1vw 0 1vw" }}
            placeholder={"Write your task here!"}
            required
            onChange={handleChange}
            type="text"
            name="task"
            value={state.task}
          />
          <br></br>
          <br></br>
          Start date:{" "}
          <input
            maxLength={2}
            max={31}
            min={1}
            required
            onChange={handleChange}
            placeholder={24}
            className="dateInput"
            name="startDate"
            type="text"
            value={state.startDate}
          />{" "}
          -{" "}
          <input
            required
            maxLength={2}
            max={12}
            min={1}
            onChange={handleChange}
            placeholder={5}
            className="dateInput"
            name="startMonth"
            type="text"
            value={state.startMonth}
          />{" "}
          -{" "}
          <input
            onChange={handleChange}
            placeholder={2020}
            className="dateInput"
            name="startYear"
            type="text"
            maxLength={4}
            value={state.startYear}
          />
          <br></br>
          <br></br>
          End date:{" "}
          <input
            required
            maxLength={2}
            max={31}
            min={1}
            onChange={handleChange}
            placeholder={24}
            className="dateInput"
            name="endDate"
            type="text"
            value={state.endDate}
          />{" "}
          -{" "}
          <input
            required
            maxLength={2}
            max={12}
            min={1}
            onChange={handleChange}
            placeholder={5}
            className="dateInput"
            name="endMonth"
            type="text"
            value={state.endMonth}
          />{" "}
          -{" "}
          <input
            onChange={handleChange}
            placeholder={2020}
            className="dateInput"
            name="endYear"
            type="text"
            value={state.endYear}
            maxLength={4}
          />
          <br></br> <br></br>
          <button className="homeBtn" type="submit">
            Add
          </button>
        </form>
    )
}

export default TaskInputForm