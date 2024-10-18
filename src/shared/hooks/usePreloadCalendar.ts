import { useCallback, useState } from 'react';

export const usePreloadCalendar = () => {
	const [isCalendarLoaded, setIsCalendarLoaded] = useState(false);

	const preloadCalendarComponent = useCallback(() => {
		if (!isCalendarLoaded) {
			import('@/shared/components/Calendar').then(() => {
				setIsCalendarLoaded(true);
			});
		}
	}, [isCalendarLoaded]);

	return { isCalendarLoaded, preloadCalendarComponent };
};
