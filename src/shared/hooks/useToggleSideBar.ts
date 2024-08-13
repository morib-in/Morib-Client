import { useState } from 'react';

const useToggleSideBar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	return {
		isSidebarOpen,
		toggleSidebar,
	};
};

export default useToggleSideBar;
