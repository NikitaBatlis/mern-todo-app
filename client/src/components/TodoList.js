import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({todoList, toggleTodoItem, deleteTodoItem}) {
    return (
        todoList.map(todo => (
            <TodoItem key={todo.id} todo={todo} toggleTodoItem={toggleTodoItem} deleteTodoItem={deleteTodoItem}/>
        ))
    )
}
