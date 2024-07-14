import { ButtonHTMLAttributes } from 'react';

import { Direction } from '@/types/global';

import ButtonArrowIcon from '@/assets/svgs/btn_arrow.svg?react';

interface ArrowSVGButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	direction: Direction;
}

const ArrowSVGBtn = ({ direction, ...props }: ArrowSVGButtonProps) => {
	const defaultBtnStyle = ' bg-gray-bg-03 hover:bg-gray-bg-05 rounded-full';
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
	return (
		<button type="button" {...props}>
			<ButtonArrowIcon className={rotationStyle + defaultBtnStyle} />
		</button>
	);
};

export default ArrowSVGBtn;
