import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import BoxTodo from '@/shared/components/BoxTodo/BoxTodo';
import ButtonRadius5 from '@/shared/components/ButtonRadius5/ButtonRadius5';
import ButtonTodoToggle from '@/shared/components/ButtonTodayToggle/ButtonTodoToggle';
import Spacer from '@/shared/components/Spacer/Spacer';

import { TimerTodoType } from '@/shared/types/tasks';

import BtnListIcon from '@/shared/assets/svgs/btn_list.svg?react';

import { getTimerIncreasedTime } from '@/pages/TimerPage/utils/timeFormat';
import { usePostToggleTaskStatus } from '@/shared/apisV2/common/common.mutations';
import { timerKeys } from '@/shared/apisV2/timer/timer.keys';

import { useTimerContext } from '../contexts/TimerContext';

interface SideMenuTimerProps {
	completedTodos: TimerTodoType[];
	ongoingTodos: TimerTodoType[];
}

/**
 * 타이머 사이드바 컴포넌트
 */
const SideMenuTimer = ({ ongoingTodos = [], completedTodos = [] }: SideMenuTimerProps) => {
	const { todayFormattedDate, timer, isPlaying, selectedTask, isSidebarOpen, actions } = useTimerContext();

	const [completedTodoToggle, setCompletedTodoToggle] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: toggleTaskStatus } = usePostToggleTaskStatus();

	// 완료된 할일 토글 핸들러
	const handleCompletedTodoToggle = useCallback(() => {
		setCompletedTodoToggle((prev) => !prev);
	}, []);

	// 할일 클릭 핸들러 - 최적화됨
	const handleTodoClick = useCallback(
		(todo: TimerTodoType) => {
			if (selectedTask.id === todo.id) return;

			// 선택 처리 - 최적화된 selectTask 함수 사용
			actions.selectTask(todo.id, todo.elapsedTime, todo.name, todo.categoryName);
		},
		[actions, selectedTask.id],
	);

	// 홈으로 이동 핸들러
	const handleNavigateHome = useCallback(async () => {
		try {
			// 타이머가 실행 중인 경우 먼저 정지
			if (isPlaying && selectedTask.id !== null && actions.stopCurrentTimer) {
				await actions.stopCurrentTimer(selectedTask.id);
			}
			navigate('/home');
		} catch (error) {
			console.error('홈으로 이동 중 오류 발생:', error);
		}
	}, [isPlaying, selectedTask.id, actions, navigate]);

	// 홈페이지 프리로드
	const handleMouseEnter = useCallback(() => {
		import('@/pages/HomePage/HomePage').catch((error) => {
			console.error('홈페이지를 받아오는데 오류가 발생했습니다.', error);
		});
	}, []);

	// 할일 완료 상태 토글 핸들러 - 최적화됨
	const handleToggleTodoComplete = useCallback(
		(taskId: number, isOngoing: boolean) => {
			toggleTaskStatus(
				{ taskId },
				{
					onSuccess: () => {
						// 진행 중인 할일을 완료 처리했으면 완료 목록 토글 활성화
						if (isOngoing) {
							setCompletedTodoToggle(true);
						}

						// 선택된 할 일의 상태가 변경되면 타이머 정지 및 남은 할 일 중 첫번 째 할 일 선택
						if (selectedTask.id === taskId && actions.stopCurrentTimer) {
							actions.stopCurrentTimer(selectedTask.id);
							const remainingTodos = ongoingTodos.filter((todo) => todo.id !== taskId);
							if (remainingTodos.length > 0) {
								const next = remainingTodos[0];
								actions.selectTask(next.id, next.elapsedTime, next.name, next.categoryName);
							}
						}

						queryClient.invalidateQueries({
							queryKey: timerKeys.todos({ targetDate: todayFormattedDate }),
						});
					},
				},
			);
		},
		[toggleTaskStatus, todayFormattedDate, queryClient, selectedTask.id, actions, ongoingTodos],
	);

	// 할일 항목 렌더링 함수 - 최적화됨
	const renderTodoItem = useCallback(
		(todo: TimerTodoType, isOngoing: boolean) => (
			<BoxTodo
				key={todo.id}
				{...todo}
				isSelected={todo.id === selectedTask.id}
				onClick={() => handleTodoClick(todo)}
				onToggleComplete={(e) => {
					e.stopPropagation();
					handleToggleTodoComplete(todo.id, isOngoing);
				}}
				timerIncreasedTime={getTimerIncreasedTime(todo.id, todo.elapsedTime, selectedTask.id, timer)}
				undeletable={true}
				disableHoverCalendar={true}
			/>
		),
		[handleTodoClick, handleToggleTodoComplete, selectedTask.id, timer],
	);

	return (
		<div
			ref={sidebarRef}
			className={`absolute right-0 flex h-full w-[31.6rem] transform flex-col rounded-bl-[16px] rounded-tl-[16px] bg-gray-bg-03 pl-[1.8rem] transition-transform duration-300 ${
				isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			{/* 사이드바 헤더 */}
			<div className="flex h-[5.4rem] w-full items-center justify-between pl-[0.2rem] pt-[2rem]">
				<p className="text-white head-bold-24">오늘 할 일</p>
				<button
					className="rounded-[1.5rem] hover:bg-gray-bg-04"
					onClick={actions.toggleSidebar}
					aria-label="사이드바 닫기"
				>
					<BtnListIcon />
				</button>
			</div>

			{/* 할일 목록 */}
			<Spacer.Height className="overflow-auto pb-[2rem]">
				{!ongoingTodos.length && !completedTodos.length ? (
					<div className="flex h-[10rem] items-center justify-center">
						<p className="text-gray-04 detail-reg-14">오늘 할 일이 없습니다.</p>
					</div>
				) : (
					<>
						{/* 진행 중인 할일 목록 */}
						{ongoingTodos.map((todo) => renderTodoItem(todo, true))}

						{/* 완료된 할일 토글 섹션 */}
						{completedTodos.length > 0 && (
							<ButtonTodoToggle isCompleted={false} onClick={handleCompletedTodoToggle} isToggled={completedTodoToggle}>
								{completedTodos.map((todo) => renderTodoItem(todo, false))}
							</ButtonTodoToggle>
						)}
					</>
				)}
			</Spacer.Height>

			{/* 하단 버튼 영역 */}
			<div className="flex flex-col items-start gap-[1rem] pb-[2rem] pt-[4rem]">
				<ButtonRadius5.Xl color="main" onClick={handleNavigateHome} onMouseEnter={handleMouseEnter}>
					홈으로 나가기
				</ButtonRadius5.Xl>
			</div>
		</div>
	);
};

export default SideMenuTimer;
