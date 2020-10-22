import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import TodoCard from "../components/TodoCard";
import { useParams } from "react-router-dom";

const HomeScr = () => {
  /*===== Const value initialize =====*/

  // Get username from param
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
  // Get todos from local storage
  const localStoredTodo = JSON.parse(localStorage[currentUser]) || [];

  /*=====  States initialize =====*/

  // Hook for storing todos: arr[Obj]
  const [todo, setTodo] = useState(localStoredTodo);
  // Hook for storing the current month to display in the window
  const [currentMonth, setCurrentMonth] = useState(1);
  // Hook for todofilter
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
  });

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
    if (parseInt(startMonth) == 0)
      document.getElementById("ganttChart").scrollLeft =
        document.getElementById("table") - 500;
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
        <p id="userProfile">User: {currentUser}</p>
        <div id="logoutBtn">
          <a href="/">Logout</a>
        </div>
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
          <button type="submit">Add</button>
        </form>
        <div id="buttonContainer">
          <button onClick={() => handleChart("prev")}>{"< Prev"}</button>
          <input
            disabled
            style={{ width: "1.8vw", textAlign: "center" }}
            value={currentMonth}
          ></input>
          <button onClick={() => handleChart("next")}>{"Next >"}</button>
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

        <table border="0" id="table" style={{ marginLeft: "21.5vw" }}>
          <tr className="nonFixedTd">
            <td
              className="fixedTd"
              style={{
                backgroundColor: "#D8DCFF",
                cursor: "default",
                border: "none",
              }}
            ></td>
            {year.map((item) => (
              <td
                class="table-monthName"
                id={item.month}
                key={item.month}
                colSpan={item.date.length}
              >
                <b>{item.month}</b>
              </td>
            ))}
          </tr>
          <tr className="nonFixedTd">
            <td
              id="showAllBtn"
              className="fixedTd"
              onClick={() => {
                handleScreenOffset(0);
                setFilter(undefined);
              }}
            >
              Show all to do
            </td>
            {/* {year.map((item) => item.date.map((item) => <td>{item}</td>))} */}

            {/* TEST */}
            {year.map((item) => item.date.map(item2 => {
              if(item2 === 1) return <td className="startCell">{item2}</td>
              else return <td>{item2}</td>
            }))}
            {/* TEST */}


          </tr>
          {/* {todo.map((item) => (
            <tr className="nonFixedTd">
              <td
                className="fixedTd"
                id={item.id}
                onClick={() => {handleScreenOffset(item.startMonth)
                handleDisplayTodo(item)}}
              >
                {item.task}
              </td>
              <TodoCard
                item={item}
                index={todo.findIndex((a) => a.id === item.id)}
                data={year}
              ></TodoCard>
            </tr>
          ))} */}

          {todo.map((item) => {
            if (filter) {
              if (item.id === filter) {
                return (
                  <tr className="nonFixedTd">
                    <td className="fixedTd">
                      <div
                        id="taskContainer"
                        onClick={() => {
                          handleScreenOffset(item.startMonth);
                          handleDisplayTodo(item);
                        }}
                      >
                        {item.task}
                      </div>
                      <div id="delBtnContainer">
                        <p onClick={() => removeTodo(item)}>Delete</p>
                      </div>
                    </td>
                    <TodoCard
                      item={item}
                      filter={filter}
                      index={todo.findIndex((a) => a.id === item.id)}
                      data={year}
                    ></TodoCard>
                  </tr>
                );
              } else return null;
            } else
              return (
                <tr className="nonFixedTd">
                  <td className="fixedTd" id={item.id}>
                    <div
                      id="taskContainer"
                      onClick={() => {
                        handleScreenOffset(item.startMonth);
                        handleDisplayTodo(item);
                      }}
                    >
                      {item.task}
                    </div>
                    <div id="delBtnContainer">
                      <p onClick={() => removeTodo(item)}>Delete</p>
                    </div>
                  </td>
                  <TodoCard
                    item={item}
                    filter={filter}
                    index={todo.findIndex((a) => a.id === item.id)}
                    data={year}
                  ></TodoCard>
                </tr>
              );
          })}
        </table>
      </div>
    </div>
  );
};

export default HomeScr;
