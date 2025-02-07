import { useParams, useNavigate } from 'react-router-dom';
import { useRequestDeleteTask, useRequestUpdateTask, useRequestGetTodos } from '../hooks';
import { useEffect } from 'react';
import styles from '../app.module.css';
import PropTypes from 'prop-types';

export const TaskPage = ({ refreshTodoFlag, refreshTodos }) => {
    const {isDeleting, requestDeleteTask} =
        useRequestDeleteTask(refreshTodos)
  
    const { isUpdating, requestUpdateTask } =
        useRequestUpdateTask(refreshTodos)

    const { isLoading, todos } = 
        useRequestGetTodos(refreshTodoFlag)
    
    const { id } = useParams();
    const navigate = useNavigate();
    const task = todos.find((t) => t.id.toString() === id);

    useEffect(() => {
        if (!isLoading && todos.length > 0 && !task) {
            navigate('/404');
        }
    }, [task, isLoading, todos, navigate]);

    if (isLoading) {
        return <div className={styles.loader}></div>; 
    }
      
    if (!task) {
        return <div>Task not found</div>; 
    }

    return (
        
        <div className={styles.taskPage}>
            <h2 className={styles.taskText}>{task.title}</h2>
            <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>

            <button
                onClick={() => requestUpdateTask(id, task.completed)} 
                disabled={isUpdating}
                className={styles.updateButton}
            >
                {isUpdating ? 'Updating...' : 'Toggle Completion'}
            </button> 
                
            <button
                onClick={() => requestDeleteTask(task.id)} 
                disabled={isDeleting}
                className={styles.deleteButton}
            >
                {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            <button className={styles.returnButton} onClick={() => navigate(-1)}>Return to previous page</button>
        </div>
        
    );
}

TaskPage.propTypes = {
    refreshTodoFlag: PropTypes.bool,
    refreshTodos: PropTypes.func
};
  