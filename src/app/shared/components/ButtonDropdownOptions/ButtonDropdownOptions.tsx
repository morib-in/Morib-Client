import { ButtonHTMLAttributes, ReactNode } from 'react';

interface OptionsBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const DropdownOptionsBtn = ({ children, ...props }: OptionsBtnProps) => {
	return (
		<button
			type="button"
			{...props}
			className="flex h-full w-full flex-row items-center border-none bg-gray-bg-05 px-[2rem] py-[1rem] text-gray-05 subhead-med-18 hover:bg-gray-bg-06 hover:text-white"
		>
			{children}
		</button>
	);
};

export default DropdownOptionsBtn;
