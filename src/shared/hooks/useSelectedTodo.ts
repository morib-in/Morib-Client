import { useEffect, useState } from 'react';

interface Todo {
	id: number;
	name: string;
	targetTime: string;
	categoryName: string;
}

export const useSelectedTodo = (todos: Todo[]) => {
	const [selectedTodo, setSelectedTodo] = useState<number | null>(() => (todos.length > 0 ? todos[0].id : null));

	useEffect(() => {
		if (todos.length > 0 && !selectedTodo) {
			setSelectedTodo(todos[0].id);
		}
	}, [todos, selectedTodo]);

	return [selectedTodo, setSelectedTodo] as const;
};
