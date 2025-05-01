import { ReactNode } from 'react';

interface AutoFixedGridRootProps {
	type: 'onboarding' | 'home' | 'allowedService' | 'layout';
	children: ReactNode;
	className?: string;
}

const AutoFixedGridRoot = ({ type, children, className }: AutoFixedGridRootProps) => {
	// NOTE: tailwind에서 빌드 타임에 동적 스타일 클래스를 인식하지 못하기 때문에 이미 정의된 클래스를 사용해야함
	const gridType = {
		layout: 'grid-cols-[7.4rem,1fr]',
		onboarding: 'grid-cols-[1fr,42rem]',
		home: 'grid-cols-[1fr,31.6rem]',
		allowedService: 'grid-cols-[31.6rem,1fr]',
	};

	return <div className={`relative grid h-screen w-full ${gridType[type]} ${className}`}>{children}</div>;
};

interface SlotProps {
	children: ReactNode;
	className?: string;
}

const Slot = ({ children, className }: SlotProps) => {
	return <div className={className}>{children}</div>;
};

export const AutoFixedGrid = Object.assign(AutoFixedGridRoot, { Slot });

export default AutoFixedGrid;
