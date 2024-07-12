import FriendInfoCarousel from '@/components/molecules/FriendInfoCarousel';
import Timer from '@/components/molecules/Timer';
import TimerSideBox from '@/components/molecules/TimerSIdeBox';
import TimerTitle from '@/components/molecules/TimerTitle';

const TimerPage = () => {
	return (
		<div className="flex bg-gray-bg-01">
			<TimerSideBox />;
			<div className="px-[58rem]">
				<TimerTitle />
				<Timer />
				<FriendInfoCarousel />
			</div>
		</div>
	);
};

export default TimerPage;
