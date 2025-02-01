import { useEffect, useState } from "react";

export const useRequestGetTodos = (refreshTodoFlag) => {
    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(false)
	
	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3050/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodoFlag]);

	return {
		isLoading, 
		todos
	}
}