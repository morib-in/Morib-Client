import { useCallback, useEffect, useRef, useState } from 'react';

import useClickOutside from './useClickOutside';

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
	}, []);

	useClickOutside(sidebarRef, handleClose);

	return { animate, handleClose, sidebarRef };
};

export default useCloseSidebar;
