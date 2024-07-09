import useTimerCount from '@/hooks/useTimerCount';

interface TaskTimeProps {
	isPlaying: boolean;
	previousTime: number;
}

const TaskTime = ({ isPlaying, previousTime }: TaskTimeProps) => {
	const timer = useTimerCount(isPlaying, previousTime);

	const formatTime = (unit: number) => unit.toString().padStart(2, '0');
	const hours = Math.floor(timer / 3600);
	const minutes = Math.floor((timer % 3600) / 60);
	const seconds = timer % 60;

	return (
		<text className="title-semibold-64 text-mint-01">
			{`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}
		</text>
	);
};

export default TaskTime;
