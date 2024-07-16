import SVGBtn from '@/components/atoms/SVGBtn';
import TodoBox from '@/components/atoms/TodoBox';
import TodoToggleBtn from '@/components/atoms/TodoToggleBtn';

import { Task } from '@/types/home';

import ButtonAddIcon from '@/assets/svgs/btn_task_add.svg?react';
import MeatBallDefault from '@/assets/svgs/todo_meatball_default.svg?react';

import CategoryBoxDefaultStatus from './CategoryBoxDefaultStatus';

interface CategoryBoxProps {
	title: string;
	completedTodos: Task[];
	ongoingTodos: Task[];
}

const CategoryBox = ({ title, ongoingTodos = [], completedTodos = [] }: CategoryBoxProps) => {
	return (
		<div className="flex h-[73.2rem] w-[40.2rem] flex-shrink-0 flex-col rounded-[16px] bg-gray-bg-03 px-[1.8rem] pt-[1.8rem]">
			<div className="mt-[0.4rem] flex items-center justify-between">
				<h2 className="head-bold-24 text-white">{title}</h2>
				<div className="flex gap-[0.1rem]">
					<SVGBtn className="rounded-full hover:bg-gray-bg-04 active:bg-gray-bg-05">
						<ButtonAddIcon />
					</SVGBtn>
					<SVGBtn>
						<MeatBallDefault className="rounded-full hover:bg-gray-bg-04 active:bg-gray-bg-05" />
					</SVGBtn>
				</div>
			</div>
			{ongoingTodos.length === 0 && completedTodos.length === 0 ? (
				<CategoryBoxDefaultStatus />
			) : (
				<div className="overflow-auto">
					<TodoToggleBtn isCompleted isToggled={true}>
						{ongoingTodos.map(({ id, name, startDate, endDate, targetTime }) => (
							<TodoBox key={id} name={name} startDate={startDate} endDate={endDate} targetTime={targetTime} />
						))}
					</TodoToggleBtn>
					{completedTodos.length !== 0 && (
						<TodoToggleBtn isToggled={false}>
							{completedTodos.map(({ id, name, startDate, endDate, targetTime }) => (
								<TodoBox
									key={id}
									isComplete
									name={name}
									startDate={startDate}
									endDate={endDate}
									targetTime={targetTime}
								/>
							))}
						</TodoToggleBtn>
					)}
				</div>
			)}
		</div>
	);
};

export default CategoryBox;
