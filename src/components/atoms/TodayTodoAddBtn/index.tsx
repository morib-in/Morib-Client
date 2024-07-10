import { ButtonHTMLAttributes } from 'react';

const TodayTodoAddBtn = ({ disabled = true, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
	const defaultStyle = 'subhead-bold-20 flex items-center justify-center rounded-[0.8rem] px-[4rem] py-[1.4rem] ';
	const buttonStyle = disabled ? 'bg-gray-bg-05 text-gray-04' : 'bg-main-gra-01 text-gray-01';

	return (
		<button className={defaultStyle + buttonStyle} disabled={disabled} {...props}>
			오늘의 할 일 추가
		</button>
	);
};

export default TodayTodoAddBtn;
