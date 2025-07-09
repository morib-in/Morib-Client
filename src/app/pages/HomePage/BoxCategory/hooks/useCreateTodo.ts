import { useState } from 'react';

export const useCreateTodo = () => {
	const [name, setName] = useState('');
	const [isAdding, setIsAdding] = useState(false);
	const [editable, setEditable] = useState(false);

	const handleEditComplete = () => {
		setEditable(false);
	};

	const handleInputChange = (name: string) => {
		setName(name);
	};

	const startAddingTodo = () => {
		setIsAdding(true);
		setEditable(true);
	};

	const cancelAddingTodo = () => {
		setName('');
		setIsAdding(false);
	};

	return {
		name,
		isAdding,
		editable,
		handleEditComplete,
		handleInputChange,
		startAddingTodo,
		cancelAddingTodo,
		setName,
		setIsAdding,
	};
};
