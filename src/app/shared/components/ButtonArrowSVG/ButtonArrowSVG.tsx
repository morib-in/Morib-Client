import { ButtonHTMLAttributes } from 'react';

import { Direction } from '@/shared/types/global';

import ButtonArrowIcon from '@/shared/assets/svgs/btn_arrow.svg?react';

interface ArrowSVGButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	direction: Direction;
	bg?: boolean;
}

const ButtonArrowSVG = ({ direction, bg = true, ...props }: ArrowSVGButtonProps) => {
	const backgroundStyle = bg ? 'bg-gray-bg-03 hover:bg-gray-bg-05 rounded-full' : '';

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
			<ButtonArrowIcon className={`${rotationStyle} ${backgroundStyle} ${props.className}`} />
		</button>
	);
};

export default ButtonArrowSVG;
