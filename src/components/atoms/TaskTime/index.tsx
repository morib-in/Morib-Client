import { formatSeconds } from '@/utils/time';

interface TaskTimeProps {
	isPlaying: boolean;
	timer: number;
}

const TaskTime = ({ timer }: TaskTimeProps) => {
	const formattedTime = formatSeconds(timer);

	return <span className="title-semibold-64 text-mint-01">{formattedTime}</span>;
};

export default TaskTime;
