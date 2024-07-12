import React from 'react';

import FriendInfoCarousel from '@/components/molecules/FriendInfoCarousel';
import Timer from '@/components/molecules/Timer';
import TimerSideBox from '@/components/molecules/TimerSIdeBox';
import TimerSideBar from '@/components/molecules/TimerSideBar';
import TimerTitle from '@/components/molecules/TimerTitle';
import TimerPageTemplates from '@/components/templates/TimerPageTemplates';

import useAnimateSidebar from '@/hooks/useAnimaterSideBar';
import useToggleSidebar from '@/hooks/useToggleSideBar';

import HamburgerIcon from '@/assets/svgs/btn_hamburger.svg?react';

const TimerPage: React.FC = () => {
	const { isSidebarOpen, toggleSidebar } = useToggleSidebar();
	const animate = useAnimateSidebar(isSidebarOpen);

	return (
		<TimerPageTemplates>
			<div>
				<div className="flex h-[108rem] w-[192rem] bg-[url('@/assets/images/img_timer_bg.png')]">
					<TimerSideBox />
					<div className="ml-[54.5rem] mt-[-0.8rem]">
						<TimerTitle />
						<Timer />
						<FriendInfoCarousel />
					</div>
					<button
						onClick={toggleSidebar}
						className="absolute right-0 top-0 mr-[3.4rem] mt-[3.2rem] rounded-[1.5rem] hover:bg-gray-bg-04"
					>
						<HamburgerIcon />
					</button>
				</div>
				{isSidebarOpen && (
					<div
						className={`fixed inset-0 flex justify-end bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${animate ? 'opacity-100' : 'opacity-0'}`}
					>
						<TimerSideBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
					</div>
				)}
			</div>
		</TimerPageTemplates>
	);
};

export default TimerPage;
