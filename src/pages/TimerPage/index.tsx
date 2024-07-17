import AddCategoryModal from '@/pages/HomePage/AddCategoryModal';

import FriendInfoCarousel from '@/components/molecules/FriendInfoCarousel';
import Timer from '@/components/molecules/Timer';
import TimerSideBar from '@/components/molecules/TimerSideBar';
import TimerSideBox from '@/components/molecules/TimerSideBox';
import TimerTitle from '@/components/molecules/TimerTitle';
import TimerPageTemplates from '@/components/templates/TimerPageTemplates';

import useToggleSidebar from '@/hooks/useToggleSideBar';

import HamburgerIcon from '@/assets/svgs/btn_hamburger.svg?react';

const TimerPage = () => {
	//const { isSidebarOpen, toggleSidebar } = useToggleSidebar();

	return (
		<AddCategoryModal />
		// <TimerPageTemplates>
		// 	<div className="relative flex h-[108rem] w-[192rem] bg-[url('@/assets/images/img_timer_bg.png')]">
		// 		<div className="absolute left-0">
		// 			<TimerSideBox />
		// 		</div>
		// 		<div className="ml-[56.6rem] mt-[-0.8rem]">
		// 			<TimerTitle />
		// 			<Timer />
		// 			<FriendInfoCarousel />
		// 		</div>
		// 		<button
		// 			onClick={toggleSidebar}
		// 			className="ml-[38.2rem] mt-[3.2rem] h-[5.4rem] w-[5.4rem] rounded-[1.5rem] hover:bg-gray-bg-04"
		// 		>
		// 			<HamburgerIcon />
		// 		</button>
		// 		{isSidebarOpen && (
		// 			<div className="absolute inset-0 z-10 bg-dim">
		// 				<div className="absolute inset-y-0 right-0 flex justify-end overflow-hidden">
		// 					<TimerSideBar toggleSidebar={toggleSidebar} />
		// 				</div>
		// 			</div>
		// 		)}
		// 	</div>
		// </TimerPageTemplates>
	);
};
export default TimerPage;
