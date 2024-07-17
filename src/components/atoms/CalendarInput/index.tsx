import { formatInputDate } from '@/utils/calendar/index';

interface CalendarInputProps {
	selectedStartDate: Date;
	selectedEndDate?: Date | null;
	isPeriodOn: boolean;
	onCalendarInputClick: () => void;
	readOnly?: boolean;
}

const CalendarInput = ({
	onCalendarInputClick,
	selectedStartDate,
	selectedEndDate,
	isPeriodOn,
}: CalendarInputProps) => {
	const defaultStyle =
		'cursor-pointer items-center self-stretch subhead-med-18 h-[4.6rem] w-[34.4rem] rounded-[8px] border-[1px] border-gray-bg-07 bg-gray-bg-03 px-[2rem] py-[0.8rem] mb-[0.9rem] text-white';

	const formattedDate = formatInputDate(selectedStartDate);

	const getFormattedEndDate = () => {
		if (isPeriodOn) {
			return formatInputDate(selectedEndDate || null);
		}
	};

	const formattedEndDate = getFormattedEndDate();

	return (
		<>
			{!isPeriodOn ? (
				<div className={`${defaultStyle}`} onClick={onCalendarInputClick}>
					{formattedDate}
				</div>
			) : (
				<div className={`${defaultStyle}`} onClick={onCalendarInputClick}>
					{formattedDate} ~ {formattedEndDate}
				</div>
			)}
		</>
	);
};

export default CalendarInput;
