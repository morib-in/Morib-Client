import { ButtonHTMLAttributes, useState } from 'react';

import TodoToggleIcon from '@/shared/assets/svgs/todo_toggle.svg?react';

interface ButtonTodoToggle extends ButtonHTMLAttributes<HTMLButtonElement> {
	isCompleted?: boolean;
	isToggled: boolean;
}

const ButtonTodoToggle = ({ children, isCompleted = false, isToggled = false }: ButtonTodoToggle) => {
	const [toggle, setToggle] = useState(isToggled);

	const title = isCompleted ? '할 일 목록' : '완료된 일';
	const ToggleIcon = toggle ? <TodoToggleIcon className="rotate-180" /> : <TodoToggleIcon />;

	const handleToggle = () => {
		setToggle((prev) => !prev);
	};

	return (
		<>
			<button className="mt-[1.9rem] flex items-center gap-[0.4rem]" onClick={handleToggle}>
				{ToggleIcon}
				<p className="detail-semibold-14 text-white">{title}</p>
			</button>
			{toggle && children}
		</>
	);
};

export default ButtonTodoToggle;
