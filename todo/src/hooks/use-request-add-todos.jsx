import { useState } from 'react'

export const useRequestAddTodoTask = (refreshTodos) => {
    const [isCreating, setIsCreating] = useState(false)

    const requestAddTodoTask = (newTodo) => {
    setIsCreating(true)
    
    fetch('http://localhost:3050/todos', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          title: newTodo,
          completed: false
        })
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log('Task was added, server response', response)
        
        refreshTodos()
      })
      .finally(() => setIsCreating(false))
    }

    return{
        isCreating,
        requestAddTodoTask
    }       
}
