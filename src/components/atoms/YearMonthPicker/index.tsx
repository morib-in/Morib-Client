import ButtonArrowIcon from '@/assets/svgs/btn_arrow.svg?react';

interface YearMonthPickerProps {
	yearMonthData?: string;
}

const YearMonthPicker = ({ yearMonthData = '2024년 7월' }: YearMonthPickerProps) => {
	return (
		<div className="flex items-center gap-[2rem]">
			<h1 className="title-bold-32 text-white">{yearMonthData}</h1>
			<ButtonArrowIcon />
		</div>
	);
};

export default YearMonthPicker;
