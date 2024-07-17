import CategoryTitle from './CategoryTitle';
import TodoTitle from './TodoTitle';

interface titleNameProps {
	targetName: string;
	targetCategoryName: string;
}

const TimerTitle = ({ targetName, targetCategoryName }: titleNameProps) => {
	return (
		<div className="mt-[8.6rem] flex flex-col items-center gap-[1rem]">
			<TodoTitle title={targetName} />
			<CategoryTitle title={targetCategoryName} />
		</div>
	);
};
export default TimerTitle;
