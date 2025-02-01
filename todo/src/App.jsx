import { useRequestGetTodos, useRequestAddTodoTask, useRequestDeleteTask, useRequestUpdateTask } from './hooks'
import { MainPage } from './components/MainPage'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import styles from './app.module.css'


function App() {
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSortEnabled, setIsSortEnabled] = useState(false);
  const [refreshTodoFlag, setRefreshTodoFlag] = useState(false)
  
  const refreshTodos = () => setRefreshTodoFlag(!refreshTodoFlag)
  
  const { isLoading, todos } = 
    useRequestGetTodos(refreshTodoFlag)
  
  const { isCreating, requestAddTodoTask } = 
    useRequestAddTodoTask(refreshTodos)
  
  const {isDeleting, requestDeleteTask} =
    useRequestDeleteTask(refreshTodos)
  
  const { isUpdating, requestUpdateTask } =
    useRequestUpdateTask(refreshTodos)
  
  
  const handleAddTodo = () => {
    requestAddTodoTask(newTodo)
    setNewTodo('')
  }

  
  const filteredTodos = todos
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  
  const sortedTodos = isSortEnabled
    ? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
    : filteredTodos;

  return (
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={
            <MainPage 
              newTodo={newTodo}
              setNewTodo={setNewTodo}
              handleAddTodo={handleAddTodo}
              isCreating={isCreating}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setIsSortEnabled={setIsSortEnabled}
              isSortEnabled={isSortEnabled}
              isLoading={isLoading}
              sortedTodos={sortedTodos}
            />} 
          />
        </Routes>
    </div>
  )
}

export default App
