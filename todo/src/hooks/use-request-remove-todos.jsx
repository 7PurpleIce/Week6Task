import { useState } from 'react'

export const useRequestDeleteTask = (refreshTodos) => {
    const [isDeleting, setIsDeleting] = useState(false)

    const requestDeleteTask = (taskId) => {
        setIsDeleting(true)

        fetch(`http://localhost:3050/todos/${taskId}`, {
          method: "DELETE",
          headers: { "Content-type": "application/json;charset=utf-8" },
        })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
            console.log('Task was removed, server response', response)
            
            refreshTodos()
        })
        .finally(() => setIsDeleting(false))
    }

    return{
        isDeleting,
        requestDeleteTask
    }
}