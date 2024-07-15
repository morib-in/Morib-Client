import { useEffect, useState } from 'react';

const useCloseSidebar = (toggleSidebar: () => void) => {
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		setAnimate(true);
	}, []);

	const handleClose = () => {
		setAnimate(false);
		setTimeout(() => {
			toggleSidebar();
		}, 300);
	};

	return { animate, handleClose };
};

export default useCloseSidebar;
