import { useState } from 'react';

import { userFriendData } from '@/shared/mocks/userFriendData';

const useFriendInfoCarousel = (initialIndex = 4) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	const handlePrevClick = () => {
		setCurrentIndex((prevIndex) => {
			const newIndex = prevIndex - 5;
			return newIndex < 0 ? userFriendData.length + newIndex : newIndex;
		});
	};

	const handleNextClick = () => {
		setCurrentIndex((prevIndex) => {
			const newIndex = prevIndex + 5;
			return newIndex >= userFriendData.length ? newIndex % userFriendData.length : newIndex;
		});
	};

	const visibleFriends = () => {
		return Array.from({ length: 5 }, (_, i) => userFriendData[(currentIndex + i) % userFriendData.length]);
	};

	return {
		currentIndex,
		handlePrevClick,
		handleNextClick,
		visibleFriends,
	};
};

export default useFriendInfoCarousel;
