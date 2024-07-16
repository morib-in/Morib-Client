import { RefObject, useEffect } from 'react';

const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, callback]);
};

export default useClickOutside;
