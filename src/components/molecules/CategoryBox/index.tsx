import SVGBtn from '@/components/atoms/SVGBtn';
import TodoBox from '@/components/atoms/TodoBox';
import TodoToggleBtn from '@/components/atoms/TodoToggleBtn';

import { TodoDataTypes } from '@/types/userData';

import ButtonAddIcon from '@/assets/svgs/btn_task_add.svg?react';
import MeatBallDefault from '@/assets/svgs/todo_meatball_default.svg?react';

import { todoData } from '@/mocks/homeData';

interface CategoryBoxProps {
	title: string;
	completedTodos?: TodoDataTypes[];
	ongoingTodos?: TodoDataTypes[];
}

const CategoryBox = ({ title, ongoingTodos = todoData, completedTodos = todoData }: CategoryBoxProps) => {
	return (
		<div className="flex h-[73.2rem] w-[40.2rem] flex-col rounded-[16px] bg-gray-bg-03 px-[1.8rem] pt-[1.8rem]">
			<div className="mt-[0.4rem] flex items-center justify-between">
				<h2 className="head-bold-24 text-white">{title}</h2>
				<div className="flex gap-[0.1rem]">
					<SVGBtn>
						<ButtonAddIcon />
					</SVGBtn>
					<SVGBtn>
						<MeatBallDefault />
					</SVGBtn>
				</div>
			</div>
			<div className="overflow-auto">
				<TodoToggleBtn isCompleted={false} isToggled={true}>
					{ongoingTodos.map(({ id, title, date, accumulatedTime }) => (
						<TodoBox key={id} title={title} date={date} accumulatedTime={accumulatedTime} isCompleted={false} />
					))}
				</TodoToggleBtn>
				<TodoToggleBtn isCompleted={true} isToggled={false}>
					{completedTodos.map(({ id, title, date, accumulatedTime }) => (
						<TodoBox key={id} title={title} date={date} accumulatedTime={accumulatedTime} isCompleted={true} />
					))}
				</TodoToggleBtn>
			</div>
		</div>
	);
};

export default CategoryBox;
