import { ReactNode } from 'react';

interface OptionsBtnProps {
	children: ReactNode;
}

const DropdownOptionsBtn = ({ children }: OptionsBtnProps) => {
	return (
		<button className="subhead-med-18 flex h-[4.6rem] w-full flex-row items-center border-none bg-gray-bg-05 px-[2rem] py-[1rem] text-gray-05 hover:bg-gray-bg-06 hover:text-white">
			{children}
		</button>
	);
};

export default DropdownOptionsBtn;
