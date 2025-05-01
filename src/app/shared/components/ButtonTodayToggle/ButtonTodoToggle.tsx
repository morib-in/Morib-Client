import { ButtonHTMLAttributes } from 'react';

import TodoToggleIcon from '@/shared/assets/svgs/todo_toggle.svg?react';

interface ButtonTodoToggle extends ButtonHTMLAttributes<HTMLButtonElement> {
	isCompleted?: boolean;
	isToggled: boolean;
}

const ButtonTodoToggle = ({ children, isCompleted = false, isToggled, ...props }: ButtonTodoToggle) => {
	const title = isCompleted ? '할 일 목록' : '완료된 일';
	const ToggleIcon = isToggled ? <TodoToggleIcon /> : <TodoToggleIcon className="rotate-180" />;

	return (
		<>
			<button {...props} className="mt-[1.9rem] flex items-center gap-[0.4rem]">
				{ToggleIcon}
				<p className="text-white detail-semibold-14">{title}</p>
			</button>
			{isToggled && children}
		</>
	);
};

export default ButtonTodoToggle;
