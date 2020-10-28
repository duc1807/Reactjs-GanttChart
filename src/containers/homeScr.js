import React, { useState, useEffect } from "react";

import "../styles/Home.css";
//@ts-ignore
import TodoTable from "../components/TodoTable/TodoTable";
//@ts-ignore
import TaskInputForm from "../components/TaskInputForm/TaskInputForm";

import { useParams } from "react-router-dom";
//@ts-ignore
import ButtonMonthControl from "../components/ButtonMonthController/ButtonMonth";

import { FaUserCircle } from "react-icons/fa";

const HomeScr = () => {
  /*================================== Const value initialize =====*/

  // Get username from param
  //@ts-ignore
  const { currentUser } = useParams();
  currentUser.toString();

  // Function that return an array of dates in specific month
  const getDaysInMonth = (month, year) => {
    const totalDate = new Date(year, month, 0).getDate();
    let dateArray = [];
    for (let i = 1; i < totalDate + 1; i++) {
      dateArray.push(i);
    }
    return dateArray;
  };

  // Generate the array of months in a year
  const year = [
    {
      month: "jan",
      date: getDaysInMonth(1, 2020),
    },
    {
      month: "feb",
      date: getDaysInMonth(2, 2020),
    },
    {
      month: "mar",
      date: getDaysInMonth(3, 2020),
    },
    {
      month: "apr",
      date: getDaysInMonth(4, 2020),
    },
    {
      month: "may",
      date: getDaysInMonth(5, 2020),
    },
    {
      month: "jun",
      date: getDaysInMonth(6, 2020),
    },
    {
      month: "jul",
      date: getDaysInMonth(7, 2020),
    },
    {
      month: "aug",
      date: getDaysInMonth(8, 2020),
    },
    {
      month: "sep",
      date: getDaysInMonth(9, 2020),
    },
    {
      month: "oct",
      date: getDaysInMonth(10, 2020),
    },
    {
      month: "nov",
      date: getDaysInMonth(11, 2020),
    },
    {
      month: "dec",
      date: getDaysInMonth(12, 2020),
    },
  ];

  // Get todos from local storage
  const localStoredTodo = JSON.parse(localStorage[currentUser]) || [];

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
    duration: 0,
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
    let myElement = null;
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
    if (parseInt(state.startMonth) === parseInt(state.endMonth)) {
      newTodo.duration = parseInt(state.endDate) - parseInt(state.startDate);
    } else {
      let taskDateDuration = 0;
      for (
        let i = parseInt(state.startMonth);
        i < parseInt(state.endMonth) - 1;
        i++
      ) {
        taskDateDuration += getDaysInMonth(i + 1, 2020).length;
      }
      newTodo.duration =
        getDaysInMonth(parseInt(state.startMonth), 2020).length -
        parseInt(state.startDate) +
        parseInt(state.endDate) +
        taskDateDuration;
    }
    newTodo.id = new Date().getTime();

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
      duration: 0,
    });
    const ganttChart = document.getElementById("ganttChart");
    // Focus user's screen to the lastest created todo
    ganttChart.scrollLeft = getOffSetLeft(newTodo.startMonth);
  };

  // A func to handle the screen offset position | (startMonth) => void
  const handleScreenOffset = (startMonth) => {
    const ganttChart = document.getElementById("ganttChart");
    if (parseInt(startMonth) === 0)
      ganttChart.scrollLeft = document.getElementById("table").scrollLeft - 500;
    else {
      const topPos = getOffSetLeft(startMonth);
      ganttChart.scrollLeft = topPos;
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
    setFilter(item.id);
  };

  // Handle the month display on the screen | (option) => void
  const handleChart = (opt) => {
    const ganttChart = document.getElementById("ganttChart");
    switch (opt) {
      case "prev":
        if (currentMonth === 1) {
          ganttChart.scrollLeft = getOffSetLeft(12);
          setCurrentMonth(12);
        } else {
          ganttChart.scrollLeft = getOffSetLeft(currentMonth - 1);
          setCurrentMonth(currentMonth - 1);
        }
        break;
      case "next":
        if (currentMonth === 12) {
          ganttChart.scrollLeft = getOffSetLeft(1);
          setCurrentMonth(1);
        } else {
          ganttChart.scrollLeft = getOffSetLeft(currentMonth + 1);
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
          <FaUserCircle id="userIcon" />
          <p>
            User: {currentUser}
          </p>
        </div>
        <a href="/">
          <div id="logoutBtn">Logout</div>
        </a>

        <TaskInputForm
          state={state}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        ></TaskInputForm>

        <div id="buttonContainer">
          <ButtonMonthControl
            currentMonth={currentMonth}
            handleChart={handleChart}
          ></ButtonMonthControl>
        </div>
      </div>
      <div className="chartContainer" id="ganttChart">
        <TodoTable
          year={year}
          todo={todo}
          filter={filter}
          setTodo={setTodo}
          setFilter={setFilter}
          removeTodo={removeTodo}
          handleDisplayTodo={handleDisplayTodo}
          handleScreenOffset={handleScreenOffset}
        ></TodoTable>
      </div>
    </div>
  );
};

export default HomeScr;
