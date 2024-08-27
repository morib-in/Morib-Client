import { useCallback, useEffect, useRef, useState } from 'react';

const useCloseSidebar = (toggleSidebar: () => void) => {
	const [animate, setAnimate] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleClose = useCallback(() => {
		setAnimate(false);
		setTimeout(() => {
			toggleSidebar();
		}, 300);
	}, [toggleSidebar]);

	useEffect(() => {
		setAnimate(true);

		const handleClickOutside = (event: MouseEvent) => {
			if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
				handleClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClose]);

	return { animate, handleClose, sidebarRef };
};

export default useCloseSidebar;
