import { useState } from 'react';

const useToggleSideBar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleSidebarToggle = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	return {
		isSidebarOpen,
		handleSidebarToggle,
	};
};

export default useToggleSideBar;
