import { useState } from 'react';
import { MainPage } from './MainPage';
import { TaskPage } from './TaskPage';
import { Routes, Route } from 'react-router-dom';

export const RefreshComponent = () => {
    const [refreshTodoFlag, setRefreshTodoFlag] = useState(false);
    const refreshTodos = () => setRefreshTodoFlag(!refreshTodoFlag);
  
    return (
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              refreshTodoFlag={refreshTodoFlag}
              refreshTodos={refreshTodos}
            />
          }
        />
        <Route
          path="/task/:id"
          element={
            <TaskPage
              refreshTodoFlag={refreshTodoFlag}
              refreshTodos={refreshTodos}
            />
          }
        />
      </Routes>
    );
  };