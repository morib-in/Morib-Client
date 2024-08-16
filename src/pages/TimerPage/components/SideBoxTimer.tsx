import { ReactNode } from 'react';

interface SideBoxTimerProps {
	children: ReactNode;
}

const SideBoxTimer = ({ children }: SideBoxTimerProps) => {
	return <div className="h-[108rem] w-[7.4rem] bg-gray-bg-02 px-[1rem] pt-[0.6rem]">{children}</div>;
};

export default SideBoxTimer;
