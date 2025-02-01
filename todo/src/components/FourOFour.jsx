import { useNavigate } from "react-router-dom";
import styles from '../app.module.css'

export const FourOFour = () => {
    const navigate = useNavigate();

    return (
        <div className={styles['not-found']}>
            <span>Task not found</span><br />
            <button className={styles.button} onClick={() => navigate(`/`)}>Return to main page</button>
        </div>
    )
}