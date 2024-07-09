import useTimerCount from '@/hooks/useTimerCount';

interface AccumulatedTimeProps {
	isPlaying: boolean;
	previousTime?: number;
}

const AccumulatedTime = ({ isPlaying, previousTime = 0 }: AccumulatedTimeProps) => {
	const timer = useTimerCount({ isPlaying, previousTime });

	const hours = Math.floor(timer / 3600);
	const minutes = Math.floor((timer % 3600) / 60);

	return (
		<text className="head-bold-24 text-white">
			{hours === 0 ? `오늘 ${minutes}분 몰입 중` : `오늘 ${hours}시간 ${minutes}분 몰입 중`}
		</text>
	);
};

export default AccumulatedTime;
