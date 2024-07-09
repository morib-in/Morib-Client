import ButtonCalendarIcon from '@/assets/svgs/btn_cal.svg?react';
import CheckBoxBlankIcon from '@/assets/svgs/check_box_blank.svg?react';
import TimeFillIcon from '@/assets/svgs/mingcute_time-fill.svg?react';
import TimeLineIcon from '@/assets/svgs/mingcute_time-line.svg?react';
import MeatBall from '@/assets/svgs/todo_meatball_default.svg?react';

interface TodoBoxProps {
	title: string;
	date: string;
	accumulatedTime: number;
}

const formatSeconds = (seconds: number) => {
	if (seconds === 0) return '00:00:00';

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	const formattedHours = String(hours).padStart(2, '0');
	const formattedMinutes = String(minutes).padStart(2, '0');
	const formattedSeconds = String(secs).padStart(2, '0');

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const TodoBox = ({ title, date, accumulatedTime }: TodoBoxProps) => {
	//Todo: 오늘과 같을 경우 오늘 문자열로 변환하는 코드 추가
	const formattedTime = formatSeconds(accumulatedTime);
	const formattedDate = date.replace(/-/g, '.');

	//추후 SVG 버튼 컴포넌트로 만들것임
	return (
		<div className="flex h-[9.6rem] w-[36.6rem] flex-col justify-center rounded-[8px] bg-gray-bg-01 p-[1.4rem]">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-[0.6rem]">
					<CheckBoxBlankIcon />
					<h3 className="body-semibold-16 mt-[0.4rem] text-white">{title}</h3>
				</div>
				<MeatBall className="opacity-0 hover:opacity-100" />
			</div>

			<div className="ml-[0.8rem] mt-[0.7rem] flex flex-col gap-[0.2rem]">
				<div className="flex items-center gap-[0.6rem]">
					<ButtonCalendarIcon />
					<p className="detail-reg-12 mt-[0.3rem] text-gray-04">{formattedDate}</p>
				</div>

				<div className="flex items-center gap-[0.6rem]">
					{accumulatedTime ? (
						<>
							<TimeFillIcon />
							<p className="detail-reg-12 mt-[0.3rem] text-mint-01">{formattedTime}</p>
						</>
					) : (
						<>
							<TimeLineIcon />
							<p className="detail-reg-12 mt-[0.3rem] text-gray-bg-01">{formattedTime}</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default TodoBox;
