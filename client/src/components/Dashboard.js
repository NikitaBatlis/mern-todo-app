import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios'; 
import TodoList from './TodoList';
import {v4 as generateId} from 'uuid';
import Button from 'react-bootstrap/Button';

export default function Dashboard() {

  const [user, setUser] = useState({})
  const [username, setUsername] = useState('');
  const [todoList, setTodoList] = useState([]);
  const todoInput = useRef();

  //GET user data and set user, username, todolist
  useEffect(() => {
    axios.get('/api/dashboard')
    .then(
      (res) => {
        setTodoList(res.data.todolist != null ? res.data.todolist : []);
        setUsername(res.data.username);
        setUser(res.data)
      },
      (error) => {
        console.log(error);
      }
    )
  }, []);

  //ADD todo and UPDATE database
  function handleAddTodo() {

    const newTodos = [...todoList];
    newTodos.push({
      id: generateId(),
      name: todoInput.current.value,
      complete: false
    });
    setTodoList(newTodos);
        
    const updatedUser = {
      todolist: newTodos,
      _id: user._id,
      username: user.username,
      googleID: user.googleID
    }
    setUser(updatedUser);

    axios({
      url:'http://localhost:3001/api/dashboard/update',
      method:'PUT',
      data: updatedUser
    });
    
    todoInput.current.value = null;

  }

  //COMPLETED TOGGLE and UPDATE database
  function toggleTodoItem(id) {
    const newTodos = [...todoList];
    const targetTodo = newTodos.find(todo => todo.id === id);
    targetTodo.complete = !targetTodo.complete;
    setTodoList(newTodos);

    const updatedUser = {
      todolist: newTodos,
      _id: user._id,
      username: user.username,
      googleID: user.googleID
    }
    setUser(updatedUser);

    axios({
      url:'http://localhost:3001/api/dashboard/update',
      method:'PUT',
      data: updatedUser
    })
  }

  //DELETE COMPLETED and UPDATE database
  function handleClearCompleted() {
    const newTodos = todoList.filter(todo => !todo.complete);
    setTodoList(newTodos);
   
    const updatedUser = {
      todolist: newTodos,
      _id: user._id,
      username: user.username,
      googleID: user.googleID
    }
    setUser(updatedUser);

    axios({
      url:'http://localhost:3001/api/dashboard/update',
      method:'PUT',
      data: updatedUser
    })

  }

  //DELETE todo and UPDATE database
  function deleteTodoItem(id) {
    const newTodos = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodos);
    
    const updatedUser = {
      todolist: newTodos,
      _id: user._id,
      username: user.username,
      googleID: user.googleID
    }
    setUser(updatedUser);

    axios({
      url:'http://localhost:3001/api/dashboard/update',
      method:'PUT',
      data: updatedUser
    });
  }

    return(
      <div className="todoContainer">
        <div className="todoHeader">Hi, {username}</div>
        <div className="completeCount"><b>{todoList.filter(todo => !todo.complete).length}</b>items left to complete</div>
        <TodoList todoList={todoList} toggleTodoItem={toggleTodoItem} deleteTodoItem={deleteTodoItem}/>
        <div className="todoInputLabel">What needs to be done?</div>
        <input className="formControl" type="text" ref={todoInput}/>
        <div className="buttonContainer">
            <Button variant="info" onClick={handleAddTodo}>Add Todo</Button>
            <Button variant="secondary" onClick={handleClearCompleted}>Clear Completed</Button>
        </div>
        <div className="logoutButton">
          <a href="http://localhost:3001/api/logout"><Button variant="light" size="md">Logout</Button></a>
        </div>
      </div>
    )
  }