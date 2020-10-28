import React, { useState } from "react";
import "./todoCard.scss";
import uid from "uid";
import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";

const TodoCard = (props) => {
  const { item, index, data, filter, todo, setTodo } = props;

  // Parse input date month into type Number
  const newItem = Object.keys(item).map((key) => {
    return parseInt(item[key]);
  });

  // Destructuring from parsed INT array
  const [, startDate, startMonth, , endDate, endMonth] = [...newItem];

  const dragHandler = (e) => {
    const tableRow = document.getElementsByTagName("tr");
    if (filter) {
      tableRow[2].style.opacity = 0.5;
    } else {
      tableRow[index + 2].style.opacity = 0.5;
    }
  };

  ///////=========================== Update ca ngay thang khi drop
  const onDrop = (e) => {
    const tableRow = document.getElementsByTagName("tr");
    if (filter) {
      tableRow[2].style.opacity = 1;
    } else {
      tableRow[index + 2].style.opacity = 1;
    }
    let newUpdatedTodo = undefined;
    if (filter) {
      todo[index].startIndex = parseInt(e.currentTarget.id);
      todo[index].endIndex =
        parseInt(e.currentTarget.id) + parseInt(todo[index].duration);
      newUpdatedTodo = [...todo];
      setTodo(newUpdatedTodo);
    } else {
      newUpdatedTodo = [...todo];
      newUpdatedTodo[index].startIndex = parseInt(e.currentTarget.id);
      newUpdatedTodo[index].endIndex =
        parseInt(newUpdatedTodo[index].startIndex) +
        parseInt(todo[index].duration);

      setTodo(newUpdatedTodo);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  let startPosition = 1;
  let endPosition = 0;
  let taskSkippedMonthByDate = 0;

  // Calculate the total dates of passed months during task duration and calculate the endPosition
  let passedMonth = endMonth - startMonth - 1;

  if (startMonth === endMonth) {
    taskSkippedMonthByDate = 0;
    endPosition = endDate - startDate;
  } else {
    for (let i = 0; i < passedMonth; i++) {
      taskSkippedMonthByDate += data[startMonth + i].date.length;
    }
    endPosition =
      data[startMonth - 1].date.length -
      startDate +
      endDate +
      taskSkippedMonthByDate;
  }
  for (let t = 1; t < startMonth; t++) {
    startPosition += data[t - 1].date.length;
  }

  // Calculate the finalPosition from the start index of the table row
  let finalEndPosition =
    endPosition +
    startPosition +
    data[startMonth - 1].date.length -
    (data[startMonth - 1].date.length - startDate);

  let totalDateOfUnworkingMonth = 0;

  if (endMonth === startMonth) {
    for (let i = 0; i < startMonth - 1; i++) {
      totalDateOfUnworkingMonth += data[i].date.length;
    }
    finalEndPosition = totalDateOfUnworkingMonth + endDate + 1;
  }

  // Initialize the start index of the table row
  let indx = 1;
  if (!item.startIndex && !item.endIndex) {
    return data.map((item) =>
      item.date.map((date) => {
        indx++;
        if (
          indx >=
            startPosition +
              (data[startMonth - 1].date.length -
                (data[startMonth - 1].date.length - startDate)) &&
          indx <= finalEndPosition
        ) {
          if (date === 1)
            return (
              <td
                id={indx}
                onDragOver={allowDrop}
                className="nonFixedTd startCell"
              >
                <div
                  id={indx}
                  draggable="true"
                  onDrop={onDrop}
                  onDragOver={allowDrop}
                  onDragStart={dragHandler}
                  className="taskTd"
                ></div>
              </td>
            );
          else
            return (
              <td id={indx} onDragOver={allowDrop} className="nonFixedTd">
                <div
                  onDragOver={allowDrop}
                  draggable="true"
                  onDrop={onDrop}
                  id={indx}
                  onDragStart={dragHandler}
                  className="taskTd"
                ></div>
              </td>
            );
        } else {
          if (date === 1)
            return (
              <td
                onDragOver={allowDrop}
                id={indx}
                onDrop={onDrop}
                className="nonFixedTd startCell"
              ></td>
            );
          else
            return (
              <td
                onDragOver={allowDrop}
                onDrop={onDrop}
                id={indx}
                className="nonFixedTd"
              ></td>
            );
        }
      })
    );
  } else {
    return data.map((month) =>
      month.date.map((date) => {
        indx++;
        if (indx >= item.startIndex && indx <= item.endIndex) {
          if (date === 1)
            return (
              <td id={indx} onDrop={onDrop} className="nonFixedTd startCell">
                <div
                  draggable="true"
                  id={indx}
                  onDragOver={allowDrop}
                  onDragStart={dragHandler}
                  onDrop={onDrop}
                  className="taskTd"
                ></div>
              </td>
            );
          else
            return (
              <td
                id={indx}
                onDrop={onDrop}
                onDragOver={allowDrop}
                className="nonFixedTd"
              >
                <div
                  draggable="true"
                  onDrop={onDrop}
                  onDragOver={allowDrop}
                  id={indx}
                  onDragStart={dragHandler}
                  className="taskTd"
                ></div>
              </td>
            );
        } else {
          if (date === 1)
            return (
              <td
                id={indx}
                onDragOver={allowDrop}
                onDrop={onDrop}
                className="nonFixedTd startCell"
              ></td>
            );
          else {
            return (
              <td
                onDragOver={allowDrop}
                onDrop={onDrop}
                id={indx}
                className="nonFixedTd"
              ></td>
            );
          }
        }
      })
    );
  }
};

export default TodoCard;
