import React, { useState, useEffect } from "react";
import "../styles/Home.css";

import TodoTable from "../components/TodoTable/TodoTable";
import TaskInputForm from '../components/TaskInputForm/TaskInputForm'
import { useParams } from "react-router-dom";
import ButtonMonthControl from "../components/ButtonMonthController/ButtonMonth";
import { FaUserCircle } from 'react-icons/fa'


const HomeScr = () => {
  /*================================== Const value initialize =====*/

  // Get username from param
  //@ts-ignore
  const { currentUser } = useParams();
  // Generate date of each Month
  const date31 = [];
  for (let i = 1; i < 32; i++) {
    date31.push(i);
  }
  const date30 = [];
  for (let i = 1; i < 31; i++) {
    date30.push(i);
  }
  const date29 = [];
  for (let i = 1; i < 30; i++) {
    date29.push(i);
  }
  // Generate the array of months in a year
  const year = [
    {
      month: "jan",
      date: date31,
    },
    {
      month: "feb",
      date: date29,
    },
    {
      month: "mar",
      date: date31,
    },
    {
      month: "apr",
      date: date30,
    },
    {
      month: "may",
      date: date31,
    },
    {
      month: "jun",
      date: date30,
    },
    {
      month: "jul",
      date: date31,
    },
    {
      month: "aug",
      date: date31,
    },
    {
      month: "sep",
      date: date30,
    },
    {
      month: "oct",
      date: date31,
    },
    {
      month: "nov",
      date: date30,
    },
    {
      month: "dec",
      date: date30,
    },
  ];

  // if(!localStorage[currentUser]) {
  //   localStorage.setItem(currentUser, '')
  //   localStoredTodo = localStorage.getItem(currentUser)
  // } else {
  //   const localStoredTodo = JSON.parse(localStorage.getItem[currentUser]) || [];
  // }

  // Get todos from local storage
  const localStoredTodo = JSON.parse(localStorage.getItem(currentUser)) || [];

  /*==================================  States initialize =====*/

  // Hook for storing todos: arr[Obj]
  const [todo, setTodo] = useState(localStoredTodo);
  // Hook for storing the current month to display in the window
  const [currentMonth, setCurrentMonth] = useState(1);
  // Hook for todo filter (which task is focusing): todo.id
  const [filter, setFilter] = useState(undefined);
  // Hook for storing user's input
  const [state, setState] = useState({
    task: "",
    startDate: "",
    startMonth: "",
    startYear: "",
    endDate: "",
    endMonth: "",
    endYear: "",
  });

  // Storing the todos list into local storage when component finish render
  useEffect(() => {
    localStorage[currentUser] = JSON.stringify(todo);
    console.log("Chay effect");
  }, [todo, currentUser]);

  // Remove a todo
  const removeTodo = (item) => {
    let index = todo.indexOf(item);
    setTodo((prevTodo) => {
      let newTodo = [...prevTodo];
      newTodo.splice(index, 1);
      return newTodo;
    });
    setFilter(undefined);
  };

  // Get the offset position of the month that have id = passed id
  const getOffSetLeft = (id) => {
    id = parseInt(id);
    let myElement = undefined;
    switch (id) {
      case 1:
        myElement = document.getElementById("jan");
        break;
      case 2:
        myElement = document.getElementById("feb");
        break;
      case 3:
        myElement = document.getElementById("mar");
        break;
      case 4:
        myElement = document.getElementById("apr");
        break;
      case 5:
        myElement = document.getElementById("may");
        break;
      case 6:
        myElement = document.getElementById("jun");
        break;
      case 7:
        myElement = document.getElementById("jul");
        break;
      case 8:
        myElement = document.getElementById("aug");
        break;
      case 9:
        myElement = document.getElementById("sep");
        break;
      case 10:
        myElement = document.getElementById("oct");
        break;
      case 11:
        myElement = document.getElementById("nov");
        break;
      case 12:
        myElement = document.getElementById("dec");
        break;
      default:
        myElement = document.getElementById("table");
        break;
    }
    return myElement.offsetLeft;
  };

  // On create new todo => push to todo arr
  const handleSubmit = () => {
    const newTodo = state;
    //@ts-ignore
    newTodo.id = new Date().getTime();
    // todo.push(newTodo);
    setTodo((prevTodo) => {
      return [...prevTodo, newTodo];
    });
    // Reset the input's states
    setState({
      task: "",
      startDate: "",
      startMonth: "",
      startYear: "",
      endDate: "",
      endMonth: "",
      endYear: "",
    });
    // Focus user's screen to the lastest created todo
    document.getElementById("ganttChart").scrollLeft = getOffSetLeft(
      newTodo.startMonth
    );
  };

  // A func to handle the screen offset position | (startMonth) => void
  const handleScreenOffset = (startMonth) => {
    if (parseInt(startMonth) === 0)
      document.getElementById("ganttChart").scrollLeft =
        document.getElementById("table").scrollLeft - 500;
    else {
      const topPos = getOffSetLeft(startMonth);
      document.getElementById("ganttChart").scrollLeft = topPos;
    }
  };

  // Update user's input state when changing input field
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleDisplayTodo = (item) => {
    console.log(item.id);
    setFilter(item.id);
  };

  // Handle the month display on the screen | (option) => void
  const handleChart = (opt) => {
    switch (opt) {
      case "prev":
        if (currentMonth === 1) {
          document.getElementById("ganttChart").scrollLeft = getOffSetLeft(12);
          setCurrentMonth(12);
        } else {
          document.getElementById("ganttChart").scrollLeft = getOffSetLeft(
            currentMonth - 1
          );
          setCurrentMonth(currentMonth - 1);
        }
        break;
      case "next":
        if (currentMonth === 12) {
          document.getElementById("ganttChart").scrollLeft = getOffSetLeft(1);
          setCurrentMonth(1);
        } else {
          document.getElementById("ganttChart").scrollLeft = getOffSetLeft(
            currentMonth + 1
          );
          setCurrentMonth(currentMonth + 1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <div className="inputContainer">
        <div id="infoContainer">
          <FaUserCircle id="userIcon"/>
          <p>User: {currentUser}</p>
        </div>
        <div id="logoutBtn">
          <a href="/">Logout</a>
        </div>

        <TaskInputForm state={state} handleChange={handleChange} handleSubmit={handleSubmit}></TaskInputForm>
        {/* <form
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
        </form> */}



        <div id="buttonContainer">
          {/* <button className="homeBtn" onClick={() => handleChart("prev")}>{"< Prev"}</button>
          <input
            disabled
            style={{ width: "1.8vw", textAlign: "center" }}
            value={currentMonth}
          ></input>
          <button className="homeBtn" onClick={() => handleChart("next")}>{"Next >"}</button> */}
          <ButtonMonthControl
            currentMonth={currentMonth}
            handleChart={handleChart}
          ></ButtonMonthControl>
        </div>
      </div>
      <div className="chartContainer" id="ganttChart">
        {/* <div className="leftChartContaner">
        </div>
        <div className="rightChartContainer">
        </div> */}
        {/* Finest solution */}
        {/* <table border="1" id="table">
          <tr>
            <td></td>
            <td colSpan="32">Januraey</td>
          </tr>
          <tr>
            <td></td>
            {arr.map((item) => (
              <td>{item}</td>
            ))}
          </tr>
          {todo.map((item) => (
            <TodoCard
              item={item}
              arr={arr}
              index={todo.findIndex((a) => a.id === item.id)}
            ></TodoCard>
          ))}
        </table>
        <table border="1" id="table">
          <tr>
            <td></td>
            {arr.map((item) => (
              <td>{item}</td>
            ))}
          </tr>
          {todo.map((item) => (
            <TodoCard
              item={item}
              arr={arr}
              index={todo.findIndex((a) => a.id === item.id)}
            ></TodoCard>
          ))}
        </table> */}
        {/* TEST */}

        <TodoTable
          year={year}
          todo={todo}
          filter={filter}
          handleScreenOffset={handleScreenOffset}
          setFilter={setFilter}
          handleDisplayTodo={handleDisplayTodo}
          removeTodo={removeTodo}
        ></TodoTable>
        
      </div>
    </div>
  );
};

export default HomeScr;
