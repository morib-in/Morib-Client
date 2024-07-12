import TimerTodayTodoBtn from '@/components/atoms/TimerTodayTodoBtn';
import TodoBox from '@/components/atoms/TodoBox';
import TodoToggleBtn from '@/components/atoms/TodoToggleBtn';

import BtnListIcon from '@/assets/svgs/btn_list.svg?react';

import { todoData } from '@/mocks/homeData';

interface todo {
	id: number;
	title: string;
	date: string;
	time: number;
}

interface CategoryBoxProps {
	completedTodos?: todo[];
	ongoingTodos?: todo[];
	toggleSidebar: () => void;
}

const TimerSideBar = ({ ongoingTodos = todoData, completedTodos = todoData, toggleSidebar }: CategoryBoxProps) => {
	return (
		<div className="flex h-screen w-[40.2rem] flex-col rounded-bl-[16px] rounded-tl-[16px] bg-gray-bg-03 pl-[1.8rem]">
			<div className="flex h-[5.4rem] w-[36.6rem] items-center justify-between pl-[0.2rem] pt-[2rem]">
				<p className="head-bold-24 text-white">오늘 할 일</p>
				<button onClick={toggleSidebar}>
					<BtnListIcon />
				</button>
			</div>
			<div className="h-[82.6rem] overflow-auto pb-[2rem] pt-[1rem]">
				{ongoingTodos.map(({ id, title, date, time }) => (
					<TodoBox key={id} title={title} date={date} accumulatedTime={time} isCompleted={false} />
				))}

				<TodoToggleBtn isCompleted={false} isToggled={false}>
					{completedTodos.map(({ id, title, date, time }) => (
						<TodoBox key={id} title={title} date={date} accumulatedTime={time} isCompleted={true} />
					))}
				</TodoToggleBtn>
			</div>
			<div className="flex flex-col items-start gap-[1rem] pb-[2rem]">
				<TimerTodayTodoBtn variant="할 일 추가">할 일 추가</TimerTodayTodoBtn>
				<TimerTodayTodoBtn variant="홈으로 나가기">홈으로 나가기</TimerTodayTodoBtn>
			</div>
		</div>
	);
};

export default TimerSideBar;
