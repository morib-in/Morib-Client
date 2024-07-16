import CategoryTitle from './CategoryTitle';
import TodoTitle from './TodoTitle';

interface titleNameProps {
	targetName: string;
}

const TimerTitle = ({ targetName }: titleNameProps) => {
	return (
		<div className="mt-[8.6rem] flex flex-col items-center gap-[1rem]">
			<TodoTitle title={targetName} />
			<CategoryTitle title="모립 프로젝트" />
		</div>
	);
};
export default TimerTitle;
