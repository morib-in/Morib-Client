import { useState } from 'react';

export const useToggleSidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleSidebarToggle = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	return {
		isSidebarOpen,
		handleSidebarToggle,
	};
};
