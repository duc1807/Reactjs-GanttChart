import React, { useState } from "react";
import './todoCard.scss'

const TodoCard = (props) => {
  const { item, index, data, filter } = props;
  // const startDate = parseInt(item.startDate);
  // const endDate = parseInt(item.endDate);
  // const startMonth = parseInt(item.startMonth);
  // const endMonth = parseInt(item.endMonth);

  // Parse input date month into type Number
  const newItem = Object.keys(item).map((key) => {
    return parseInt(item[key]);
  });
  // Destructuring from array
  const [ , startDate, startMonth, , endDate, endMonth] = [...newItem];

  // Initialize the start position (skip the first 2 rows)
  const row = parseInt(index) + 2;

  // SetTimeout to await the row to initializing and then hightlight the task position

  // setTimeout(() => {
  //   let startPosition = 1;
  //   let endPosition = 0;
  //   let totalDatesOfPassedMonths = 0;

  //   // Calculate the total dates of passed months during task duration and calculate the endPosition
  //   let passedMonth = endMonth - startMonth - 1;
  //   if (startMonth == endMonth) {
  //     totalDatesOfPassedMonths = 0;
  //     endPosition = endDate - startDate;
  //   } else {
  //     for (let i = 0; i < passedMonth; i++) {
  //       totalDatesOfPassedMonths += data[startMonth + i].date.length;
  //     }
  //     endPosition =
  //       data[startMonth - 1].date.length -
  //       startDate +
  //       endDate +
  //       totalDatesOfPassedMonths;
  //   }

  //   // [Done]
  //   // if (endDate < startDate) {
  //   //   endPosition =
  //   //     data[startMonth - 1].date.length -
  //   //     startDate +
  //   //     endDate +
  //   //     totalDatesOfPassedMonths;
  //   // }

  //   // [Not Done]
  //   // else if (endMonth > startMonth) {
  //   //   endPosition = 31 - startDate + endDate + (endMonth - startMonth - 1) * 31;
  //   // }

  //   // [Not Done]
  //   // else
  //   //   endPosition =
  //   //     data[startMonth - 1].date.length -
  //   //     startDate +
  //   //     endDate +
  //   //     totalDatesOfPassedMonths;

  //   // Calculate total of the date of passed months
  //   for (let t = 1; t < startMonth; t++) {
  //     startPosition += data[t - 1].date.length;
  //   }

  //   // // Display the task
  //   // if (!filter) {
  //   //   console.log("k co filter");
  //   //   for (let i = 1; i <= endPosition + 1; i++) {
  //   //     document.getElementById("table").rows[row].cells[
  //   //       startPosition - 1 + startDate - 1 + i
  //   //     ].style.backgroundColor = "green";
  //   //   }
  //   //   startPosition = 0;
  //   //   endPosition = 0;
  //   // } else {
  //   //   // Phai reset lai mau truoc khi set mau moi
  //   //   console.log("co filter");
  //   //   for (let i = 1; i <= endPosition + 1; i++) {
  //   //     document.getElementById("table").rows[2].cells[
  //   //       startPosition - 1 + startDate - 1 + i
  //   //     ].style.backgroundColor = "green";
  //   //   }
  //   //   startPosition = 0;
  //   //   endPosition = 0;
  //   // }
  // }, 800);

  let startPosition = 1;
  let endPosition = 0;
  var totalDatesOfPassedMonths = 0;

  // Calculate the total dates of passed months during task duration and calculate the endPosition
  let passedMonth = endMonth - startMonth - 1;

  if (startMonth === endMonth) {
    totalDatesOfPassedMonths = 0;
    endPosition = endDate - startDate;
  } else {
    for (let i = 0; i < passedMonth; i++) {
      totalDatesOfPassedMonths += data[startMonth + i].date.length;
    }
    endPosition =
      data[startMonth - 1].date.length -
      startDate +
      endDate +
      totalDatesOfPassedMonths;
  }
  for (let t = 1; t < startMonth; t++) {
    startPosition += data[t - 1].date.length;
  }

  // [Done]
  if (endDate < startDate) {
    endPosition =
      data[startMonth - 1].date.length -
      startDate +
      endDate +
      totalDatesOfPassedMonths;
  }

  // // [Not Done]
  // else if (endMonth > startMonth) {
  //   endPosition = 31 - startDate + endDate + (endMonth - startMonth - 1) * 31;
  // }

  // [Not Done]
  else
    endPosition =
      data[startMonth - 1].date.length -
      startDate +
      endDate +
      totalDatesOfPassedMonths;

  let indx = 1;
  let finalEndPosition =
    endPosition +
    startPosition +
    data[startMonth - 1].date.length -
    (data[startMonth - 1].date.length - startDate);

  let totalDateOfUnworkingMonth = 0
  if (endMonth === startMonth) {
    for (let i = 0; i < startMonth - 1; i++) {
      totalDateOfUnworkingMonth += data[i].date.length
    }
    finalEndPosition = totalDateOfUnworkingMonth + endDate + 1;
  }

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
          return <td className="nonFixedTd taskTd startCell"></td>;
        else return <td className="nonFixedTd taskTd"></td>;
      } else {
        if (date === 1) return <td className="nonFixedTd startCell"></td>;
        else return <td className="nonFixedTd"></td>;
      }
    })
  );
};

export default TodoCard;
