import React from 'react'
import TodoCard from "../TodoCard/TodoCard";
import './todoTable.scss'

const TodoTable = (props) => {
    // Destructuring const variables from props
    const { year, todo, filter} = props
    // Destructuring functions from props
    const { handleScreenOffset, setFilter, handleDisplayTodo, removeTodo } = props
    
    return(
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
            {year.map((item) =>
              item.date.map((item2) => {
                if (item2 === 1) return <td className="startCell">{item2}</td>;
                else return <td>{item2}</td>;
              })
            )}
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
    )
}

export default TodoTable