import { ButtonHTMLAttributes, useState } from 'react';

import TodoToggleIcon from '@/assets/svgs/todo_toggle.svg?react';

interface TodoToggleBtn extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
	isToggled: boolean;
}

const TodoToggleBtn = ({ title, children }: TodoToggleBtn) => {
	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle((prev) => !prev);
	};

	return (
		<>
			{toggle ? (
				<>
					<button className="flex items-center gap-[0.4rem]" onClick={handleToggle}>
						<TodoToggleIcon className="rotate-180" />
						<p className="detail-semibold-14 text-white">{title}</p>
					</button>
					{children}
				</>
			) : (
				<button className="flex items-center gap-[0.4rem]" onClick={handleToggle}>
					<TodoToggleIcon />
					<p className="detail-semibold-14 text-white">{title}</p>
				</button>
			)}
		</>
	);
};

export default TodoToggleBtn;
