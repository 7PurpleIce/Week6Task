import styles from '../app.module.css'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
export const MainPage = ({newTodo, setNewTodo, handleAddTodo, isCreating, searchTerm, setSearchTerm, setIsSortEnabled, isSortEnabled, isLoading, sortedTodos}) => {
  const navigate = useNavigate();

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
              <div key={id} className={styles.task} onClick={() => navigate(`/task/${id}`)}>
                <span>{title} {completed ? '|| Completed' : '|| Pending'}</span>
              </div>
            ))
          )}
    </div>  
   )
}

MainPage.propTypes = {
  newTodo: PropTypes.string.isRequired,
  setNewTodo: PropTypes.func.isRequired,
  handleAddTodo: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  setIsSortEnabled: PropTypes.func.isRequired,
  isSortEnabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  sortedTodos: PropTypes.array.isRequired
};

/*
                <button
                  onClick={() => requestUpdateTask(id, completed)} 
                  disabled={isUpdating}
                  className={styles.updateButton}
                >
                  {isUpdating ? 'Updating...' : 'Toggle Completion'}
                </button> 
                
                <button
                  onClick={() => requestDeleteTask(id)} 
                  disabled={isDeleting}
                  className={styles.deleteButton}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
*/