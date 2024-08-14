import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import useCloseSidebar from '@/shared/hooks/useCloseSideBar';

import { usePatchTaskStatus } from '@/shared/apis/common/queries';
import { usePostTimerStop } from '@/shared/apis/timer/queries';

import { Todo } from '@/shared/types/todoData';

import BtnListIcon from '@/shared/assets/svgs/btn_list.svg?react';

import BoxTodo from '@/pages/HomePage/components/BoxTodo';
import ButtonTodoToggle from '@/pages/HomePage/components/ButtonTodoToggle';
import TimerTodayTodoBtn from '@/pages/TimerPage/components/ButtonTimerTodo';

interface CategoryBoxProps {
	completedTodos: Todo[];
	ongoingTodos: Todo[];
	toggleSidebar: () => void;
	setSelectedTodo: (id: number) => void;
	setTargetTime: (time: number) => void;
	setTargetName: (name: string) => void;
	selectedTodo: number | null;
	setIsPlaying: (isPlaying: boolean) => void;
	setTargetCategoryName: (name: string) => void;
	isPlaying: boolean;
	targetTime: number;
	formattedTodayDate: string;
	resetTimerIncreasedTime: () => void;
	timerIncreasedTime: number;
	increasedSideBarTime: number;
	resetIncreasedSideBarTime: () => void;
}

const TimerSideBar = ({
	ongoingTodos = [],
	completedTodos = [],
	toggleSidebar,
	setSelectedTodo,
	setTargetTime,
	setTargetName,
	selectedTodo,
	setIsPlaying,
	isPlaying,
	formattedTodayDate,
	resetTimerIncreasedTime,
	timerIncreasedTime,
	increasedSideBarTime,
	setTargetCategoryName,
	resetIncreasedSideBarTime,
}: CategoryBoxProps) => {
	const { animate, handleClose } = useCloseSidebar(toggleSidebar);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate, isError, error } = usePatchTaskStatus();
	const { mutate: stopTimer } = usePostTimerStop();

	const handleTodoClick = (id: number, time: number, name: string, categoryName: string) => {
		if (isPlaying) {
			if (selectedTodo !== null) {
				stopTimer(
					{ id: selectedTodo, elapsedTime: timerIncreasedTime, targetDate: formattedTodayDate },
					{
						onSuccess: () => {
							setIsPlaying(false);
							queryClient.invalidateQueries({ queryKey: ['todo', formattedTodayDate] });
							resetIncreasedSideBarTime();
						},
					},
				);
			}
		}
		resetTimerIncreasedTime();
		setSelectedTodo(id);
		setTargetTime(time);
		setTargetName(name);
		setTargetCategoryName(categoryName);
	};

	if (isError) {
		console.error(error);
	}

	const handleNavigateHome = () => {
		if (isPlaying && selectedTodo !== null) {
			stopTimer(
				{ id: selectedTodo, elapsedTime: increasedSideBarTime, targetDate: formattedTodayDate },
				{
					onSuccess: () => {
						setIsPlaying(false);
						navigate('/home');
					},
				},
			);
		} else {
			navigate('/home');
		}
	};

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
			<div className="h-[82.6rem] overflow-auto pb-[2rem]">
				{ongoingTodos.map((todo) => (
					<BoxTodo
						key={todo.id}
						{...todo}
						isSelected={todo.id === selectedTodo}
						onClick={() => handleTodoClick(todo.id, todo.targetTime, todo.name, todo.categoryName)}
						onToggleComplete={() => mutate(todo.id)}
					/>
				))}
				<ButtonTodoToggle isCompleted={false} isToggled={false}>
					{completedTodos.map((todo) => (
						<BoxTodo
							key={todo.id}
							{...todo}
							isSelected={todo.id === selectedTodo}
							onToggleComplete={() => mutate(todo.id)}
						/>
					))}
				</ButtonTodoToggle>
			</div>
			<div className="flex flex-col items-start gap-[1rem] pb-[2rem] pt-[4rem]">
				<TimerTodayTodoBtn variant="할 일 추가">할 일 추가</TimerTodayTodoBtn>
				<TimerTodayTodoBtn variant="홈으로 나가기" onClick={handleNavigateHome}>
					홈으로 나가기
				</TimerTodayTodoBtn>
			</div>
		</div>
	);
};

export default TimerSideBar;
