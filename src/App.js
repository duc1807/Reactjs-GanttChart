import React, { useState } from "react";
import "./App.css";

function App() {
  // Gen date
  var arr = [];
  for (var i = 1; i < 32; i++) {
    arr.push(i);
  }
  const year = [
    {
      month: "jan",
      date: arr,
    },
    {
      month: "feb",
      date: arr,
    },
    {
      month: "mar",
      date: arr,
    },
    {
      month: "apr",
      date: arr,
    },
    {
      month: "may",
      date: arr,
    },
    {
      month: "jun",
      date: arr,
    },
    {
      month: "jul",
      date: arr,
    },
    {
      month: "aug",
      date: arr,
    },
    {
      month: "sep",
      date: arr,
    },
    {
      month: "oct",
      date: arr,
    },
    {
      month: "nov",
      date: arr,
    },
    {
      month: "dec",
      date: arr,
    },
  ];

  const [todo, setTodo] = useState([]);
  const handleSubmit = () => {
    const newTodo = state;
    newTodo.id = new Date().getTime();
    todo.push(newTodo);
    console.log(todo);
    setState({
      task: "",
      startDate: "",
      startMonth: "",
      startYear: "",
      endDate: "",
      endMonth: "",
      endYear: "",
    });
  };

  const [state, setState] = useState({
    task: "",
    startDate: "",
    startMonth: "",
    startYear: "",
    endDate: "",
    endMonth: "",
    endYear: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  return (
    <div className="App">
      <div className="inputContainer">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Task:{" "}
          <input
            required
            onChange={handleChange}
            type="text"
            name="task"
            value={state.task}
          />
          <br></br>
          <br></br>
          Start date:
          <input
            onChange={handleChange}
            placeholder={24}
            className="dateInput"
            name="startDate"
            type="text"
            value={state.startDate}
          />{" "}
          -{" "}
          <input
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
          End date:
          <input
            onChange={handleChange}
            placeholder={24}
            className="dateInput"
            name="endDate"
            type="text"
            value={state.endDate}
          />{" "}
          -{" "}
          <input
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
      </div>

      <div className="chartContainer">
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
        <table border="1" id="table">
          <tr>
            <td></td>
            {year.map((item) => (
              <td colSpan={item.date.length}>{item.month}</td>
            ))}
          </tr>
          <tr>
            <td>To do</td>
            {year.map((item) => item.date.map((item) => <td>{item}</td>))}
          </tr>
          {todo.map((item) => (
            <TodoCard
              item={item}
              arr={arr}
              index={todo.findIndex((a) => a.id === item.id)}
              data={year}
            ></TodoCard>
          ))}
        </table>
      </div>
    </div>
  );
}

const TodoCard = (props) => {
  const { item, arr, index, data } = props;
  const row = parseInt(index) + 2;
  const startDate = parseInt(item.startDate);
  const endDate = parseInt(item.endDate);
  const startMonth = parseInt(item.startMonth);
  const endMonth = parseInt(item.endMonth);

  setTimeout(() => {
    var startPos = 0;
    var endPos = 0;
    if (endDate < startDate) {
      endPos = 31 - startDate + endDate + ((endMonth - startMonth - 1) * 31);
    } else if (endMonth > startMonth){
      endPos = 31 - startDate + endDate + ((endMonth - startMonth - 1) * 31);
    } else endPos = endDate - startDate;

    for (var t = 1; t < startMonth; t++) {
      startPos += data[t].date.length;
    }
    for (var i = 1; i <= endPos + 1; i++) {
      document.getElementById("table").rows[row].cells[
        startPos+startDate-1 + i
      ].style.backgroundColor = "green";
    }
    startPos = 0;
    endPos = 0;
  }, 800);
  
  return (
    <tr>
      <td>{item.task}</td>
      {data.map((item) => item.date.map(() => <td></td>))}
    </tr>
  );
};

export default App;
