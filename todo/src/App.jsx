import { useRequestGetTodos, useRequestAddTodoTask, useRequestDeleteTask, useRequestUpdateTask } from './hooks'
import { MainPage } from './components/MainPage'
import { TaskPage } from './components/TaskPage'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import styles from './app.module.css'
import { FourOFour } from './components/FourOFour'


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
          <Route path="/task/:id" element={
            <TaskPage 
              todos={todos}
              requestUpdateTask={requestUpdateTask}
              requestDeleteTask={requestDeleteTask}
              isUpdating={isUpdating}
              isDeleting={isDeleting}
              isLoading={isLoading}
            />} 
          />
          <Route path='/404' element={
            <FourOFour 
              todos={todos}
            />
          }/>
        </Routes>
    </div>
  )
}

export default App
