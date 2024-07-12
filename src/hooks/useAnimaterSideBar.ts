import { useEffect, useState } from 'react';

const useAnimateSidebar = (isSidebarOpen: boolean) => {
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		if (isSidebarOpen) {
			setAnimate(true);
		} else {
			setAnimate(false);
		}
	}, [isSidebarOpen]);

	return animate;
};

export default useAnimateSidebar;
