import { Routes, Route } from 'react-router-dom';
import styles from './app.module.css';
import { FourOFour } from './components/FourOFour';
import { RefreshComponent } from './components/RefreshTodo';

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="*" element={<RefreshComponent />} />
        <Route path="/404" element={<FourOFour />} />
      </Routes>
    </div>
  );
}

export default App
