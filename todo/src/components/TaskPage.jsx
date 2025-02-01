import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from '../app.module.css';
import PropTypes from 'prop-types';

export const TaskPage = ({ todos, requestUpdateTask, requestDeleteTask, isUpdating, isDeleting, isLoading }) => {
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
    todos: PropTypes.array.isRequired,
    requestUpdateTask: PropTypes.func.isRequired,
    requestDeleteTask: PropTypes.func.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    isDeleting: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
}