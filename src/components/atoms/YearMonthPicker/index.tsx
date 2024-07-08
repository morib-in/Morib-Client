interface YearMonthPickerProps {
	yearMonthData?: string;
}

const YearMonthPicker = ({ yearMonthData = '2024년 7월' }: YearMonthPickerProps) => {
	return <h1 className="title-bold-32 text-white">{yearMonthData}</h1>;
};

export default YearMonthPicker;
