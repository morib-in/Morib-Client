import ButtonArrowIcon from '@/assets/svgs/btn_arrow.svg?react';
import ButtonTodayIcon from '@/assets/svgs/btn_today.svg?react';

const WeekPickerButton = () => {
	return (
		<div className="flex gap-[0.1rem]">
			<button type="button">
				<ButtonArrowIcon />
			</button>
			<button type="button">
				<ButtonTodayIcon />
			</button>
			<button type="button">
				<ButtonArrowIcon />
			</button>
		</div>
	);
};

export default WeekPickerButton;
