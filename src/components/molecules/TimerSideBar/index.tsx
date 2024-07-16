import TimerTodayTodoBtn from '@/components/atoms/TimerTodayTodoBtn';
import TodoBox from '@/components/atoms/TodoBox';
import TodoToggleBtn from '@/components/atoms/TodoToggleBtn';

import useCloseSidebar from '@/hooks/useCloseSideBar';

import BtnListIcon from '@/assets/svgs/btn_list.svg?react';

interface Todo {
	id: number;
	name: string;
	startDate: string;
	endDate: string | null;
	targetTime: number;
	isComplete: boolean;
}
interface CategoryBoxProps {
	completedTodos: Todo[];
	ongoingTodos: Todo[];
	toggleSidebar: () => void;
}
const TimerSideBar = ({ ongoingTodos = [], completedTodos = [], toggleSidebar }: CategoryBoxProps) => {
	const { animate, handleClose } = useCloseSidebar(toggleSidebar);

	return (
		<div
			className={`flex h-[108rem] w-[40.2rem] transform flex-col rounded-bl-[16px] rounded-tl-[16px] bg-gray-bg-03 pl-[1.8rem] transition-transform duration-300 ${animate ? 'translate-x-0' : 'translate-x-full'}`}
		>
			<div className="flex h-[5.4rem] w-[36.6rem] items-center justify-between pl-[0.2rem] pt-[2rem]">
				<p className="head-bold-24 text-white">오늘 할 일</p>

				<button className="rounded-[1.5rem] hover:bg-gray-bg-04" onClick={handleClose}>
					<BtnListIcon />
				</button>
			</div>
			<div className="h-[82.6rem] overflow-auto pb-[2rem] pt-[1rem]">
				{ongoingTodos.map(({ name, startDate, endDate, targetTime, isComplete }) => (
					<TodoBox
						key={name}
						name={name}
						startDate={startDate}
						endDate={endDate}
						targetTime={targetTime}
						isComplete={isComplete}
					/>
				))}
				<TodoToggleBtn isCompleted={false} isToggled={false}>
					{completedTodos.map(({ name, startDate, endDate, targetTime, isComplete }) => (
						<TodoBox
							// Todo: 서버와 협의 후 id 값을 받아서 지정해주기(name 등은 중복될 수 있음)
							key={name}
							name={name}
							startDate={startDate}
							endDate={endDate}
							targetTime={targetTime}
							isComplete={isComplete}
						/>
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
