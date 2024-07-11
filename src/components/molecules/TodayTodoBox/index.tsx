import TodayTodoDefault from '@/components/atoms/TodayTodoDefault';
import TodayTodoLargeBtn from '@/components/atoms/TodayTodoLargeBtn';

import { convertTime } from '@/utils/time';

interface TodayTodoBoxProps {
	time: number;
}

const TodayTodoBox = ({ time = 2000 }: TodayTodoBoxProps) => {
	const { hours, minutes, seconds } = convertTime(time);

	return (
		<div className="h-[88.6rem] w-[40.2rem] rounded-[1.6rem] bg-gray-bg-03 p-[1.8rem]">
			<div className="rounded-[0.8rem] bg-gray-bg-05 pb-[1.8rem] pl-[2.6rem] pt-[2.2rem] text-white">
				<p className="head-bold-24">몰입 시간</p>
				<p className="title-bold-32">{`${hours}시간 ${minutes}분 ${seconds}초`}</p>
			</div>
			<h3 className="head-bold-24 mx-auto mt-[3.2rem] text-white">오늘 할 일</h3>
			<TodayTodoDefault hasTodos={true} />
		</div>
	);
};

export default TodayTodoBox;
