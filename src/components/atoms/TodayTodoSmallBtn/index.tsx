import { ButtonHTMLAttributes } from 'react';

const TodayTodoSmallBtn = ({ children, disabled = false, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
	const defaultStyle = 'subhead-bold-20 flex items-center justify-center rounded-[0.8rem] px-[3.6rem] py-[2rem] ';
	const buttonStyle = disabled ? 'bg-gray-bg-06 text-gray-04 ' : 'bg-gray-bg-05 text-white ';

	return (
		<button className={defaultStyle + buttonStyle} disabled={disabled} {...props}>
			{children}
		</button>
	);
};

export default TodayTodoSmallBtn;
