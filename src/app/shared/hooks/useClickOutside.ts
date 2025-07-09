import { RefObject, useEffect } from 'react';

const useClickOutside = (
	ref: RefObject<HTMLElement>,
	callback: (event?: MouseEvent) => void,
	enable: boolean = true,
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!enable) return;
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback(event);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, callback, enable]);
};

export default useClickOutside;
