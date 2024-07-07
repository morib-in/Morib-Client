interface WeekPickerProps {
	weekData?: string[];
}

const WeekPicker = ({
	weekData = ['01 월', '02 화', '03 수', '04 목', '05 금', '06 토', '07 일'],
}: WeekPickerProps) => {
	return (
		<nav>
			<ul className="subhead-reg-22 flex text-white">
				{weekData.map((item) => (
					<li className="flex h-[7.8rem] w-[15.2rem] items-center justify-center border-b-[0.2rem] border-gray-02">
						{item}
					</li>
				))}
			</ul>
			<div className="flex gap-x-[1rem]"></div>
		</nav>
	);
};

export default WeekPicker;
