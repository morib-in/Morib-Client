import { ButtonHTMLAttributes, ReactNode } from 'react';

interface CategoryBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: '취소' | '완료';
	children: ReactNode;
}

const ButtonCategoryCommon = ({ disabled, variant, children, onClick, ...props }: CategoryBtnProps) => {
	const btnVariant = {
		취소: 'text-white bg-gray-bg-06 hover:bg-gray-bg-04 active:bg-gray-bg-05',
		완료: 'text-gray-bg-01 bg-mint-02 hover:bg-mint-02-hover active:bg-mint-02-press',
	};
	const disabledBtn = 'bg-gray-bg-05 text-gray-04';

	const commonStyle = ' px-[4.8rem] py-[1rem] rounded-[5px] subhead-semibold-18';

	const styledBtn = disabled ? disabledBtn : variant ? btnVariant[variant] : '';

	return (
		<button className={`${styledBtn} ${commonStyle}`} disabled={disabled} {...props} onClick={onClick}>
			{children}
		</button>
	);
};

export default ButtonCategoryCommon;
