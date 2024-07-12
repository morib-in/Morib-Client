import FriendInfoCarousel from '@/components/molecules/FriendInfoCarousel';
import Timer from '@/components/molecules/Timer';
import TimerSideBox from '@/components/molecules/TimerSIdeBox';
import TimerSideBar from '@/components/molecules/TimerSideBar';
import TimerTitle from '@/components/molecules/TimerTitle';

import useToggleSidebar from '@/hooks/useToggleSideBar';

import HamburgerIcon from '@/assets/svgs/btn_hamburger.svg?react';

const TimerPage = () => {
	const { isSidebarOpen, toggleSidebar } = useToggleSidebar();

	return (
		<div className="flex bg-gray-bg-01">
			<TimerSideBox />
			<div className="relative flex-grow px-[58rem]">
				<TimerTitle />
				<Timer />
				<FriendInfoCarousel />
				<button
					onClick={toggleSidebar}
					className="absolute right-0 top-0 mr-[3.4rem] mt-[3.2rem] rounded-[1.5rem] hover:bg-gray-bg-04"
				>
					<HamburgerIcon />
				</button>
			</div>
			{isSidebarOpen && (
				<div className="fixed inset-0 flex justify-end bg-black bg-opacity-50">
					<TimerSideBar toggleSidebar={toggleSidebar} />
				</div>
			)}
		</div>
	);
};

export default TimerPage;
