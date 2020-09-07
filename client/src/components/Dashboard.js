import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios'; 
import TodoList from './TodoList';
import {v4 as generateId} from 'uuid';
import Button from 'react-bootstrap/Button';

export default function Dashboard() {

  const [todoList, setTodoList] = useState([]);
  const todoInput = useRef();

  useEffect(() => {
    axios.get('/dashboard')
    .then(
      (res) => {
        setTodoList({
          username: res.data.username,
          todoList: res.data.todolist
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }, []);

  function handleAddTodo() {
    const newTodos = [...todoList];
    newTodos.push({
      id: generateId(),
      name: todoInput.current.value,
      complete: false
    });
    setTodoList(newTodos);
    todoInput.current.value = null;
  }

  function handleClearCompleted() {
    setTodoList(todoList.filter(todo => !todo.complete));
  }

  function toggleTodoItem(id) {
    const newTodos = [...todoList];
    const targetTodo = newTodos.find(todo => todo.id === id);
    targetTodo.complete = !targetTodo.complete;
    setTodoList(newTodos);
  }

  function deleteTodoItem(id) {
    setTodoList(todoList.filter(todo => todo.id !== id));
  }

    return(
      <>
      <div className="todoContainer">
        <div className="todoHeader">TODO</div>
        <div className="completeCount"><b>{todoList.filter(todo => !todo.complete).length}</b>items left to complete</div>
        <TodoList todoList={todoList} toggleTodoItem={toggleTodoItem} deleteTodoItem={deleteTodoItem}/>
        <div className="todoInputLabel">What needs to be done?</div>
        <input className="formControl" type="text" ref={todoInput}/>
        <div className="buttonContainer">
            <Button variant="primary" onClick={handleAddTodo}>Add Todo</Button>
            <Button variant="secondary" onClick={handleClearCompleted}>Clear Completed</Button>
            <Button variant="primary" size="lg">Logout</Button>
        </div>
      </div>
      </>
    )
  }