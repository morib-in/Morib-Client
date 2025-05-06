import React from 'react';

/**
 * 타이머 헤더 컴포넌트 props 타입 정의
 */
interface TimerHeaderProps {
	selectedTaskName: string;
	selectedTaskCategoryName: string;
	hasSelectedTask: boolean;
	isCompleted?: boolean;
}

/**
 * 타이머 헤더 컴포넌트
 *
 * 선택된 할일의 이름과 카테고리를 표시하거나, 할일이 선택되지 않은 경우 안내 메시지를 표시.
 */
const TimerHeader = ({
	selectedTaskName,
	selectedTaskCategoryName,
	hasSelectedTask,
	isCompleted = false,
}: TimerHeaderProps) => {
	if (!hasSelectedTask) {
		return (
			<header className="flex flex-col items-center gap-[0.4rem]">
				<h1 className="text-gray-04 title-semibold-48">할일을 선택해주세요</h1>
			</header>
		);
	}

	const completedStyle = isCompleted ? 'line-through' : '';

	return (
		<header className="flex flex-col items-center gap-[0.4rem]">
			<h1 className={`w-[120rem] truncate text-center text-white title-semibold-48 ${completedStyle}`}>
				{selectedTaskName}
			</h1>
			<h2 className={`w-[80rem] truncate text-center text-gray-04 head-bold-30 ${completedStyle}`}>
				{selectedTaskCategoryName}
			</h2>
		</header>
	);
};

export default TimerHeader;
