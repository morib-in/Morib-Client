import { Dayjs } from 'dayjs';

import { KeyboardEvent, Suspense, lazy, useRef, useState } from 'react';

import BoxTodo from '@/shared/components/BoxTodo/BoxTodo';
import ButtonTodoToggle from '@/shared/components/ButtonTodayToggle/ButtonTodoToggle';
import Dropdown from '@/shared/components/Dropdown/Dropdown';
import Spacer from '@/shared/components/Spacer/Spacer';

import useClickOutside from '@/shared/hooks/useClickOutside';

import type { TaskListType, TaskType } from '@/shared/types/tasks';

import MeatballDefaultIcon from '@/shared/assets/svgs/common/ic_meatball_default.svg?react';
import PlusIcon from '@/shared/assets/svgs/home/ic_plus.svg?react';

import { usePostToggleTaskStatus } from '@/shared/apisV2/common/common.mutations';
import { usePostCreateTask } from '@/shared/apisV2/home/home.mutations';

import { useCalendar } from '../hooks/useCalendar';
import BoxTodoInput from './BoxTodoInput/BoxTodoInput';
import StatusDefaultBoxCategory from './StatusDefaultBoxCategory/StatusDefaultBoxCategory';
import { useCreateTodo } from './hooks/useCreateTodo';

const Calendar = lazy(() => import('@/shared/components/Calendar/Calendar'));

interface BoxCategoryProps {
	id: number;
	title: string;
	completedTodos: TaskListType;
	ongoingTodos: TaskListType;
	updateTodayTodos: (todo: Omit<TaskType, 'isComplete'>) => void;
	addingTodayTodoStatus: boolean;
	getSelectedNumber: (id: number) => number;
	addingComplete: boolean;
	onDeleteCategory: (categoryId: number) => void;
	isSelectedTodoExist?: boolean;
}

