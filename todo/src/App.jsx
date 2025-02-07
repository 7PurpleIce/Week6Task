import { Routes, Route } from 'react-router-dom';
import styles from './app.module.css';
import { RefreshComponent } from './components/RefreshTodo';

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="*" element={<RefreshComponent />} />
      </Routes>
    </div>
  );
}

export default App
