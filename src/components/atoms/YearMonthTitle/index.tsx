import { Dayjs } from 'dayjs';

interface YearMonthTitleProps {
	selectedDate: Dayjs;
}

const YearMonthTitle = ({ selectedDate }: YearMonthTitleProps) => {
	const yearMonthData = selectedDate.format('YYYY년 MM월');
	return <h1 className="title-bold-32 text-white">{yearMonthData}</h1>;
};

export default YearMonthTitle;
