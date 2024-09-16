interface AccumulatedTimeProps {
	accumulatedTime: number;
}

const AccumulatedTime = ({ accumulatedTime }: AccumulatedTimeProps) => {
	const hours = Math.floor(accumulatedTime / 3600);
	const minutes = Math.floor((accumulatedTime % 3600) / 60);

	return (
		<span className="head-bold-24 text-white">
			{hours === 0 ? `오늘 ${minutes}분 몰입 중` : `오늘 ${hours}시간 ${minutes}분 몰입 중`}
		</span>
	);
};

export default AccumulatedTime;
