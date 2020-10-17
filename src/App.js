import React, { useState } from "react";
import "./App.css";

function App() {
  var arr = [];
  for (var i = 1; i < 32; i++) {
    arr.push(i);
  }
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
        <table border="1" id="table">
          {/* <tr>
            <td></td>
            <td colSpan="32">Januraey</td>
          </tr> */}
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
        </table>
      </div>
    </div>
  );
}

const TodoCard = (props) => {
  const { item, arr, index } = props;
  const row = parseInt(index) + 1;
  const startDate = parseInt(item.startDate);
  const endDate = parseInt(item.endDate);
  setTimeout(() => {
    for (var i = startDate; i <= endDate; i++) {
      document.getElementById("table").rows[row].cells[
        i
      ].style.backgroundColor = "green";
    }
  }, 800);

  return (
    <tr>
      <td>{item.task}</td>
      {arr.map((item) => (
        <td></td>
      ))}
    </tr>
  );
};

export default App;
