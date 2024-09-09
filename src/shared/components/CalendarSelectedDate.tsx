import { Dayjs } from 'dayjs';

import { formatDateInfo } from '@/shared/utils/calendar/index';

interface CalendarSelectedDateProps {
	selectedStartDate: Dayjs;
	selectedEndDate?: Dayjs | null;
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
		'flex h-[4.6rem] w-[34.4rem] px-[2rem] py-[0.8rem] items-center gap-[0.4rem] subhead-med-18 rounded-[8px] border-[1px] border-gray-bg-07 bg-gray-bg-03 mb-[0.9rem] text-white';

	const formattedStartDate = formatDateInfo(selectedStartDate);
	const formattedEndDate = isPeriodOn && selectedEndDate ? formatDateInfo(selectedEndDate) : null;

	return (
		<div className={defaultStyle} onClick={onCalendarInputClick}>
			<div>
				{formattedStartDate.year}년 {formattedStartDate.month}월 {formattedStartDate.day}일
			</div>
			{isPeriodOn && formattedEndDate && (
				<>
					<div>~</div>
					<div>
						{formattedEndDate.year}년 {formattedEndDate.month}월 {formattedEndDate.day}일
					</div>
				</>
			)}
		</div>
	);
};

export default CalendarSelectedDate;
