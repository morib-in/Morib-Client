import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import useClickOutside from '@/shared/hooks/useClickOutside';

import { usePatchTaskStatus } from '@/shared/apis/common/queries';
import { usePostTimerStop } from '@/shared/apis/timer/queries';

import { Todo } from '@/shared/types/todoData';

import BtnListIcon from '@/shared/assets/svgs/btn_list.svg?react';

import BoxTodo from '@/pages/HomePage/components/BoxTodo';
import ButtonTodoToggle from '@/pages/HomePage/components/ButtonTodoToggle';
import ButtonSideBar from '@/pages/TimerPage/components/ButtonSideBar';

interface CategoryBoxProps {
	completedTodos: Todo[];
	ongoingTodos: Todo[];
	toggleSidebar: () => void;
	onTodoSelection: (id: number, time: number, name: string, categoryName: string) => void;
	selectedTodo: number | null;
	onPlayToggle: (isPlaying: boolean) => void;
	isPlaying: boolean;
	targetTime: number;
	formattedTodayDate: string;
	resetTimerIncreasedTime: () => void;
	timerIncreasedTime: number;
	isSideOpen: boolean;
	resetAccumulatedIncreasedTime: () => void;
}

const SideBarTimer = ({
	ongoingTodos = [],
	completedTodos = [],
	toggleSidebar,
	onTodoSelection,
	selectedTodo,
	onPlayToggle,
	isPlaying,
	formattedTodayDate,
	resetTimerIncreasedTime,
	timerIncreasedTime,
	isSideOpen,
	resetAccumulatedIncreasedTime,
}: CategoryBoxProps) => {
	const sidebarRef = useRef<HTMLDivElement>(null);
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
							onPlayToggle(false);
							queryClient.invalidateQueries({ queryKey: ['todo', formattedTodayDate] });
							resetTimerIncreasedTime();
							resetAccumulatedIncreasedTime();
						},
					},
				);
			}
		}
		resetTimerIncreasedTime();
		onTodoSelection(id, time, name, categoryName);
	};

	const handleNavigateHome = () => {
		if (isPlaying && selectedTodo !== null) {
			stopTimer(
				{ id: selectedTodo, elapsedTime: timerIncreasedTime, targetDate: formattedTodayDate },
				{
					onSuccess: () => {
						onPlayToggle(false);
						navigate('/home');
					},
				},
			);
		} else {
			navigate('/home');
		}
	};

	if (isError) {
		console.error(error);
	}

	useClickOutside(sidebarRef, () => {
		if (isSideOpen) toggleSidebar();
	});

	return (
		<div
			ref={sidebarRef}
			className={`flex h-[108rem] w-[40.2rem] transform flex-col rounded-bl-[16px] rounded-tl-[16px] bg-gray-bg-03 pl-[1.8rem] ${
				isSideOpen ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			<div className="flex h-[5.4rem] w-[36.6rem] items-center justify-between pl-[0.2rem] pt-[2rem]">
				<p className="head-bold-24 text-white">오늘 할 일</p>
				<button className="rounded-[1.5rem] hover:bg-gray-bg-04" onClick={toggleSidebar}>
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
						timerIncreasedTime={todo.id === selectedTodo ? timerIncreasedTime : 0}
					/>
				))}
				<ButtonTodoToggle isCompleted={false} isToggled={false}>
					{completedTodos.map((todo) => (
						<BoxTodo
							key={todo.id}
							{...todo}
							isSelected={todo.id === selectedTodo}
							onToggleComplete={() => mutate(todo.id)}
							timerIncreasedTime={todo.id === selectedTodo ? timerIncreasedTime : 0}
						/>
					))}
				</ButtonTodoToggle>
			</div>
			<div className="flex flex-col items-start gap-[1rem] pb-[2rem] pt-[4rem]">
				<ButtonSideBar variant="할 일 추가">할 일 추가</ButtonSideBar>
				<ButtonSideBar variant="홈으로 나가기" onClick={handleNavigateHome}>
					홈으로 나가기
				</ButtonSideBar>
			</div>
		</div>
	);
};

export default SideBarTimer;
