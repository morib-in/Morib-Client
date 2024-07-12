import { ReactNode } from 'react';

interface SideBoxProps {
	children: ReactNode;
}

const SideBox = ({ children }: SideBoxProps) => {
	return <div className="h-screen w-[7.4rem] bg-gray-bg-02 px-[1rem] pt-[0.6rem]">{children}</div>;
};

export default SideBox;
