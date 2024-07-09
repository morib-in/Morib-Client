import ButtonCalendarIcon from '@/assets/svgs/btn_cal.svg?react';
import CheckBoxBlankIcon from '@/assets/svgs/check_box_blank.svg?react';
import TimeIcon from '@/assets/svgs/mingcute_time-fill.svg?react';

interface TodoBoxProps {
	title: string;
	date: string;
	accumulatedTime: number;
}

function formatSeconds(seconds: number) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	const formattedHours = String(hours).padStart(2, '0');
	const formattedMinutes = String(minutes).padStart(2, '0');
	const formattedSeconds = String(secs).padStart(2, '0');

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

const TodoBox = ({ title, date, accumulatedTime }: TodoBoxProps) => {
	//Todo: 오늘과 같을 경우 오늘 문자열로 변환하는 코드 추가
	const formattedTime = formatSeconds(accumulatedTime);
	const formattedDate = date.replace(/-/g, '.');

	return (
		<div className="flex h-[9.6rem] w-[36.6rem] flex-col justify-center rounded-[8px] bg-gray-bg-01 p-[1.4rem]">
			<div className="flex items-center gap-[0.6rem]">
				<CheckBoxBlankIcon />
				<h3 className="body-semibold-16 text-white">{title}</h3>
			</div>
			<div className="ml-[0.8rem] mt-[0.7rem] flex flex-col gap-[0.2rem]">
				<div className="flex items-center gap-[0.6rem]">
					<ButtonCalendarIcon />
					<p className="detail-reg-12 text-gray-04">{formattedDate}</p>
				</div>
				<div className="flex items-center gap-[0.6rem]">
					<TimeIcon />
					<p className="detail-reg-12 text-mint-01">{formattedTime}</p>
				</div>
			</div>
		</div>
	);
};

export default TodoBox;
