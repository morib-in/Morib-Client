import { ButtonHTMLAttributes, ReactNode } from 'react';

interface CategoryBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: '할 일 추가' | '홈으로 나가기';
	children: ReactNode;
}

const ButtonSideBar = ({ variant, children, ...props }: CategoryBtnProps) => {
	const btnVariant = {
		'할 일 추가': 'text-white bg-gray-bg-04',
		'홈으로 나가기': 'text-gray-bg-01 bg-main-gra-01',
	};

	const commonStyle = ' p-[2rem] w-[36.6rem] h-[6.5rem] rounded-[5px] subhead-bold-22';

	const styledBtn = variant ? btnVariant[variant] : '';

	return (
		<button className={`${styledBtn} ${commonStyle}`} {...props}>
			{children}
		</button>
	);
};

export default ButtonSideBar;
