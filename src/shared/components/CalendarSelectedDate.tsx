import { getDateInfo } from '@/shared/utils/calendar/index';

interface CalendarSelectedDateProps {
	selectedStartDate: Date;
	selectedEndDate?: Date | null;
	isPeriodOn: boolean;
	onCalendarInputClick: () => void;
	readOnly?: boolean;
}

const CalendarSelectedDate = ({
	onCalendarInputClick,
	selectedStartDate,
	selectedEndDate,
	isPeriodOn,
}: CalendarSelectedDateProps) => {
	const defaultStyle =
		'cursor-pointer flex items-center self-stretch subhead-med-18 h-[4.6rem] w-[34.4rem] rounded-[8px] border-[1px] border-gray-bg-07 bg-gray-bg-03 px-[2rem] py-[0.8rem] mb-[0.9rem] text-white';

	const { year: startYear, month: startMonth, day: startDay } = getDateInfo(selectedStartDate);

	const getFormattedEndDate = () => {
		if (isPeriodOn && selectedEndDate) {
			const { year: endYear, month: endMonth, day: endDay } = getDateInfo(selectedEndDate);
			return `${endYear}년 ${endMonth}월 ${endDay}일`;
		}
		return null;
	};

	const formattedEndDate = getFormattedEndDate();

	return (
		<>
			{!isPeriodOn ? (
				<div className={`${defaultStyle}`} onClick={onCalendarInputClick}>
					{startYear}년 {startMonth}월 {startDay}일
				</div>
			) : (
				<div className={`${defaultStyle}`} onClick={onCalendarInputClick}>
					{startYear}년 {startMonth}월 {startDay}일 ~ {formattedEndDate}
				</div>
			)}
		</>
	);
};

export default CalendarSelectedDate;
