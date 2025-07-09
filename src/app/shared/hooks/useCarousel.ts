import { RefObject } from 'react';

interface UseCarouselProps {
	carouselRef: RefObject<HTMLDivElement>;
}

interface UseCarouselReturn {
	handleNext: () => void;
	handlePrev: () => void;
}

const useCarousel = ({ carouselRef }: UseCarouselProps): UseCarouselReturn => {
	const handleNext = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({
				left: carouselRef.current.offsetWidth,
				behavior: 'smooth',
			});
		}
	};

	const handlePrev = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({
				left: -carouselRef.current.offsetWidth,
				behavior: 'smooth',
			});
		}
	};

	return { handleNext, handlePrev };
};

export default useCarousel;
