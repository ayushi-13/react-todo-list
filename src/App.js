import React, { useState } from "react";
import "./App.css";

function App() {
  let [todolist, setToDoList] = useState([]);
  let [error, setError] = useState("");

  let saveToDoList = (event) => {
    event.preventDefault(); 

    let enteredTODO = event.target.enteredTODO.value.trim();

    if (!enteredTODO) {
      setError("Task cannot be empty");
      return;
    }

    if (!todolist.includes(enteredTODO)) {
      setToDoList([...todolist, enteredTODO]);
      event.target.reset();
      setError("");
    } else {
      setError("Task already exists");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="App">
      <header className="title">
        <h1 className="headertitle">To Do List</h1>
      </header>

      <form onSubmit={saveToDoList}>
        <input
          type="text"
          name="enteredTODO"
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>

      
      {error && <p className="errorMsg">{error}</p>}

      <div className="taskList">
        <ul>
          {todolist.map((value, index) => (
            <ToDolistItems
              key={index}
              value={value}
              indexNumber={index}
              todolist={todolist}
              setToDoList={setToDoList}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

function ToDolistItems({ value, indexNumber, todolist, setToDoList }) {
  let [status, setStatus] = useState(false);
  let [isEditing, setIsEditing] = useState(false);
  let [editedValue, setEditedValue] = useState(value);

  let deleteRow = (e) => {
    e.stopPropagation();
    let finalList = todolist.filter((item, index) => index !== indexNumber);
    setToDoList(finalList);
  };

  let saveEdit = (e) => {
    e.stopPropagation();

    if (!editedValue.trim()) return;

    let updatedList = [...todolist];
    updatedList[indexNumber] = editedValue.trim();
    setToDoList(updatedList);
    setIsEditing(false);
  };

  return (
    <li className={status ? "completedTask" : ""} onClick={() => !isEditing && setStatus(!status)}>
      
      {isEditing ? (
        <>
          <input className="editText"
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
          />
          <button className="save" onClick={saveEdit}>Save</button>
        </>
      ) : (
        <>
          {indexNumber + 1}. {value}
          <span onClick={deleteRow}>&times;</span>
          <button className="edit"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}>
            Edit
          </button>
        </>
      )}
    </li>
  );
}


// function ToDolistItems({ value, indexNumber, todolist, setToDoList }) {
//   let [status, setStatus] = useState(false);

//   let deleteRow = (e) => {
//     e.stopPropagation();
//     let finalList = todolist.filter((item, index) => index !== indexNumber);
//     setToDoList(finalList);
//   };

//   let checkStatus = () => {
//     setStatus(!status);
//   };

//   return (
//     <li className={status ? "completedTask" : ""} onClick={checkStatus}>
//       {indexNumber + 1}. {value}
//       <span onClick={deleteRow}>&times;</span>
//     </li>
//   );
// }