const format = (date: Dayjs | null) => {
	if (!date) return null;
	const year = date.year();
	const month = String(date.month() + 1).padStart(2, '0');
	const day = String(date.date()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const BoxCategory = ({
	id,
	title,
	ongoingTodos = [],
	completedTodos = [],
	updateTodayTodos,
	addingTodayTodoStatus,
	getSelectedNumber,
	addingComplete,
	onDeleteCategory,
	isSelectedTodoExist,
}: BoxCategoryProps) => {
	const { mutate, isError, error } = usePostCreateTask();
	const [ongoingTodoToggle, setOngoingTodoToggle] = useState(true);
	const [completedTodoToggle, setCompletedTodoToggle] = useState(false);

	const handleOngoingTodoToggle = () => {
		setOngoingTodoToggle((prev) => !prev);
	};

	const handleCompletedTodoToggle = () => {
		setCompletedTodoToggle((prev) => !prev);
	};

	const {
		name,
		isAdding,
		editable,
		handleEditComplete,
		handleInputChange,
		startAddingTodo,
		cancelAddingTodo,
		setName,
		setIsAdding,
	} = useCreateTodo();

	const todoRef = useRef<HTMLDivElement>(null);
	useClickOutside(todoRef, cancelAddingTodo, isAdding && editable);

	const {
		isPeriodOn,
		selectedStartDate,
		selectedEndDate,
		isCalendarOpened,
		defaultDate,
		handlePeriodToggle,
		handleStartDateInput,
		handleEndDateInput,
		handlePeriodEnd,
	} = useCalendar();

	const handleCreatePost = () => {
		const dataToPost = {
			categoryId: id,
			name: name,
			startDate: format(selectedStartDate) as string,
			endDate: format(selectedEndDate),
		};
		mutate(dataToPost);

		setName('');
		setIsAdding(false);

		handlePeriodEnd();
	};

	const { mutate: toggleTodoStatus } = usePostToggleTaskStatus();

	if (isError) {
		console.error(error);
	}

	const handleMouseEnter = () => {
		import('@/shared/components/Calendar/Calendar').catch((error) => {
			console.error('캘린더를 받아오는데 오류가 발생했습니다.', error);
		});
	};

	const handleCalendarKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter' && isCalendarOpened) {
			handleCreatePost();
			e.preventDefault();
		}
	};

	return (
		<Spacer.Height
			as="article"
			className="flex w-[31.6rem] flex-shrink-0 flex-col rounded-[16px] bg-gray-bg-03 p-[1.8rem]"
		>
			<div className="mt-[0.4rem] flex items-center justify-between">
				<h2 className="text-white subhead-semibold-18">{title}</h2>
				<div className="flex items-center gap-[1rem]">
					<button
						onMouseEnter={handleMouseEnter}
						onClick={startAddingTodo}
						className="rounded-full hover:bg-gray-bg-04 active:bg-gray-bg-05"
					>
						<PlusIcon />
					</button>
					<Dropdown>
						<Dropdown.Trigger>
							<MeatballDefaultIcon className="rounded-full hover:bg-gray-bg-04 active:bg-gray-bg-05" />
						</Dropdown.Trigger>
						<Dropdown.Content className="top-[3.2rem]">
							<Dropdown.Item label="카테고리 이름 수정" />
							<Dropdown.Item label="카테고리 삭제" textColor="red" onClick={() => onDeleteCategory(id)} />
						</Dropdown.Content>
					</Dropdown>
				</div>
			</div>

			{ongoingTodos.length === 0 && completedTodos.length === 0 && isAdding === false ? (
				<StatusDefaultBoxCategory />
			) : (
				<Spacer.Height className="relative flex">
					<Spacer.Height className="flex flex-col overflow-y-auto">
						<ButtonTodoToggle isCompleted onClick={handleOngoingTodoToggle} isToggled={ongoingTodoToggle}>
							{isAdding && (
								<>
									<BoxTodoInput
										ref={todoRef}
										editable={editable}
										onEditComplete={handleEditComplete}
										name={name}
										onInputChange={handleInputChange}
										selectedStartDate={selectedStartDate}
										selectedEndDate={selectedEndDate}
									/>

									{!editable && (
										<Suspense fallback={<div>Loading...</div>}>
											<div
												className="absolute left-[7.25rem] top-[9.5rem]"
												tabIndex={0}
												ref={(node) => {
													if (node) {
														node.focus();
													}
												}}
												onKeyDown={handleCalendarKeyDown}
											>
												<Calendar
													isPeriodOn={isPeriodOn}
													selectedStartDate={selectedStartDate ?? defaultDate}
													selectedEndDate={selectedEndDate ?? null}
													onStartDateInput={handleStartDateInput}
													onEndDateInput={handleEndDateInput}
													isCalendarOpened={isCalendarOpened}
													onPeriodToggle={handlePeriodToggle}
													clickOutSideCallback={handleCreatePost}
												/>
											</div>
										</Suspense>
									)}
								</>
							)}

							{ongoingTodos.map(({ id, name, startDate, endDate, elapsedTime }) => {
								const todo = {
									id: id,
									name: name,
									startDate: startDate,
									endDate: endDate,
									elapsedTime: elapsedTime,
								};

								const selectedNumber = getSelectedNumber(id);

								return (
									<BoxTodo
										id={id}
										key={id}
										name={name}
										startDate={startDate}
										endDate={endDate}
										elapsedTime={elapsedTime}
										isSelected={!!selectedNumber}
										selectedNumber={selectedNumber}
										onToggleComplete={() =>
											toggleTodoStatus(
												{ taskId: id },
												{
													onSuccess: () => {
														setCompletedTodoToggle(true);
													},
												},
											)
										}
										updateTodayTodos={() => updateTodayTodos(todo)}
										clickable={addingTodayTodoStatus}
										addingComplete={addingComplete}
										isSelectedTodoExist={isSelectedTodoExist}
									/>
								);
							})}
						</ButtonTodoToggle>

						{completedTodos.length !== 0 && (
							<ButtonTodoToggle onClick={handleCompletedTodoToggle} isToggled={completedTodoToggle}>
								{completedTodos.map(({ id, name, startDate, endDate, elapsedTime }) => (
									<BoxTodo
										id={id}
										key={id}
										isComplete
										name={name}
										startDate={startDate}
										endDate={endDate}
										elapsedTime={elapsedTime}
										onToggleComplete={() => {
											toggleTodoStatus({ taskId: id });
										}}
										clickable={addingTodayTodoStatus}
										addingComplete={addingComplete}
										isSelectedTodoExist={isSelectedTodoExist}
									/>
								))}
							</ButtonTodoToggle>
						)}
					</Spacer.Height>
				</Spacer.Height>
			)}
		</Spacer.Height>
	);
};

export default BoxCategory;
