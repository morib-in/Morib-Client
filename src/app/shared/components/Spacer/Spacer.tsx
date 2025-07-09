import { ElementType, ReactNode } from 'react';

interface SpacerProps<T extends ElementType = 'div'> {
	as?: T;
	className?: string;
	children?: ReactNode;
}

// NOTE: 남은 공간 만큼을 차지하게 하는 컴포넌트 Spacer -> overflow를 통해서 남은 넓이 만큼의 스크롤 생성 가능
const SpacerRoot = <T extends ElementType = 'div'>({ as, className, children }: SpacerProps<T>) => {
	const Component = as || 'div';
	return <Component className={`h-full min-h-0 w-full min-w-0 ${className}`}>{children}</Component>;
};

const SpacerWidth = <T extends ElementType = 'div'>({ as, className, children }: SpacerProps<T>) => {
	const Component = as || 'div';
	return <Component className={`w-full min-w-0 ${className}`}>{children}</Component>;
};

const SpacerHeight = <T extends ElementType = 'div'>({ as, className, children }: SpacerProps<T>) => {
	const Component = as || 'div';
	return <Component className={`h-full min-h-0 ${className}`}>{children}</Component>;
};

export const Spacer = Object.assign(SpacerRoot, {
	Width: SpacerWidth,
	Height: SpacerHeight,
});

export default Spacer;
