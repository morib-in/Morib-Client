import { Direction } from '@/types/global';

import ButtonArrowIcon from '@/assets/svgs/btn_arrow.svg?react';

interface ArrowSVGButtonProps {
	direction: Direction;
}

const ArrowSVGButton = ({ direction }: ArrowSVGButtonProps) => {
	let rotationStyle = '';

	switch (direction) {
		case Direction.LEFT:
			rotationStyle = 'rotate-90';
			break;
		case Direction.RIGHT:
			rotationStyle = '-rotate-90';
			break;
		case Direction.UP:
			rotationStyle = 'rotate-180';
			break;
		case Direction.DOWN:
			rotationStyle = '';
			break;
	}
	return <ButtonArrowIcon className={rotationStyle} />;
};

export default ArrowSVGButton;
