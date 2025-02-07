import styles from '../app.module.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useRequestAddTodoTask, useRequestGetTodos } from '../hooks';

export const MainPage = ({refreshTodoFlag, refreshTodos}) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [newTodo, setNewTodo] = useState('');
  const [isSortEnabled, setIsSortEnabled] = useState(false);

  const { isCreating, requestAddTodoTask } = 
    useRequestAddTodoTask(refreshTodos)

  const { isLoading, todos } = 
    useRequestGetTodos(refreshTodoFlag)
  
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
  
  return( 
    <div className={styles.addTask}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new task"
            className={styles.input}
          />
          <button
            onClick={handleAddTodo}
            disabled={isCreating || !newTodo.trim()}
            className={styles.button}
          >
            {isCreating ? 'Adding...' : 'Add Task'}
          </button>
        
        <div className={styles.searchSection}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks"
            className={styles.input}
          />
          <button
            onClick={() => setIsSortEnabled(!isSortEnabled)}
            className={styles.button}
          >
            {isSortEnabled ? 'Disable Sorting' : 'Sort Alphabetically'}
          </button>
        </div>
        {isLoading 
          ? <div className={styles.loader}></div> 
          : (
            sortedTodos.map(({ id, title, completed }) => (
              <div key={id} className={styles.task}>
                <Link to={`/task/${id}`}>{title} {completed ? '|| Completed' : '|| Pending'}</Link>
              </div>
            ))
          )}
    </div>  
   )
}


MainPage.propTypes = {
  refreshTodoFlag: PropTypes.bool,
  refreshTodos: PropTypes.func
};
