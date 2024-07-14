import { ReactNode } from 'react';

interface TimerPageTemplatesProps {
	children: ReactNode;
}

const TimerPageTemplates = ({ children }: TimerPageTemplatesProps) => {
	return <div className="flex h-[108rem] w-[192rem] bg-gray-bg-01">{children}</div>;
};

export default TimerPageTemplates;
