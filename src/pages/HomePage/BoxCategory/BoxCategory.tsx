import dayjs, { Dayjs } from 'dayjs';

import { type KeyboardEvent, type MouseEvent, Suspense, lazy, useRef, useState } from 'react';

import BoxTodo from '@/shared/components/BoxTodo/BoxTodo';
import ButtonTodoToggle from '@/shared/components/ButtonTodayToggle/ButtonTodoToggle';
import Dropdown from '@/shared/components/Dropdown/Dropdown';
import Spacer from '@/shared/components/Spacer/Spacer';

import useClickOutside from '@/shared/hooks/useClickOutside';

import type { TaskListType, TaskType } from '@/shared/types/tasks';

import MeatballDefaultIcon from '@/shared/assets/svgs/common/ic_meatball_default.svg?react';
import PlusIcon from '@/shared/assets/svgs/home/ic_plus.svg?react';
import PopoverAddTodoIcon from '@/shared/assets/svgs/popover_add_todo.svg?react';

import { usePostToggleTaskStatus } from '@/shared/apisV2/common/common.mutations';
import { usePatchTask, usePostCreateTask } from '@/shared/apisV2/home/home.mutations';

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
	onPatchCategory: (categoryId: number, newName: string) => void;
	isSelectedTodoExist?: boolean;
	selectedDate: Dayjs;
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
	onPatchCategory,
	selectedDate,
}: BoxCategoryProps) => {
	const { mutate, isError, error } = usePostCreateTask();
	const [ongoingTodoToggle, setOngoingTodoToggle] = useState(true);
	const [completedTodoToggle, setCompletedTodoToggle] = useState(false);
	const [isCategoryEditing, setIsCategoryEditing] = useState(false);
	const [editedCategoryName, setEditedCategoryName] = useState(title);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

	const [calendarStartDate, setCalendarStartDate] = useState<Dayjs | null>(selectedDate);
	const [calendarEndDate, setCalendarEndDate] = useState<Dayjs | null>(null);
	const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
	const boxCategoryRef = useRef<HTMLDivElement>(null);

	const { mutate: patchTask } = usePatchTask();

	const {
		isPeriodOn,
		selectedEndDate,
		isCalendarOpened,
		defaultDate,
		handlePeriodToggle,
		handleEndDateInput,
		handlePeriodEnd,
	} = useCalendar();

	const CALENDAR_ESTIMATED_HEIGHT = 389;
	const CALENDAR_TOP_OFFSET = 4;

	const getTargetTaskById = (taskId: number) => {
		return ongoingTodos.find((task) => task.id === taskId) || completedTodos.find((task) => task.id === taskId);
	};

	const handleOpenTaskCalendar = (taskId: number, e: MouseEvent<HTMLButtonElement>) => {
		const targetTask = getTargetTaskById(taskId);

		if (targetTask) {
			setCalendarStartDate(dayjs(targetTask.startDate));
			setCalendarEndDate(targetTask.endDate ? dayjs(targetTask.endDate) : null);

			if (targetTask.endDate) {
				if (!isPeriodOn) handlePeriodToggle();
			} else {
				handlePeriodEnd();
			}
		}
		const buttonRect = e.currentTarget.getBoundingClientRect();
		const containerRect = boxCategoryRef.current?.getBoundingClientRect();

		let top = buttonRect.top;
		const left = buttonRect.right;

		if (containerRect) {
			const maxTop = containerRect.bottom - CALENDAR_ESTIMATED_HEIGHT;
			const minTop = containerRect.top;
			top = Math.max(minTop, Math.min(buttonRect.top, maxTop)) + CALENDAR_TOP_OFFSET;
		}

		setCalendarPosition({ top, left });

		setSelectedTaskId(taskId);
		setIsCalendarOpen(true);
	};

	const handleCloseCalendar = () => {
		if (selectedTaskId) {
			const targetTask = getTargetTaskById(selectedTaskId);
			if (targetTask) {
				const newStartDate = calendarStartDate ? (format(calendarStartDate) as string) : targetTask.startDate;
				const newEndDate =
					isPeriodOn && calendarStartDate && calendarEndDate ? (format(calendarEndDate) as string) : null;

				patchTask({
					taskId: selectedTaskId,
					name: targetTask.name,
					startDate: newStartDate,
					endDate: newEndDate,
				});
			}
		}

		setIsCalendarOpen(false);
		setSelectedTaskId(null);
		handlePeriodEnd();
	};

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

	const handleCreatePost = () => {
		const dataToPost = {
			categoryId: id,
			name: name,
			startDate: format(selectedDate) as string,
			endDate: format(selectedEndDate),
		};
		if (name.length > 0) {
			mutate(dataToPost);
		}

		setName('');
		setIsAdding(false);
		handleEndDateInput(null);

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

	const handlePatchTask = (taskId: number, name: string, startDate: string, endDate: string | null) => {
		patchTask({ taskId, name, startDate, endDate });
	};

	const handleCalendarKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter' && isCalendarOpened) {
			handleCreatePost();
			e.preventDefault();
		}
	};

	const handleStartEditing = () => {
		setIsCategoryEditing(true);
	};

	const handleFinishEditing = () => {
		if (editedCategoryName.trim() && editedCategoryName !== title) {
			onPatchCategory(id, editedCategoryName);
		}
		setIsCategoryEditing(false);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleFinishEditing();
		}
	};

	return (
		<Spacer.Height
			as="article"
			className="relative flex w-[31.6rem] flex-shrink-0 flex-col rounded-[16px] bg-gray-bg-03 p-[1.8rem]"
		>
			<div ref={boxCategoryRef} className="h-full w-full">
				<div className="mt-[0.4rem] flex items-center justify-between">
					{isCategoryEditing ? (
						<input
							autoFocus
							className="w-full rounded-md bg-gray-bg-04 bg-transparent text-white subhead-semibold-18 focus:outline-none"
							value={editedCategoryName}
							onChange={(e) => setEditedCategoryName(e.target.value)}
							onBlur={handleFinishEditing}
							onKeyDown={handleKeyDown}
						/>
					) : (
						<h2
							className={`truncate text-white subhead-semibold-18 ${addingTodayTodoStatus ? 'pointer-events-none' : ''}`}
							onClick={handleStartEditing}
						>
							{title}
						</h2>
					)}
					<div className="relative flex items-center gap-[1rem]">
						{ongoingTodos.length === 0 && !isAdding && (
							<button className="absolute right-[0rem] top-[3rem]">
								<PopoverAddTodoIcon />
							</button>
						)}
						<button
							onMouseEnter={handleMouseEnter}
							onClick={startAddingTodo}
							className={`rounded-full ${addingTodayTodoStatus ? 'pointer-events-none' : 'hover:bg-gray-bg-04 active:bg-gray-bg-05'}`}
						>
							<PlusIcon />
						</button>
						<Dropdown>
							<Dropdown.Trigger className={addingTodayTodoStatus ? 'pointer-events-none' : ''}>
								<MeatballDefaultIcon className="rounded-full hover:bg-gray-bg-04 active:bg-gray-bg-05" />
							</Dropdown.Trigger>
							<Dropdown.Content className="right-0 top-[3.2rem]">
								<Dropdown.Item label="카테고리 이름 수정" onClick={handleStartEditing} />
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
								{isAdding && !isCalendarOpen && (
									<BoxTodoInput
										ref={todoRef}
										editable={editable}
										onEditComplete={() => {
											handleEditComplete();
											handleCreatePost();
										}}
										name={name}
										onInputChange={handleInputChange}
										selectedStartDate={selectedDate}
										selectedEndDate={selectedEndDate}
									/>
								)}

								{ongoingTodos.map(({ id, name, startDate, endDate, elapsedTime }) => {
									const todo = { id, name, startDate, endDate, elapsedTime };
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
											handleCalendarToggle={(e: MouseEvent<HTMLButtonElement>) => handleOpenTaskCalendar(id, e)}
											onPatchTask={handlePatchTask}
											activeCalendarTask={isCalendarOpen && selectedTaskId === id}
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
											handleCalendarToggle={(e: MouseEvent<HTMLButtonElement>) => handleOpenTaskCalendar(id, e)}
										/>
									))}
								</ButtonTodoToggle>
							)}
						</Spacer.Height>
					</Spacer.Height>
				)}
			</div>

			{isCalendarOpen && (
				<Suspense fallback={<div>Loading...</div>}>
					<div
						className="fixed z-10"
						style={{ top: calendarPosition.top, left: calendarPosition.left }}
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
							selectedStartDate={isPeriodOn ? calendarStartDate : calendarStartDate ?? defaultDate}
							selectedEndDate={calendarEndDate}
							onStartDateInput={(newDate) => {
								setCalendarStartDate(newDate);
								if (isPeriodOn) setCalendarEndDate(null);
							}}
							onEndDateInput={(newEndDate) => {
								setCalendarEndDate(newEndDate);
							}}
							isCalendarOpened={isCalendarOpened}
							onPeriodToggle={handlePeriodToggle}
							clickOutSideCallback={handleCloseCalendar}
						/>
					</div>
				</Suspense>
			)}
		</Spacer.Height>
	);
};

export default BoxCategory;
