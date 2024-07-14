import { ReactNode } from 'react';

interface HomeSideBoxProps {
	children: ReactNode;
}

const HomeSideBox = ({ children }: HomeSideBoxProps) => {
	return (
		<div className="flex h-full w-[7.4rem] flex-col items-center justify-between bg-gray-bg-02 pb-[2.1rem] pt-[5.4rem]">
			{children}
		</div>
	);
};

export default HomeSideBox;
