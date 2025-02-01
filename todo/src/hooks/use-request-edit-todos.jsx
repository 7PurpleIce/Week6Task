import { useState } from "react"

export const useRequestUpdateTask = (refreshTodos) => {
    const [isUpdating, setIsUpdating] = useState(false)

    const requestUpdateTask = (taskId, currentCompleted) => {
        setIsUpdating(true)
        
        fetch(`http://localhost:3050/todos/${taskId}`, {
        method: "PATCH",
          headers: { "Content-type": "application/json;charset=utf-8" },
          body: JSON.stringify({
            completed: !currentCompleted 
          })
        })
          .then((rawResponse) => rawResponse.json())

          .then((response) => {
            console.log('Task state was updated, server response', response)
            
            refreshTodos()
          })
          .finally(() => setIsUpdating(false))
    }

    return{
        isUpdating,
        requestUpdateTask
    }
}