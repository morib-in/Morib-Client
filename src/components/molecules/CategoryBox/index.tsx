import { useRef } from 'react';

import SVGBtn from '@/components/atoms/SVGBtn';
import TodoBox from '@/components/atoms/TodoBox';
import TodoInputBox from '@/components/atoms/TodoInputBox';
import TodoToggleBtn from '@/components/atoms/TodoToggleBtn';

import { useCalendar } from '@/hooks/useCalendar';
import useClickOutside from '@/hooks/useClickOutside';
import { useCreateTodo } from '@/hooks/useCreateTodo';

import { usePatchTaskStatus } from '@/apis/common/queries';
import { usePostCreateTask } from '@/apis/home/queries';

import { Task } from '@/types/home';

import ButtonAddIcon from '@/assets/svgs/btn_task_add.svg?react';
import MeatBallDefault from '@/assets/svgs/todo_meatball_default.svg?react';

import CalendarTemporary from '../CalendarTemporary';
import CategoryBoxDefaultStatus from './CategoryBoxDefaultStatus';

interface CategoryBoxProps {
	id: number;
	title: string;
	completedTodos: Task[];
	ongoingTodos: Task[];
	updateTodayTodos: (todo: Omit<Task, 'isComplete'>) => void;
	addingTodayTodoStatus: boolean;
	getSelectedNumber: (id: number) => number;
	addingComplete: boolean;
}

const format = (date: Date | null) => {
	if (!date) return null;
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const CategoryBox = ({
	id,
	title,
	ongoingTodos = [],
	completedTodos = [],
	updateTodayTodos,
	addingTodayTodoStatus,
	getSelectedNumber,
	addingComplete,
}: CategoryBoxProps) => {
	const { mutate, isError, error } = usePostCreateTask();

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

	const handleCreatePost = () => {
		const dataToPost = {
			categoryId: id,
			taskData: {
				name: name,
				startDate: format(selectedStartDate) as string,
				endDate: format(selectedEndDate),
			},
		};
		mutate(dataToPost);

		setName('');
		setIsAdding(false);
	};

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
	} = useCalendar();

	const { mutate: toggleTodoStatus } = usePatchTaskStatus();

	if (isError) {
		console.error(error);
	}

	return (
		<div className="flex h-[73.2rem] w-[40.2rem] flex-shrink-0 flex-col rounded-[16px] bg-gray-bg-03 px-[1.8rem] pt-[1.8rem]">
			<div className="mt-[0.4rem] flex items-center justify-between">
				<h2 className="head-bold-24 text-white">{title}</h2>
				<div className="flex gap-[0.1rem]">
					<SVGBtn onClick={startAddingTodo} className="rounded-full hover:bg-gray-bg-04 active:bg-gray-bg-05">
						<ButtonAddIcon />
					</SVGBtn>
					<SVGBtn>
						<MeatBallDefault className="rounded-full hover:bg-gray-bg-04 active:bg-gray-bg-05" />
					</SVGBtn>
				</div>
			</div>
			{ongoingTodos.length === 0 && completedTodos.length === 0 && isAdding === false ? (
				<CategoryBoxDefaultStatus />
			) : (
				<div className="relative">
					<div className="h-[67.4rem] overflow-y-auto">
						<TodoToggleBtn isCompleted isToggled={true}>
							{isAdding && (
								<>
									<TodoInputBox
										ref={todoRef}
										editable={editable}
										onEditComplte={handleEditComplete}
										name={name}
										onInputChange={handleInputChange}
										selectedStartDate={selectedStartDate}
										selectedEndDate={selectedEndDate}
									/>

									{!editable && (
										<div className="absolute left-[7.25rem] top-[9.5rem]">
											<CalendarTemporary
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
									)}
								</>
							)}

							{ongoingTodos.map(({ id, name, startDate, endDate, targetTime }) => {
								const todo = {
									id: id,
									name: name,
									startDate: startDate,
									endDate: endDate,
									targetTime: targetTime,
								};

								const selectedNumber = getSelectedNumber(id);

								return (
									<TodoBox
										id={id}
										key={id}
										name={name}
										startDate={startDate}
										endDate={endDate}
										targetTime={targetTime}
										isSelected={!!selectedNumber}
										selectedNumber={selectedNumber}
										onToggleComplete={() => toggleTodoStatus(id)}
										updateTodayTodos={() => updateTodayTodos(todo)}
										clickable={addingTodayTodoStatus}
										addingComplete={addingComplete}
									/>
								);
							})}
						</TodoToggleBtn>

						{completedTodos.length !== 0 && (
							<TodoToggleBtn isToggled={false}>
								{completedTodos.map(({ id, name, startDate, endDate, targetTime }) => (
									<TodoBox
										id={id}
										key={id}
										isComplete
										name={name}
										startDate={startDate}
										endDate={endDate}
										targetTime={targetTime}
										onToggleComplete={() => toggleTodoStatus(id)}
										clickable={false}
									/>
								))}
							</TodoToggleBtn>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default CategoryBox;
