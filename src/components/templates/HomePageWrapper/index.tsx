import { ReactNode } from 'react';

interface HomePageWrapper {
	children: ReactNode;
}

const HomePageWrapper = ({ children }: HomePageWrapper) => {
	return <div className="flex h-[1080px] w-[1920px] bg-gray-bg-01">{children}</div>;
};

export default HomePageWrapper;
