import { Direction } from '@/types/global';

import ButtonTodayIcon from '@/assets/svgs/btn_today.svg?react';

import ArrowSVGButton from '../ArrowSVGButton';

const WeekChangeButtons = () => {
	return (
		<div className="flex gap-[1rem]">
			<button type="button">
				<ArrowSVGButton direction={Direction.LEFT} />
			</button>
			<button type="button">
				<ButtonTodayIcon />
			</button>
			<button type="button">
				<ArrowSVGButton direction={Direction.RIGHT} />
			</button>
		</div>
	);
};

export default WeekChangeButtons;
